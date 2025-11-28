import { MetadataRoute } from 'next';
import { getAllServices, getAllLocations, getAllNationalPages, getAllPackages } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://captureclient.net';

  const services = await getAllServices();
  const locations = await getAllLocations();
  const nationalPages = await getAllNationalPages();
  const packages = await getAllPackages();

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.service.service_slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const locationPages = locations.map((location) => ({
    url: `${baseUrl}/locations/${location.page_id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // High priority for local SEO
  }));

  const nationalSeoPages = nationalPages.map((page) => ({
    url: `${baseUrl}/${page.keyword.keyword_slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const packagePages = packages.map((pkg) => ({
    url: `${baseUrl}/pricing/${pkg.package.package_slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...servicePages,
    ...locationPages,
    ...nationalSeoPages,
    ...packagePages,
  ];
}
