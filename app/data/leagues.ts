export interface LeagueSEOData {
  name: string;
  country: string;
  description: string;
  aboutTickets: string;
  ticketTips: string;
  teams: string[];
}

export const LEAGUES_DATA: Record<string, LeagueSEOData> = {
  "premier-league": {
    name: "Premier League",
    country: "England",
    description: "Världens mest populära och intensiva fotbollsliga. Upplev stämningen på arenor som Emirates Stadium, Old Trafford och Anfield live.",
    aboutTickets: "Biljetter till Premier League-matcher är extremt eftertraktade. Det absolut smidigaste och säkraste sättet för internationella supportrar att köpa är officiella hospitality-paket eller färdiga hotellpaket.",
    ticketTips: "Planera din resa i god tid. Matchdagar spikas ofta 6–8 veckor före matchhelgen.",
    teams: ["arsenal", "manchester-united", "liverpool", "chelsea", "tottenham", "manchester-city", "newcastle", "leeds", "aston-villa"]
  },
  "la-liga": {
    name: "La Liga",
    country: "Spanien",
    description: "Spansk toppfotboll fylld med teknik, passion och några av världens mest ikoniska fotbollsklubbar.",
    aboutTickets: "Biljetter till La Liga-matcher släpps ofta senare än i England. För stormatcher krävs lång framförhållning.",
    ticketTips: "Spansk fotboll spelas ofta sent på kvällarna. Se till att ha flexibla flygbokningar.",
    teams: ["real-madrid", "barcelona", "atletico-madrid", "valencia", "villareal", "real-betis", "sevilla", "real-sociedad", "athletic-bilbao"]
  },
  "champions-league": {
    name: "UEFA Champions League",
    country: "Europa",
    description: "Turneringen där Europas absolut bästa klubbar gör upp under strålkastarljuset.",
    aboutTickets: "Champions League-kvällar har en unik status och biljettrycket är enormt, särskilt i slutspelet.",
    ticketTips: "Perfekt att kombinera med en storstadssemester då matcherna spelas mitt i veckan.",
    teams: ["arsenal", "manchester-united", "liverpool", "real-madrid", "barcelona", ""]
  },
  "serie-a": {
    name: "Serie A",
    country: "Italien",
    description: "Italiensk fotboll när den är som bäst, känd för sin taktiska disciplin och passionerade fans.",
    aboutTickets: "Biljetter till Serie A kräver ofta att du registrerar dig med ID-handling hos klubbarna.",
    ticketTips: "Besök arenorna i god tid – säkerhetskontrollerna i Italien är noggranna.",
    teams: ["inter", "ac-milan", "juventus", "napoli", "roma", "lazio", "atalanta", "bologna", "como"]
  },
   "ligue-1": {
    name: "Ligue 1",
    country: "Frankrike",
    description: "Fransk toppfotboll som kombinerar teknisk briljans med unika talanger.",
    aboutTickets: "Biljetter till franska matcher kräver ofta att du registrerar ett konto hos klubben.",
    ticketTips: "Större arenor i Frankrike har ofta bra tillgänglighet, men boka i tid för PSG-matcher.",
    teams: ["psg", "lille", "strasbourg", "nice", "marseille", "lyon"]
  },
  "bundesliga": {
    name: "Bundesliga",
    country: "Tyskland",
    description: "Tyskland bjuder på några av Europas mest välfyllda arenor och fantastisk stämning.",
    aboutTickets: "Biljetter i Tyskland är ofta populära tack vare den höga publiktillströmningen.",
    ticketTips: "Se till att köpa officiella biljetter; tyska klubbar är mycket strikta med andrahandsmarknaden.",
    teams: ["bayern-munchen", "borussia-dortmund", "bayer-leverkusen", "eintracht-frankfurt", "stuttgart", "union-berlin"]
  },
  "eredivisie": {
    name: "Eredivisie",
    country: "Nederländerna",
    description: "En liga känd för sin offensiva filosofi och stora fokus på talangutveckling.",
    aboutTickets: "Eredivisie-biljetter är ofta lättare att få tag på via officiella kanaler.",
    ticketTips: "Kombinera matchen med en cykeltur – de flesta holländska arenor är mycket lättillgängliga.",
    teams: ["ajax", "psv", "feyenoord", "twente"]
  }// <--- Ingen semikolon här
}; // <--- Denna stänger LEAGUES_DATA och har semikolon