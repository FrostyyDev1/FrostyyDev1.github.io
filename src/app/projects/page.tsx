import { SectionHead, WorkList } from "@/components/site/blocks";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Projects",
  description:
    "Hands-on projects in networking, self-hosting, and hardware support: a Raspberry Pi homelab and PC repair work.",
  path: "/projects/",
});

export default function ProjectsPage() {
  return (
    <section className="cs-hero" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          index="01"
          label="Selected work"
          title="Projects"
          titleId="projects-title"
          titleClass="t-display"
          heading="h1"
          intro={site.projectsIntro}
        />
        <WorkList />
      </div>
    </section>
  );
}
