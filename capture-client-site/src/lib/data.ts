import { promises as fs } from 'fs';
import path from 'path';

// Generic types for dynamic JSON data
export interface HeroSection {
  headline?: string;
  subheadline?: string;
  cta_primary?: { text: string; action: string; type?: string };
  cta_secondary?: { text: string; action: string; type?: string };
  cta?: {
    primary?: { text: string; action: string; type?: string };
    secondary?: { text: string; action: string; type?: string };
  };
  hero_image?: { url: string; alt: string };
  badge?: string;
  price_display?: { amount: string; period: string; note?: string };
}

export interface IntroSection {
  paragraph?: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessStep {
  step?: number;
  title: string;
  description: string;
}

export interface SeoData {
  page_title: string;
  meta_description: string;
  h1_heading: string;
  keywords: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
}

export interface ServiceData {
  page_id: string;
  page_type: string;
  service: {
    service_id: string;
    service_name: string;
    service_slug: string;
  };
  seo: SeoData;
  hero: HeroSection;
  intro: IntroSection;
  benefits: BenefitItem[];
  how_it_works: ProcessStep[];
  [key: string]: any;
}

export interface LocationData extends ServiceData {
  location: {
    city: string;
    state: string;
    state_abbr: string;
    slug: string;
    nearby_areas: string[];
    service_area_radius: string;
  };
  local_intro: IntroSection;
}

export interface NationalData extends ServiceData {
  keyword: {
    primary_keyword: string;
    secondary_keywords: string[];
    keyword_slug: string;
  };
}

export interface PackageData {
  page_id: string;
  page_type: string;
  package: {
    package_id: string;
    package_name: string;
    package_slug: string;
    price: string;
    period: string;
    tagline: string;
  };
  seo: SeoData;
  hero: HeroSection;
  [key: string]: any;
}

export interface PricingData {
  page_id: string;
  packages?: PackageData[];
  [key: string]: any;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredImage: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

const dataDir = path.join(process.cwd(), 'src', 'data');

export async function getAllServices(): Promise<ServiceData[]> {
  const servicesDir = path.join(dataDir, 'services');
  const files = await fs.readdir(servicesDir);

  const services = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async (file) => {
        const content = await fs.readFile(path.join(servicesDir, file), 'utf-8');
        return JSON.parse(content) as ServiceData;
      })
  );

  return services;
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  try {
    const filePath = path.join(dataDir, 'services', `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as ServiceData;
  } catch {
    return null;
  }
}

export async function getAllLocations(): Promise<LocationData[]> {
  const locationsDir = path.join(dataDir, 'locations');
  const files = await fs.readdir(locationsDir);

  const locations = await Promise.all(
    files
      .filter(file => file.endsWith('.json') && file !== '.gitkeep')
      .map(async (file) => {
        const content = await fs.readFile(path.join(locationsDir, file), 'utf-8');
        return JSON.parse(content) as LocationData;
      })
  );

  return locations;
}

export async function getLocationBySlug(slug: string): Promise<LocationData | null> {
  try {
    const filePath = path.join(dataDir, 'locations', `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as LocationData;
  } catch {
    return null;
  }
}

export async function getAllNationalPages(): Promise<NationalData[]> {
  const nationalDir = path.join(dataDir, 'national');
  const files = await fs.readdir(nationalDir);

  const pages = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async (file) => {
        const content = await fs.readFile(path.join(nationalDir, file), 'utf-8');
        return JSON.parse(content) as NationalData;
      })
  );

  return pages;
}

export async function getNationalBySlug(slug: string): Promise<NationalData | null> {
  try {
    const filePath = path.join(dataDir, 'national', `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as NationalData;
  } catch {
    return null;
  }
}

export async function getAllPackages(): Promise<PackageData[]> {
  const packagesDir = path.join(dataDir, 'packages');
  try {
    const files = await fs.readdir(packagesDir);

    const packages = await Promise.all(
      files
        .filter(file => file.endsWith('.json') && file !== 'test.json' && file !== 'pricing.json')
        .map(async (file) => {
          try {
            const content = await fs.readFile(path.join(packagesDir, file), 'utf-8');
            const data = JSON.parse(content);
            // Handle both package_info and package formats
            if (data.package_info && !data.package) {
              data.package = {
                package_id: data.package_info.slug || data.page_id,
                package_name: data.package_info.name,
                package_slug: data.package_info.slug,
                price: data.package_info.price,
                period: data.package_info.period,
                tagline: data.package_info.tagline,
              };
            }
            return data as PackageData;
          } catch {
            return null;
          }
        })
    );

    return packages.filter((p): p is PackageData => p !== null);
  } catch {
    return [];
  }
}

export async function getPackageBySlug(slug: string): Promise<PackageData | null> {
  try {
    const filePath = path.join(dataDir, 'packages', `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    // Handle both package_info and package formats
    if (data.package_info && !data.package) {
      data.package = {
        package_id: data.package_info.slug || data.page_id,
        package_name: data.package_info.name,
        package_slug: data.package_info.slug,
        price: data.package_info.price,
        period: data.package_info.period,
        tagline: data.package_info.tagline,
      };
    }
    return data as PackageData;
  } catch {
    return null;
  }
}

export async function getPricingData(): Promise<PricingData | null> {
  try {
    const filePath = path.join(dataDir, 'packages', 'pricing.json');
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as PricingData;
  } catch {
    return null;
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const blogDir = path.join(dataDir, 'blog');
  try {
    const files = await fs.readdir(blogDir);

    const posts = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async (file) => {
          try {
            const content = await fs.readFile(path.join(blogDir, file), 'utf-8');
            return JSON.parse(content) as BlogPost;
          } catch {
            return null;
          }
        })
    );

    // Filter out null values and sort by date (newest first)
    return posts
      .filter((p): p is BlogPost => p !== null)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(dataDir, 'blog', `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as BlogPost;
  } catch {
    return null;
  }
}
