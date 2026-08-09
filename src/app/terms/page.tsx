import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";

export const metadata = {
  title: "Terms of Service | SIDHYA",
  description: "Terms of service for SIDHYA technical blog by Asutosh Sidhya.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-16 max-w-4xl mx-auto w-full flex-1">
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
            Welcome to <strong>SIDHYA</strong>. By viewing, reading, or referencing our technical articles, code repositories, and tutorials, you agree to comply with and be bound by the following terms.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-2 border-b border-gray-100 pb-2">
            1. Intellectual Property & Attribution
          </h2>
          <p>
            All original technical content, architectural diagrams, vector search benchmark write-ups, and code snippets published on <strong>SIDHYA</strong> are authored by <strong>Asutosh Sidhya</strong>. You are permitted to quote code snippets and link to articles provided proper attribution back to SIDHYA is included.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-2 border-b border-gray-100 pb-2">
            2. Code Disclaimer & Licensing
          </h2>
          <p>
            All software code, scripts, and production snippets provided on this site are for educational purposes. While we rigorously test all implementation patterns, software code is provided &quot;as is&quot; without implied warranties. Always inspect and test code within your own staging environments prior to production deployment.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-2 border-b border-gray-100 pb-2">
            3. Contact Information
          </h2>
          <p>
            For licensing inquiries, technical corrections, or business communications, contact Asutosh Sidhya directly at{" "}
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-semibold underline hover:text-blue-800"
            >
              sidhyaasutosh@gmail.com
            </a>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
