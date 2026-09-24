export function findP1TicketInRows(
  rows: any[],
  homeTeam: string,
  awayTeam: string,
  matchDate?: string
): P1Ticket | null {
  if (!rows || rows.length === 0) return null;

  const targetHome = cleanTeamName(homeTeam);
  const targetAway = cleanTeamName(awayTeam);

  const targetDateStr = matchDate ? matchDate.split('T')[0] : null;

  const matchedRow = rows.find(row => {
    // Bygg en enda stor sträng av hela raden (alla kolumner + eventnamn + URL)
    const fullRowText = `${row.home || ''} ${row.away || ''} ${row.eventName || ''} ${row.eventFullName || ''} ${row.url || ''}`.toLowerCase();

    // Extra rensning av sökorden för att få bort vanliga suffix som 'fc', 'cf', 'united' osv. om de ställer till det
    const cleanH = targetHome.replace(/(fc|cf|united|city|the)/g, '').trim();
    const cleanA = targetAway.replace(/(fc|cf|united|city|the)/g, '').trim();

    const homeMatch = fullRowText.includes(targetHome) || (cleanH.length > 2 && fullRowText.includes(cleanH)) || (targetHome === 'psg' && fullRowText.includes('paris'));
    const awayMatch = fullRowText.includes(targetAway) || (cleanA.length > 2 && fullRowText.includes(cleanA)) || (targetAway === 'psg' && fullRowText.includes('paris'));

    if (!homeMatch || !awayMatch) return false;

    // Datumkontroll (med tillåtelse för ±1 dag för tidszoner)
    if (targetDateStr && row.date) {
      const rowDateStr = row.date.split('T')[0];
      if (rowDateStr && rowDateStr !== targetDateStr) {
        const tTime = new Date(targetDateStr).getTime();
        const rTime = new Date(rowDateStr).getTime();
        if (!isNaN(tTime) && !isNaN(rTime)) {
          const diffDays = Math.abs((tTime - rTime) / (1000 * 3600 * 24));
          if (diffDays > 1) return false;
        }
      }
    }

    return !isNaN(row.price) && row.price > 0 && row.url.startsWith("http");
  });

  if (!matchedRow) return null;

  return {
    title: `${homeTeam} vs ${awayTeam}`,
    price: matchedRow.price,
    currency: matchedRow.currency,
    directUrl: matchedRow.url
  };
}