"use client";

import { useEffect, useRef } from "react";

type Particle = {
  radius: number;
  angle: number;
  depth: number;
  phase: number;
  drift: number;
  swirl: number;
  size: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const mixColor = (t: number) => {
  const r = Math.round(255 + (44 - 255) * t);
  const g = Math.round(98 + (102 - 98) * t);
  const b = Math.round(112 + (255 - 112) * t);
  return `${r}, ${g}, ${b}`;
};

export default function AntigravityBackground() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let hasPointer = false;
    let lastPointerMoveAt = performance.now();
    let prevFrameTime = performance.now();
    let pointerSpeed = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const lastPointer = { x: 0, y: 0, time: performance.now(), hasValue: false };

    const setSize = () => {
      const bounds = wrapper.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(clamp((width * height) / 1450, 950, 3000));
      particles = Array.from({ length: count }, () => ({
        radius: Math.sqrt(Math.random()),
        angle: Math.random() * Math.PI * 2,
        depth: Math.random() * 2 - 1,
        phase: Math.random() * Math.PI * 2,
        drift: 0.55 + Math.random() * 1.35,
        swirl: (Math.random() - 0.5) * 2,
        size: 0.34 + Math.random() * 0.72,
      }));

      if (!hasPointer) {
        target.x = width / 2;
        target.y = height / 2;
        current.x = target.x;
        current.y = target.y;
      } else {
        target.x = clamp(target.x, 0, width);
        target.y = clamp(target.y, 0, height);
        current.x = clamp(current.x, 0, width);
        current.y = clamp(current.y, 0, height);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = wrapper.getBoundingClientRect();
      const localX = event.clientX - bounds.left;
      const localY = event.clientY - bounds.top;
      const isInside =
        localX >= 0 &&
        localX <= bounds.width &&
        localY >= 0 &&
        localY <= bounds.height;

      if (!isInside) {
        if (hasPointer) resetPointer();
        return;
      }

      const now = performance.now();
      if (lastPointer.hasValue) {
        const dx = localX - lastPointer.x;
        const dy = localY - lastPointer.y;
        const dt = Math.max(8, now - lastPointer.time);
        const instantSpeed = Math.hypot(dx, dy) / dt;
        pointerSpeed = pointerSpeed * 0.93 + instantSpeed * 0.07;
      }
      lastPointer.x = localX;
      lastPointer.y = localY;
      lastPointer.time = now;
      lastPointer.hasValue = true;
      hasPointer = true;
      lastPointerMoveAt = now;
      target.x = localX;
      target.y = localY;
    };

    const resetPointer = () => {
      hasPointer = false;
      pointerSpeed = 0;
      lastPointer.hasValue = false;
      target.x = width / 2;
      target.y = height / 2;
    };

    const draw = (time: number) => {
      const delta = clamp((time - prevFrameTime) / 16.67, 0.4, 2);
      prevFrameTime = time;

      pointerSpeed *= Math.pow(0.95, delta);
      const cursorMotion = clamp(pointerSpeed / 2.8, 0, 0.3);
      const idleMs = time - lastPointerMoveAt;
      const idleMix = clamp((idleMs - 120) / 620, 0, 1);
      const breathe = (Math.sin(time * 0.00102) + 1) * 0.5;
      const restBreath = idleMix * (0.28 + breathe * 0.72);

      const focusOrbit = 0.35 + restBreath * 5.8;
      const focusX = target.x + Math.sin(time * 0.00085) * focusOrbit;
      const focusY = target.y + Math.cos(time * 0.00072) * focusOrbit * 0.82;

      const follow = 0.011 + cursorMotion * 0.007;
      current.x += (focusX - current.x) * follow;
      current.y += (focusY - current.y) * follow;

      ctx.clearRect(0, 0, width, height);

      const fieldRadius = Math.min(width, height) * (0.54 + restBreath * 0.06);
      const glow = ctx.createRadialGradient(current.x, current.y, 0, current.x, current.y, fieldRadius * 1.15);
      glow.addColorStop(0, "rgba(255,255,255,0.56)");
      glow.addColorStop(0.34, "rgba(241,246,255,0.22)");
      glow.addColorStop(1, "rgba(237,244,255,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const influenceRadius = fieldRadius * 0.76;
      const cursorVoidRadius = fieldRadius * (0.16 + restBreath * 0.07 + cursorMotion * 0.03);
      const maxDepthScale = fieldRadius * 0.32;
      const maxDiag = Math.hypot(width, height) || 1;

      const offsetNormX = clamp((target.x - width * 0.5) / (width * 0.5), -1, 1);
      const offsetNormY = clamp((target.y - height * 0.5) / (height * 0.5), -1, 1);
      const rotY = offsetNormX * (0.22 + cursorMotion * 0.1);
      const rotX = -offsetNormY * (0.18 + cursorMotion * 0.08);
      const cosRY = Math.cos(rotY);
      const sinRY = Math.sin(rotY);
      const cosRX = Math.cos(rotX);
      const sinRX = Math.sin(rotX);

      for (const particle of particles) {
        const spin = time * 0.00007 * (0.6 + particle.drift * 0.65);
        const wobble = Math.sin(time * 0.00045 * particle.drift + particle.phase) * 0.065;
        const angle = particle.angle + spin + wobble;

        const radial = particle.radius * fieldRadius;
        const px = Math.cos(angle) * radial;
        const py = Math.sin(angle) * radial;
        const pz =
          (particle.depth + Math.sin(time * 0.00063 * particle.drift + particle.phase * 0.9) * 0.16 + restBreath * 0.05) *
          maxDepthScale;

        const rx = px * cosRY + pz * sinRY;
        const rz = -px * sinRY + pz * cosRY;
        const ry = py * cosRX - rz * sinRX;
        const rz2 = py * sinRX + rz * cosRX;

        const perspective = clamp(1 + rz2 / (fieldRadius * 1.75), 0.55, 1.85);
        let drawX = current.x + rx * perspective;
        let drawY = current.y + ry * perspective;

        let force = 0;
        const dxToCursor = drawX - target.x;
        const dyToCursor = drawY - target.y;
        const distToCursor = Math.hypot(dxToCursor, dyToCursor) || 1;
        if (distToCursor < influenceRadius) {
          force = clamp(1 - distToCursor / influenceRadius, 0, 1);
          const repel = force * force * (6 + cursorMotion * 10);
          const nx = dxToCursor / distToCursor;
          const ny = dyToCursor / distToCursor;
          const tx = -ny;
          const ty = nx;
          drawX += nx * repel + tx * force * (particle.swirl * 1.2);
          drawY += ny * repel + ty * force * (particle.swirl * 1.2);
        }

        const dxVoid = drawX - target.x;
        const dyVoid = drawY - target.y;
        const distVoid = Math.hypot(dxVoid, dyVoid) || 1;
        const voidAngle = Math.atan2(dyVoid, dxVoid);
        const voidWobble =
          0.82 +
          Math.sin(voidAngle * 3.1 + particle.phase + time * 0.0009) * 0.16 +
          Math.cos(voidAngle * 5.3 - time * 0.0007 + particle.phase * 0.6) * 0.08;
        const localVoidRadius = cursorVoidRadius * voidWobble;
        if (distVoid < localVoidRadius) {
          const nx = dxVoid / distVoid;
          const ny = dyVoid / distVoid;
          const tx = -ny;
          const ty = nx;
          const escape = 1 - distVoid / localVoidRadius;
          const soften = escape * escape;
          const pushOut = soften * localVoidRadius * 0.82;
          drawX += nx * pushOut + tx * (soften * particle.swirl * localVoidRadius * 0.12);
          drawY += ny * pushOut + ty * (soften * particle.swirl * localVoidRadius * 0.12);
        }

        const drawDx = drawX - current.x;
        const drawDy = drawY - current.y;
        const drawDistance = Math.hypot(drawDx, drawDy) || 1;
        const angleT = (Math.sin(Math.atan2(drawDy, drawDx) + 0.8) + 1) * 0.5;
        const radialT = clamp(drawDistance / maxDiag, 0, 1);
        const depthT = clamp((perspective - 0.55) / 1.3, 0, 1);
        const colorMix = clamp(angleT * 0.7 + radialT * 0.18 + (1 - depthT) * 0.12, 0, 1);

        const dotAlpha = 1;
        const radius = particle.size * (0.45 + perspective * 0.55) + force * 0.85;

        ctx.fillStyle = `rgba(${mixColor(colorMix)},${dotAlpha})`;
        if (radius < 0.78) {
          ctx.fillRect(drawX, drawY, 1, 1);
        } else {
          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = window.requestAnimationFrame(draw);
    };

    setSize();
    raf = window.requestAnimationFrame(draw);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(setSize);
      resizeObserver.observe(wrapper);
    } else {
      window.addEventListener("resize", setSize);
    }
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerdown", onPointerMove);
    window.addEventListener("blur", resetPointer);

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", setSize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("blur", resetPointer);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.28)_0%,rgba(246,249,255,0.14)_38%,rgba(239,244,251,0.08)_100%)]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
