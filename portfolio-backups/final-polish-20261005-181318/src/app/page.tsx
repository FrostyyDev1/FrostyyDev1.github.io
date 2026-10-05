"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import Link from "next/link";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  ArrowDown,
  ArrowRight,
  RefreshCcw,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import SpaceBackground from "@/components/SpaceBackground";
import RocketIntro from "@/components/RocketIntro";
import ComputerDropHero from "@/components/ComputerDropHero";
import PortfolioPlaylist from "@/components/PortfolioPlaylist";
import InteractiveName from "@/components/InteractiveName";

/* =========================================================
   GAME
========================================================= */

type Position = {
  x: number;
  y: number;
};

const GRID = 7;

const levels = [
  {
    start: {
      x: 0,
      y: 6,
    },

    goal: {
      x: 6,
      y: 0,
    },

    blocked: [
      { x: 2, y: 6 },
      { x: 2, y: 5 },
      { x: 2, y: 4 },
      { x: 4, y: 3 },
      { x: 5, y: 3 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ],
  },

  {
    start: {
      x: 0,
      y: 0,
    },

    goal: {
      x: 6,
      y: 6,
    },

    blocked: [
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 5, y: 2 },
      { x: 5, y: 3 },
      { x: 5, y: 4 },
      { x: 2, y: 5 },
      { x: 3, y: 5 },
      { x: 4, y: 5 },
    ],
  },
];

export default function Home() {
  /* =======================================================
     INTRO
  ======================================================= */

  const [
    introState,
    setIntroState,
  ] =
    useState<
      "checking" |
      "playing" |
      "done"
    >("checking");

  useEffect(() => {
    const params =
      new URLSearchParams(
        window.location.search,
      );

    const force =
      params.get("intro") ===
      "1";

    const played =
      sessionStorage.getItem(
        "jw-rocket-intro",
      );

    if (
      force ||
      !played
    ) {
      setIntroState(
        "playing",
      );
    } else {
      setIntroState(
        "done",
      );
    }
  }, []);

  const finishIntro =
    useCallback(() => {
      sessionStorage.setItem(
        "jw-rocket-intro",
        "true",
      );

      setIntroState(
        "done",
      );
    }, []);

  /* =======================================================
     GAME
  ======================================================= */

  const [
    levelIndex,
    setLevelIndex,
  ] = useState(0);

  const [
    player,
    setPlayer,
  ] =
    useState<Position>(
      levels[0].start,
    );

  const [
    moves,
    setMoves,
  ] = useState(0);

  const [
    score,
    setScore,
  ] = useState(0);

  const [
    message,
    setMessage,
  ] =
    useState(
      "Deliver the packet.",
    );

  const level =
    levels[levelIndex];

  const blocked =
    useCallback(
      (
        x: number,
        y: number,
      ) =>
        levels[
          levelIndex
        ].blocked.some(
          (item) =>
            item.x === x &&
            item.y === y,
        ),
      [levelIndex],
    );

  const move =
    useCallback(
      (
        dx: number,
        dy: number,
      ) => {
        const current =
          levels[
            levelIndex
          ];

        const next = {
          x:
            player.x +
            dx,

          y:
            player.y +
            dy,
        };

        if (
          next.x < 0 ||
          next.x >= GRID ||
          next.y < 0 ||
          next.y >= GRID
        ) {
          setMessage(
            "Packet dropped.",
          );

          return;
        }

        if (
          current.blocked.some(
            (item) =>
              item.x ===
                next.x &&
              item.y ===
                next.y,
          )
        ) {
          setMessage(
            "Firewall blocked.",
          );

          return;
        }

        const newMoves =
          moves + 1;

        setPlayer(next);
        setMoves(
          newMoves,
        );

        setMessage(
          "Routing...",
        );

        if (
          next.x ===
            current.goal.x &&
          next.y ===
            current.goal.y
        ) {
          setScore(
            (
              currentScore,
            ) =>
              currentScore +
              Math.max(
                800 -
                  newMoves *
                    25,
                200,
              ),
          );

          setMessage(
            "Delivered.",
          );

          window.setTimeout(
            () => {
              const nextLevel =
                (levelIndex +
                  1) %
                levels.length;

              setLevelIndex(
                nextLevel,
              );

              setPlayer(
                levels[
                  nextLevel
                ].start,
              );

              setMoves(0);

              setMessage(
                "New route.",
              );
            },
            700,
          );
        }
      },
      [
        levelIndex,
        moves,
        player,
      ],
    );

  function restart() {
    setPlayer(
      level.start,
    );

    setMoves(0);

    setMessage(
      "Deliver the packet.",
    );
  }

  useEffect(() => {
    function keyboard(
      event: KeyboardEvent,
    ) {
      const element =
        event.target;

      if (
        element instanceof
          HTMLInputElement ||
        element instanceof
          HTMLTextAreaElement
      ) {
        return;
      }

      const key =
        event.key.toLowerCase();

      if (
        key === "w" ||
        key ===
          "arrowup"
      ) {
        event.preventDefault();

        move(
          0,
          -1,
        );
      }

      if (
        key === "s" ||
        key ===
          "arrowdown"
      ) {
        event.preventDefault();

        move(
          0,
          1,
        );
      }

      if (
        key === "a" ||
        key ===
          "arrowleft"
      ) {
        event.preventDefault();

        move(
          -1,
          0,
        );
      }

      if (
        key === "d" ||
        key ===
          "arrowright"
      ) {
        event.preventDefault();

        move(
          1,
          0,
        );
      }
    }

    window.addEventListener(
      "keydown",
      keyboard,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        keyboard,
      );
  }, [move]);

  return (
    <>
      {introState ===
        "checking" && (
        <div className="fixed inset-0 z-[9999] bg-[#050506]" />
      )}

      <AnimatePresence>
        {introState ===
          "playing" && (
          <RocketIntro
            onComplete={
              finishIntro
            }
          />
        )}
      </AnimatePresence>

      <main
        id="top"
        className="relative min-h-screen overflow-hidden bg-transparent text-[#F2F0EA]"
      >
        <SpaceBackground />

        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(to_bottom,rgba(5,5,6,.10),rgba(5,5,6,.52))]" />

        <div className="page-shell relative z-10">
          <Navbar />

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative min-h-[calc(100vh-90px)] border-b border-white/[0.08]">

            <div className="grid min-h-[calc(100vh-90px)] items-center gap-10 py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-2 lg:py-0">

              {/* LEFT */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity:
                    introState ===
                    "done"
                      ? 1
                      : 0,

                  x:
                    introState ===
                    "done"
                      ? 0
                      : -30,
                }}
                transition={{
                  duration: 0.85,
                  delay: 0.12,
                }}
                className="relative z-20 max-w-[680px]"
              >

                <div className="mb-11 flex items-center gap-4">

                  <span className="relative flex h-2 w-2">

                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#315CFF] opacity-30" />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#315CFF]" />

                  </span>

                  <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-neutral-500">
                    IT Support · Networking · Systems
                  </span>

                </div>

                <div className="text-[clamp(4.8rem,8.2vw,9.4rem)] font-semibold uppercase leading-[0.75] tracking-[-0.09em]">
                  <InteractiveName />
                </div>

                <p className="mt-11 max-w-[550px] text-[clamp(1.12rem,1.48vw,1.5rem)] font-normal leading-[1.5] tracking-[-0.028em] text-[#85858D]">

                  I work where{" "}

                  <span className="text-[#F2F0EA]">
                    people,
                    hardware,
                    networks
                  </span>

                  {" "}and systems
                  meet — diagnosing
                  problems and making{" "}

                  <span className="text-[#D8D0C0]">
                    technology
                    actually work.
                  </span>

                </p>

                <div className="mt-10 flex flex-wrap items-center gap-x-9 gap-y-5">

                  <Link
                    href="/projects"
                    className="group flex items-center gap-3 text-sm text-[#F2F0EA]"
                  >
                    Selected work

                    <ArrowRight
                      size={16}
                      className="text-[#315CFF] transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </Link>

                  <Link
                    href="/about"
                    className="text-sm text-neutral-500 transition hover:text-[#D8D0C0]"
                  >
                    About me
                  </Link>

                </div>

                <div className="mt-16 grid max-w-[560px] grid-cols-3 gap-5 border-t border-white/[0.08] pt-6">

                  <HeroFact
                    label="Based"
                    value="West Virginia"
                  />

                  <HeroFact
                    label="Focus"
                    value="IT / Systems"
                  />

                  <HeroFact
                    label="Status"
                    value="Available"
                    active
                  />

                </div>

              </motion.div>

              {/* RIGHT */}

              <div className="relative z-10">

                {introState ===
                  "done" && (
                  <ComputerDropHero />
                )}

              </div>

            </div>

            <div className="absolute bottom-7 left-0 hidden items-center gap-4 md:flex">

              <span className="font-mono-custom text-[8px] uppercase tracking-[0.21em] text-neutral-700">
                Scroll to explore
              </span>

              <ArrowDown
                size={14}
                className="animate-bounce text-[#315CFF]"
              />

            </div>

          </section>

          {/* =================================================
              SELECTED WORK
          ================================================= */}

          <section className="py-32 md:py-44">

            <div className="mb-24 grid gap-10 lg:grid-cols-[1fr_.65fr] lg:items-end">

              <div>

                <SectionLabel>
                  01 / Selected work
                </SectionLabel>

                <h2 className="mt-7 text-[clamp(4rem,8vw,8rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
                  Things worth
                  <br />

                  <span className="font-serif-display font-normal italic text-[#D8D0C0]">
                    showing.
                  </span>
                </h2>

              </div>

              <p className="max-w-md text-base leading-7 text-[#77777F] lg:justify-self-end">

                Hands-on work that
                says more about how
                I think and solve
                problems than a wall
                of skill badges ever
                could.

              </p>

            </div>

            <Project
              number="01"
              type="Infrastructure / Self Hosting"
              title="HomeLab"
              href="/projects/homelab"
              description="A Raspberry Pi environment built around DNS, remote access, service monitoring, reverse proxying, containers, and experimenting with infrastructure."
            >
              <HomeLabArtwork />
            </Project>

            <Project
              number="02"
              type="Technical Support / Hardware"
              title="NorthStar IT"
              href="/projects/northstar-it"
              description="Independent technical work centered around diagnosing problems, repairing and upgrading systems, remote support, and practical IT problem solving."
              reverse
            >
              <NorthStarArtwork />
            </Project>

          </section>

          {/* =================================================
              PERSONAL
          ================================================= */}

          <section className="border-t border-white/[0.08] py-32 md:py-44">

            <div className="mb-20">

              <SectionLabel>
                02 / Off the clock
              </SectionLabel>

              <h2 className="mt-7 text-[clamp(4rem,8vw,8rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
                Not everything
                <br />

                <span className="font-serif-display font-normal italic text-[#315CFF]">
                  is work.
                </span>
              </h2>

            </div>

            <div className="grid gap-20 lg:grid-cols-2 lg:gap-16">

              <PortfolioPlaylist />

              <div>

                <div className="mb-8 flex items-end justify-between border-t border-white/[0.08] pt-6">

                  <div>

                    <p className="font-mono-custom text-[8px] uppercase tracking-[0.2em] text-neutral-600">
                      Network mini game
                    </p>

                    <h3 className="mt-3 text-3xl tracking-[-0.045em] text-[#F2F0EA]">
                      Packet Runner
                    </h3>

                  </div>

                  <div className="text-right">

                    <p className="font-mono-custom text-[8px] uppercase tracking-[0.18em] text-neutral-700">
                      Score
                    </p>

                    <p className="mt-2 font-mono-custom text-sm text-[#315CFF]">
                      {score
                        .toString()
                        .padStart(
                          4,
                          "0",
                        )}
                    </p>

                  </div>

                </div>

                <div className="grid gap-7 sm:grid-cols-[1fr_155px]">

                  <div
                    className="grid aspect-square overflow-hidden border-l border-t border-white/[0.08]"
                    style={{
                      gridTemplateColumns:
                        `repeat(${GRID}, minmax(0,1fr))`,
                    }}
                  >
                    {Array.from({
                      length:
                        GRID *
                        GRID,
                    }).map(
                      (
                        _,
                        index,
                      ) => {
                        const x =
                          index %
                          GRID;

                        const y =
                          Math.floor(
                            index /
                              GRID,
                          );

                        const isPacket =
                          player.x ===
                            x &&
                          player.y ===
                            y;

                        const isServer =
                          level.goal.x ===
                            x &&
                          level.goal.y ===
                            y;

                        const isBlocked =
                          blocked(
                            x,
                            y,
                          );

                        return (
                          <div
                            key={
                              index
                            }
                            className="relative flex aspect-square items-center justify-center border-b border-r border-white/[0.08] bg-black/[0.08]"
                          >

                            {isBlocked && (
                              <div className="h-[35%] w-[35%] bg-neutral-800" />
                            )}

                            {isServer && (
                              <motion.div
                                animate={{
                                  opacity: [
                                    0.3,
                                    1,
                                    0.3,
                                  ],
                                }}
                                transition={{
                                  duration:
                                    1.6,

                                  repeat:
                                    Infinity,
                                }}
                                className="h-[38%] w-[38%] border border-[#315CFF]"
                              />
                            )}

                            {isPacket && (
                              <motion.div
                                layoutId="packet"
                                transition={{
                                  type:
                                    "spring",

                                  stiffness:
                                    500,

                                  damping:
                                    30,
                                }}
                                className="absolute h-[20%] w-[20%] rounded-full bg-[#315CFF]"
                              />
                            )}

                          </div>
                        );
                      },
                    )}
                  </div>

                  <div className="flex flex-col justify-between">

                    <div>

                      <p className="font-mono-custom text-[8px] uppercase tracking-[0.18em] text-neutral-700">
                        Route {levelIndex + 1}
                      </p>

                      <AnimatePresence mode="wait">

                        <motion.p
                          key={
                            message
                          }
                          initial={{
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="mt-3 min-h-12 text-sm leading-6 text-neutral-400"
                        >
                          {message}
                        </motion.p>

                      </AnimatePresence>

                    </div>

                    <div>

                      <div className="mx-auto grid max-w-[140px] grid-cols-3 gap-1.5">

                        <span />

                        <Control
                          label="Up"
                          onClick={() =>
                            move(
                              0,
                              -1,
                            )
                          }
                        >
                          ↑
                        </Control>

                        <span />

                        <Control
                          label="Left"
                          onClick={() =>
                            move(
                              -1,
                              0,
                            )
                          }
                        >
                          ←
                        </Control>

                        <Control
                          label="Down"
                          onClick={() =>
                            move(
                              0,
                              1,
                            )
                          }
                        >
                          ↓
                        </Control>

                        <Control
                          label="Right"
                          onClick={() =>
                            move(
                              1,
                              0,
                            )
                          }
                        >
                          →
                        </Control>

                      </div>

                      <button
                        type="button"
                        onClick={
                          restart
                        }
                        className="mt-6 flex w-full items-center justify-between border-t border-white/[0.08] pt-4 text-xs text-neutral-600 transition hover:text-white"
                      >
                        Restart

                        <RefreshCcw
                          size={13}
                        />
                      </button>

                    </div>

                  </div>

                </div>

                <div className="mt-5 flex justify-between font-mono-custom text-[7px] uppercase tracking-[0.16em] text-neutral-700">

                  <span>
                    WASD / arrows
                  </span>

                  <span>
                    {moves} hops
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              CONTACT
          ================================================= */}

          <section className="border-t border-white/[0.08] py-36 md:py-52">

            <SectionLabel>
              03 / Contact
            </SectionLabel>

            <Link
              href="/contact"
              className="group mt-8 block"
            >

              <h2 className="max-w-[1350px] text-[clamp(4.2rem,10vw,11rem)] font-semibold leading-[0.78] tracking-[-0.085em]">

                Got something
                <br />

                <span className="text-[#F2F0EA]">
                  interesting?
                </span>

                <span className="font-serif-display font-normal italic text-[#D8D0C0]">
                  {" "}Talk to me.
                </span>

              </h2>

              <div className="mt-20 flex items-center justify-between border-t border-white/[0.08] py-7">

                <span className="text-neutral-500 transition group-hover:text-[#F2F0EA]">
                  Start a conversation
                </span>

                <ArrowRight
                  size={23}
                  className="text-[#315CFF] transition-transform duration-300 group-hover:translate-x-3"
                />

              </div>

            </Link>

          </section>

          <footer className="flex flex-col gap-5 border-t border-white/[0.08] py-10 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">

            <span>
              © 2026 Jacob Wiseman
            </span>

            <a
              href="#top"
              className="transition hover:text-[#D8D0C0]"
            >
              Back to top ↑
            </a>

          </footer>

        </div>
      </main>
    </>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-[#315CFF]">
      {children}
    </p>
  );
}

function HeroFact({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div>

      <p className="font-mono-custom text-[7px] uppercase tracking-[0.2em] text-neutral-700">
        {label}
      </p>

      <div className="mt-2 flex items-center gap-2">

        {active && (
          <span className="h-1.5 w-1.5 rounded-full bg-[#315CFF]" />
        )}

        <span className="text-xs text-neutral-400">
          {value}
        </span>

      </div>

    </div>
  );
}

function Project({
  number,
  type,
  title,
  href,
  description,
  children,
  reverse = false,
}: {
  number: string;
  type: string;
  title: string;
  href: string;
  description: string;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
      }}
      className="border-t border-white/[0.08] py-16 md:py-24"
    >

      <div
        className={`grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center ${
          reverse
            ? "lg:grid-cols-[.85fr_1.15fr] lg:[&>*:first-child]:order-2"
            : ""
        }`}
      >

        <Link
          href={href}
          className="group relative min-h-[460px] overflow-hidden bg-[#0D0E11]"
        >

          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025]">
            {children}
          </div>

          <div className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center border border-white/10 bg-black/20 backdrop-blur transition duration-300 group-hover:border-[#315CFF] group-hover:bg-[#315CFF]">

            <ArrowRight
              size={17}
            />

          </div>

        </Link>

        <div className="max-w-xl">

          <div className="flex items-center gap-4">

            <span className="font-mono-custom text-[8px] text-[#315CFF]">
              {number}
            </span>

            <span className="h-px w-8 bg-white/10" />

            <span className="font-mono-custom text-[8px] uppercase tracking-[0.19em] text-neutral-600">
              {type}
            </span>

          </div>

          <h3 className="mt-8 text-[clamp(3.5rem,6vw,6.5rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-[#F2F0EA]">
            {title}
          </h3>

          <p className="mt-8 text-base leading-7 text-[#77777F]">
            {description}
          </p>

          <Link
            href={href}
            className="group mt-10 flex w-fit items-center gap-4 text-sm text-[#D8D0C0]"
          >
            Explore project

            <ArrowRight
              size={15}
              className="text-[#315CFF] transition-transform duration-300 group-hover:translate-x-2"
            />

          </Link>

        </div>

      </div>

    </motion.article>
  );
}

function HomeLabArtwork() {
  return (
    <div className="relative flex h-full min-h-[460px] items-center justify-center overflow-hidden bg-[#0C0D10] p-12">

      <div className="absolute left-7 top-7 font-mono-custom text-[8px] uppercase tracking-[0.2em] text-neutral-700">
        HOMELAB / NETWORK
      </div>

      <div className="absolute right-[-90px] top-[-90px] h-64 w-64 rounded-full bg-[#315CFF]/10 blur-[80px]" />

      <div className="relative w-full max-w-[520px]">

        <div className="mx-auto w-fit border border-[#315CFF]/60 bg-[#315CFF]/[0.045] px-7 py-4">

          <span className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-[#8FA8FF]">
            Raspberry Pi 5
          </span>

        </div>

        <div className="mx-auto h-16 w-px bg-white/15" />

        <div className="relative mx-auto h-px w-[82%] bg-white/15">

          {[0, 33, 66, 100].map(
            (
              position,
            ) => (
              <div
                key={
                  position
                }
                style={{
                  left:
                    `${position}%`,
                }}
                className="absolute top-0 h-12 w-px bg-white/15"
              />
            ),
          )}

        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">

          {[
            "DNS",
            "VPN",
            "MONITOR",
            "PROXY",
          ].map(
            (
              item,
            ) => (
              <div
                key={
                  item
                }
                className="border border-white/10 px-3 py-6 text-center transition duration-300 hover:border-[#315CFF]/60 hover:bg-[#315CFF]/[0.03]"
              >

                <span className="font-mono-custom text-[8px] uppercase tracking-[0.15em] text-neutral-500">
                  {item}
                </span>

              </div>
            ),
          )}

        </div>

      </div>

    </div>
  );
}

function NorthStarArtwork() {
  return (
    <div className="flex h-full min-h-[460px] flex-col justify-between bg-[#EDEAE3] p-10 text-[#090909] md:p-12">

      <div className="flex justify-between font-mono-custom text-[8px] uppercase tracking-[0.2em] text-black/40">

        <span>
          NorthStar IT
        </span>

        <span className="h-3 w-3 bg-[#315CFF]" />

      </div>

      <p className="text-[clamp(3.5rem,6vw,6.4rem)] font-semibold uppercase leading-[0.77] tracking-[-0.085em]">

        Diagnose.
        <br />

        <span className="text-[#315CFF]">
          Repair.
        </span>

        <br />
        Verify.

      </p>

      <div className="flex justify-between border-t border-black/15 pt-5 font-mono-custom text-[8px] uppercase tracking-[0.15em] text-black/40">

        <span>
          Hardware
        </span>

        <span>
          Support
        </span>

        <span>
          Systems
        </span>

      </div>

    </div>
  );
}

function Control({
  children,
  onClick,
  label,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      aria-label={
        label
      }
      whileTap={{
        scale: 0.88,
      }}
      onClick={
        onClick
      }
      className="flex aspect-square items-center justify-center border border-white/[0.08] text-sm text-neutral-500 transition duration-200 hover:border-[#315CFF] hover:bg-[#315CFF] hover:text-white"
    >
      {children}
    </motion.button>
  );
}
