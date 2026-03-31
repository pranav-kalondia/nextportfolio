"use client";

import { useEffect, useRef, useState } from "react";

type Project = {
  category: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
  imageAlt?: string;
};

const PROJECTS: Project[] = [
  {
    category: "SaaS Platform",
    title: "Loopra \u2014 Modern CRM Platform",
    description:
      "A modern customer relationship platform designed to streamline and automate the entire customer lifecycle \u2014 from first interaction to long-term retention.",
    tags: ["Figma", "CRM", "SaaS"],
    link: "https://www.behance.net/gallery/246230923/Loopra-Modern-CRM-Platform-for-Growing-Businesses",
    image: "/loopra%20thumbnail.png",
    imageAlt: "Loopra CRM platform preview",
  },
  {
    category: "Web3 Design",
    title: "DeXe \u2014 DAO Infrastructure Interface",
    description:
      "A next-generation DAO infrastructure platform, balancing technical depth with clarity and usability for decentralized governance systems.",
    tags: ["Web3", "UI/UX", "Dark Mode"],
    link: "https://www.behance.net/gallery/246228983/DeXe-Future-Ready-DAO-Infrastructure-Interface",
    image: "/DEXE%20thumbnail.png",
    imageAlt: "DeXe DAO infrastructure interface preview",
  },
  {
    category: "Brand Identity",
    title: "JUNOM \u2014 Modern Furniture Brand Identity",
    description:
      "A modern furniture brand identity and visual system built to give Junom a refined, cohesive presence across product storytelling and brand touchpoints.",
    tags: ["Branding", "Visual System", "Identity"],
    link: "https://www.behance.net/gallery/246228283/JUNOM-Modern-Furniture-Brand-Identity-Visual-System",
    image: "/junom%20thumbnail.jpg",
    imageAlt: "Junom furniture brand identity preview",
  },
  {
    category: "Landing Page",
    title: "TARS \u2014 AI Architecture Protocol",
    description:
      "A futuristic landing page for an AI architecture protocol, combining bold typography with dark sci-fi aesthetics and tech-forward visuals.",
    tags: ["Web Design", "AI", "Landing Page"],
    link: "https://www.behance.net/gallery/220879179/TARS-Ai-Architecture-Protocol-landing-page",
    image: "/Tars%20thumbnail.png",
    imageAlt: "TARS AI architecture protocol landing page preview",
  },
  {
    category: "Mobile App",
    title: "Finance App \u2014 Case Study",
    description:
      "A premium finance app case study featuring intuitive budgeting, investment tracking, and a seamless mobile banking experience.",
    tags: ["Figma", "Mobile", "Fintech"],
    link: "https://www.behance.net/gallery/218317189/FInance-app-Case-study",
    image: "/finance%20thumbnail.jpg",
    imageAlt: "Finance app case study preview",
  },
  {
    category: "Mobile App",
    title: "Foodo \u2014 Delivery App Case Study",
    description:
      "A vibrant food delivery app case study with restaurant discovery, ordering flows, and a delightful user experience from browse to delivery.",
    tags: ["UI/UX", "Mobile", "Case Study"],
    link: "https://www.behance.net/gallery/218283637/Foodo-delivery-app-case-study",
    image: "/Food%20app%20case%20study%20thumbnail.png",
    imageAlt: "Food delivery app case study preview",
  },
];

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting && !isNaN(index)) {
            setVisibleCards((prev) => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    const cards = document.querySelectorAll("[data-ws-card]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative z-20 overflow-hidden bg-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-10%] top-[15%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(205,33,81,0.05)_0%,rgba(205,33,81,0)_72%)]" />
        <div className="absolute left-[-8%] bottom-[12%] h-[350px] w-[350px] rounded-full bg-[radial-gradient(circle,rgba(138,164,199,0.08)_0%,rgba(138,164,199,0)_74%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-28">
        <div className="pb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/72 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5f7288] shadow-sm backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[#cd2151]" />
            Selected Work
          </span>

          <h2 className="mx-auto mt-6 max-w-[30ch] text-[40px] font-[400] leading-[1.02] tracking-[-2.5px] text-[#111110] md:text-[48px]">
            Crafted with intent, designed to{" "}
            <span className="bg-gradient-to-br from-[#1a1a1a] via-[#7a7a7a] to-[#b0b8c8] bg-clip-text text-transparent">
              leave
            </span>
            <br />
            a lasting{" "}
            <span className="bg-gradient-to-br from-[#1a1a1a] via-[#7a7a7a] to-[#b0b8c8] bg-clip-text text-transparent">
              impression
            </span>
            .
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {PROJECTS.map((project, index) => {
            const isVisible = visibleCards.has(index);
            const isEven = index % 2 === 0;

            return (
              <a
                key={project.title}
                href={project.link}
                data-ws-card
                data-index={index}
                className="group relative block"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible
                    ? "translateY(0px)"
                    : "translateY(40px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 100}ms`,
                  marginTop: !isEven && index > 0 ? "60px" : "0px",
                }}
              >
                <span className="mb-3 inline-flex items-center rounded-full bg-[#cd2151] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  {project.category}
                </span>

                <h3 className="mb-4 text-[22px] font-medium leading-[1.15] tracking-[-0.03em] text-[#111110] sm:text-[26px] md:text-[28px]">
                  {project.title}
                </h3>

                <div className="relative overflow-hidden rounded-[20px] bg-[#111110]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt ?? project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(17,17,16,0.94))]" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#111110]/70 via-[#111110]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col gap-3 p-6 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 sm:p-8">
                      <p className="max-w-[48ch] text-[14px] leading-[1.6] text-white/90">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-[0.02em] text-white/85 backdrop-blur-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-[13px] font-semibold text-white/90 transition-colors duration-300">
                        View Project
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-[14px] w-[14px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
                        >
                          <path
                            d="M7 17L17 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M9 7H17V15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
