import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function parseCsvLine(text: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') { inQuotes = !inQuotes; }
    else if (c === ',' && !inQuotes) { result.push(cur.trim().replace(/^"|"$/g, '')); cur = ''; }
    else { cur += c; }
  }
  result.push(cur.trim().replace(/^"|"$/g, ''));
  return result;
}

export async function GET() {
  const feedUrl = process.env.TICOMBO_FEED_URL || "https://feeds.performancehorizon.com/biljetterfotboll/1011l6399/a1f3f49c2e6d13ca6d33d24088acc238";
  
  try {
    const res = await fetch(feedUrl, { cache: "no-store" });
    const text = await res.text();
    const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
    const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase());

    const sampleRows = lines.slice(1).map(line => {
      const vals = parseCsvLine(line);
      const row: Record<string, string> = {};
      headers.forEach((h, idx) => { row[h] = vals[idx] || ''; });
      return row;
    });

    // Sök specifikt efter matcher med Arsenal och Atletico
    const arsenal = sampleRows.filter(r => (r['event_name'] || '').toLowerCase().includes('arsenal'));
    const atletico = sampleRows.filter(r => (r['event_name'] || '').toLowerCase().includes('atletico'));

    return NextResponse.json({
      totalRows: sampleRows.length,
      arsenalMatches: arsenal.map(r => ({ name: r['event_name'], link: r['deep_link'], price: r['min_final_sell_price'] })),
      atleticoMatches: atletico.map(r => ({ name: r['event_name'], link: r['deep_link'], price: r['min_final_sell_price'] }))
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
}