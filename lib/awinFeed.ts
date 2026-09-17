import fs from "fs";
import path from "path";

export interface AwinTicketRow {
  merchantName: string;
  productName: string;
  priceSEK: number;
  url: string;
}

let cachedAwinRows: AwinTicketRow[] | null = null;
let lastFetchTime = 0;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 timme

export async function getAwinData(): Promise<AwinTicketRow[]> {
  const now = Date.now();
  if (cachedAwinRows && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedAwinRows;
  }

  try {
    // Om du laddar ner CSV-filen lokalt eller hämtar via Awin URL
    const filePath = path.join(process.cwd(), "data", "awin-feed.csv");
    if (!fs.existsSync(filePath)) {
      return [];
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n");
    const rows: AwinTicketRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Anpassa kolumnindex utifrån din CSV-struktur från Awin
      const cols = line.split("|").map((c) => c.replace(/^"|"$/g, "").trim());

      const url = cols[0] || "";
      const productName = cols[1] || "";
      const priceStr = cols[7] || "0";
      const merchantName = cols[8] || "Awin Partner";

      const priceSEK = parseFloat(priceStr.replace(",", "."));

      if (productName && !isNaN(priceSEK) && priceSEK > 0) {
        rows.push({
          merchantName,
          productName,
          priceSEK,
          url,
        });
      }
    }

    cachedAwinRows = rows;
    lastFetchTime = now;
    return rows;
  } catch (error) {
    console.error("Fel vid inläsning av Awin-feed:", error);
    return cachedAwinRows || [];
  }
}

export function findAwinTicketsForMatchSync(
  rows: AwinTicketRow[],
  cleanHome: string,
  cleanAway: string
): AwinTicketRow[] {
  if (!rows || rows.length === 0) return [];

  return rows.filter((row) => {
    const cleanProd = row.productName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cleanProd.includes(cleanHome) && cleanProd.includes(cleanAway);
  });
}