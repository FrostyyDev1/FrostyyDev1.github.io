import type { Metadata } from "next";
import Link from "next/link";

import ProjectArt from "@/components/ProjectArt";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Hands-on projects in networking, self-hosting, and hardware support by Jacob Wiseman.",
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <header className="container page-header">
        <p className="t-label">Work</p>
        <h1 className="t-h1">
          Projects <span className="t-serif">I can open.</span>
        </h1>
        <p className="t-lead">
          A lab I run, a repair business I own, and the builds that sit next
          to the repairs.
        </p>
      </header>

      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="work-list">
          {projects.map((project, index) => (
            <Link key={project.href} href={project.href} className="project-row">
              <span className="work-num" aria-hidden="true">
                0{index + 1}
              </span>
              <div className="thumb-frame">
                <ProjectArt kind={project.art} />
              </div>
              <div className="project-copy">
                <p className="t-label">{project.kicker}</p>
                <h2 className="t-h3">{project.title}</h2>
                <p className="t-body">{project.summary}</p>
                <dl className="meta-row">
                  {project.meta.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
