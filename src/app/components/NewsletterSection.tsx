export default function NewsletterSection() {
  return (
    <section className="mx-6 md:mx-20 bg-[#1A1A1A] text-white px-8 md:px-12 py-10 rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div>
          <h2 className="text-3xl font-bold leading-tight mb-4 tracking-tight">
            Stay Ahead in AI &<br />Software Architecture
          </h2>
          <p className="text-xs text-gray-400 mb-6 max-w-sm">
            Get Asutosh Sidhya&apos;s latest technical breakdowns on AI agents, vector search, and Next.js 16 straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 w-full sm:w-[260px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 text-xs text-gray-800 outline-none bg-transparent placeholder:text-gray-400"
              />
            </div>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=sidhyaasutosh@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors text-center cursor-pointer"
            >
              Subscribe
            </a>
          </div>
        </div>

        {/* Right */}
        <div>
          <p className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
            SIDHYA Engineering Insights
          </p>
          <p className="text-xs text-gray-300 leading-relaxed">
            Zero noise, zero fluff. Deep technical articles, complete code repositories, architectural diagrams, and real-world system patterns designed for software engineers.
          </p>
        </div>
      </div>
    </section>
  );
}
