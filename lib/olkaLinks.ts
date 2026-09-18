// Din unika spårningslänk från Tradedoubler (från skärmdumpen)
const TRADEDOUBLER_BASE_URL = "https://clk.tradedoubler.com/click?p=355835&a=3495104";

/**
 * Genererar en spårad Tradedoubler-deeplink till OLKA Express
 * @param homeTeam Namnet på hemmalaget (t.ex. "Arsenal" eller "Manchester City")
 */
export function getOlkaDeepLink(homeTeam: string): string {
  // Gör om lagets namn till ett format som passar OLKA Express URL-struktur (t.ex. "manchester-city")
  const formattedTeam = homeTeam
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Ta bort specialtecken som å, ä, ö
    .replace(/[^a-z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  // Målsida hos OLKA Express (de flesta lag har URL som /fotbollsbiljetter/lag-namn.aspx eller sökning)
  const targetUrl = `https://www.olkaexpress.se/fotbollsbiljetter/${formattedTeam}.aspx`;

  // Bygg den färdiga Tradedoubler Deeplinken
  return `${TRADEDOUBLER_BASE_URL}&g=${encodeURIComponent(targetUrl)}`;
}