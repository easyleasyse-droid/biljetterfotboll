export interface P1Ticket {
  title: string;
  price: number;
  currency: string;
  directUrl: string;
}

function cleanTeamName(name: string): string {
  if (!name) return '';
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

export async function fetchP1FeedRows(): Promise<any[]> {
  try {
    const response = await fetch('https://p1travel.tp.st/api/feed', {
      next: { revalidate: 3600 }
    });
    if (!response.ok) return [];
    const text = await response.text();
    
    // Enkel CSV/JSON-parsing beroende på format
    const lines = text.split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const currentLine = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      if (currentLine.length >= headers.length) {
        const rowObj: any = {};
        headers.forEach((header, index) => {
          rowObj[header] = (currentLine[index] || '').replace(/"/g, '').trim();
        });
        rows.push({
          home: cleanTeamName(rowObj.home_team || rowObj.home || ''),
          away: cleanTeamName(rowObj.away_team || rowObj.away || ''),
          eventName: cleanTeamName(rowObj.event_name || rowObj.title || ''),
          date: rowObj.date || rowObj.event_date || '',
          price: parseFloat(rowObj.min_price || rowObj.price || '0'),
          currency: rowObj.currency || 'EUR',
          url: rowObj.url || rowObj.affiliate_url || ''
        });
      }
    }
    return rows;
  } catch (err) {
    return [];
  }
}

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
    const fullRowText = `${row.home || ''} ${row.away || ''} ${row.eventName || ''} ${row.url || ''}`.toLowerCase();

    const cleanH = targetHome.replace(/(fc|cf|united|city|the)/g, '').trim();
    const cleanA = targetAway.replace(/(fc|cf|united|city|the)/g, '').trim();

    const homeMatch = fullRowText.includes(targetHome) || (cleanH.length > 2 && fullRowText.includes(cleanH)) || (targetHome === 'psg' && fullRowText.includes('paris'));
    const awayMatch = fullRowText.includes(targetAway) || (cleanA.length > 2 && fullRowText.includes(cleanA)) || (targetAway === 'psg' && fullRowText.includes('paris'));

    if (!homeMatch || !awayMatch) return false;

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