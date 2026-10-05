import {
  ImageResponse,
} from "next/og";

export const alt =
  "Jacob Wiseman — IT Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType =
  "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #070708 0%, #0b1020 65%, #14245f 100%)",
          color: "#F2F0EA",
          padding: "64px 72px",
          fontFamily:
            "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            fontSize: 20,
            letterSpacing: 4,
            color: "#8A8A92",
          }}
        >
          <span>
            JACOB WISEMAN
          </span>

          <span
            style={{
              color:
                "#315CFF",
            }}
          >
            PORTFOLIO / 2026
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection:
              "column",
          }}
        >
          <div
            style={{
              fontSize: 112,
              lineHeight: 0.86,
              letterSpacing: -8,
              fontWeight: 700,
            }}
          >
            JACOB
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 112,
              lineHeight: 0.86,
              letterSpacing: -8,
              fontWeight: 700,
              color: "#315CFF",
            }}
          >
            WISEMAN.
          </div>

          <div
            style={{
              marginTop: 38,
              maxWidth: 760,
              fontSize: 28,
              lineHeight: 1.35,
              color: "#B5B5BB",
            }}
          >
            IT Support · Networking ·
            Infrastructure · Systems
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            borderTop:
              "1px solid rgba(255,255,255,.12)",
            paddingTop: 24,
            fontSize: 18,
            color: "#77777F",
          }}
        >
          <span>
            Technical work built
            around real-world
            problem solving.
          </span>

          <span
            style={{
              color:
                "#D8D0C0",
            }}
          >
            jacob@portfolio
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

