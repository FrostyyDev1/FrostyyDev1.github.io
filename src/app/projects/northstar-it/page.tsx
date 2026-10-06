import {
  ConfigList,
  Crumbs,
  MetaGrid,
  NextList,
  Pager,
  Results,
  SectionHead,
  ServiceTable,
  Shot,
  Stories,
} from "@/components/site/blocks";
import { Rich } from "@/components/site/RichText";
import { revealProps } from "@/components/site/reveal-props";
import { repair, site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "PC repair & builds",
  description:
    "PC repair and custom builds by Jacob Wiseman: diagnostics, repairs, upgrades, and a four-step process. The public business name is still unconfirmed.",
  path: "/projects/northstar-it/",
});

export default function RepairPage() {
  return (
    <>
      <section className="cs-hero" aria-labelledby="repair-title">
        <div className="container">
          <Crumbs index="02" total="02" />
          <div className="cs-title">
            <p className="t-label" {...revealProps()}>
              {repair.kicker}
            </p>
            <h1 id="repair-title" className="t-display" {...revealProps(".06s")}>
              {repair.title}
            </h1>
            <p className="sub" {...revealProps(".12s")}>
              {repair.sub}
            </p>
          </div>
          <p className="t-lead cs-lead" {...revealProps(".16s")}>
            <Rich text={repair.lead} />
          </p>
          <MetaGrid items={repair.meta} />
          <p className="callout">
            <Rich text={site.businessNote} /> This page keeps the old URL,
            /projects/northstar-it/.
          </p>
        </div>
      </section>

      <div className="container">
        <Shot shot={repair.shot1} wide />
      </div>

      <section className="cs-block" style={{ borderTop: 0 }} aria-labelledby="ov-title">
        <div className="container">
          <SectionHead index="01" label="Overview" title="The work" titleId="ov-title" />
          <div className="grid-12 two-col">
            <p className="col-a t-h3" {...revealProps()}>
              {repair.overviewHeading}
            </p>
            <div className="col-b t-body" {...revealProps(".08s")}>
              {repair.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="process-title">
        <div className="container">
          <SectionHead
            index="02"
            label="Process"
            title="How a job moves"
            titleId="process-title"
            intro="The same four steps on every machine, from the previous site."
          />
          <div className="panel-ivory" {...revealProps()}>
            <div className="panel-head">
              <div>
                <p className="t-label">Method</p>
                <h3>
                  Diagnose. <span style={{ color: "var(--accent-on-ivory)" }}>Repair.</span> Verify.
                </h3>
              </div>
            </div>
            <ol className="process">
              {repair.process.map((step) => (
                <li key={step.n}>
                  <span className="n">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="inc-title">
        <div className="container">
          <SectionHead
            index="03"
            label="Scope"
            title="What the work includes"
            titleId="inc-title"
            intro={repair.includesIntro}
          />
          <ConfigList items={repair.includes} />
        </div>
      </section>

      <section className="cs-block" aria-labelledby="jobs-title">
        <div className="container">
          <SectionHead
            index="04"
            label="Jobs"
            title="Problems I solved"
            titleId="jobs-title"
            intro={repair.storiesIntro}
          />
          <Stories items={repair.stories} />
        </div>
      </section>

      <section className="cs-block" aria-labelledby="repair-results">
        <div className="container">
          <SectionHead
            index="05"
            label="Results"
            title="What I can count"
            titleId="repair-results"
            intro={repair.resultsIntro}
          />
          <Results items={repair.results} />
          <div style={{ marginTop: "var(--s-9)" }}>
            <Shot shot={repair.shot2} />
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="kinds-title">
        <div className="container">
          <SectionHead index="06" label="Work types" title="The kinds of jobs" titleId="kinds-title" />
          <ServiceTable
            caption="Kinds of PC repair work, what each covers, and the approach"
            columns={["Work", "Area", "What it covers", "How I approach it"]}
            rows={repair.services}
          />
        </div>
      </section>

      <section className="cs-block" aria-labelledby="repair-next">
        <div className="container">
          <SectionHead index="07" label="Next" title="What I'm adding next" titleId="repair-next" />
          <NextList items={repair.next} />
        </div>
      </section>

      <div className="container">
        <Pager
          previous={{ href: "/projects/homelab", label: "Previous case study", title: "← HomeLab" }}
          next={{ href: "/projects", label: "Back", title: "All work →" }}
        />
      </div>
    </>
  );
}
