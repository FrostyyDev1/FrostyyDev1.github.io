import { Rich } from "@/components/site/RichText";
import { revealProps } from "@/components/site/reveal-props";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Contact",
  description:
    "Contact Jacob Wiseman for IT support, help desk, and desktop support roles. Email, LinkedIn, and résumé.",
  path: "/contact/",
});

export default function ContactPage() {
  const phoneIsPlaceholder = site.phone.includes("[");

  return (
    <section className="section contact" aria-labelledby="contact-page-title" style={{ borderTop: 0 }}>
      <div className="container">
        <header className="section-head" {...revealProps()} style={{ marginBottom: "var(--s-7)" }}>
          <p className="t-label index">
            <b>01</b> Contact
          </p>
        </header>
        <h1 id="contact-page-title" {...revealProps()}>
          {site.contactTitleLead} <span className="t-serif">{site.contactTitleAccent}</span>
        </h1>
        <p className="t-lead" style={{ marginTop: "var(--s-6)" }} {...revealProps()}>
          {site.contactLede} <Rich text={site.reply} />
        </p>
        <a className="contact-mail" href={`mailto:${site.email}`} {...revealProps()}>
          <span className="ph">{site.email}</span>
          <span className="arrow" aria-hidden="true">
            →
          </span>
        </a>
        <dl className="contact-meta" {...revealProps()}>
          <div>
            <dt className="t-label">LinkedIn</dt>
            <dd>
              <a href={site.linkedinHref} target="_blank" rel="noopener noreferrer">
                {site.linkedinLabel}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
          <div>
            <dt className="t-label">Résumé</dt>
            <dd>
              <a href={site.resumeHref}>Download PDF (1 page)</a>
            </dd>
          </div>
          <div>
            <dt className="t-label">Phone</dt>
            <dd>
              {phoneIsPlaceholder ? (
                <span className="ph">{site.phone}</span>
              ) : (
                <a href={`tel:${site.phone}`}>{site.phone}</a>
              )}
            </dd>
          </div>
          <div>
            <dt className="t-label">Location</dt>
            <dd>
              {site.locationLine} · <Rich text={site.availability} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
