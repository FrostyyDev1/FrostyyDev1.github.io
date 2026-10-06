/* Generated from the approved mockup. Do not redraw official marks. */
export const homelabThumbSvg = `<svg class="thumb-net" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" role="presentation">
              <defs>
                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#26262B"/></pattern>
              </defs>
              <rect width="640" height="400" fill="#111113"/>
              <rect width="640" height="400" fill="url(#dots)"/>
              <!-- left column -->
              <g stroke="#4A4A52" stroke-width="1.5" fill="none">
                <line x1="146" y1="104" x2="146" y2="176"/>
                <line x1="146" y1="232" x2="146" y2="304"/>
                <line x1="316" y1="92" x2="316" y2="332"/>
                <line x1="316" y1="172" x2="360" y2="172"/>
                <line x1="316" y1="252" x2="360" y2="252"/>
                <line x1="316" y1="332" x2="360" y2="332"/>
              </g>
              <g stroke="#315CFF" stroke-width="2" fill="none">
                <line x1="252" y1="332" x2="316" y2="332"/>
                <polyline points="316,332 316,92 360,92"/>
              </g>
              <g fill="#0E0E10" stroke="#3A3A40" stroke-width="1.5">
                <rect x="40" y="48" width="212" height="56" rx="3"/>
                <rect x="40" y="176" width="212" height="56" rx="3"/>
                <rect x="360" y="146" width="240" height="52" rx="3"/>
                <rect x="360" y="226" width="240" height="52" rx="3"/>
                <rect x="360" y="306" width="240" height="52" rx="3"/>
              </g>
              <rect x="40" y="304" width="212" height="56" rx="3" fill="#15192A" stroke="#315CFF" stroke-width="2"/>
              <rect x="360" y="66" width="240" height="52" rx="3" fill="#15192A" stroke="#315CFF" stroke-width="2"/>
              <g fill="#315CFF"><rect x="313" y="329" width="6" height="6"/><rect x="313" y="89" width="6" height="6"/></g>
              <g fill="#4A4A52"><rect x="313" y="169" width="6" height="6"/><rect x="313" y="249" width="6" height="6"/></g>
              <g font-size="22" fill="#A6A6AD" text-anchor="middle">
                <text x="146" y="84">Internet</text>
                <text x="146" y="212">Router</text>
              </g>
              <text x="146" y="340" font-size="22" fill="#EDEAE3" text-anchor="middle">Raspberry Pi 5</text>
              <g font-size="22" fill="#A6A6AD">
                <text x="384" y="100" fill="#EDEAE3">Pi-hole</text>
                <text x="384" y="180">Tailscale</text>
                <text x="384" y="260">Uptime Kuma</text>
                <text x="384" y="340">Nginx PM</text>
              </g>
              <g fill="#6F8CFF" font-size="21" text-anchor="end"><text x="584" y="99">DNS</text></g>
            </svg>`;

export const homelabDiagramDesktopSvg = `<svg class="arch arch-h" viewBox="0 0 1200 468" role="img" aria-labelledby="ah-t ah-d">
          <title id="ah-t">HomeLab network diagram</title>
          <desc id="ah-d">Client devices send DNS queries through the Ubiquiti router to Pi-hole, running in Docker on a Raspberry Pi 5, which forwards them to an upstream DNS resolver. The Pi also runs Uptime Kuma, Nginx Proxy Manager, Glances, Watchtower, Homarr, File Browser, and Tailscale. A remote device reaches the Pi over a Tailscale WireGuard tunnel.</desc>
          <defs>
            <marker id="ah-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#2448E0"/></marker>
          </defs>
          <!-- links -->
          <g stroke="#2448E0" stroke-width="2.5" fill="none" marker-end="url(#ah-arrow)">
            <line x1="200" y1="132" x2="234" y2="132"/>
            <line x1="420" y1="132" x2="488" y2="132"/>
            <line x1="930" y1="132" x2="998" y2="132"/>
          </g>
          <line x1="200" y1="396" x2="488" y2="396" stroke="#2448E0" stroke-width="2.5" stroke-dasharray="8 7" fill="none"/>
          <text x="335" y="382" font-size="15" fill="#2448E0" text-anchor="middle">Tailscale (WireGuard)</text>
          <text x="445" y="120" font-size="15" fill="#2448E0" text-anchor="middle">:53</text>

          <!-- outer nodes -->
          <g fill="#F6F4EF" stroke="#0A0A0B" stroke-width="1.5">
            <rect x="16" y="92" width="184" height="80" rx="2"/>
            <rect x="236" y="92" width="184" height="80" rx="2"/>
            <rect x="1000" y="92" width="184" height="80" rx="2"/>
            <rect x="16" y="356" width="184" height="80" rx="2"/>
          </g>
          <g class="sans" font-size="20" font-weight="600" fill="#0A0A0B" text-anchor="middle">
            <text class="sans" x="108" y="128">Client devices</text>
            <text class="sans" x="328" y="128">Router</text>
            <text class="sans" x="1092" y="128">Upstream DNS</text>
            <text class="sans" x="108" y="392">Remote device</text>
          </g>
          <g font-size="15" fill="#4A463F" text-anchor="middle">
            <text x="108" y="153">Home LAN</text>
            <text x="328" y="153">Ubiquiti · <tspan fill="#6A5631">[model]</tspan></text>
            <text x="1092" y="153" fill="#6A5631">[resolver]</text>
            <text x="108" y="417">Off-network</text>
          </g>
          <g stroke="#6A5631" stroke-width="1" stroke-dasharray="3 3">
            <line x1="347" y1="158" x2="410" y2="158"/>
            <line x1="1047" y1="158" x2="1137" y2="158"/>
          </g>

          <!-- Pi host -->
          <rect x="470" y="40" width="480" height="412" rx="2" fill="none" stroke="#0A0A0B" stroke-width="1.5"/>
          <text x="490" y="72" font-size="15" font-weight="500" fill="#0A0A0B" letter-spacing="1.5">RASPBERRY PI 5</text>
          <text x="930" y="72" font-size="15" fill="#5B574F" text-anchor="end" letter-spacing="1.5">DOCKER</text>

          <rect x="490" y="96" width="440" height="72" rx="2" fill="#E3E8FF" stroke="#2448E0" stroke-width="2.5"/>
          <text class="sans" x="514" y="140" font-size="22" font-weight="600" fill="#0A0A0B">Pi-hole</text>
          <text x="906" y="138" font-size="15" fill="#2448E0" text-anchor="end">DNS filtering</text>

          <g fill="#F6F4EF" stroke="#0A0A0B" stroke-opacity=".55" stroke-width="1.2">
            <rect x="490" y="192" width="136" height="64" rx="2"/><rect x="642" y="192" width="136" height="64" rx="2"/><rect x="794" y="192" width="136" height="64" rx="2"/>
            <rect x="490" y="272" width="136" height="64" rx="2"/><rect x="642" y="272" width="136" height="64" rx="2"/><rect x="794" y="272" width="136" height="64" rx="2"/>
          </g>
          <g font-size="15" fill="#0A0A0B">
            <text x="506" y="229">Uptime Kuma</text><text x="658" y="229">Nginx PM</text><text x="810" y="229">Glances</text>
            <text x="506" y="309">Watchtower</text><text x="658" y="309">Homarr</text><text x="810" y="309">File Browser</text>
          </g>

          <rect x="490" y="360" width="440" height="72" rx="2" fill="#F6F4EF" stroke="#2448E0" stroke-width="2" stroke-dasharray="8 7"/>
          <text class="sans" x="514" y="404" font-size="22" font-weight="600" fill="#0A0A0B">Tailscale</text>
          <text x="906" y="402" font-size="15" fill="#2448E0" text-anchor="end">Mesh VPN</text>
        </svg>`;

export const homelabDiagramMobileSvg = `<svg class="arch arch-v" viewBox="0 0 360 880" role="img" aria-labelledby="av-t av-d">
          <title id="av-t">HomeLab network diagram</title>
          <desc id="av-d">Client devices send DNS queries through the Ubiquiti router to Pi-hole on a Raspberry Pi 5, which forwards them to an upstream DNS resolver. The Pi also runs Uptime Kuma, Nginx Proxy Manager, Glances, Watchtower, Homarr, File Browser, and Tailscale. A remote device reaches the Pi over a Tailscale tunnel.</desc>
          <defs>
            <marker id="av-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="13" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#2448E0"/></marker>
          </defs>
          <g stroke="#2448E0" stroke-width="2.5" fill="none" marker-end="url(#av-arrow)">
            <line x1="160" y1="88" x2="160" y2="122"/>
            <line x1="160" y1="196" x2="160" y2="266"/>
            <polyline points="296,298 338,298 338,828 302,828"/>
          </g>
          <line x1="160" y1="588" x2="160" y2="670" stroke="#2448E0" stroke-width="2.5" stroke-dasharray="7 6"/>
          <text x="172" y="636" font-size="16" fill="#2448E0">Tailscale tunnel</text>

          <g fill="#F6F4EF" stroke="#0A0A0B" stroke-width="1.5">
            <rect x="20" y="16" width="280" height="72" rx="2"/>
            <rect x="20" y="124" width="280" height="72" rx="2"/>
            <rect x="20" y="672" width="280" height="72" rx="2"/>
            <rect x="20" y="792" width="280" height="72" rx="2"/>
          </g>
          <g font-size="20" font-weight="600" fill="#0A0A0B" text-anchor="middle">
            <text class="sans" x="160" y="49">Client devices</text>
            <text class="sans" x="160" y="157">Router</text>
            <text class="sans" x="160" y="705">Remote device</text>
            <text class="sans" x="160" y="825">Upstream DNS</text>
          </g>
          <g font-size="16" fill="#4A463F" text-anchor="middle">
            <text x="160" y="73">Home LAN</text>
            <text x="160" y="181">Ubiquiti · <tspan fill="#6A5631">[model]</tspan></text>
            <text x="160" y="729">Off-network</text>
            <text x="160" y="849" fill="#6A5631">[resolver]</text>
          </g>
          <g stroke="#6A5631" stroke-width="1" stroke-dasharray="3 3">
            <line x1="176" y1="186" x2="232" y2="186"/>
            <line x1="120" y1="854" x2="200" y2="854"/>
          </g>

          <rect x="8" y="228" width="304" height="380" rx="2" fill="none" stroke="#0A0A0B" stroke-width="1.5"/>
          <text x="24" y="254" font-size="15" font-weight="500" fill="#0A0A0B">RASPBERRY PI 5</text>
          <text x="296" y="254" font-size="15" fill="#5B574F" text-anchor="end">DOCKER</text>

          <rect x="24" y="268" width="272" height="60" rx="2" fill="#E3E8FF" stroke="#2448E0" stroke-width="2.5"/>
          <text class="sans" x="40" y="305" font-size="20" font-weight="600" fill="#0A0A0B">Pi-hole</text>
          <text x="280" y="304" font-size="16" fill="#2448E0" text-anchor="end">DNS filtering</text>

          <g fill="#F6F4EF" stroke="#0A0A0B" stroke-opacity=".55" stroke-width="1.2">
            <rect x="24" y="344" width="128" height="48" rx="2"/><rect x="168" y="344" width="128" height="48" rx="2"/>
            <rect x="24" y="404" width="128" height="48" rx="2"/><rect x="168" y="404" width="128" height="48" rx="2"/>
            <rect x="24" y="464" width="128" height="48" rx="2"/><rect x="168" y="464" width="128" height="48" rx="2"/>
          </g>
          <g font-size="16" fill="#0A0A0B">
            <text x="38" y="373">Uptime Kuma</text><text x="182" y="373">Nginx PM</text>
            <text x="38" y="433">Glances</text><text x="182" y="433">Watchtower</text>
            <text x="38" y="493">Homarr</text><text x="182" y="493">File Browser</text>
          </g>

          <rect x="24" y="528" width="272" height="60" rx="2" fill="#F6F4EF" stroke="#2448E0" stroke-width="2" stroke-dasharray="7 6"/>
          <text class="sans" x="40" y="565" font-size="20" font-weight="600" fill="#0A0A0B">Tailscale</text>
          <text x="280" y="564" font-size="16" fill="#2448E0" text-anchor="end">Mesh VPN</text>
        </svg>`;
