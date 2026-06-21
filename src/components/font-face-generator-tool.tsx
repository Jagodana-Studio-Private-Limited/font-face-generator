"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Copy, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToolEvents } from "@/lib/analytics";

type FontDisplay = "auto" | "block" | "swap" | "fallback" | "optional";
type FontStyle = "normal" | "italic" | "oblique";

interface FontVariant {
  id: string;
  weight: string;
  style: FontStyle;
  display: FontDisplay;
  urls: string;
}

const FONT_WEIGHTS = [
  { label: "100 — Thin", value: "100" },
  { label: "200 — Extra Light", value: "200" },
  { label: "300 — Light", value: "300" },
  { label: "400 — Regular", value: "400" },
  { label: "500 — Medium", value: "500" },
  { label: "600 — Semi Bold", value: "600" },
  { label: "700 — Bold", value: "700" },
  { label: "800 — Extra Bold", value: "800" },
  { label: "900 — Black", value: "900" },
];

const FONT_DISPLAYS: { label: string; value: FontDisplay }[] = [
  { label: "swap — show fallback immediately", value: "swap" },
  { label: "auto — browser decides", value: "auto" },
  { label: "block — brief invisible period", value: "block" },
  { label: "fallback — short block, then swap", value: "fallback" },
  { label: "optional — use if cached", value: "optional" },
];

const FONT_STYLES: { label: string; value: FontStyle }[] = [
  { label: "normal", value: "normal" },
  { label: "italic", value: "italic" },
  { label: "oblique", value: "oblique" },
];

function detectFormat(url: string): string {
  const lower = url.toLowerCase().split("?")[0];
  if (lower.endsWith(".woff2")) return "woff2";
  if (lower.endsWith(".woff")) return "woff";
  if (lower.endsWith(".ttf")) return "truetype";
  if (lower.endsWith(".otf")) return "opentype";
  if (lower.endsWith(".eot")) return "embedded-opentype";
  if (lower.endsWith(".svg") || lower.endsWith(".svgz")) return "svg";
  return "woff2";
}

function buildSrcLine(urls: string): string {
  const lines = urls
    .split(/[\n,]/)
    .map((u) => u.trim())
    .filter(Boolean);

  if (lines.length === 0) return "  src: /* paste font URL here */;";

  const formatted = lines.map((url) => `url('${url}') format('${detectFormat(url)}')`);
  if (formatted.length === 1) {
    return `  src: ${formatted[0]};`;
  }
  return `  src: ${formatted.join(",\n       ")};`;
}

function generateCSS(fontFamily: string, variants: FontVariant[]): string {
  if (!fontFamily.trim()) return "/* Enter a font family name above */";

  return variants
    .map(
      (v) =>
        `@font-face {\n  font-family: '${fontFamily.trim()}';\n  font-weight: ${v.weight};\n  font-style: ${v.style};\n  font-display: ${v.display};\n${buildSrcLine(v.urls)}\n}`
    )
    .join("\n\n");
}

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function makeDefaultVariant(): FontVariant {
  return { id: uid(), weight: "400", style: "normal", display: "swap", urls: "" };
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-8"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
}

export function FontFaceGeneratorTool() {
  const [fontFamily, setFontFamily] = useState("MyFont");
  const [variants, setVariants] = useState<FontVariant[]>([makeDefaultVariant()]);
  const [copied, setCopied] = useState(false);

  const updateVariant = useCallback(
    (id: string, patch: Partial<FontVariant>) => {
      setVariants((prev) =>
        prev.map((v) => (v.id === id ? { ...v, ...patch } : v))
      );
    },
    []
  );

  const addVariant = useCallback(() => {
    setVariants((prev) => [...prev, makeDefaultVariant()]);
    ToolEvents.toolUsed("add_variant");
  }, []);

  const removeVariant = useCallback((id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const css = generateCSS(fontFamily, variants);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      toast.success("CSS copied to clipboard!");
      ToolEvents.resultCopied();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy failed — please select and copy manually.");
    }
  }, [css]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Font Family Input */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border/60 bg-card p-6 space-y-3"
      >
        <label className="text-sm font-semibold">Font Family Name</label>
        <Input
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
          placeholder="e.g. MyFont, PoppinsCustom, BrandSans"
          className="font-mono text-base"
        />
        <p className="text-xs text-muted-foreground">
          This becomes the value you use in{" "}
          <code className="bg-muted px-1 rounded text-xs">font-family: &apos;{fontFamily || "MyFont"}&apos;</code>{" "}
          throughout your CSS.
        </p>
      </motion.div>

      {/* Font Variants */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">
            Font Variants
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              ({variants.length} {variants.length === 1 ? "variant" : "variants"})
            </span>
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={addVariant}
            className="gap-1.5 border-brand/40 text-brand hover:bg-brand/5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Variant
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {variants.map((variant, idx) => (
            <motion.div
              key={variant.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.18 }}
              className="rounded-2xl border border-border/60 bg-card p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Variant {idx + 1}
                </span>
                {variants.length > 1 && (
                  <button
                    onClick={() => removeVariant(variant.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="Remove variant"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <SelectField
                  label="Weight"
                  value={variant.weight}
                  onChange={(v) => updateVariant(variant.id, { weight: v })}
                  options={FONT_WEIGHTS}
                />
                <SelectField
                  label="Style"
                  value={variant.style}
                  onChange={(v) => updateVariant(variant.id, { style: v as FontStyle })}
                  options={FONT_STYLES}
                />
                <SelectField
                  label="font-display"
                  value={variant.display}
                  onChange={(v) => updateVariant(variant.id, { display: v as FontDisplay })}
                  options={FONT_DISPLAYS}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Font File URL(s)
                </label>
                <textarea
                  value={variant.urls}
                  onChange={(e) => updateVariant(variant.id, { urls: e.target.value })}
                  placeholder={`https://example.com/fonts/myfont-400.woff2\nhttps://example.com/fonts/myfont-400.woff`}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring resize-none placeholder:text-muted-foreground/50"
                />
                <p className="text-xs text-muted-foreground">
                  One URL per line. Format (woff2, woff, ttf, otf) is detected automatically from the file extension.
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Generated CSS Output */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-brand/20 bg-card overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border/60 bg-brand/5">
          <span className="text-sm font-semibold text-brand">Generated CSS</span>
          <Button
            size="sm"
            onClick={handleCopy}
            className="gap-1.5 bg-gradient-to-r from-brand to-brand-accent text-white shadow-sm"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy CSS
              </>
            )}
          </Button>
        </div>
        <pre className="p-5 text-sm font-mono leading-relaxed overflow-x-auto text-foreground whitespace-pre">
          {css}
        </pre>
      </motion.div>

      {/* Usage tip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-border/40 bg-muted/30 px-5 py-4"
      >
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Tip:</strong> Paste this CSS at the top of your stylesheet (or in a{" "}
          <code className="bg-muted px-1 rounded">@layer base</code> block in Tailwind). Reference the font with{" "}
          <code className="bg-muted px-1 rounded">font-family: &apos;{fontFamily || "MyFont"}&apos;, sans-serif;</code>.
          Always include a generic family as a fallback.
        </p>
      </motion.div>
    </div>
  );
}
