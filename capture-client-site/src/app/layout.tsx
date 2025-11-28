import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Capture Client | Automate Leads. Capture Clients.",
  description: "The all-in-one growth hub. AI agents, Facebook & Google ads management. Deploy & manage from a unified dashboard.",
  keywords: ["voice ai", "lead generation", "facebook ads", "google ads", "ai receptionist", "marketing automation"],
  openGraph: {
    title: "Capture Client | Automate Leads. Capture Clients.",
    description: "Voice AI, Lead Generation & Marketing Automation for Small Businesses",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.variable} font-display`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
