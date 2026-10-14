// ── Quoting a sheet name inside a reference ──────────────────────────
//
// A leaf module on purpose. The rule is three lines, but neither obvious
// home for it is free: `_refs.ts` pulls in `cell-utils`' formula walker,
// and sharing the helper from there — so the chart writer and the print
// defined names quote alike (#587) — cost 1.1 KB gzipped on `readXlsx`,
// a bundle the chart *reader* is part of, and put two scenarios over
// `scripts/size-budget.json`. Importable from either side, graph-free.

/**
 * Quote a sheet name when it contains characters Excel considers unsafe
 * in a 3D reference (whitespace, punctuation, etc.). Single quotes
 * inside the name are doubled per the OOXML spec.
 *
 * The inverse of the unquoting `_refs.ts` and the reader do when they
 * compare a qualifier against a sheet name.
 */
export function quoteSheetName(name: string): string {
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(name)) return name
  return `'${name.replace(/'/g, "''")}'`
}
