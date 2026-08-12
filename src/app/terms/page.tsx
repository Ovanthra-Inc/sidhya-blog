import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Terms of Service | SIDHYA",
  description: "Terms of service and intellectual property guidelines for SIDHYA technical blog by Asutosh Sidhya.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | SIDHYA",
    description: "Terms of service and intellectual property guidelines for SIDHYA technical blog by Asutosh Sidhya.",
    url: "https://sidhya.studio/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ]}
      />

      <main className="px-6 md:px-20 pt-10 pb-16 max-w-4xl mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        <div className="mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
            TERMS & CONDITIONS
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Terms of Service</h1>
          <p className="text-xs text-gray-400">Last updated: August 9, 2026</p>
        </div>

        <div className="flex flex-col gap-6 text-gray-700 text-base leading-relaxed p-0">
          <p>
            Welcome to <strong>SIDHYA Blog</strong> (https://sidhya.studio). By accessing our website, you agree to comply with these Terms of Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-4">1. Content & Code Open Access</h2>
          <p>
            All code snippets and engineering implementations published on SIDHYA Blog are provided for educational and production reference. You are free to adapt code snippets in your projects.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-4">2. Intellectual Property</h2>
          <p>
            The original articles, architectural diagrams, brand logos, and original written tutorials remain the intellectual property of Asutosh Sidhya.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
