import { Metadata } from "next";
import AutomotivePageClient from "./AutomotivePageClient";

// SEO Metadata (Server Component)
export const metadata: Metadata = {
  title: "AI BDC for Car Dealerships | Sales & Service | Capture Client",
  description: "AI BDC agents for car dealerships. Stop losing $49K/year to missed calls. CDK & Reynolds integration. Sales leads + service appointments 24/7.",
  keywords: [
    "AI BDC",
    "car dealership AI",
    "automotive AI",
    "dealership call center",
    "CDK integration",
    "Reynolds integration",
    "DealerSocket",
    "Tekion",
    "service appointments",
    "sales leads automotive",
    "missed calls dealership"
  ],
  openGraph: {
    title: "AI BDC for Car Dealerships | Sales & Service",
    description: "Stop losing $49K/year to missed calls. AI BDC agents that integrate with your DMS for 24/7 sales and service.",
    type: "website"
  }
};

export default function AutomotivePage() {
  return <AutomotivePageClient />;
}
