"use client";

import {
  motion,
} from "motion/react";

function FloatingLine({
  text,
}: {
  text: string;
}) {
  return (
    <span className="block">
      {text
        .split("")
        .map(
          (
            letter,
            index,
          ) => (
            <motion.span
              key={`${letter}-${index}`}
              whileHover={{
                y: -18,
                rotate:
                  index % 2 ===
                  0
                    ? -4
                    : 4,

                scale: 1.05,
              }}
              transition={{
                type:
                  "spring",

                stiffness:
                  280,

                damping:
                  15,
              }}
              className="inline-block cursor-default"
            >
              {letter}
            </motion.span>
          ),
        )}
    </span>
  );
}

export default function FloatingName() {
  return (
    <>
      <FloatingLine text="Jacob" />
      <FloatingLine text="Wiseman" />
    </>
  );
}
