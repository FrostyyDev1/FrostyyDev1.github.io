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
        <h1 className="t-h1">Projects</h1>
        <p className="t-lead">
          Hands-on projects in networking, self-hosting, and hardware support.
        </p>
      </header>

      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="work-list">
          {projects.map((project) => (
            <Link key={project.href} href={project.href} className="project-row">
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
