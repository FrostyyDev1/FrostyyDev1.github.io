"use client";

import { Shell } from "@/components/Shell";

const eggs = [
  { command: "coffee", label: "Coffee", note: "Brew status" },
  { command: "fortune", label: "Fortune", note: "One short note" },
  { command: "neofetch", label: "Neofetch", note: "A small snapshot" },
  { command: "sudo hire-jacob", label: "Hire", note: "Hiring note" },
];

export function ShellBay() {
  function run(command: string) {
    document.getElementById("shell")?.scrollIntoView({ block: "nearest" });
    window.dispatchEvent(new CustomEvent("northstar-run", { detail: command }));
  }

  return (
    <div className="shell-bay">
      <article className="bay-shell" id="shell">
        <div className="shell-top">
          <span className="status-dot" aria-hidden="true" />
          <p>jacob@northstar</p>
          <p className="shell-hint">Tab completes</p>
        </div>
        <Shell listen />
      </article>
      {eggs.map((egg) => (
        <button key={egg.command} type="button" className="egg" onClick={() => run(egg.command)}>
          <span>{egg.label}</span>
          <small>{egg.note}</small>
        </button>
      ))}
    </div>
  );
}
