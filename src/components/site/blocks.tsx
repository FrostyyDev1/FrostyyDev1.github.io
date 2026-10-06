import Link from "next/link";

import { homelabThumbSvg } from "@/components/site/graphics";
import {
  certifications,
  projects,
  site,
  skillGroups,
  type Cert,
  type ProjectCard,
} from "@/content/site";
import { Rich } from "@/components/site/RichText";
import { revealProps } from "@/components/site/reveal-props";

export function SectionHead({
  index,
  label,
  title,
  intro,
  titleId,
  titleClass = "t-h2",
  heading = "h2",
}: {
  index: string;
  label: string;
  title?: string;
  intro?: string;
  titleId?: string;
  titleClass?: string;
  heading?: "h1" | "h2";
}) {
  const Title = heading;
  return (
    <header className="section-head" {...revealProps()}>
      <p className="t-label index">
        <b>{index}</b> {label}
      </p>
      {title ? (
        <Title id={titleId} className={titleClass}>
          {title}
        </Title>
      ) : null}
      {intro ? (
        <p className="intro t-body">
          <Rich text={intro} />
        </p>
      ) : null}
    </header>
  );
}

function BadgeArt({
  src,
  alt,
  variant,
}: {
  src: string;
  alt: string;
  variant: "mini" | "full";
}) {
  if (src) {
    return (
      // Official badge files are supplied by Jacob; next/image is unnecessary for static slots.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={variant === "mini" ? "badge-mini badge-img" : "badge-img"}
        src={src}
        alt={variant === "mini" ? "" : alt}
        width={variant === "mini" ? 36 : 104}
        height={variant === "mini" ? 36 : 104}
      />
    );
  }

  if (variant === "mini") {
    return <span className="badge-mini" aria-hidden="true" />;
  }

  return <div className="badge-slot">Official Credly badge here</div>;
}

function Verify({ cert }: { cert: Cert }) {
  if (cert.verifyUrl.startsWith("http")) {
    return (
      <a
        className="cert-verify"
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          Verify on Credly{" "}
          <span className="sr-only">(opens in a new tab)</span>
        </span>
        <span className="arrow" aria-hidden="true">
          ↗
        </span>
      </a>
    );
  }

  return (
    <p className="cert-verify is-gap">
      <span>Verify on Credly</span>
      <span className="ph">[Add Credly URL]</span>
    </p>
  );
}

export function CertGrid({ showExpiry = false }: { showExpiry?: boolean }) {
  return (
    <ul className="cert-grid">
      {certifications.map((cert, index) => (
        <li className="cert" key={cert.id} {...revealProps(index ? `${index * 0.08}s` : undefined)}>
          <div className="cert-head">
            <BadgeArt src={cert.badgeSrc} alt={cert.badgeAlt} variant="full" />
            <span className="cert-num">{cert.num}</span>
          </div>
          <p className="t-label">{cert.issuer}</p>
          <h3>{cert.name}</h3>
          <p className="covers">{cert.covers}</p>
          <p className="earned">
            Earned <Rich text={cert.earned} />
            {showExpiry ? (
              <>
                {" "}
                · Expires <Rich text={cert.expires} />
              </>
            ) : null}
          </p>
          <div className="cert-foot">
            <Verify cert={cert} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ProofRow() {
  return (
    <ul className="proof-row">
      {certifications.map((cert) => (
        <li key={cert.id}>
          <a href="/certifications/">
            <BadgeArt src={cert.badgeSrc} alt={cert.badgeAlt} variant="mini" />
            {cert.name}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Portrait({ src }: { src: string }) {
  return (
    <figure className="portrait" {...revealProps(".2s")}>
      <div
        className={src ? "portrait-frame has-photo" : "portrait-frame"}
        role={src ? undefined : "img"}
        aria-label={src ? undefined : "Portrait placeholder: your photo, 4 by 5, black and white"}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="Jacob Wiseman" />
        ) : (
          <>
            <span className="crop tl" />
            <span className="crop tr" />
            <span className="crop bl" />
            <span className="crop br" />
            <div className="portrait-label" aria-hidden="true">
              <span className="big">Your photo</span>
              <span className="t-label">4:5 · Black & white</span>
            </div>
          </>
        )}
      </div>
      <figcaption>
        <span className="t-label">Portrait</span>
        <span className="t-label ph">{src ? "Black & white" : "[Add real photo]"}</span>
      </figcaption>
    </figure>
  );
}

export function WorkList({ items = projects }: { items?: ProjectCard[] }) {
  return (
    <div className="work-list">
      {items.map((project) => (
        <article
          className={project.flip ? "work-row grid-12 flip" : "work-row grid-12"}
          key={project.href}
          {...revealProps()}
        >
          {project.media === "homelab" ? (
            <div
              className="work-media"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: homelabThumbSvg }}
            />
          ) : (
            <div className="work-media" aria-hidden="true">
              <div className="thumb-ns">
                <div className="top">
                  <span className={site.businessName.startsWith("[") ? "ph" : undefined}>
                    {site.businessName}
                  </span>
                  <span className="sq" />
                </div>
                <p className="words">
                  <span>Diagnose.</span>
                  <span className="c">Repair.</span>
                  <span>Verify.</span>
                </p>
                <div className="bottom">
                  <span>Hardware</span>
                  <span>Support</span>
                  <span>Systems</span>
                </div>
              </div>
            </div>
          )}
          <div className="work-body">
            <p className="t-label">
              <span>{project.kicker.split(" · ")[0]}</span>
              <span aria-hidden="true">·</span>
              <span>{project.kicker.split(" · ")[1]}</span>
            </p>
            <h3 className="work-title">
              <Link href={project.href}>{project.title}</Link>
            </h3>
            <p className="t-body">
              <Rich text={project.body} />
            </p>
            <dl className="work-meta">
              {project.meta.map((item) => (
                <div key={item.label}>
                  <dt className="t-label">{item.label}</dt>
                  <dd>
                    <Rich text={item.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <span className="work-cta" aria-hidden="true">
              {project.cta} <span className="arrow">→</span>
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Shot({
  shot,
  wide = false,
}: {
  shot: {
    src: string;
    alt: string;
    bar: string;
    title: string;
    detail: string;
    caption: string;
  };
  wide?: boolean;
}) {
  return (
    <figure className={wide ? "shot shot-wide" : "shot"} {...revealProps()}>
      <div className={shot.src ? "shot-frame has-photo" : "shot-frame"}>
        {shot.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={shot.src} alt={shot.alt} />
        ) : (
          <>
            <div className="bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="t-label">{shot.bar}</span>
            </div>
            <div className="shot-label" role="img" aria-label={shot.alt}>
              <span className="t-label">Placeholder</span>
              <strong>{shot.title}</strong>
              <span className="t-label">
                <Rich text={shot.detail} />
              </span>
            </div>
          </>
        )}
      </div>
      <figcaption>
        <span>
          <Rich text={shot.caption} />
        </span>
      </figcaption>
    </figure>
  );
}

export function Crumbs({ index, total }: { index: string; total: string }) {
  return (
    <div className="crumbs">
      <Link href="/projects">
        <span aria-hidden="true">←</span> All work
      </Link>
      <p className="t-label">
        Case study {index} / {total}
      </p>
    </div>
  );
}

export function MetaGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="cs-meta" {...revealProps(".2s")}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="t-label">{item.label}</dt>
          <dd>
            <Rich text={item.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ConfigList({
  items,
}: {
  items: { n: string; title: string; body: string }[];
}) {
  return (
    <ol className="config-list">
      {items.map((item) => (
        <li key={item.n} {...revealProps()}>
          <span className="n">{item.n}</span>
          <h3>{item.title}</h3>
          <p>
            <Rich text={item.body} />
          </p>
        </li>
      ))}
    </ol>
  );
}

export function Stories({
  items,
}: {
  items: {
    label: string;
    tag: string;
    title: string;
    steps: string[][];
  }[];
}) {
  return (
    <div className="stories">
      {items.map((story) => (
        <article className="story" key={story.label} {...revealProps()}>
          <div className="story-head">
            <p className="t-label">{story.label}</p>
            <span className="story-tag">
              <Rich text={story.tag} />
            </span>
          </div>
          <h3>
            <Rich text={story.title} />
          </h3>
          <dl>
            {story.steps.map((step) => (
              <div key={step[0]}>
                <dt className="t-label">
                  <span className="k">{step[0]}</span>
                  {step[1]}
                </dt>
                <dd>
                  <Rich text={step[2]} />
                </dd>
              </div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  );
}

export function Results({
  items,
}: {
  items: { num: string; text: string }[];
}) {
  return (
    <div className="results" {...revealProps()}>
      {items.map((item) => (
        <div key={item.text}>
          <p className="num">
            <Rich text={item.num} />
          </p>
          <p>
            <Rich text={item.text} />
          </p>
        </div>
      ))}
    </div>
  );
}

export function ServiceTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="table-wrap" {...revealProps()}>
      <table className="svc">
        <caption className="sr-only">{caption}</caption>
        <colgroup>
          <col className="c1" />
          <col className="c2" />
          <col className="c3" />
          <col className="c4" />
        </colgroup>
        <thead>
          <tr>
            {columns.map((column) => (
              <th scope="col" key={column}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) => (
                <td key={columns[index]} data-label={columns[index]}>
                  <Rich text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function NextList({ items }: { items: string[] }) {
  return (
    <ol className="next-list" {...revealProps()}>
      {items.map((item, index) => (
        <li key={item}>
          <span className="n">0{index + 1}</span>
          <Rich text={item} />
        </li>
      ))}
    </ol>
  );
}

export function Pager({
  previous,
  next,
}: {
  previous: { href: string; label: string; title: string };
  next: { href: string; label: string; title: string };
}) {
  return (
    <nav className="pager" aria-label="Case studies">
      <Link href={previous.href}>
        <span className="t-label">{previous.label}</span>
        <strong>{previous.title}</strong>
      </Link>
      <Link href={next.href}>
        <span className="t-label">{next.label}</span>
        <strong>
          <Rich text={next.title} />
        </strong>
      </Link>
    </nav>
  );
}

export function SkillGrid() {
  return (
    <div className="skills" {...revealProps()}>
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3>{group.title}</h3>
          <ul>
            {group.items.map(([name, evidence]) => (
              <li key={name}>
                {name} <em>{evidence}</em>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
