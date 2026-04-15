"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import AntigravityBackground from "@/components/antigravity-background";

type Brand = {
  name: string;
  icon: ReactNode;
};

type HeadingSegment = {
  text: string;
  className?: string;
  breakAfter?: boolean;
};

type NavItem = {
  label: string;
  targetId: string;
};

const BRANDS: Brand[] = [
  {
    name: "TypeScript",
    icon: (
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]">
        <rect width="400" height="400" rx="20" fill="#3178C6" />
        <path d="M222 214v116h-44V214h-62v-38h168v38h-62z" fill="white" />
        <path d="M301 330c-8 4-24 9-44 9-46 0-78-28-78-72 0-43 31-74 82-74 17 0 31 3 40 8l-7 34c-7-4-16-6-30-6-24 0-40 14-40 37 0 24 17 37 41 37 13 0 24-3 31-6l5 33z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M149 154.3L69.2 50H50v79.9h15.7V69.5l72.2 93.5c4-2.7 7.8-5.7 11.1-8.7z" fill="white" />
        <path d="M115 50h16v80h-16z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    icon: (
      <svg viewBox="0 0 54 33" xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[22px]">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27 0C19.8 0 15.3 3.6 13.5 10.8c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.514-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
          fill="#38BDF8"
        />
      </svg>
    ),
  },
  {
    name: "Framer",
    icon: (
      <svg viewBox="0 0 14 21" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[14px]">
        <path d="M0 0h14v7H7L0 0zM0 7h7l7 7H0V7zM0 14h7l-7 7v-7z" fill="#0055FF" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 20 30" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[12px]">
        <circle cx="5" cy="5" r="5" fill="#F24E1E" />
        <circle cx="15" cy="5" r="5" fill="#FF7262" />
        <circle cx="5" cy="15" r="5" fill="#A259FF" />
        <circle cx="15" cy="15" r="5" fill="#1ABCFE" />
        <circle cx="5" cy="25" r="5" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    name: "JavaScript",
    icon: (
      <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]">
        <rect width="256" height="256" fill="#F7DF1E" />
        <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.086-21.994M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.606l6.014 2.578c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.653-43.819-24.573" fill="black" />
      </svg>
    ),
  },
  {
    name: "Adobe XD",
    icon: (
      <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]">
        <rect width="256" height="256" rx="40" fill="#470137" />
        <path d="M104 74.7L75.7 140l29.4 56.3H82.9l-14.8-31.4c-1.5-3.1-2.9-6.4-4.2-9.8h-.3c-1.1 3.2-2.5 6.5-4.2 9.8L44.5 196.3H22l29.9-55.5L23.2 74.7h22.4l13.5 29.9c1.7 3.8 3.2 7.6 4.5 11.5h.3c1.5-4.2 3-8 4.5-11.5l14-29.9H104zM147.5 74.7c11.5 0 21.4 2.3 29.8 6.9 8.4 4.6 14.8 11.2 19.3 19.7 4.5 8.5 6.7 18.5 6.7 29.9 0 12.2-2.4 22.8-7.3 31.8-4.9 9-11.8 15.9-20.8 20.8-9 4.9-19.5 7.3-31.6 7.3H119V74.7h28.5zm-1.4 97.6c10.8 0 19.2-3.3 25.3-9.8 6.1-6.5 9.1-15.8 9.1-27.8 0-10.8-2.8-19.3-8.4-25.4-5.6-6.1-13.6-9.2-24-9.2H138v72.2h8.1z" fill="#FF61F6" />
      </svg>
    ),
  },
];

const HERO_BG_IMAGE = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg width="1900" height="844" viewBox="0 0 1900 844" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="950" y1="0" x2="950" y2="844" gradientUnits="userSpaceOnUse">
        <stop stop-color="#F8FBFF" />
        <stop offset="1" stop-color="#EEF5FC" />
      </linearGradient>
      <radialGradient id="topGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(950 142) rotate(90) scale(260 860)">
        <stop stop-color="#FFFFFF" stop-opacity="0.95" />
        <stop offset="1" stop-color="#FFFFFF" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="1900" height="844" fill="url(#bg)" />
    <rect width="1900" height="844" fill="url(#topGlow)" />
    <g opacity="0.82" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round">
      <path d="M-120 370C120 260 350 430 590 360C810 295 1010 220 1240 268C1450 312 1620 260 1980 170" />
      <path d="M-90 470C180 310 390 510 650 455C900 402 1120 330 1370 380C1590 422 1750 390 2010 305" />
      <path d="M-70 570C210 400 430 600 700 550C980 500 1210 430 1460 485C1670 530 1820 520 2020 455" />
      <path d="M-40 670C220 510 470 680 740 640C1030 598 1260 540 1500 590C1700 630 1840 624 2030 575" />
      <path d="M60 190C260 300 410 470 560 650C640 742 740 802 860 844" />
      <path d="M280 90C460 210 600 410 770 620C880 760 1000 826 1160 844" />
      <path d="M1730 130C1560 250 1430 430 1290 615C1180 760 1070 824 930 844" />
      <path d="M360 120C520 210 720 230 920 220C1160 205 1360 160 1560 170C1720 178 1830 170 1970 138" />
    </g>
    <g fill="#FFFFFF" opacity="0.88">
      <circle cx="585" cy="360" r="7" />
      <circle cx="980" cy="405" r="6" />
      <circle cx="1360" cy="446" r="8" />
      <circle cx="520" cy="528" r="6" />
      <circle cx="1180" cy="536" r="7" />
      <circle cx="1520" cy="586" r="8" />
      <circle cx="740" cy="640" r="6" />
      <circle cx="1286" cy="662" r="6" />
    </g>
  </svg>`
)}`;

const HERO_HEADING_LABEL = "Crafting Interfaces that feel effortless & memorable";
const HERO_HEADING_SEGMENTS: HeadingSegment[] = [
  { text: "Crafting Interfaces that", breakAfter: true },
  { text: "feel " },
  {
    text: "effortless",
    className: "bg-gradient-to-br from-[#1a1a1a] via-[#7a7a7a] to-[#b0b8c8] bg-clip-text text-transparent",
  },
  { text: " & " },
  {
    text: "memorable",
    className: "bg-gradient-to-br from-[#1a1a1a] via-[#7a7a7a] to-[#b0b8c8] bg-clip-text text-transparent",
  },
];
const HERO_HEADING_TOTAL_CHARACTERS = HERO_HEADING_SEGMENTS.reduce(
  (total, segment) => total + segment.text.length,
  0
);

const NAV_ITEMS: NavItem[] = [
  { label: "Home", targetId: "home" },
  { label: "About Us", targetId: "about" },
  { label: "Experience", targetId: "experience" },
  { label: "Project", targetId: "work" },
];

function renderTypedHeading(charactersVisible: number) {
  const typedContent: ReactNode[] = [];
  let remainingCharacters = charactersVisible;
  let consumedCharacters = 0;

  HERO_HEADING_SEGMENTS.forEach((segment, index) => {
    const visibleCharacters = Math.max(0, Math.min(segment.text.length, remainingCharacters));
    const visibleText = segment.text.slice(0, visibleCharacters);

    if (visibleText) {
      typedContent.push(
        <span key={`heading-${index}`} className={segment.className}>
          {visibleText}
        </span>
      );
    }

    consumedCharacters += segment.text.length;
    remainingCharacters -= visibleCharacters;

    if (segment.breakAfter && charactersVisible >= consumedCharacters) {
      typedContent.push(<br key={`heading-break-${index}`} />);
    }
  });

  return typedContent;
}

export default function Hero() {
  const [activeNav, setActiveNav] = useState("home");
  const [repeatCount, setRepeatCount] = useState(3);
  const [typedCharacters, setTypedCharacters] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const tickerWrapRef = useRef<HTMLDivElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const tickerGroupRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (targetId: string) => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const behavior = prefersReducedMotion ? "auto" : "smooth";
    const navOffset = 92;

    setActiveNav(targetId);

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const targetTop =
      targetElement.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior,
    });
  };

  useEffect(() => {
    if (!showHeroContent) return;

    const wrapper = tickerWrapRef.current;
    const group = tickerGroupRef.current;
    if (!wrapper || !group) return;

    const updateRepeatCount = () => {
      const wrapperWidth = wrapper.getBoundingClientRect().width;
      const groupWidth = group.getBoundingClientRect().width;
      if (!wrapperWidth || !groupWidth) return;

      // Enough cloned groups so the viewport never reveals an empty tail.
      const requiredGroups = Math.max(3, Math.ceil(wrapperWidth / groupWidth) + 2);
      setRepeatCount((prev) => (prev === requiredGroups ? prev : requiredGroups));
    };

    updateRepeatCount();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateRepeatCount);
      observer.observe(wrapper);
      observer.observe(group);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", updateRepeatCount);
    return () => window.removeEventListener("resize", updateRepeatCount);
  }, [showHeroContent]);

  useEffect(() => {
    if (!showHeroContent) return;

    const track = tickerTrackRef.current;
    const group = tickerGroupRef.current;
    if (!track || !group || typeof track.animate !== "function") return;

    const groupWidth = group.getBoundingClientRect().width;
    if (!groupWidth) return;

    const animation = track.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(-${groupWidth}px)` },
      ],
      {
        // Reduce speed by 20% (from ~80px/s to ~64px/s) for a calmer marquee.
        duration: Math.max(15000, Math.round((groupWidth / 64) * 1000)),
        iterations: Infinity,
        easing: "linear",
      }
    );

    return () => animation.cancel();
  }, [repeatCount, showHeroContent]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setTypedCharacters(HERO_HEADING_TOTAL_CHARACTERS);
      setIsTypingComplete(true);
      setShowHeroContent(true);
      return;
    }

    let timeoutId = 0;
    let nextCharacter = 0;

    const typeNextCharacter = () => {
      nextCharacter += 1;
      setTypedCharacters(nextCharacter);

      if (nextCharacter < HERO_HEADING_TOTAL_CHARACTERS) {
        const currentCharacter = HERO_HEADING_LABEL[nextCharacter - 1];
        const nextDelay = currentCharacter === " " ? 52 : 30;
        timeoutId = window.setTimeout(typeNextCharacter, nextDelay);
        return;
      }

      timeoutId = window.setTimeout(() => {
        setIsTypingComplete(true);
      }, 180);
    };

    timeoutId = window.setTimeout(typeNextCharacter, 240);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isTypingComplete) return;

    const revealTimeoutId = window.setTimeout(() => {
      setShowHeroContent(true);
    }, 40);

    return () => window.clearTimeout(revealTimeoutId);
  }, [isTypingComplete]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getAbsoluteTop = (el: HTMLElement): number => {
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = window.innerHeight * 0.35;
      let current = "home";

      NAV_ITEMS.forEach((item) => {
        const el = document.getElementById(item.targetId);
        if (!el) return;
        if (getAbsoluteTop(el) - offset <= scrollY) {
          current = item.targetId;
        }
      });

      setActiveNav(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f4f8fc] font-sans text-[#111110]">
      <img src={HERO_BG_IMAGE} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover" />
      <AntigravityBackground />

      <nav
        className={`fixed inset-x-0 top-0 z-50 flex h-[68px] items-center justify-between border-b border-black/10 bg-white px-5 transition-all duration-[820ms] md:px-10 ${showHeroContent ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"
          }`}
      >
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-2.5 no-underline"
        >
          <div className="grid h-9 w-9 place-items-center rounded-full border border-black/15 bg-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" />
              <path d="M12 2C9.5 5 8 8.5 8 12s1.5 7 4 10" />
              <line x1="2.5" y1="9" x2="21.5" y2="9" />
              <line x1="2.5" y1="15" x2="21.5" y2="15" />
            </svg>
          </div>
          <span className="text-xl font-medium tracking-[-0.3px] text-[#222]">pranav </span>
        </button>

        <div className="hidden items-center rounded-full border border-black/15 bg-white px-2 py-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.targetId}
              type="button"
              aria-current={activeNav === item.targetId ? "page" : undefined}
              className={`rounded-full px-5 py-[7px] text-sm transition ${activeNav === item.targetId ? "bg-black/[0.04] font-semibold text-[#111]" : "font-medium text-[#444] hover:bg-black/[0.04] hover:text-[#111]"
                }`}
              onClick={() => scrollToSection(item.targetId)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="rounded-[10px] bg-[#111] px-5 py-2.5 text-sm font-semibold text-white no-underline transition hover:-translate-y-[1px] hover:opacity-85"
        >
          Contact Me
        </button>
      </nav>

      <section
        id="home"
        className="relative z-10 flex min-h-screen flex-col items-center px-4 pb-16 pt-[120px] text-center"
      >
        <div className="mb-10 flex min-h-[32px] items-center justify-center">
          <div
            className={`inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 text-xs font-semibold text-[#555550] shadow-sm transition-all duration-[820ms] ${showHeroContent ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none -translate-y-4 opacity-0 blur-[10px]"
              }`}
          >
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.2)]" />
            Available for freelance work
          </div>
        </div>

        <h1 className="mx-auto mb-4 min-h-[96px] max-w-[900px] text-[42px] font-[400] leading-[1.08] tracking-[-2.5px] text-[#111110] md:min-h-[160px] md:text-[72px]">
          <span className="sr-only">{HERO_HEADING_LABEL}</span>
          <span aria-hidden="true">
            {renderTypedHeading(typedCharacters)}
            {!isTypingComplete ? (
              <span
                className="ml-[0.08em] inline-block h-[0.92em] w-[0.07em] translate-y-[0.08em] rounded-full bg-[linear-gradient(180deg,#4285F4_0%,#34A853_36%,#FBBC05_70%,#EA4335_100%)] shadow-[0_0_18px_rgba(66,133,244,0.28)]"
                style={{ animation: "heroCaretBlink 1.05s steps(1) infinite" }}
              />
            ) : null}
          </span>
        </h1>

        {isTypingComplete ? (
          <div
            className={`flex w-full flex-col items-center transition-all duration-[900ms] ${showHeroContent ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[14px]"
              }`}
          >
            <p className="mx-auto mb-10 max-w-[760px] text-[17px] font-medium leading-[1.65] text-[#555550]">
              I&apos;m Pranav, a UI/UX Designer passionate about creating clean, human-centered interfaces backed by product thinking, user research, AI, strategic decision-making, and front-end development skills to craft experiences that solve real problems.
            </p>

            <div className="mb-5 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => scrollToSection("work")}
                className="rounded-full bg-[#111] px-7 py-3 text-sm font-semibold text-white no-underline transition hover:-translate-y-[1px] hover:opacity-85"
              >
                View My Work
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-[#1f2733] transition duration-200 hover:-translate-y-[1px]"
                style={{
                  background: "linear-gradient(to bottom, #ffffff, #e8edf4)",
                  border: "1px solid #d1d7e2",
                  boxShadow: "0 7px 16px -12px rgba(15,23,42,0.55), inset 0 1px 0 rgba(255,255,255,0.95)",
                }}
              >
                <span>Let&apos;s Talk</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[2px]"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="mb-[56px] flex items-center justify-center gap-3 text-black">
              <a
                href="https://www.linkedin.com/in/pranav-kalondia-90227422a/"
                className="grid h-9 w-9 place-items-center rounded-full border border-black/15 bg-white transition hover:-translate-y-[1px] hover:border-black/45 hover:bg-black/[0.03]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-[#111111]" aria-hidden="true">
                  <path d="M22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46C0 23.21.79 24 1.77 24h20.46A1.77 1.77 0 0 0 24 22.23V1.77A1.77 1.77 0 0 0 22.23 0zM7.12 20.45H3.56V9h3.56zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM20.45 20.45H16.9v-5.57c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.86 3.38-1.86 3.61 0 4.28 2.38 4.28 5.46z" />
                </svg>
              </a>
              <a
                href="https://www.behance.net/pranavkalondia"
                className="grid h-9 w-9 place-items-center rounded-full border border-black/15 bg-white transition hover:-translate-y-[1px] hover:border-black/45 hover:bg-black/[0.03]"
              >
                <img src="https://cdn.simpleicons.org/behance/111111" alt="" className="h-4 w-4" loading="lazy" />
              </a>
              <a
                href="https://github.com/pranav-kalondia"
                className="grid h-9 w-9 place-items-center rounded-full border border-black/15 bg-white transition hover:-translate-y-[1px] hover:border-black/45 hover:bg-black/[0.03]"
              >
                <img src="https://cdn.simpleicons.org/github/111111" alt="" className="h-4 w-4" loading="lazy" />
              </a>
              <a
                href="https://www.instagram.com/pranav_kalondia/"
                className="grid h-9 w-9 place-items-center rounded-full border border-black/15 bg-white transition hover:-translate-y-[1px] hover:border-black/45 hover:bg-black/[0.03]"
              >
                <img src="https://cdn.simpleicons.org/instagram/111111" alt="" className="h-4 w-4" loading="lazy" />
              </a>
            </div>

            <p className="mb-5 text-xs font-medium uppercase tracking-[1px] text-[#999990]">Skills &amp; tools I work with:</p>

            <div
              ref={tickerWrapRef}
              className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_12%,black_88%,transparent_100%)]"
            >
              <div ref={tickerTrackRef} className="flex w-max items-center">
                {Array.from({ length: repeatCount }, (_, groupIndex) => (
                  <div
                    key={groupIndex}
                    ref={groupIndex === 0 ? tickerGroupRef : undefined}
                    className="flex flex-shrink-0 items-center"
                  >
                    {BRANDS.map((brand, index) => (
                      <div
                        key={`${groupIndex}-${brand.name}-${index}`}
                        className="flex h-10 items-center gap-2 px-[17px] text-[16px] font-semibold text-[#111110]"
                      >
                        <span className="flex items-center justify-center">{brand.icon}</span>
                        <span>{brand.name}</span>
                        <span className="ml-1 h-1 w-1 rounded-full bg-[#c3c6cb]" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <style jsx>{`
        @keyframes heroCaretBlink {
          0%,
          48% {
            opacity: 1;
          }

          50%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
