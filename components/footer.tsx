"use client";

import AntigravityBackground from "@/components/antigravity-background";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="relative z-20 overflow-hidden bg-[#f4f8fc]">
      <AntigravityBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-12 md:px-8">
        {/* ─── Top bar ─── */}
        <div className="flex items-center justify-between border-b border-[#e2eaf3] pb-8">
          <span className="text-[13px] font-medium tracking-[0.02em] text-[#9aabb9]">
            © {new Date().getFullYear()}
          </span>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.16em] text-[#111110] transition-colors duration-300 hover:text-[#cd2151]"
          >
            Back to top
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-[#e2eaf3] bg-white text-[#3d4f61] shadow-[0_2px_8px_rgba(15,23,42,0.06)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:border-[#e8799e] group-hover:text-[#a31a41] group-hover:shadow-[0_4px_16px_rgba(205,33,81,0.18),0_0_0_3px_rgba(205,33,81,0.08)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-[16px] w-[16px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[1px]"
              >
                <path
                  d="M12 19V5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12L12 5L19 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* ─── CTA section ─── */}
        <div className="pb-16 pt-20 md:pt-24">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#111110]">
            Have a project in mind?
          </p>

          <a
            href="mailto:hello@pranavkalondia.com"
            className="group mt-4 block"
          >
            <h2 className="text-[80px] font-[500] leading-[0.95] tracking-[-4px] text-[#c8d3de] transition-colors duration-500 hover:text-[#cd2151] sm:text-[120px] md:text-[160px] lg:text-[200px]">
              LET&apos;S TALK
            </h2>
          </a>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Social links */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "LinkedIn", href: "https://linkedin.com" },
              { label: "Behance", href: "https://behance.net" },
              { label: "Github", href: "https://github.com" },
              { label: "Instagram", href: "https://instagram.com" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#d0d8e2] px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#111110] transition-all duration-300 hover:border-[#cd2151] hover:bg-[#cd2151] hover:text-white"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Credits */}
          <div className="text-right text-[13px] leading-[1.8] text-[#9aabb9]">
            <p>
              Designed and developed by{" "}
              <span className="font-semibold text-[#111110]">
                Pranav Kalondia
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
