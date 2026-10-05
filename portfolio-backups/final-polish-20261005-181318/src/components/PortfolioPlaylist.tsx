"use client";

import { useState } from "react";

const tracks = [
  {
    title: "Orbiter",
    artist: "Noah Kahan",
    spotifyId: "4W6yulge3h7FSy0zGFrNKs",
    url: "https://open.spotify.com/track/4W6yulge3h7FSy0zGFrNKs",
    cover:
      "https://i.scdn.co/image/ab67616d0000b27342045f14bfed607393b91735",
  },
  {
    title: "American Cars",
    artist: "Noah Kahan",
    spotifyId: "3WRgRy12YW4I9mjodKXWwy",
    url: "https://open.spotify.com/track/3WRgRy12YW4I9mjodKXWwy",
    cover:
      "https://i.scdn.co/image/ab67616d0000b273d879855b819250d3d00a1a38",
  },
  {
    title: "Dirty Guitar Tones",
    artist: "Harrison Boe",
    spotifyId: "7tgqQgZp5HxCxBkYV7ZK7h",
    url: "https://open.spotify.com/track/7tgqQgZp5HxCxBkYV7ZK7h",
    cover:
      "https://i.scdn.co/image/ab67616d0000b273330a89cc9520272458aa37a2",
  },
  {
    title: "Saltillo",
    artist: "Harrison Boe",
    spotifyId: "7rzUdJgs7qDkA1xqqQWodD",
    url: "https://open.spotify.com/track/7rzUdJgs7qDkA1xqqQWodD",
    cover:
      "https://i.scdn.co/image/ab67616d0000b273a9f1e110c05f38d0ae04b9e9",
  },
];

export default function PortfolioPlaylist() {
  const [selected, setSelected] = useState(0);

  const active = tracks[selected];

  return (
    <div>
      <div className="mb-8 flex items-end justify-between border-t border-white/10 pt-6">
        <div>
          <p className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-neutral-600">
            Listening
          </p>

          <h3 className="mt-3 text-3xl tracking-[-0.04em]">
            My Rotation
          </h3>
        </div>

        <span className="font-mono-custom text-[9px] uppercase tracking-[0.18em] text-[#315cff]">
          04 Tracks
        </span>
      </div>

      <div className="grid gap-7 md:grid-cols-[180px_1fr]">
        <div
          className="aspect-square w-full bg-neutral-900 bg-cover bg-center"
          style={{
            backgroundImage: `url("${active.cover}")`,
          }}
        />

        <div className="flex flex-col justify-between">
          <div>
            <p className="font-mono-custom text-[8px] uppercase tracking-[0.16em] text-neutral-700">
              Now selected
            </p>

            <h4 className="mt-3 text-3xl font-medium tracking-[-0.045em]">
              {active.title}
            </h4>

            <p className="mt-2 text-sm text-neutral-500">
              {active.artist}
            </p>
          </div>

          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-fit text-xs text-neutral-600 transition hover:text-white"
          >
            Open in Spotify ↗
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10">
        {tracks.map((track, index) => {
          const activeTrack =
            index === selected;

          return (
            <button
              key={track.spotifyId}
              type="button"
              onClick={() =>
                setSelected(index)
              }
              className="group grid w-full grid-cols-[45px_1fr_auto] items-center gap-3 border-b border-white/[0.07] py-4 text-left"
            >
              <span
                className={`font-mono-custom text-[9px] ${
                  activeTrack
                    ? "text-[#315cff]"
                    : "text-neutral-700"
                }`}
              >
                0{index + 1}
              </span>

              <div>
                <p
                  className={`text-sm transition ${
                    activeTrack
                      ? "text-white"
                      : "text-neutral-400 group-hover:text-white"
                  }`}
                >
                  {track.title}
                </p>

                <p className="mt-1 text-xs text-neutral-700">
                  {track.artist}
                </p>
              </div>

              <span
                className={`font-mono-custom text-[8px] uppercase tracking-[0.14em] transition ${
                  activeTrack
                    ? "text-[#315cff]"
                    : "text-neutral-800 group-hover:text-neutral-500"
                }`}
              >
                {activeTrack
                  ? "Selected"
                  : "Play"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-7 overflow-hidden rounded-xl">
        <iframe
          key={active.spotifyId}
          src={`https://open.spotify.com/embed/track/${active.spotifyId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`${active.title} by ${active.artist}`}
          className="block w-full border-0"
        />
      </div>
    </div>
  );
}
