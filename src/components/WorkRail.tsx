"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import { education, featuredCerts, roles } from "@/content/site";

type Item = {
  index: string;
  kind: string;
  when: string;
  title: string;
  text: string;
  href: string;
  art: "north" | "desk" | "school" | "badge";
  image?: { src: string; width: number; height: number; alt: string };
};

const items: Item[] = [
  {
    index: "01",
    kind: "Business",
    when: "Elkview, WV",
    title: roles[0].org,
    text: roles[0].summary,
    href: "/experience#northstar",
    art: "north",
  },
  {
    index: "02",
    kind: "Registration",
    when: "Epic",
    title: "Thomas Imaging Center",
    text: roles[1].summary,
    href: "/experience#wvu",
    art: "desk",
  },
  {
    index: "03",
    kind: "Certification",
    when: featuredCerts[0].earned,
    title: featuredCerts[0].name,
    text: `${featuredCerts[0].summary} Earned ${featuredCerts[0].earned}. Expires ${featuredCerts[0].expires}.`,
    href: "/certifications",
    art: "badge",
    image: {
      src: featuredCerts[0].image,
      width: featuredCerts[0].width,
      height: featuredCerts[0].height,
      alt: "",
    },
  },
  {
    index: "04",
    kind: "Certification",
    when: featuredCerts[1].earned,
    title: featuredCerts[1].name,
    text: `${featuredCerts[1].summary} Earned ${featuredCerts[1].earned}. Expires ${featuredCerts[1].expires}.`,
    href: "/certifications",
    art: "badge",
    image: {
      src: featuredCerts[1].image,
      width: featuredCerts[1].width,
      height: featuredCerts[1].height,
      alt: "",
    },
  },
  {
    index: "05",
    kind: "Degree",
    when: `Expected ${education.expected}`,
    title: education.school,
    text: `${education.degree}, expected ${education.expected}.`,
    href: "/about",
    art: "school",
  },
];

export function WorkRail() {
  const scroller = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  function sync() {
    const node = scroller.current;
    if (!node) return;
    const cards = [...node.querySelectorAll<HTMLElement>("[data-card]")];
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - node.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  }

  function go(next: number) {
    const node = scroller.current;
    if (!node) return;
    const card = node.querySelectorAll<HTMLElement>("[data-card]")[next];
    if (!card) return;
    node.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setIndex(next);
  }

  return (
    <div className="rail-wrap">
      <div className="rail-tools">
        <button type="button" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0}>
          Previous
        </button>
        <button
          type="button"
          onClick={() => go(Math.min(items.length - 1, index + 1))}
          disabled={index === items.length - 1}
        >
          Next
        </button>
      </div>
      <div className="rail" ref={scroller} onScroll={sync}>
        {items.map((item) => (
          <article key={item.index} className="rail-card" data-card>
            <Link href={item.href}>
              <header>
                <span>{item.index}</span>
                <span>{item.kind}</span>
                <span>{item.when}</span>
              </header>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className={`rail-art art-${item.art}`} aria-hidden="true">
                {item.image ? (
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                  />
                ) : null}
                {item.art === "north" ? <span className="art-star" /> : null}
                {item.art === "desk" ? (
                  <span className="art-lines">
                    <i />
                    <i />
                    <i />
                  </span>
                ) : null}
                {item.art === "school" ? <span className="art-year">2027</span> : null}
              </div>
            </Link>
          </article>
        ))}
      </div>
      <div className="rail-dots" role="tablist" aria-label="Selected work">
        {items.map((item, i) => (
          <button
            key={item.index}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`${item.title}, item ${item.index}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
