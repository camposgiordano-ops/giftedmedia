import { countryIso } from "@/data/labels";
import { cn } from "@/lib/utils";

export function CountryFlag({
  country,
  className,
}: {
  country?: string;
  className?: string;
}) {
  const iso = countryIso(country);
  if (!iso) return null;
  return (
    <img
      src={`/flags/${iso}.svg`}
      alt=""
      width={18}
      height={12}
      className={cn(
        "inline-block shrink-0 object-cover align-[-1.5px]",
        className,
      )}
      style={{ width: 18, height: 12 }}
    />
  );
}
