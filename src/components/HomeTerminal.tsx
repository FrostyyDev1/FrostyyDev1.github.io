"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

import {
  certifications,
  contactEmailHref,
  contactEmailLabel,
  person,
  projects,
  roles,
} from "@/content/site";

type LinkItem = {
  href: string;
  label: string;
  external?: boolean;
};

type Line =
  | { kind: "text"; text: string; tone?: "dim" | "error" }
  | { kind: "banner"; heading?: boolean }
  | { kind: "links"; items: LinkItem[] }
  | { kind: "pair"; label: string; value: string; tone?: "cmd" }
  | { kind: "pre"; text: string }
  | { kind: "suggest"; command: string }
  | { kind: "matrix" }
  | { kind: "train" };

const MENU = [
  "help",
  "whoami",
  "about",
  "experience",
  "projects",
  "certs",
  "resume",
  "contact",
  "clear",
  "neofetch",
  "fortune",
  "coffee",
  "matrix",
  "sl",
  "ping",
  "sudo hire-jacob",
  "ping recruiter",
] as const;

function editDistance(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 4) return 9;
  const rows = Array.from({ length: a.length + 1 }, () =>
    new Array<number>(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) rows[i][0] = i;
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      rows[i][j] = Math.min(
        rows[i - 1][j] + 1,
        rows[i][j - 1] + 1,
        rows[i - 1][j - 1] + cost,
      );
    }
  }
  return rows[a.length][b.length];
}

function suggestion(input: string) {
  let best: string | null = null;
  let bestDistance = 3;
  for (const command of MENU) {
    const distance = editDistance(input, command);
    if (distance > 0 && distance < bestDistance) {
      best = command;
      bestDistance = distance;
    }
  }
  return best;
}

type Entry = {
  id: string;
  command: string;
  lines: Line[];
};

const chips = [
  "help",
  "about",
  "experience",
  "projects",
  "certs",
  "resume",
  "contact",
  "clear",
] as const;

const NAME_BANNER = [
  "      _         _____ ____  ____",
  "     | |  /\\   / ____/ __ \\|  _ \\",
  "     | | /  \\ | |   | |  | | |_) |",
  " _   | |/ /\\ \\| |   | |  | |  _ <",
  "| |__| / ____ \\ |___| |__| | |_) |",
  " \\____/_/    \\_\\_____\\____/|____/",
].join("\n");

function Prompt() {
  return (
    <span className="term-prompt" aria-hidden="true">
      <span className="term-user">jacob</span>
      <span className="term-at">@</span>
      <span className="term-host">northstar</span>
      <span className="term-path">:~$</span>
    </span>
  );
}

function MatrixRain() {
  const [skipped, setSkipped] = useState(false);
  if (skipped) {
    return <p>Rain skipped. The résumé is less dramatic.</p>;
  }
  return (
    <div className="matrix">
      <div className="mx" aria-hidden="true">
        {["01001101", "10110100", "00101110", "11010010", "01101001", "10010110"].map(
          (column) => (
            <span key={column}>{column}</span>
          ),
        )}
      </div>
      <p className="matrix-still">Motion is off. The homelab is still up.</p>
      <p>There is no spoon. There is a résumé.</p>
      <button type="button" className="term-skip" onClick={() => setSkipped(true)}>
        Skip
      </button>
    </div>
  );
}

function LineView({
  line,
  onRun,
}: {
  line: Line;
  onRun?: (command: string) => void;
}) {
  if (line.kind === "matrix") {
    return <MatrixRain />;
  }

  if (line.kind === "train") {
    return (
      <div className="sl-window" aria-hidden="true">
        <pre className="sl-train">{`      __
   __|  |__
  |  o  o  |____
  |________|    \\
    U    U`}</pre>
      </div>
    );
  }

  if (line.kind === "pre") {
    return <pre className="term-pre">{line.text}</pre>;
  }

  if (line.kind === "suggest") {
    return (
      <p>
        <button
          type="button"
          className="term-suggest"
          onClick={() => onRun?.(line.command)}
        >
          did you mean {line.command}?
        </button>
      </p>
    );
  }

  if (line.kind === "banner") {
    return (
      <div className="term-banner-wrap">
        <pre className="term-banner" aria-hidden="true">
          {NAME_BANNER}
        </pre>
        {line.heading ? <h1 className="sr-only">{person.name}</h1> : null}
      </div>
    );
  }

  if (line.kind === "links") {
    return (
      <p className="term-links">
        {line.items.map((item) =>
          item.external ? (
            <a
              key={item.href + item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : item.href.endsWith(".pdf") ? (
            <a key={item.href + item.label} href={item.href}>
              {item.label}
            </a>
          ) : (
            <Link key={item.href + item.label} href={item.href}>
              {item.label}
            </Link>
          ),
        )}
      </p>
    );
  }

  if (line.kind === "pair") {
    return (
      <p className="term-pair">
        <span className={line.tone === "cmd" ? "k is-cmd" : "k"}>
          {line.label}
        </span>
        <span className="v">{line.value}</span>
      </p>
    );
  }

  return (
    <p
      className={
        line.tone === "error" ? "is-error" : line.tone === "dim" ? "is-dim" : undefined
      }
    >
      {line.text}
    </p>
  );
}

function Block({
  entry,
  onRun,
}: {
  entry: Entry;
  onRun?: (command: string) => void;
}) {
  return (
    <div className="term-block">
      <p className="term-cmd">
        <Prompt />
        <span className="term-typed">{entry.command}</span>
      </p>
      <div className="term-out">
        {entry.lines.map((line, index) => (
          <LineView key={`${entry.id}-${index}`} line={line} onRun={onRun} />
        ))}
      </div>
    </div>
  );
}

function certLines(includeItil = true): Line[] {
  const shown = includeItil
    ? certifications
    : certifications.filter((cert) => cert.id !== "itil");

  return [
    ...shown.map((cert) => ({
      kind: "pair" as const,
      label: cert.name,
      value: cert.expires
        ? `earned ${cert.earned}    expires ${cert.expires}`
        : `earned ${cert.earned}`,
    })),
    {
      kind: "links",
      items: [{ href: "/certifications/", label: "certifications/" }],
    },
  ];
}

function projectLines(): Line[] {
  return [
    {
      kind: "links",
      items: projects.map((project) => ({
        href: project.href,
        label: `${project.title}/`,
      })),
    },
  ];
}

function contactLines(): Line[] {
  return [
    { kind: "text", text: person.location },
    { kind: "text", text: person.availability, tone: "dim" },
    {
      kind: "links",
      items: [
        { href: person.resumeHref, label: "resume.pdf" },
        { href: contactEmailHref, label: contactEmailLabel },
        {
          href: person.linkedin,
          label: person.linkedinLabel,
          external: true,
        },
        { href: "/contact/", label: "contact/" },
      ],
    },
  ];
}

function respond(raw: string): Entry | "clear" | null {
  const command = raw.trim().replace(/\s+/g, " ");
  if (!command) return null;

  const key = command.toLowerCase();
  const id = `u-${command}-${Date.now()}`;

  const entry = (lines: Line[]): Entry => ({ id, command, lines });

  if (key === "help" || key === "?") {
    return entry([
      { kind: "pair", label: "help", value: "show this list", tone: "cmd" },
      { kind: "pair", label: "whoami", value: "name and role", tone: "cmd" },
      { kind: "pair", label: "about", value: "short bio", tone: "cmd" },
      { kind: "pair", label: "experience", value: "where I have worked", tone: "cmd" },
      { kind: "pair", label: "projects", value: "homelab, NorthStar, custom PCs", tone: "cmd" },
      { kind: "pair", label: "certs", value: "A+, Network+, ITIL 4", tone: "cmd" },
      { kind: "pair", label: "resume", value: "open the PDF", tone: "cmd" },
      { kind: "pair", label: "contact", value: "email, LinkedIn, location", tone: "cmd" },
      { kind: "pair", label: "clear", value: "clear the screen", tone: "cmd" },
      {
        kind: "text",
        text: "off the menu: neofetch, fortune, coffee, matrix, sl, ping recruiter, sudo hire-jacob",
        tone: "dim",
      },
    ]);
  }

  if (key === "whoami") {
    return entry([
      { kind: "banner" },
      { kind: "text", text: person.name },
      {
        kind: "text",
        text: "IT support, desktop support, and networking.",
      },
      { kind: "text", text: person.location, tone: "dim" },
    ]);
  }

  if (key === "about") {
    return entry([
      {
        kind: "text",
        text: "IT student at CSU Global (B.S. Information Technology, expected September 2027). CompTIA A+, Network+, and ITIL 4 Foundation.",
      },
      {
        kind: "text",
        text: "Owner of NorthStar IT Services LLC. Remote technical support at Startek in 2026. Registration at WVU Medicine, Thomas Imaging Center.",
      },
      { kind: "links", items: [{ href: "/about/", label: "about/" }] },
    ]);
  }

  if (key === "experience") {
    return entry([
      ...roles.slice(0, 3).map((role) => ({
        kind: "pair" as const,
        label: role.period,
        value: `${role.role}, ${role.company}`,
      })),
      {
        kind: "links",
        items: [{ href: "/experience/", label: "experience/" }],
      },
    ]);
  }

  if (
    key === "projects" ||
    key === "ls" ||
    key === "ls projects" ||
    key === "ls projects/"
  ) {
    return entry(projectLines());
  }

  if (
    key === "certs" ||
    key === "certifications" ||
    key === "cat certifications.txt"
  ) {
    return entry(certLines());
  }

  if (key === "resume" || key === "cv") {
    return entry([
      { kind: "text", text: "Opening resume.pdf" },
      {
        kind: "links",
        items: [{ href: person.resumeHref, label: "resume.pdf" }],
      },
    ]);
  }

  if (key === "contact" || key === "cat contact.txt") {
    return entry(contactLines());
  }

  if (key === "clear") return "clear";

  if (
    key === "sudo hire-jacob" ||
    key === "sudo hire jacob" ||
    key === "hire-jacob" ||
    key === "hire jacob"
  ) {
    return entry([
      { kind: "text", text: "[sudo] password for recruiter: (already accepted)" },
      {
        kind: "text",
        text: "Jacob is open to IT support, help desk, desktop support, and networking. Elkview, WV. On-site or hybrid around Charleston.",
      },
      {
        kind: "links",
        items: [
          { href: contactEmailHref, label: contactEmailLabel },
          { href: person.resumeHref, label: "resume.pdf" },
          { href: "/contact/", label: "contact/" },
        ],
      },
    ]);
  }

  if (key.startsWith("sudo")) {
    return entry([
      {
        kind: "text",
        text: "jacob is not in the sudoers file. This incident will be reported to nobody.",
        tone: "error",
      },
      { kind: "suggest", command: "sudo hire-jacob" },
    ]);
  }

  if (key === "neofetch") {
    return entry([
      {
        kind: "pre",
        text: [
          "jacob@northstar",
          "---------------",
          "Name:     Jacob Wiseman",
          "OS:       IT support, Elkview WV",
          "Host:     NorthStar IT Services LLC",
          "Shell:    bash",
          "School:   CSU Global, B.S. IT, Sept 2027",
          "Certs:    A+ and Network+, exp Oct 2028",
          "          ITIL 4 Foundation, Aug 2025",
          "Desk:     Windows 10/11, macOS, Microsoft 365",
          "Lab:      Pi 5, Pi-hole, Tailscale, Uptime Kuma",
        ].join("\n"),
      },
    ]);
  }

  if (key === "fortune") {
    const jokes = [
      "A printer is never just a printer. Check the cable, then the driver, then how long the person has been waiting.",
      "If Wi-Fi works in the kitchen and not the bedroom, the router is not broken. It is in the kitchen.",
      "\"It works on my machine\" is not a closing note. Write down what you changed.",
      "DNS is fine until it is not. That is why the Pi runs Pi-hole.",
    ];
    const joke = jokes[new Date().getDate() % jokes.length];
    return entry([{ kind: "text", text: joke }]);
  }

  if (key === "coffee" || key === "make coffee") {
    return entry([
      {
        kind: "pre",
        text: "   ( ( )\n    ) )\n  .......\n  |     |",
      },
      {
        kind: "text",
        text: "One cup. The homelab does not run on it. I do.",
        tone: "dim",
      },
    ]);
  }

  if (key === "matrix") {
    return entry([{ kind: "matrix" }]);
  }

  if (key === "sl") {
    return entry([
      { kind: "train" },
      { kind: "text", text: "Wrong way. The command you wanted was ls.", tone: "dim" },
    ]);
  }

  if (key === "ping" || key === "ping recruiter" || key === "ping recruiter.local") {
    return entry([
      { kind: "text", text: "PING recruiter (hiring) 56 bytes" },
      { kind: "text", text: "reply from Elkview, WV: open for IT support" },
      { kind: "text", text: "1 packet transmitted, 1 received, 0% packet loss", tone: "dim" },
      {
        kind: "links",
        items: [
          { href: contactEmailHref, label: contactEmailLabel },
          { href: "/contact/", label: "contact/" },
        ],
      },
    ]);
  }

  const guess = suggestion(key);
  return entry([
    { kind: "text", text: `command not found: ${command}`, tone: "error" },
    ...(guess
      ? [{ kind: "suggest" as const, command: guess }]
      : [{ kind: "text" as const, text: "try typing help", tone: "dim" as const }]),
  ]);
}

const boot: Entry[] = [
  {
    id: "boot-whoami",
    command: "whoami",
    lines: [
      { kind: "banner", heading: true },
      {
        kind: "text",
        text: "IT support, desktop support, and networking.",
      },
      { kind: "text", text: `${person.location}. ${person.seeking}.`, tone: "dim" },
    ],
  },
  {
    id: "boot-certs",
    command: "cat certifications.txt",
    lines: certLines(false),
  },
  {
    id: "boot-ls",
    command: "ls projects",
    lines: projectLines(),
  },
  {
    id: "boot-contact",
    command: "cat contact.txt",
    lines: contactLines(),
  },
];

export default function HomeTerminal() {
  const inputId = useId();
  const [settled, setSettled] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [history, setHistory] = useState<Entry[]>([]);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const node = logRef.current;
    if (!node || history.length === 0) return;
    node.scrollTop = node.scrollHeight;
  }, [history]);

  function run(raw: string) {
    const result = respond(raw);
    if (result === "clear") {
      setCleared(true);
      setHistory([]);
      setSettled(true);
      return;
    }
    if (!result) return;
    const normalized = result.command.toLowerCase();
    if (normalized === "resume" || normalized === "cv") {
      window.open(person.resumeHref, "_blank", "noopener,noreferrer");
    }
    setHistory((current) => [...current, result]);
  }

  function submit(raw: string) {
    setValue("");
    run(raw);
    inputRef.current?.focus({ preventScroll: true });
  }

  return (
    <section className="term-hero" aria-labelledby="term-title">
      <div className="container">
        <div className="term-stage">
          <div className={`term ${settled ? "is-settled" : ""}`}>
            <div className="term-bar">
              <div className="term-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p id="term-title" className="term-title">
                jacob@northstar: ~
              </p>
              <div className="term-bar-slot">
                {settled ? null : (
                  <button
                    type="button"
                    className="term-skip"
                    onClick={() => setSettled(true)}
                  >
                    Skip
                  </button>
                )}
              </div>
            </div>

            <div
              ref={logRef}
              className="term-log"
              role="log"
              aria-live="polite"
              aria-relevant="additions"
            >
              {cleared ? <h1 className="sr-only">{person.name}</h1> : null}
              {cleared ? null : (
                <div className="term-boot">
                {boot.map((entry) => (
                  <Block key={entry.id} entry={entry} onRun={submit} />
                ))}
                </div>
              )}
              {history.map((entry) => (
                <Block key={entry.id} entry={entry} onRun={submit} />
              ))}
            </div>

            <form
              className="term-form"
              onSubmit={(event) => {
                event.preventDefault();
                submit(value);
              }}
            >
              <label className="sr-only" htmlFor={inputId}>
                Terminal command
              </label>
              <Prompt />
              <span
                className="term-caret"
                data-hidden={value.length > 0 ? "true" : "false"}
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                id={inputId}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                autoComplete="off"
                placeholder="try typing help"
                aria-describedby="term-hint"
              />
            </form>
            <p className="term-nudge">try typing help</p>

            <div className="term-chips" role="group" aria-label="Commands">
              {chips.map((command) => (
                <button
                  key={command}
                  type="button"
                  onClick={() => submit(command)}
                >
                  {command}
                </button>
              ))}
            </div>
            <p id="term-hint" className="sr-only">
              Try typing help, then press Enter, or use the command buttons.
              help, about, experience, projects, certs, resume, contact, and
              clear. A few extra commands are listed by help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
