"use client";

import { useEffect, useRef, useState } from "react";

type Experience = {
  role: string;
  company: string;
  period: string;
  status: "current" | "past";
  location?: string;
  descriptor: string;
  detailPoints: string[];
  tags: string[];
  capabilities: string[];
};

const EXPERIENCES: Experience[] = [
  {
    role: "Tech Product Manager",
    company: "Dzylo",
    period: "july 2025 - Present",
    status: "current",
    descriptor:
      "Aligning product direction, user needs, and shipping rhythm across active product lines.",
    detailPoints: [
      "I work at the seam between product thinking and execution",
      "Shaping priorities and delivery cadence",
      "Tightening collaboration across cross-functional teams",
      "Keeping the experience coherent from discovery to release",
    ],
    tags: ["Product Strategy", "Delivery"],
    capabilities: [
      "Roadmapping",
      "Sprint Planning",
      "User Research",
      "Cross-functional Leadership",
      "Figma",
      "Analytics",
    ],
  },
  {
    role: "UI Developer",
    company: "Open Weaver",
    period: "jan 2025 - Jul 2025",
    status: "past",
    descriptor:
      "Designed and developed user-friendly websites, collaborated with the team to maintain consistency, and used user feedback to improve the experience.",
    detailPoints: [
      "Designed responsive website interfaces with clarity and usability in mind",
      "Built front-end experiences that stayed aligned with the design direction",
      "Worked closely with the team to keep product touchpoints visually consistent",
      "Used user feedback to refine flows and improve the final output",
    ],
    tags: ["HTML5", "CSS"],
    capabilities: [
      "HTML5",
      "CSS",
      "Responsive Design",
      "UI Development",
      "Design Consistency",
      "User Feedback",
    ],
  },
  {
    role: "User Experience Designer",
    company: "JA ASSURE",
    period: "Aug 2024 - Jan 2025",
    status: "past",
    descriptor:
      "Supported UI/UX design work across company projects through research, collaboration, and prototyping.",
    detailPoints: [
      "Assisted in the development of UI/UX designs for company projects",
      "Collaborated with the design team on various project requirements",
      "Conducted user research and gathered feedback for iteration",
      "Created wireframes and prototypes for new product features",
      "Stayed updated with UI/UX design trends and best practices",
    ],
    tags: ["Leadership Development", "Project Performance"],
    capabilities: [
      "User Research",
      "Wireframing",
      "Prototyping",
      "UI/UX Design",
      "Design Collaboration",
      "Feedback Analysis",
    ],
  },
  {
    role: "UI/UX Designer and Developer",
    company: "HanulInnoTech",
    period: "Jan 2024 - Jul 2024",
    status: "past",
    descriptor:
      "Designed websites and apps while translating product concepts into functional front-end experiences.",
    detailPoints: [
      "Designed user-friendly interfaces for web and app experiences",
      "Translated designs into functional front-end pages",
      "Ensured cross-browser compatibility and responsive behavior",
      "Collaborated with backend developers and UX/UI designers",
      "Helped bring digital concepts to life through production-ready execution",
    ],
    tags: ["Leadership Development", "User Interface Design"],
    capabilities: [
      "User Interface Design",
      "Front-end Development",
      "Responsive UI",
      "Cross-browser Compatibility",
      "Design Handoff",
      "Figma",
      "Collaboration",
    ],
  },
];

const DEFAULT_OPEN_INDEX = 0;

export default function WorkExperience() {
  const [openIndex, setOpenIndex] = useState<number | null>(DEFAULT_OPEN_INDEX);
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.indexOf(entry.target as HTMLElement);
          if (index === -1) return;

          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-20 overflow-hidden bg-[#f4f8fc]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[10%] h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(205,33,81,0.06)_0%,rgba(205,33,81,0)_72%)]" />
        <div className="absolute right-[-8%] bottom-[6%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(138,164,199,0.10)_0%,rgba(138,164,199,0)_74%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-28">
        <div className="grid gap-8 pb-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/72 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5f7288] shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#cd2151]" />
              Work Experience
            </span>

            <h2 className="mt-6 max-w-[30ch] text-[40px] font-[400] leading-[1.02] tracking-[-2.5px] text-[#111110] md:text-[48px]">
              Roles shaped through{" "}
              <span className="bg-gradient-to-br from-[#1a1a1a] via-[#7a7a7a] to-[#b0b8c8] bg-clip-text text-transparent">
                products
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-br from-[#1a1a1a] via-[#7a7a7a] to-[#b0b8c8] bg-clip-text text-transparent">
                delivery
              </span>
              .
            </h2>
          </div>

          <div className="max-w-[520px] justify-self-end lg:pt-14">
            <p className="text-[17px] font-medium leading-[1.7] text-[#59697b]">
              A cleaner view of the teams, products, and hands-on work that
              shaped how I think about strategy, craft, and shipping polished
              digital experiences.
            </p>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute left-[19px] top-0 hidden h-full w-[2px] md:block"
            style={{
              background:
                "linear-gradient(to bottom, #cd2151 0%, #e8799e 8%, #e2eaf3 12%, #dce5ee 50%, transparent 100%)",
            }}
          />

          <div className="flex flex-col gap-5 md:gap-6">
            {EXPERIENCES.map((experience, index) => {
              const isOpen = openIndex === index;
              const isVisible = visibleCards.has(index);
              const panelId = `experience-panel-${index}`;
              const buttonId = `experience-button-${index}`;

              return (
                <article
                  key={`${experience.company}-${experience.role}`}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="relative md:pl-14"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0px)" : "translateY(32px)",
                    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
                  }}
                >
                  <div className="absolute left-[14px] top-[32px] z-10 hidden md:block">
                    <div
                      className="h-[12px] w-[12px] rounded-full border-[1.5px] transition-all duration-500"
                      style={{
                        borderColor: isOpen || index === 0 ? "#cd2151" : "#dce5ee",
                        backgroundColor: isOpen || index === 0 ? "#cd2151" : "#f4f8fc",
                        boxShadow:
                          isOpen || index === 0
                            ? "0 0 0 5px rgba(205,33,81,0.15), 0 0 12px rgba(205,33,81,0.20)"
                            : "0 0 0 4px rgba(228,236,244,0.4)",
                      }}
                    />
                  </div>

                  <div
                    className="group overflow-hidden rounded-[24px] border bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-[#d0dae6]"
                    style={{
                      borderColor: isOpen ? "#d4dde8" : "#e6edf4",
                      boxShadow: isOpen
                        ? "0 20px 60px -28px rgba(15,23,42,0.18), 0 1px 3px rgba(15,23,42,0.06)"
                        : "0 4px 24px -16px rgba(15,23,42,0.10), 0 1px 2px rgba(15,23,42,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isOpen) {
                        e.currentTarget.style.boxShadow =
                          "0 12px 40px -16px rgba(205,33,81,0.18), 0 8px 24px -12px rgba(15,23,42,0.12), 0 1px 3px rgba(15,23,42,0.06)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = isOpen
                        ? "0 20px 60px -28px rgba(15,23,42,0.18), 0 1px 3px rgba(15,23,42,0.06)"
                        : "0 4px 24px -16px rgba(15,23,42,0.10), 0 1px 2px rgba(15,23,42,0.04)";
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[24px] transition-all duration-500 md:hidden"
                      style={{
                        backgroundColor: isOpen ? "#cd2151" : "transparent",
                        opacity: isOpen ? 1 : 0,
                      }}
                    />

                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenIndex((current) => (current === index ? null : index))
                      }
                      className="w-full cursor-pointer px-6 py-6 text-left outline-none transition-colors duration-300 hover:bg-[#fafcff] focus-visible:ring-2 focus-visible:ring-[#cd2151]/20 focus-visible:ring-inset md:px-8 md:py-7"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-[24px] font-medium leading-[1.15] tracking-[-0.04em] text-[#111110] sm:text-[28px]">
                              {experience.company}
                            </h3>
                            {experience.status === "current" && (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff0f4] px-3 py-[3px] text-[10px] font-bold uppercase tracking-[0.14em] text-[#a31a41]">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#cd2151] opacity-60" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#cd2151]" />
                                </span>
                                Current
                              </span>
                            )}
                          </div>

                          <p className="mt-1.5 text-[16px] font-semibold leading-[1.4] tracking-[-0.02em] text-[#3d4f61]">
                            {experience.role}
                          </p>

                          {experience.location ? (
                            <p className="mt-2 text-[13px] font-medium tracking-[-0.01em] text-[#9aabb9]">
                              {experience.location}
                            </p>
                          ) : null}

                          <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.65] text-[#667688]">
                            {experience.descriptor}
                          </p>
                        </div>

                        <div className="flex shrink-0 items-start gap-4 sm:flex-col sm:items-end sm:gap-4">
                          <span className="flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em] text-[#9aabb9]">
                            <span
                              className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
                              style={{
                                backgroundColor: isOpen ? "#cd2151" : "#c8d3de",
                              }}
                            />
                            {experience.period}
                          </span>

                          <div className="hidden flex-wrap justify-end gap-2 sm:flex">
                            {experience.tags.map((tag, tagIndex) => (
                              <span
                                key={tag}
                                className="cursor-default rounded-full px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.03em] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{
                                  background: isOpen
                                    ? "linear-gradient(135deg, #fff0f4 0%, #fce4ec 100%)"
                                    : "#f0f4f8",
                                  color: isOpen ? "#a31a41" : "#5a6a7c",
                                  border: "none",
                                  boxShadow: isOpen
                                    ? "0 2px 8px rgba(205,33,81,0.15), 0 1px 3px rgba(15,23,42,0.04)"
                                    : "0 1px 3px rgba(15,23,42,0.04)",
                                  transform: "translateY(0px) scale(1)",
                                  transitionDelay: isOpen ? `${tagIndex * 40}ms` : "0ms",
                                }}
                                onMouseEnter={(e) => {
                                  if (!isOpen) {
                                    e.currentTarget.style.transform =
                                      "translateY(-2px) scale(1.04)";
                                    e.currentTarget.style.boxShadow =
                                      "0 4px 12px rgba(205,33,81,0.15), 0 1px 3px rgba(15,23,42,0.06)";
                                    e.currentTarget.style.color = "#a31a41";
                                    e.currentTarget.style.background =
                                      "linear-gradient(135deg, #fff0f4 0%, #fce4ec 100%)";
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isOpen) {
                                    e.currentTarget.style.transform =
                                      "translateY(0px) scale(1)";
                                    e.currentTarget.style.boxShadow =
                                      "0 1px 3px rgba(15,23,42,0.04)";
                                    e.currentTarget.style.color = "#5a6a7c";
                                    e.currentTarget.style.background = "#f0f4f8";
                                  }
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <span
                            aria-hidden="true"
                            className="group/btn relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                              background: isOpen ? "#cd2151" : "white",
                              border: isOpen
                                ? "1.5px solid #cd2151"
                                : "1.5px solid #e2eaf3",
                              boxShadow: isOpen
                                ? "0 4px 16px rgba(205,33,81,0.3), 0 0 0 3px rgba(205,33,81,0.1)"
                                : "0 2px 8px rgba(15,23,42,0.06)",
                              color: isOpen ? "#ffffff" : "#3d4f61",
                              transform: isOpen ? "scale(1.08)" : "scale(1)",
                            }}
                            onMouseEnter={(e) => {
                              if (!isOpen) {
                                e.currentTarget.style.borderColor = "#e8799e";
                                e.currentTarget.style.boxShadow =
                                  "0 4px 16px rgba(205,33,81,0.18), 0 0 0 3px rgba(205,33,81,0.08)";
                                e.currentTarget.style.transform = "scale(1.08)";
                                e.currentTarget.style.color = "#a31a41";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isOpen) {
                                e.currentTarget.style.borderColor = "#e2eaf3";
                                e.currentTarget.style.boxShadow =
                                  "0 2px 8px rgba(15,23,42,0.06)";
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.color = "#3d4f61";
                              }
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-[14px] w-[14px] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                              style={{
                                transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)",
                              }}
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
                          </span>
                        </div>
                      </div>
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="px-6 pb-6 md:px-8 md:pb-8">
                          <div className="mb-6 h-px bg-[#edf2f7]" />

                          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
                            <ul className="flex flex-col gap-3">
                              {experience.detailPoints.map((point, pointIndex) => (
                                <li
                                  key={pointIndex}
                                  className="flex items-start gap-3 text-[15px] leading-[1.65] text-[#59697b]"
                                  style={{
                                    opacity: isOpen ? 1 : 0,
                                    transform: isOpen
                                      ? "translateX(0px)"
                                      : "translateX(-12px)",
                                    transition: `opacity 0.4s ease ${pointIndex * 0.06}s, transform 0.4s ease ${pointIndex * 0.06}s`,
                                  }}
                                >
                                  <span className="mt-[7px] flex h-[7px] w-[7px] shrink-0 rounded-full bg-[#cd2151]/50" />
                                  {point}
                                </li>
                              ))}
                            </ul>

                            <div>
                              <span className="mb-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9aabb9]">
                                Capabilities
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {experience.capabilities.map(
                                  (capability, capabilityIndex) => (
                                    <span
                                      key={capability}
                                      className="rounded-full border border-[#e2eaf3] bg-[#f7faff] px-3.5 py-1.5 text-[12px] font-medium text-[#637587] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:border-[#d0dae6] hover:bg-white hover:text-[#4a5b6d]"
                                      style={{
                                        opacity: isOpen ? 1 : 0,
                                        transform: isOpen
                                          ? "translateY(0px)"
                                          : "translateY(8px)",
                                        transition: `opacity 0.4s ease ${capabilityIndex * 0.04}s, transform 0.4s ease ${capabilityIndex * 0.04}s, background-color 0.3s, border-color 0.3s, color 0.3s`,
                                      }}
                                    >
                                      {capability}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
