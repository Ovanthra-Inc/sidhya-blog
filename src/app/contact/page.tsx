import Image from "next/image";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";

export const metadata = {
  title: "Contact | SIDHYA",
  description: "Get in touch with Asutosh Sidhya.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="px-6 md:px-20 pt-20 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Let&apos;s Connect
          </h1>
          <p className="text-gray-500 text-sm">
            Have a question, collaboration inquiry, or feedback on an article? Reach out directly.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-xs text-center flex flex-col items-center">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-white shadow-sm">
            <Image
              src="/avatar.jpg"
              alt="Asutosh Sidhya"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-1">Asutosh Sidhya</h2>
          <p className="text-xs text-gray-500 mb-6">Software Engineer & Tech Blogger</p>

          <div className="w-full bg-white border border-gray-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-gray-400">Direct Email</p>
              <p className="text-sm font-semibold text-gray-900">sidhyaasutosh@gmail.com</p>
            </div>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              Open Gmail ↗
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a
              href="https://github.com/sidhyaashu"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 hover:text-black flex items-center gap-1.5"
            >
              GitHub (sidhyaashu) ↗
            </a>
            <span>•</span>
            <a
              href="https://www.linkedin.com/in/asutoshsidhya8170/"
              target="_blank"
              rel="noreferrer"
              className="text-[#0A66C2] hover:underline flex items-center gap-1.5"
            >
              LinkedIn Profile ↗
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
