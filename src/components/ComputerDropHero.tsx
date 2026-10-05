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
  | { type: "command"; text: string }
  | { type: "output"; lines: string[] }
  | { type: "profile" }
  | { type: "projects" }
  | { type: "contact" };

const INITIAL_HISTORY: Entry[] = [
  {
    type: "output",
    lines: [
      "Portfolio Linux 6.12.0 x86_64",
      "Session initialized.",
      "",
    ],
  },
  { type: "command", text: "fastfetch" },
  { type: "profile" },
  {
    type: "output",
    lines: ["", "Type 'help' to explore.", ""],
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function ProfileImage() {
  const [failed, setFailed] = useState(false);

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
      onError={() => setFailed(true)}
      className="h-[150px] w-[118px] border border-white/10 object-cover object-[50%_20%]"
    />
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
      <span className="w-[72px] shrink-0 text-[#666A73]">{name}</span>
      <span className={accent ? "text-[#8FA8FF]" : "text-[#C7CAD2]"}>
        {value}
      </span>
    </div>
  );
}

export default function ComputerDropHero() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const angle = useMotionValue(0);
  const dragging = useRef(false);
  const previousAngle = useRef(0);
  const previousTime = useRef(0);
  const angularVelocity = useRef(0);
  const returnAnimation = useRef<ReturnType<typeof animate> | null>(null);

  function getPointerAngle(event: ReactPointerEvent<HTMLDivElement>) {
    const scene = sceneRef.current;
    if (!scene) return 0;

    const rect = scene.getBoundingClientRect();
    const anchorX = rect.left + rect.width / 2;
    const anchorY = rect.top + 8;
    const dx = event.clientX - anchorX;
    const dy = Math.max(event.clientY - anchorY, 110);

    return clamp((Math.atan2(dx, dy) * 180) / Math.PI, -58, 58);
  }

  function beginSwing(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0 || event.pointerType === "touch") return;

    const target = event.target as HTMLElement;
    if (target.closest("[data-terminal-interactive='true']")) return;

    returnAnimation.current?.stop();
    dragging.current = true;

    const nextAngle = getPointerAngle(event);
    previousAngle.current = nextAngle;
    previousTime.current = performance.now();
    angularVelocity.current = 0;
    angle.set(nextAngle);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveSwing(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;

    if ((event.buttons & 1) !== 1) {
      endSwing(event);
      return;
    }

    const nextAngle = getPointerAngle(event);
    const now = performance.now();
    const elapsedSeconds = Math.max((now - previousTime.current) / 1000, 0.001);

    angularVelocity.current = clamp(
      (nextAngle - previousAngle.current) / elapsedSeconds,
      -480,
      480,
    );

    previousAngle.current = nextAngle;
    previousTime.current = now;
    angle.set(nextAngle);
  }

  function endSwing(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;

    dragging.current = false;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer may already be released.
    }

    returnAnimation.current = animate(angle, 0, {
      type: "spring",
      stiffness: 22,
      damping: 3.4,
      mass: 1.75,
      velocity: angularVelocity.current,
      restSpeed: 0.14,
      restDelta: 0.08,
    });
  }

  const [history, setHistory] = useState<Entry[]>(INITIAL_HISTORY);
  const [command, setCommand] = useState("");
  const terminalBottom = useRef<HTMLDivElement>(null);

  function append(...items: Entry[]) {
    setHistory((current) => [...current, ...items]);

    window.setTimeout(() => {
      terminalBottom.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 30);
  }

  function execute(value: string) {
    const raw = value.trim();
    const normalized = raw.toLowerCase();

    if (normalized === "clear") {
      setHistory([]);
      return;
    }

    append({ type: "command", text: raw });
    if (!raw) return;

    switch (normalized) {
      case "help":
        append({
          type: "output",
          lines: [
            "",
            "AVAILABLE COMMANDS",
            "--------------------------------",
            "about       short introduction",
            "skills      technical focus",
            "projects    featured work",
            "photo       display profile image",
            "fastfetch   system/profile summary",
            "whoami      current user",
            "contact     contact route",
            "resume      open resume.pdf",
            "pwd         current directory",
            "ls          list portfolio",
            "uname -a    system information",
            "date        current date/time",
            "clear       clear terminal",
            "",
          ],
        });
        break;

      case "whoami":
        append({ type: "output", lines: ["", "jacob", ""] });
        break;

      case "pwd":
        append({ type: "output", lines: ["", "/home/jacob/portfolio", ""] });
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
          lines: ["", "Linux portfolio 6.12.0 x86_64 GNU/Linux", ""],
        });
        break;

      case "date":
        append({ type: "output", lines: ["", new Date().toString(), ""] });
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
        append({ type: "projects" });
        break;

      case "contact":
        append({ type: "contact" });
        break;

      case "resume":
        window.open("/resume.pdf", "_blank", "noopener,noreferrer");
        append({ type: "output", lines: ["", "Opening /resume.pdf ...", ""] });
        break;

      case "photo":
        append(
          { type: "output", lines: ["", "kitten icat ~/Pictures/jacob-photo.jpg", ""] },
          { type: "profile" },
        );
        break;

      case "fastfetch":
      case "neofetch":
        append({ type: "profile" });
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

  function terminalKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;
    execute(command);
    setCommand("");
  }

  return (
    <div
      ref={sceneRef}
      className="relative mx-auto min-h-[610px] w-full max-w-[1120px] overflow-visible sm:min-h-[700px] lg:min-h-[760px] xl:min-h-[810px]"
    >
      <div className="absolute left-1/2 top-[-12px] z-30 -translate-x-1/2">
        <div className="mx-auto h-3 w-16 rounded-b-md border-x border-b border-white/10 bg-[#101115] sm:w-20" />
        <div className="mx-auto -mt-px h-6 w-6 rounded-full border border-white/20 bg-[#17191e] shadow-[0_0_24px_rgba(49,92,255,0.14)]">
          <div className="absolute left-1/2 top-[14px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#315CFF]" />
        </div>
      </div>

      <motion.div
        style={{ rotate: angle, transformOrigin: "50% 0px" }}
        className="absolute left-1/2 top-[8px] z-20 w-full -translate-x-1/2"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.22, duration: 0.88, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-1/2 top-0 h-[150px] w-px origin-top -translate-x-1/2 bg-gradient-to-b from-white/65 via-white/35 to-white/15 sm:h-[190px] lg:h-[220px] xl:h-[235px]"
        />

        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.22, duration: 0.88 }}
          className="absolute left-[calc(50%+1px)] top-0 h-[150px] w-px origin-top bg-[#315CFF]/25 sm:h-[190px] lg:h-[220px] xl:h-[235px]"
        />

        <motion.div
          initial={{ y: -1150, opacity: 1 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 58,
            damping: 11,
            mass: 1.15,
            delay: 0.18,
          }}
          className="absolute left-1/2 top-[138px] -translate-x-1/2 sm:top-[178px] lg:top-[208px] xl:top-[223px]"
        >
          <div className="absolute left-1/2 top-[-12px] z-40 h-7 w-7 -translate-x-1/2 rounded-full border border-white/20 bg-[#15171b] shadow-[0_0_20px_rgba(0,0,0,.7)]">
            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#315CFF]" />
          </div>

          <div
            onPointerDown={beginSwing}
            onPointerMove={moveSwing}
            onPointerUp={endSwing}
            onPointerCancel={endSwing}
            className="relative w-[92vw] max-w-[720px] cursor-grab select-none touch-pan-y rounded-[24px] border border-white/[0.13] bg-[#15171b] p-2.5 shadow-[0_55px_150px_rgba(0,0,0,.82)] active:cursor-grabbing sm:w-[660px] sm:p-3 lg:w-[min(46vw,800px)] xl:w-[820px] xl:max-w-[820px] 2xl:w-[880px] 2xl:max-w-[880px]"
          >
            <div className="pointer-events-none absolute inset-x-8 top-px h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="absolute left-1/2 top-[7px] z-40 flex -translate-x-1/2 items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[#050506]" />
              <div className="h-1 w-1 rounded-full bg-[#315CFF]/50" />
            </div>

            <div
              data-terminal-interactive="true"
              className="overflow-hidden rounded-[17px] border border-white/[0.09] bg-[#050608]"
            >
              <div className="relative flex h-10 items-center border-b border-white/[0.08] bg-[#101114] px-3 sm:h-11 sm:px-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>

                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono-custom text-[8px] text-neutral-500 sm:text-[9px]">
                  jacob@portfolio: ~
                </div>

                <div className="ml-auto hidden items-center gap-2 sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#315CFF]" />
                  <span className="font-mono-custom text-[7px] uppercase tracking-[0.18em] text-neutral-600">
                    tty1
                  </span>
                </div>
              </div>

              <div className="relative min-h-[340px] bg-[#050608] sm:min-h-[410px] lg:min-h-[455px]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(49,92,255,0.05),transparent_52%)]" />

                <div className="terminal-scrollbar relative z-10 max-h-[340px] overflow-y-auto p-4 font-mono-custom text-[10.5px] leading-[1.65] text-[#B9BDC7] sm:max-h-[410px] sm:p-5 sm:text-[11.5px] lg:max-h-[455px] lg:p-6 lg:text-[12px]">
                  {history.map((entry, index) => {
                    if (entry.type === "command") {
                      return (
                        <div key={index} className="whitespace-pre-wrap break-words">
                          <span className="text-[#7EE787]">jacob@portfolio</span>
                          <span className="text-[#666A73]">:</span>
                          <span className="text-[#79C0FF]">~</span>
                          <span className="text-[#666A73]">$</span>{" "}
                          <span className="text-[#E6E8EC]">{entry.text}</span>
                        </div>
                      );
                    }

                    if (entry.type === "output") {
                      return (
                        <div key={index} className="whitespace-pre-wrap break-words text-[#B9BDC7]">
                          {entry.lines.map((line, lineIndex) => (
                            <div key={lineIndex}>{line || "\u00a0"}</div>
                          ))}
                        </div>
                      );
                    }

                    if (entry.type === "profile") {
                      return (
                        <div key={index} className="my-4 grid gap-5 sm:grid-cols-[135px_1fr]">
                          <ProfileImage />

                          <div className="min-w-0">
                            <p className="text-[#7EE787]">jacob@portfolio</p>
                            <p className="text-[#555963]">--------------------------------</p>
                            <TerminalFact name="Name" value="Jacob Wiseman" />
                            <TerminalFact name="Role" value="IT Support / Networking / Systems" />
                            <TerminalFact name="Location" value="Charleston, WV" />
                            <TerminalFact name="Focus" value="Infrastructure / Troubleshooting" />
                            <TerminalFact name="Status" value="Available for opportunities" accent />
                            <TerminalFact name="Shell" value="zsh" />
                            <TerminalFact name="Portfolio" value="v1.0.0" />
                          </div>
                        </div>
                      );
                    }

                    if (entry.type === "projects") {
                      return (
                        <div key={index} className="my-3">
                          <div>total 3</div>
                          <div>
                            drwxr-xr-x&nbsp;&nbsp;
                            <a href="/projects/homelab" className="text-[#79C0FF] hover:underline">
                              homelab/
                            </a>
                          </div>
                          <div>
                            drwxr-xr-x&nbsp;&nbsp;
                            <a href="/projects/northstar-it" className="text-[#79C0FF] hover:underline">
                              northstar-it/
                            </a>
                          </div>
                          <div>
                            drwxr-xr-x&nbsp;&nbsp;
                            <a href="/projects" className="text-[#79C0FF] hover:underline">
                              all-projects/
                            </a>
                          </div>
                          <div className="h-3" />
                        </div>
                      );
                    }

                    if (entry.type === "contact") {
                      return (
                        <div key={index} className="my-3">
                          <div>contact route:</div>
                          <a href="/contact" className="text-[#79C0FF] hover:underline">
                            /contact
                          </a>
                          <div className="h-3" />
                        </div>
                      );
                    }

                    return null;
                  })}

                  <div className="flex min-w-0 items-center">
                    <span className="shrink-0 text-[#7EE787]">jacob@portfolio</span>
                    <span className="text-[#666A73]">:</span>
                    <span className="text-[#79C0FF]">~</span>
                    <span className="mr-2 text-[#666A73]">$</span>

                    <input
                      value={command}
                      onChange={(event) => setCommand(event.target.value)}
                      onKeyDown={terminalKey}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      aria-label="Portfolio terminal command"
                      className="min-w-0 flex-1 bg-transparent font-mono-custom text-[10.5px] leading-[1.65] text-[#F3F4F6] caret-[#315CFF] outline-none sm:text-[11.5px] lg:text-[12px]"
                    />
                  </div>

                  <div ref={terminalBottom} />
                </div>
              </div>
            </div>

            <div className="relative mx-auto mt-3 h-[5px] w-24 rounded-full bg-white/[0.055]" />
          </div>

          <div className="mx-auto h-9 w-5 bg-gradient-to-b from-[#26282d] to-[#111318] sm:h-11 sm:w-6" />
          <div className="mx-auto h-3 w-32 rounded-full border-t border-white/[0.06] bg-[#191b20] shadow-[0_14px_45px_rgba(0,0,0,.7)] sm:w-44 lg:w-52" />

          <div className="mt-5 hidden text-center font-mono-custom text-[7px] uppercase tracking-[0.2em] text-neutral-700 md:block">
            grab the frame / pull / release
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
