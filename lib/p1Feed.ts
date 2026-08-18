export function findP1TicketInRows(rows: any[], homeTeam: string, awayTeam: string): P1Ticket | null {
  if (!rows || rows.length === 0) return null;

  // Hjälpfunktion för att översätta vanliga lagnamn till vad P1 brukar kalla dem i sin CSV
  const getSearchKeywords = (teamName: string): string[] => {
    const clean = cleanTeamName(teamName);
    
    if (clean.includes("inter") && !clean.includes("miami")) {
      return ["inter", "internazionale"];
    }
    if (clean.includes("milan")) {
      return ["ac milan", "milan"];
    }
    if (clean.includes("atletico")) {
      return ["atletico", "atl. madrid", "atletico madrid"];
    }
    if (clean.includes("real madrid")) {
      return ["real madrid", "r. madrid"];
    }

    // Standard: ta första ordet (t.ex. "monza", "liverpool", "barcelona")
    return [clean.split(' ')[0]];
  };

  const homeKeywords = getSearchKeywords(homeTeam);
  const awayKeywords = getSearchKeywords(awayTeam);

  const matchedRow = rows.find((row) => {
    const titleClean = cleanTeamName(row.title || row.product_name || row.name || '');

    // Kollar om MINST ETT av hemmalagets alias OCH bortalagets alias finns i titeln
    const homeMatch = homeKeywords.some(k => titleClean.includes(k));
    const awayMatch = awayKeywords.some(k => titleClean.includes(k));

    return homeMatch && awayMatch;
  });

  if (matchedRow) {
    const rawPrice = matchedRow['price'] || matchedRow['price_sek'] || matchedRow['buy_price'] || Object.values(matchedRow).find((v: any) => !isNaN(parseFloat(v)) && parseFloat(v) > 10) || '0';
    const url = matchedRow['destination_url'] || matchedRow['destination url'] || matchedRow['link'] || matchedRow['url'] || matchedRow['tracking_url'] || '';
    const title = matchedRow['title'] || matchedRow['product_name'] || matchedRow['name'] || `${homeTeam} vs ${awayTeam}`;

    const priceNum = parseFloat(rawPrice as string);

    if (priceNum > 0) {
      return {
        title,
        price: priceNum,
        currency: 'EUR',
        directUrl: url as string
      };
    }
  }

  return null;
}