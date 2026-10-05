"use client";

import {
  useRef,
  useState,
} from "react";

import type {
  KeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

import {
  animate,
  motion,
  useMotionValue,
} from "motion/react";

type Entry =
  | {
      type: "command";
      text: string;
    }
  | {
      type: "output";
      lines: string[];
    }
  | {
      type: "profile";
    }
  | {
      type: "projects";
    };

const INITIAL_HISTORY: Entry[] = [
  {
    type: "output",
    lines: [
      "Portfolio Linux 6.12.0",
      "Copyright (c) 2026 Jacob Wiseman",
      "",
      "Session initialized.",
      "",
    ],
  },
  {
    type: "command",
    text: "fastfetch",
  },
  {
    type: "profile",
  },
  {
    type: "output",
    lines: [
      "",
      "Type 'help' to explore.",
      "",
    ],
  },
];

function clamp(
  value: number,
  min: number,
  max: number,
) {
  return Math.max(
    min,
    Math.min(max, value),
  );
}

function ProfileImage() {
  const [failed, setFailed] =
    useState(false);

  if (failed) {
    return (
      <div className="flex h-[150px] w-[118px] items-center justify-center border border-white/10 bg-white/[0.03] text-3xl font-semibold tracking-[-0.08em] text-white">
        JW
      </div>
    );
  }

  return (
    <img
      src="/jacob-photo.jpg"
      alt="Jacob Wiseman"
      draggable={false}
      onError={() =>
        setFailed(true)
      }
      className="h-[150px] w-[118px] border border-white/10 object-cover"
    />
  );
}

export default function ComputerDropHero() {
  /* =======================================================
     PENDULUM
  ======================================================= */

  const angle =
    useMotionValue(0);

  const dragging =
    useRef(false);

  const startX =
    useRef(0);

  const startAngle =
    useRef(0);

  const lastX =
    useRef(0);

  const lastTime =
    useRef(0);

  const angularVelocity =
    useRef(0);

  const returnAnimation =
    useRef<
      ReturnType<typeof animate> |
      null
    >(null);

  function beginSwing(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      event.button !== 0
    ) {
      return;
    }

    const target =
      event.target as HTMLElement;

    if (
      target.closest(
        "[data-terminal-interactive='true']",
      )
    ) {
      return;
    }

    returnAnimation.current?.stop();

    dragging.current = true;

    startX.current =
      event.clientX;

    startAngle.current =
      angle.get();

    lastX.current =
      event.clientX;

    lastTime.current =
      performance.now();

    angularVelocity.current =
      0;

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );
  }

  function moveSwing(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      !dragging.current
    ) {
      return;
    }

    if (
      (event.buttons & 1) !== 1
    ) {
      endSwing(event);
      return;
    }

    const delta =
      event.clientX -
      startX.current;

    const nextAngle =
      clamp(
        startAngle.current +
          delta * 0.115,
        -62,
        62,
      );

    angle.set(
      nextAngle,
    );

    const now =
      performance.now();

    const elapsed =
      Math.max(
        now -
          lastTime.current,
        1,
      );

    const pointerVelocity =
      (event.clientX -
        lastX.current) /
      elapsed;

    angularVelocity.current =
      pointerVelocity *
      115;

    lastX.current =
      event.clientX;

    lastTime.current =
      now;
  }

  function endSwing(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      !dragging.current
    ) {
      return;
    }

    dragging.current =
      false;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    } catch {
      // already released
    }

    returnAnimation.current =
      animate(
        angle,
        0,
        {
          type: "spring",
          stiffness: 24,
          damping: 3.2,
          mass: 1.8,
          velocity: clamp(
            angularVelocity.current,
            -420,
            420,
          ),
          restSpeed: 0.15,
          restDelta: 0.08,
        },
      );
  }

  /* =======================================================
     TERMINAL
  ======================================================= */

  const [
    history,
    setHistory,
  ] =
    useState<Entry[]>(
      INITIAL_HISTORY,
    );

  const [
    command,
    setCommand,
  ] =
    useState("");

  const terminalBottom =
    useRef<HTMLDivElement>(
      null,
    );

  function append(
    ...items: Entry[]
  ) {
    setHistory(
      (current) => [
        ...current,
        ...items,
      ],
    );

    window.setTimeout(
      () => {
        terminalBottom.current?.scrollIntoView(
          {
            behavior: "smooth",
            block: "nearest",
          },
        );
      },
      30,
    );
  }

  function execute(
    value: string,
  ) {
    const raw =
      value.trim();

    const normalized =
      raw.toLowerCase();

    if (
      normalized === "clear"
    ) {
      setHistory([]);
      return;
    }

    append({
      type: "command",
      text: raw,
    });

    if (!raw) {
      return;
    }

    switch (
      normalized
    ) {
      case "help":
        append({
          type: "output",
          lines: [
            "",
            "AVAILABLE COMMANDS",
            "────────────────────────────────────────",
            "about       who I am",
            "skills      technical focus",
            "projects    featured work",
            "photo       display profile image",
            "fastfetch   system/profile summary",
            "whoami      current user",
            "pwd         current directory",
            "ls          list portfolio",
            "uname -a    system information",
            "date        session date",
            "clear       clear terminal",
            "",
          ],
        });
        break;

      case "whoami":
        append({
          type: "output",
          lines: [
            "",
            "jacob",
            "",
          ],
        });
        break;

      case "pwd":
        append({
          type: "output",
          lines: [
            "",
            "/home/jacob/portfolio",
            "",
          ],
        });
        break;

      case "ls":
      case "ls -la":
        append({
          type: "output",
          lines: [
            "",
            "drwxr-xr-x  about/",
            "drwxr-xr-x  experience/",
            "drwxr-xr-x  projects/",
            "drwxr-xr-x  contact/",
            "-rw-r--r--  resume.pdf",
            "",
          ],
        });
        break;

      case "uname":
      case "uname -a":
        append({
          type: "output",
          lines: [
            "",
            "Linux portfolio 6.12.0 x86_64 GNU/Linux",
            "",
          ],
        });
        break;

      case "date":
        append({
          type: "output",
          lines: [
            "",
            new Date().toString(),
            "",
          ],
        });
        break;

      case "about":
        append({
          type: "output",
          lines: [
            "",
            "Jacob Wiseman",
            "",
            "IT support, networking, infrastructure,",
            "hardware, systems, troubleshooting, and",
            "the practical side of technology.",
            "",
          ],
        });
        break;

      case "skills":
        append({
          type: "output",
          lines: [
            "",
            "support ............ troubleshooting",
            "networking ......... DNS / routing / connectivity",
            "systems ............ Windows / Linux",
            "hardware ........... diagnostics / repair",
            "infrastructure ..... self-hosting / homelab",
            "",
          ],
        });
        break;

      case "projects":
        append({
          type:
            "projects",
        });
        break;

      case "photo":
        append(
          {
            type: "output",
            lines: [
              "",
              "kitten icat ~/Pictures/jacob-photo.jpg",
              "",
            ],
          },
          {
            type:
              "profile",
          },
        );
        break;

      case "fastfetch":
      case "neofetch":
        append({
          type:
            "profile",
        });
        break;

      default:
        append({
          type: "output",
          lines: [
            "",
            `zsh: command not found: ${raw}`,
            "Run 'help' for available commands.",
            "",
          ],
        });
    }
  }

  function terminalKey(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (
      event.key !== "Enter"
    ) {
      return;
    }

    execute(
      command,
    );

    setCommand("");
  }

  return (
    <div className="relative mx-auto min-h-[830px] w-full max-w-[1100px] overflow-visible">
      {/* ===================================================
          PENDULUM ANCHOR
      =================================================== */}

      <div className="absolute left-1/2 top-[-16px] z-30 -translate-x-1/2">
        <div className="mx-auto h-3 w-20 rounded-b-md border-x border-b border-white/10 bg-[#101115]" />

        <div className="mx-auto -mt-px h-6 w-6 rounded-full border border-white/20 bg-[#17191e] shadow-[0_0_24px_rgba(49,92,255,0.14)]">
          <div className="absolute left-1/2 top-[14px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#315cff]" />
        </div>
      </div>

      {/* ===================================================
          FULL SWINGING ASSEMBLY
      =================================================== */}

      <motion.div
        style={{
          rotate: angle,
          transformOrigin:
            "50% 0px",
        }}
        className="absolute left-1/2 top-[8px] z-20 w-full -translate-x-1/2"
      >
        {/* ROPE */}

        <motion.div
          initial={{
            scaleY: 0,
          }}
          animate={{
            scaleY: 1,
          }}
          transition={{
            delay: 0.25,
            duration: 0.9,
            ease: [
              0.16,
              1,
              0.3,
              1,
            ],
          }}
          className="absolute left-1/2 top-0 h-[235px] w-px origin-top -translate-x-1/2 bg-gradient-to-b from-white/65 via-white/35 to-white/15"
        />

        <motion.div
          initial={{
            scaleY: 0,
          }}
          animate={{
            scaleY: 1,
          }}
          transition={{
            delay: 0.25,
            duration: 0.9,
          }}
          className="absolute left-[calc(50%+1px)] top-0 h-[235px] w-px origin-top bg-[#315cff]/25"
        />

        {/* =================================================
            DEVICE DROPS FROM ABOVE
        ================================================= */}

        <motion.div
          initial={{
            y: -1050,
            opacity: 1,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            duration: 1.35,
            delay: 0.15,
            ease: [
              0.12,
              0.72,
              0.18,
              1,
            ],
          }}
          className="absolute left-1/2 top-[220px] -translate-x-1/2"
        >
          {/* hook */}

          <div className="absolute left-1/2 top-[-12px] z-40 h-7 w-7 -translate-x-1/2 rounded-full border border-white/20 bg-[#15171b] shadow-[0_0_20px_rgba(0,0,0,.7)]">

            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#315cff]" />

          </div>

          {/* ===============================================
              COMPUTER
          =============================================== */}

          <div
            onPointerDown={
              beginSwing
            }
            onPointerMove={
              moveSwing
            }
            onPointerUp={
              endSwing
            }
            onPointerCancel={
              endSwing
            }
            className="relative w-[94vw] max-w-[850px] cursor-grab select-none touch-none rounded-[26px] border border-white/[0.13] bg-[#15171b] p-3 shadow-[0_55px_150px_rgba(0,0,0,.82)] active:cursor-grabbing"
          >
            {/* hardware highlight */}

            <div className="pointer-events-none absolute inset-x-8 top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* webcam */}

            <div className="absolute left-1/2 top-[7px] z-40 flex -translate-x-1/2 items-center gap-1">

              <div className="h-1.5 w-1.5 rounded-full bg-[#050506]" />

              <div className="h-1 w-1 rounded-full bg-[#315cff]/50" />

            </div>

            {/* =============================================
                TERMINAL WINDOW
            ============================================= */}

            <div className="overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#060708]">

              {/* window chrome */}

              <div
                data-terminal-interactive="true"
                className="relative flex h-11 items-center border-b border-white/[0.08] bg-[#101114] px-4"
              >
                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />

                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />

                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />

                </div>

                <div className="absolute left-1/2 -translate-x-1/2 font-mono-custom text-[9px] text-neutral-500">
                  jacob@portfolio: ~
                </div>

                <div className="ml-auto hidden items-center gap-2 md:flex">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#315cff]" />

                  <span className="font-mono-custom text-[7px] uppercase tracking-[0.18em] text-neutral-600">
                    tty1
                  </span>

                </div>
              </div>

              {/* terminal */}

              <div
                data-terminal-interactive="true"
                className="relative min-h-[470px] bg-[#060708]"
              >
                {/* subtle phosphor glow */}

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(49,92,255,0.055),transparent_50%)]" />

                {/* scan lines */}

                <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background:repeating-linear-gradient(to_bottom,white_0px,white_1px,transparent_1px,transparent_4px)]" />

                <div className="relative z-10 max-h-[470px] overflow-y-auto p-5 font-mono-custom text-[10px] leading-5 text-[#adb0b8] md:p-7 md:text-[12px] md:leading-6">

                  {history.map(
                    (
                      entry,
                      index,
                    ) => {
                      if (
                        entry.type ===
                        "command"
                      ) {
                        return (
                          <div
                            key={
                              index
                            }
                            className="whitespace-pre-wrap"
                          >
                            <span className="text-[#8ca6ff]">
                              jacob@portfolio
                            </span>

                            <span className="text-neutral-600">
                              :
                            </span>

                            <span className="text-[#7dd3fc]">
                              ~
                            </span>

                            <span className="text-neutral-600">
                              $
                            </span>

                            {" "}

                            <span className="text-[#e5e7eb]">
                              {
                                entry.text
                              }
                            </span>
                          </div>
                        );
                      }

                      if (
                        entry.type ===
                        "output"
                      ) {
                        return (
                          <div
                            key={
                              index
                            }
                            className="whitespace-pre-wrap"
                          >
                            {entry.lines.map(
                              (
                                line,
                                lineIndex,
                              ) => (
                                <div
                                  key={
                                    lineIndex
                                  }
                                >
                                  {line ||
                                    "\u00a0"}
                                </div>
                              ),
                            )}
                          </div>
                        );
                      }

                      if (
                        entry.type ===
                        "profile"
                      ) {
                        return (
                          <div
                            key={
                              index
                            }
                            className="my-4 grid gap-5 md:grid-cols-[135px_1fr]"
                          >
                            <ProfileImage />

                            <div className="min-w-0">

                              <p className="text-[#8ca6ff]">
                                jacob@portfolio
                              </p>

                              <p className="text-neutral-600">
                                ───────────────────────────────
                              </p>

                              <TerminalFact
                                name="Name"
                                value="Jacob Wiseman"
                              />

                              <TerminalFact
                                name="Role"
                                value="IT Support / Networking / Systems"
                              />

                              <TerminalFact
                                name="Location"
                                value="Charleston, WV"
                              />

                              <TerminalFact
                                name="Focus"
                                value="Infrastructure / Troubleshooting"
                              />

                              <TerminalFact
                                name="Status"
                                value="Available for opportunities"
                                accent
                              />

                              <TerminalFact
                                name="Shell"
                                value="zsh"
                              />

                              <TerminalFact
                                name="Portfolio"
                                value="v1.0.0"
                              />

                            </div>
                          </div>
                        );
                      }

                      if (
                        entry.type ===
                        "projects"
                      ) {
                        return (
                          <div
                            key={
                              index
                            }
                            className="my-3"
                          >

                            <div>
                              total 3
                            </div>

                            <div>
                              drwxr-xr-x&nbsp;&nbsp;
                              <a
                                href="/projects/homelab"
                                className="text-[#8ca6ff] hover:underline"
                              >
                                homelab/
                              </a>
                            </div>

                            <div>
                              drwxr-xr-x&nbsp;&nbsp;
                              <a
                                href="/projects/northstar-it"
                                className="text-[#8ca6ff] hover:underline"
                              >
                                northstar-it/
                              </a>
                            </div>

                            <div>
                              drwxr-xr-x&nbsp;&nbsp;
                              <a
                                href="/projects"
                                className="text-[#8ca6ff] hover:underline"
                              >
                                all-projects/
                              </a>
                            </div>

                            <div className="h-3" />

                          </div>
                        );
                      }

                      return null;
                    },
                  )}

                  {/* active shell prompt */}

                  <div className="flex min-w-0 items-center">

                    <span className="shrink-0 text-[#8ca6ff]">
                      jacob@portfolio
                    </span>

                    <span className="text-neutral-600">
                      :
                    </span>

                    <span className="text-[#7dd3fc]">
                      ~
                    </span>

                    <span className="mr-2 text-neutral-600">
                      $
                    </span>

                    <input
                      value={
                        command
                      }
                      onChange={(
                        event,
                      ) =>
                        setCommand(
                          event.target.value,
                        )
                      }
                      onKeyDown={
                        terminalKey
                      }
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      aria-label="Portfolio terminal command"
                      className="min-w-0 flex-1 bg-transparent font-mono-custom text-[10px] text-[#f3f4f6] caret-[#315cff] outline-none md:text-[12px]"
                    />

                  </div>

                  <div
                    ref={
                      terminalBottom
                    }
                  />

                </div>
              </div>

            </div>

            {/* bottom hardware */}

            <div className="relative mx-auto mt-3 h-[5px] w-28 rounded-full bg-white/[0.055]" />

          </div>

          {/* stand */}

          <div className="mx-auto h-11 w-6 bg-gradient-to-b from-[#26282d] to-[#111318]" />

          <div className="mx-auto h-3 w-40 rounded-full border-t border-white/[0.06] bg-[#191b20] shadow-[0_14px_45px_rgba(0,0,0,.7)] md:w-52" />

          <div className="mt-6 text-center font-mono-custom text-[8px] uppercase tracking-[0.22em] text-neutral-700">
            grab the frame · pull · release
          </div>

        </motion.div>

      </motion.div>
    </div>
  );
}

function TerminalFact({
  name,
  value,
  accent = false,
}: {
  name: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex gap-3">

      <span className="w-[72px] shrink-0 text-neutral-600">
        {name}
      </span>

      <span
        className={
          accent
            ? "text-[#8ca6ff]"
            : "text-neutral-300"
        }
      >
        {value}
      </span>

    </div>
  );
}
