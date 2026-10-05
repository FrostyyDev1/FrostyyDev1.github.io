"use client";

import { useState } from "react";

const tracks = [
  {
    title: "Orbiter",
    artist: "Noah Kahan",
    spotifyId: "4W6yulge3h7FSy0zGFrNKs",
    url: "https://open.spotify.com/track/4W6yulge3h7FSy0zGFrNKs",
    cover: "https://i.scdn.co/image/ab67616d0000b27342045f14bfed607393b91735",
  },
  {
    title: "American Cars",
    artist: "Noah Kahan",
    spotifyId: "3WRgRy12YW4I9mjodKXWwy",
    url: "https://open.spotify.com/track/3WRgRy12YW4I9mjodKXWwy",
    cover: "https://i.scdn.co/image/ab67616d0000b273d879855b819250d3d00a1a38",
  },
  {
    title: "Dirty Guitar Tones",
    artist: "Harrison Boe",
    spotifyId: "7tgqQgZp5HxCxBkYV7ZK7h",
    url: "https://open.spotify.com/track/7tgqQgZp5HxCxBkYV7ZK7h",
    cover: "https://i.scdn.co/image/ab67616d0000b273330a89cc9520272458aa37a2",
  },
  {
    title: "Saltillo",
    artist: "Harrison Boe",
    spotifyId: "7rzUdJgs7qDkA1xqqQWodD",
    url: "https://open.spotify.com/track/7rzUdJgs7qDkA1xqqQWodD",
    cover: "https://i.scdn.co/image/ab67616d0000b273a9f1e110c05f38d0ae04b9e9",
  },
];

export default function PortfolioPlaylist() {
  const [selected, setSelected] = useState(0);
  const active = tracks[selected];

  return (
    <div>
      <div className="mb-8 flex items-end justify-between border-t border-white/[0.08] pt-6">
        <div>
          <p className="font-mono-custom text-[8px] uppercase tracking-[0.2em] text-neutral-600">
            Listening
          </p>
          <h3 className="mt-3 text-3xl tracking-[-0.045em] text-[#F2F0EA]">
            My Rotation
          </h3>
        </div>

        <span className="font-mono-custom text-[8px] uppercase tracking-[0.18em] text-[#315CFF]">
          04 Tracks
        </span>
      </div>

      <div className="grid grid-cols-[92px_1fr] gap-5 sm:grid-cols-[120px_1fr] md:grid-cols-[170px_1fr] md:gap-7">
        <img
          src={active.cover}
          alt={`${active.title} cover artwork`}
          className="aspect-square h-auto w-full bg-neutral-900 object-cover"
        />

        <div className="flex min-w-0 flex-col justify-between py-1">
          <div>
            <p className="font-mono-custom text-[7px] uppercase tracking-[0.16em] text-neutral-700">
              Selected track
            </p>
            <h4 className="mt-2 truncate text-xl font-medium tracking-[-0.04em] text-[#F2F0EA] sm:text-2xl md:mt-3 md:text-3xl">
              {active.title}
            </h4>
            <p className="mt-1.5 text-xs text-neutral-500 sm:text-sm">
              {active.artist}
            </p>
          </div>

          <a
            href={active.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-fit text-xs text-neutral-600 transition hover:text-[#D8D0C0]"
          >
            Open in Spotify
          </a>
        </div>
      </div>

      <div className="mt-7 border-t border-white/[0.08]">
        {tracks.map((track, index) => {
          const activeTrack = index === selected;

          return (
            <button
              key={track.spotifyId}
              type="button"
              onClick={() => setSelected(index)}
              className="group grid min-h-14 w-full touch-manipulation grid-cols-[40px_1fr_auto] items-center gap-3 border-b border-white/[0.07] py-3 text-left"
            >
              <span
                className={`font-mono-custom text-[8px] ${
                  activeTrack ? "text-[#315CFF]" : "text-neutral-700"
                }`}
              >
                0{index + 1}
              </span>

              <div className="min-w-0">
                <p
                  className={`truncate text-sm transition ${
                    activeTrack
                      ? "text-[#F2F0EA]"
                      : "text-neutral-400 group-hover:text-[#F2F0EA]"
                  }`}
                >
                  {track.title}
                </p>
                <p className="mt-1 truncate text-xs text-neutral-700">
                  {track.artist}
                </p>
              </div>

              <span
                className={`font-mono-custom text-[7px] uppercase tracking-[0.14em] transition ${
                  activeTrack
                    ? "text-[#315CFF]"
                    : "text-neutral-800 group-hover:text-neutral-500"
                }`}
              >
                {activeTrack ? "Selected" : "Play"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-7 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0B0C10]">
        <iframe
          key={active.spotifyId}
          src={`https://open.spotify.com/embed/track/${active.spotifyId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title={`${active.title} by ${active.artist}`}
          className="block h-[152px] w-full border-0"
        />
      </div>
    </div>
  );
}
