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
import {
  homelabDiagramDesktopSvg,
  homelabDiagramMobileSvg,
} from "@/components/site/graphics";
import { revealProps } from "@/components/site/reveal-props";
import { gap, homelab } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "HomeLab",
  description:
    "HomeLab: a Raspberry Pi 5 running Pi-hole, Tailscale, Uptime Kuma, and Nginx Proxy Manager in Docker. Architecture, configuration, troubleshooting, and results.",
  path: "/projects/homelab/",
});

export default function HomelabPage() {
  return (
    <>
      <section className="cs-hero" aria-labelledby="cs-title">
        <div className="container">
          <Crumbs index="01" total="02" />
          <div className="cs-title">
            <p className="t-label" {...revealProps()}>
              {homelab.kicker}
            </p>
            <h1 id="cs-title" className="t-display" {...revealProps(".06s")}>
              {homelab.title}
            </h1>
            <p className="sub" {...revealProps(".12s")}>
              {homelab.sub}
            </p>
          </div>
          <p className="t-lead cs-lead" {...revealProps(".16s")}>
            {homelab.lead}
          </p>
          <MetaGrid items={homelab.meta} />
        </div>
      </section>

      <div className="container">
        <Shot shot={homelab.shot1} wide />
      </div>

      <section className="cs-block" style={{ borderTop: 0 }} aria-labelledby="why-title">
        <div className="container">
          <SectionHead index="01" label="Overview" title="Why I built it" titleId="why-title" />
          <div className="grid-12 two-col">
            <p className="col-a t-h3" {...revealProps()}>
              {homelab.whyHeading}
            </p>
            <div className="col-b t-body" {...revealProps(".08s")}>
              {homelab.why.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="arch-title">
        <div className="container">
          <SectionHead
            index="02"
            label="Architecture"
            title="How a request moves"
            titleId="arch-title"
            intro={homelab.archIntro}
          />
          <div className="panel-ivory" {...revealProps()}>
            <div className="panel-head">
              <div>
                <p className="t-label">Fig. 2 · Network diagram</p>
                <h3>DNS path & remote access</h3>
              </div>
              <div className="legend" aria-hidden="true">
                <span>
                  <i className="dns" />
                  DNS query path
                </span>
                <span>
                  <i className="ts" />
                  Tailscale tunnel
                </span>
                <span>
                  <i />
                  Device / host
                </span>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: homelabDiagramDesktopSvg + homelabDiagramMobileSvg,
              }}
            />
            <p className="panel-note">
              Simplified. Internal IP addresses are intentionally left out. Text in{" "}
              <span className="ph">[brackets]</span> is still to be filled in, including the
              router <span className="ph">{gap.routerModel}</span> and upstream{" "}
              <span className="ph">{gap.resolver}</span> drawn on the diagram.
            </p>
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="cfg-title">
        <div className="container">
          <SectionHead
            index="03"
            label="Configuration"
            title="What I configured"
            titleId="cfg-title"
            intro={homelab.configIntro}
          />
          <ConfigList items={homelab.config} />
        </div>
      </section>

      <section className="cs-block" aria-labelledby="st-title">
        <div className="container">
          <SectionHead
            index="04"
            label="Troubleshooting"
            title="Things that broke"
            titleId="st-title"
            intro={homelab.storiesIntro}
          />
          <Stories items={homelab.stories} />
        </div>
      </section>

      <section className="cs-block" aria-labelledby="rs-title">
        <div className="container">
          <SectionHead
            index="05"
            label="Results"
            title="What it shows"
            titleId="rs-title"
            intro={homelab.resultsIntro}
          />
          <Results items={homelab.results} />
          <div style={{ marginTop: "var(--s-9)" }}>
            <Shot shot={homelab.shot2} />
          </div>
        </div>
      </section>

      <section className="cs-block" aria-labelledby="sv-title">
        <div className="container">
          <SectionHead index="06" label="Services" title="What runs on it" titleId="sv-title" />
          <ServiceTable
            caption="Services running in the homelab, with role, reason, and what I learned"
            columns={["Service", "Role", "Why I run it", "What I learned"]}
            rows={homelab.services}
          />
        </div>
      </section>

      <section className="cs-block" aria-labelledby="nx-title">
        <div className="container">
          <SectionHead index="07" label="Next" title="What I'm adding next" titleId="nx-title" />
          <NextList items={homelab.next} />
        </div>
      </section>

      <div className="container">
        <Pager
          previous={{ href: "/projects", label: "Back", title: "← All work" }}
          next={{
            href: "/projects/northstar-it",
            label: "Next case study",
            title: "[Business name] →",
          }}
        />
      </div>
    </>
  );
}
