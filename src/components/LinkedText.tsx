import { cn } from "@/lib/utils";

function tokenize(text: string) {
  const re = /(.+?)\s+"((https?:\/\/)[^"]+)"/g;
  const out: { t: string; href?: string }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const before = m[1] ?? "";
    const href = m[2];
    const words = before.split(/(\s+)/);
    let cut = words.length;
    let count = 0;
    for (let i = words.length - 1; i >= 0; i--) {
      if (!words[i].trim()) continue;
      count += 1;
      if (count >= 6) {
        cut = i;
        break;
      }
      cut = i;
    }
    const prefix = words.slice(0, cut).join("");
    const label = words.slice(cut).join("").trim() || before.trim();
    if (m.index > last) out.push({ t: text.slice(last, m.index) });
    if (prefix) out.push({ t: prefix });
    out.push({ t: label, href });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ t: text.slice(last) });
  if (!out.length) out.push({ t: text });
  return out;
}

export function LinkedText({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "p" | "div";
}) {
  if (!text) return null;
  const parts = tokenize(text);
  return (
    <Tag className={className}>
      {parts.map((p, i) =>
        p.href ? (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline underline-offset-2"
          >
            {p.t}
          </a>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </Tag>
  );
}

export function EditableText({
  value,
  onChange,
  editing,
  multiline = false,
  className,
  placeholder = "",
}: {
  value: string;
  onChange: (v: string) => void;
  editing: boolean;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}) {
  if (!editing) {
    return multiline ? (
      <LinkedText text={value} as="p" className={className} />
    ) : (
      <LinkedText text={value} className={className} />
    );
  }
  const shared = cn("w-full bg-paper-2 edit-ring px-2 py-1", className);
  if (multiline) {
    return (
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.max(3, value.split("\n").length + 1)}
        className={cn(shared, "resize-y leading-relaxed")}
      />
    );
  }
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={shared}
    />
  );
}
