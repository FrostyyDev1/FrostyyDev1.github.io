import Image from "next/image";

import { certifications } from "@/content/site";

export default function CertGrid() {
  return (
    <ul className="cert-grid">
      {certifications.map((cert) => (
        <li className="cert" key={cert.id}>
          <div className="cert-logo">
            <Image
              src={cert.image}
              alt={cert.imageAlt}
              width={320}
              height={320}
            />
          </div>
          <div>
            <p className="t-label">{cert.issuer}</p>
            <h3 className="t-h3" style={{ marginTop: 10 }}>
              {cert.name}
            </h3>
            <p className="dates">
              Earned {cert.earned}
              {cert.expires ? ` · Expires ${cert.expires}` : ""}
            </p>
            <p className="t-small" style={{ marginTop: 12 }}>
              {cert.description}
            </p>
          </div>
          <div className="focus-list">
            {cert.focus.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}
