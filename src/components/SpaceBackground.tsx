"use client";

import {
  useEffect,
} from "react";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

export default function SpaceBackground() {
  const reduceMotion =
    useReducedMotion();

  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  const pointerX =
    useMotionValue(0);

  const pointerY =
    useMotionValue(0);

  const smoothX =
    useSpring(mouseX, {
      stiffness: 55,
      damping: 26,
      mass: 0.8,
    });

  const smoothY =
    useSpring(mouseY, {
      stiffness: 55,
      damping: 26,
      mass: 0.8,
    });

  const glowX =
    useSpring(pointerX, {
      stiffness: 100,
      damping: 30,
    });

  const glowY =
    useSpring(pointerY, {
      stiffness: 100,
      damping: 30,
    });

  const farX =
    useTransform(
      smoothX,
      [-1, 1],
      [12, -12],
    );

  const farY =
    useTransform(
      smoothY,
      [-1, 1],
      [10, -10],
    );

  const middleX =
    useTransform(
      smoothX,
      [-1, 1],
      [28, -28],
    );

  const middleY =
    useTransform(
      smoothY,
      [-1, 1],
      [22, -22],
    );

  const nearX =
    useTransform(
      smoothX,
      [-1, 1],
      [52, -52],
    );

  const nearY =
    useTransform(
      smoothY,
      [-1, 1],
      [40, -40],
    );

  const hazeX =
    useTransform(
      smoothX,
      [-1, 1],
      [-70, 70],
    );

  const hazeY =
    useTransform(
      smoothY,
      [-1, 1],
      [-50, 50],
    );

  useEffect(() => {
    pointerX.set(
      window.innerWidth / 2,
    );

    pointerY.set(
      window.innerHeight / 2,
    );

    if (reduceMotion) {
      return;
    }

    function move(
      event: PointerEvent,
    ) {
      const x =
        event.clientX /
          window.innerWidth *
          2 -
        1;

      const y =
        event.clientY /
          window.innerHeight *
          2 -
        1;

      mouseX.set(x);
      mouseY.set(y);

      pointerX.set(
        event.clientX,
      );

      pointerY.set(
        event.clientY,
      );
    }

    function leave() {
      mouseX.set(0);
      mouseY.set(0);
    }

    window.addEventListener(
      "pointermove",
      move,
    );

    document.documentElement.addEventListener(
      "mouseleave",
      leave,
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        move,
      );

      document.documentElement.removeEventListener(
        "mouseleave",
        leave,
      );
    };
  }, [
    mouseX,
    mouseY,
    pointerX,
    pointerY,
    reduceMotion,
  ]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070708]"
    >
      {/* CURSOR LIGHT */}

      <motion.div
        style={{
          left: glowX,
          top: glowY,
        }}
        className="absolute h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(49,92,255,0.10)_0%,rgba(49,92,255,0.035)_30%,transparent_68%)] blur-3xl"
      />

      {/* MOVING BLUE SPACE HAZE */}

      <motion.div
        style={{
          x: reduceMotion
            ? 0
            : hazeX,

          y: reduceMotion
            ? 0
            : hazeY,
        }}
        className="absolute left-[15%] top-[12%] h-[700px] w-[700px] rounded-full bg-[#315cff]/[0.035] blur-[130px]"
      />

      <motion.div
        style={{
          x: reduceMotion
            ? 0
            : nearX,

          y: reduceMotion
            ? 0
            : nearY,
        }}
        className="absolute bottom-[5%] right-[5%] h-[550px] w-[550px] rounded-full bg-[#315cff]/[0.025] blur-[120px]"
      />

      {/* FAR STAR FIELD */}

      <motion.div
        style={{
          x: reduceMotion
            ? 0
            : farX,

          y: reduceMotion
            ? 0
            : farY,

          backgroundImage: `
            radial-gradient(circle at 8% 13%, rgba(255,255,255,.42) 0 0.7px, transparent 1px),
            radial-gradient(circle at 17% 76%, rgba(255,255,255,.34) 0 0.6px, transparent 1px),
            radial-gradient(circle at 26% 33%, rgba(255,255,255,.42) 0 0.7px, transparent 1px),
            radial-gradient(circle at 39% 88%, rgba(255,255,255,.30) 0 0.7px, transparent 1px),
            radial-gradient(circle at 48% 21%, rgba(255,255,255,.45) 0 0.7px, transparent 1px),
            radial-gradient(circle at 59% 62%, rgba(255,255,255,.30) 0 0.7px, transparent 1px),
            radial-gradient(circle at 68% 15%, rgba(255,255,255,.40) 0 0.7px, transparent 1px),
            radial-gradient(circle at 78% 82%, rgba(255,255,255,.38) 0 0.7px, transparent 1px),
            radial-gradient(circle at 88% 43%, rgba(255,255,255,.45) 0 0.7px, transparent 1px),
            radial-gradient(circle at 94% 9%, rgba(255,255,255,.34) 0 0.7px, transparent 1px)
          `,

          backgroundSize:
            "410px 410px",
        }}
        className="absolute -inset-24 opacity-75"
      />

      {/* MID STAR FIELD */}

      <motion.div
        style={{
          x: reduceMotion
            ? 0
            : middleX,

          y: reduceMotion
            ? 0
            : middleY,

          backgroundImage: `
            radial-gradient(circle at 12% 22%, rgba(255,255,255,.75) 0 1px, transparent 1.5px),
            radial-gradient(circle at 31% 66%, rgba(255,255,255,.55) 0 1px, transparent 1.5px),
            radial-gradient(circle at 46% 14%, rgba(49,92,255,.82) 0 1.15px, transparent 1.7px),
            radial-gradient(circle at 61% 79%, rgba(255,255,255,.65) 0 1px, transparent 1.5px),
            radial-gradient(circle at 74% 39%, rgba(255,255,255,.58) 0 1px, transparent 1.5px),
            radial-gradient(circle at 91% 71%, rgba(49,92,255,.70) 0 1.15px, transparent 1.7px)
          `,

          backgroundSize:
            "690px 690px",
        }}
        className="absolute -inset-28 opacity-60"
      />

      {/* CLOSE STARS */}

      <motion.div
        style={{
          x: reduceMotion
            ? 0
            : nearX,

          y: reduceMotion
            ? 0
            : nearY,

          backgroundImage: `
            radial-gradient(circle at 16% 16%, rgba(255,255,255,.95) 0 1.3px, transparent 2px),
            radial-gradient(circle at 35% 81%, rgba(49,92,255,.95) 0 1.4px, transparent 2px),
            radial-gradient(circle at 57% 31%, rgba(255,255,255,.85) 0 1.2px, transparent 1.9px),
            radial-gradient(circle at 82% 63%, rgba(255,255,255,.90) 0 1.3px, transparent 2px)
          `,

          backgroundSize:
            "920px 920px",
        }}
        className="absolute -inset-32 opacity-55"
      />

      {/* VERY SUBTLE GRID / DEPTH */}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(7,7,8,0.28)_65%,rgba(7,7,8,0.82)_100%)]" />
    </div>
  );
}
