export default function ProjectArt({
  kind,
}: {
  kind: "lab" | "northstar" | "pcs";
}) {
  if (kind === "northstar") {
    return (
      <div className="art art-ns" aria-hidden="true">
        <div className="art-inner">
          <p className="art-kicker">NorthStar IT Services</p>
          <p className="art-words">
            Diagnose.
            <br />
            <em>Repair.</em>
            <br />
            Verify.
          </p>
          <p className="art-foot">Hardware · Support · Systems</p>
        </div>
      </div>
    );
  }

  if (kind === "pcs") {
    return (
      <div className="art art-pcs" aria-hidden="true">
        <div className="art-inner">
          <p className="art-kicker">Custom builds</p>
          <div className="tower">
            <i />
            <i />
            <i />
          </div>
          <p className="art-foot">Compatibility · Assembly · Test</p>
        </div>
      </div>
    );
  }

  return (
    <div className="art art-lab" aria-hidden="true">
      <div className="art-inner">
        <p className="art-kicker">Raspberry Pi 5</p>
        <div className="node-row">
          <span>Pi-hole</span>
          <span>Tailscale</span>
          <span>Uptime Kuma</span>
          <span>Nginx PM</span>
        </div>
        <p className="art-foot">DNS · Remote access · Monitoring</p>
      </div>
    </div>
  );
}
