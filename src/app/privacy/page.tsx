import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";

export const metadata = {
  title: "Privacy Policy | SIDHYA",
  description: "Privacy policy for SIDHYA technical blog by Asutosh Sidhya.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-16 max-w-4xl mx-auto w-full flex-1">
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
            At <strong>SIDHYA</strong>, authored and maintained by <strong>Asutosh Sidhya</strong>, we prioritize the protection and confidentiality of your personal information. This Privacy Policy details how we collect, process, and safeguard data when you visit our technical engineering platform.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-2 border-b border-gray-100 pb-2">
            1. Information We Collect
          </h2>
          <p>
            We operate a privacy-first publishing platform. We do not mandate user registration or store tracking profiles. When you voluntarily subscribe to our engineering newsletter or reach out via email, we collect only your email address for direct communications.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-2 border-b border-gray-100 pb-2">
            2. Analytics & Performance Cookies
          </h2>
          <p>
            We utilize lightweight, privacy-focused analytics to monitor page performance, response times, and aggregated visitor metrics (such as device types and referring domains). No cross-site advertising cookies or personal tracking scripts are installed.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mt-2 border-b border-gray-100 pb-2">
            3. Data Security & Direct Inquiries
          </h2>
          <p>
            Your email data is never shared, sold, or distributed to third-party data brokers. For any privacy requests or data removal inquiries, please email Asutosh Sidhya directly at{" "}
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
