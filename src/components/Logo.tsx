import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type LogoSize = "header" | "home" | "footer" | "about";

const SRC = {
  header: "/brand/gifted-media-logo-inverso.png",
  footer: "/brand/gifted-media-logo-inverso.png",
  home: "/brand/gifted-media-logo.png",
  about: "/brand/gifted-media-logo.png",
} as const;

const HEIGHT = {
  header: "h-8 sm:h-9",
  footer: "h-10 sm:h-12",
  home: "h-14 sm:h-20",
  about: "h-16 sm:h-[4.5rem]",
} as const;

export function Logo({
  size = "header",
  to = "/",
}: {
  size?: LogoSize;
  to?: string | null;
  stacked?: boolean;
}) {
  const mark = (
    <img
      src={SRC[size]}
      alt="Gifted & Media"
      className={cn("w-auto max-w-full object-contain object-left", HEIGHT[size])}
    />
  );
  if (!to) return mark;
  return (
    <Link to={to} className="inline-block no-underline hover:opacity-90">
      {mark}
    </Link>
  );
}
