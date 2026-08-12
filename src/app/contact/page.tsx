import Footer from "@/app/components/Footer";
import BackButton from "@/components/ui/BackButton";
import SafeImage from "@/components/ui/SafeImage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata = {
  title: "Contact | SIDHYA",
  description: "Get in touch with Asutosh Sidhya for engineering inquiries, collaborations, or feedback.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | SIDHYA",
    description: "Get in touch with Asutosh Sidhya for engineering inquiries, collaborations, or feedback.",
    url: "https://sidhya.studio/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | SIDHYA",
    description: "Get in touch with Asutosh Sidhya for engineering inquiries, collaborations, or feedback.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ]}
      />

      <main className="px-6 md:px-20 pt-24 md:pt-28 pb-8 max-w-[1440px] mx-auto w-full flex-1">
        {/* Top Back Button */}
        <BackButton label="Previous" />

        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
            GET IN TOUCH
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Let&apos;s Connect
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Have a question about AI agent architectures, vector search benchmarks, or Next.js 16? Reach out directly via email.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-gray-50 border border-gray-200 rounded-3xl p-8 shadow-xs flex flex-col items-center text-center mb-16">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-white shadow-md">
            <SafeImage
              src="/avatar.jpg"
              alt="Asutosh Sidhya"
              fallbackTitle="Asutosh Sidhya"
              category="AUTHOR"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-1">Asutosh Sidhya</h3>
          <p className="text-xs text-gray-500 mb-6">Author & Principal AI Engineer</p>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white text-xs font-bold py-3.5 px-6 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Send Direct Email via Gmail
          </a>

          <p className="text-[11px] text-gray-400 mt-3 font-mono">
            sidhyaasutosh@gmail.com
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
