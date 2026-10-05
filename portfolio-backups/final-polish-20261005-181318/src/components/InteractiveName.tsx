"use client";

import {
  animate,
  motion,
  useMotionValue,
} from "motion/react";

function Letter({
  letter,
  accent = false,
}: {
  letter: string;
  accent?: boolean;
}) {
  const x =
    useMotionValue(0);

  const y =
    useMotionValue(0);

  const rotate =
    useMotionValue(0);

  function reset() {
    animate(
      x,
      0,
      {
        type: "spring",
        stiffness: 280,
        damping: 20,
      },
    );

    animate(
      y,
      0,
      {
        type: "spring",
        stiffness: 280,
        damping: 20,
      },
    );

    animate(
      rotate,
      0,
      {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    );
  }

  return (
    <motion.span
      drag
      dragMomentum
      dragElastic={0.12}
      dragConstraints={{
        left: -130,
        right: 130,
        top: -90,
        bottom: 90,
      }}
      style={{
        x,
        y,
        rotate,
      }}
      onDrag={(
        _,
        info,
      ) => {
        const next =
          Math.max(
            -12,
            Math.min(
              12,
              info.velocity.x /
                100,
            ),
          );

        rotate.set(next);
      }}
      onDragEnd={() => {
        animate(
          rotate,
          0,
          {
            type: "spring",
            stiffness: 220,
            damping: 16,
          },
        );
      }}
      onDoubleClick={reset}
      whileHover={{
        y: -7,
        scale: 1.035,
      }}
      whileDrag={{
        scale: 1.09,
        zIndex: 50,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      title="Drag · double-click to reset"
      className={`
        relative
        inline-block
        cursor-grab
        select-none
        touch-none
        active:cursor-grabbing

        ${
          accent
            ? "text-[#315CFF]"
            : "text-[#F2F0EA]"
        }
      `}
    >
      {letter}
    </motion.span>
  );
}

function Word({
  text,
  accent = false,
}: {
  text: string;
  accent?: boolean;
}) {
  return (
    <span className="block whitespace-nowrap">
      {text
        .split("")
        .map(
          (
            letter,
            index,
          ) => (
            <Letter
              key={`${text}-${index}`}
              letter={letter}
              accent={accent}
            />
          ),
        )}
    </span>
  );
}

export default function InteractiveName() {
  return (
    <div className="relative w-fit">
      <Word text="Jacob" />

      <Word
        text="Wiseman."
        accent
      />

      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={{
          scaleX: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 1,
          ease: [
            0.16,
            1,
            0.3,
            1,
          ],
        }}
        className="mt-7 h-px w-full origin-left bg-gradient-to-r from-[#315CFF] via-[#D8D0C0]/35 to-transparent"
      />

      <div className="mt-4 flex items-center gap-3">
        <span className="h-1 w-1 rounded-full bg-[#D8D0C0]" />

        <p className="font-mono-custom text-[7px] uppercase tracking-[0.23em] text-neutral-700">
          drag the letters · double click to reset
        </p>
      </div>
    </div>
  );
}
