"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";

type Stage =
  | "standby"
  | "3"
  | "2"
  | "1"
  | "ignition"
  | "launch"
  | "impact"
  | "reveal";

const particles = Array.from({ length: 38 });
const speedLines = [6, 12, 19, 27, 35, 43, 51, 59, 67, 75, 83, 91];

export default function RocketIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [stage, setStage] = useState<Stage>("standby");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      const timer = window.setTimeout(onComplete, 180);
      return () => window.clearTimeout(timer);
    }

    const timers = [
      window.setTimeout(() => setStage("3"), 700),
      window.setTimeout(() => setStage("2"), 1800),
      window.setTimeout(() => setStage("1"), 2900),
      window.setTimeout(() => setStage("ignition"), 4000),
      window.setTimeout(() => setStage("launch"), 4800),
      window.setTimeout(() => setStage("impact"), 5900),
      window.setTimeout(() => setStage("reveal"), 6350),
      window.setTimeout(onComplete, 7150),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [onComplete, reduceMotion]);

  const countdown = stage === "3" || stage === "2" || stage === "1";
  const flying = stage === "launch" || stage === "impact";

  const progress =
    stage === "standby"
      ? 0.05
      : stage === "3"
        ? 0.18
        : stage === "2"
          ? 0.32
          : stage === "1"
            ? 0.47
            : stage === "ignition"
              ? 0.64
              : stage === "launch"
                ? 0.82
                : stage === "impact"
                  ? 0.95
                  : 1;

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#050506]"
    >
      <div
        className="absolute -inset-10 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(circle at 8% 12%, rgba(255,255,255,.7) 0 1px, transparent 1.5px),
            radial-gradient(circle at 19% 71%, rgba(255,255,255,.4) 0 1px, transparent 1.5px),
            radial-gradient(circle at 31% 28%, rgba(49,92,255,.75) 0 1.1px, transparent 1.7px),
            radial-gradient(circle at 43% 87%, rgba(255,255,255,.5) 0 1px, transparent 1.5px),
            radial-gradient(circle at 56% 18%, rgba(255,255,255,.7) 0 1px, transparent 1.5px),
            radial-gradient(circle at 67% 66%, rgba(255,255,255,.4) 0 1px, transparent 1.5px),
            radial-gradient(circle at 77% 32%, rgba(49,92,255,.65) 0 1.1px, transparent 1.7px),
            radial-gradient(circle at 86% 82%, rgba(255,255,255,.6) 0 1px, transparent 1.5px),
            radial-gradient(circle at 94% 43%, rgba(255,255,255,.65) 0 1px, transparent 1.5px)
          `,
          backgroundSize: "410px 410px",
        }}
      />

      <div className="absolute left-1/2 top-[46%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#315CFF]/[0.045] blur-[145px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(5,5,6,.25)_65%,rgba(5,5,6,.92)_100%)]" />

      <motion.header
        animate={{ opacity: stage === "reveal" ? 0 : 1 }}
        className="absolute inset-x-0 top-0 z-40"
      >
        <div className="mx-5 flex items-center justify-between border-b border-white/[0.08] py-5 sm:py-7 md:mx-9">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-8 w-8 items-center justify-center border border-white/15 font-mono-custom text-[9px] text-[#F2F0EA]">
              JW
            </div>

            <div>
              <p className="font-mono-custom text-[8px] uppercase tracking-[0.22em] text-neutral-500">
                Jacob Wiseman
              </p>
              <p className="mt-1 font-mono-custom text-[7px] uppercase tracking-[0.18em] text-neutral-700">
                Portfolio / 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-[#315CFF]"
            />
            <span className="hidden font-mono-custom text-[8px] uppercase tracking-[0.2em] text-neutral-500 sm:block">
              Launch sequence
            </span>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {stage === "standby" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 z-20 flex items-center justify-center px-5"
          >
            <div className="text-center">
              <p className="font-mono-custom text-[8px] uppercase tracking-[0.35em] text-[#315CFF]">
                Sequence armed
              </p>
              <h2 className="mt-5 text-3xl font-medium tracking-[-0.045em] text-[#F2F0EA] md:text-5xl">
                Ready for launch.
              </h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {countdown && (
          <motion.div
            key={stage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26 }}
            className="absolute inset-0 z-20"
          >
            <div className="absolute left-1/2 top-1/2 h-[min(82vw,610px)] w-[min(82vw,610px)] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 rounded-full border border-white/[0.065]"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[11%] rounded-full border border-dashed border-[#315CFF]/25"
              />

              <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-white/20" />
              <div className="absolute bottom-0 left-1/2 h-6 w-px -translate-x-1/2 bg-white/20" />
              <div className="absolute left-0 top-1/2 h-px w-6 -translate-y-1/2 bg-white/20" />
              <div className="absolute right-0 top-1/2 h-px w-6 -translate-y-1/2 bg-white/20" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  key={`number-${stage}`}
                  initial={{ scale: 1.16, filter: "blur(10px)", opacity: 0 }}
                  animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
                  exit={{ scale: 0.84, filter: "blur(7px)", opacity: 0 }}
                  transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-center font-mono-custom text-[clamp(7rem,31vw,20rem)] font-medium leading-none tabular-nums tracking-normal text-[#F2F0EA]"
                >
                  <span
                    className={`block w-[1ch] text-center ${
                      stage === "1" ? "relative left-[0.025em]" : ""
                    }`}
                  >
                    {stage}
                  </span>
                </motion.div>
              </div>

              <motion.div
                key={`pulse-${stage}`}
                initial={{ inset: "28%", opacity: 0.26 }}
                animate={{ inset: "5%", opacity: 0 }}
                transition={{ duration: 0.95, ease: "easeOut" }}
                className="absolute rounded-full border border-[#315CFF]"
              />
            </div>

            <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center sm:bottom-[15%]">
              <p className="font-mono-custom text-[7px] uppercase tracking-[0.34em] text-neutral-700">
                T minus
              </p>
              <p className="mt-2 font-mono-custom text-[11px] tabular-nums tracking-[0.25em] text-[#D8D0C0]">
                00:{stage.padStart(2, "0")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage === "ignition" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-x-0 top-[22%] z-30 px-5 text-center sm:top-[24%]"
          >
            <p className="font-mono-custom text-[8px] uppercase tracking-[0.4em] text-[#315CFF]">
              Ignition
            </p>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.055em] text-[#F2F0EA] md:text-6xl">
              Engines online.
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(stage === "ignition" || stage === "launch") && (
          <motion.div
            initial={{ x: "-50%", y: 240, opacity: 0 }}
            animate={
              stage === "ignition"
                ? { x: "-50%", y: 0, opacity: 1 }
                : { x: "-50%", y: -950, opacity: 1 }
            }
            transition={
              stage === "launch"
                ? { duration: 1.05, ease: [0.3, 0, 0.1, 1] }
                : { duration: 0.68, ease: [0.16, 1, 0.3, 1] }
            }
            className="absolute bottom-[7%] left-1/2 z-30 sm:bottom-[8%]"
          >
            <motion.div
              animate={
                stage === "ignition"
                  ? { x: [-1.5, 1.5, -1, 1, 0] }
                  : undefined
              }
              transition={{ duration: 0.1, repeat: Infinity }}
              className="relative"
            >
              <svg
                viewBox="0 0 92 182"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-20 h-auto w-[70px] overflow-visible sm:w-[78px] md:w-[88px]"
              >
                <path d="M46 3C31 22 23 43 23 68H69C69 43 61 22 46 3Z" fill="#F2F0EA" />
                <path d="M23 68H69V126H23V68Z" fill="#E4E2DD" />
                <circle cx="46" cy="51" r="11" fill="#315CFF" />
                <circle cx="46" cy="51" r="6.5" fill="#07102E" />
                <rect x="42" y="73" width="8" height="45" fill="#315CFF" />
                <path d="M23 93L8 128V146L28 126V93H23Z" fill="#A9AAB0" />
                <path d="M69 93L84 128V146L64 126V93H69Z" fill="#A9AAB0" />
                <path d="M31 126H61L57 140H35L31 126Z" fill="#77787E" />
              </svg>

              <motion.div
                animate={{
                  scaleY:
                    stage === "launch"
                      ? [1.35, 1.85, 1.5]
                      : [0.7, 1.08, 0.82],
                }}
                transition={{ duration: 0.11, repeat: Infinity, repeatType: "reverse" }}
                className="absolute left-1/2 top-[106px] h-36 w-7 -translate-x-1/2 origin-top bg-[linear-gradient(to_bottom,#fff_0%,#b8c6ff_16%,#315CFF_46%,transparent_100%)] blur-[2px] sm:top-[119px] sm:h-40 sm:w-8 md:top-[139px] md:h-44"
              />

              <div className="absolute left-1/2 top-[112px] h-48 w-24 -translate-x-1/2 bg-[linear-gradient(to_bottom,rgba(49,92,255,.3),transparent)] blur-3xl sm:top-[126px] md:top-[145px] md:h-64 md:w-28" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 overflow-hidden"
          >
            {speedLines.map((left, index) => (
              <motion.span
                key={left}
                initial={{ y: -150, opacity: 0, scaleY: 0.25 }}
                animate={{ y: 1250, opacity: [0, 0.6, 0], scaleY: 2 }}
                transition={{
                  duration: 0.5 + (index % 4) * 0.07,
                  delay: (index % 5) * 0.03,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ left: `${left}%` }}
                className="absolute top-0 h-24 w-px origin-top bg-gradient-to-b from-transparent via-white/40 to-transparent"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {(stage === "impact" || stage === "reveal") && (
        <div className="absolute left-1/2 top-[34%] z-40">
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            transition={{ duration: 0.72 }}
            className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-white"
          />
          <motion.div
            initial={{ scale: 0.1, opacity: 0.9 }}
            animate={{ scale: 13, opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute -left-16 -top-16 h-32 w-32 rounded-full border border-white"
          />
          <motion.div
            initial={{ scale: 0.1, opacity: 0.8 }}
            animate={{ scale: 16, opacity: 0 }}
            transition={{ duration: 1, delay: 0.04 }}
            className="absolute -left-14 -top-14 h-28 w-28 rounded-full border border-[#315CFF]"
          />

          {particles.map((_, index) => {
            const angle = (index / particles.length) * Math.PI * 2;
            const distance = 150 + (index % 8) * 25;

            return (
              <motion.span
                key={index}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.65 + (index % 4) * 0.08, ease: "easeOut" }}
                className={`absolute rounded-full ${
                  index % 4 === 0
                    ? "h-2 w-2 bg-[#315CFF]"
                    : "h-1 w-1 bg-white"
                }`}
              />
            );
          })}
        </div>
      )}

      {stage === "impact" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.88, 0] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-50 bg-white"
        />
      )}

      <motion.div
        initial={false}
        animate={stage === "reveal" ? { y: "-101%" } : { y: 0 }}
        transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 top-0 z-[5] h-1/2 bg-[#050506]"
      />

      <motion.div
        initial={false}
        animate={stage === "reveal" ? { y: "101%" } : { y: 0 }}
        transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-x-0 bottom-0 z-[5] h-1/2 bg-[#050506]"
      />

      <motion.footer
        animate={{ opacity: stage === "reveal" ? 0 : 1 }}
        className="absolute inset-x-0 bottom-0 z-40"
      >
        <div className="mx-5 border-t border-white/[0.08] py-5 sm:py-7 md:mx-9">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono-custom text-[7px] uppercase tracking-[0.22em] text-neutral-700">
              Preparing portfolio
            </span>
            <span className="font-mono-custom text-[7px] tabular-nums tracking-[0.18em] text-neutral-500">
              {Math.round(progress * 100)}%
            </span>
          </div>

          <div className="h-px overflow-hidden bg-white/[0.08]">
            <motion.div
              animate={{ scaleX: progress }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full origin-left bg-[#315CFF]"
            />
          </div>
        </div>
      </motion.footer>

      {stage !== "reveal" && (
        <button
          type="button"
          onClick={onComplete}
          className="pointer-events-auto absolute bottom-[76px] right-5 z-[70] min-h-10 touch-manipulation font-mono-custom text-[7px] uppercase tracking-[0.2em] text-neutral-700 transition hover:text-[#D8D0C0] sm:bottom-[86px] md:right-9"
        >
          Skip intro →
        </button>
      )}
    </motion.div>
  );
}
