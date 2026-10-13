import { domains } from "@/content/site";

function Items({ clone = false }: { clone?: boolean }) {
  return domains.map((domain) => (
    <li key={clone ? `${domain}-clone` : domain} className={clone ? "marquee-clone" : undefined} aria-hidden={clone || undefined}>
      <span>{domain}</span>
      <span className="diamond" aria-hidden="true">
        ✦
      </span>
    </li>
  ));
}

export function Marquee() {
  return (
    <section className="marquee-section" aria-labelledby="domains-heading">
      <input id="pause-marquee" className="pause-toggle" type="checkbox" />
      <div className="wrap marquee-head">
        <h2 id="domains-heading">Domains</h2>
        <label htmlFor="pause-marquee" className="pause-label">
          <span className="when-play">Pause</span>
          <span className="when-paused">Play</span>
          <span className="sr-only"> the scrolling domains</span>
        </label>
      </div>
      <div className="marquee">
        <ul className="marquee-track">
          <Items />
          <Items clone />
        </ul>
      </div>
    </section>
  );
}
