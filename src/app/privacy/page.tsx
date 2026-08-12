import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Privacy Policy | SIDHYA",
  description: "Privacy policy and data protection transparency for SIDHYA technical blog by Asutosh Sidhya.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | SIDHYA",
    description: "Privacy policy and data protection transparency for SIDHYA technical blog by Asutosh Sidhya.",
    url: "https://sidhya.studio/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ]}
      />

      <main className="px-6 md:px-20 pt-10 pb-16 max-w-4xl mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        <div className="mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            LEGAL & TRANSPARENCY
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Privacy Policy</h1>
          <p className="text-xs text-gray-400">Last updated: August 9, 2026</p>
        </div>

        <div className="flex flex-col gap-6 text-gray-700 text-base leading-relaxed p-0">
          <p>
            At <strong>SIDHYA Blog</strong> (https://sidhya.studio), operated by Asutosh Sidhya, privacy and data transparency are fundamental engineering principles.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-4">1. Data We Collect</h2>
          <p>
            We do not use invasive tracking cookies or collect personal identifiable information (PII) without your explicit consent. Standard privacy-focused web analytics (Vercel Web Analytics and Google Analytics) measure aggregated page view metrics.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-4">2. Direct Contact & Newsletters</h2>
          <p>
            When contacting Asutosh Sidhya via email or newsletter subscription, your email address is used solely to respond to your technical inquiry or send technical engineering breakdowns.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-4">3. External Links</h2>
          <p>
            Articles may contain outgoing links to open-source GitHub repositories, documentation sites, and third-party tools. We are not responsible for the privacy practices of external websites.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
