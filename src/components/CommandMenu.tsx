"use client";

import { useEffect, useId, useRef, useState } from "react";

import { prompt } from "@/content/site";
import { Shell } from "@/components/Shell";

export function CommandMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="cmd-btn"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="command-palette"
        aria-label="Open commands"
        onClick={() => setOpen(true)}
      >
        <kbd>Ctrl K</kbd>
      </button>
      <dialog
        ref={dialogRef}
        id="command-palette"
        className="palette"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
      >
        <div className="palette-head">
          <h2 id={titleId}>Command palette</h2>
          <button type="button" className="text-btn" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <p className="palette-prompt">
          <span className="prompt">{prompt}</span>
        </p>
        <Shell welcome={false} autoFocus={open} />
      </dialog>
    </>
  );
}
