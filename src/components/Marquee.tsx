const phrases = [
  "Open to IT support",
  "IT technician",
  "Desktop support",
  "Systems and networking",
  "Elkview, West Virginia",
];

function Row({ clone = false }: { clone?: boolean }) {
  return phrases.map((phrase) => (
    <li key={clone ? `${phrase}-clone` : phrase} className={clone ? "marquee-clone" : undefined} aria-hidden={clone || undefined}>
      <span>{phrase}</span>
      <span className="diamond" aria-hidden="true">
        ·
      </span>
    </li>
  ));
}

export function Marquee() {
  return (
    <div className="marquee-section">
      <input id="pause-marquee" className="pause-toggle" type="checkbox" />
      <div className="marquee-head">
        <p id="domains-heading" className="sr-only">
          Open to
        </p>
        <label htmlFor="pause-marquee" className="pause-label">
          <span className="when-play">Pause</span>
          <span className="when-paused">Play</span>
          <span className="sr-only"> the scrolling line</span>
        </label>
      </div>
      <div className="marquee">
        <ul className="marquee-track">
          <Row />
          <Row clone />
        </ul>
      </div>
    </div>
  );
}
