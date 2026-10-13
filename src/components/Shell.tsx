"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { prompt } from "@/content/site";
import {
  commands,
  complete,
  runCommand,
  type TermBlock,
} from "@/lib/terminal";

type Entry = {
  id: number;
  input?: string;
  blocks: TermBlock[];
};

function TermLink({ href, label }: { href: string; label: string }) {
  const external = /^(https?:|mailto:)/.test(href);
  if (!external) {
    return <Link href={href}>{label}</Link>;
  }

  return (
    <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {label}
      {href.startsWith("http") ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

function Blocks({
  blocks,
  onRun,
}: {
  blocks: TermBlock[];
  onRun: (command: string) => void;
}) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.kind === "text") {
          return (
            <p key={index} className="shell-text">
              {block.text}
            </p>
          );
        }
        if (block.kind === "error") {
          return (
            <p key={index} className="shell-error">
              {block.text}
            </p>
          );
        }
        if (block.kind === "pre") {
          return (
            <pre key={index} className="shell-pre">
              {block.text}
            </pre>
          );
        }
        if (block.kind === "kv") {
          return (
            <dl key={index} className="shell-kv">
              {block.rows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          );
        }
        if (block.kind === "links") {
          return (
            <p key={index} className="shell-links">
              {block.links.map((link) => (
                <TermLink key={link.href + link.label} href={link.href} label={link.label} />
              ))}
            </p>
          );
        }
        return (
          <p key={index}>
            <button type="button" className="suggest" onClick={() => onRun(block.guess)}>
              Did you mean <code>{block.guess}</code>?
            </button>
          </p>
        );
      })}
    </>
  );
}

export function Shell({
  welcome = true,
  autoFocus = false,
  listen = false,
}: {
  welcome?: boolean;
  autoFocus?: boolean;
  listen?: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const fortune = useRef(0);
  const nextId = useRef(1);
  const [value, setValue] = useState("");
  const [entries, setEntries] = useState<Entry[]>(() =>
    welcome
      ? [
          {
            id: 0,
            blocks: [
              {
                kind: "text",
                text: "NorthStar shell is ready. Type help, or press a command.",
              },
              {
                kind: "kv",
                rows: [
                  ["user", "jacob"],
                  ["place", "Elkview, WV"],
                  ["open to", "IT support"],
                ],
              },
            ],
          },
        ]
      : [],
  );

  const submitRef = useRef<(command: string) => void>(() => {});

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (!listen) return;
    const onRun = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail !== "string") return;
      submitRef.current(detail);
      inputRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("northstar-run", onRun);
    return () => window.removeEventListener("northstar-run", onRun);
  }, [listen]);

  useEffect(() => {
    const node = logRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [entries]);

  function submit(command: string) {
    const trimmed = command.trim();
    if (!trimmed) return;
    history.current = [...history.current, trimmed];
    cursor.current = -1;
    const result = runCommand(trimmed, fortune.current);
    fortune.current += 1;
    setValue("");
    if (result.clear) {
      setEntries([]);
      return;
    }
    if (result.blocks.length === 0) return;
    const id = nextId.current;
    nextId.current += 1;
    setEntries((current) => [
      ...current,
      { id, input: trimmed, blocks: result.blocks },
    ]);
  }

  useEffect(() => {
    submitRef.current = submit;
  });

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      const next = complete(value);
      if (next) setValue(next);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.current.length === 0) return;
      const next =
        cursor.current < 0
          ? history.current.length - 1
          : Math.max(0, cursor.current - 1);
      cursor.current = next;
      setValue(history.current[next] ?? "");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (cursor.current < 0) return;
      const next = cursor.current + 1;
      if (next >= history.current.length) {
        cursor.current = -1;
        setValue("");
        return;
      }
      cursor.current = next;
      setValue(history.current[next] ?? "");
    }
  }

  return (
    <div className="shell">
      <div
        ref={logRef}
        className="shell-log"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {entries.map((entry) => (
          <div key={entry.id} className="shell-entry">
            {entry.input ? (
              <p className="shell-in">
                <span className="prompt">{prompt}</span>{" "}
                <span>{entry.input}</span>
              </p>
            ) : null}
            <Blocks blocks={entry.blocks} onRun={submit} />
          </div>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(value);
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          Terminal command
        </label>
        <div className="shell-line">
          <span className="prompt" aria-hidden="true">
            {prompt}
          </span>
          <input
            id={inputId}
            ref={inputRef}
            className="shell-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            placeholder="help"
          />
        </div>
      </form>

      <ul className="shell-chips" aria-label="Commands">
        {commands
          .filter((command) => command.name !== "clear")
          .map((command) => (
            <li key={command.name}>
              <button type="button" onClick={() => submit(command.name)}>
                {command.name}
                <span className="sr-only">. {command.blurb}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
