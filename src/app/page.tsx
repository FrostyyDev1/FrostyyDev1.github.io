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
  Pause,
  Play,
  RefreshCcw,
  SkipBack,
  SkipForward,
} from "lucide-react";

import Navbar from "@/components/Navbar";

/* =========================================================
   MUSIC
========================================================= */

const tracks = [
  {
    title: "Track One",
    artist: "Add your music",
  },
  {
    title: "Track Two",
    artist: "Add your music",
  },
  {
    title: "Track Three",
    artist: "Add your music",
  },
  {
    title: "Track Four",
    artist: "Add your music",
  },
];

/* =========================================================
   NAVIGATION
========================================================= */

const navigation = [
  {
    number: "01",
    name: "Projects",
    description:
      "Systems, infrastructure, networking and things I've built.",
    href: "/projects",
    ghost: "BUILD",
  },
  {
    number: "02",
    name: "Experience",
    description:
      "Where I've worked and the problems I've solved.",
    href: "/experience",
    ghost: "WORK",
  },
  {
    number: "03",
    name: "About",
    description:
      "A little more about me beyond the résumé.",
    href: "/about",
    ghost: "ME",
  },
  {
    number: "04",
    name: "Contact",
    description:
      "Opportunities, projects, technology, or just say hey.",
    href: "/contact",
    ghost: "HELLO",
  },
];

const heroWords = [
  "BUILD",
  "FIX",
  "LEARN",
];

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
    start: { x: 0, y: 6 },
    goal: { x: 6, y: 0 },

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
    start: { x: 0, y: 0 },
    goal: { x: 6, y: 6 },

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

/* =========================================================
   HOME
========================================================= */

export default function Home() {
  /* =======================================================
     INTRO
  ======================================================= */

  const [intro, setIntro] =
    useState(true);

  useEffect(() => {
    const played =
      sessionStorage.getItem(
        "jw-editorial-intro",
      );

    if (played) {
      setIntro(false);
      return;
    }

    const timer =
      window.setTimeout(() => {
        setIntro(false);

        sessionStorage.setItem(
          "jw-editorial-intro",
          "true",
        );
      }, 1600);

    return () =>
      window.clearTimeout(timer);
  }, []);

  /* =======================================================
     HERO WORDS
  ======================================================= */

  const [
    heroWordIndex,
    setHeroWordIndex,
  ] = useState(0);

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setHeroWordIndex(
          (current) =>
            (current + 1) %
            heroWords.length,
        );
      }, 1900);

    return () =>
      window.clearInterval(timer);
  }, []);

  /* =======================================================
     MUSIC
  ======================================================= */

  const [track, setTrack] =
    useState(0);

  const [playing, setPlaying] =
    useState(false);

  function previousTrack() {
    setTrack(
      (current) =>
        (current -
          1 +
          tracks.length) %
        tracks.length,
    );
  }

  function nextTrack() {
    setTrack(
      (current) =>
        (current + 1) %
        tracks.length,
    );
  }

  /* =======================================================
     GAME
  ======================================================= */

  const [
    levelIndex,
    setLevelIndex,
  ] = useState(0);

  const [player, setPlayer] =
    useState<Position>(
      levels[0].start,
    );

  const [moves, setMoves] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [
    gameMessage,
    setGameMessage,
  ] = useState(
    "Deliver the packet.",
  );

  const level =
    levels[levelIndex];

  const blocked = useCallback(
    (
      x: number,
      y: number,
    ) => {
      return levels[
        levelIndex
      ].blocked.some(
        (item) =>
          item.x === x &&
          item.y === y,
      );
    },
    [levelIndex],
  );

  const move = useCallback(
    (
      dx: number,
      dy: number,
    ) => {
      const current =
        levels[levelIndex];

      const next = {
        x: player.x + dx,
        y: player.y + dy,
      };

      if (
        next.x < 0 ||
        next.x >= GRID ||
        next.y < 0 ||
        next.y >= GRID
      ) {
        setGameMessage(
          "Packet dropped.",
        );

        return;
      }

      if (
        current.blocked.some(
          (item) =>
            item.x === next.x &&
            item.y === next.y,
        )
      ) {
        setGameMessage(
          "Blocked by firewall.",
        );

        return;
      }

      const newMoves =
        moves + 1;

      setPlayer(next);
      setMoves(newMoves);

      setGameMessage(
        "Routing...",
      );

      if (
        next.x ===
          current.goal.x &&
        next.y ===
          current.goal.y
      ) {
        setScore(
          (value) =>
            value +
            Math.max(
              800 -
                newMoves *
                  25,
              200,
            ),
        );

        setGameMessage(
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

            setGameMessage(
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

    setGameMessage(
      "Deliver the packet.",
    );
  }

  useEffect(() => {
    function keyboard(
      event: KeyboardEvent,
    ) {
      const key =
        event.key.toLowerCase();

      if (
        key === "w" ||
        key === "arrowup"
      ) {
        event.preventDefault();
        move(0, -1);
      }

      if (
        key === "s" ||
        key === "arrowdown"
      ) {
        event.preventDefault();
        move(0, 1);
      }

      if (
        key === "a" ||
        key === "arrowleft"
      ) {
        event.preventDefault();
        move(-1, 0);
      }

      if (
        key === "d" ||
        key === "arrowright"
      ) {
        event.preventDefault();
        move(1, 0);
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
      {/* ===================================================
          INTRO
      =================================================== */}

      <AnimatePresence>
        {intro && (
          <motion.div
            exit={{
              y: "-100%",
            }}
            transition={{
              duration: 0.75,
              ease: [
                0.76,
                0,
                0.24,
                1,
              ],
            }}
            className="fixed inset-0 z-[9999] flex items-center bg-[#0a0a0a]"
          >
            <div className="page-shell">
              <div className="overflow-hidden">
                <motion.p
                  initial={{
                    y: "110%",
                  }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [
                      0.76,
                      0,
                      0.24,
                      1,
                    ],
                  }}
                  className="text-[clamp(3.5rem,10vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em]"
                >
                  Jacob
                </motion.p>
              </div>

              <div className="overflow-hidden">
                <motion.p
                  initial={{
                    y: "110%",
                  }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    delay: 0.08,
                    duration: 0.65,
                    ease: [
                      0.76,
                      0,
                      0.24,
                      1,
                    ],
                  }}
                  className="text-[clamp(3.5rem,10vw,9rem)] font-semibold uppercase leading-[0.82] tracking-[-0.075em] text-[#315cff]"
                >
                  Wiseman
                </motion.p>
              </div>

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  delay: 0.45,
                  duration: 0.65,
                  ease: [
                    0.76,
                    0,
                    0.24,
                    1,
                  ],
                }}
                className="mt-8 h-[2px] origin-left bg-[#315cff]"
              />

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.65,
                }}
                className="mt-5 flex justify-between font-mono-custom text-[9px] uppercase tracking-[0.2em] text-neutral-600"
              >
                <span>
                  Digital Portfolio
                </span>

                <span>
                  2026
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================================================
          SITE
      =================================================== */}

      <main className="min-h-screen bg-[#0a0a0a] text-[#f2f2ef]">
        <div className="page-shell">
          <Navbar />

          {/* =================================================
              HERO
          ================================================= */}

          <section className="relative min-h-[calc(100vh-96px)] overflow-hidden">
            {/* giant changing background word */}

            <div className="pointer-events-none absolute bottom-[12%] right-[-2%] hidden select-none lg:block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={
                    heroWords[
                      heroWordIndex
                    ]
                  }
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -35,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
                  className="block text-[clamp(9rem,19vw,21rem)] font-semibold leading-none tracking-[-0.09em] text-white/[0.025]"
                >
                  {
                    heroWords[
                      heroWordIndex
                    ]
                  }
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="relative z-10 grid min-h-[calc(100vh-96px)] lg:grid-cols-[1.4fr_0.6fr]">
              {/* LEFT */}

              <div className="flex flex-col justify-between py-16 lg:border-r lg:border-white/10 lg:pr-14 lg:py-20">
                <div>
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity:
                        intro
                          ? 0
                          : 1,

                      y:
                        intro
                          ? 15
                          : 0,
                    }}
                    className="mb-10 flex items-center gap-4"
                  >
                    <span className="h-[7px] w-[7px] bg-[#315cff]" />

                    <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                      IT Support /
                      Networking /
                      Systems
                    </p>
                  </motion.div>

                  <motion.h1
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity:
                        intro
                          ? 0
                          : 1,

                      y:
                        intro
                          ? 25
                          : 0,
                    }}
                    transition={{
                      duration: 0.65,
                    }}
                    className="text-[clamp(5.5rem,11vw,12rem)] font-semibold uppercase leading-[0.73] tracking-[-0.085em]"
                  >
                    Jacob
                    <br />
                    Wiseman
                  </motion.h1>
                </div>

                <div className="mt-24 border-t border-white/10 pt-8 lg:mt-14">
                  <p className="max-w-4xl text-[clamp(1.75rem,3vw,3.5rem)] leading-[1.03] tracking-[-0.045em]">
                    I build things,{" "}

                    <span className="font-serif-display text-[1.12em] font-normal italic text-[#315cff]">
                      break things,
                    </span>

                    {" "}and figure out why they broke.
                  </p>
                </div>
              </div>

              {/* RIGHT */}

              <div className="flex flex-col justify-between border-t border-white/10 py-10 lg:border-t-0 lg:pl-12 lg:py-20">
                <div>
                  <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-neutral-600">
                    About this site
                  </p>

                  <p className="mt-5 max-w-sm text-[15px] leading-7 text-neutral-500">
                    Technical support,
                    infrastructure,
                    networking, hardware,
                    projects, music, and
                    whatever else catches
                    my curiosity.
                  </p>
                </div>

                <div className="my-16 lg:my-0">
                  <div className="border-t border-white/10 py-5">
                    <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-neutral-600">
                      Based in
                    </p>

                    <p className="mt-3 text-xl tracking-[-0.03em]">
                      Charleston,
                      West Virginia
                    </p>
                  </div>

                  <div className="border-t border-white/10 py-5">
                    <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-neutral-600">
                      Current status
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-2 w-2 bg-[#315cff]" />

                      <span className="text-sm text-neutral-400">
                        Available for
                        opportunities
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-neutral-600">
                    Scroll
                  </span>

                  <ArrowDown
                    size={18}
                    className="animate-bounce text-[#315cff]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              TICKER
          ================================================= */}

          <section className="relative -mx-[50vw] left-1/2 right-1/2 w-screen overflow-hidden border-y border-white/10 py-5">
            <motion.div
              animate={{
                x: [
                  "0%",
                  "-50%",
                ],
              }}
              transition={{
                duration: 28,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex w-max whitespace-nowrap"
            >
              {[0, 1].map(
                (group) => (
                  <div
                    key={group}
                    className="flex items-center"
                  >
                    {[
                      "NETWORKING",
                      "INFRASTRUCTURE",
                      "HARDWARE",
                      "SELF HOSTING",
                      "TROUBLESHOOTING",
                      "SYSTEMS",
                      "IT SUPPORT",
                      "HOMELAB",
                    ].map(
                      (
                        label,
                        index,
                      ) => (
                        <div
                          key={`${group}-${index}`}
                          className="flex items-center"
                        >
                          <span className="px-7 text-sm font-medium uppercase tracking-[0.1em] text-neutral-400 md:px-10 md:text-base">
                            {
                              label
                            }
                          </span>

                          <span className="h-1.5 w-1.5 bg-[#315cff]" />
                        </div>
                      ),
                    )}
                  </div>
                ),
              )}
            </motion.div>
          </section>

          {/* =================================================
              FEATURED WORK
          ================================================= */}

          <section className="py-28 md:py-36">
            <div className="mb-20 grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="font-mono-custom mb-5 text-[10px] uppercase tracking-[0.22em] text-[#315cff]">
                  Selected Work
                </p>

                <h2 className="text-5xl font-semibold leading-[0.94] tracking-[-0.06em] md:text-8xl">
                  Things I&apos;ve
                  <br />

                  <span className="font-serif-display font-normal italic text-[#315cff]">
                    actually built.
                  </span>
                </h2>
              </div>

              <p className="max-w-md text-base leading-7 text-neutral-500 lg:justify-self-end">
                Not a list of buzzwords.
                Actual systems, actual
                troubleshooting, and
                things I&apos;ve spent
                way too much time
                messing with.
              </p>
            </div>

            {/* HOMELAB */}

            <FeaturedProject
              number="01"
              eyebrow="Infrastructure / Self Hosting"
              title="HomeLab"
              description="A Raspberry Pi based environment for DNS filtering, remote access, monitoring, containers, reverse proxying, dashboards, and experimenting with infrastructure."
              href="/projects/homelab"
            >
              <HomeLabVisual />
            </FeaturedProject>

            {/* NORTHSTAR */}

            <FeaturedProject
              number="02"
              eyebrow="IT Services / Troubleshooting"
              title="NorthStar IT"
              description="Independent technical work focused on diagnostics, PC repair, upgrades, custom systems, remote support, and solving real technology problems."
              href="/projects/northstar-it"
              reverse
            >
              <NorthStarVisual />
            </FeaturedProject>

            <div className="mt-14 flex justify-end">
              <Link
                href="/projects"
                className="group flex items-center gap-4 text-sm text-neutral-500 transition hover:text-white"
              >
                View all projects

                <ArrowRight
                  size={17}
                  className="text-[#315cff] transition-transform group-hover:translate-x-2"
                />
              </Link>
            </div>
          </section>

          {/* =================================================
              CURRENTLY
          ================================================= */}

          <section className="border-t border-white/10 py-24 md:py-28">
            <div className="mb-14">
              <p className="font-mono-custom mb-5 text-[10px] uppercase tracking-[0.22em] text-[#315cff]">
                Right Now
              </p>

              <h2 className="text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
                Currently.
              </h2>
            </div>

            <div className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
              <CurrentlyItem
                number="01"
                label="Building"
                value="This portfolio"
              />

              <CurrentlyItem
                number="02"
                label="Learning"
                value="Infrastructure + security"
              />

              <CurrentlyItem
                number="03"
                label="Running"
                value="My HomeLab"
              />

              <CurrentlyItem
                number="04"
                label="Listening"
                value="My rotation"
              />
            </div>
          </section>

          {/* =================================================
              INDEX
          ================================================= */}

          <section className="border-t border-white/10 py-24 md:py-32">
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono-custom mb-5 text-[10px] uppercase tracking-[0.22em] text-[#315cff]">
                  Index
                </p>

                <h2 className="text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
                  Explore.
                </h2>
              </div>

              <p className="max-w-sm text-sm leading-6 text-neutral-500">
                Everything has its
                own space. Pick a
                direction.
              </p>
            </div>

            <div className="border-t border-white/10">
              {navigation.map(
                (item) => (
                  <NavigationRow
                    key={
                      item.number
                    }
                    {...item}
                  />
                ),
              )}
            </div>
          </section>

          {/* =================================================
              MUSIC
          ================================================= */}

          <section className="border-t border-white/10 py-24 md:py-32">
            <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="font-mono-custom mb-5 text-[10px] uppercase tracking-[0.22em] text-[#315cff]">
                  Music
                </p>

                <h2 className="text-6xl font-semibold leading-[0.86] tracking-[-0.065em] md:text-8xl">
                  My
                  <br />

                  <span className="font-serif-display font-normal italic text-[#315cff]">
                    rotation.
                  </span>
                </h2>
              </div>

              <div>
                <div className="border-t border-white/10 pt-8">
                  <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={track}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -10,
                        }}
                      >
                        <p className="font-mono-custom mb-3 text-[9px] uppercase tracking-[0.2em] text-neutral-600">
                          Now Playing
                        </p>

                        <h3 className="text-4xl font-medium tracking-[-0.045em] md:text-5xl">
                          {
                            tracks[
                              track
                            ].title
                          }
                        </h3>

                        <p className="mt-3 text-neutral-500">
                          {
                            tracks[
                              track
                            ].artist
                          }
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex items-center gap-6">
                      <button
                        type="button"
                        onClick={
                          previousTrack
                        }
                        className="text-neutral-500 transition hover:text-white"
                        aria-label="Previous track"
                      >
                        <SkipBack
                          size={20}
                        />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setPlaying(
                            (
                              value,
                            ) =>
                              !value,
                          )
                        }
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#315cff] text-white transition hover:scale-105"
                        aria-label={
                          playing
                            ? "Pause"
                            : "Play"
                        }
                      >
                        {playing ? (
                          <Pause
                            size={19}
                            fill="currentColor"
                          />
                        ) : (
                          <Play
                            size={19}
                            fill="currentColor"
                          />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={
                          nextTrack
                        }
                        className="text-neutral-500 transition hover:text-white"
                        aria-label="Next track"
                      >
                        <SkipForward
                          size={20}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="my-10 flex h-12 items-center gap-[4px] overflow-hidden">
                    {Array.from({
                      length: 75,
                    }).map(
                      (
                        _,
                        index,
                      ) => (
                        <motion.span
                          key={
                            index
                          }
                          animate={
                            playing
                              ? {
                                  height:
                                    [
                                      2,
                                      7 +
                                        ((index *
                                          13) %
                                          34),
                                      3,
                                    ],
                                }
                              : {
                                  height:
                                    2,
                                }
                          }
                          transition={{
                            duration:
                              0.65 +
                              (index %
                                7) *
                                0.06,

                            repeat:
                              playing
                                ? Infinity
                                : 0,

                            repeatType:
                              "reverse",
                          }}
                          className="w-px flex-none bg-[#315cff]"
                        />
                      ),
                    )}
                  </div>
                </div>

                <div className="border-t border-white/10">
                  {tracks.map(
                    (
                      item,
                      index,
                    ) => (
                      <button
                        key={
                          index
                        }
                        type="button"
                        onClick={() => {
                          setTrack(
                            index,
                          );

                          setPlaying(
                            true,
                          );
                        }}
                        className="group flex w-full items-center justify-between border-b border-white/[0.07] py-5 text-left"
                      >
                        <div className="flex items-center gap-6">
                          <span
                            className={`font-mono-custom text-[9px] ${
                              track ===
                              index
                                ? "text-[#315cff]"
                                : "text-neutral-700"
                            }`}
                          >
                            0
                            {index +
                              1}
                          </span>

                          <div>
                            <p
                              className={`transition ${
                                track ===
                                index
                                  ? "text-white"
                                  : "text-neutral-400 group-hover:text-white"
                              }`}
                            >
                              {
                                item.title
                              }
                            </p>

                            <p className="mt-1 text-xs text-neutral-600">
                              {
                                item.artist
                              }
                            </p>
                          </div>
                        </div>

                        <span className="text-xs text-neutral-700 transition group-hover:text-[#315cff]">
                          PLAY
                        </span>
                      </button>
                    ),
                  )}
                </div>

                <p className="font-mono-custom mt-5 text-[9px] uppercase tracking-[0.17em] text-neutral-700">
                  We&apos;ll add your
                  actual music next.
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              GAME
          ================================================= */}

          <section className="border-t border-white/10 py-24 md:py-32">
            <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono-custom mb-5 text-[10px] uppercase tracking-[0.22em] text-[#315cff]">
                  Take a break
                </p>

                <h2 className="text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
                  Packet Runner.
                </h2>
              </div>

              <p className="max-w-md text-sm leading-6 text-neutral-500">
                Get the packet to
                the server. Avoid
                the blocked nodes.
                WASD and arrow keys
                work too.
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1fr_330px]">
              <div>
                <div className="mb-5 flex items-center justify-between border-t border-white/10 pt-5 font-mono-custom text-[9px] uppercase tracking-[0.18em]">
                  <span className="text-neutral-600">
                    Route{" "}
                    {levelIndex +
                      1}
                  </span>

                  <div className="flex gap-6">
                    <span className="text-neutral-600">
                      Score{" "}
                      <span className="text-white">
                        {score}
                      </span>
                    </span>

                    <span className="text-neutral-600">
                      Hops{" "}
                      <span className="text-[#315cff]">
                        {moves}
                      </span>
                    </span>
                  </div>
                </div>

                <div
                  className="grid aspect-square w-full max-w-[680px] border-l border-t border-white/10"
                  style={{
                    gridTemplateColumns: `repeat(${GRID}, 1fr)`,
                  }}
                >
                  {Array.from({
                    length:
                      GRID * GRID,
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

                      const isPlayer =
                        player.x ===
                          x &&
                        player.y ===
                          y;

                      const isGoal =
                        level.goal
                          .x ===
                          x &&
                        level.goal
                          .y ===
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
                          className="relative flex aspect-square items-center justify-center border-b border-r border-white/10"
                        >
                          {isBlocked && (
                            <div className="h-[42%] w-[42%] bg-neutral-800" />
                          )}

                          {isGoal && (
                            <motion.div
                              animate={{
                                opacity:
                                  [
                                    0.35,
                                    1,
                                    0.35,
                                  ],
                              }}
                              transition={{
                                repeat:
                                  Infinity,

                                duration:
                                  1.5,
                              }}
                              className="h-[38%] w-[38%] border-2 border-[#315cff]"
                            />
                          )}

                          {isPlayer && (
                            <motion.div
                              layoutId="packet"
                              className="absolute h-[22%] w-[22%] rounded-full bg-[#315cff]"
                              transition={{
                                type:
                                  "spring",

                                stiffness:
                                  500,

                                damping:
                                  30,
                              }}
                            />
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-neutral-600">
                    Status
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={
                        gameMessage
                      }
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="mt-4 min-h-16 text-2xl tracking-[-0.03em]"
                    >
                      {
                        gameMessage
                      }
                    </motion.p>
                  </AnimatePresence>

                  <div className="mx-auto mt-12 grid w-[180px] grid-cols-3 gap-2">
                    <span />

                    <GameButton
                      onClick={() =>
                        move(
                          0,
                          -1,
                        )
                      }
                    >
                      ↑
                    </GameButton>

                    <span />

                    <GameButton
                      onClick={() =>
                        move(
                          -1,
                          0,
                        )
                      }
                    >
                      ←
                    </GameButton>

                    <GameButton
                      onClick={() =>
                        move(
                          0,
                          1,
                        )
                      }
                    >
                      ↓
                    </GameButton>

                    <GameButton
                      onClick={() =>
                        move(
                          1,
                          0,
                        )
                      }
                    >
                      →
                    </GameButton>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={
                    restart
                  }
                  className="mt-12 flex items-center justify-between border-t border-white/10 py-5 text-sm text-neutral-500 transition hover:text-white"
                >
                  Restart route

                  <RefreshCcw
                    size={15}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* =================================================
              CONTACT
          ================================================= */}

          <section className="border-t border-white/10 py-28 md:py-40">
            <p className="font-mono-custom mb-7 text-[10px] uppercase tracking-[0.22em] text-[#315cff]">
              Contact
            </p>

            <Link
              href="/contact"
              className="group block"
            >
              <h2 className="max-w-6xl text-[clamp(4rem,9vw,10rem)] font-semibold leading-[0.82] tracking-[-0.075em]">
                Let&apos;s make
                something{" "}

                <span className="font-serif-display font-normal italic text-[#315cff]">
                  good.
                </span>
              </h2>

              <div className="mt-14 flex items-center justify-between border-t border-white/10 py-6">
                <span className="text-neutral-500 transition group-hover:text-white">
                  Get in touch
                </span>

                <ArrowRight
                  size={22}
                  className="text-[#315cff] transition-transform duration-300 group-hover:translate-x-2"
                />
              </div>
            </Link>
          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="flex flex-col gap-6 border-t border-white/10 py-10 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Jacob Wiseman
            </p>

            <div className="flex gap-6">
              <a
                href="#"
                className="transition hover:text-white"
              >
                GitHub ↗
              </a>

              <Link
                href="/contact"
                className="transition hover:text-white"
              >
                Email ↗
              </Link>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

/* =========================================================
   FEATURED PROJECT
========================================================= */

function FeaturedProject({
  number,
  eyebrow,
  title,
  description,
  href,
  children,
  reverse = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
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
        duration: 0.6,
      }}
      className="border-t border-white/10 py-12 md:py-16"
    >
      <div
        className={`grid gap-10 lg:grid-cols-2 lg:items-center ${
          reverse
            ? "lg:[&>*:first-child]:order-2"
            : ""
        }`}
      >
        <Link
          href={href}
          className="group relative block min-h-[420px] overflow-hidden bg-[#111111]"
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.025]">
            {children}
          </div>

          <div className="absolute bottom-6 left-6 font-mono-custom text-[9px] uppercase tracking-[0.18em] text-white/40">
            Open project ↗
          </div>
        </Link>

        <div className="lg:px-6">
          <div className="mb-12 flex items-center justify-between">
            <span className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-[#315cff]">
              {number}
            </span>

            <span className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-neutral-600">
              Featured
            </span>
          </div>

          <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-neutral-600">
            {eyebrow}
          </p>

          <h3 className="mt-4 text-5xl font-semibold tracking-[-0.06em] md:text-7xl">
            {title}
          </h3>

          <p className="mt-7 max-w-xl text-base leading-7 text-neutral-500">
            {description}
          </p>

          <Link
            href={href}
            className="group mt-10 flex w-fit items-center gap-4 text-sm text-neutral-400 transition hover:text-white"
          >
            View project

            <ArrowRight
              size={17}
              className="text-[#315cff] transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* =========================================================
   HOMELAB VISUAL
========================================================= */

function HomeLabVisual() {
  return (
    <div className="relative flex h-full min-h-[420px] items-center justify-center overflow-hidden bg-[#0e0e0e] p-10">
      <div className="absolute left-8 top-8 font-mono-custom text-[9px] uppercase tracking-[0.18em] text-neutral-600">
        HomeLab / Topology
      </div>

      <div className="relative w-full max-w-lg">
        <div className="mx-auto w-fit border border-white/20 bg-[#0a0a0a] px-6 py-4">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.16em] text-[#315cff]">
            Raspberry Pi 5
          </p>
        </div>

        <div className="mx-auto h-14 w-px bg-white/15" />

        <div className="relative mx-auto h-px w-[75%] bg-white/15">
          <div className="absolute left-0 top-0 h-10 w-px bg-white/15" />

          <div className="absolute left-1/3 top-0 h-10 w-px bg-white/15" />

          <div className="absolute left-2/3 top-0 h-10 w-px bg-white/15" />

          <div className="absolute right-0 top-0 h-10 w-px bg-white/15" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            "PI-HOLE",
            "TAILSCALE",
            "UPTIME",
            "NGINX",
          ].map(
            (item) => (
              <div
                key={item}
                className="border border-white/15 px-3 py-5 text-center font-mono-custom text-[9px] uppercase tracking-[0.12em] text-neutral-400"
              >
                {item}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="absolute bottom-8 right-8 h-3 w-3 bg-[#315cff]" />
    </div>
  );
}

/* =========================================================
   NORTHSTAR VISUAL
========================================================= */

function NorthStarVisual() {
  return (
    <div className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden bg-[#efefeb] p-8 text-[#0a0a0a] md:p-10">
      <div className="flex items-start justify-between">
        <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-black/45">
          NorthStar IT
        </p>

        <span className="h-3 w-3 bg-[#315cff]" />
      </div>

      <div>
        <p className="text-[clamp(2.6rem,5vw,5.5rem)] font-semibold uppercase leading-[0.8] tracking-[-0.07em]">
          Diagnose.
          <br />
          Repair.
          <br />
          Verify.
        </p>
      </div>

      <div className="grid grid-cols-3 border-t border-black/15 pt-5 font-mono-custom text-[8px] uppercase tracking-[0.13em] text-black/45">
        <span>
          Hardware
        </span>

        <span className="text-center">
          Support
        </span>

        <span className="text-right">
          Systems
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   CURRENTLY
========================================================= */

function CurrentlyItem({
  number,
  label,
  value,
}: {
  number: string;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="group min-h-[210px] border-b border-white/10 p-6 transition hover:bg-[#315cff] sm:border-r sm:odd:border-r lg:border-b-0 lg:last:border-r-0"
    >
      <div className="flex h-full flex-col justify-between">
        <span className="font-mono-custom text-[9px] text-neutral-700 transition group-hover:text-white/50">
          {number}
        </span>

        <div>
          <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-neutral-600 transition group-hover:text-white/60">
            {label}
          </p>

          <p className="mt-3 text-xl tracking-[-0.03em] text-neutral-300 transition group-hover:text-white">
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   NAVIGATION ROW
========================================================= */

function NavigationRow({
  number,
  name,
  description,
  href,
  ghost,
}: {
  number: string;
  name: string;
  description: string;
  href: string;
  ghost: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden border-b border-white/10 py-8 md:py-10"
    >
      <div className="absolute inset-0 -translate-x-full bg-[#315cff] transition-transform duration-500 ease-out group-hover:translate-x-0" />

      <motion.div className="relative z-10 grid gap-5 md:grid-cols-[80px_1fr_1fr_auto] md:items-center">
        <span className="font-mono-custom text-[9px] tracking-[0.18em] text-neutral-600 transition group-hover:text-white/60">
          {number}
        </span>

        <h3 className="text-4xl font-medium tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-3 md:text-6xl">
          {name}
        </h3>

        <p className="max-w-sm text-sm leading-6 text-neutral-500 transition group-hover:text-white/70">
          {description}
        </p>

        <ArrowRight
          size={22}
          className="text-neutral-600 transition duration-300 group-hover:translate-x-2 group-hover:text-white"
        />
      </motion.div>

      <span className="pointer-events-none absolute right-20 top-1/2 hidden -translate-y-1/2 text-[8rem] font-semibold tracking-[-0.08em] text-white/[0.035] opacity-0 transition duration-300 group-hover:opacity-100 xl:block">
        {ghost}
      </span>
    </Link>
  );
}

/* =========================================================
   GAME BUTTON
========================================================= */

function GameButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{
        scale: 0.88,
      }}
      onClick={onClick}
      className="flex aspect-square items-center justify-center border border-white/10 text-lg text-neutral-500 transition hover:border-[#315cff] hover:bg-[#315cff] hover:text-white"
    >
      {children}
    </motion.button>
  );
}
