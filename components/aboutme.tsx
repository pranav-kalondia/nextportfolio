"use client";

import { useEffect, useRef, useState } from "react";

type AboutHighlight = {
  number: string;
  title: string;
  description: string;
};

const PROFILE_IMAGE_SOURCES = [
  "/pranav.jpeg",
  "/about-portrait.jpg",
  "/about-portrait.jpeg",
  "/about-portrait.png",
  "/about-portrait.webp",
];

const ABOUT_HIGHLIGHTS: AboutHighlight[] = [
  {
    number: "01.",
    title: "Currently working as Tech Product Manager at Dzylo",
    description:
      "I work where product direction, user experience, and execution need to stay aligned and move with clarity.",
  },
  {
    number: "02.",
    title:
      "Bringing 2+ years of experience across product, design, and front-end",
    description:
      "My workflow moves comfortably across product thinking, interface design, and front-end execution.",
  },
  {
    number: "03.",
    title: "Delivered 70+ projects across portfolio and product work",
    description:
      "From portfolio experiences to production-ready interfaces, I focus on work that is useful, polished, and ready to launch.",
  },
  {
    number: "04.",
    title: "B.Tech graduate from MAIT, IPU Delhi",
    description:
      "My B.Tech in Information Technology with specialization in AIML from MAIT, IPU Delhi helps me think in systems, constraints, and implementation quality.",
  },
  {
    number: "05.",
    title: "Design Thinking with an Engineering Perspective",
    description:
      "My engineering background helps me design experiences that balance usability, performance, and real-world implementation.",
  },
];

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [activeItem, setActiveItem] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [imageSrcIndex, setImageSrcIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isPaused || !isSectionInView) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const intervalId = window.setInterval(() => {
      setActiveItem((current) => (current + 1) % ABOUT_HIGHLIGHTS.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [isPaused, isSectionInView]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    if (image.complete && image.naturalWidth > 0) {
      setImageLoaded(true);
      setImageError(false);
      return;
    }

    setImageLoaded(false);
  }, [imageSrcIndex]);

  return (
    <section ref={sectionRef} id="about" className="relative z-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-28">
        <div className="grid gap-8 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#f7faff] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5f7288] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#8aa4c7]" />
              About Me
            </span>

            <h2 className="mt-6 max-w-[20ch] text-[40px] font-[400] leading-[1.02] tracking-[-2.5px] text-[#111110] md:text-[48px]">
              Designing products where{" "}
              <span className="bg-gradient-to-br from-[#1a1a1a] via-[#7a7a7a] to-[#b0b8c8] bg-clip-text text-transparent">
                strategy
              </span>{" "}
              meets{" "}
              <span className="bg-gradient-to-br from-[#1a1a1a] via-[#7a7a7a] to-[#b0b8c8] bg-clip-text text-transparent">
                interface
              </span>
              .
            </h2>
          </div>

          <div className="max-w-[520px] justify-self-end lg:pt-14">
            <p className="text-[17px] font-medium leading-[1.7] text-[#59697b]">
              My work sits between strategy and screens. I help shape direction,
              refine the user experience, and carry ideas into polished
              interfaces that are ready to ship.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16">
          <div>
            <div className="border-y border-black/[0.08]">
              {ABOUT_HIGHLIGHTS.map((item, index) => {
                const isActive = index === activeItem;

                return (
                  <article
                    key={item.number}
                    tabIndex={0}
                    onMouseEnter={() => {
                      setActiveItem(index);
                      setIsPaused(true);
                    }}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => {
                      setActiveItem(index);
                      setIsPaused(true);
                    }}
                    onBlur={() => setIsPaused(false)}
                    className="relative border-b border-black/[0.08] py-6 last:border-b-0 focus:outline-none"
                  >
                    <div
                      className={`pointer-events-none absolute left-0 top-6 bottom-6 w-[3px] rounded-full transition-all duration-[798ms] ${
                        isActive
                          ? "bg-[#cd2151] opacity-100"
                          : "bg-[#d7e0ea] opacity-0"
                      }`}
                    />

                    <div className="grid gap-4 pl-6 sm:grid-cols-[78px_1fr]">
                      <span
                        className={`text-[28px] font-medium tracking-[-0.06em] transition-colors duration-[570ms] ${
                          isActive ? "text-[#cd2151]" : "text-[#c2c9d1]"
                        }`}
                      >
                        {item.number}
                      </span>

                      <div className="min-w-0 pr-2">
                        <h3
                          className={`max-w-[24ch] text-[20px] font-medium leading-[1.3] tracking-[-0.03em] transition-colors duration-[570ms] ${
                            isActive ? "text-[#111110]" : "text-[#aeb8c3]"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <div
                          className={`overflow-hidden transition-all duration-[798ms] ${
                            isActive ? "mt-3 max-h-24 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="max-w-[48ch] text-[15px] leading-6 text-[#667688]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="lg:pt-2">
            <div className="relative ml-auto w-full overflow-hidden rounded-[32px] border border-[#e0e8f1] bg-[linear-gradient(180deg,#f7fbff_0%,#eef4fa_100%)] shadow-[0_30px_70px_-44px_rgba(15,23,42,0.22)] lg:w-[70%]">
              <div className="relative min-h-[520px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0)_32%),linear-gradient(180deg,#f7fbff_0%,#eef4fa_100%)]" />

                {!imageError ? (
                  <img
                    ref={imageRef}
                    src={PROFILE_IMAGE_SOURCES[imageSrcIndex]}
                    alt=""
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                      setImageLoaded(false);
                      if (imageSrcIndex < PROFILE_IMAGE_SOURCES.length - 1) {
                        setImageSrcIndex((current) => current + 1);
                        return;
                      }
                      setImageError(true);
                    }}
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-[570ms] ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
