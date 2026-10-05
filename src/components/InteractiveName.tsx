"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  animate,
  motion,
  useMotionValue,
} from "motion/react";

type Tone = "white" | "ivory" | "blue";

function Letter({
  letter,
  tone,
  draggable,
}: {
  letter: string;
  tone: Tone;
  draggable: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const color =
    tone === "blue"
      ? "text-[#315CFF]"
      : tone === "ivory"
        ? "text-[#D8D0C0]"
        : "text-[#F2F0EA]";

  function reset() {
    animate(x, 0, { type: "spring", stiffness: 300, damping: 22 });
    animate(y, 0, { type: "spring", stiffness: 300, damping: 22 });
    animate(rotate, 0, { type: "spring", stiffness: 300, damping: 22 });
  }

  return (
    <motion.span
      drag={draggable}
      dragMomentum={false}
      dragElastic={0.08}
      dragConstraints={{ left: -100, right: 100, top: -65, bottom: 65 }}
      style={{ x, y, rotate }}
      onDrag={(_, info) => {
        rotate.set(Math.max(-9, Math.min(9, info.velocity.x / 140)));
      }}
      onDragEnd={() => {
        animate(rotate, 0, {
          type: "spring",
          stiffness: 260,
          damping: 18,
        });
      }}
      onDoubleClick={reset}
      whileHover={draggable ? { y: -6, scale: 1.025 } : undefined}
      whileDrag={{ scale: 1.065, zIndex: 50 }}
      title={draggable ? "Drag · double-click to reset" : undefined}
      className={`relative inline-block select-none ${color} ${
        draggable ? "cursor-grab active:cursor-grabbing" : "cursor-default"
      }`}
    >
      {letter}
    </motion.span>
  );
}

function Letters({
  text,
  tone,
  draggable,
}: {
  text: string;
  tone: Tone;
  draggable: boolean;
}) {
  return (
    <>
      {text.split("").map((letter, index) => (
        <Letter
          key={`${text}-${index}`}
          letter={letter}
          tone={tone}
          draggable={draggable}
        />
      ))}
    </>
  );
}

export default function InteractiveName() {
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarsePointer(query.matches);

    update();
    query.addEventListener?.("change", update);

    return () => query.removeEventListener?.("change", update);
  }, []);

  const draggable = !coarsePointer;

  return (
    <div className="relative w-fit">
      <span className="block whitespace-nowrap">
        <Letters text="Jacob" tone="white" draggable={draggable} />
      </span>

      <span className="block whitespace-nowrap">
        <Letters text="Wise" tone="ivory" draggable={draggable} />
        <Letters text="man." tone="blue" draggable={draggable} />
      </span>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 1.1,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mt-7 h-px w-full origin-left bg-gradient-to-r from-[#315CFF] via-[#D8D0C0]/30 to-transparent"
      />

      <p className="mt-4 hidden font-mono-custom text-[7px] uppercase tracking-[0.22em] text-neutral-700 md:block">
        drag letters · double-click to reset
      </p>
    </div>
  );
}
