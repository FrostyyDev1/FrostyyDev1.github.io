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
  | { kind: "text"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "links"; items: LinkItem[] };

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

function LineView({ line }: { line: Line }) {
  if (line.kind === "heading") {
    return <h1 className="term-h1">{line.text}</h1>;
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

  return <p>{line.text}</p>;
}

function Block({ entry }: { entry: Entry }) {
  return (
    <div className="term-block">
      <p className="term-cmd">
        <Prompt />
        <span>{entry.command}</span>
      </p>
      <div className="term-out">
        {entry.lines.map((line, index) => (
          <LineView key={`${entry.id}-${index}`} line={line} />
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
      kind: "text" as const,
      text: cert.expires
        ? `${cert.name}    earned ${cert.earned}, expires ${cert.expires}`
        : `${cert.name}    earned ${cert.earned}`,
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
    { kind: "text", text: person.availability },
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
      { kind: "text", text: "help          show this list" },
      { kind: "text", text: "whoami        name and role" },
      { kind: "text", text: "about         short bio" },
      { kind: "text", text: "experience    where I have worked" },
      { kind: "text", text: "projects      homelab, NorthStar, custom PCs" },
      { kind: "text", text: "certs         A+, Network+, ITIL 4" },
      { kind: "text", text: "resume        open the PDF" },
      { kind: "text", text: "contact       email, LinkedIn, location" },
      { kind: "text", text: "clear         clear the screen" },
    ]);
  }

  if (key === "whoami") {
    return entry([
      { kind: "text", text: person.name },
      {
        kind: "text",
        text: "IT support, desktop support, and networking.",
      },
      { kind: "text", text: person.location },
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
        kind: "text" as const,
        text: `${role.period}    ${role.role}, ${role.company}`,
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

  return entry([
    { kind: "text", text: `command not found: ${command}` },
    { kind: "text", text: "Type help for the list." },
  ]);
}

const boot: Entry[] = [
  {
    id: "boot-whoami",
    command: "whoami",
    lines: [
      { kind: "heading", text: person.name },
      {
        kind: "text",
        text: "IT support, desktop support, and networking.",
      },
      { kind: "text", text: `${person.location}. ${person.seeking}.` },
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
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [history, cleared, settled]);

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
        <div className={`term ${settled ? "is-settled" : ""}`}>
          <div className="term-bar">
            <p id="term-title" className="term-title">
              jacob@northstar: ~
            </p>
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
                  <Block key={entry.id} entry={entry} />
                ))}
              </div>
            )}
            {history.map((entry) => (
              <Block key={entry.id} entry={entry} />
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
            <input
              ref={inputRef}
              id={inputId}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              autoComplete="off"
              placeholder="type help"
              aria-describedby="term-hint"
            />
          </form>

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
            Type a command and press Enter, or use the command buttons. help,
            about, experience, projects, certs, resume, contact, and clear.
          </p>
        </div>
      </div>
    </section>
  );
}
