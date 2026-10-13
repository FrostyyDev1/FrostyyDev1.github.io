import Image from "next/image";
import Link from "next/link";

import { certifications } from "@/content/site";

export default function CertStrip() {
  return (
    <ul className="cert-strip">
      {certifications.map((cert) => (
        <li key={cert.id}>
          <Link href="/certifications/">
            <Image
              src={cert.image}
              alt=""
              width={96}
              height={96}
            />
            <span>
              <strong>{cert.name}</strong>
              <em>
                Earned {cert.earned}
                {cert.expires ? ` · Expires ${cert.expires}` : ""}
              </em>
            </span>
            <span className="tile-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
