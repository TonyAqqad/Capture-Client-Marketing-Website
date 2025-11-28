import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto py-12 px-8 lg:px-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="material-icons text-primary text-3xl">settings_suggest</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Capture Client</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
              Automate Leads. Capture Clients.
            </p>
            <div className="mt-4">
              <a href="tel:865-346-3339" className="text-primary hover:underline">
                (865) 346-3339
              </a>
              <br />
              <a href="mailto:team@captureclient.net" className="text-primary hover:underline">
                team@captureclient.net
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/services/voice-ai" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Voice AI
                </Link>
              </li>
              <li>
                <Link href="/services/google-ads" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Google Ads
                </Link>
              </li>
              <li>
                <Link href="/services/facebook-ads" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Facebook Ads
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">Locations</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/locations/voice-ai-knoxville-tn" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Knoxville, TN
                </Link>
              </li>
              <li>
                <Link href="/locations/voice-ai-nashville-tn" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Nashville, TN
                </Link>
              </li>
              <li>
                <Link href="/locations/voice-ai-atlanta-ga" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Atlanta, GA
                </Link>
              </li>
              <li>
                <Link href="/locations/voice-ai-charlotte-nc" className="text-gray-600 dark:text-gray-400 hover:text-primary">
                  Charlotte, NC
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; 2024 Capture Client. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
