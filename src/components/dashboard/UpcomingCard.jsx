import React from "react";
import { Play } from "lucide-react";

export default function UpcomingCard({
  eyebrow = "Part 2",
  title = "User Experience Class",
  hostAvatar = "🧑‍🎨",
  hostName = "Shahma",
  ctaLabel = "Notify me",
  onCtaClick,
  onPlayClick,
  className = "",
}) {
  return (
    <div
      className={`w-full max-w-sm rounded-3xl bg-purple-200 p-5 ${className}`}
    >
      <div className="flex items-start gap-4">
        {/* Play button */}
        <button
          type="button"
          onClick={onPlayClick}
          aria-label="Play"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-violet-600 shadow-sm transition-transform hover:scale-105 active:scale-95"
        >
          <Play className="ml-0.5 h-5 w-5 fill-current" />
        </button>

        {/* Text content */}
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-purple-500">{eyebrow}</p>
          <h3 className="mt-1 text-xl font-bold leading-snug text-gray-900">
            {title}
          </h3>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-sm leading-none">{hostAvatar}</span>
            <span className="text-sm font-medium text-violet-600">
              {hostName}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onCtaClick}
        className="mt-4 w-full rounded-full bg-white py-3 text-sm font-semibold text-violet-600 transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
