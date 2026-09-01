export interface FAQItem {
  question: string;
  answer: string;
}

export interface TeamSEOData {
  name: string;
  stadiumName: string;
  logo?: string;
  stadiumDescription: string;
  location: string;
  league: string;
  aboutTickets: string;
  heroImage: string;
  contentImage: string;
  stadiumLayoutImage: string; // NY: Länk till arenaskiss/läktaröversikt
  googleMapsEmbedUrl: string;  // NY: Inbäddningslänk för live-karta
  howToBuy: string;
  sectionsAndPrices: string;
  packages: string;
  history: string;
  faqs: FAQItem[];
}

export const TEAMS_SEO_DATA: Record<string, any> = {
  "arsenal": {
    name: "Arsenal FC",
    stadiumName: "Emirates Stadium",
    logo: "/logos/arsenal.png",
    stadiumDescription: "Emirates Stadium, som slog upp portarna 2006 i norra London, är ett arkitektoniskt mästerverk och en av världens mest lönsamma och moderna arenor. Med en kapacitet på 60 704 åskådare erbjuder den enastående siktlinjer från varenda stol, rymliga concourses under läktarna och en helt fantastisk gräsmatta som ofta kallas för världens bästa. Arenan är uppdelad i fyra etage och är känd för att vara extremt tillgänglig och bekväm, även om purister ibland saknar atmosfären från gamla Highbury. Under de senaste åren, i takt med lagets sportsliga framgångar, har stämningen dock lyft till helt nya höjder, särskilt på den södra läktaren (The Clock End) där de mest röststarka fansen samlas.",
    location: "London, England",
    league: "Premier League",
    aboutTickets: "Biljetter till Arsenals matcher på Emirates Stadium i London är mycket eftertraktade. Priserna varierar från ca 900 SEK för ordinarie ligamatcher upp till 3 500 SEK för storkamper mot till exempel Tottenham eller Manchester City.",
    heroImage: "/stadiums/emirates-stadium-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop", // Arenastrålkastare/matchmiljö
    stadiumLayoutImage: "/stadiums/emirates-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.24584281729!2d-0.10842242337777176!3d51.5548884718247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b764bf00001%3A0x12e9491176b9117a!2sEmirates%20Stadium!5e0!3m2!1ssv!2sse!4v1710000000000!5m2!1ssv!2sse",
    howToBuy: "Att köpa biljetter direkt via Arsenals officiella kanaler kräver i princip alltid ett betalt medlemskap (Red Membership, ca £35/år) per biljett. Biljetterna släpps exakt två månader före match via ett digitalt kösystem där chanserna är små för populära helgmatcher. För internationella resenärer är det betydligt tryggare och smidigare att köpa via verifierade återförsäljare och partners som P1 Travel och Ticombo som säljer officiella match- och hotellpaket helt utan krav på medlemskap.",
    sectionsAndPrices: "Priserna är uppdelade i Kategori A (t.ex. Tottenham, Chelsea, Man Utd), Kategori B (t.ex. Aston Villa, Newcastle) och Kategori C (t.ex. nykomlingar). Upper Tier (övre etage) ger en fantastisk taktisk vy över spelet och är billigast, men du sitter högt upp. Lower Tier (nedre etage) tar dig så nära spelarna att du kan höra dem prata, men sikten kan bli lidande vid kortsidorna när bollen är på andra sidan. För den ultimata upplevelsen rekommenderas Club Level (mellanetaget) – här sitter du på vadderade lyxsäten och har tillgång till exklusiva barer, restauranger och gratis dryck i halvtid.",
    packages: "De flesta fotbollsresenärer väljer ett komplett matchpaket. Det beror på att hotellpriserna i London skjuter i höjden under matchhelger. Ett standardpaket inkluderar en officiell matchbiljett (ofta placerad på Club Level, sektion 66-74 eller liknande) samt 1, 2 eller 3 nätter på ett centralt 3- eller 4-stjärnigt hotell (t.ex. i Kings Cross eller Euston för enkel logistik till arenan). Detta säkrar att hela sällskapet får sitta tillsammans och eliminerar risken för matchflyttar då paketen ofta har inbyggda garantier.",
    history: "Arsenal FC grundades 1886 av ammunitionsarbetare i Woolwich, sydöstra London, under namnet Dial Square (vilket snabbt blev Royal Arsenal). År 1913 tog klubben det kontroversiella beslutet att flytta tvärs över staden till norra London och Highbury under ledning av visionären Sir Henry Norris. Under 1930-talet dominerade klubben engelsk fotboll under Herbert Chapman, som revolutionerade både taktiken (WM-systemet) och arenan. Klubbens modernaste glansdagar inföll under Arsène Wenger (1996–2018), vars franska revolution bar frukt i form av den historiska 'Invincibles'-säsongen 2003/04 när laget gick obesegrade genom hela ligasäsongen.",
    faqs: [
  {
    question: "Behöver jag ett Arsenal-medlemskap för att köpa här?",
    answer: "Nej, de återförsäljare och paketleverantörer vi jämför säljer officiella hospitality- och resebiljetter där klubbmedlemskap inte krävs."
  },
  {
    question: "Vad innebär Club Level på Emirates Stadium?",
    answer: "Club Level är arenans premium-etage (etage 2). Det ger fantastisk vy över planen, bekvämare vadderade stolar, tillgång till exklusiva restauranger och barer, samt ofta en gratis dryck i halvtid och ett officiellt matchprogram."
  },
  {
    question: "Hur tar man sig enklast till Emirates Stadium?",
    answer: "Enklast tar du dig till Emirates Stadium via Londons tunnelbana (Piccadilly Line) till stationerna Arsenal eller Holloway Road. Det går även bra att åka till Finsbury Park (Victoria Line / National Rail) och gå den sista biten på ca 10 minuter."
  },
  {
    question: "Vad kostar en fotbollsresa till Arsenal totalt?",
    answer: "En komplett fotbollsresa till Arsenal i London brukar landa på mellan 4 500 SEK och 9 000 SEK per person. Totalkostnaden beror främst på motståndare, läktarkategori samt hur tidigt du bokar flyg och hotell."
  }
]
  },
  "manchester-united": {
    name: "Manchester United",
    stadiumName: "Old Trafford",
    logo: "/logos/manchester-united.png",
    stadiumDescription: "Old Trafford, med smeknamnet 'The Theatre of Dreams', har varit Manchester Uniteds hem sedan 1910. Med en kapacitet på 74 310 åskådare är det den överlägset största klubbarenan i England. Arenan fullkomligt osar av fotbollshistoria – från Sir Bobby Charlton Stand till den världsberömda kortsidan Stretford End (West Stand), där klubbens mest fanatiska supportrar skapar en enorm ljudkuliss. Utanför arenan möts besökare av statyn 'The United Trinity' (Best, Law och Charlton) samt Sir Alex Ferguson-statyn. Trots att arenan har ett stort renoveringsbehov och planer på en helt ny framtida superarena diskuteras, är den råa, klassiska engelska fotbollsatmosfären här helt unik och något som måste upplevas på plats.",
    location: "Manchester, England",
    league: "Premier League",
    aboutTickets: "Jämför biljetter till Manchester United på Old Trafford. Säkra din plats på drömmarnas teater och upplev den mäktiga stämningen i den engelska fotbollens hjärta.",
    heroImage: "/stadiums/old-trafford.jpg",
    contentImage: "https://images.unsplash.com/photo-1510563800743-aed2364902cb?q=80&w=600&auto=format&fit=crop", // Klassisk läktare/stadion
    stadiumLayoutImage: "/stadiums/old-trafford.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2375.3129596489387!2d-2.293902323267597!3d53.46305886623668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bae72e7e47f69%3A0x6c930e96df4455fe!2sOld%20Trafford!5e0!3m2!1ssv!2sse!4v1710000000001!5m2!1ssv!2sse",
    howToBuy: "Att köpa biljetter via Manchester Uniteds egna kanaler kräver officiellt medlemskap (Official Membership, ca £35–£40/år) och biljetter till stormatcher lottas ut månader i förväg. För internationella besökare är det betydligt smidigare och tryggare att köpa via verifierade återförsäljare och partners på biljetterfotboll.se (som P1 Travel, Ticombo och Sports Events 365). Där garanteras giltiga matchbiljetter och hospitality-paket helt utan krav på medlemskap.",
    sectionsAndPrices: "Arenan är indelad i fyra huvudläktare: Sir Alex Ferguson Stand (North), Sir Bobby Charlton Stand (South), Stretford End (West) och East Stand. Kortsidan East Stand är ofta det mest prisvärda alternativet, och det är även här bortafansen har en liten sektion. Sir Alex Ferguson Stand är den största läktaren i tre etage som ger en spektakulär panoramavy men kan kännas lite långt ifrån om du hamnar högst upp (Tier 3). Priserna skjuter i höjden för stormatcher, medan tidiga cupmatcher eller matcher mot bottenlag ofta erbjuder mycket bra priser på långsidorna.",
    packages: "Ett fotbollspaket till Manchester United är det absolut bekvämaste sättet att resa. Paketen innehåller en officiell matchbiljett (ofta placerad på Quadrant-sektionerna på North-West eller North-East, vilket ger utmärkt sikt diagonal över planen) kombinerat med hotellboende. Du kan välja hotell i centrala Manchester (runt Piccadilly eller Deansgate för ett aktivt nattliv) eller nära Salford Quays/MediaCityUK om du vill ha gångavstånd till arenan och slippa trängseln på spårvagnarna efter slutsignal.",
    history: "Klubben bildades ursprungligen 1878 under namnet Newton Heath LYR FC av järnvägsarbetare. Efter att ha varit nära konkurs räddades klubben 1902 av lokala affärsmän som ändrade namnet till Manchester United. Klubbens moderna historia är starkt präglad av två legendariska tränare. Först Sir Matt Busby, som byggde upp det unga, fantastiska laget 'Busby Babes' som tragiskt drabbades av flygkatastrofen i München 1958 där 8 spelare omkom. Busby överlevde och byggde ett nytt lag som vann Europacupen 10 år senare (1968). Den andra guldåldern leddes av Sir Alex Ferguson (1986–2013), som gjorde klubben till världens största med 13 Premier League-titlar och den historiska 'The Treble' (Ligan, FA-cupen och Champions League) 1999.",
    faqs: [
     {
        question: "Behöver jag ett officiellt medlemskap för att köpa biljetter till Old Trafford?",
        answer: "Nej, när du jämför och bokar via verifierade partners på biljetterfotboll.se ingår officiella hospitality- eller resebiljetter där klubbmedlemskap inte krävs."
      },
      {
        question: "Hur tar man sig enklast till Old Trafford?",
        answer: "Det enklaste sättet är att ta spårvagnen (Metrolink) från centrala Manchester (Piccadilly eller Victoria) direkt till hållplatsen Old Trafford eller Wharfside, följt av en kort promenad på 5–10 minuter."
      },
      {
        question: "Vad kostar en fotbollsresa till Manchester United totalt?",
        answer: "En komplett fotbollsresa till Manchester United brukar kosta mellan 4 000 SEK och 8 500 SEK per person, beroende på motståndare, läktarplats och flygpriser."
      },
      {
        question: "Hur levereras biljetterna till matchen?",
        answer: "De flesta biljetter levereras som digitala e-biljetter eller NFC-biljetter till din smartphone 1–3 dagar innan matchdag."
      }
    ]
  },
  "liverpool": {
    name: "Liverpool FC",
    stadiumName: "Anfield",
    logo: "/logos/liverpool.png",
    stadiumDescription: "Anfield är en av fotbollsvärldens mest mytomspunna och ikoniska platser, belägen i stadsdelen Anfield i norra Liverpool. Efter de senaste årens massiva utbyggnader av det gigantiska Main Stand och det nyligen färdigställda Anfield Road End, har arenan nu en kapacitet på över 61 200 åskådare. Trots moderniseringen har arenan lyckats behålla sin själ. Hjärtat av arenan är utan tvekan 'The Kop', den enorma kortsidan där klubbens mest röststarka fans står och skapar den legendariska ljudvägg som fått många motståndarlag att darra. Att stå eller sitta på Anfield när hela arenan sträcker upp sina halsdukar och sjunger 'You'll Never Walk Alone' precis innan domaren blåser igång matchen är en gåshudsframkallande upplevelse som rankas högt på alla sportälskares 'bucket list'.",
    location: "Liverpool, England",
    league: "Premier League",
    aboutTickets: "Jämför biljetter och hotellpaket till Liverpool FC på Anfield. Biljettpriserna varierar från ca 1 200 SEK upp till 4 500 SEK beroende på matchens karaktär och loungepaketeval.",
    heroImage: "/stadiums/anfield-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1556056504-51717367a80c?q=80&w=600&auto=format&fit=crop", // Match/stadion
    stadiumLayoutImage: "/stadiums/anfield-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2377.12353110292!2d-2.9634283232692257!3d53.43082936865611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b216f7dddb69b%3A0x6b448f760da62fef!2sAnfield!5e0!3m2!1ssv!2sse!4v1710000000002!5m2!1ssv!2sse",
    howToBuy: "Biljetter till Anfield hör till de svåraste att köpa på egen hand. Klubbens egna släpp kräver medlemskap och poäng från tidigare matcher. Den säkraste och smidigaste vägen för svenska fans är att jämföra priser på biljetterfotboll.se från auktoriserade partners som P1 Travel och Ticombo för att boka garanterade hospitality-biljetter helt utan krav på medlemskap. Att köpa svart utanför arenan är förenat med enorm risk då Liverpool använder strikt digitala NFC-biljetter som är låsta till telefoner.",  
    sectionsAndPrices: "Arenan är uppdelad i The Kop (kortsidan med bäst stämning), Main Stand (det enorma nya långsidoetaget med fantastiska faciliteter), Sir Kenny Dalglish Stand (motsvarande långsida, klassisk och nära planen) samt Anfield Road End (kortsidan där även bortafansen huserar). Priserna på Anfield är generellt högre än på många andra engelska arenor på grund av den extrema efterfrågan. Platser högt upp på Main Stand ger en otrolig vy över staden men kan kännas avlägsna, medan platser på Sir Kenny Dalglish Stand sätter dig mitt i händelsernas centrum.",
    packages: "Ett typiskt Liverpool-paket innehåller 2 nätters hotellboende i centrala Liverpool (t.ex. runt Albert Dock eller Lime Street Station) samt en officiell matchbiljett. Biljetterna är oftast placerade på det nya, moderna Main Stand (t.ex. sektion L11/L12) eller Anfield Road End, och inkluderar ofta tillgång till en lounge (antingen på arenan eller på en närliggande legendarisk mötesplats som The Sandon) där det bjuds på mat och dryck innan match. Det är den perfekta kombinationen för en trygg och oförglömlig fotbollshelg.",
    history: "Liverpool FC bildades 1892 efter en numera historisk intern fejd. Affärsmannen John Houlding, som ägde Anfield, hamnade i en hyrestvist med Everton FC (som då spelade på Anfield). Everton packade sina väskor och flyttade till Goodison Park, varpå Houlding stod med en tom arena och inget lag. Han startade då Liverpool FC som kom att bli en av världens mest framgångsrika klubbar. Under ledning av Bill Shankly på 1960-talet transformerades klubben från ett division 2-lag till en europeisk stormakt och skapade 'The Boot Room'-kulturen. Klubben dominerade totalt under 70- och 80-talet under Bob Paisley och Kenny Dalglish, och har i modern tid återvänt till den absoluta världstoppen under Jürgen Klopps karismatiska ledarskap.",
    faqs: [
     {
        question: "När levereras biljetterna till Anfield och hur fungerar de?",
        answer: "Liverpool FC använder 100 % digitala NFC-biljetter. Du får en personlig länk via e-post från din leverantör 2–4 dagar före match och laddar ner den direkt till Apple Wallet eller Google Wallet."
      },
      {
        question: "Behöver man medlemskap för att köpa paket via er?",
        answer: "Nej, de återförsäljare och paketleverantörer vi jämför säljer officiella hospitality- och resebiljetter där klubbmedlemskap inte krävs."
      },
      {
        question: "Hur tar man sig från centrala Liverpool till Anfield?",
        answer: "Enklast tar du dig till Anfield med Soccerbus från Sandhills Station, direktbuss 917 från St Johns Lane, eller med en taxi på ca 10–15 minuter från Lime Street Station."
      },
      {
        question: "Vad ingår i ett hospitality-paket på Anfield?",
        answer: "Utöver vadderade platser på Main Stand eller Anfield Road End ingår vanligtvis tillgång till en exklusiv lounge, gratis matchprogram och servering av mat eller dryck innan avspark."
      }
    ]
  },
  "chelsea": {
    name: "Chelsea FC",
    stadiumName: "Stamford Bridge",
    logo: "/logos/chelsea.png",
    stadiumDescription: "Stamford Bridge ligger vackert inbäddat i de välbärgade och exklusiva stadsdelarna Fulham och Chelsea i sydvästra London. Arenan öppnade redan 1905 och har en kapacitet på 40 341 åskådare. Till skillnad från många av de nybyggda jättearenorna i London är 'The Bridge' en mycket kompakt och intim fotbollsarena. Läktarna är byggda tätt inpå sidlinjerna vilket ger en fantastisk närhetskänsla till planen oavsett var du sitter. Arenans hjärta och stämningsnav är kortsidan Matthew Harding Stand (North Stand) och den historiska The Shed End (South Stand). Trots att arenan är mindre än konkurrenternas, gör det exklusiva läget i London och den intensiva atmosfären ett besök här till en riktigt klassisk engelsk fotbollsupplevelse.",
    location: "London, England",
    league: "Premier League",
    aboutTickets: "Jämför biljetter och matchpaket till Chelsea FC på Stamford Bridge. Priserna för Premier League-matcher ligger vanligtvis från ca 1 000 SEK till 3 800 SEK per biljett.",
    heroImage: "/stadiums/stamford-bridge-hero.jpg", 
    contentImage: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=600&auto=format&fit=crop", // Fotbollsplan/gräs
    stadiumLayoutImage: "/stadiums/stamford-bridge-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.3783777553335!2d-0.1936173233797677!3d51.48166667180479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760fa619bf1993%3A0x89db7a72da7793e5!2sStamford%20Bridge!5e0!3m2!1ssv!2sse!4v1710000000003!5m2!1ssv!2sse",
    howToBuy: "På grund av arenans begränsade kapacitet säljer i stort sett alla Premier League-matcher slut direkt till Chelseas egna medlemmar. Det är därför extremt svårt att köpa lösa biljetter på egen hand utan ett medlemskap. Den säkraste och smidigaste vägen är att boka via auktoriserade researrangörer som säljer officiella hospitality-biljetter. Dessa biljetter inkluderar officiell sittplats på West Stand eller East Stand och ger dig dessutom inträde till en lounge (t.ex. Tea Bar eller Captains Bar) före matchen med dryck, matchprogram och mat inkluderat, helt utan dolda medlemskrav.",
    sectionsAndPrices: "Stamford Bridge har fyra huvudläktare: West Stand (modern och lyxig långsida), East Stand (arenans äldsta läktare med familjesektioner), Matthew Harding Stand (där hemmasupportrarna sjunger mest) och Shed End (kortsidan där bortafansen sitter på ena halvan). Priserna är generellt höga, i linje med Londons prisnivåer, och stiger rejält under London-derbyn mot Arsenal och Tottenham eller vid matcher mot de övriga topplagen. Platser på West Stand Upper erbjuder fantastisk sikt över båda lagens bänkar och taktik.",
    packages: "Att boka ett Chelsea-paket är perfekt för en weekendresa till London. Paketen inkluderar en garanterad matchbiljett (ofta placerad på West Stand Middle/Upper eller East Stand) tillsammans med hotellboende. Du kan med fördel välja ett hotell i områdena Kensington, Earl's Court eller Fulham för att ha korta resvägar med tunnelbanan till matchen, samtidigt som du har hela centrala Londons utbud av shopping, restauranger och sevärdheter bara 15 minuter bort.",
    history: "Chelsea FC bildades 1905 på puben The Rising Sun mitt emot Stamford Bridge. Klubben vann sin första ligatitel 1955, men klev in i den absoluta världseliten på 2000-talet då klubben vann flera Premier League-titlar och två Champions League-titlar (2012 och 2021).",
    faqs: [
      {
        question: "Krävs det medlemskap för att se Chelsea på Stamford Bridge?",
        answer: "Nej, om du bokar officiella hospitality-paket via leverantörerna på biljetterfotboll.se behöver du inget klubbmedlemskap."
      },
      {
        question: "Hur tar man sig till Stamford Bridge?",
        answer: "Enklast tar du dig hit via Londons tunnelbana (District Line) till stationen Fulham Broadway, som ligger bara några minuters promenad från arenan."
      },
      {
        question: "Vad är Westview på Stamford Bridge?",
        answer: "Westview är en nyligen renoverad premiumsektion på West Stand Upper som erbjuder bekväma vadderade stolar, panoramautsikt över London samt tillgång till mat- och ölbarer."
      },
      {
        question: "Vad kostar en fotbollsresa till Chelsea?",
        answer: "En komplett resa med hotell och biljett landar oftast mellan 4 500 SEK och 8 500 SEK per person."
      }
    ]
  },
  "tottenham": {
    name: "Tottenham Hotspur",
    stadiumName: "Tottenham Hotspur Stadium",
    logo: "/logos/tottenham.png",
    stadiumDescription: "Tottenham Hotspur Stadium slog upp portarna 2019 på samma historiska plats som gamla White Hart Lane i norra London. Med en kapacitet på 62 850 åskådare är det en av världens mest teknologiskt avancerade och lyxiga arenor. Arenan har en helt infällbar gräsmatta (under vilken det ligger en NFL-plan i konstgräs), en enorm 360-graders concourse och ett eget mikrobryggeri som pumpar ut öl underifrån glaset på sekunder. Det arkitektoniska utropstecknet är 'The South Stand' – en gigantisk, brant kortsida i ett enda etage med 17 500 platser, inspirerad av Dortmunds 'Gula vägg'. Ljudvolymen som genereras från denna läktare under stormatcher är fullständigt öronbedövande och erbjuder en modern arenas absolut bästa atmosfär.",
    location: "London, England",
    league: "Premier League",
    aboutTickets: "Jämför biljetter och hospitality-paket till Tottenham Hotspur i London. Biljettpriserna ligger oftast från ca 950 SEK till 3 200 SEK beroende på sektion och motstånd.",
    heroImage: "/stadiums/tottenham-hotspur-stadium-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop", // Strålkastarljus/arena
    stadiumLayoutImage: "/stadiums/tottenham-hotspur-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2476.3268427928236!2d-0.06899722337345595!3d51.60428617183492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761e1b8577114b%3A0x7d6360bf008f5d02!2sTottenham%20Hotspur%20Stadium!5e0!3m2!1ssv!2sse!4v1710000000004!5m2!1ssv!2sse",
    howToBuy: "Ordinarie biljetter direkt från Tottenham släpps först till OneHotspur-medlemmar. För att garantera platser utan medlemskap kan du jämföra auktoriserade partners på biljetterfotboll.se. Här finns officiella Travel Club-paket med garanterade platser på långsida, matkuponger och tillgång till Premium Lounges.",
    sectionsAndPrices: "Arenan är uppdelad i North, South, East och West Stand. Platser på South Stand är fantastiska för att uppleva stämningen på nära håll. Östra och västra långsidorna erbjuder premiumplatser med enastående komfort och sikt. Priserna varierar beroende på motstånd men tack vare arenans storlek finns det ofta ett bra utbud av biljetter till rimliga priser för matcher utanför toppskiktet. Det övre etaget (Tier 5) ger en otrolig överblick över hela arenan och spelet men ligger väldigt högt upp.",
    packages: "Ett matchpaket till Tottenham Hotspur är en fantastisk helhetsupplevelse tack vare den extremt höga standarden på arenans faciliteter. Paketen inkluderar officiella matchbiljetter (ofta i block 200-300 på långsidan med lounge-tillgång) samt hotellboende. Eftersom arenan ligger en bit norrut i London, är det mycket smidigt att bo på ett hotell nära Liverpool Street Station eller King's Cross. Därifrån tar du dig snabbt och enkelt med tåg direkt upp till arenan på matchdagen och har samtidigt bästa tänkbara utgångsläge för resten av din London-vistelse.",
    history: "Tottenham Hotspur grundades 1882 av ett gäng lokala skolpojkar från en cricketklubb och namngavs efter den historiske riddaren Harry Hotspur. Klubben blev historisk 1901 när de som första och enda lag utanför det officiella ligasystemet lyckades vinna FA-cupen. Under ledning av Bill Nicholson på 1950- och 60-talet upplevde klubben sin absoluta guldålder. De vann 'The Double' (ligan och FA-cupen samma år) 1961 och blev 1963 den första brittiska klubben någonsin att vinna en stor europeisk titel (Cupvinnarcupen). Klubben är känd för sin tradition av att spela attraktiv, offensiv fotboll under mottot 'Audere est Facere' (Att våga är att göra).",
    faqs: [
      {
        question: "Behöver jag ett OneHotspur-medlemskap för att boka här?",
        answer: "Nej, de Travel Club- och hospitality-paket vi jämför kräver inget medlemskap."
      },
      {
        question: "Hur tar man sig till Tottenham Hotspur Stadium?",
        answer: "Enklast är att ta Overground från Liverpool Street till White Hart Lane Station, eller Victoria Line till Tottenham Hale / Seven Sisters och gå sista biten."
      },
      {
        question: "Är Tottenham Hotspur Stadium en kontantfri arena?",
        answer: "Ja, hela arenan är 100 % kontantfri. Alla köp av mat, dryck och merchendise sker med kort eller mobilbetalning."
      },
      {
        question: "Vad kostar en fotbollsresa till Tottenham?",
        answer: "En paketresa med hotell och matchbiljett brukar landa på cirka 4 000 SEK till 8 000 SEK per person."
      }
    ]
  },
  "real-madrid": {
    name: "Real Madrid",
    stadiumName: "Santiago Bernabéu",
    logo: "/logos/real-madrid.png",
    stadiumDescription: "Santiago Bernabéu, beläget mitt i Madrids finansiella hjärta längs den pampiga avenyn Paseo de la Castellana, öppnade 1947 och har efter en nyligen avslutad miljardrenovering förvandlats till världens mest imponerande och futuristiska arena. Med ett nytt glänsande skal i stål, ett helt infällbart tak, en 360-graders jätteskärm under taket och en revolutionerande underjordisk grotta där gräsmattan kan rullas ner och förvaras i perfekta förhållanden, har arenan plats för över 84 000 åskådare. Läktarna är extremt branta vilket skapar en mäktig och skrämmande vägg av människor för motståndarlaget. Att sitta här under en avgörande Champions League-kväll under strålkastarna är en av fotbollsvärldens mest prestigefyllda och storslagna upplevelser.",
    location: "Madrid, Spanien",
    league: "La Liga",
    aboutTickets: "Hitta biljetter till Real Madrid och upplev världsstjärnorna live i den spanska huvudstaden. Jämför priser för La Liga och Champions League.",
    heroImage: "/stadiums/santiago-bernabéu-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/santiago-bernabéu-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.7176182390884!2d-3.69094772390506!3d40.45305405338167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e23705d39f%3A0xa87652e78bc5aa!2sEstadio%20Santiago%20Bernab%C3%A9u!5e0!3m2!1ssv!2sse!4v1710000000005!5m2!1ssv!2sse",
    howToBuy: "Att köpa biljetter direkt via Real Madrids officiella hemsida är känt för att vara krångligt. Allmänna biljettsläpp sker ofta så sent som 5–7 dagar före matchstart och säljer slut på sekunder till klubbens medlemmar (Socios) och 'Madridistas Premium'. Dessutom nekar det spanska betalsystemet ofta utländska kreditkort. Det absolut säkraste sättet att planera sin resa i god tid är att köpa via auktoriserade biljettförmedlare och sportresebyråer. De har garanterade kvoter av officiella biljetter (både standard- och hospitality-paket) som levereras digitalt som e-biljetter direkt till din e-post.",
    sectionsAndPrices: "Arenan är uppdelad i Lateral Oeste (långsida väst, där spelarbänkarna finns och som är dyrast), Lateral Este (långsida öst, bäst för TV-vy) samt Fondo Norte och Fondo Sur (kortsidorna). Varje sida har flera etage (Tribuna, Primer Anfiteatro, Segundo Anfiteatro, Tercer Anfiteatro och Cuarto Anfiteatro). Priserna är generellt mycket överkomliga för matcher mot mindre La Liga-lag på de övre etagen, men exploderar till astronomiska summor för 'El Clásico' mot Barcelona eller slutspelsmatcher i Champions League.",
    packages: "Ett fotbollspaket till Real Madrid kombinerar världsfotboll med en fantastisk storstadssemester. Paketen inkluderar en garanterad matchbiljett (ofta på Lateral Este eller kortsidorna) samt boende på hotell i centrala Madrid. Vi rekommenderar att välja ett hotell nära paradgatan Gran Vía eller runt Sol/Atocha. Därifrån tar du dig extremt enkelt med tunnelbanans linje 10 direkt till stationen 'Santiago Bernabéu' på matchdagen, och har samtidigt gångavstånd till Madrids världsberömda tapasbarer, museer och nattliv under resten av helgen.",
    history: "Real Madrid grundades 1902 och utsågs av FIFA till 1900-talets mest framgångsrika klubb. Klubbens moderna storhetstid inleddes på 1940-talet under den visionäre presidenten Santiago Bernabéu, som ritade upp planerna för arenan och började värva världens bästa spelare, däribland Alfredo Di Stéfano och Ferenc Puskás. Laget vann de fem första upplagorna av Europacupen (nuvarande Champions League) i rad mellan 1956 och 1960. Under tidigt 2000-tal skapade presidenten Florentino Pérez det berömda 'Galácticos'-konceptet genom att värva superstjärnor som Zidane, Ronaldo, Beckham och Figo – en tradition av att samla världens absolut största stjärnor i den helvita tröjan som klubben stolt förvaltar än idag.",
    faqs: [
      {
        question: "Hur fungerar de digitala biljetterna till Bernabéu?",
        answer: "Biljetterna levereras som mobilbiljetter i PDF-format eller som en länk till din smartphone. Du öppnar dokumentet i telefonen och skannar streckkoden/QR-koden direkt i de automatiska vändkorsen vid den port (Puerta) som står angiven på din biljett."
      },
      {
        question: "Krävs det medlemskap för att köpa biljetter till Real Madrid?",
        answer: "Nej, när du bokar via återförsäljarna som jämförs på biljetterfotboll.se krävs inget klubbmedlemskap."
      },
      {
        question: "Hur tar man sig till Santiago Bernabéu?",
        answer: "Det är mycket enkelt via Madrids tunnelbana (Linje 10) direkt till stationen 'Santiago Bernabéu' som ligger precis utanför arenan."
      },
      {
        question: "Vad kostar en fotbollsresa till Real Madrid totalt?",
        answer: "En paketresa med hotell och matchbiljett brukar kosta från cirka 3 800 SEK till 8 000 SEK per person beroende på motståndare och säsong."
      }
    ]
  },

  "barcelona": {
    name: "FC Barcelona",
    stadiumName: "Spotify Camp Nou",
    logo: "/logos/barcelona.png",
    stadiumDescription: "Spotify Camp Nou genomgår just nu en av fotbollshistoriens mest omfattande och storslagna ombyggnationer för det helt nya 'Espai Barça'-projektet. När arenan står helt klar kommer den att vara Europas absolut största och modernaste fotbollsarena med en kapacitet på hela 104 000 åskådare, helt skyddade under ett gigantiskt, nydesignat tak täckt av solpaneler. Läktarna behåller sin klassiska struktur i tre monumentala etage, vilket ger en helt makalös panoramavy över den enorma spelplanen. Att sitta på Camp Nou mitt i ett hav av rödblå halsdukar och höra 100 000 människor sjunga klubbhymnen 'Cant del Barça' är en fullkomligt magisk och gåshudsframkallande upplevelse som personifierar den katalanska stoltheten.",
    location: "Barcelona, Spanien",
    league: "La Liga",
    aboutTickets: "Säkra dina biljetter till FC Barcelona. Jämför priser för sittplatser på det mäktiga Camp Nou och upplev den katalanska fotbollsfesten.",
    heroImage: "/stadiums/camp-nou-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/camp-nou-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.673892794411!2d2.1202723239474934!3d41.38089944365313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a413d07e26d9%3A0xf658f844ca1ba3b!2sSpotify%20Camp%20Nou!5e0!3m2!1ssv!2sse!4v1710000000006!5m2!1ssv!2sse",
    howToBuy: "Biljetter till FC Barcelona säljs i stor utsträckning via klubbens egna kanaler, men till de absolut största matcherna (El Clásico mot Real Madrid, derbyt mot Espanyol eller avgörande Champions League-slutspel) är det i princip omöjligt för icke-medlemmar att få tag på biljetter då klubbens säsongskortsinnehavare lägger beslag på platserna. Genom att använda vår jämförelsetjänst hittar du officiella sportresebyråer och verifierade biljettpartners som har fasta, garanterade biljettkvoter tilldelade direkt från klubben. Det gör att du kan boka din resa månader i förväg med fullständig trygghet.",
    sectionsAndPrices: "Camp Nou är indelat i Tribuna (långsidan med spelartunnel och VIP-boxar, dyrast), Lateral (motsatta långsidan som ger perfekt TV-vy och är mycket populär), samt Gol Nord och Gol Sud (kortsidorna). Platser på första etage (Golgata/1a Grada) tar dig extremt nära planen men har låg vinkel, medan andra etage (2a Grada) allmänt anses ge arenans absolut bästa sikt. Tredje etage (3a Grada) är gigantiskt och ligger väldigt högt upp, vilket erbjuder billiga biljetter men kräver ett bra falköga för att följa bollen.",
    packages: "Kombinationen av sol, strand, fantastisk tapas, arkitektur och fotboll i absolut världsklass gör Barcelona till det ultimata resmålet för en fotbollsresa. Ett komplett paket inkluderar officiella matchbiljetter (där platser i par alltid garanteras) och hotellboende. Det är klokt att välja ett hotell nära tunnelbanelinjerna L3 eller L5 (t.ex. runt Sants, Eixample eller Diagonal). Då tar du dig blixtsnabbt till arenan på matchdagen via stationerna Les Corts eller Collblanc, och bor samtidigt perfekt till för att utforska Las Ramblas och stranden under resten av helgen.",
    history: "FC Barcelona grundades 1899 av den schweiziske affärsmannen Joan Gamper. Klubben utvecklades snabbt till en symbol för den katalanska identiteten och motståndet mot centralstyret i Madrid, vilket sammanfattas i det världsberömda mottot 'Més que un club' (Mer än en klubb). Klubben har en unik fotbollsfilosofi baserad på bollinnehav och teknisk briljans, en filosofi som lades grunden till av holländske legenden Johan Cruyff under hans tid som spelare och senare tränare för 'Dream Team' på 1990-talet. Denna skola nådde sin absoluta kulmen under Pep Guardiola och klubbens egna akademi La Masia, som fostrat ikoner som Xavi, Iniesta och framför allt Lionel Messi, allmänt ansedd som historiens bästa fotbollsspelare.",
    faqs: [
      {
        question: "Garanteras platser tillsammans om vi bokar flera biljetter?",
        answer: "Ja, de etablerade leverantörer vi listar på vår sajt garanterar alltid att ni får sitta tillsammans i par (två och två). Om ni är ett större sällskap som reser ihop kan ni i de flesta fall välja till en 'sällskapsgaranti' i kassan för att säkra tre eller fyra platser i rad."
      },
      {
        question: "Måste man vara medlem (Socio) för att boka biljetter?",
        answer: "Nej, återförsäljarna vi jämför säljer öppna biljetter och VIP-paket där medlemskap inte behövs."
      },
      {
        question: "Hur tar man sig lättast till Spotify Camp Nou?",
        answer: "Ta tunnelbanans Linje 3 (grön) till stationen Les Corts / Palau Reial eller Linje 5 (blå) till Collblanc."
      },
      {
        question: "När levereras biljetterna till matchen?",
        answer: "Biljetterna levereras som PDF- eller mobilbiljetter via e-post cirka 24–48 timmar före avspark."
      }
    ]
  },

  "atletico-madrid": {
    name: "Atlético Madrid",
    stadiumName: "Estadio Metropolitano",
    logo: "/logos/atletico-madrid.png",
    stadiumDescription: "Estadio Metropolitano (även känd som Riyadh Air Metropolitano), belägen i östra Madrid, slog upp portarna hösten 2017 och är en av Europas mest spektakulära och stämningsfulla arenor med plats för 70 460 åskådare. Arenan är byggd med fokus på akustik; dess unika, svävande och vågformade tak fungerar som en gigantisk ljudreflektor som fångar upp och förstärker supportrarnas sång. Det skapar en fullständigt elektrisk och kokande ljudkuliss som bäst upplevs på kortsidan Fondo Sur, där Atlético Madrids hängivna och passionerade ultras håller till. Utanför arenan finns den berömda 'Paseo de las Leyendas' (Legendernas aveny) där spelare som gjort över 100 matcher för klubben hedras med personliga plaketter, vilket sätter en tydlig historisk prägel på denna toppmoderna anläggning.",
    location: "Madrid, Spanien",
    league: "La Liga",
    aboutTickets: "Hitta prisvärda biljetter till Atlético Madrid. Upplev Diego Simeones passionerade lag live på den kokande hemmaborgen.",
    heroImage: "/stadiums/metropolitano-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/metropolitano-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.0028751508933!2d-3.6019556239053896!3d40.43588975376517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f2cb82915cb%3A0x6b13fa250320a27c!2sEstadio%20C%C3%ADvitas%20Metropolitano!5e0!3m2!1ssv!2sse!4v1710000000007!5m2!1ssv!2sse",
    howToBuy: "Biljetter till Atlético Madrids matcher är i allmänhet betydligt mer lättillgängliga och prisvärda än till grannklubben Real Madrid, med undantag för det glödheta Madrid-derbyt (El Derbi Madrileño) eller stormatcher i Champions League. Klubbens officiella biljettsläpp sker digitalt några veckor före match. För att garantera sina platser långt i förväg och säkra bra sittplatser bredvid varandra på långsidorna väljer de flesta svenskar att köpa via auktoriserade biljettförmedlare eller boka kompletta fotbollspaket där officiell matchbiljett och hotellövernattning ingår.",
    sectionsAndPrices: "Metropolitano har en mycket tydlig struktur uppdelad i Lateral Oeste (västra långsidan med VIP och bänkar), Lateral Este (östra långsidan, perfekt för sol och tv-vy), Fondo Norte och Fondo Sur (kortsidorna). Läktarna är uppdelade i tre etage (Grada Baja, Grada Media och Grada Alta). Priserna på kortsidorna och det översta etaget är mycket plånboksvänliga och perfekta för budgetresenären, medan Grada Media på långsidorna erbjuder den absolut bästa balansen mellan fantastisk sikt, komfort och närhet till spelet.",
    packages: "Ett fotbollspaket till Atlético Madrid är ett fantastiskt sätt att uppleva den genuina, passionerade spanska fotbollskulturen. Paketen inkluderar officiell matchbiljett och boende på ett bra, centralt hotell i Madrid. Eftersom Estadio Metropolitano ligger i de östra utkanterna av staden, är det smartast att bo kvar i Madrids centrum (t.ex. runt Atocha eller Retiro-parken). På matchdagen tar du helt enkelt tunnelbanans linje 7 (orange linje) som går direkt ut till stationen 'Estadio Metropolitano' som ligger precis utanför arenans entré – smidigare kan det inte bli.",
    history: "Klubben grundades 1903 under namnet Athletic Club Sucursal de Madrid av baskiska studenter bosatta i huvudstaden, som en filial till Athletic Bilbao. Klubben blev självständig 1907 och antog de karaktäristiska rödvitrandiga tröjorna, vilket gav dem smeknamnet 'Los Colchoneros' (Madrassmakarna), eftersom madrasser i Spanien på den tiden tillverkades i exakt det tyget. Atlético har historiskt varit folkets och arbetarklassens lag i Madrid, i skarp kontrast till Real Madrids kungliga status. Klubbens moderna historia är helt synonym med tränarikonen Diego 'Cholo' Simeone, som tog över 2011 och transformerade klubben till en defensiv maskin som lyckats bryta Real Madrids och Barcelonas dominans och vinna flera historiska La Liga-titlar samt nått flera Champions League-finaler.",
    faqs: [
      {
        question: "Hur tar man sig lättast till Estadio Metropolitano?",
        answer: "Det absolut smidigaste sättet är att ta tunnelbanans linje 7 (orange linje) och gå av vid stationen 'Estadio Metropolitano' som ligger direkt under arenans huvudentré. Det tar cirka 25–30 minuter från centrala Madrid."
      },
      {
        question: "När får jag mina e-biljetter levererade?",
        answer: "Biljetterna skickas som digitala e-biljetter (PDF/mobilbiljett) via e-post cirka 24–48 timmar före matchstart."
      },
      {
        question: "Krävs det medlemskap för att köpa biljetter till Atlético Madrid?",
        answer: "Nej, när du bokar via de godkända partneraktörerna på biljetterfotboll.se krävs inget medlemskap."
      }
    ]
  },
  "malmo-ff": {
    name: "Malmö FF",
    stadiumName: "Eleda Stadion",
    logo: "/logos/malmo-ff.png",
    stadiumDescription: "Eleda Stadion (även känd som Nya Stadion), belägen på det anrika Stadionområdet i Malmö, invigdes 2009 och är en av Nordens absolut främsta och mest stämningsfulla fotbollsarenor med en kapacitet på 22 500 åskådare vid allsvenska matcher (varav 18 000 sittplatser och 4 500 ståplatser). Arenan är en renodlad fotbollsarena utan löparbanor, vilket innebär att läktarna är byggda tätt inpå innerplanen för att maximera närhetskänslan. Det arkitektoniska och stämningsmässiga navet är den mäktiga 'Norra Läktaren' – en gigantisk ståplatssektion i två etage där Malmös hängivna supportrar skapar en kokande, sydeuropeisk atmosfär och spektakulära tifo-arrangemang som blivit kända över hela Europa under klubbens äventyr i Champions League och Europa League.",
    location: "Malmö, Sverige",
    league: "Allsvenskan",
    aboutTickets: "Köp biljetter till Sveriges mest framgångsrika klubb i modern tid. Se Malmö FF slåss om SM-guldet i Allsvenskan eller upplev magiska Europakvällar på Eleda Stadion.",
    heroImage: "/stadiums/eleda-stadion-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/eleda-stadion-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.735235546252!2d12.985449273413988!3d55.58434726410427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a15dc4a3b723%3A0x633519894e6dc637!2sEleda%20Stadion!5e0!3m2!1ssv!2sse!4v1710000000008!5m2!1ssv!2sse",
    howToBuy: "Till ordinarie allsvenska seriematcher säljs biljetter enkelt direkt via Malmö FF:s officiella biljettsystem (axs). Men till de glödheta Skånederbyna, guldmatcher eller vid de prestigefyllda matcherna i Europa League och Champions League blir arenan snabbt helt slutsåld till klubbens över 10 000 säsongskortsinnehavare och medlemmar. För supportrar som reser långväga och vill säkra sina sittplatser i god tid samlar vi säkra, verifierade paketlösningar och resealternativ som garanterar officiella sittplatser på långsidorna.",
    sectionsAndPrices: "Arenan är uppdelad i Norra Läktaren (hemmaståplats, bäst tryck och mest prisvärt), Södra Läktaren (sittplats samt en sektion för bortafans), Östra Läktaren och Västra Läktaren (långsidorna). Västra Läktaren rymmer VIP-boxar och spelargången och ligger högst i pris. För familjer är de sydvästra sektionerna på sittplats utmärkta val med bra sikt och en lugnare miljö. Priserna på Eleda Stadion är mycket rimliga i jämförelse med europeiska toppligor, vilket gör ett besök till en extremt prisvärd fotbollsupplevelse.",
    packages: "För supportrar som reser till Malmö utifrån landet eller från norra Sverige finns det mycket smidiga hotellpaket. Dessa paket inkluderar en garanterad, officiell sittplatsbiljett på långsidan (Östra eller Västra läktaren) kombinerat med en eller två nätters övernattning på ett högklassigt hotell i centrala Malmö (t.ex. runt Clarion Hotel Live eller vid Centralstationen). Det ger dig en perfekt fotbollshelg med chans att avnjuta Malmös rika restaurangliv och ta en smidig promenad eller buss ut till stadionområdet på matchdagen.",
    history: "Malmö Fotbollförening grundades 1910 och har under mer än ett sekel etablerat sig som Sveriges mest framgångsrika fotbollsklubb, med flest SM-guld och segrar i Svenska Cupen i historien. Klubben är dessutom historisk i hela Norden som den enda skandinaviska förening som lyckats nå en final i Europacupen för mästarlag (nuvarande Champions League), vilket skedde 1979 under ledning av den legendariske engelske tränaren Bob Houghton, där man dock föll med 1-0 mot Nottingham Forest på Olympiastadion i München. Under ledning av starka profiler som Eric Persson ('Hövdingen') lades grunden till den professionella vinnarkultur och den starka lokala förankring i staden som gör att MFF än idag dominerar svensk fotboll och regelbundet kvalificerar sig för de stora europeiska gruppspelen.",
    faqs: [
      {
        question: "Hur tar jag mig lättast till Eleda Stadion?",
        answer: "Stadion ligger centralt i Malmö. Du tar dig hit på under 10 minuter från Malmö Central eller Triangeln genom att ta stadsbuss linje 3 (mot Ringlinjen) eller linje 8 (mot Hyllie) och gå av vid hållplats 'Stadion'."
      },
      {
        question: "Vad gäller för biljetter till MFF:s Europamatcher?",
        answer: "Efterfrågan på Europamatcher är extremt hög. Medlemmar och årskortsinnehavare har förtur, så för tillresande rekommenderas att boka garanterade paket i god tid."
      }
    ]
  },

  "valencia": {
    name: "Valencia CF",
    stadiumName: "Mestalla",
    logo: "/logos/valencia.png",
    stadiumDescription: "Estadio de Mestalla, invigd redan 1923, är en av de mest ikoniska och historiska fotbollsarenorna i hela Europa. Arenan är världsberömd för sin unika och smått svindlande arkitektur med extremt branta läktare som reser sig nästan vertikalt mot den spanska himlen. Detta skapar en intim, nästan klaustrofobisk känsla för bortalaget och en enorm ljudkuliss när drygt 49 000 passionerade 'Che'-supportrar stämmer upp i sina kampsånger. Att sitta högt upp på Mestallas läktare ger en nästan flygande panoramavy över spelplanen och är en helt oförglömlig upplevelse för alla som älskar klassisk spansk fotbollskultur.",
    location: "Valencia, Spanien",
    league: "La Liga",
    aboutTickets: "Upplev den unika atmosfären på klassiska Mestalla. Jämför priser för officiella biljetter och paketresor till Valencia CF i La Liga.",
    heroImage: "/stadiums/mestalla-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/mestalla-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.799732731872!2d-0.3637372239337581!3d39.47453457161822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048995a9a4b3d%3A0xe543e49e917d4a2d!2sEstadio%20de%20Mestalla!5e0!3m2!1ssv!2sse!4v1710000000008!5m2!1ssv!2sse",
    howToBuy: "Att köpa lösbiljetter till Valencia CF via klubbens egen hemsida går i regel bra till ordinära ligamatcher, men till stormatcherna mot Real Madrid, Barcelona eller lokalderyt mot Levante blir det snabbt utsålt. Det säkraste och smidigaste sättet för svenska resenärer är att boka via auktoriserade biljettsajter och sportresebyråer. Då får du garanterade sittplatser i par och biljetterna levereras smidigt som e-biljetter direkt till din mobil innan avresa.",
    sectionsAndPrices: "Mestalla är uppdelad i Tribuna (huvudläktaren med tak och de dyraste VIP-platserna), Silla de Gol (platser bakom målen), och Grada Central (långsidan mittemot huvudläktaren). För bäst kombination av pris och utsikt rekommenderas platser på Grada Central. De branta etagen gör att man ser spelet fantastiskt väl oavsett var på långsidorna man sitter, medan kortsidorna erbjuder det lägsta priset och mest högljudda stödet.",
    packages: "Valencia är den perfekta destinationen för en fotbollshelg med kombinationen av medelhavssol, stränder, världskänd paella och fotboll i toppklass. Våra paket inkluderar matchbiljett och hotellboende mitt i centrala Valencia eller nära den vackra parken Turia. Från centrum promenerar du enkelt till Mestalla på 15–20 minuter eller tar tunnelbanan direkt till arenan.",
    history: "Valencia Club de Fútbol grundades 1919 på baren Bar Tortoni och utvecklades snabbt till en maktfaktor i spansk fotboll. Klubben nådde sin absoluta storhetstid under tidigt 2000-tal då man under tränaren Héctor Cúper nådde två raka Champions League-finaler (1999 och 2000), och därefter tog två La Liga-titlar samt en UEFA-cupseger under Rafa Benítez ledning. Med en stolt tradition av att fostra och forma superstjärnor som Mario Kempes, Gaizka Mendieta, David Villa och David Silva intar Valencia en permanent plats i den spanska fotbollsadeln.",
    faqs: [
      {
        question: "Hur tar man sig lättast till Mestalla?",
        answer: "Mestalla ligger extremt centralt i staden. Du tar enkelt tunnelbanans linje 3 eller 9 och går av vid stationen 'Aragón', som ligger precis utanför arenans entré."
      },
      {
        question: "Är läktarna på Mestalla verkligen så branta som det sägs?",
        answer: "Ja, de övre etagen på Mestalla hör till de brantaste i världen. Det ger en fantastisk sikt och mäktig känsla, men kan kännas lite svindlande om man är extremt höjdrädd."
      },
      {
        question: "När levereras biljetterna till matchen?",
        answer: "E-biljetterna skickas digitalt till din e-post senast 24–48 timmar innan matchstart."
      }
    ]
  },

  "inter": {
    name: "Inter Milan",
    stadiumName: "San Siro",
    logo: "/logos/inter.png",
    stadiumDescription: "Stadio Giuseppe Meazza, mer känd som San Siro, är en av fotbollsvärldens absoluta katedraler. Med sina karakteristiska betongtorn och det rödblanka fackverkstaket rymmer arenan över 75 000 åskådare. När Inter spelar hemma förvandlas kortsidan Curva Nord till ett hav av blåsvarta flaggor och tifo-arrangemang. Stämningen under storkamperna mot Juventus (Derby d'Italia) eller stadsrivalen AC Milan är elektrisk och visar italiensk supporterkultur från sin absolut bästa sida.",
    location: "Milano, Italien",
    league: "Serie A",
    aboutTickets: "Köp biljetter till Inter på San Siro. Jämför priser för Serie A och Champions League och upplev italiensk toppfotboll live.",
    heroImage: "/stadiums/giuseppe-meazza-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/giuseppe-meazza-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Biljetter till Inter kan köpas direkt via klubbens hemsida, men för stormatcher ställs ofta krav på klubbens fankort (Siamo Noi) eller så säljer det slut i medlemsfasen. Genom att jämföra verifierade biljettförmedlare och resebyråer på biljetterfotboll.se säkrar du giltiga biljetter utan krav på italienska medlemskort. Observera att alla biljetter i Italien är personliga, så korrekt namn och passuppgifter måste uppges vid bokning.",
    sectionsAndPrices: "San Siro är uppdelad i tre etage (Anelli). Primo Anello (1:a etaget) ger bäst närhet till spelarna och är dyrast, särskilt på långsidorna Rosso och Arancio. Secondo Anello (2:a etaget) anses av många ge den bästa överblicken över taktiken, medan Terzo Anello (3:e etaget) erbjuder mycket billiga biljetter högsta upp under taket. Inters ultras håller till på Curva Nord (Grön sektion).",
    packages: "En fotbollsresa till Milano kombinerar fotboll i världsklass med mode, kultur och fantastisk italiensk mat. Genom att boka ett komplett paket får du garanterad matchbiljett och hotellboende i centrala Milano. Från centrala lägen som Duomo eller Stazione Centrale tar du dig enkelt med tunnelbanan direkt till arenan på matchdagen.",
    history: "FC Internazionale Milano grundades 1908 av en utbrytargrupp från AC Milan som ville tillåta utländska spelare i laget, vilket gav upphov till namnet 'Internazionale'. Klubben har en stolt historia och är den enda italienska klubb som aldrig åkt ur Serie A. Klubbens mest framgångsrika epoker inkluderar 'Grande Inter' under Helenio Herrera på 1960-talet samt den historiska Trippeln (Serie A, Coppa Italia och Champions League) under José Mourinho 2010.",
    faqs: [
      {
        question: "Behöver jag visa ID/pass vid entrén till San Siro?",
        answer: "Ja, italiensk lag kräver att alla matchbiljetter är personliga. Namnet på biljetten måste stämma exakt överens med det fysiska passet eller det nationella ID-kortet du visar upp i spärrarna."
      },
      {
        question: "Hur tar man sig smidigast till San Siro?",
        answer: "Ta tunnelbanans lila linje (M5) direkt till slutstationen 'San Siro Stadio'. Du kliver ut precis utanför entréspärrarna."
      },
      {
        question: "Vad är skillnaden på San Siro och Giuseppe Meazza?",
        answer: "Det är exakt samma arena. Giuseppe Meazza är det officiella namnet (döpt efter den legendariska spelaren som representerade både Inter och Milan), medan San Siro är det stadsdelsnamn som arenan i folkmun alltid kallas."
      }
    ]
  },

  "milan": {
    name: "AC Milan",
    stadiumName: "San Siro",
    logo: "/logos/milan.png",
    stadiumDescription: "San Siro är AC Milans stolta hemmaarena och en av fotbollens mest mytomspunna platser. Med sin enorma kapacitet och brutala betongarkitektur skapar den en elektrisk inramning när de rödsvarta 'Rossoneri' kliver ut på planen. Under hemmamatcherna förvandlas den södra kortsidan, Curva Sud, till ett hav av flaggor, pyroteknik och passionerade läktarsånger. Att uppleva en kvällsmatch här när 'Milan, Milan'-hymnen dånar ur högtalarna är en ren magisk upplevelse för varje fotbollsälskare.",
    location: "Milano, Italien",
    league: "Serie A",
    aboutTickets: "Säkra biljetter till AC Milan på San Siro. Jämför priser på officiella biljetter och paketresor till italienska ligamatcher och Champions League.",
    heroImage: "/stadiums/san-siro-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/san-siro-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Biljetter säljs via Milans officiella sajt, men populära matcher blir snabbt slutsålda eller kräver klubbens medlemskort (Cuore Rossonero). För att säkra dina platser i god tid utan krångel rekommenderas att köpa via de verifierade partneraktörerna på biljetterfotboll.se. Alla biljetter är personliga enligt italiensk lagstiftning, så kom ihåg att uppge korrekta namnuppgifter vid bokningen.",
    sectionsAndPrices: "Sittplatserna är indelade i färgglada zoner: Rosso (västra långsidan, dyrast och bäst sikt), Arancio (östra långsidan, mycket bra sikt), Blu (Curva Sud, Milans ultras) och Verde (Curva Nord, oftast bortasektion). Förstaelaget (Primo Anello) ger bäst närhet, medan andra etaget (Secondo Anello) ger fantastisk överblicksvy över hela planen till ett bra pris.",
    packages: "Boka ett fotbollspaket med officiell matchbiljett och hotell i Milano för den perfekta helgresan. Kombinera storkampsfotboll med shopping i Galleria Vittorio Emanuele II, besök vid katedralen Duomo och god mat. Tunnelbanan gör det busenkelt att ta sig mellan hotellet i centrum och San Siro på matchdagen.",
    history: "AC Milan grundades 1899 av engelsmannen Herbert Kilpin och är en av världens mest framgångsrika klubbar genom tiderna med hela 7 Champions League/Europacup-titlar. Klubben dominerade europeisk fotboll under skedet med den svenskäda 'Gre-No-Li'-trion (Grenn, Nordahl, Liedholm) på 1950-talet och Arrigo Sacchis revolutionerande superlag i slutet av 1980-talet med holländarna Van Basten, Gullit och Rijkaard.",
    faqs: [
      {
        question: "Behöver jag ID för att gå på match?",
        answer: "Ja, i Italien krävs giltig fysisk ID-handling (pass eller nationellt ID-kort) för att komma in på arenan, då namnet kontrolleras mot biljetten."
      },
      {
        question: "Hur tar jag mig till San Siro?",
        answer: "Smidigast är att ta tunnelbanans lila linje M5 till slutstationen 'San Siro Stadio' eller spårvagn linje 16 från Duomo."
      },
      {
        question: "Var sitter Milans mest högljudda supportrar?",
        answer: "Milans ultras håller till på Curva Sud (blå sektion på den södra kortsidan)."
      }
    ]
  },
  "manchester-city": {
    name: "Manchester City",
    stadiumName: "Etihad Stadium",
    logo: "/logos/manchester-city.png",
    stadiumDescription: "Etihad Stadium (ursprungligen City of Manchester Stadium) byggdes inför Commonwealth Games 2002 och förvandlades därefter till en ultramodern, toppmodern fotbollsarena. Med en kapacitet på över 53 000 åskådare kombinerar arenan fantastisk sikt från samtliga sektioner med en högklassig komfort. Den imponerande arkitekturen med sina skålade läktare och öppna hörn gör Etihad till en spektakulär kuliss för Pep Guardiolas tekniska och dominerande fotboll, där stämningen på t.ex. South Stand driver laget framåt under de stora Premier League- och Champions League-kvällarna.",
    location: "Manchester, England",
    league: "Premier League",
    aboutTickets: "Manchester City har en av Premier Leagues mest eftertraktade arenor. Jämför priser för officiella biljetter och hospitality-paket för att se världsstjärnorna live på Etihad Stadium.",
    heroImage: "/stadiums/etihad-stadium-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/etihad-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.455648756024!2d-2.202868284157143!3d53.48316397998651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb0814f61f7e3%3A0x6b4f74d02330a8c!2sEtihad%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Att få tag på lösbiljetter direkt via Citys officiella hemsida kräver oftast ett betalt 'Matchday Membership', och biljetterna till toppmatcher mot Liverpool, Arsenal och Manchester United säljer slut på sekunder. För svenska supportrar som vill boka i god tid är det smidigast att köpa auktoriserade biljetter eller s.k. Officiella Premium/Matchday VIP-paket via biljetterfotboll.se. Då ingår garanterad sittplats på långsidan samt tillgång till lounger och mat dryck innan avspark.",
    sectionsAndPrices: "Arenan är uppdelad i Colin Bell Stand (Västra långsidan med avbytarbänkar och spelargång), East Stand (Östra långsidan med fantastisk överblick), South Stand (kortsidan där hemmalagets mest högljudda supportrar samlas samt bortaflocken) och Family Stand (Norra kortsidan). Priserna varierar kraftigt beroende på motståndare (kategori A-C), där platser högt upp på kortsidorna erbjuder de mest prisvärda alternativen medan långsidan på Level 2 ger maximal komfort.",
    packages: "Skräddarsy din fotbollshelg i Manchester med vårt utbud av prisvärda matchpaket. I paketen ingår garanterad officiell matchbiljett och boende på 3- eller 4-stjärniga hotell i centrala Manchester (t.ex. nära Piccadilly Station eller Deansgate). Det ger dig det bästa av två världar – fotboll i absolut världsklass kombinerat med Manchesters berömda musikscen, pubkultur och shopping.",
    history: "Manchester City grundades 1880 som St. Mark's (West Gorton) och blev Manchester City 1894. Klubben spelade under många decennier på den legendariska arenan Maine Road. Efter en bergochdalbana i ligasystemet under 1990- och 2000-talen inleddes en helt ny era 2008. Sedan dess har City växt till en global supermakt och dominerat engelsk fotboll totalt, krönt med den historiska Trippeln (Premier League, FA-cupen och Champions League) säsongen 2022/23.",
    faqs: [
      {
        question: "Hur tar man sig lättast till Etihad Stadium?",
        answer: "Det absolut smidigaste sättet är att ta Metrolink-spårvagnen från Manchester Piccadilly station direkt till hållplatsen 'Etihad Campus'. Resan tar bara cirka 8 minuter. Det går även utmärkt att gå till fots från centrum via den skyltade 'Citylink Walk' på cirka 25–30 minuter."
      },
      {
        question: "Behöver jag medlemskap för att köpa biljetter via er?",
        answer: "Nej, när du bokar via våra verifierade partneraktörer och resebyråer krävs inget medlemskap i Manchester City. Du får officiella, garanterade e-biljetter."
      },
      {
        question: "Vad innebär ett Matchday Hospitality-paket?",
        answer: "Det innebär att du utöver din vadderade sittplats på långsidan får tillgång till en exklusiv stadionlounge före och efter match, där det ofta ingår mat, dryck, matchprogram och uppvärmning inför matchen."
      }
    ]
  },

  "newcastle": {
    name: "Newcastle United",
    stadiumName: "St. James' Park",
    logo: "/logos/newcastle.png",
    stadiumDescription: "St. James' Park är en av fotbollsvärldens mest imponerande och spektakulära katedraler. Med sin asymmetriska silhuett och enorma läktarsektioner tonar arenan upp sig som ett landmärke mitt i centrala Newcastle. Kapaciteten på över 52 000 åskådare nyttjas till sista plats, där den svartvita skaran ('Geordies') skapar en av de mest passionerade, högljudda och elektriska atmosfärerna i hela Premier League. När arenan stämmer upp i 'Local Hero' inför avspark är gåshuden ett faktum.",
    location: "Newcastle upon Tyne, England",
    league: "Premier League",
    aboutTickets: "Efterfrågan på biljetter till St. James' Park är extremt hög. Jämför officiella biljetter och paketresor till Newcastle Uniteds alla hemmamatcher.",
    heroImage: "/stadiums/st-james-park-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/st-james-park-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2277.685324546875!2d-1.6234394841285!3d54.975586680335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e70b8c66e4a2d%3A0x1d5821034f5a2b1!2sSt%20James'%20Park!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Att köpa biljetter direkt via Newcastle United är nästan omöjligt för icke-medlemmar, då nästan alla matcher säljer slut direkt via klubbens lottningssystem. För svenska resenärer är den absolut säkraste vägen att boka officiella matchpaket eller garanterade biljetter via auktoriserade biljettsajter. Biljetterna levereras tryggt som mobila e-biljetter direkt till din smartphone i god tid innan matchdag.",
    sectionsAndPrices: "Arenan bestående av fyra huvudläktare: Milburn Stand (huvudläktaren med loger och pressrum), Leazes End (den gigantiska norra läktaren), East Stand och den legendariska kortsidan Gallowgate End. Milburn Stand och Leazes End reser sig enormt högt och platser högst upp på 'Leazes Upper' erbjuder en mäktig utsikt över hela staden, medan Gallowgate End står för det mest intensiva supporterstödet.",
    packages: "Newcastle är vida känt som en av Storbritanniens absolut bästa städer för en helgresa. Våra paket inkluderar garanterad matchbiljett på St. James' Park kombinerat med hotellövernattning på utvalda hotell i centrum. Upplev det legendariska utelivet, pubarna runt Quayside och den genuina fotbollskulturen där hela staden andas svartvitt på matchdagar.",
    history: "Newcastle United bildades 1892 genom en sammanslagning av Newcastle East End och Newcastle West End. Klubben har en stolt historia med fyra ligatitlar och sex FA-cupguld, samt legendariska eror under tränare som Kevin Keegan ('The Entertainers' på 90-talet) och ikoner som tidernas meste målskytt i Premier League, Alan Shearer. Med nya ägare och en stark sportslig satsning är 'The Magpies' återigen med och utmanar den absoluta eliten.",
    faqs: [
      {
        question: "Var ligger St. James' Park i förhållande till centrum?",
        answer: "Arenan har ett unikt läge mitt i stadskärnan. Du promenerar hit på bara 5–10 minuter från både centralstationen (Newcastle Central Station) och shoppingstråket på Northumberland Street."
      },
      {
        question: "Vad är s.k. 'Geordie hospitality'?",
        answer: "Det är Newcastles officiella VIP- och loungepaket på stadion där du njuter av god mat och dryck med lokal nordengelsk gästfrihet innan du kliver ut till dina premiumplatser."
      },
      {
        question: "Hur säljs biljetterna bäst för tillresande svenskar?",
        answer: "Eftersom ordinära biljetter kräver medlemskap och lottning rekommenderas starkt att boka ett färdigt hotell- och biljettpaket via våra verifierade återförsäljare."
      }
    ]
  },

  "leeds": {
    name: "Leeds United",
    stadiumName: "Elland Road",
    logo: "/logos/leeds.png",
    stadiumDescription: "Elland Road är en äkta, orörd och rå engelsk fotbollsborg. Arenan, som har varit Leeds Uniteds hem sedan klubbens grundande 1919, rymmer drygt 37 000 åskådare. Läktarna är byggda nära planen vilket skapar en intensiv och genuint elektrisk stämning där ljudvolymen ofta når bedövande nivåer. Att höra hela stadion stämma upp i klubbhymnen 'Marching On Together' är en klassisk upplevelse som alla fotbollsentusiaster bör få uppleva på plats.",
    location: "Leeds, England",
    league: "Premier League",
    aboutTickets: "Jämför priser för biljetter och paketresor till Elland Road. Upptäck stämningen hos en av Englands mest hängivna och lojala supporterskaror.",
    heroImage: "/stadiums/elland-road-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/elland-road-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.5412345678!2d-1.5714321!3d53.777823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c123456789!2sElland%20Road!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Med över 20 000 personer på väntelista för säsongskort är biljetttrycket på Elland Road enormt. Ordinära lösbiljetter släpps främst till klubbens medlemmar och säljer slut omedelbart. För att vara garanterad plats som tillresande supporter bör du boka officiella matchpaket (med biljett och hotell) eller auktoriserade hospitality-biljetter i god tid innan resan.",
    sectionsAndPrices: "Elland Road består av Don Revie Stand (Norra läktaren, känd som 'The Kop' där de mest högljudda supportrarna sitter), Jack Charlton Stand (Östra läktaren, stor och modern i två etage), Norman Hunter Stand (Södra läktaren, rymmer även bortasektionen) och John Charles Stand (Västra huvudläktaren). Prisvärda platser finns på kortsidorna medan Östra och Västra läktarna erbjuder bäst sikt över spelet.",
    packages: "Våra hotell- och matchpaket gör din resa till Yorkshire helt bekymmersfri. I paketen ingår officiell matchbiljett på Elland Road kombinerat med boende på centralt belägna hotell i Leeds. Staden erbjuder ett fantastiskt utbud av mikrobryggerier, historiska pubar, bra shopping och god mat – perfekt för en komplett fotbollshelg.",
    history: "Leeds United grundades 1919 efter upplösningen av Leeds City. Klubben nådde sin första guldålder under den legendariske tränaren Don Revie på 1960- och 70-talen med flera ligatitlar och Europafinaler. Under 1990-talet vann laget den sista upplagan av gamla First Division (1991/92) och nådde semifinal i Champions League 2001. Efter flera tuffa år i lägre divisioner tog sig Leeds tillbaka till finrummet under Marcelo Bielsas spektakulära ledning.",
    faqs: [
      {
        question: "Hur tar jag mig till Elland Road från centrala Leeds?",
        answer: "Det går dedikerade matchbussar (R2) från Sovereign Street i centrala Leeds direkt till arenan på matchdagar. Du kan även ta en taxi på cirka 10 minuter eller gå till fots från centralstationen på cirka 30–35 minuter."
      },
      {
        question: "Vad är 'The Kop' på Elland Road?",
        answer: "Det är den norra kortsidan (Don Revie Stand) där klubbens mest sångglada och passionerade kår av supportrar samlas för att skapa den fantastiska stämningen."
      },
      {
        question: "Är det säkert att köpa sista minuten-biljetter utanför arenan?",
        answer: "Nej, köp aldrig biljetter av svartbörshandlare utanför arenan då risken för förfalskade biljetter är stor. Boka alltid via verifierade, auktoriserade återförsäljare."
      }
    ]
  },

  "aston-villa": {
    name: "Aston Villa",
    stadiumName: "Villa Park",
    logo: "/logos/aston-villa.png",
    stadiumDescription: "Villa Park är en av den engelska fotbollens absolut mest anrika och vackraste katedraler, belägen i stadsdelen Aston i Birmingham. Arenan har varit Villas hem sedan 1897 och rymmer drygt 42 000 åskådare. Med sin klassiska tegelfasad vid Holte End och eleganta arkitektur utstrålar Villa Park ren och skär fotbollshistoria. Arenan har genom åren valt som spelplats för fler FA-cupsemifinaler än någon annan arena i England och bjuder på en genuint elektrisk stämning under både Premier League- och Europakvällar.",
    location: "Birmingham, England",
    league: "Premier League",
    aboutTickets: "Upplev atmosfären på anrika Villa Park. Jämför priser för officiella biljetter och paketresor till Aston Villas alla hemmamatcher.",
    heroImage: "/stadiums/villa-park-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/villa-park-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.4321!2d-1.8845!3d52.5094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc123456!2sVilla%20Park!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "I och med klubbens stora framgångar säljer matcherna på Villa Park slut väldigt fort. Lösbiljetter kräver oftast medlemskap i Aston Villa. För svenska resenärer är det absolut smidigaste alternativet att boka ett säkert matchpaket med officiell biljett och hotellboende. Då garanteras du giltiga e-biljetter levererade direkt till mobilen utan krångel.",
    sectionsAndPrices: "Arenan bestående av fyra fristående och karaktäristiska läktare: Holte End (den ikoniska södra kortsidan med två stora etage där de mest hängivna fansen sitter), Trinity Road Stand (den moderna västra långsidan med VIP-utrymmen), Doug Ellis Stand (östra långsidan) och North Stand (norra kortsidan). Trinity Road och Doug Ellis erbjuder bäst vy över planens taktiska spel.",
    packages: "Våra matchpaket till Birmingham inkluderar en garanterad sittplatsbiljett på Villa Park samt boende på godkänt hotell i centrala Birmingham. Som Storbritanniens näst största stad har Birmingham ett fantastiskt utbud av restauranger, pubar och shopping (t.ex. vid Bullring), vilket gör resan till en komplett fotbollsupplevelse.",
    history: "Aston Villa grundades 1874 och var en av de tolv klubbar som bildade The Football League 1888. Klubben har en oerhört stolt historia med sju engelska ligatitlar, sju FA-cupguld och den absoluta höjdpunkten: segern i Europacupen (nuvarande Champions League) 1982 efter att ha besegrat Bayern München i finalen i Rotterdam.",
    faqs: [
      {
        question: "Hur tar man sig bäst till Villa Park från centrala Birmingham?",
        answer: "Det enklaste sättet är att ta lokaltåget från Birmingham New Street station till antingen stationen Witton (närmast Holte End) eller Aston station. Tågresan tar cirka 8–10 minuter, följt av en kort promenad på 5–10 minuter till arenan."
      },
      {
        question: "Vad är Holte End för något?",
        answer: "Holte End är den berömda södra kortsidan på Villa Park. Det var en gång i tiden en av Europas största ståplatsläktare under tak och är än idag hjärtat i Aston Villas supporterkultur och sång."
      },
      {
        question: "Ingår hotell i paketresorna?",
        answer: "Ja, när du bokar ett matchpaket via våra partners ingår både officiell matchbiljett och hotellövernattning i Birmingham."
      }
    ]
  },
  "villarreal": {
    name: "Villarreal CF",
    stadiumName: "Estadio de la Cerámica",
    logo: "/logos/villareal.png",
    stadiumDescription: "Estadio de la Cerámica (tidigare El Madrigal) är en helt unik arena i spansk fotboll. Belägen i den lilla staden Vila-real, med drygt 50 000 invånare, har arenan en kapacitet på över 23 000 åskådare – vilket innebär att nästan halva stadens befolkning får plats samtidigt. Efter den omfattande renoveringen täcks hela fasaden av gul keramik, ett hantverk som staden är världskänd för. Arenan erbjuder en intim och gemytlig atmosfär där läktarna ligger extremt nära planen, och 'Den gula ubåten' (El Submarino Amarillo) bjuder alltid på underhållande toppfotboll mot Europas giganter.",
    location: "Villarreal, Spanien",
    league: "La Liga",
    aboutTickets: "Villarreal erbjuder en fantastisk och väldigt familjevänlig fotbollsupplevelse med god biljettillgänglighet. Jämför priser på biljetter och matchpaket till Estadio de la Cerámica.",
    heroImage: "/stadiums/ceramica-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/ceramica-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+de+la+Ceramica,+Villarreal&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Biljetter till ordinära La Liga-matcher kan ofta köpas direkt via Villarreal CF:s officiella hemsida eller i biljettsläpp på arenan. För stormatcher mot Barcelona, Real Madrid eller i europeiska cupspel rekommenderas det dock starkt att boka auktoriserade biljetter eller färdiga matchpaket i förväg via biljetterfotboll.se för att garantera platser bredvid varandra.",
    sectionsAndPrices: "Arenan bestående av Tribuna (huvudläktaren med tak och VIP-sektioner), Preference (långsidan mittemot), samt Fondo Sur och Fondo Norte (kortsidorna). Tribuna och Preference erbjuder bäst sikt över spelet och skydd mot solen, medan kortsidorna är mycket prisvärda och bjuder på ett härligt lokalt supporterstöd.",
    packages: "Då utbudet av hotell i själva Vila-real är begränsat väljer de flesta tillresande supportrar att bo i den närliggande kuststaden Castellón de la Plana (10 minuter bort med tåg) eller i storstaden Valencia (cirka 45-60 minuter bort). Våra paket inkluderar garanterad matchbiljett kombinerat med hotellövernattning i Valencia eller Castellón, vilket gör resan till en perfekt spansk semesterkombination.",
    history: "Villarreal CF grundades 1923 och var under större delen av sin historia en anonym lägre-divisionsklubb. Under ägaren Fernando Roig inleddes en osannolik framgångssaga i slutet av 1990-talet. Klubben har sedan dess etablerat sig i den absoluta La Liga-eliten, nått semifinal i Champions League två gånger och vunnit sin första stora europeiska titel när man tog hem UEFA Europa League 2021 efter en dramatisk straffläggning mot Manchester United.",
    faqs: [
      {
        question: "Hur reser man bäst till Estadio de la Cerámica?",
        answer: "Det smidigaste sättet är att ta lokaltåget (Cercanías line C6) från Valencias huvudstation Valencia-Nord till stationen 'Vila-real'. Tågresan tar cirka 50 minuter. Från stationen i Vila-real promenerar du till arenan på drygt 10-15 minuter."
      },
      {
        question: "Varför kallas laget för 'Den gula ubåten'?",
        answer: "Öknamnet 'El Submarino Amarillo' uppstod i slutet av 1960-talet när fansen började spela Beatles kända låt Yellow Submarine på en grammofon under matcher för att fira klubbens uppflyttning, kombinerat med lagets helgula ställ."
      },
      {
        question: "Är det lätt att få tag på biljetter till alla matcher?",
        answer: "Till flertalet matcher mot medelstora La Liga-lag är tillgången god, men när Real Madrid och FC Barcelona kommer på besök säljer arenan slut blixtsnabbt."
      }
    ]
  },

  "real-betis": {
    name: "Real Betis",
    stadiumName: "Benito Villamarín",
    logo: "/logos/real-betis.png",
    stadiumDescription: "Estadio Benito Villamarín är med sin kapacitet på över 60 000 åskådare den fjärde största arenan i Spanien och ett av fotbollsvärldens mest passionerade tempel. Arenan ligger i stadsdelen Heliópolis i södra Sevilla och är känd för sitt enorma green-and-white hav av vajande flaggor. Att stiga in på Benito Villamarín och uppleva trycket när 'Béticos' sjunger sin anthem 'Hymno del Betis' är en känslomässig och färgstark upplevelse som alla fotbollsresenärer borde unna sig.",
    location: "Sevilla, Spanien",
    league: "La Liga",
    aboutTickets: "Upplev den unika och passionerade läktarkulturen i Andalusien. Jämför priser för biljetter och fotbollsresor till Real Betis hemmamatcher i Sevilla.",
    heroImage: "/stadiums/benito-villamarin.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/benito-villamarin.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+Benito+Villamar%C3%ADn,+Sevilla&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Biljetter till Real Betis säljs via klubbens officiella biljettsida, men efterfrågan är enorm och arenan fylls i regel av klubbens över 50 000 säsongskortsinnehavare. Till det glödheta Sevilla-derbyt ('El Gran Derbi') eller matcher mot topplag krävs att man bokar säkra, verifierade biljetter och paket via auktoriserade sportresebyråer långt i förväg.",
    sectionsAndPrices: "Arenan är indelad i Preferencia (Västra huvudläktaren med VIP och spelargång), Fondo (Östra långsidan med utmärkt överblick), Gol Sur (Södra kortsidan där klacken skapar ett enormt tryck) och Gol Norte (Norra kortsidan, populär bland familjer). Platser på Fondo erbjuder bäst balans mellan sikt och pris, medan Gol Sur ger den mest intensiva atmosfären.",
    packages: "Sevilla är en av Europas vackraste och mest romantiska städer. Våra paketresor till Real Betis inkluderar garanterade matchbiljetter på Benito Villamarín samt boende på handplockade hotell i centrala Sevilla (t.ex. nära Santa Cruz eller Plaza de España). Njut av flamenco, tapas och medelhavsvärme i kombination med spansk toppfotboll.",
    history: "Real Betis Balompié grundades 1907 och har en av Spaniens mest lojala supporterskaror, kända för mottot 'Viva el Betis manque pierda' (Länge leve Betis, även när de förlorar). Klubben blev 1935 den första från Andalusien att vinna La Liga och har dessutom bärgat tre Copa del Rey-titlar (senast 2022). Betis är känt för sitt tekniska och offensiva spel genom legender som Joaquín, Denílson och Luis Aragonés.",
    faqs: [
      {
        question: "Hur tar man sig till Benito Villamarín från Sevillas centrum?",
        answer: "Arenan nås extremt enkelt med stadsbussarna linje 1, 3 eller 34 från Plaza Nueva eller Paseo de las Delicias. Du går av vid hållplatsen 'La Palmera' precis framför stadion."
      },
      {
        question: "Vad är 'El Gran Derbi'?",
        answer: "Det är stadsderbyt mellan Real Betis och Sevilla FC. Det anses av många vara det mest intensiva och passionerade stadsderbyt i hela Europa, där hela staden täcks i grön-vitt respektive röd-vitt."
      },
      {
        question: "Är biljetterna digitala?",
        answer: "Ja, alla biljetter levereras som mobila e-biljetter i god tid innan matchdag och skannas direkt i din telefon vid vändkorsen."
      }
    ]
  },

  "sevilla": {
    name: "Sevilla FC",
    stadiumName: "Ramón Sánchez Pizjuán",
    logo: "/logos/sevilla.png",
    stadiumDescription: "Estadio Ramón Sánchez Pizjuán är en genuint klassisk och intim fotbollsborg. Arenan, med sin ikoniska väggmosaik på fasaden och platser för drygt 43 000 åskådare, ligger mitt i det levande stadsområdet Nervión. De branta och kompakta läktarna gör att åskådarna hamnar extremt nära spelplanen, vilket skapar en grytliknande kittel och en mardrömslik miljö för motståndarlag. När stadion stämmer upp i sin världsberömda anthemsång 'Himno Centenario' av El Arrebato reser sig håren på armarna.",
    location: "Sevilla, Spanien",
    league: "La Liga",
    aboutTickets: "Säkra biljetter till Sevilla FC på Ramón Sánchez Pizjuán. Jämför priser för La Liga och magiska Europakvällar med Europas mest framgångsrika Europa League-klubb.",
    heroImage: "/stadiums/ramon-sanchez-pizjuan-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/ramon-sanchez-pizjuan-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+Ram%C3%B3n+S%C3%A1nchez+Pizju%C3%A1n,+Sevilla&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Sevilla FC säljer lösbiljetter via sin officiella hemsida, men medlemsantalet är högt och arenan säljer ofta slut, i synnerhet vid stormatcher och i europeiska cupspel. Genom att jämföra biljetter och paketresor via biljetterfotboll.se säkrar du officiella sittplatser i god tid före avresa utan att behöva vara med i spanska medlemsklubbar.",
    sectionsAndPrices: "Arenan är indelad i Tribuna (Västra huvudläktaren med tak), Fondo (Östra långsidan), Gol Norte (Norra kortsidan där klacken 'Biris Norte' skapar en otrolig stämning) samt Gol Sur (Södra kortsidan). För absolut bäst sikt rekommenderas Tribuna och Fondo, medan Gol Norte är perfekt för dig som vill vara nära stämningens centrum.",
    packages: "Upplev den fantastiska spanska fotbollskulturen kombinerat med en storstadssemester i Sevilla. Våra fotbollspaket inkluderar garanterad matchbiljett på Ramón Sánchez Pizjuán och boende på hotell i centrala Sevilla eller i området Nervión med gångavstånd till arenan och shoppingcentret Nervión Plaza.",
    history: "Sevilla Fútbol Club grundades 1890 och är Andalusiens äldsta fotbollsklubb. Klubben vann La Liga 1946, men har framför allt skrivit internationell fotbollshistoria under 2000-talet genom att dominera UEFA Europa League totalt med rekordmånga titlar (2006, 2007, 2014, 2015, 2016, 2020 och 2023). Klubben är känd för sin fantastiska talangscouting och ikoner som Jesús Navas, Frédéric Kanouté och Sergio Ramos.",
    faqs: [
      {
        question: "Hur tar jag mig till Ramón Sánchez Pizjuán?",
        answer: "Arenan har ett fantastiskt läge i stadsdelen Nervión. Du kan enkelt gå till fots på 10–15 minuter från tågstationen Santa Justa, eller ta tunnelbanan (Linea 1) till stationen 'Nervión' eller 'Gran Plaza' som ligger alldeles intill stadion."
      },
      {
        question: "Vad är klacksidan på arenan?",
        answer: "Klubbens mest högljudda och passionerade ultras, Biris Norte, håller till på Gol Norte (den norra kortsidan)."
      },
      {
        question: "Finns det restauranger och barer i närheten av arenan?",
        answer: "Ja, hela stadsdelen Nervión runt arenan sjuder av liv innan match med massor av lokala tapasbarer, pubar och köpcentret Nervión Plaza alldeles bredvid."
      }
    ]
  },

  "real-sociedad": {
    name: "Real Sociedad",
    stadiumName: "Reale Arena",
    logo: "/logos/real-sociedad.png",
    stadiumDescription: "Reale Arena (tidigare känd som Anoeta) har genomgått en spektakulär förvandling. Genom att ta bort de gamla löparbanorna och flytta läktarna närmare gräset har arenan förvandlats till en toppmodern, intim och arkitektoniskt hyllad fotbollsborg för drygt 39 000 åskådare. Den blåvita baskiska supporterskaran skapar en fantastisk atmosfär i den vackra kuststaden San Sebastián, där modern komfort möter genuin baskisk fotbollspassion.",
    location: "San Sebastián, Spanien",
    league: "La Liga",
    aboutTickets: "Boka biljetter för att se Real Sociedad i La Liga. Upplev spansk toppfotboll i en av Europas absolut vackraste och mest matälskande städer.",
    heroImage: "/stadiums/reale-arena-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/reale-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Reale+Arena,+San+Sebasti%C3%A1n&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Biljetter till Real Sociedad kan köpas via klubbens hemsida, men arenan fylls i stort sett till sista plats av klubbens över 37 000 medlemmar. Till det prestige laddade baskiska derbyt mot Athletic Bilbao eller Europamatcher säljer det slut direkt. Boka därför din biljett eller kompletta fotbollsresa via auktoriserade återförsäljare på biljetterfotboll.se i god tid.",
    sectionsAndPrices: "Reale Arena består av Tribuna Principal (Västra långsidan med VIP-utrymmen), Tribuna Este (Östra långsidan med fantastisk överblick), Fondo Sur (där hemmaklubbens aktiva supportersektion 'Aitor Zabaleta' sörjer för sång och tryck) samt Fondo Norte. Platserna på långsida mittemot (Tribuna Este) rekommenderas varmt för bästa vy över spelet.",
    packages: "San Sebastián (Donostia på baskiska) är världsberömt för sin fantastiska matkultur, sina Michelin-restauranger, Pintxos-barer och den underbara stranden La Concha. Våra paketresor inkluderar officiella matchbiljetter på Reale Arena och boende på trevliga hotell i centrala San Sebastián. En perfekt fotbolls- och kulinarisk helg i Baskien!",
    history: "Real Sociedad grundades 1909 och har en stolt historia i spansk fotboll med två raka La Liga-titlar under sin guldålder på 1980-talet (1981 och 1982) samt tre segrar i Copa del Rey. Klubben var länge känd för sin policy att enbart ha baskiska spelare (likt rivalen Athletic Bilbao), men öppnade 1989 upp för utländska stjärnor. Föreningen fortsätter dock att fostra några av Spaniens mest tekniska spelare via sin berömda akademi Zubieta.",
    faqs: [
      {
        question: "Hur tar man sig till Reale Arena?",
        answer: "Arenan ligger i stadsdelen Amara i södra San Sebastián. Du tar dig enkelt hit med lokalbanan Euskotren till stationen 'Anoeta' (som ligger precis utanför arenan), med lokalbuss eller genom en trevlig 20–25 minuters promenad från stadens centrum längs floden Urumea."
      },
      {
        question: "Vad kallas stadsderbyt mot Athletic Bilbao?",
        answer: "Det kallas 'El Derbi Vasco' (Det baskiska derbyt) och kännetecknas av en extremt vänskaplig men passionerad stämning där rivaliserande fans sitter tillsammans på läktarna."
      },
      {
        question: "Vad ingår i fotbollspaketen till San Sebastián?",
        answer: "Paketen inkluderar garanterade matchbiljetter på Reale Arena samt boende på godkänt hotell i San Sebastián under matchhelgen."
      }
    ]
  },
  "athletic-bilbao": {
    name: "Athletic Bilbao",
    stadiumName: "San Mamés",
    logo: "/logos/athletic-bilbao.png",
    stadiumDescription: "San Mamés, mer känd över fotbollsvärlden som 'La Catedral' (Katedralen), är en av Europas mest respekterade och spektakulära fotbollsarenor. Den nya arenan invigdes 2013 på exakt samma anrika mark som den ursprungliga katedralen från 1913. Med en kapacitet på drygt 53 000 åskådare kombinerar San Mamés en ultramodern arkitektur med en stämning som är rå, passionerad och extremt högljudd. När drygt 50 000 basker stämmer upp i sång reser sig håren på armarna, och ett besök här anses av många vara en absolut 'bucket list'-upplevelse för varje sann fotbollsentusiast.",
    location: "Bilbao, Spanien",
    league: "La Liga",
    aboutTickets: "Upplev magin på San Mamés i Bilbao. Jämför priser på biljetter och kompletta fotbollsresor för att se Athletic Club utmana Spaniens giganter i La Liga.",
    heroImage: "/stadiums/san-mames-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/san-mames-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+San+Mam%C3%A9s,+Bilbao&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Att köpa biljetter direkt via Athletic Bilbaos hemsida är möjligt för ordinära seriematcher, men trycket är väldigt stort eftersom klubben har över 43 000 medlemmar (socios). Till det klassiska baskiska derbyt mot Real Sociedad eller matcher mot Real Madrid och Barcelona säljer det slut blixtsnabbt. För att vara garanterad officiella platser rekommenderas att boka via våra verifierade partneraktörer och resebyråer i god tid.",
    sectionsAndPrices: "Arenan är indelad i Tribuna Principal (Västra huvudläktaren med VIP-boxar och spelargång), Tribuna Este (Östra långsidan), Tribuna Norte och Tribuna Sur. Den mest stämningsfulla och passionerade sektionen är den lägre norra läktaren (Grada de Animación på Tribuna Norte), där hemmaklubbens mest aktiva klack skapar den massiva ljudkulissen. Platser på långsidan (Tribuna Este eller Principal) erbjuder absolut bäst vy över planens taktiska spel.",
    packages: "Bilbao är en fantastisk destination för en weekendresa, känd för sin världsledande gastronomi, sina berömda pintxos-barer och det ikoniska Guggenheim-museet. Våra matchpaket inkluderar garanterad biljett på San Mamés kombinerat med hotellövernattning på utvalda hotell nära arenan eller i Bilbaos charmiga historiska stadskärna (Casco Viejo).",
    history: "Athletic Club grundades 1898 och är en av de tre klubbar i Spanien (tillsammans med Real Madrid och FC Barcelona) som aldrig har åkt ur La Liga. Klubben är världsberömd för sin unika och strikta policy (Cantera-principen) att enbart spela med spelare födda eller uppvuxna fotbollsmässigt i Baskien. Trots detta begränsade urval har klubben bärgat hela åtta ligatitlar och 24 Copa del Rey-guld (senast 2024).",
    faqs: [
      {
        question: "Hur tar man sig lättast till San Mamés?",
        answer: "Arenan har ett fantastiskt centralt läge i Bilbao. Du tar dig hit på några minuter med tunnelbanan (Metro Bilbao) till stationen 'San Mamés' eller med spårvagnen (Euskotren Tranbia) direkt till hållplatsen 'Sabino Arana'."
      },
      {
        question: "Vad innebär klubbens 'Cantera'-policy?",
        answer: "Det innebär att Athletic Bilbao endast representeras av spelare som antingen är födda i den baskiska regionen (inklusive Navarra och Franska Baskien) eller har fostrats i en baskisk klubbs ungdomsakademi."
      },
      {
        question: "Behöver jag skriva ut biljetten?",
        answer: "Nej, e-biljetter i mobilen skannas smidigt i vändkorsen vid entréerna."
      }
    ]
  },

  "juventus": {
    name: "Juventus",
    stadiumName: "Allianz Stadium",
    logo: "/logos/juventus.png",
    stadiumDescription: "Allianz Stadium (ursprungligen Juventus Stadium) invigdes 2011 och markerade en ny era för italiensk fotboll som den första privatägda arenan i landet. Med en kapacitet på drygt 41 500 åskådare är arenan medvetet byggd för att skapa en extremt intim och tryckfylld stämning. Till skillnad från gamla Stadio Delle Alpi finns det inga löparbanor, vilket gör att läktarna hamnar precis intill avbytarbänkar och spelplan. Arenan bjuder på toppmodern komfort, utmärkt sikt från alla vinklar och en fantastisk inramning när 'I Bianconeri' spelar hemma.",
    location: "Turin, Italien",
    league: "Serie A",
    aboutTickets: "Köp biljetter till Juventus på Allianz Stadium i Turin. Jämför priser på officiella biljetter och hotellpaket till italienska Serie A och Champions League.",
    heroImage: "/stadiums/allianz-stadium-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/allianz-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.5!2d7.638!3d45.109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d38e2d2780b%3A0x1d4a0b2d6a5e1!2sAllianz%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Släppet av lösbiljetter direkt via Juventus biljettsida sker i etapper där officiella medlemmar (Black & White Members) alltid har förtur. Till storkamper mot Inter (Derby d'Italia), AC Milan eller i Champions League säljer biljetterna ofta slut innan allmänt släpp. Det säkraste och smidigaste sättet för svenska resenärer är att boka verifierade matchpaket med biljetter och hotell via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan är indelad i Tribuna Ovest (Västra huvudläktaren med VIP-sektioner), Tribuna Est (Östra långsidan med perfekt sikt), Tribuna Nord och Tribuna Sud. Tribuna Sud (Curva Sud) är hjärtat av supporterskaran där de mest inbitna ultras skapar den högsta ljudvolymen. Östra långsidan (Tribuna Est Primo Anello) erbjuder den absolut bästa kombinationen av vy och upplevelse.",
    packages: "Boka en fotbollshelg till eleganta Turin. Våra paket inkluderar garanterad matchbiljett på Allianz Stadium samt boende på godkända hotell i centrala Turin. Det ger dig chansen att njuta av Piemontes berömda mat- och vinkultur, besöka det kungliga slottet och ladda upp på lokala espressobarer innan avspark.",
    history: "Juventus Football Club grundades 1897 av ett gäng gymnasieelever i Turin och har växt till Italiens mest framgångsrika klubb genom tiderna med flest Serie A-titlar (Scudetti) och Coppa Italia-vinster i historien. Klubben dominerade 2010-talet totalt med nio raka ligaguld och har fostrat och hyst legender som Alessandro Del Piero, Gianluigi Buffon, Michel Platini, Zinedine Zidane och Roberto Baggio.",
    faqs: [
      {
        question: "Behöver jag ID-handling vid entrén?",
        answer: "Ja, i enlighet med italiensk lagstiftning är alla matchbiljetter personliga. Du måste visa upp ett giltigt fysiskt pass eller nationellt ID-kort i spärrarna som matchar namnet på biljetten."
      },
      {
        question: "Hur tar man sig bäst till Allianz Stadium från centrala Turin?",
        answer: "På matchdagar går det direktbussar (linje 9_) från spårvagns- och tunnelbanestationen 'Bernini'. Du kan också ta spårvagn linje 3 eller buss 72 från stadskärnan direkt ut till arenan."
      },
      {
        question: "Finns det guidade turer och museum på arenan?",
        answer: "Ja, Juventus Museum och J-Museum stadium tour är mycket populära och rekommenderas starkt att besökas dagen före eller samma dag som match."
      }
    ]
  },

  "napoli": {
    name: "Napoli",
    stadiumName: "Stadio Diego Armando Maradona",
    logo: "/logos/napoli.png",
    stadiumDescription: "Stadio Diego Armando Maradona (tidigare Stadio San Paolo) i stadsdelen Fuorigrotta är en av världsfotbollens mest råa, passionerade och mytomspunna platser. Arenan rymmer över 54 000 åskådare och fungerar närmast som ett religiöst tempel för napolitanarna. Inramningen är elektrisk – när spelarna kliver in på planen dånar 'O Surdato Nnnammurato' ur högtalarna och läktarna rör sig i en kokande, sydeuropeisk vulkan av sång, rök och passion.",
    location: "Neapel, Italien",
    league: "Serie A",
    aboutTickets: "Upplev den unika atmosfären på Stadio Diego Armando Maradona. Jämför biljetter och matchresor till SSC Napoli i Serie A och Champions League.",
    heroImage: "/stadiums/stadio-diego-maradona-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/stadio-diego-maradona-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Diego+Armando+Maradona,+Napoli&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Efter klubbens historiska Scudetto-vinst har efterfrågan på biljetter nått rekordnivåer. Lösbiljetter kräver i regel att man har klubbens fankort (Fidelity Card 'Fidelity SSCN'). För tillresande svenskar som vill undvika den krångliga italienska byråkratin är det absolut smidigaste valet att boka garanterade biljetter och hotellpaket via auktoriserade biljettsajter.",
    sectionsAndPrices: "Arenan bestående av två etage. Curva A och Curva B är kortsidorna där klubbens mest fanatiska ultras håller till; stämningen här är magisk men intensiv. Curva B anses traditionellt vara hjärtat av supporterskaran. För bäst sikt och en bekvämare upplevelse rekommenderas platser på östra långsidan (Distinti) eller huvudläktaren (Posillipo) på det övre etaget (Anello Superiore).",
    packages: "Neapel är en stad full av liv, historia och världens bästa pizza. Våra matchpaket inkluderar officiella biljetter på Maradona-stadion samt hotell boende i centrala Neapel (t.ex. i historiska centrum eller nära hamnen). Kombinera storkampsfotboll med besök på Maradona-väggmålningarna i Quartieri Spagnoli och autentisk napolitansk matkultur.",
    history: "Società Sportiva Calcio Napoli grundades 1926. Klubbens historia förändrades i grunden 1984 när man värvade världen genom tiderna störste spelare, Diego Armando Maradona. Maradona förde klubben till sina två första Serie A-titlar (1987 och 1990) samt UEFA-cupseger 1989. År 2023 bröt Napoli en 33 år lång väntan genom att återigen bärga Scudettorn till stadens enorma jubel.",
    faqs: [
      {
        question: "Hur tar man sig lättast till arenan i Fuorigrotta?",
        answer: "Det snabbaste och säkraste sättet är att ta tunnelbanans Linea 2 från centralstationen (Napoli Centrale/Piazza Garibaldi) till stationen 'Campi Flegrei'. Därifrån promenerar du till arenan på under 5 minuter."
      },
      {
        question: "Behövs det ID vid entrén?",
        answer: "Ja, exakt som på alla italienska arenor är biljetterna personliga. Du måste uppvisa ett giltigt fysiskt pass eller nationellt ID-kort vid vändkorsen."
      },
      {
        question: "Varför döptes arenan om till Diego Armando Maradona?",
        answer: "Arenan döptes om i december 2020 för att hedra klubbens största ikon genom tiderna, Diego Maradona, strax efter hans bortgång."
      }
    ]
  },

  "roma": {
    name: "AS Roma",
    stadiumName: "Stadio Olimpico",
    logo: "/logos/roma.png",
    stadiumDescription: "Stadio Olimpico är en gigantisk och historisk idrottskatedral belägen vid Tiberflodens strand i norra Rom. Arenan, med en kapacitet på drygt 70 000 åskådare, delas med stadsrivalen Lazio och har varit värd för både OS-finaler och VM-finaler. När AS Roma spelar hemma fylls arenan av en otrolig passion. Höjdpunkten för alla besökare inträffar precis före avspark när hela stadion reser sig upp, håller upp sina halsdukar och sjunger med i Antonello Vendittis magiska klubbhymn 'Roma Roma Roma'.",
    location: "Rom, Italien",
    league: "Serie A",
    aboutTickets: "Säkra biljetter till AS Roma på anrika Stadio Olimpico. Jämför priser för Serie A och Europeiska cupmatcher i den eviga staden.",
    heroImage: "/stadiums/stadio-olimpico-roma-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/stadio-olimpico-roma-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.2!2d12.454!3d41.933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f606!2sStadio%20Olimpico!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "AS Roma säljer lösbiljetter via sin officiella hemsida och biljettsläppen sker vanligtvis några veckor innan match. Tack vare arenans stora kapacitet finns det god tillgänglighet till ordinära seriematcher. Vid det brinnande stadsderbyt 'Derby della Capitale' mot Lazio eller i stora Europamatcher säljer det dock slut direkt, varpå bokning av auktoriserade biljetter och matchpaket rekommenderas i god tid.",
    sectionsAndPrices: "Stadio Olimpico är uppdelad i Tribuna Monte Mario (Västra långsidan med hedersläktare och press), Tribuna Tevere (Östra långsidan med fantastisk sikt över hela planen), Curva Sud (Södra kortsidan där Romas mest passionerade klack samlas) och Curva Nord. För den ultimata supporterupplevelsen rekommenderas platser nära Curva Sud, medan Tribuna Tevere ger bäst komfort och sikt.",
    packages: "Rom är det ultimata resmålet för en weekend som kombinerar historia, kultur, mat och fotboll. Våra paket inkluderar officiell matchbiljett på Stadio Olimpico samt hotellboende på handplockade hotell i centrala Rom (t.ex. nära Termini eller Prati). Upptäck Colosseum och Trevifontänen på dagen och upplev passionerad italiensk toppfotboll på kvällen.",
    history: "Associazione Sportiva Roma grundades 1927 genom en sammanslagning av tre äldre Romklubbar för att ge huvudstaden ett lag som kunde utmana norditalienska giganter. Klubben har vunnit Serie A tre gånger (1942, 1983 och 2001) samt den första upplagan av UEFA Conference League 2022. Romas historia präglas av lojala klubblegender som Francesco Totti ('Il Capitano' som tillbringade hela sin karriär i klubben) och Daniele De Rossi.",
    faqs: [
      {
        question: "Hur tar man sig smidigast till Stadio Olimpico?",
        answer: "Ta tunnelbanans linje A till stationen 'Ottaviano', och ta därefter buss 32 direkt till Piazza Mancini eller arenan. Du kan också ta spårvagn linje 2 från Piazzale Flaminio (nära Piazza del Popolo) till slutstationen Piazza Mancini och promenera över bron Ponte Duca d'Aosta."
      },
      {
        question: "Vad är 'Derby della Capitale'?",
        answer: "Det är det prestigefyllda stadsderbyt mellan AS Roma och SS Lazio. Derbyt rankas som ett av de mest laddade och känslosamma i hela fotbollsvärlden."
      },
      {
        question: "Krävs det pass vid entrén till arenan?",
        answer: "Ja, alla biljetter i Italien är personliga. Du måste uppvisa giltigt pass eller nationellt ID-kort som matchar namnet tryckt på din biljett."
      }
    ]
  },
  "lazio": {
    name: "SS Lazio",
    stadiumName: "Stadio Olimpico",
    logo: "/logos/lazio.png",
    stadiumDescription: "Stadio Olimpico är den ikoniska idrottskatedralen i norra Rom där SS Lazio har spelat sina hemmamatcher sedan 1953. När 'I Biancocelesti' spelar lyfter stämningen till enorma höjder – inte minst när klubbens levande maskot, den ståtliga örnen Olympia, flyger över läktarna inför avspark till tonerna av klubbhymnen 'I giardini di marzo'. Arenan rymmer över 70 000 åskådare och erbjuder en intensiv sydeuropeisk supporterupplevelse fylld av färger, flaggor och passion.",
    location: "Rom, Italien",
    league: "Serie A",
    aboutTickets: "Upplev SS Lazio live i Rom. Jämför priser på biljetter och kompletta fotbollsresor till Serie A och europeiska cupmatcher på Stadio Olimpico.",
    heroImage: "/stadiums/stadio-olimpico-lazio-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/stadio-olimpico-lazio-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.2!2d12.454!3d41.933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f606!2sStadio%20Olimpico!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Lazio säljer lösbiljetter via sin officiella biljettportal (Vivaticket), men tillgängligheten varierar kraftigt beroende på motstånd. Till det hetlevrade stadsderbyt 'Derby della Capitale' mot AS Roma eller matcher mot Juventus och Milan krävs det att man säkrar biljetter i god tid. Boka verifierade biljetter och fotbollspaket via biljetterfotboll.se för en trygg och smidig resa.",
    sectionsAndPrices: "Arenan är indelad i Tribuna Monte Mario (Västra huvudläktaren med hedersläktare och VIP), Tribuna Tevere (Östra långsidan med fantastisk överblick), Curva Nord (Norra kortsidan) och Curva Sud. Curva Nord är Lazios absoluta supporterhjärta där de mest inbitna ultras skapar den massiva stämningen. För högsta komfort och bäst sikt rekommenderas Tribuna Tevere.",
    packages: "Kombinera fotbollspassion med historisk sightseeing i Rom. Våra paketresor till SS Lazio inkluderar garanterade matchbiljetter på Stadio Olimpico samt boende på noggrant utvalda hotell i centrala Rom. Njut av den italienska huvudstadens mat, kultur och sevärdheter i samband med matchhelgen.",
    history: "Società Sportiva Lazio grundades år 1900 i stadsdelen Prati och är Roms äldsta fotbollsklubb. Klubben har vunnit Serie A två gånger (1974 och under den stjärnspäckade gulderytan 2000), samt bärgat sju Cupguld (Coppa Italia) och vunnit den sista upplagan av Europeiska Cupvinnarcupen 1999. Föreningen förknippas med legender som Paul Gascoigne, Alessandro Nesta, Pavel Nedvěd, Marcelo Salas och Ciro Immobile.",
    faqs: [
      {
        question: "Behöver jag visa ID-kort vid entrén?",
        answer: "Ja, enligt italiensk lag är alla matchbiljetter personliga. Du måste uppvisa ett giltigt fysiskt pass eller nationellt ID-kort vid vändkorsen som matchar namnet på biljetten."
      },
      {
        question: "Hur tar man sig till Stadio Olimpico för en Lazio-match?",
        answer: "Ta tunnelbanans linje A till stationen 'Ottaviano' och byt där till buss 32 direkt mot arenan, eller ta spårvagn linje 2 från Piazzale Flaminio till slutstationen Piazza Mancini och promenera över bron till stadion."
      },
      {
        question: "Flyger örnen på alla hemmamatcher?",
        answer: "Örnen Olympia flyger i regel över planen innan avspark på samtliga hemmamatcher i Serie A, såvida inte väderförhållandena är för extrema."
      }
    ]
  },

  "atalanta": {
    name: "Atalanta",
    stadiumName: "Gewiss Stadium",
    logo: "/logos/atalanta.png",
    stadiumDescription: "Gewiss Stadium (historiskt känd som Stadio Atleti Azzurri d'Italia) ligger inbäddad i stadsdelen Borgo Santa Caterina i den pittoreska staden Bergamo. Arenan har genomgått en totalrenovering och förvandlats till en toppmodern, engelskinspirerad fotbollsarena utan löparbanor för drygt 24 000 åskådare. Läktarna ligger nästan direkt mot gräset, vilket skapar en intim och elektrisk atmosfär där supportrarnas rop ekor mot de närliggande bergstopparna i de italienska alperna.",
    location: "Bergamo, Italien",
    league: "Serie A",
    aboutTickets: "Se Atalanta BC spela underhållande toppfotboll på nyrenoverade Gewiss Stadium. Jämför biljetter och matchpaket till Serie A och Europamatcher.",
    heroImage: "/stadiums/atalanta-stadium-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/atalanta-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.5!2d9.673!3d45.709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47814e5!2sGewiss%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Atalantas hemmamatcher säljer extremt snabbt slut på grund av den begränsade arenakapaciteten och det enorma lokala intresset. Lösbiljetter säljs i etapper via klubbens biljettsida och Vivaticket, men rekommendationen för internationella besökare är att säkra garanterade biljetter och hotellpaket långt i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan består av Tribuna Rinascimento (Östra långsidan med utmärkt sikt), Tribuna Principale (Västra huvudläktaren med tak och VIP-sektioner), Curva Pisani (Norra kortsidan) och Curva Morosini (Södra kortsidan). Curva Pisani är hjärtat av Atalantas supporterkultur där klacken skapar ett enormt tryck hela matchen igenom.",
    packages: "Bergamo är en av Lombardíets mest charmiga städer, uppdelad i den moderna nedre staden (Città Bassa) och den medeltida historiska övre staden (Città Alta). Våra matchpaket inkluderar officiella biljetter på Gewiss Stadium samt hotellboende i Bergamo eller Milano (som ligger endast 45 minuter bort med tåg).",
    history: "Atalanta Bergamasca Calcio grundades 1907 och är uppkallad efter den kvinnliga atleten Atalanta i den grekiska mytologin. Klubben kallades länge för 'I Nerazzurri' eller 'La Dea' (Gudinnan) och var under årtionden en klassisk hissklubb. Under 2010- och 2020-talet genomförde klubben en osannolik klassresa med sin hyperoffensiva fotboll, vilket kulminerade i historiska framgångar i Champions League samt segern i UEFA Europa League 2024.",
    faqs: [
      {
        question: "Hur tar man sig till Bergamo från Milano?",
        answer: "Det går direkt tåg varje halvtimme från stationerna Milano Centrale eller Milano Porta Garibaldi till Bergamo. Tågresan tar cirka 45-50 minuter. Från stationen i Bergamo kan du promenera till arenan på cirka 20 minuter eller ta lokalbuss."
      },
      {
        question: "Varför kallas klubben för 'La Dea'?",
        answer: "Klubben grundades och döptes efter gudinna-figuren Atalanta från den grekiska mytologin, och hennes profil återfinns även i klubbens officiella emblem."
      },
      {
        question: "Behöver man ID på stadion?",
        answer: "Ja, precis som på alla italienska arenor måste du visa giltigt pass eller nationellt ID-kort som överensstämmer med namnet på din biljetthandling."
      }
    ]
  },

  "bologna": {
    name: "Bologna FC",
    stadiumName: "Renato Dall'Ara",
    logo: "/logos/bologna.png",
    stadiumDescription: "Stadio Renato Dall'Ara är en av italiensk fotbolls absolut mest anrika och karaktärsfulla arenor. Arenan öppnade 1927 och känns omedelbart igen på det ståtliga tegeltornet 'Torre della Maratona' som reser sig över den östra läktaren. Med en kapacitet på drygt 38 000 åskådare kombinerar stadion klassisk 1920-talsarkitektur med en härlig, genuin och passionerad sydeuropeisk supporterkultur i hjärtat av Italiens kulinariska huvudstad.",
    location: "Bologna, Italien",
    league: "Serie A",
    aboutTickets: "Upplev Serie A-fotboll på historiska Renato Dall'Ara i Bologna. Jämför priser på matchbiljetter och paketresor till Italiens mest gastronomiska fotbollsstad.",
    heroImage: "/stadiums/renato-bologna-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/renato-bologna-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Renato+Dall%27Ara,+Bologna&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Lösbiljetter till Bologna FC köps online via klubbens officiella biljettsida eller Vivaticket. Efter klubbens stora framgångar och intåg i Champions League säljs stormatcher mot Inter, Juventus och AC Milan slut snabbt. Genom att boka trygga biljetter och matchpaket via biljetterfotboll.se säkrar du bra platser i god tid före avresa.",
    sectionsAndPrices: "Arenan bestående av Tribuna Coperta (Västra takbelagda huvudläktaren), Distinti (Östra långsidan framför maratontornet med fantastisk vy), Curva Bulgarelli (Norra kortsidan) och Curva San Luca (Södra kortsidan). Curva Bulgarelli är uppkallad efter klubblegenden Giacomo Bulgarelli och är platsen där hemmalagets mest dedikerade supportrar samlas.",
    packages: "Bologna är känt över hela världen som Italiens mat- och matkulturhuvudstad (känd för sin ragù, parmaskinka, tortellini och mortadella). Våra matchpaket inkluderar officiella biljetter på Renato Dall'Ara kombinerat med hotellövernattning på handplockade hotell i Bolognas historiska stadskärna.",
    history: "Bologna Football Club 1909 grundades 1909 av bland annat österrikaren Louis Rauch. Klubben är en av Italiens mest framgångsrika historiskt sett med hela sju Serie A-titlar (Scudetti), varav de flesta bärgades under klubbens guldålder på 1920- och 1930-talen då laget kallades 'Lo squadrone che fa tremare il mondo' (Det lilla laget som får världen att skälva).",
    faqs: [
      {
        question: "Hur tar man sig till Stadio Renato Dall'Ara från centrum?",
        answer: "Arenan ligger i stadsdelen Saragozza, cirka 3 km från centrum. Du tar dig enkelt hit med stadsbussarna linje 14, 20 eller 21 från centralstationen (Bologna Centrale) eller Piazza Maggiore. Det tar drygt 15 minuter."
      },
      {
        question: "Vad är det kända tornet på stadion?",
        answer: "Det 42 meter höga tegeltornet kallas 'Torre della Maratona' och byggdes på 1920-talet som en symbol för idrottslig uthållighet och arkitektonisk monumentaliet."
      },
      {
        question: "Krävs ID-kort på arenan?",
        answer: "Ja, alla biljetter i Italien är personliga. Giltigt fysiskt pass eller nationellt ID-kort måste uppvisas i spärrarna."
      }
    ]
  },

  "como": {
    name: "Como 1907",
    stadiumName: "Stadio Giuseppe Sinigaglia",
    logo: "/logos/como.png",
    stadiumDescription: "Stadio Giuseppe Sinigaglia bjuder på vad som kan vara fotbollsvärldens mest spektakulära och vykortsvackra kuliss. Arenan rymmer drygt 13 600 åskådare och ligger placerad precis vid kanten av den världsberömda Comosjön, inramad av ståtliga italienska alptoppar och eleganta villor. Att sitta på läktaren och se högklassig Serie A-fotboll samtidigt som båtarna glider förbi på det glittrande vattnet i bakgrunden är en alldeles unik och oslagbar idrottsupplevelse.",
    location: "Como, Italien",
    league: "Serie A",
    aboutTickets: "Boka biljetter till Como 1907 och upplev idyllisk Serie A-fotboll vid Comosjöns strand. Jämför biljetter och unika helgpaket till staden Como.",
    heroImage: "/stadiums/giuseppe-sinigaglia.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/giuseppe-sinigaglia.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Giuseppe+Sinigaglia,+Como&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Då Stadio Giuseppe Sinigaglia har en relativt liten publikkapacitet och intresset kring klubbens Serie A-satsning är enormt, säljer lösbiljetterna via klubbens portal slut på bara några minuter. För tillresande fotbollsresenärer rekommenderas det därför starkt att boka säkra biljetter och hotellpaket i god tid via auktoriserade partners på biljetterfotboll.se.",
    sectionsAndPrices: "Arenan består av Tribuna Coperta (Huvudläktaren med tak och fantastisk sikt över spelet och sjön), Distinti (Långsidan mittemot), Curva Como (Hemmasupportrarnas kortsida där stämningen är på topp) samt Curva Ospiti (Bortasektionen). Platser på Tribuna Coperta ger den absolut bästa helhetsupplevelsen.",
    packages: "Njut av den ultimata italienska lyx- och fotbollshelgen. Våra matchpaket till Como inkluderar garanterad biljett på Stadio Giuseppe Sinigaglia samt boende på fantastiska hotell i staden Como vid sjön. Perfekt att kombinera med god mat, espresso på torgen och båtturer till Bellagio.",
    history: "Como 1907 grundades 1907 och har en färgstark historia i det italienska seriesystemet. Efter ekonomiska bekymmer togs klubben över av ambitiösa ägare och har med hjälp av fotbollsikoner som Cesc Fàbregas och Thierry Henry gjort en anmärkningsvärd resa tillbaka till Italiens högstaliga Serie A, med målet att etablera sig hållbart i toppen.",
    faqs: [
      {
        question: "Var ligger arenan i förhållande till Comosjön?",
        answer: "Arenan ligger bokstavligen alldeles vid vattenbrynet i staden Comos norra del, bara ett stenkast från färjeterminalen och sjöpromenaden."
      },
      {
        question: "Hur tar man sig till Como från Milano?",
        answer: "Du tar enkelt tåget från stationerna Milano Cadorna eller Milano Centrale direkt till 'Como Lago' eller 'Como San Giovanni'. Tågresan tar cirka 40–50 minuter, och från tågstationerna promenerar du till arenan på cirka 10–15 minuter."
      },
      {
        question: "Krävs ID-handling vid entrén?",
        answer: "Ja, i enlighet med italiensk lagstiftning måste du visa giltigt pass eller nationellt ID-kort som överensstämmer exakt med namnet på din biljetthandling."
      }
    ]
  },
  "psg": {
    name: "Paris Saint-Germain",
    stadiumName: "Parc des Princes",
    logo: "/logos/psg.png",
    stadiumDescription: "Parc des Princes är en av Europas mest ikoniska och arkitektoniskt unika fotbollsarenor, belägen i det eleganta 16:e arrondissementet i sydvästra Paris. Arenan rymmer drygt 47 000 åskådare och är känd för sin kompakta, 'betong-vågs'-design från 1970-talet som kapslar in ljudet fantastiskt väl. Till skillnad från många andra storklubbars hemmaplaner ligger läktarna tätt intill gräset, vilket skapar en mycket intensiv, högljudd och intim atmosfär där stjärnspäckad fotboll möter den franska huvudstadens pulserande supporterkultur.",
    location: "Paris, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Upplev PSG live på Parc des Princes. Jämför priser för officiella biljetter och kompletta fotbollsresor till Ligue 1 och Champions League i Paris.",
    heroImage: "/stadiums/parc-des-princes-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/parc-des-princes-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Parc+des+Princes,+Paris&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Trycket på PSG-biljetter är enormt och arenan är i regel slutsåld till varje hemmamatch. Klubben säljer biljetter via sin officiella hemsida och sin andrahandsplattform Ticketplace, men priserna kan stiga kraftigt. För tillresande fotbollsfans rekommenderas det starkt att boka auktoriserade biljetter och färdiga matchpaket via biljetterfotboll.se för att säkra bra platser bredvid varandra utan krångel.",
    sectionsAndPrices: "Arenan består av två huvudvåningar. Virage Auteuil (den södra kortsidan) är supporterskapets absoluta bultande hjärta där klubbens mest passionerade ultras (Collectif Ultras Paris) står för sång och tifo hela matchen. Virage Boulogne (norra kortsidan) är också stämningsfull. För bästa sikt över det taktiska spelet rekommenderas platser på långsidorna Tribune Borelli (huvudläktaren) eller Tribune Paris.",
    packages: "Skapa den ultimata fotbolls- och storstadshelgen i ljusets stad. Våra paketresor inkluderar garanterade matchbiljetter på Parc des Princes samt boende på handplockade hotell i centrala Paris. Kombinera världsfotboll med besök vid Eiffeltornet, Louvren och middagar på klassiska franska bistror.",
    history: "Paris Saint-Germain grundades 1970 efter en sammanslagning av Paris FC och Stade Saint-Germain. Trots sin unga ålder i jämförelse med andra europeiska giganter har PSG växt till Frankrikes mest framgångsrika klubb någonsin. Efter ägarbytet 2011 har klubben dominerat fransk fotboll med ett enormt antal ligatitlar och huserat några av världens största fotbollsstjärnor genom tiderna, såsom Zlatan Ibrahimović, Ronaldinho, George Weah, Kylian Mbappé, Neymar och Lionel Messi.",
    faqs: [
      {
        question: "Hur tar man sig lättast till Parc des Princes?",
        answer: "Det smidigaste sättet är att ta tunnelbanan. Linje 9 tar dig till stationen 'Porte de Saint-Cloud' (några minuters promenad från arenan) eller linje 10 till stationen 'Porte d'Auteuil'."
      },
      {
        question: "Behöver jag skriva ut biljetten?",
        answer: "Nej, PSG använder helt digitala biljetter i sin officiella app eller som e-pass för mobilen som skannas direkt vid vändkorsen."
      },
      {
        question: "Vilken är den mest stämningsfulla läktaren?",
        answer: "Virage Auteuil är sektionen där PSG:s aktiva supportergrupper står och skapar hela stadions atmosfär."
      }
    ]
  },

  "strasbourg": {
    name: "RC Strasbourg",
    stadiumName: "Stade de la Meinau",
    logo: "/logos/strasbourg.png",
    stadiumDescription: "Stade de la Meinau är en genuint klassisk fransk fotbollsborg belägen i hjärtat av Alsace. Arenan rymmer drygt 26 000 åskådare och är känd för att hysa en av Frankrikes mest lojala och högljudda supporterskaror. Oavsett om klubben spelat i högstaligan eller kämpat sig tillbaka från lägre divisioner fylls 'La Meinau' till sista plats av passionerade Alsace-bor. Den täta och kompakta byggnationen ger en otrolig närhet till planen och en genuint folklig fotbollsupplevelse.",
    location: "Strasbourg, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Upplev den fantastiska stämningen på Stade de la Meinau. Jämför biljetter och fotbollsresor för att se Racing Club de Strasbourg Alsaces hemamatcher i Ligue 1.",
    heroImage: "/stadiums/la-meinau-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/la-meinau-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+de+la+Meinau,+Strasbourg&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Eftersom Strasbourg har en enormt hög andel säsongskortsinnehavare säljs de kvarvarande lösbiljetterna ofta slut väldigt snabbt på klubbens officiella hemsida. För tillresande svenskar rekommenderas att boka officiella matchbiljetter och hotellpaket i god tid via biljetterfotboll.se för att garantera platser till matchen.",
    sectionsAndPrices: "Arenan är indelad i Tribune Sud (Huvudläktaren), Tribune Nord (Långsidan), Tribune Ouest (Västra kortsidan) och Tribune Est (Östra kortsidan). Tribune Ouest är hem för klubbens mest fanatiska ultras (Ultra Boys 90) som skapar ett enormt tryck, medan Tribune Sud och Nord erbjuder den bästa vinkeln över matchen.",
    packages: "Strasbourg är en av Europas vackraste och mest romantiska städer, känd för sina bindingsverkshus i 'La Petite France', sin fantastiska katedral och sin unika tysk-franska matkultur. Våra matchpaket inkluderar garanterade biljetter på Stade de la Meinau samt hotellövernattning på utvalda hotell i centrala Strasbourg.",
    history: "Racing Club de Strasbourg Alsace grundades 1906. Klubben har en färgstark historia som speglar regionens skiftande tillhörighet och vann den franska ligatiteln 1979. Strasbourg har också vunnit franska cupen (Coupe de France) tre gånger och Coupe de la Ligue tre gånger (senast 2019). Efter en ekonomisk omstart i lägre divisioner under 2010-talet gjorde laget en osannolik klättring tillbaka till Ligue 1.",
    faqs: [
      {
        question: "Hur tar man sig till Stade de la Meinau?",
        answer: "Arenan ligger cirka 2 km söder om stadens centrum. Det enklaste sättet är att ta spårvagn linje A eller E direkt till hållplatsen 'Krimmeri - Stade de la Meinau'."
      },
      {
        question: "Vad kännetecknar fotbollskulturen i Strasbourg?",
        answer: "Publiken i Strasbourg räknas som en av de mest trogna och passionerade i hela Frankrike, med en stark lokal identitet förankrad i regionen Alsace."
      },
      {
        question: "Behöver jag ID för att komma in?",
        answer: "Det är alltid bra att ha med giltigt ID/pass då stickprovskontroller kan förekomma vid entréerna."
      }
    ]
  },

  "lille": {
    name: "Lille OSC",
    stadiumName: "Stade Pierre-Mauroy",
    logo: "/logos/lille.png",
    stadiumDescription: "Stade Pierre-Mauroy (belägen i förorten Villeneuve-d'Ascq) är ett futuristiskt och multisporttekniskt mästerverk i norra Frankrike. Arenan öppnade 2012 och rymmer drygt 50 000 åskådare. Dess mest kända funktion är det gigantiska öppningsbara taket som kan stängas på bara 30 minuter, samt att halva gräsmattan kan lyftas upp för att förvandla arenan till en inomhusarena för konsert- och basketbollevenemang. Här får du en toppmodern, bekväm och garanterat väderskyddad fotbollsupplevelse i världsklass.",
    location: "Lille, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Säkra biljetter till Lille OSC på spektakulära Stade Pierre-Mauroy. Jämför priser på matchbiljetter och paketresor till Ligue 1 och Europaspel.",
    heroImage: "/stadiums/stade-pierre-mauroy.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/stade-pierre-mauroy.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Pierre-Mauroy,+Villeneuve-d%27Ascq&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Biljetter säljs smidigt via Lille OSC:s officiella hemsida för de flesta ligamatcher. Vid stormatcher mot PSG, Lens (Det nordfranska derbyt 'Derby du Nord') eller i europeiska cupspel är efterfrågan mycket hög. Genom att boka verifierade biljetter och fotbollspaket på biljetterfotboll.se säkrar du dina platser enkelt i förväg.",
    sectionsAndPrices: "Stadion är uppdelad i 4 huvudsektioner: Virage Nord, Virage Sud, Tribune Est och Tribune Ouest. Virage Nord (Section DVE - Dogues Virage Est) är hemmalagets ultras-sektion där stämningen hålls igång oavbrutet. Långsidorna (Est och Ouest) erbjuder perfekt sikt över spelet och hög komfort på samtliga etage.",
    packages: "Lille är en charmig nordeuropeisk stad med flamländskt präglad arkitektur, fantastiska torg (som Grand Place) och ett utmärkt utbud av bryggerier och gastronomi. Våra fotbollspaket inkluderar officiell matchbiljett samt hotellboende i centrala Lille.",
    history: "Lille Olympique Sporting Club grundades 1944 efter en sammanslagning av två lokala klubbar. Lille kallas för 'Les Dogues' (BULLDOGGARNA) och har vunnit den franska ligatiteln 4 gånger (senast 2021 då man snuvade PSG på titeln), samt franska cupen 6 gånger. Klubben är känd för sin fantastiska akademi och talangutveckling som fostrat stjärnor som Eden Hazard.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Pierre-Mauroy från centrala Lille?",
        answer: "Ta tunnelbanans linje 1 från stationen Lille Flandres till stationen 'Cité Scientifique - Professeur Ratez' eller '4 Cantons - Stade Pierre-Mauroy'. Därifrån är det cirka 5–10 minuters promenad till stadion."
      },
      {
        question: "Vad kallas stadsderbyt mot RC Lens?",
        answer: "Det laddade mötet mellan Lille och grannen Lens kallas 'Derby du Nord' och är ett av de mest passionerade lokalderbyna i fransk fotboll."
      },
      {
        question: "Är arenan uppvärmd?",
        answer: "När det skjutbara taket stängs vid dåligt eller kallt väder kan klimatsystemet hålla en behaglig innetemperatur."
      }
    ]
  },

  "marseille": {
    name: "Olympique de Marseille",
    stadiumName: "Stade Vélodrome",
    logo: "/logos/marseille.png",
    stadiumDescription: "Orange Vélodrome i hamnstaden Marseille är ett legendariskt fotbollstempel och en av världens mest spektakulära idrottsarenor. Med sin böljande vita takkonstruktion och en kapacitet på över 67 000 åskådare är det Frankrikes största klubblagsarena. Atmosfären här är legendarisk – sydfransk passion, enorma tifo-arrangemang och ett tryck från läktarna som får hela stadion att skaka när 'OM' kliver ut på gräset. Ett besök på Vélodrome är en rå och oförglömlig supporterupplevelse.",
    location: "Marseille, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Upplev magin och vulkanutbrottet på Stade Vélodrome. Jämför priser för biljetter och matchresor till Olympique de Marseille i Ligue 1 och Europa.",
    heroImage: "/stadiums/stade-velodrome-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/stade-velodrome-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Orange+Velodrome,+Marseille&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Trycket på biljetter i Marseille är enormt och arenan säljer ofta slut. Lösbiljetter släpps via OM:s officiella biljettportal, men för det brännheta hatmötet mot PSG ('Le Classique') eller stormatcher i Europa är biljetterna nästintill omöjliga att få tag på utanför medlemsleden. Boka verifierade biljetter och fotbollspaket i förväg via biljetterfotboll.se för en garanterad plats.",
    sectionsAndPrices: "Arenan domineras av sina två ikoniska kortsidor: Virage Sud (Virage Chevalier Roze) och Virage Nord (Virage Patrice de Peretti) där klubbens berömda supportergrupper (som Commando Ultra 84 och South Winners) skapar ett sanslöst tryck. För besökare som vill ha den bästa mixen av atmosfär, komfort och utmärkt sikt rekommenderas långsidorna Tribune Jean Bouin eller Tribune Ganay.",
    packages: "Marseille är en levande, mångkulturell och färgstark hamnstad vid Medelhavet. Våra matchpaket inkluderar officiell matchbiljett på Stade Vélodrome och hotellövernattning på utvalda hotell i centrala Marseille (t.ex. vid den gamla hamnen, Vieux-Port). Njut av färsk fisk och skaldjur, sol och spänningsfylld toppfotboll.",
    history: "Olympique de Marseille grundades 1899 och har den mest stolta supportertraditionen i Frankrike. OM är den enda franska klubben som har vunnit UEFA Champions League (1993 efter finalseger mot AC Milan). Klubben har dessutom vunnit den franska ligatiteln 9 gånger och franska cupen 10 gånger, och har representerats av ikoner som Jean-Pierre Papin, Didier Deschamps, Eric Cantona och Dimitri Payet.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Vélodrome?",
        answer: "Det är extremt enkelt. Ta tunnelbanans linje 2 (M2) från centralstationen (Gare de Marseille-Saint-Charles) och gå av vid stationen 'Rond-Point du Prado' eller 'Sainte-Marguerite Dromel' som ligger precis vid arenan."
      },
      {
        question: "Vad kallas matchen mot Paris Saint-Germain?",
        answer: "Mötet mellan OM och PSG kallas 'Le Classique' och är det största, mest laddade och mest bittra rivalmötet i fransk fotboll."
      },
      {
        question: "Kan man gå på rundtur på arenan?",
        answer: "Ja, OM Tour erbjuder guidade turer där du får besöka omklädningsrummen, spelartunneln och pressrummet."
      }
    ]
  },

  "nice": {
    name: "OGC Nice",
    stadiumName: "Allianz Riviera",
    logo: "/logos/nice.png",
    stadiumDescription: "Allianz Riviera är en modern, ljus och miljövänlig fotbollsarena belägen i Saint-Isidore i västra Nice. Arenan invigdes inför EM 2016 och rymmer drygt 36 000 åskådare. Med sin trä- och stålkonstruktion samt solpaneler på taket är den en av Europas mest hållbara idrottsanläggningar. Läktarna är byggda tätt intill planen och skapar en fantastisk stämning där sydfransk fotbollspassion möter den eleganta atmosfären från Franska rivieran.",
    location: "Nice, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Boka biljetter till OGC Nice på Allianz Riviera. Jämför priser på matchbiljetter och paketresor till den franska rivieran.",
    heroImage: "/stadiums/allianz-riviera.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/allianz-riviera.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Allianz+Riviera,+Nice&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Biljetter till OGC Nice hemmamatcher kan köpas online via klubbens officiella biljettsida. Tillgängligheten är i regel god till vanliga seriematcher, men vid derbyt mot AS Monaco eller matcher mot PSG rekommenderas det att boka säkra biljetter och hotellpaket i god tid via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan består av Tribune Garibaldi (Östra långsidan), Tribune Ségurane (Västra huvudläktaren), Tribune Ray (Södra kortsidan) och Tribune Populaire Sud. Tribune Populaire Sud är hem för klubbens mest högljudda och engagerade klack ('Populaire Sud') som står för sångerna och stämningen. Långsidorna ger en utmärkt vy över planen i en mycket bekväm miljö.",
    packages: "Kombinera fransk toppfotboll med en solig semester på Cote d'Azur. Våra paketresor inkluderar officiella matchbiljetter på Allianz Riviera samt boende på trevliga hotell i centrala Nice nära Promenade des Anglais och havet.",
    history: "Olympique Gymnaste Club Nice Côte d'Azur grundades 1904. Klubben hade sin guldålder under 1950-talet då man bärgade fyra franska ligatitlar och två cupguld. Med 'Örnen' som symbol har klubben på senare år etablerat sig i toppen av Ligue 1 och utmanat om europeiska cupplatser med profilstarka spelare och tränare.",
    faqs: [
      {
        question: "Hur tar man sig till Allianz Riviera från centrala Nice?",
        answer: "Det smidigaste sättet är att ta spårvagn linje 3 (Ligne 3) från flygplatsen eller stadens centrum direkt till hållplatsen 'Stade'."
      },
      {
        question: "Vad är klubbens maskot?",
        answer: "Klubbens symbol och maskot är en örn (Mèfi), och inför varje hemmamatch flyger en riktig örn över arenan och landar på mittcirkeln."
      },
      {
        question: "Hur långt i förväg bör jag boka min fotbollsresa?",
        answer: "Det är alltid bäst att boka 1–2 månader i förväg för att få bäst priser på flyg och hotell i Nice i kombination med biljetterna."
      }
    ]
  },
  "lyon": {
    name: "Olympique Lyonnais",
    stadiumName: "Groupama Stadium",
    logo: "/logos/lyon.png",
    stadiumDescription: "Groupama Stadium (även känd som Parc Olympique Lyonnais) är en av Europas mest spektakulära och moderna fotbollsarenor, belägen i Decines-Charpieu cirka 10 km öster om Lyons centrum. Arenan invigdes 2016 inför fotbolls-EM och rymmer drygt 59 000 åskådare. Med sin slående arkitektur, branta läktare och förstklassiga akustik är den byggd för att skapa en enorm ljudkuliss och ge optimal sikt från varje enskild sittplats.",
    location: "Lyon, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Upplev Olympique Lyonnais live på Groupama Stadium. Jämför priser för officiella matchbiljetter och prisvärda fotbollsresor till Ligue 1 och Europaspel.",
    heroImage: "/stadiums/groupama-stadium-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/groupama-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Groupama+Stadium,+Lyon&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Tillgängligheten på biljetter är överlag god för ordinarie seriematcher i Ligue 1 via OL:s officiella biljettsystem. Vid storkamper mot PSG, Marseille ('Choc des Olympiques') eller slutspelsmatcher i Europa kan trycket dock bli betydligt högre. Boka verifierade biljetter och hotellpaket tryggt via biljetterfotboll.se för en komplett och smidig upplevelse.",
    sectionsAndPrices: "Arenan har tre etage. Virage Nord (Virage Bad Gones) är hem för OL:s mest hängivna supportergrupp Bad Gones och bjuder på fantastisk stämning, medan Virage Sud är platsen för Lyon 1950. För familjer och besökare som söker bästa möjliga sikt rekommenderas platser på långsidorna Volée 1 eller Volée 2 (Tribune Jean Michel Aulas eller Tribune Lateral).",
    packages: "Lyon är Frankrikes kulinariska huvudstad och en fantastisk destination för fotbollsresor. Våra paketresor inkluderar officiell matchbiljett på Groupama Stadium samt övernattning på utvalda hotell i centrala Lyon. Njut av fransk gastronomi på klassiska 'Bouchons' och upplev toppfotboll i världsklass.",
    history: "Olympique Lyonnais grundades 1950 och är en av fransk fotbolls riktiga giganter. Klubben skapade fotbollshistoria under 2000-talets början då man vann Ligue 1 hela sju år i rad (2002–2008), ett rekord i fransk fotboll. Lyon är också känt för sin framgångsrika ungdomsakademi som fostrat stjärnor som Karim Benzema, Alexandre Lacazette och Juninho Pernambucano.",
    faqs: [
      {
        question: "Hur tar man sig lättast till Groupama Stadium?",
        answer: "På matchdagar går direktspårvagnar (Tramway T3 shuttle) direkt från stationerna Part-Dieu och Vaulx-en-Velin La Soie ända fram till arenans entré."
      },
      {
        question: "Finns det guidade turer på arenan?",
        answer: "Ja, OL Le Musée och stadionturer anordnas regelbundet där du får besöka omklädningsrummen, avbytarbänken och klubbens museum."
      },
      {
        question: "Vad kallas rivalmötet mot Marseille?",
        answer: "Mötet mellan Lyon och Olympique de Marseille kallas 'Choc des Olympiques' och är en av de mest laddade matcherna i fransk fotboll."
      }
    ]
  },

  "bayern-munchen": {
    name: "Bayern München",
    stadiumName: "Allianz Arena",
    logo: "/logos/bayern-munchen.png",
    stadiumDescription: "Allianz Arena i norra München är ett futuristiskt landmärke och en av världens mest kända idrottsarenor. Den invigdes 2005 och rymmer 75 000 åskådare. Arenan är världsberömd för sin unika fasad bestående av 2 874 uppblåsbara ETFE-plastkuddar som lyser upp i sprakande rött under Bayerns hemmamatcher. Invändigt skapar de branta läktarna en intensiv atmosfär med perfekt sikt oavsett var du sitter.",
    location: "München, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Säkra dina biljetter till FC Bayern München på Allianz Arena. Jämför priser på matchbiljetter och kompletta paketresor till Bundesliga och Champions League.",
    heroImage: "/stadiums/allianz-arena-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/allianz-arena-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.3!2d11.625!3d48.218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e74!2sAllianz%20Arena!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Att få tag på lösbiljetter direct via Bayern Münchens officiella medlemslottning är extremt svårt då nästan varje match är slutsåld månader i förväg. Genom biljetterfotboll.se kan du boka garanterade biljetter och hotellpaket från auktoriserade leverantörer för att säkra din plats på Allianz Arena utan krångel.",
    sectionsAndPrices: "Südkurve (Södra läktaren) är hjärtat av Bayerns supporterkultur där de mest passionerade ultras-grupperna står och skapar stämningen. Långsidorna Haupttribüne (Väst) och Gegentribüne (Öst) erbjuder enastående komfort och perfekt överblick över spelet.",
    packages: "Upplev den bayerska gästvänligheten, traditionsenliga biergartens och fotboll i absolut världsklass. Våra paketresor inkluderar matchbiljett på Allianz Arena samt boende på noggrant utvalda hotell i centrala München.",
    history: "FC Bayern München grundades 1900 och är Tysklands ohotat mest framgångsrika fotbollsklubb genom tiderna. Med över 30 Bundesliga-titlar, ett tiotal tyska cupguld och ett flertal Champions League-titlar har klubben ('Der Rekordmeister') etablerat sig som en av fotbollsvärldens absoluta giganter, med legender som Franz Beckenbauer, Gerd Müller, Karl-Heinz Rummenigge och Thomas Müller.",
    faqs: [
      {
        question: "Hur tar man sig till Allianz Arena?",
        answer: "Ta tunnelbanans linje U6 (U-Bahn) från centrala München (Marienplatz) norrut mot Garching-Forschungszentrum och gå av vid stationen 'Fröttmaning'. Promenaden från stationen till arenan tar cirka 10–15 minuter."
      },
      {
        question: "Betalar man med kontanter eller kort på arenan?",
        answer: "Allianz Arena är en helt kontantfri arena. Betalning i kioskerna sker enkelt med vanliga bankkort eller mobila betaltjänster (Apple Pay/Google Pay)."
      },
      {
        question: "Vad är 'Südkurve'?",
        answer: "Südkurve är den södra kortsidan där Bayerns mest engagerade och sjungande supporterskaror samlas."
      }
    ]
  },

  "borussia-dortmund": {
    name: "Borussia Dortmund",
    stadiumName: "Signal Iduna Park",
    logo: "/logos/borussia-dortmund.png",
    stadiumDescription: "Signal Iduna Park (klassiska Westfalenstadion) är en av fotbollsvärldens mest ikoniska och mäktiga katedraler. Med en kapacitet på hela 81 365 åskådare är det Tysklands största fotbollsarena. Arenans absoluta höjdpunkt är den södra läktaren – 'Südtribüne' eller 'Den gula väggen' (Die Gelbe Wand) – som utgör Europas största Ståplatsläktare med plats för nästan 25 000 stående fans som skapar ett mäktigt ljudhav.",
    location: "Dortmund, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Hitta biljetter till Borussia Dortmund på Signal Iduna Park. Jämför matchbiljetter och paketresor till Bundesliga och Champions League.",
    heroImage: "/stadiums/signal-iduna-park-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/signal-iduna-park-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5!2d7.452!3d51.492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b91a!2sSignal%20Iduna%20Park!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Eftersom BVB har över 55 000 säsongskortsinnehavare och 150 000 medlemmar säljs de få kvarvarande biljetterna slut på sekunder på den officiella hemsidan. För utländska besökare är det absolut säkraste och smidigaste sättet att boka auktoriserade matchbiljetter och paket via biljetterfotboll.se.",
    sectionsAndPrices: "Südtribüne (Södra läktaren) är ståplatsläktaren där 'Den gula väggen' skapas. För tillresande som föredrar sittplatser med spektakulär vy rekommenderas Osttribüne eller Westtribüne (långsidorna) samt Nordtribüne.",
    packages: "Upplev Ruhr-områdets enorma fotbollspassion. Våra matchpaket inkluderar garanterade biljetter på Signal Iduna Park samt hotellboende i centrala Dortmund.",
    history: "Borussia Dortmund grundades 1909 och har vuxit till en av Europas mest älskade fotbollsklubbar. BVB har vunnit Bundesliga 8 gånger, tyska cupen 5 gånger och Champions League 1997. Klubben är känd för sin 'Echte Liebe' (Äkta kärlek), sina gula och svarta färger samt sin förmåga att utveckla världsstjärnor.",
    faqs: [
      {
        question: "Hur tar man sig till Signal Iduna Park?",
        answer: "Ta spårvagn/tunnelbana (Stadtbahn) U45 eller U46 direkt till stationen 'Signal Iduna Park' eller 'Westfalenhallen'. Det går även lokaltåg till stationen 'Dortmund Signal-Iduna-Park'."
      },
      {
        question: "Vad är 'Den gula väggen'?",
        answer: "Det är smeknamnet på den legendariska södra läktaren (Südtribüne), som är Europas största sammanhängande ståplatsläktare med kapacitet för 24 454 åskådare."
      },
      {
        question: "Ingår lokaltrafik i biljettpriset?",
        answer: "Ja, de flesta matchbiljetter fungerar som färdbevis (KombiTicket) på kollektivtrafiken i VRR-regionen på matchdagen."
      }
    ]
  },

  "bayer-leverkusen": {
    name: "Bayer Leverkusen",
    stadiumName: "BayArena",
    logo: "/logos/bayer-leverkusen.png",
    stadiumDescription: "BayArena är en ytterst modern, intim och välskött fotbollsarena belägen i Leverkusen, strax norr om Köln. Arenan har en kapacitet på drygt 30 000 åskådare och kännetecknas av sitt spektakulära cirkulära tak samt närheten mellan läktarna och gräsmattan. Här upplever du fotboll från första parkett i en familjär men samtidigt passionerad tysk fotbollsmiljö.",
    location: "Leverkusen, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Boka biljetter till Bayer 04 Leverkusen på BayArena. Jämför priser på matchbiljetter och paketresor till Bundesliga och Europaspel.",
    heroImage: "/stadiums/bayarena-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/bayarena-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.4!2d6.992!3d51.037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478546!2sBayArena!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Biljetter till Bayer Leverkusens hemmamatcher säljs via klubbens officiella biljettportal. För matcher mot Bayern München, Dortmund eller i slutspelsskeden kan trycket vara högt. Boka säkra biljetter och matchpaket enkelt via biljetterfotboll.se.",
    sectionsAndPrices: "Nordkurve är hemmalagets klacksektion där stämningen är som högst. Långsidorna (West- och Osttribüne) har enastående sikt över hela spelfältet och erbjuder utmärkt komfort.",
    packages: "Våra matchpaket erbjuder officiella biljetter till BayArena samt hotellboende i antingen Leverkusen eller i den närliggande storstaden Köln, vilket gör resan perfekt för att kombinera fotboll med tysk storstads- och bryggerikultur.",
    history: "Bayer 04 Leverkusen grundades 1904 av anställda på kemiföretaget Bayer AG. Klubben, som länge kallades 'Werkself' (Fabrikslaget), har skrivit ny historia under ledning av Xabi Alonso med historiska Bundesliga-titlar och cupframgångar. Tidigare meriter inkluderar seger i UEFA-cupen 1988 och en finalplats i Champions League 2002.",
    faqs: [
      {
        question: "Hur tar man sig till BayArena?",
        answer: "Det enklaste sättet är att ta pendeltåg (S-Bahn S6) eller regionaltåg (RE1/RE5) till stationen 'Leverkusen Mitte'. Därifrån är det cirka 10–15 minuters promenad till arenan."
      },
      {
        question: "Varför kallas laget för 'Die Werkself'?",
        answer: "Smeknamnet grundar sig i att klubben från början bildades av fabriksarbetare på läkemedels- och kemijätten Bayer AG."
      },
      {
        question: "Kan man bo i Köln under matchresan?",
        answer: "Ja, det är mycket populärt då Köln bara ligger 15 minuter bort med tåg och erbjuder ett enormt utbud av hotell, restauranger och sevärdheter."
      }
    ]
  },

  "eintracht-frankfurt": {
    name: "Eintracht Frankfurt",
    stadiumName: "Deutsche Bank Park",
    logo: "/logos/eintracht-frankfurt.png",
    stadiumDescription: "Deutsche Bank Park (historiskt känd som Waldstadion) ligger inbäddad i Frankfurts stadsskog och rymmer 58 000 åskådare. Arenan är känd för sitt gigantiska ihopfällbara tak och framför allt för sin elektriska stämning. Frankfurts fans räknas till de mest färgstarka och högljuda i hela Europa, och arenan förvandlas regelbundet till ett hav av flaggor, sång och storslagna tifo-arrangemang.",
    location: "Frankfurt, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Köp biljetter till Eintracht Frankfurt på Deutsche Bank Park. Jämför matchbiljetter och paketresor till Bundesliga och Europa League/Champions League.",
    heroImage: "/stadiums/deutsche-bank-park-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/deutsche-bank-park-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.8!2d8.645!3d50.068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0b!2sDeutsche%20Bank%20Park!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Eintracht Frankfurt har en enormt stor och lojal supporterbas vilket gör att matcher ofta blir utsålda snabbt. Biljetter släpps i första hand till medlemmar. För att säkra garanterade sittplatser rekommenderas det att boka paketresor via biljetterfotboll.se.",
    sectionsAndPrices: "Nordwestkurve är den legendariska kortsidan där klubbens mest passionerade supportergrupper står samlade. Huvudläktaren (Haupttribüne) och Osttribüne erbjuder bästa sikt och komfort för dig som vill följa det taktiska spelet.",
    packages: "Kombinera finanshuvudstadens skyskrapor och mysiga 'Apfelwein'-krogar med passionerad tysk fotboll. Våra paketresor inkluderar officiella matchbiljetter på Deutsche Bank Park och boende på hotell i centrala Frankfurt.",
    history: "Eintracht Frankfurt grundades 1899 och är en av de ursprungliga medlemmarna i Bundesliga. Klubben vann UEFA-cupen 1980 och Europa League 2022 efter en historisk supporterinvasion runtom i Europa. Eintracht har också vunnit DFB-Pokal fem gånger.",
    faqs: [
      {
        question: "Hur tar man sig till Deutsche Bank Park?",
        answer: "Ta pendeltåg (S-Bahn S8 eller S9) från Frankfurt Hauptbahnhof mot Mainz/Wiesbaden och gå av vid stationen 'Frankfurt am Main Stadion'."
      },
      {
        question: "Vad är klubbens maskot?",
        answer: "Klubbens maskot är en levande stenörn som heter Attila och som visas upp på planen före varje hemmamatch."
      },
      {
        question: "Vad är 'Nordwestkurve'?",
        answer: "Nordwestkurve är den ikoniska supporterläktaren på Deutsche Bank Park där Frankfurts fantastiska tifo-kultur har sitt centrum."
      }
    ]
  },
  "stuttgart": {
    name: "VfB Stuttgart",
    stadiumName: "MHPArena",
    logo: "/logos/stuttgart.png",
    stadiumDescription: "MHPArena (tidigare Mercedes-Benz Arena) ligger i hjärtat av Stuttgarts sportområde Bad Cannstatt. Arenan rymmer över 60 000 åskådare och genomgick en omfattande modernisering inför EM 2024. Med sina branta, toppmoderna läktare och bevarade historiska själ bjuder den på en mäktig och passionerad tysk fotbollsupplevelse med oslagbar stämning.",
    location: "Stuttgart, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Säkra dina biljetter till VfB Stuttgart på MHPArena. Jämför priser för officiella matchbiljetter och kompletta paketresor till Bundesliga och Europaspel.",
    heroImage: "/stadiums/mhp-arena-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/mhp-arena-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.7!2d9.233!3d48.792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799c8!2sMHPArena!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Biljetter släpps via VfB Stuttgarts officiella biljettportal, men trycket är väldigt högt till toppmatcher mot till exempel Bayern München eller Borussia Dortmund. Boka verifierade biljetter och matchpaket tryggt och enkelt i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Cannstatter Kurve (norra kortsidan) är hem för klubbens mest lojala supporters och ultras som skapar ett konstant stämningshav. För bästa vy över spelet rekommenderas sittplatser på långsidorna Haupttribüne eller EnBW-Tribüne.",
    packages: "Utforska bilstaden Stuttgart, känd för sina Mercedes-Benz- och Porsche-museer samt sin stolta schwabiska matkultur. Våra fotbollspaket inkluderar officiell matchbiljett på MHPArena samt boende på noggrant utvalda hotell i centrala Stuttgart.",
    history: "VfB Stuttgart grundades 1893 och är en av Tysklands mest anrika fotbollsklubbar. Klubben har blivit tyska mästare fem gånger (senast 2007) och vunnit DFB-Pokal tre gånger. Stuttgart har genom åren fostrat giganter som Jürgen Klinsmann, Sami Khedira och Mario Gómez.",
    faqs: [
      {
        question: "Hur tar man sig lättast till MHPArena?",
        answer: "Ta pendeltåg (S-Bahn S1) till stationen 'Neckarpark' eller spårvagn (U-Bahn U11) direkt till 'Neckarpark (Stadion)'."
      },
      {
        question: "Vad heter hemmalagets kända supporterläktare?",
        answer: "Supporterläktaren kallas 'Cannstatter Kurve' och är känd för sina storslagna tifo-arrangemang och högljuda sång."
      },
      {
        question: "Kan man kombinera resan med bilmuseer?",
        answer: "Ja, Mercedes-Benz Museum ligger faktiskt precis intill arenan i Bad Cannstatt, vilket gör det perfekt att besöka innan match."
      }
    ]
  },

  "union-berlin": {
    name: "1. FC Union Berlin",
    stadiumName: "Stadion An der Alten Försterei",
    logo: "/logos/union-berlin.png",
    stadiumDescription: "Stadion An der Alten Försterei i Köpenick (östra Berlin) är en av fotbollsvärldens mest unika och kultförklarade arenor. Arenan rymmer ca 22 000 åskådare, varav över 18 000 är ståplatser. Den är till stor del handbyggd av klubbens egna supportermedlemmar. Omringad av skog och med en genuin, kompromisslös fotbollskultur bjuder 'Alte Försterei' på en elektrisk, rå och ojämförbar läktarupplevelse.",
    location: "Berlin, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Upplev den unika atmosfären på Stadion An der Alten Försterei. Jämför priser för biljetter och fotbollsresor till 1. FC Union Berlin i Bundesliga.",
    heroImage: "/stadiums/union-berlin-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/union-berlin-hero.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.4!2d13.568!3d52.457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84c!2sStadion%20An%20der%20Alten%20Försterei!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Biljettsläppen till Unions hemmamatcher är enormt eftertraktade och nästan uteslutande reserverade för klubbmedlemmar via lottning. Att få tag på lösbiljetter på egen hand är mycket svårt. Boka auktoriserade biljetter och matchpaket i god tid via biljetterfotboll.se för att säkra din plats.",
    sectionsAndPrices: "Arenan domineras av sina tre stora ståplatsläktare (Sektor 2, 3 och 4) där fansen står skuldra mot skuldra och sjunger oavbrutet i 90 minuter. Sektor 1 (Huvudläktaren) erbjuder bekväma sittplatser med perfekt överblick över planen.",
    packages: "Upplev kontrasternas Berlin – från pulserande storstadsliv och kultur till den genuint jordnära fotbollskulturen i Köpenick. Våra paketresor inkluderar officiell matchbiljett och boende på hotell i centrala Berlin.",
    history: "1. FC Union Berlin har rötter från 1906 och en stolt historia som en kultklubb med starka arbetarrötter i Östberlin. Klubben har gjort en osannolik resa från lägre divisioner till Bundesliga och Champions League, hela tiden med supporterskapet och den lokala gemenskapen i absolut centrum.",
    faqs: [
      {
        question: "Hur tar man sig till Stadion An der Alten Försterei?",
        answer: "Ta S-Bahn (linje S3) till stationen 'Köpenick'. Därifrån är det cirka 10–15 minuters naturskön promenad genom skogen till arenan."
      },
      {
        question: "Stämmer det att fansen byggde arenan?",
        answer: "Ja, under 2008 och 2009 lade över 2 300 supportermedlemmar ner mer än 140 000 arbetstimmar av ideellt arbete för att renovera och bygga om stadion."
      },
      {
        question: "Finns det mest ståplatser på arenan?",
        answer: "Ja, över 80 % av arenans kapacitet består av ståplatser, vilket skapar en otroligt tät och gemensam atmosfär."
      }
    ]
  },

  "ajax": {
    name: "Ajax",
    stadiumName: "Johan Cruyff Arena",
    logo: "/logos/ajax.png",
    stadiumDescription: "Johan Cruyff ArenA i Amsterdam är Nederländernas största och mest ikoniska fotbollsarena med en kapacitet på drygt 55 000 åskådare. Arenan invigdes 1996 och är uppkallad efter klubbens och holländsk fotbolls genom tiderna största legendar, Johan Cruijff. Med sitt öppningsbara tak och sina mäktiga, branta läktare erbjuder arenan en modern fotbollsupplevelse fylld av tradition, passion och världskänd 'Totalfotboll'.",
    location: "Amsterdam, Nederländerna",
    league: "Eredivisie",
    aboutTickets: "Boka biljetter till AFC Ajax på Johan Cruyff Arena. Jämför priser på matchbiljetter och paketresor för Eredivisie och Europamatcher i Amsterdam.",
    heroImage: "/stadiums/johan-cruyff-arena-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/johan-cruyff-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Johan+Cruijff+ArenA,+Amsterdam&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Biljetter till Ajax matcher säljs via den officiella hemsidan, men för stormatcher mot PSV, Feyenoord ('De Klassieker') eller i europeiska cuper säljer biljetterna slut blixtsnabbt. Säkra din matchbiljett och boende smidigt via biljetterfotboll.se.",
    sectionsAndPrices: "Södra läktaren (Vak 410 och F-Side) är känd för sina högljuda supportergrupper som skapar inramningen och stämningen på arenan. För perfekt panoramavy rekommenderas platser på långsidorna (Main Stand eller East Stand) på etage 1 eller 2.",
    packages: "Upplev Amsterdams berömda kanaler, museum och nattliv i kombination med holländsk fotboll i absolut världsklass. Våra matchpaket inkluderar verifierade biljetter på Johan Cruyff Arena samt hotellövernattning i centrala Amsterdam.",
    history: "AFC Ajax grundades 1900 och är Nederländernas mest framgångsrika klubb någonsin. Med 4 Champions League/Europacuptitlar och över 35 Eredivisie-titlar har klubben fostrat några av fotbollshistoriens största talanger genom sin världsberömda akademi De Toekomst, däribland Johan Cruyff, Marco van Basten, Dennis Bergkamp och Zlatan Ibrahimović.",
    faqs: [
      {
        question: "Hur tar man sig till Johan Cruyff Arena?",
        answer: "Det enklaste sättet är att ta tunnelbana (Metro 54) från Amsterdam Centraal till stationen 'Bijlmer ArenA' eller 'Strandvliet', som ligger precis vid arenan."
      },
      {
        question: "Vad kallas derbyt mot Feyenoord?",
        answer: "Mötet mellan Ajax och Feyenoord från Rotterdam kallas 'De Klassieker' och är det absolut största och mest intensivt laddade rivalmötet i Nederländerna."
      },
      {
        question: "Kan man boka stadionrundtur?",
        answer: "Ja, Ajax Stadium Tour anordnas dagligen där man får se omklädningsrummen, avbytarbänkarna och klubbens storslagna troférum."
      }
    ]
  },

  "psv": {
    name: "PSV Eindhoven",
    stadiumName: "Philips Stadion",
    logo: "/logos/psv.png",
    stadiumDescription: "Philips Stadion är en intim, stämningsfull och historisk fotbollsarena belägen mitt i centrala Eindhoven. Arenan rymmer 35 000 åskådare och ligger på exakt samma plats där klubben bildades 1913. Med läktare som sträcker sig helt intill linjerna och hörnpelare som kapslar in ljudet får besökaren en extremt nära och intensiv fotbollsupplevelse.",
    location: "Eindhoven, Nederländerna",
    league: "Eredivisie",
    aboutTickets: "Upplev PSV Eindhoven live på Philips Stadion. Jämför priser för officiella matchbiljetter och hotellpaket till Eredivisie och Champions League.",
    heroImage: "/stadiums/philips-stadion-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/philips-stadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Philips+Stadion,+Eindhoven&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Biljetter finns ofta tillgängliga för seriematcher via PSV:s officiella kanal, men vid storkamper mot Ajax eller Feyenoord blir det snabbt slutsålt. Boka garanterade biljetter och kompletta fotbollspaket tryggt via biljetterfotboll.se.",
    sectionsAndPrices: "Oost-tribüne (Östra läktaren) är hjärtat av PSV:s supporterkultur där klubbens mest engagerade ultras står samlade. Huvudläktaren (Zuid-tribüne) och Noord-tribüne erbjuder högsta komfort och perfekt vinkel över planen.",
    packages: "Utforska design- och teknikstaden Eindhoven. Våra paketresor inkluderar officiella matchbiljetter på Philips Stadion samt kvalitetshotell belägna i centrala Eindhoven med gångavstånd till både stationen och arenan.",
    history: "PSV (Philips Sport Vereniging) grundades 1913 som en idrottsförening för anställda på elektronikjätten Philips. Klubben har växt till en europeisk storklubb med seger i Europacupen 1988 och UEFA-cupen 1978, samt ett 20-tal Eredivisie-titlar. Ikoner som Romário, Ronaldo, Ruud van Nistelrooy och Arjen Robben har slagit igenom i klubben.",
    faqs: [
      {
        question: "Ligger Philips Stadion centralt?",
        answer: "Ja, arenan ligger unikt nog mitt i stan och det tar bara cirka 5–10 minuter att gå direkt från Eindhovens centralstation."
      },
      {
        question: "Vad kännetecknar Philips Stadion?",
        answer: "Dess intima utformning där läktarna sitter alldeles intill spelfältet, vilket skapar en otroligt nära matchkänsla för alla åskådare."
      },
      {
        question: "Vad är 'De Topper'?",
        answer: "Det kallas det klassiska stormötet mellan PSV Eindhoven och Ajax."
      }
    ]
  },
  "feyenoord": {
    name: "Feyenoord",
    stadiumName: "De Kuip",
    logo: "/logos/feyenoord.png",
    stadiumDescription: "Stadion Feijenoord, mer känd som De Kuip ('Bunken'), är en av fotbollsvärldens mest ikoniska och stämningsfulla arenor. Arenan invigdes 1937 i Rotterdam och rymmer drygt 51 000 åskådare. Med sin klassiska stålkonstruktion och branta läktare etage på etage skapas en elektrisk och rå atmosfär där hela stadion bokstavligen gungar när hemmafansen sätter igång sina sånger. Att uppleva en match på De Kuip är en ren och oslipad fotbollsdröm.",
    location: "Rotterdam, Nederländerna",
    league: "Eredivisie",
    aboutTickets: "Upplev den obeskrivliga stämningen på De Kuip. Jämför priser på officiella matchbiljetter och paketresor för Feyenoord i Eredivisie och Europaspel.",
    heroImage: "/stadiums/de-kuip-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/de-kuip-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadion+Feijenoord,+Rotterdam&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Trycket på Feyenoords hemmamatcher är enormt och de flesta ligamatcher säljer slut snabbt till klubbens medlemmar. Särskilt 'De Klassieker' mot rivalen Ajax kräver förbokning långt i förväg. För att säkra garanterade platser och en smidig resa rekommenderas det att boka auktoriserade biljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Södra och norra kortsidorna (Gerard Meijer Tribune / Het Legioen) är hjärtat av klubbens supporterkultur där de mest passionerade klackarna står samlade. För fantastisk panoramavy över hela händelseförloppet rekommenderas platser på långsidorna Olympiatribune eller Maastribune.",
    packages: "Upplev arkitektur- och hamnstaden Rotterdam kombinerat med holländsk toppfotboll. Våra matchpaket inkluderar officiell matchbiljett på De Kuip samt boende på utvalda hotell i centrala Rotterdam.",
    history: "Feyenoord grundades 1908 och är en av Nederländerna tre stora giganter. Klubben blev 1970 den första holländska klubben att vinna Europacupen (Champions League) och har dessutom vunnit UEFA-cupen två gånger samt över 15 Eredivisie-titlar. Klubben är känd för sin starka arbetarklassidentitet och sina extremt lojala supportrar som kallas 'Het Legioen'.",
    faqs: [
      {
        question: "Hur tar man sig till De Kuip?",
        answer: "Det smidigaste sättet är att ta spårvagn (linje 23) från Rotterdam Centraal direkt till hållplatsen 'Stadion Feijenoord', eller ta lokaltåg till stationen 'Rotterdam Stadion' på matchdagar."
      },
      {
        question: "Vad kallas Feyenoords supportrar?",
        answer: "Feyenoords kollektiva supporterskara kallas 'Het Legioen' (Legionen) och bär tröjnummer 12 som klubben har pensionerat till deras ära."
      },
      {
        question: "Vad är 'De Klassieker'?",
        answer: "Det är namnet på det extremt laddade hatmötet mellan Feyenoord och erkerivalen Ajax från Amsterdam."
      }
    ]
  },

  "twente": {
    name: "FC Twente",
    stadiumName: "De Grolsch Veste",
    logo: "/logos/twente.png",
    stadiumDescription: "De Grolsch Veste i Enschede är en toppmodern, färgstark och extremt välbesökt fotbollsarena med plats för cirka 30 000 åskådare. Arenan invigdes 1998 och har byggts ut i flera etapper med branta, heltäckande läktare som kramar om planen. Stämningen i regionen Twente är känd för att vara genuint varm och lojal, vilket gör varje hemmamatch till en röd och högljudd fotbollsfest.",
    location: "Enschede, Nederländerna",
    league: "Eredivisie",
    aboutTickets: "Boka biljetter till FC Twente på De Grolsch Veste. Jämför priser för matchbiljetter och paketresor till Eredivisie och europeiska cupmatcher.",
    heroImage: "/stadiums/de-grolsch-veste-hero.jpg",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "/stadiums/de-grolsch-veste-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=De+Grolsch+Veste,+Enschede&t=&z=16&ie=UTF8&iwloc=&output=embed",
    howToBuy: "Biljetter säljs via FC Twentes officiella biljettsystem. Eftersom klubben har en väldigt hög beläggning på sina hemmamatcher är det klokt att boka i förväg. För tillresande fotbollsfans erbjuds smidiga och garanterade biljetter i kombination med hotell via biljetterfotboll.se.",
    sectionsAndPrices: "Vak P (på kortsidan) är klubbens berömda och stämningsskapande supportersektion där sångerna studsar mellan läktarväggarna. Huvudläktaren (Hoofdtribune) och Diekman-tribüne på långsidorna erbjuder enestående komfort och perfekt sikt över hela spelfältet.",
    packages: "Upplev den genuina nederländska fotbollskulturen i Enschede. Våra matchpaket inkluderar officiell matchbiljett på De Grolsch Veste samt boende på trevliga hotell i centrala Enschede.",
    history: "FC Twente bildades 1965 genom en sammanslagning av Sportclub Enschede och Enschedese Boys. Klubbens absoluta höjdpunkt kom säsongen 2009/2010 då man under ledning av Steve McClaren vann sitt historiska första Eredivisie-guld. Twente har också vunnit den nederländska cupen (KNVB Beker) tre gånger.",
    faqs: [
      {
        question: "Hur tar man sig till De Grolsch Veste?",
        answer: "Arenan har ett eget tågstopp! Ta lokaltåget från centralstationen i Enschede och gå av vid stationen 'Enschede Kennispark', som ligger precis intill stadion."
      },
      {
        question: "Vad betyder arenans namn?",
        answer: "Namnet sponsras av det berömda lokala ölmärket Grolsch, som har sitt ursprung i regionen, och 'Veste' syftar på en fästning."
      },
      {
        question: "Vad heter FC Twentes mest kända supportergrupp?",
        answer: "Den mest kända supportergruppen och läktarsektionen kallas för 'Vak P'."
      }
    ]
  },
  "hull-city": {
    slug: "hull-city",
    name: "Hull City",
    league: "Premier League",
    stadiumName: "MKM Stadium",
    location: "Hull, England",
    logo: "/logos/hull-city.png",
    heroImage: "/stadiums/mkm-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/mkm-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=MKM+Stadium,+Hull&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "MKM Stadium (tidigare KC Stadium) belägen i West Park i Hull öppnade 2002 och rymmer drygt 25 500 åskådare. Arenan delas med rugbylaget Hull FC och erbjuder en modern, kompakt och trevlig matchupplevelse där läktarna ger utmärkt sikt över hela spelplanen.",
    aboutTickets: "Jämför biljetter till Hull City på MKM Stadium. Se prisvärda alternativ för matcher i engelska ligafotbollen och inhemska cuper.",
    howToBuy: "Biljetter till Hull City säljs i regel smidigt direkt via klubbens officiella biljettportal utan krångliga medlemskrav. För internationella besökare som vill boka i god tid eller säkra bra platser på långsida finns även auktoriserade biljetter och matchpaket tillgängliga via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan bestående av fyra fristående läktare: West Stand (huvudläktaren med spelargång och VIP), East Stand (långsidan mittemot), samt North Stand och South Stand (kortsidorna). Platser på kortsidorna erbjuder de lägsta priserna, medan långsidorna ger den bästa överblicken.",
    packages: "Kombinera din fotbollsresa till Yorkshire med ett prisvärt paket. I paketen ingår officiell matchbiljett på MKM Stadium samt boende på godkänt hotell i centrala Hull.",
    history: "Hull City AFC grundades 1904 och kallas populärt för 'The Tigers' på grund av sina karaktäristiska svartgula rändtröjor. Klubbens mest framgångsrika epok ägde rum under 2000- och 2010-talet med flera säsonger i Premier League samt en historisk FA-cupfinal 2014.",
    faqs: [
      {
        question: "Hur tar man sig till MKM Stadium?",
        answer: "Arenan ligger i West Park, cirka 20 minuters promenad från Hulls centralstation (Hull Paragon Interchange). Det går även regelbundna stadsbussar från centrum direkt till stadion."
      },
      {
        question: "Behöver jag vara medlem för att köpa biljetter?",
        answer: "Nej, till de flesta av Hull Citys hemmamatcher krävs inget medlemskap utan biljetter kan köpas på öppet släpp."
      }
    ]
  },

  "coventry": {
    slug: "coventry",
    name: "Coventry City",
    league: "Premier League",
    stadiumName: "Coventry Building Society Arena",
    location: "Coventry, England",
    logo: "/logos/coventry.png",
    heroImage: "/stadiums/coventry-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/coventry-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Coventry+Building+Society+Arena,+Coventry&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Coventry Building Society Arena (historiskt känd som Ricoh Arena) invigdes 2005 och rymmer drygt 32 600 åskådare. Arenan är en modern multianläggning belägen i norra Coventry som bjuder på fantastisk komfort, vidsträckta ytor och ett passionerat stöd från 'The Sky Blues' färgglada supporterskara.",
    aboutTickets: "Boka biljetter till Coventry City och upplev atmosfären på CBS Arena. Jämför priser för ligamatcher och cupkamper i England.",
    howToBuy: "Biljetter till Coventry City köps enklast via klubbens officiella hemsida. Vid populära helgmatcher och rivalmöten fylls läktarna snabbt, varför det är klokt att boka officiella e-biljetter i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan är uppdelad i Singer Stand (Östra långsidan), West Stand (Huvudläktaren med press och VIP), South Stand och Jewson Stand (Norra kortsidan där hemmalagets mest sjungande supportrar samlas). Priserna är generellt mycket överkomliga jämfört med storstads-klubbarna.",
    packages: "Våra matchpaket till Coventry inkluderar officiell biljett på CBS Arena samt boende på bekväma hotell i centrala Coventry eller nära arenan.",
    history: "Coventry City FC grundades 1883 som Singer FC. Klubbens absoluta höjdpunkt inträffade 1987 när man vann FA-cupen efter en klassisk och dramatisk 3-2-seger mot Tottenham Hotspur på Wembley Stadium. Klubben spelas traditionellt i himmelsblå tröjor.",
    faqs: [
      {
        question: "Hur tar man sig till Coventry Building Society Arena?",
        answer: "Arenan har en egen järnvägsstation, Coventry Arena, med direktförbindelse från Coventrys centralstation på bara 7 minuter. Det går även smidiga matchbussar från centrum."
      },
      {
        question: "Var ligger de mest stämningsfulla läktarna?",
        answer: "Hemmasupportrarna skapar den bästa stämningen på den norra kortsidan samt på Singer Stand."
      }
    ]
  },

  "nottingham": {
    slug: "nottingham",
    name: "Nottingham Forest",
    league: "Premier League",
    stadiumName: "City Ground",
    logo: "/logos/nottingham.png",
    heroImage: "/stadiums/city-ground-hero.jpg",
    stadiumLayoutImage: "/stadiums/city-ground-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=City+Ground,+Nottingham&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "City Ground är en ikonisk och anrik engelsk fotbollsborg belägen precis vid floden Trents norra strand. Arenan har varit Nottingham Forests hem sedan 1898 och rymmer drygt 30 000 åskådare. Att promenera över Trent Bridge på matchdagen och höra hela stadion stämma upp i 'Mull of Kintyre' innan avspark ger ren och skär gåshud.",
    aboutTickets: "Säkra biljetter till klassiska Nottingham Forest på City Ground. Jämför priser för Premier League-matcher och traditionstyngda engelska cupmöten.",
    howToBuy: "Trycket på biljetter på City Ground har varit enormt sedan återkomsten till Premier League och de flesta hemmamatcher säljer slut blixtsnabbt till klubbens medlemmar. För utländska besökare rekommenderas det starkt att boka auktoriserade biljetter och matchpaket via biljetterfotboll.se för garanterad plats.",
    sectionsAndPrices: "Arenan bestående av fyra karaktäristiska läktare: Trent End (den berömda kortsidan vid floden), Bridgford Stand (södra kortsidan), Peter Taylor Stand (huvudläktaren) och Main Stand. Trent End är supporterskapets bultande hjärta där den mest högljuda stämningen skapas.",
    packages: "Njut av en äkta engelsk fotbollshelg i Robin Hoods hemstad. Våra paket inkluderar garanterad matchbiljett på City Ground samt övernattning på godkända hotell i centrala Nottingham.",
    history: "Nottingham Forest grundades 1865 och är en av världens äldsta fotbollsklubbar. Under den legendariske tränaren Brian Clough skapade klubben ett av fotbollshistoriens största underverk när man vann Europacupen (Champions League) två år i rad, 1979 och 1980.",
    faqs: [
      {
        question: "Hur tar man sig till City Ground?",
        answer: "Arenan ligger cirka 20 minuters promenad från Nottinghams järnvägsstation (Nottingham Station). Promenaden går söderut över den vackra bron Trent Bridge."
      },
      {
        question: "Vad är klubbens kända kampsång?",
        answer: "Före varje avspark sjunger hela stadion med i Wings klassiska låt 'Mull of Kintyre' med en omarbetad text tillägnad Nottingham Forest."
      }
    ]
  },

  "brentford": {
    slug: "brentford",
    name: "Brentford FC",
    league: "Premier League",
    stadiumName: "Gtech Community Stadium",
    logo: "/logos/brentford.png",
    heroImage: "/stadiums/gtech-community-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/gtech-community-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Gtech+Community+Stadium,+Brentford&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Gtech Community Stadium (invigd 2020) är en modern, intim och mycket charmig fotbollsarena i västra London med plats för drygt 17 250 åskådare. Arenans branta läktare och genomtänkta design gör att du sitter extremt nära spelplanen oavsett sektion, vilket skapar en genuint tät och familjär Premier League-stämning.",
    aboutTickets: "Boka biljetter till Brentford FC i västra London. Jämför matchbiljetter och paketresor till alla Premier League-drabbningar på Gtech Community Stadium.",
    howToBuy: "På grund av arenans relativt lilla kapacitet säljer de flesta hemmamatcher slut mycket snabbt till klubbens medlemmar. Säkraste sättet för tillresande svenskar att få biljetter är att boka officiella match- och hospitality-paket via auktoriserade återförsäljare på biljetterfotboll.se.",
    sectionsAndPrices: "Arenan har fyra läktare: South Stand (Huvudläktaren med media och VIP), Braemar Road (North Stand), Ealing Road (Västra kortsidan där hemmaklubbens mest sångglada klack står) samt East Stand (Östra kortsidan). Ealing Road ger mest stämning för pengarna.",
    packages: "Upplev Londonfotboll när den är som bäst och mest tillgänglig. Våra paketresor inkluderar officiell matchbiljett på Gtech Community Stadium samt hotellboende i centrala eller västra London.",
    history: "Brentford FC grundades 1889 och kallas för 'The Bees' (Bina). Klubben spelade under 86 år på sin legendariska arena Griffin Park (känd för att ha en pub i varje hörn av arenan) innan man flyttade till den nya toppmoderna arenan och tog klivet upp i Premier League.",
    faqs: [
      {
        question: "Hur tar man sig till Gtech Community Stadium?",
        answer: "Det enklaste sättet är att ta tåget (South Western Railway) till stationen Kew Bridge, som ligger bara 100 meter från arenan, eller ta Overground till Gunnersbury."
      },
      {
        question: "Varför kallas klubben för 'The Bees'?",
        answer: "Smeknamnet uppstod på 1890-talet när studenter från Borough Road College ropade 'Up the Bs' (som stöd för sin kamrat), vilket av lokalpressen feltolkades som 'The Bees'."
      }
    ]
  },

  "bournemouth": {
    slug: "bournemouth",
    name: "AFC Bournemouth",
    league: "Premier League",
    stadiumName: "Vitality Stadium",
    logo: "/logos/bournemouth.png",
    heroImage: "/stadiums/vitality-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/vitality-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Vitality+Stadium,+Bournemouth&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Vitality Stadium (historiskt känd som Dean Court) i Kings Park är Premier Leagues minsta arena med en kapacitet på drygt 11 300 åskådare. Den extremt kompakta utformningen ger en unikt intim fotbollsupplevelse där du befinner dig ett stenkast från spelsituationerna och hör spelarnas rop ute på gräset.",
    aboutTickets: "Jämför biljetter till AFC Bournemouth på spännande Vitality Stadium. Hitta biljetter till Premier League på den engelska sydkusten.",
    howToBuy: "Då arenan är minst i ligan råder det enorm brist på lösbiljetter och klubbens egna släpp kräver oftast höga lojalitetspoäng. Boka officiella biljetter och matchpaket via biljetterfotboll.se i god tid för att vara garanterad plats.",
    sectionsAndPrices: "Arenan består av Main Stand, East Stand, Steve Fletcher Stand (Norra kortsidan där hemmaklackens hejarrop dånar) och South Stand. Samtliga läktare erbjuder utmärkt närhet till planen.",
    packages: "Kombinera fotboll i Premier League med en helg på Englands soliga sydkust. I paketen ingår officiella matchbiljetter och boende på trevliga hotell i kuststaden Bournemouth.",
    history: "AFC Bournemouth grundades 1899 som Boscombe FC. Klubben kallas 'The Cherries' (Körsbären) på grund av sina rödsvartrandiga tröjor och att den ursprungliga arenan byggdes intill en körsbärsodling. Klubbens klättring från konkursbo i League Two till Premier League är en av engelsk fotbolls mest fascinerande sagor.",
    faqs: [
      {
        question: "Hur tar man sig till Vitality Stadium?",
        answer: "Arenan ligger i Kings Park. Ta lokaltåget till stationen Pokesdown (cirka 15 minuters promenad från stadion) eller ta stadsbuss från centrala Bournemouth."
      },
      {
        question: "Varför kallas laget för 'The Cherries'?",
        answer: "Smeknamnet härstammar från lagets körsbärsröda tröjfärger samt att arenan Dean Court byggdes på mark som tillhörde Cooper-Dean-godsets körsbärsodlingar."
      }
    ]
  },
  "brighton": {
    name: "Brighton & Hove Albion",
    league: "Premier League",
    stadiumName: "American Express Stadium",
    location: "Brighton, England",
    logo: "/logos/brighton.png",
    heroImage: "/stadiums/brighton-hero.jpg",
    stadiumLayoutImage: "/stadiums/brighton-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=American+Express+Stadium,+Falmer,+Brighton&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "American Express Stadium (i folkmun kallad Amex Stadium eller Falmer Stadium) invigdes 2011 och rymmer drygt 31 800 åskådare. Arenan ligger inbäddad i de natursköna kullarna i Falmer strax utanför centrala Brighton och erbjuder en av Englands mest moderna, bekväma och familjevänliga fotbollsupplevelser.",
    aboutTickets: "Jämför biljetter till Brighton & Hove Albion på Amex Stadium. Se aktuella priser och paket för matcher i Premier League och cupspel.",
    howToBuy: "De flesta av Brightons matcher säljs slut till klubbens egna medlemmar, men det går ofta att hitta biljetter via klubbens officiella biljettbörs. För internationella supportrar som vill säkra garanterade platser och hotell i god tid är det enklast att boka auktoriserade biljetter och matchpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan består av West Stand (trevåningsläktaren med VIP och press), East Stand (långsidan mittemot), South Stand (kortsidan för hemmafansen) och North Stand (där klubbens mest högljuda supportergrupper samlas). North Stand erbjuder bäst stämning medan West/East ger oslagbar sikt.",
    packages: "Kombinera Premier League-fotboll med en helg i den sprudlande kuststaden Brighton. Våra paketresor inkluderar officiell matchbiljett på Amex Stadium samt boende på godkända hotell i centrala Brighton.",
    history: "Brighton & Hove Albion FC grundades 1901 och kallas för 'The Seagulls' (Måsarna). Efter en tuff period på 1990-talet där klubben var nära att åka ur ligasystemet helt och stod utan hemmaarena, har klubben gjort en sensationell resa upp till Premier League och europaspel, hyllad för sin datadrivna och smarta rekryteringsstrategi.",
    faqs: [
      {
        question: "Hur tar man sig lättast till Amex Stadium?",
        answer: "Arenan ligger precis intill tågstationen Falmer. Det går regelbundna lokaltåg från Brighton Station som tar cirka 9 minuter."
      },
      {
        question: "Ingår lokaltrafik i matchbiljetten?",
        answer: "Ja, i de flesta ordinarie matchbiljetter till Amex Stadium ingår fri lokal tåg- och bussresa inom Brighton-området på matchdagen."
      }
    ]
  },

  "fulham": {
    name: "Fulham FC",
    league: "Premier League",
    stadiumName: "Craven Cottage",
    location: "London, England",
    logo: "/logos/fulham.png",
    heroImage: "/stadiums/craven-cottage-hero.jpg",
    stadiumLayoutImage: "/stadiums/craven-cottage-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Craven+Cottage,+London&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Craven Cottage i västra London är en av fotbollsvärldens mest charmiga och historiska arenor. Belägen precis vid Themsens strandkant har den varit Fulhams hem sedan 1896. Med den kulturmärkta tegelpaviljongen 'The Cottage' i hörnet och den nybyggda Riverside Stand erbjuder arenan en unik mix av traditionell engelsk fotbollskultur och modern lyx.",
    aboutTickets: "Boka biljetter till klassiska Fulham FC på Craven Cottage. Jämför priser för alla Premier League-matcher och Londonderbyn.",
    howToBuy: "Mindre matcher släpps ibland till allmän försäljning (General Sale) via Fulhams officiella hemsida, men till större Londonderbyn eller stormatcher säljer det slut snabbt. Boka auktoriserade biljetter och hospitality-paket tryggt via biljetterfotboll.se.",
    sectionsAndPrices: "Johnny Haynes Stand (huvudläktaren i trä och tegel) är ett klassiskt landmärke, medan nya Riverside Stand erbjuder fantastisk utsikt över floden Themsen. Hammersmith End (kortsidan i norr) är där hemmalaget skapar mest sång och stämning.",
    packages: "Upplev genuin Londonfotboll i en av stadens mest eleganta stadsdelar. I våra fotbollspaket ingår officiell matchbiljett på Craven Cottage och hotellboende i centrala eller västra London.",
    history: "Fulham FC bildades 1879 och är Londons äldsta professionella fotbollsklubb. Klubben är känd för sin familjära atmosfär, sina klassiska vit-svarta tröjor och har genom åren fostrat och inhyst ikoniska spelare som Johnny Haynes, Bobby Moore och George Best.",
    faqs: [
      {
        question: "Hur tar man sig till Craven Cottage?",
        answer: "Ta tunnelbanan (District Line) till Putney Bridge. Därifrån är det en mycket vacker 10-15 minuters promenad genom Bishops Park längs Themsen fram till arenan."
      },
      {
        question: "Vad är 'The Cottage' för någonting?",
        answer: "Det är den berömda och K-märkta tegelbyggnaden i ena hörnet av stadion där omklädningsrummen ligger och där spelarnas familjer sitter."
      }
    ]
  },

  "everton": {
    name: "Everton FC",
    league: "Premier League",
    stadiumName: "Everton Stadium (Bramley-Moore Dock)",
    location: "Liverpool, England",
    logo: "/logos/everton.png",
    heroImage: "/stadiums/everton-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/everton-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Bramley-Moore+Dock,+Liverpool&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Evertons nya hemmaarena vid Bramley-Moore Dock vid floden Merseys strandkant är ett toppmodernt arkitektoniskt mästerverk med plats för drygt 52 800 åskådare. Arenan kombinerar Liverpools historiska dockarkitektur i tegel och stål med en enorm, brant supporterläktare (South Stand) utformad för att skapa en deafening och intensiv matchupplevelse.",
    aboutTickets: "Upplev Evertons nya era vid Bramley-Moore Dock. Jämför priser på officiella matchbiljetter och paketresor till Premier League-fotboll i Liverpool.",
    howToBuy: "Trycket på Evertons matcher i den nya arenan är rekordhögt. Biljetter via klubben är i princip reserverade för medlemmar. Säkra din plats på nya Everton Stadium enkelt genom att boka auktoriserade biljetter och matchpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Arenans stolthet är den massiva södra läktaren (South Stand) med plats för över 13 000 stående och sjungande hemmafans. Långsidorna (East och West Stand) erbjuder absolut världsklass vad gäller sikt och komfort.",
    packages: "Boka en oförglömlig fotbollsresa till Liverpool. Våra paket inkluderar garanterad biljett till Evertons nya arena samt boende på utvalda hotell i centrala Liverpool.",
    history: "Everton FC grundades 1878 (som St Domingo FC) och är en av de tolv klubbar som bildade The Football League 1888. Efter mer än 130 historiska år på legendariska Goodison Park har klubben flyttat till sin nya superarena på dockorna för att ta upp kampen i den absoluta eliten.",
    faqs: [
      {
        question: "Hur tar man sig till Evertons nya arena?",
        answer: "Arenan ligger på Bramley-Moore Dock i norra dockområdet. Du tar dig enklast hit via lokaltåg till Sandhills Station (cirka 10 minuters promenad) eller med matchbussar från centrala Liverpool."
      },
      {
        question: "Vad hände med klassiska Goodison Park?",
        answer: "Everton lämnade historiska Goodison Park efter säsongen 2024/2025 för att flytta in i den nya anläggningen vid Merseys strand."
      }
    ]
  },

  "crystal-palace": {
    name: "Crystal Palace",
    league: "Premier League",
    stadiumName: "Selhurst Park",
    logo: "/logos/crystal-palace.png",
    heroImage: "/stadiums/selhurst-park-hero.jpg",
    stadiumLayoutImage: "/stadiums/selhurst-park-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Selhurst+Park,+London&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Selhurst Park i sydöstra London öppnade 1924 och rymmer cirka 25 400 åskådare. Arenan är känd över hela fotbollsvärlden för att erbjuda den mest högljuda, passionerade och kompromisslösa läktarstämningen i hela Premier League, ledd av ultrasgruppen Holmesdale Fanatics.",
    aboutTickets: "Boka biljetter till Crystal Palace på Selhurst Park. Jämför priser för Premier League-matcher och upplev Londons mest elektriska läktaratmosfär.",
    howToBuy: "Biljetter till Crystal Palace säljs snabbt slut till klubbmedlemmar. För att garantera platser som tillresande svensk rekommenderas att köpa verifierade säljpaket och hospitality-biljetter i god tid via biljetterfotboll.se.",
    sectionsAndPrices: "Holmesdale Road Stand (södra kortsidan) är hjärtat av stämningen på Selhurst Park. Arthur Wait Stand och Main Stand erbjuder traditionella långsidplatser med perfekt vy över spelet.",
    packages: "Upplev den råa och genuina fotbollspassionen i södra London. Våra paketresor inkluderar officiell matchbiljett på Selhurst Park samt boende på hotell i centrala London.",
    history: "Crystal Palace FC grundades 1905 av anställda vid det berömda utställningspalatset Crystal Palace. Klubbens emblem pryds av en örn (vilket gett dem smeknamnet 'The Eagles') och laget kliver traditionellt in på planen till tonerna av 'Glad All Over'.",
    faqs: [
      {
        question: "Hur tar man sig till Selhurst Park?",
        answer: "Det finns tre närliggande tågstationer: Selhurst, Thornton Heath och Norwood Junction. Alla ligger cirka 10–15 minuters promenad från arenan och nås lätt med tåg från London Victoria eller London Bridge."
      },
      {
        question: "Vilken läktare har bäst stämning?",
        answer: "Holmesdale Stand (särskilt nedre etaget, Holmesdale Fanatics) står för ligans kanske mest konstant högljuda stöd."
      }
    ]
  },

  "ipswich": {
    name: "Ipswich Town",
    league: "Premier League",
    stadiumName: "Portman Road",
    logo: "/logos/ipswich.png",
    heroImage: "/stadiums/portman-road-hero.jpg",
    stadiumLayoutImage: "/stadiums/portman-road-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Portman+Road,+Ipswich&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Portman Road har varit Ipswich Towns hem sedan 1884 och rymmer nästan 30 000 åskådare. Arenan ligger mitt i centrala Ipswich och präglas av traditionella engelska läktare nära planen samt ett extremt stolt och lojalt stöd från hela grevskapet Suffolk.",
    aboutTickets: "Jämför biljetter till Ipswich Town på Portman Road. Se priser och tillgänglighet för alla matcher i engelska ligasystemet.",
    howToBuy: "Trycket på biljetter på Portman Road är mycket stort efter klubbens framgångar. Många matcher blir helt slutsålda. Säkra dina biljetter och matchpaket enkelt och säkert i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan består av Sir Bobby Robson Stand (norra kortsidan där klacken står), Sir Alf Ramsey Stand (södra kortsidan), Cobbold Stand och West Stand. Läktarna är döpta efter klubbens legendariska tränare.",
    packages: "Upplev en klassisk engelsk fotbollshelg i den historiska köpstaden Ipswich. Våra paket inkluderar matchbiljett på Portman Road samt hotellövernattning i centrala Ipswich.",
    history: "Ipswich Town FC grundades 1878 och kallas för 'The Tractor Boys'. Klubbens storhetstid under 1970- och 80-talen leddes av Sir Bobby Robson, då man vann FA-cupen 1978 och UEFA-cupen 1981. Både Robson och Sir Alf Ramsey blev sedermera förbundskaptener för England.",
    faqs: [
      {
        question: "Hur tar man sig till Portman Road?",
        answer: "Portman Road har ett av Englands bästa lägen – det tar bara cirka 5 minuter att gå direkt från Ipswich tågstation till arenan."
      },
      {
        question: "Varför kallas laget för 'The Tractor Boys'?",
        answer: "Smeknamnet var ursprungligen en godmodig gliring från motståndarfans som anspelade på Suffolks jordbruksarv, men har stolt omfamnats av Ipswichs egna supportrar."
      }
    ]
  },

  "sunderland": {
    name: "Sunderland AFC",
    league: "Championship",
    stadiumName: "Stadium of Light",
    logo: "/logos/sunderland.png",
    heroImage: "/stadiums/stadium-of-light-hero.jpg",
    stadiumLayoutImage: "/stadiums/stadium-of-light-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadium+of+Light,+Sunderland&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadium of Light invigdes 1997 på marken där den gamla kolgruvan Monkwearmouth Colliery låg. Arenan rymmer över 49 000 åskådare och är en av de största och mest imponerande arenorna i England. Atmosfären och stödet från den nordengelska arbetarklassen är känt för att vara intensivt och otroligt lojalt.",
    aboutTickets: "Boka biljetter till Sunderland AFC på maffiga Stadium of Light. Jämför priser för hemmamatcher och derbyn i den engelska fotbollen.",
    howToBuy: "Biljetter till Sunderlands hemmamatcher går ofta att köpa direkt via klubbens officiella biljettsystem för vanliga ligamatcher. Vid viktiga toppmatcher och derbyn rekommenderas förbokning av officiella biljetter och paket via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan består av Roker End (Södra kortsidan där de mest högljuda fansen står), West Stand, East Stand samt North Stand. Platser på övre etaget på långsidorna ger mäktig utsikt över hela arenarummet.",
    packages: "Upplev nordostasiatisk fotbollspassion när den är som starkast. I paketen ingår matchbiljett på Stadium of Light samt boende på hotell i Sunderland eller närbelägna Newcastle.",
    history: "Sunderland AFC grundades 1879 och har vunnit den engelska högsta ligan sex gånger samt FA-cupen två gånger. Klubbens starka band till stadens gruvarbetar- och varvsindustri visas bland annat genom den gigantiska gruvlyktan som står placerad utanför arenan.",
    faqs: [
      {
        question: "Hur tar man sig till Stadium of Light?",
        answer: "Ta Wear-metron (Tyne & Wear Metro) direkt till stationerna 'Stadium of Light' eller 'St Peter's', som båda ligger några minuters promenad från grindarna."
      },
      {
        question: "Varifrån kommer namnet 'Stadium of Light'?",
        answer: "Namnet är en hyllning till regionens gruvarbetararv och den säkerhetslykta (Davy lamp) som gruvarbetarna använde under jorden."
      }
    ]
  },

  "racing-santander": {
    name: "Racing Santander",
    league: "La Liga",
    stadiumName: "Campos de Sport de El Sardinero",
    logo: "/logos/racing-santander.png",
    heroImage: "/stadiums/el-sardinero-hero.jpg",
    stadiumLayoutImage: "/stadiums/el-sardinero-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Campos+de+Sport+de+El+Sardinero,+Santander&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Campos de Sport de El Sardinero ligger unikt nog bara ett stenkast från stranden El Sardinero i den vackra kantabriska kuststaden Santander i norra Spanien. Arenan invigdes 1988 och rymmer cirka 22 200 åskådare. Här upplever du genuin spansk fotbollskultur med havsbris och grön-vitt supporterengagemang.",
    aboutTickets: "Köpa biljetter till Real Racing Club de Santander. Jämför priser för matchbiljetter och fotbollsresor till spansk ligafotboll i Kantabrien.",
    howToBuy: "Biljetter säljs vanligtvis direkt via klubbens biljettdiskar vid arenan samt på nätet under matchveckan. För turister och tillresande fotbollsfans går det smidigt att förboka garanterade biljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan är indelad i Tribuna Central (Huvudläktaren), Tribuna Este (Östra långsidan), Gradona de Los Northern (Norra kortsidan för de mest passionerade hemmasupportrarna) och Fondo Sur. Priserna är mycket överkomliga jämfört med storklubbarna i Madrid och Barcelona.",
    packages: "Kombinera spansk toppfotboll med den fantastiska matkulturen och stränderna i norra Spanien. Våra paket inkluderar officiell matchbiljett på El Sardinero och hotellövernattning i centrala Santander.",
    history: "Real Racing Club de Santander grundades 1913 och är en av de historiska grundarklubbarna av La Liga 1929. Klubben spelar i sina traditionella gröna och vita färger och har en stolt historia i spansk fotboll med många säsonger i högsta divisionen och spel i UEFA-cupen.",
    faqs: [
      {
        question: "Hur tar man sig till El Sardinero?",
        answer: "Arenan ligger i stadsdelen El Sardinero nära stranden. Det går täta stadsbussar (t.ex. linje 1, 2 och 6) från centrala Santander direkt till arenan."
      },
      {
        question: "Kan man kombinera match med strandbesök?",
        answer: "Ja, arenan ligger bokstavligen 200 meter från den berömda sandstranden Playa de El Sardinero, vilket gör det perfekt för en heldag vid havet innan match."
      }
    ]
  },
  "alaves": {
    name: "Deportivo Alavés",
    league: "La Liga",
    stadiumName: "Mendizorrotza",
    location: "Vitoria-Gasteiz, Spanien",
    logo: "/logos/alaves.png",
    heroImage: "/stadiums/mendizorrotza-hero.jpg",
    stadiumLayoutImage: "/stadiums/mendizorrotza-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+de+Mendizorrotza,+Vitoria-Gasteiz&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estadio de Mendizorrotza öppnade redan 1924 och är den tredje äldsta arenan i spansk elitfotboll. Arenan rymmer knappt 20 000 åskådare och ligger inbäddad i ett grönområde i Baskiens huvudstad Vitoria-Gasteiz. Med läktare tätt intill planen skapas en extremt kompakt, högljudd och passionerad atmosfär.",
    aboutTickets: "Boka biljetter till Deportivo Alavés på anrika Mendizorrotza. Jämför priser för La Liga-matcher och spanska cupmöten i Baskien.",
    howToBuy: "Biljetter säljs via Alavés officiella hemsida samt i biljettdiskarna vid arenan. Till matcher mot Baskien-rivaler som Athletic Club och Real Sociedad samt stormatcher mot Real Madrid och Barcelona blir det snabbt slutsålt, varför det rekommenderas att boka garanterade biljetter och paket via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan har fyra klassiska läktarsektioner: Tribuna Principal (huvudläktaren), Tribuna Preferente (långsidan mittemot), Fondo Polideportivo (norra kortsidan där hemmaklacken Iraultza 1921 skapar fantastisk stämning) och Fondo Cervantes.",
    packages: "Upplev den unika baskiska fotbollskulturen och den berömda gastronomin i Vitoria-Gasteiz. Våra paketresor inkluderar officiell matchbiljett på Mendizorrotza samt hotellövernattning i centrala Vitoria-Gasteiz.",
    history: "Deportivo Alavés grundades 1921 och kallas för 'El Glorioso' eller 'Los Babazorros'. Klubbens mest legendariska ögonblick inträffade 2001 när man som debutanter gick hela vägen till UEFA-cupfinal och föll med 4–5 mot Liverpool efter förlängning i en av fotbollshistoriens mest dramatiska finaler.",
    faqs: [
      {
        question: "Hur tar man sig till Mendizorrotza?",
        answer: "Arenan ligger cirka 20 minuters promenad från Vitoria-Gasteiz centralstation. Det går även smidiga stadsbussar (linje 2 och 8) direkt till arenan."
      },
      {
        question: "Vad betyder smeknamnet 'Los Babazorros'?",
        answer: "Det är ett baskiskt uttryck som ungefär betyder 'bönätarna', en skämtsam men stolt benämning på befolkningen i provinsen Álava där bönor historiskt varit en basföda."
      }
    ]
  },

  "getafe": {
    name: "Getafe CF",
    league: "La Liga",
    stadiumName: "Coliseum",
    location: "Getafe (Madrid), Spanien",
    logo: "/logos/getafe.png",
    heroImage: "/stadiums/coliseum-getafe-hero.jpg",
    stadiumLayoutImage: "/stadiums/coliseum-getafe-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Coliseum+Getafe&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Coliseum (tidigare Coliseum Alfonso Pérez) invigdes 1998 och rymmer drygt 16 500 åskådare. Arenan ligger i förstaden Getafe strax söder om centrala Madrid. Den skålformade anläggningen erbjuder en avskalad och intim miljö där supportrarna kända som 'Azulones' stöttar sitt lag.",
    aboutTickets: "Jämför biljetter till Getafe CF på Coliseum. Hitta prisvärda alternativ för La Liga-fotboll i Madrid-området.",
    howToBuy: "Biljetter till Getafes matcher är oftast relativt lätta att få tag på via den officiella hemsidan, förutom när giganter som Real Madrid, Atlético Madrid eller Barcelona kommer på besök. Boka biljetter och hotellpaket enkelt i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan består av Tribuna (huvudläktaren under tak), Lateral (öppna långsidan), Fondo Norte och Fondo Sur. Prisbilden på Coliseum är generellt bland de mest prisvärda i hela Madrid-regionen.",
    packages: "Kombinera en fotbollsresa till storstaden Madrid med en genuin matchdag i förstaden Getafe. I våra paket ingår officiell matchbiljett samt boende på hotell i centrala Madrid eller Getafe.",
    history: "Getafe Club de Fútbol bildades i sin nuvarande form 1983. Trots att klubben är relativt ung har man etablerat sig som ett stabilt inslag i spansk fotbolls översta skikt, med två Copa del Rey-finaler (2007 och 2008) samt framgångsrika europaspelsäventyr på meritlistan.",
    faqs: [
      {
        question: "Hur tar man sig till Coliseum från centrala Madrid?",
        answer: "Ta pendeltåget Cercanías (linje C-4) från Sol eller Atocha i centrala Madrid till stationen 'Las Margaritas-Universidad', varifrån det är cirka 10 minuters promenad till arenan. Det går även att ta metro linje 12 till 'Los Margaritas'."
      },
      {
        question: "Varför heter klubben 'Azulones'?",
        answer: "Smeknamnet syftar på lagets traditionella mörkblå matchställ."
      }
    ]
  },

  "espanyol": {
    name: "RCD Espanyol",
    league: "La Liga",
    stadiumName: "Stage Front Stadium",
    location: "Barcelona, Spanien",
    logo: "/logos/espanyol.png",
    heroImage: "/stadiums/rcde-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/rcde-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stage+Front+Stadium,+Cornell%C3%A0+de+Llobregat&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stage Front Stadium (även känd som RCDE Stadium eller Estadi de Cornellà-El Prat) invigdes 2009 och är en fyrstjärnig, ultramodern arena med plats för 40 000 åskådare. Med helt täckta läktare tätt inpå planen skapas en fantastisk akustik och matchupplevelse i världsklass.",
    aboutTickets: "Boka biljetter till RCD Espanyol i Barcelona. Jämför priser för La Liga-matcher, cupkamper och det heta stadsderbyt på RCDE Stadium.",
    howToBuy: "Biljetter säljs smidigt via Espanyols officiella hemsida. Vid stadsderbyt 'Derbi Barcelonés' mot FC Barcelona är trycket enormt. För en trygg bokning med garanterade sittplatser och hotell rekommenderas att boka via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna Presidencial och Corporate-platserna erbjuder högsta komfort, medan Grada Canito (på kortsidan) är platsen där klubbens mest sjungande supportergrupper samlas.",
    packages: "Upplev fotbollsstaden Barcelona från ett genuint supporterperspektiv. Våra paketresor inkluderar officiell matchbiljett på RCDE Stadium och boende på godkända hotell i centrala Barcelona.",
    history: "Reial Club Deportiu Espanyol de Barcelona grundades 1900 och är en av de äldsta klubbarna i Spanien. Espanyol har vunnit Copa del Rey fyra gånger och nått UEFA-cupfinal två gånger (1988 och 2007). Klubbens supporterkaraktär präglas av stolthet och lokal förankring i skuggan av grannen FC Barcelona.",
    faqs: [
      {
        question: "Hur tar man sig till RCDE Stadium från centrala Barcelona?",
        answer: "Ta FGC-tåget (linje L8, S3, S4, S8) från Plaça Espanya till stationen 'Cornellà Riera'. Därefter är det cirka 5 minuters promenad till arenan. Det går även att ta Metro linje 5 till Cornellà Centre."
      },
      {
        question: "Varför kallas laget för 'Periquitos'?",
        answer: "Smeknamnet 'Periquitos' (Undulaterna) sägs ha uppstått under tiden klubben spelade på sin gamla arena Sarrià, där det fanns rikligt med trädbevuxna områden fulla av småfåglar runt läktarna."
      }
    ]
  },

  "rayo": {
    name: "Rayo Vallecano",
    league: "La Liga",
    stadiumName: "Campo de Fútbol de Vallecas",
    location: "Madrid, Spanien",
    logo: "/logos/rayo.png",
    heroImage: "/stadiums/vallecas-hero.jpg",
    stadiumLayoutImage: "/stadiums/vallecas-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Campo+de+F%C3%Batbol+de+Vallecas,+Madrid&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estadio de Vallecas i arbetarstadsdelen Vallecas i södra Madrid invigdes 1976 och rymmer drygt 14 700 åskådare. Arenan är helt unik i spansk elitfotboll – den har bara tre läktare, där den ena kortsidan utgörs av en tegelvägg med bostadshus precis bakom målet. Stämningen är rå, politisk, familjär och otroligt charmig.",
    aboutTickets: "Upplev spansk fotbollskultur när den är som mest äkta på Vallecas. Jämför biljetter till Rayo Vallecanos hemmamatcher i La Liga.",
    howToBuy: "Rayo Vallecano tillämpar fortfarande mycket av den traditionella biljetthanteringen där fysiska biljetter säljs vid arenans luckor (Taquillas). För att undvika långa köer eller att bli utan biljett vid populära matcher rekommenderas starkt att förboka verifierade e-biljetter eller paket via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna Central och Lateral erbjuder bra sikt på långsidorna, medan Fondo (den enda kortsidan) är hemvist för den berömda ultrasgruppen Bukaneros som håller igång stämningen oavbrutet.",
    packages: "Boka en unik fotbollsresa till Madrid. I våra paket ingår matchbiljett på kultförklarade Estadio de Vallecas samt boende på hotell i Madrid.",
    history: "Rayo Vallecano grundades 1924 och är känt för sina ikoniska vita tröjor med ett rödt tvärband (likt River Plate). Klubben har en stark vänster- och arbetarklassidentitet och ses av många fotbollsromantiker som Madrids mest genuina kvartersklubb.",
    faqs: [
      {
        question: "Hur tar man sig till Estadio de Vallecas?",
        answer: "Arenan har ett fantastiskt läge i staden. Ta tunnelbanan (Metro linje 1) direkt till stationen 'Portazgo', som har uppgångar precis utanför stadion."
      },
      {
        question: "Varför saknar arenan läktare på ena kortsidan?",
        answer: "På grund av platsbrist vid bygget ligger bostadshus på Calle del Teniente Muñoz Díaz precis bakom det norra målet, vilket gör att boende kan se matcherna från sina balkonger!"
      }
    ]
  },

  "levante": {
    name: "Levante UD",
    league: "La Liga",
    stadiumName: "Estadi Ciutat de València",
    location: "Valencia, Spanien",
    logo: "/logos/levante.png",
    heroImage: "/stadiums/ciutat-de-valencia-hero.jpg",
    stadiumLayoutImage: "/stadiums/ciutat-de-valencia-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadi+Ciutat+de+Val%C3%A8ncia,+Valencia&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estadi Ciutat de València öppnade 1969 och har nyligen genomgått en omfattande modernisering med ett ståtligt nytt tak och avancerad LED-belysning. Arenan rymmer drygt 26 300 åskådare och erbjuder en trevlig, intim och familjär matchmiljö i norra Valencia.",
    aboutTickets: "Jämför biljetter till Levante UD på Ciutat de València. Se aktuella priser och paket för matcher i den spanska ligafotbollen.",
    howToBuy: "Biljetter kan köpas via Levantes officiella hemsida samt i biljettdiskarna på matchdag. Vid stadsderbyt mot Valencia CF eller vid besök från topplagen blir trycket högt. Säkra dina biljetter tryggt via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan är indelad i Tribuna (huvudläktaren med VIP), Grada Central (långsidan mittemot), Gol Orriols (norra kortsidan) och Gol Alboraya (södra kortsidan). Siktlinjerna över gräsmattan är utmärkta från samtliga sektioner.",
    packages: "Kombinera sol, strand, paella och spansk fotboll i Valencia. Våra paket inkluderar officiell matchbiljett på Ciutat de València och hotell i centrala Valencia.",
    history: "Levante Unión Deportiva grundades 1909 och är faktiskt Valencias äldsta fotbollsklubb. Klubbens emblem pryds av en fladdermus och laget spelar i röd-blårandiga tröjor (Granotas). Trots att man länge levt i skuggan av grannen Valencia CF har klubben en stolt historia med bland annat spel i Europa League.",
    faqs: [
      {
        question: "Hur tar man sig till Estadi Ciutat de València?",
        answer: "Ta tunnelbanan (Metrovalencia linje 3 eller 9) till stationen 'Machado', eller spårvagn (linje 6) till 'Estadi del Llevant'. Från Machado är det bara några minuters promenad till stadion."
      },
      {
        question: "Vad betyder klubbens smeknamn 'Granotas'?",
        answer: "Det är det valencianska ordet för 'paddorna'. Smeknamnet uppstod när klubben efter det spanska inbördeskriget flyttade till en arena nära floden Turia där det fanns rikligt med paddor."
      }
    ]
  },

  "deportivo": {
    name: "Deportivo La Coruña",
    league: "La Liga",
    stadiumName: "Abanca-Riazor",
    location: "A Coruña, Spanien",
    logo: "/logos/deportivo.png",
    heroImage: "/stadiums/riazor-hero.jpg",
    stadiumLayoutImage: "/stadiums/riazor-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+Abanca-Riazor,+A+Coru%C3%B1a&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estadio Abanca-Riazor ligger spektakulärt placerad bara några meter från Atlantens vågor och sandstranden Praia de Riazor i galiciska A Coruña. Arenan invigdes 1944, har plats för drygt 32 400 åskådare och är känd för sitt enormt passionerade supporterstöd som får läktarna att koka.",
    aboutTickets: "Boka biljetter till klassiska Deportivo La Coruña på maffiga Riazor. Jämför priser för ligamatcher och upplev den galiciska fotbollspassionen.",
    howToBuy: "Trots spel i lägre divisioner har 'Depor' en av Spaniens mest lojala supporterskaror med skyhöga åskådarsiffror. Biljetter köps via klubbens hemsida eller biljettdiskar. För internationella besökare rekommenderas att förköpa garanterade matchbiljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna (huvudläktaren) och Preferencia ger perfekt överblick över spelet. Kortsidan Pabellón (Marathón) är hjärtat av stödet där de mest högljuda supportergrupperna Riazor Blues samlas.",
    packages: "Upplev en fantastisk fotbollshelg i Galicien med fantastisk skaldjursmat och Atlantbris. Våra paket inkluderar matchbiljett på Riazor och boende på hotell i centrala A Coruña.",
    history: "Real Club Deportivo de La Coruña grundades 1906. Under sin guldålder runt millennieskiftet – kända i hela fotbollsvärlden som 'Super Dépor' – utmanade man storklubbarna, vann La Liga år 2000, tog två Copa del Rey-titlar och nådde semifinal i Champions League 2004.",
    faqs: [
      {
        question: "Hur tar man sig till Estadio Abanca-Riazor?",
        answer: "Arenan ligger centralt i staden precis vid stranden. Du kan lätt gå till fots från centrala A Coruña på 15–20 minuter eller ta lokalbussar som linje 3 och 7."
      },
      {
        question: "Vad är det galiciska derbyt?",
        answer: "Det är det laddade och prestigefyllda mötet 'O Noso Derbi' mellan Deportivo La Coruña och erkerivalen Celta Vigo från södra Galicien."
      }
    ]
  },

  "elche": {
    name: "Elche CF",
    league: "La Liga",
    stadiumName: "Estadio Martínez Valero",
    location: "Elche, Spanien",
    logo: "/logos/elche.png",
    heroImage: "/stadiums/martinez-valero-hero.jpg",
    stadiumLayoutImage: "/stadiums/martinez-valero-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+Mart%C3%ADnez+Valero,+Elche&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estadio Martínez Valero invigdes 1976 och är en mycket rymlig och maffig arena med plats för 33 700 åskådare. Arenan var bland annat spelplats under VM 1982 och har huserat spanska cupfinaler. Med sina två öppna etage och välskötta gräsmatta erbjuder den en klassisk spansk fotbollsupplevelse i palmernas stad Elche.",
    aboutTickets: "Jämför biljetter till Elche CF på Estadio Martínez Valero. Se aktuella priser för hemmamatcher i spansk ligafotboll på Costa Blanca.",
    howToBuy: "Biljetter köps enklast via Elches officiella biljettportal eller på plats vid stadion. För turister i Alicante- och Costa Blanca-området går det smidigt att förboka verifierade matchbiljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan har sektionerna Tribuna (huvudläktaren med VIP och press), Preferencia (långsidan mittemot) samt Fondo Norte och Fondo Sur. Priserna är generellt mycket förmånliga.",
    packages: "Kombinera fotboll med sol och bad på Costa Blanca. Våra matchpaket inkluderar officiell matchbiljett på Martínez Valero samt boende på godkända hotell i Elche eller närbelägna Alicante.",
    history: "Elche Club de Fútbol grundades 1922 och kallas för 'Los Franjiverdes' (De grön-vita ränderna) på grund av sitt karakteristiska vita matchställ med ett brett grönt horisontellt band över bröstet. Klubbens största meriter är en finalplats i Copa del Rey 1969 samt flertalet säsonger i Spaniens högsta division.",
    faqs: [
      {
        question: "Hur tar man sig till Estadio Martínez Valero?",
        answer: "Arenan ligger i östra delen av Elche, cirka 3 km från centrum. Det går lokala stadsbussar (linje E, F eller K) från centralstationen direkt till arenan. Från Alicante flygplats tar det bara cirka 15 minuter med taxi."
      },
      {
        question: "Vad är staden Elche mest känd för?",
        answer: "Förutom fotbollslaget är Elche världskänt för 'Palmeral de Elche' – Europas största palmplantering som finns med på UNESCO:s världsarvslista."
      }
    ]
  },
  "malaga": {
    name: "Málaga CF",
    league: "La Liga",
    stadiumName: "La Rosaleda",
    location: "Málaga, Spanien",
    logo: "/logos/malaga.png",
    heroImage: "/stadiums/la-rosaleda-hero.jpg",
    stadiumLayoutImage: "/stadiums/la-rosaleda-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+La+Rosaleda,+M%C3%A1laga&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estadio La Rosaleda ('Rosengården') invigdes 1941 och är en av Solkustens mest klassiska fotbollsarenor. Arenan rymmer drygt 30 000 åskådare och var bland annat spelplats under VM 1982. Med sin öppna karaktär, varma atmosfär och passionerade hemmasupportrar erbjuder La Rosaleda en fantastisk matchdagsupplevelse i hjärtat av Andalusien.",
    aboutTickets: "Boka biljetter till Málaga CF på La Rosaleda. Jämför priser för matchbiljetter och paketresor till spansk ligafotboll på Solkusten.",
    howToBuy: "Biljetter köps enklast via Málaga CF:s officiella hemsida eller i biljettdiskarna vid arenan. För solresenärer och tillresande svenska fans som vill säkra bra sittplatser i förväg går det smidigt att boka officiella biljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Arenan består av Tribuna (huvudläktaren med tak och VIP), Preferencia (långsidan mittemot), samt Fondo Sur och Fondo Norte. Fondo Sur är läktarsektionen där hemmalagets sjungande supportergrupper skapar den bästa stämningen.",
    packages: "Kombinera sol, bad och andalusisk fotbollskultur. Våra paketresor inkluderar officiell matchbiljett på La Rosaleda samt hotellövernattning på utvalda hotell i centrala Málaga.",
    history: "Málaga CF grundades i sin nuvarande form 1948 (med rötter från 1904) och kallas för 'Los Boquerones' (Ansjovisarna). Klubbens mest minnesvärda period ägde rum i början av 2010-talet när man tog sig hela vägen till kvartsfinal i Champions League 2013 under tränaren Manuel Pellegrini.",
    faqs: [
      {
        question: "Hur tar man sig till La Rosaleda?",
        answer: "Arenan ligger i norra delen av centrala Málaga längs floden Guadalmedina. Det tar cirka 20 minuter att gå från gamla stan (Centro Histórico), eller så kan du ta stadsbuss linje 1, 2 eller 17."
      },
      {
        question: "Varför kallas laget för 'Los Boquerones'?",
        answer: "Smeknamnet syftar på ansjovis, vilket är en lokal matspecialitet och symbol för kustområdet i Málaga."
      }
    ]
  },

  "osasuna": {
    name: "CA Osasuna",
    league: "La Liga",
    stadiumName: "El Sadar",
    location: "Pamplona, Spanien",
    logo: "/logos/osasuna.png",
    heroImage: "/stadiums/el-sadar-hero.jpg",
    stadiumLayoutImage: "/stadiums/el-sadar-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+El+Sadar,+Pamplona&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estadio El Sadar i Navarra-regionens huvudstad Pamplona rymmer drygt 23 500 åskådare. Arenan genomgick en totalrenovering 2021 och korades till 'World Stadium of the Year'. Med sina branta läktare, stängda hörn och en takkonstruktion som fungerar som en ljudförstärkare räknas El Sadar till en av Spaniens mest fruktade och stämningsfulla bortaarenor.",
    aboutTickets: "Upplev den intensivaste läktarkulturen i norra Spanien. Jämför biljetter till CA Osasunas hemmamatcher i La Liga på prisbelönta El Sadar.",
    howToBuy: "Osasuna har en mycket hög andel säsongskortsinnehavare och biljetterna säljer ofta slut snabbt via klubbens egna kanaler. Säkra din plats på El Sadar tryggt genom att boka auktoriserade biljetter och matchpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Grada Sur (södra läktaren) är den berömda ståplatsläktaren där hemmalagets mest passionerade ultras Indar Gorri står samlade. Tribuna Alta och Tribuna Preferencia ger perfekt panoramaöverblick över planen.",
    packages: "Boka en fotbollsresa till Pamplona och upplev den navarriska gästfriheten och gastronomin. Paketen inkluderar matchbiljett på El Sadar samt hotellboende i centrala Pamplona.",
    history: "Club Atlético Osasuna grundades 1920. 'Osasuna' är ett baskiskt ord som betyder 'hälsa' eller 'styrka'. Klubben spelar tradionellt i röda tröjor och blå shorts och är stolt över sin koppling till Navarras regionala identitet och akademi (Tajonar).",
    faqs: [
      {
        question: "Hur tar man sig till El Sadar?",
        answer: "Arenan ligger cirka 2,5 km söder om centrala Pamplona. Du tar dig lätt hit med stadsbussarna (linje 11 eller 16) eller till fots på drygt 25–30 minuter från stadskärnan."
      },
      {
        question: "Vad gör El Sadar så speciell akustiskt?",
        answer: "Arenans renovering utformades med en vertikal vägg av läktare och ett unikt tak som reflekterar allt ljud ner mot planen, vilket skapar en öronbedövande ljudkuliss."
      }
    ]
  },

  "celta-vigo": {
    name: "Celta Vigo",
    league: "La Liga",
    stadiumName: "Abanca-Balaídos",
    location: "Vigo, Spanien",
    logo: "/logos/celta-vigo.png",
    heroImage: "/stadiums/balaidos-hero.jpg",
    stadiumLayoutImage: "/stadiums/balaidos-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+Abanca-Bala%C3%ADdos,+Vigo&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estadio Abanca-Balaídos har varit Celta Vigos hemmaarena sedan 1928 och rymmer knappt 25 000 åskådare. Arenan har genomgått en stegvis och modern ombyggnad som flyttat läktarna närmare gräset. Belägen i den galiciska hamnstaden Vigo bjuder Balaídos på en passionerad och stolt galicisk fotbollskultur.",
    aboutTickets: "Boka biljetter till Celta Vigo på Abanca-Balaídos. Jämför priser för La Liga-matcher och galiciska derbyn.",
    howToBuy: "Biljetter säljs via Celta Vigos officiella portal samt i biljettdiskarna vid arenan under matchveckan. Till stormatcher mot Real Madrid, Barcelona eller rivalen Deportivo La Coruña rekommenderas starkt att förboka garanterade matchbiljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Marcador och Tribuna utgör långsidorna med utmärkt sikt över spelet, medan Gol och Marcador Baixo samlar klubbens mest högljuda supportergrupper. Priserna på Balaídos är generellt mycket överkomliga.",
    packages: "Upplev fantastisk atlantisk fotbollsmiljö kombinerat med Galiciens världsberömda skaldjurskök. Paketen inkluderar matchbiljett på Balaídos samt hotell i centrala Vigo.",
    history: "Real Club Celta de Vigo grundades 1923 genom en sammanslagning av Real Vigo Sporting och Real Fortuna. Klubbens ljusblå tröjor (Os Celestes) och keltiska kors-symbolik hyllar regionens keltiska arv. Klubbens guldålder ägde rum runt millennieskiftet med 'EuroCelta' som bjöd på sprudlande offensivfotboll.",
    faqs: [
      {
        question: "Hur tar man sig till Abanca-Balaídos?",
        answer: "Arenan ligger cirka 3 km sydväst om stadens centrum. Det går smidiga stadsbussar (linje C5, L11 och L23) direkt till stadion på cirka 15 minuter."
      },
      {
        question: "Vad kallas lagets matcher mot Deportivo La Coruña?",
        answer: "Mötet mellan Celta Vigo och Deportivo kallas för 'O Noso Derbi' (Vårt Derby) och är ett av Spaniens mest prestigefyllda och laddade regionderbyn."
      }
    ]
  },

  "udinese": {
    name: "Udinese Calcio",
    league: "Serie A",
    stadiumName: "Stadio Friuli (Bluenergy Stadium)",
    location: "Udine, Italien",
    logo: "/logos/udinese.png",
    heroImage: "/stadiums/stadio-friuli-hero.jpg",
    stadiumLayoutImage: "/stadiums/stadio-friuli-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Friuli,+Udine&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadio Friuli (kommersiellt känd som Bluenergy Stadium) öppnade 1976 och genomgick en komplett omvandling 2016 där löparbanorna togs bort. Arenan rymmer drygt 25 100 åskådare och är en av få klubbägda, toppmoderna arenor i Italien, känd för sin ikoniska bågkonstruktion över huvudläktaren och färgglada stolsäten.",
    aboutTickets: "Jämför biljetter till Udinese Calcio på Bluenergy Stadium. Se priser och paket för Serie A-matcher i nordöstra Italien.",
    howToBuy: "Biljetter till Udineses hemmamatcher släpps vanligtvis ett par veckor före match via klubbens officiella biljettpartner. För matcher mot storklubbar som Juventus, Inter och AC Milan rekommenderas att köpa garanterade e-biljetter och paketresor via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna Pasqualin och Tribuna Latérale erbjuder förstklassig komfort, medan Curva Nord är hemvist för Udineses mest hängivna supportergrupper. Curva Sud inhyser bortasektionen och neutrala platser.",
    packages: "Njut av en äkta italiensk fotbollshelg i den vackra regionen Friuli-Venezia Giulia. I våra paket ingår officiell matchbiljett samt boende på godkända hotell i centrala Udine.",
    history: "Udinese Calcio grundades 1896 och är en av Italiens äldsta fotbollsklubbar. Laget spelar i svart-vitrandiga tröjor ('Le Zebrette') och har gjort sig känt för sin globala scoutingverksamhet som fostrat stjärnor som Zico, Alexis Sánchez och klubbikonen Antonio Di Natale.",
    faqs: [
      {
        question: "Hur tar man sig till Stadio Friuli?",
        answer: "Arenan ligger cirka 4 km nordväst om Udines centrum. Du tar dig enkelt hit med stadsbuss (linje 2 eller 9) från centralstationen Stazione Udine."
      },
      {
        question: "Behöver man ID/pass vid entrén?",
        answer: "Ja, i Italien råder strikta biljettlagar (nominativa biljetter). Ditt namn på biljetten måste stämma exakt överens med ditt pass eller nationella ID-kort."
      }
    ]
  },

  "monza": {
    name: "AC Monza",
    league: "Serie A",
    stadiumName: "U-Power Stadium",
    location: "Monza, Italien",
    logo: "/logos/monza.png",
    heroImage: "/stadiums/u-power-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/u-power-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=U-Power+Stadium,+Monza&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "U-Power Stadium (historiskt känd som Stadio Brianteo) invigdes 1988 och rymmer drygt 17 000 åskådare. Arenan i stadsdelen Brianteo har genomgått stora renoveringar sedan klubbens klättring till Serie A. Här upplever du en intim, entusiastisk och familjär italiensk matchkultur strax utanför Milano.",
    aboutTickets: "Boka biljetter till AC Monza på U-Power Stadium. Jämför matchbiljetter och paket för Serie A-fotboll i Lombardiet.",
    howToBuy: "Biljetter säljs via AC Monzas officiella biljettkanal. På grund av den begränsade kapaciteten blir hemmamatcherna mot de stora Milano- och Romklubbarna snabbt utsålda. Förköp dina biljetter och hotellpaket smidigt via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna Main Stand erbjuder täckta och bekväma platser, medan Settore Est (långsidan mittemot) ger utmärkt sikt över spelet. Curva Davide Pieri är hjärtat för Monzas mest vokala supportergrupper.",
    packages: "Kombinera fotboll i Serie A med shopping och storstadsliv i Milano. Våra paket inkluderar matchbiljett på U-Power Stadium samt hotellboende i Monza eller centrala Milano.",
    history: "Associazione Calcio Monza grundades 1912 och kallas 'I Bagaj' (Grabbarna) eller 'Biancorossi'. Efter att Silvio Berlusconi och Adriano Galliani tog över klubben 2018 gjorde Monza en historisk klassresa och nådde Serie A för allra första gången under säsongen 2022/2023.",
    faqs: [
      {
        question: "Hur tar man sig till U-Power Stadium från Milano?",
        answer: "Ta lokaltåget från Milano Centrale eller Milano Porta Garibaldi till Monza Station (tar ca 10–15 min). Därefter tar du matchbuss (Z206 eller Z202) eller taxi till stadion."
      },
      {
        question: "Vad heter Monzas hemmasupporterläktare?",
        answer: "Kortsidan för hemmafans heter Curva Davide Pieri, uppkallad efter en stolt och historisk supporter till klubben."
      }
    ]
  },

  "parma": {
    name: "Parma Calcio 1913",
    league: "Serie A",
    stadiumName: "Stadio Ennio Tardini",
    location: "Parma, Italien",
    logo: "/logos/parma.png",
    heroImage: "/stadiums/ennio-tardini-hero.jpg",
    stadiumLayoutImage: "/stadiums/ennio-tardini-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Ennio+Tardini,+Parma&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadio Ennio Tardini invigdes redan 1923 och är Italiens sjunde äldsta fotbollsarena. Arenan rymmer cirka 22 350 åskådare och har en ikonisk entréport i monumentalstil. Belägen mitt i ett bostadsområde i charmiga Parma erbjuder Tardini en genuin och nostalgisk Serie A-upplevelse.",
    aboutTickets: "Boka biljetter till Parma Calcio på historiska Stadio Ennio Tardini. Jämför priser på matchbiljetter och fotbollsresor till Emilia-Romagna.",
    howToBuy: "Biljetter släpps via Parmas officiella biljettförsäljning. Till stormatcher fylls läktarna snabbt av den engagerade lokalbefolkningen. Säkra din resa och garanterade biljetter bekvämt via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna Petitot är den anrika huvudläktaren, medan Distinti utgör den öppna långsidan. Curva Nord Matteo Bagnaresi är klackens bultande hjärta där de gule-blå supporterflaggorna svajar under hela matchen.",
    packages: "Upplev fantastisk Serie A-fotboll kombinerat med världsledande matkultur (parmaskinka och parmesanost). Paketen inkluderar matchbiljett på Tardini samt hotellboende i centrala Parma.",
    history: "Parma Calcio grundades 1913. Klubbens storhetstid under 1990-talet – kända som 'I Ducali' eller 'Gialloblù' – var magisk. Med stjärnor som Gianluigi Buffon, Fabio Cannavaro och Hernán Crespo vann klubben tre europeiska titlar (UEFA-cupen och Cupvinnarcupen) samt två italienska cuper.",
    faqs: [
      {
        question: "Hur tar man sig till Stadio Ennio Tardini?",
        answer: "Arenan ligger extremt centralt! Det tar bara 15–20 minuters promenad från Parmas historiska stadskärna eller tågstationen Stazione di Parma."
      },
      {
        question: "Vilken är klubbens kända läktarsymbol?",
        answer: "Parma spelar i en klassisk tröja med ett svart kors på vit botten (Crociati) på hemmaplan och gul-blå ränder på bortaplan."
      }
    ]
  },

  "cagliari": {
    name: "Cagliari Calcio",
    league: "Serie A",
    stadiumName: "Unipol Domus",
    location: "Cagliari, Italien",
    logo: "/logos/cagliari.png",
    heroImage: "/stadiums/unipol-domus-hero.jpg",
    stadiumLayoutImage: "/stadiums/unipol-domus-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Unipol+Domus,+Cagliari&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Unipol Domus (tidigare Sardegna Arena) invigdes 2017 som en tillfällig men extremt intim arena i väntan på nya Stadio Sant'Elia. Arenan rymmer cirka 16 400 åskådare och ligger nära havet i Cagliari. Med moduluppbyggda läktare extremt nära planen skapas en sydländsk, passionerad och kokande atmosfär.",
    aboutTickets: "Jämför biljetter till Cagliari Calcio på Unipol Domus. Se priser och fotbollspaket för Serie A-matcher på Sardinien.",
    howToBuy: "Biljetter säljs via Cagliaris officiella portal. Eftersom kapaciteten är kompakt säljer Serie A-matcherna ofta slut fort. För tillresande svenska besökare är det smidigast att boka garanterade biljetter och boende via biljetterfotboll.se.",
    sectionsAndPrices: "Main Stand (Tribuna) erbjuder bäst överblick och komfort, medan Main Stand Distinti ligger på motsatt långsida. Curva Nord skapar den mest eldiga stämningen i hela arenan.",
    packages: "Kombinera Serie A-fotboll med sol, bad och medelhavskultur på Sardinien. I våra fotbollspaket ingår matchbiljett på Unipol Domus samt boende på godkända hotell i centrala Cagliari.",
    history: "Cagliari Calcio grundades 1920 och kallas 'Rossoblù' eller 'I Isolani' (Öborna). Klubbens största historiska stund inträffade säsongen 1969/1970 när man under ledning av den legendariske skyttekungen Gigi Riva vann en sensationell Scudetto (Serie A-guld) till hela öns stolthet.",
    faqs: [
      {
        question: "Hur tar man sig till Unipol Domus?",
        answer: "Arenan ligger i södra Cagliari nära hamnen och Sant'Elia-området. Ta stadsbuss (linje 6, PQ eller PF) från centrala Piazza Matteotti direct till stadion."
      },
      {
        question: "Vilka färger spelar Cagliari i?",
        answer: "Klubbens klassiska färger är mörkrött och mörkblått (Rossoblù), ofta uppdelat i halvor på matchtröjan."
      }
    ]
  },
  "genoa": {
    name: "Genoa CFC",
    league: "Serie A",
    stadiumName: "Stadio Luigi Ferraris",
    location: "Genua, Italien",
    logo: "/logos/genoa.png",
    heroImage: "/stadiums/luigi-ferraris-hero.jpg",
    stadiumLayoutImage: "/stadiums/luigi-ferraris-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Luigi+Ferraris,+Genoa&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadio Luigi Ferraris (även känd som Marassi) invigdes 1911 och är Italiens äldsta fotbollsarena som fortfarande används. Arenan rymmer drygt 33 200 åskådare och kännetecknas av sin engelska arkitekturstil med branta läktare extremt nära planen och fyra markanta röda hörntorn, vilket skapar en otroligt tät och elektrisk stämning.",
    aboutTickets: "Boka biljetter till Genoa CFC på historiska Stadio Luigi Ferraris. Jämför priser på matchbiljetter och paketresor till Serie A i Ligurien.",
    howToBuy: "Biljetter säljs via Genoas officiella biljettsystem och auktoriserade ombud. Till stadsderbyt (Derby della Lanterna) samt matcher mot storlagen rekommenderas starkt att boka garanterade biljetter och hotellpaket i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna och Distinti utgör de två långsidorna med utmärkt sikt, medan den berömda Curva Nord är Genoas bultande hjärta där klubbens mest passionerade supportergrupper samlas och bjuder på fantastiska tifo-arrangemang.",
    packages: "Upplev klassisk italiensk läktarkultur i hamnstaden Genua. Våra paketresor inkluderar officiell matchbiljett på Marassi samt boende på utvalda hotell i centrala Genua.",
    history: "Genoa Cricket and Football Club grundades 1893 och är Italiens äldsta verksamma fotbollsklubb. Laget spelar i rött och mörkblått ('Il Grifone') och har vunnit den italienska ligatiteln nio gånger, vilket gör dem till en av landets mest historiska och traditionsrika föreningar.",
    faqs: [
      {
        question: "Hur tar man sig till Stadio Luigi Ferraris?",
        answer: "Arenan ligger i stadsdelen Marassi, cirka 20–25 minuters promenad från tågstationen Stazione di Genova Brignole. Det går även tät busstrafik (linje 37 och SM) direkt till stadion."
      },
      {
        question: "Vad kallas stadsderbyt i Genua?",
        answer: "Mötet mellan Genoa CFC och lokalrivalen UC Sampdoria kallas för 'Derby della Lanterna', uppkallat efter Genuas berömda fyr (La Lanterna)."
      }
    ]
  },

  "lecce": {
    name: "US Lecce",
    league: "Serie A",
    stadiumName: "Stadio Via del Mare",
    location: "Lecce, Italien",
    logo: "/logos/lecce.png",
    heroImage: "/stadiums/via-del-mare-hero.jpg",
    stadiumLayoutImage: "/stadiums/via-del-mare-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Via+del+Mare,+Lecce&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadio Via del Mare invigdes 1966 och är en av de största fotbollsarenorna i sydöstra Italien med en kapacitet på drygt 31 500 åskådare. Arenan är känd för sin öppna ovala design och den varma, sydländska atmosfären som skapas av Apuliens mest passionerade fotbollsfans.",
    aboutTickets: "Jämför biljetter till US Lecce på Stadio Via del Mare. Hitta prisvärda matchbiljetter och fotbollspaket för Serie A i klacken av den italienska stöveln.",
    howToBuy: "Biljetter släpps vanligtvis 1–2 veckor före matchdag via Lecces officiella försäljningskanaler. För tillresande fotbollsturister är det smidigast att säkra biljetter och hotellboende bekvämt i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna Centrale och Tribuna Est erbjuder bekväma platser längs långsidorna. Curva Nord är hemvist för Lecces Ultras och bjuder på oavbruten sång och inramning, medan Curva Sud rymmer övriga hemmafans och familjer.",
    packages: "Upplev fantastisk fotboll i Apulien kombinerat med Lecces berömda barockarkitektur och kulinariska utbud. I våra paket ingår matchbiljett samt boende på godkända hotell i centrala Lecce.",
    history: "Unione Sportiva Lecce grundades 1908. Laget spelar i gula och röda ränder ('I Giallorossi' eller 'I Salentini') och representerar hela Salento-halvön. Klubben har gjort sig känd för sin förmåga att fostra talanger och spela en frimodig fotboll i Italiens högsta serie.",
    faqs: [
      {
        question: "Hur tar man sig till Stadio Via del Mare?",
        answer: "Arenan ligger cirka 3 km öster om Lecces historiska centrum. Du tar dig enkelt hit med stadsbuss (linje M1 eller särskilda matchbussar) på cirka 10–15 minuter från tågstationen."
      },
      {
        question: "Vilka färger spelar Lecce i?",
        answer: "Lecce spelar i gula och röda tröjor, vilket har gett dem smeknamnet 'I Giallorossi'."
      }
    ]
  },

  "venezia": {
    name: "Venezia FC",
    league: "Serie A",
    stadiumName: "Stadio Pier Luigi Penzo",
    location: "Venedig, Italien",
    logo: "/logos/venezia.png",
    heroImage: "/stadiums/pier-luigi-penzo-hero.jpg",
    stadiumLayoutImage: "/stadiums/pier-luigi-penzo-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Pier+Luigi+Penzo,+Venezia&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadio Pier Luigi Penzo invigdes 1913 och är Italiens näst äldsta arena för professionell fotboll. Belägen längst ut på ön Sant'Elena i Venedigs östra spets rymmer arenan cirka 11 150 åskådare. Det är en helt unik matchupplevelse där besökare anländer via vattenbuss (vaporetto) eller till fots längs kanalerna.",
    aboutTickets: "Säkra biljetter till Venezia FC på magiska Stadio Pier Luigi Penzo. Jämför matchbiljetter och paketresor till en av världens mest unika fotbollsdestinationer.",
    howToBuy: "På grund av arenans begränsade kapacitet säljer biljetterna till Venezias hemmamatcher i Serie A snabbt slut. Boka dina garanterade matchbiljetter och hotellpaket smidigt i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna Coperta är den täckta huvudläktaren som ger bäst komfort, medan Distinti erbjuder utmärkt sikt från motsatta långsidan. Curva Sud samlar de mest hängivna orange-svart-gröna hemmasupportrarna.",
    packages: "Upplev fotboll i världsklass kombinerat med Venedigs romantiska kanaler och kulturskatter. Paketen inkluderar officiell matchbiljett på Penzo samt boende på utvalda hotell i Venedig eller på fastlandet (Mestre).",
    history: "Venezia Football Club grundades 1907 och kallas 'I Arancioneroverdi' på grund av sina ikoniska klubbfärger orange, svart och grönt. Klubben har under senare år blivit internationellt berömd för sin stilbildande design, modeinriktade matchtröjor och moderna varumärkesprofilering.",
    faqs: [
      {
        question: "Hur tar man sig till Stadio Pier Luigi Penzo?",
        answer: "Eftersom arenan ligger på en ö tar man sig bäst hit med vattenbuss (Vaporetto linje 1, 4.1, 4.2, 5.1 eller 5.2) till hållplatsen 'Sant'Elena', belägen bara ett par minuters promenad från grindarna."
      },
      {
        question: "Vad gör arenan unik i Europa?",
        answer: "Det är den enda professionella fotbollsarenan i de stora europeiska ligorna som du måste åka båt eller gå längs kanalpromenader för att nå."
      }
    ]
  },

  "frosinone": {
    name: "Frosinone Calcio",
    league: "Serie A",
    stadiumName: "Stadio Benito Stirpe",
    location: "Frosinone, Italien",
    logo: "/logos/frosinone.png",
    heroImage: "/stadiums/benito-stirpe-hero.jpg",
    stadiumLayoutImage: "/stadiums/benito-stirpe-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Benito+Stirpe,+Frosinone&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadio Benito Stirpe invigdes 2017 och rymmer drygt 16 200 åskådare. Arenan är en av ytterst få helt klubbägda och moderna fotbollsarenor i Italien. Med helt täckta läktare och stängda hörn sitter publiken extremt nära planen, vilket skapar en intim, högljudd och familjär stämning i regionen Lazio.",
    aboutTickets: "Boka biljetter till Frosinone Calcio på Benito Stirpe. Jämför priser på Serie A-matcher strax söder om Rom.",
    howToBuy: "Biljetter köps via Frosinones officiella biljettpartner. Matcher mot storlag som Roma, Lazio och Juventus blir snabbt utsålda, så tänk på att förbeställa dina biljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Main Stand (Tribuna) har exklusiva platser och sponsorsektioner, medan Tribuna Est är den stora långsidan mittemot. Curva Nord samlar den passionerade skaran av gule-blå hemmafans.",
    packages: "Kombinera din fotbollsresa till Italiens huvudstad Rom med en utflykt till gemytliga Frosinone. I våra paket ingår matchbiljett på Benito Stirpe samt hotellboende.",
    history: "Frosinone Calcio grundades 1928 och kallas 'I Ciociari' eller 'I Canarini' (Kanarierna) på grund av sina gul-blå matchställ. Klubben har gjort en imponerande resa genom det italienska seriesystemet under 2000-talet och etablerat sig som en välskött utmanare i Serie A.",
    faqs: [
      {
        question: "Hur tar man sig till Frosinone från Rom?",
        answer: "Det går täta regionaltåg från Roms centralstation (Roma Termini) till Frosinone som tar cirka 50–60 minuter. Från stationen i Frosinone tar det ca 10 minuter med taxi eller buss till stadion."
      },
      {
        question: "Varför kallas laget för 'I Ciociari'?",
        answer: "Smeknamnet härstammar från Ciociaria, det historiska och geografiska området i södra Lazio där staden Frosinone ligger."
      }
    ]
  },

  "torino": {
    name: "Torino FC",
    league: "Serie A",
    stadiumName: "Stadio Olimpico Grande Torino",
    location: "Turin, Italien",
    logo: "/logos/torino.png",
    heroImage: "/stadiums/stadio-olimpico-grande-torino-hero.jpg",
    stadiumLayoutImage: "/stadiums/stadio-olimpico-grande-torino-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Olimpico+Grande+Torino,+Turin&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadio Olimpico Grande Torino invigdes ursprungligen 1933 och totalrenoverades inför Vinter-OS 2006. Arenan rymmer drygt 28 100 åskådare och uppkallades till minne av det legendariska 'Grande Torino'-laget från 1940-talet. Arenan bjuder på en intensiv och stolt supporterkultur i hjärtat av Piemonte.",
    aboutTickets: "Boka biljetter till Torino FC på Stadio Olimpico Grande Torino. Jämför priser för Serie A-fotboll och stadsderbyn i Turin.",
    howToBuy: "Biljetter släpps via Torinos officiella försäljningsportaler cirka två veckor före match. Till stadsderbyt 'Derby della Mole' mot Juventus är trycket enormt, varför förbokning av biljetter och paket via biljetterfotboll.se rekommenderas.",
    sectionsAndPrices: "Tribuna Granata och Distinti täcker långsidorna, medan den berömda Curva Maratona är känd i hela Italien som en av landets mest stämningsfulla och sjungande supporterläktare.",
    packages: "Upplev Turins eleganta kultur, fantastiska mat och passionerade fotboll. Våra paketresor inkluderar officiell matchbiljett samt boende på utvalda hotell i centrala Turin.",
    history: "Torino Football Club grundades 1906. Klubben spelar i sina ikoniska vinröda tröjor ('I Granata') och har vunnit Serie A sju gånger. Klubbens storhetstid var på 1940-talet då 'Grande Torino' dominerade italiensk fotboll fram till den tragiska Superga-flygolyckan 1949.",
    faqs: [
      {
        question: "Hur tar man sig till Stadio Olimpico Grande Torino?",
        answer: "Arenan ligger i stadsdelen Santa Rita i södra Turin. Du tar dig enkelt hit med spårvagn (linje 4 eller 10) direkt från tågstationen Porta Nuova på cirka 15 minuter."
      },
      {
        question: "Vad heter det kända lokala derbyt mot Juventus?",
        answer: "Det lokala derbyt kallas 'Derby della Mole', uppkallat efter Turins kända landmärke Mole Antonelliana."
      }
    ]
  },

  "sassuolo": {
    name: "US Sassuolo Calcio",
    league: "Serie A",
    stadiumName: "Mapei Stadium – Città del Tricolore",
    location: "Reggio Emilia, Italien",
    logo: "/logos/sassuolo.png",
    heroImage: "/stadiums/mapei-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/mapei-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Mapei+Stadium,+Reggio+Emilia&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Mapei Stadium – Città del Tricolore invigdes 1995 och rymmer cirka 21 500 åskådare. Arenan ligger i närbelägna Reggio Emilia och är hemmaarena för Sassuolo sedan deras uppflyttning till Serie A. Arenan erbjuder utmärkta siktlinjer, moderna faciliteter och en mycket familjevänlig matchmiljö.",
    aboutTickets: "Boka biljetter till US Sassuolo Calcio på Mapei Stadium. Jämför priser för underhållande Serie A-fotboll i regionen Emilia-Romagna.",
    howToBuy: "Biljetter säljs via klubbens biljettpartner. Matcher mot storlagen som Inter, Milan och Juventus drar fulla hus. Säkra din platser och hotell över helgen enkelt via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna Main och Tribuna Mapei utgör de välskötta långsidorna, medan Tribuna Sud inhyser Sassuolos hemmasupportrar. Bortasupportrar placeras i Tribuna Nord.",
    packages: "Upplev charmig italiensk fotboll kombinerat med världsledande gastronomi i Emilia-Romagna (Bologna, Parma, Modena). I våra paket ingår matchbiljett samt boende på godkända hotell.",
    history: "Unione Sportiva Sassuolo Calcio grundades 1920 i den lilla porslinstillverkande staden Sassuolo. Klubben kallas 'I Neroverdi' på grund av sina grön-svartrandiga tröjor. Sassuolo har under 2010- och 2020-talen gjort sig kända för sin moderna, spelförande fotboll och fantastiska spelarutveckling.",
    faqs: [
      {
        question: "Varför spelar Sassuolo i Reggio Emilia?",
        answer: "Klubbens ursprungliga arena i staden Sassuolo uppfyller inte Serie A-krav. Mapei-koncernen köpte därför arenan i Reggio Emilia (cirka 25 km bort) för att ge laget en modern hemmaplan."
      },
      {
        question: "Hur tar man sig till Mapei Stadium?",
        answer: "Från tågstationen Reggio Emilia AV (snabbtågsstationen Mediopadana) är det bara cirka 20 minuters promenad eller en kort taxiresa till stadion."
      }
    ]
  },

  "fiorentina": {
    name: "ACF Fiorentina",
    league: "Serie A",
    stadiumName: "Stadio Artemio Franchi",
    location: "Florens, Italien",
    logo: "/logos/fiorentina.png",
    heroImage: "/stadiums/artemio-franchi-hero.jpg",
    stadiumLayoutImage: "/stadiums/artemio-franchi-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadio+Artemio+Franchi,+Florence&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadio Artemio Franchi invigdes 1931 och är ett berömt mästerverk inom italiensk funktionalistisk arkitektur, ritat av Pier Luigi Nervi. Arenan rymmer drygt 43 000 åskådare och är känd för sitt ikoniska maratontorn (Torre del Maratona). Belägen i den vackra renässansstaden Florens bjuder Franchi på en passionerad, lila fotbollskultur.",
    aboutTickets: "Boka biljetter till ACF Fiorentina på Stadio Artemio Franchi. Jämför priser på matchbiljetter och paketresor för Serie A-fotboll i Toscana.",
    howToBuy: "Biljetter släpps via Fiorentinas officiella biljettsystem cirka två veckor före avspark. För stormatcher mot Juventus, Roma eller Milan rekommenderas starkt att förboka garanterade biljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna VIP och Maratona är utmärkta långsidor med perfekt överblick, medan den berömda Curva Fiesole är klubbens supporterhjärta där Florens lila stolthet kokar under varje match.",
    packages: "Upplev toskansk fotbollspassion kombinerat med Florens världskända konst, historia och gastronomi. I våra paket ingår matchbiljett på Franchi samt boende på utvalda hotell i centrala Florens.",
    history: "ACF Fiorentina grundades 1926 och kallas 'La Viola' (De lila) eller 'I Gigliati' (Liljorna). Klubben spelar i sina unika lila tröjor och har vunnit Serie A två gånger. Legendariska spelare som Gabriel Batistuta, Giancarlo Antognoni och Roberto Baggio har förskönat klubbens historia.",
    faqs: [
      {
        question: "Hur tar man sig till Stadio Artemio Franchi?",
        answer: "Arenan ligger i stadsdelen Campo di Marte, cirka 2 km öster om Florens historiska centrum. Du tar dig enkelt hit med lokal tågförbindelse till stationen Firenze Campo di Marte eller buss (linje 6, 11 eller 17)."
      },
      {
        question: "Vilken är Fiorentinas största rivalmatch?",
        answer: "Matcher mot Juventus väcker enorma känslor i Florens och räknas som säsongens mest laddade möte på Stadio Artemio Franchi."
      }
    ]
  },
  "lens": {
    name: "RC Lens",
    league: "Ligue 1",
    stadiumName: "Stade Bollaert-Delelis",
    location: "Lens, Frankrike",
    logo: "/logos/lens.png",
    heroImage: "/stadiums/bollaert-delelis-hero.jpg",
    stadiumLayoutImage: "/stadiums/bollaert-delelis-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Bollaert-Delelis,+Lens&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade Bollaert-Delelis invigdes 1934 och rymmer drygt 38 000 åskådare – vilket faktiskt är mer än hela staden Lens befolkning! Arenan har varit värd för både VM 1998 och EM 2016. Med sina fyra separata och branta läktare skapas en legendarisk och gåshudsframkallande läktarkultur som ofta nämns som den bästa i hela Frankrike.",
    aboutTickets: "Boka biljetter till RC Lens på historiska Stade Bollaert-Delelis. Jämför priser på matchbiljetter och fotbollsresor till franska Ligue 1.",
    howToBuy: "Eftersom nästan varje hemmamatch säljer slut blixtsnabbt är det svårt att få tag på biljetter direkt via klubbens öppna försäljning. För säkraste och smidigaste bokning av officiella biljetter och hotellpaket rekommenderas biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Lepagnot och Tribune Delacourt täcker långsidorna, medan Tribune Marek (ståplats på nedre delen av Lepagnot) och Tribune Trannin är hjärtat för hemmafansen. Supporterhymnen 'Les Corons' i halvtid är en av fotbollsvärldens mest magiska upplevelser.",
    packages: "Upplev den unika kolgruve- och supporterkulturen i norra Frankrike. I våra prisvärda paket ingår matchbiljett på Bollaert-Delelis samt hotellövernattning i Lens eller närbelägna Lille.",
    history: "Racing Club de Lens grundades 1906 och kallas 'Les Sang et Or' (De blod- och guldfärgade). Klubbens identitet är djupt rotad i regionens gruvarbetarhistoria. Höjdpunkten i klubbens historia inträffade säsongen 1997/1998 när laget vann sin första och hittills enda Ligue 1-titel.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Bollaert-Delelis?",
        answer: "Arenan ligger ytterst centralt i Lens, endast 10–15 minuters promenad från tågstationen Gare de Lens (som har direktförbindelse med snabb-TGV från Paris och Lille)."
      },
      {
        question: "Vad sjungs i halvtid på Bollaert-Delelis?",
        answer: "Hela stadion stämmer samstämmigt upp i Pierre Bachelets kända sång 'Les Corons', en hyllning till regionens kolgruvarbetare."
      }
    ]
  },

  "auxerre": {
    name: "AJ Auxerre",
    league: "Ligue 1",
    stadiumName: "Stade Abbé-Deschamps",
    location: "Auxerre, Frankrike",
    logo: "/logos/auxerre.png",
    heroImage: "/stadiums/abbe-deschamps-hero.jpg",
    stadiumLayoutImage: "/stadiums/abbe-deschamps-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Abb%C3%A9-Deschamps,+Auxerre&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade Abbé-Deschamps invigdes 1918 och rymmer drygt 18 500 åskådare. Arenan ligger vackert belägen direkt intill floden Yonne och är unik då den faktiskt ägs av klubben själv. Med nära avstånd till planen och en genuin, traditionell fransk fotbollsmiljö erbjuder stadion en mycket charmig matchdag.",
    aboutTickets: "Jämför biljetter till AJ Auxerre på Stade Abbé-Deschamps. Se priser för matchbiljetter och paketresor till Ligue 1 i Bourgogne.",
    howToBuy: "Biljetter säljs via AJ Auxerres officiella biljettsida samt på matchdagen vid arenan i mån av plats. För stormatcher mot lag som PSG, Marseille och Lyon rekommenderas förbokning av garanterade biljetter och boende via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Honneur och Tribune Capitaine Leclerc erbjuder bäst komfort och överblick, medan Tribune Leclerc Bas och Tribune Sens samlar de mest hängivna blå-vita hemmasupportrarna.",
    packages: "Kombinera fransk ligafotboll med fantastisk gastronomisk kultur och berömda viner i Bourgogne. Paketen inkluderar matchbiljett på Stade Abbé-Deschamps och hotellboende i Auxerre.",
    history: "Association Jeunesse Auxerroise grundades 1905 av prästen Abbé Deschamps. Klubbens moderna historia är synonym med tränarlegendaren Guy Roux som ledde laget i över 40 år och tog dem från amatörligorna till Ligue 1-titeln 1996 samt framgångar i Champions League.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Abbé-Deschamps?",
        answer: "Arenan ligger drygt 2 km söder om stadens centrum. Det tar cirka 20–25 minuter att gå längs floden Yonne från den historiska stadskärnan eller tågstationen."
      },
      {
        question: "Varför heter arenan Stade Abbé-Deschamps?",
        answer: "Arenan uppkallades efter klubbens grundare, prästen Abbé Ernest Deschamps, som köpte marken där stadion står idag."
      }
    ]
  },

  "troyes": {
    name: "ESTAC Troyes",
    league: "Ligue 1",
    stadiumName: "Stade de l'Aube",
    location: "Troyes, Frankrike",
    logo: "/logos/troyes.png",
    heroImage: "/stadiums/stade-de-laube-hero.jpg",
    stadiumLayoutImage: "/stadiums/stade-de-laube-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+de+l'Aube,+Troyes&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade de l'Aube invigdes 1925 och totalrenoverades i början av 2000-talet till en modern arena med kapacitet för cirka 20 400 åskådare. Arenan är känd för sin renodlade design, bekväma sittplatser och var bland de första i Frankrike att installera hybridgräs.",
    aboutTickets: "Boka biljetter till ESTAC Troyes på Stade de l'Aube. Jämför priser på matchbiljetter och fotbollspaket i Champagne-regionen.",
    howToBuy: "Biljetter köps enkelt via ESTAC Troyes officiella webbplats. Om du planerar en fotbollsresa från Sverige säljs garanterade biljetter och prisvärda hotellpaket smidigt via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Vitoux och Tribune Marcel Vitoux är de täckta huvudläktarna med utmärkt sikt. Tribune Seine och Tribune Marne samlar klubbens hemmaklacker och familjesektioner.",
    packages: "Boka en fotbollshelg i hjärtat av Champagne-regionen. I våra paket ingår officiell matchbiljett på Stade de l'Aube samt boende på utvalda hotell i pittoreska Troyes.",
    history: "ESTAC (Espérance Sportive Troyes Aube Champagne) grundades 1986 som en fortsättning på stadens historiska fotbollsklubbar. Laget spelar i blå-vita ställ och ingår sedan 2020 i City Football Group-nätverket.",
    faqs: [
      {
        question: "Hur tar man sig till Stade de l'Aube?",
        answer: "Arenan ligger cirka 2 km sydost om Troyes centrum. Du tar dig enkelt hit med stadsbuss (linje 1 eller 6) från tågstationen på 10–15 minuter."
      },
      {
        question: "Vilken region ligger Troyes i?",
        answer: "Troyes är den historiska huvudstaden i Champagne-regionen, känd för sina korsvirkeshus och sin champagneproduktion."
      }
    ]
  },

  "paris-fc": {
    name: "Paris FC",
    league: "Ligue 1",
    stadiumName: "Stade Jean-Bouin",
    location: "Paris, Frankrike",
    logo: "/logos/paris-fc.png",
    heroImage: "/stadiums/jean-bouin-hero.jpg",
    stadiumLayoutImage: "/stadiums/jean-bouin-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Jean-Bouin,+Paris&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade Jean-Bouin totalrenoverades 2013 till en hypermodern arena med en spektakulär asymmetrisk fasad och takkonstruktion i nätmönstrad betong. Arenan rymmer knappt 20 000 åskådare och ligger granne med ikoniska Parc des Princes i det 16:e arrondissementet i Paris.",
    aboutTickets: "Jämför biljetter till Paris FC på Stade Jean-Bouin. Säkra din plats på parisscenen och upplev det spännande alternativet till PSG.",
    howToBuy: "Biljetter släpps via Paris FC:s officiella biljettportal. För besökare som vill kombinera en storstadsresa till Paris med fransk toppfotboll går det lätt att boka biljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Preszbourger och Tribune Paris utgör de komfortabla långsidorna, medan Tribune Parc des Princes och Tribune Gilardi rymmer klacksektionerna med utmärkt närhet till planens händelser.",
    packages: "Upplev den franska huvudstadens fantastiska utbud kombinerat med tillgänglig och familjär ligafotboll. Våra paket inkluderar matchbiljett samt boende på hotell i Paris.",
    history: "Paris Football Club grundades 1969 och har en snårig historia där man från början slogs ihop med Stade Saint-Germain för att bilda PSG, innan klubbarna delades upp igen 1972. Paris FC spelar i mörkblå ställ och har byggt upp en stark lokal förankring i huvudstaden.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Jean-Bouin?",
        answer: "Ta tunnelbanan (Metro linje 9 till station Porte de Saint-Cloud eller linje 10 till station Porte d'Auteuil). Arenan ligger precis tvärs över gatan från Parc des Princes."
      },
      {
        question: "Delar Paris FC sin arena med något annat lag?",
        answer: "Ja, Stade Jean-Bouin är även hemmaarena för det berömda parisiska rugbylaget Stade Français."
      }
    ]
  },

  "le-mans": {
    name: "Le Mans FC",
    league: "Ligue 1",
    stadiumName: "Stade Marie-Marvingt",
    location: "Le Mans, Frankrike",
    logo: "/logos/le-mans.png",
    heroImage: "/stadiums/marie-marvingt-hero.jpg",
    stadiumLayoutImage: "/stadiums/marie-marvingt-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Marie-Marvingt,+Le+Mans&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade Marie-Marvingt (tidigare känd som MMArena) invigdes 2011 och rymmer drygt 25 000 åskådare. Arenan är belägen inuti det legendariska motorsportområdet Circuit de la Sarthe. Det är en modern, helt täckt arena med utmärkta siktlinjer och hög komfort för besökarna.",
    aboutTickets: "Boka biljetter till Le Mans FC på Stade Marie-Marvingt. Jämför matchbiljetter och hotellpaket för fotboll i Pays de la Loire.",
    howToBuy: "Biljetter köps via Le Mans FC:s officiella biljettkanal. Planerar du en fotbollsresa från Sverige bokar du smidigt garanterade platser och hotell via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Auvergne och Tribune Bretagne täcker de två stora långsidorna. Supportergrupperna samlas huvudsakligen på den södra kortsidan som bjuder på en härlig stämning.",
    packages: "Kombinera motorsportens och fotbollens värld i historiska Le Mans. Paketen inkluderar matchbiljett på Stade Marie-Marvingt samt boende på centrala hotell.",
    history: "Le Mans FC grundades 1985 (som Le Mans Union Club 72). Klubben spelar i rött och gult ('Les Sang et Or') och hade en framgångsrik period i Ligue 1 under 2000-talet där spelare som Didier Drogba och Gervinho slog igenom.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Marie-Marvingt?",
        answer: "Det enklaste sättet är att ta spårvagnen (Linje T1 mot Antarès - Stade Marie-Marvingt) direkt från centralstationen Gare du Mans till slutstationen precis vid arenan."
      },
      {
        question: "Vem är arenan uppkallad efter?",
        answer: "Arenan döptes om 2022 efter Marie Marvingt, en berömd fransk idrottspionjär, bergsklättrare och stridspilot."
      }
    ]
  },

  "brest": {
    name: "Stade Brestois 29",
    league: "Ligue 1",
    stadiumName: "Stade Francis-Le Blé",
    location: "Brest, Frankrike",
    logo: "/logos/brest.png",
    heroImage: "/stadiums/francis-le-ble-hero.jpg",
    stadiumLayoutImage: "/stadiums/francis-le-ble-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Francis-Le+Bl%C3%A9,+Brest&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade Francis-Le Blé invigdes 1926 och rymmer cirka 15 220 åskådare. Arenan är känd för sin kompakta arkitektur, nära avstånd till planen och den extrema atlantvinden. Här upplever du genuin bretonsk fotbollspassion med en högljudd och lojal hemmapublik.",
    aboutTickets: "Jämför biljetter till Stade Brestois 29 på Stade Francis-Le Blé. Se priser och fotbollsresor för matcher i Bretagne.",
    howToBuy: "Biljetter säljs via klubbens officiella biljettbutik. Eftersom arenans kapacitet är begränsad blir matcherna mot topplagen snabbt utsålda. Säkra din matchbiljett och hotell i Brest i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Arkéa och Tribune Crédit Mutuel utgör de täckta långsidorna. Tribune Eurodif och Kemper samlar de mest röststarka bretonska hemmafansen.",
    packages: "Upplev karga kustlandskap, bretonsk kultur och intensiv fotboll i Brest. I våra fotbollspaket ingår matchbiljett samt boende på utvalda hotell i centrala Brest.",
    history: "Stade Brestois 29 grundades 1950 genom en sammanslagning av flera lokala katolska föreningar. Laget spelar i röda och vita tröjor ('Les Ty' Zefs') och har etablerat sig som ett tufft och svårslaget lag i fransk toppfotboll.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Francis-Le Blé?",
        answer: "Arenan ligger i stadsdelen Sanquer, knappt 2 km från Brests centrum. Du tar dig enkelt hit med spårvagn (Linje A till hållplatsen Strasbourg) på 5–10 minuter."
      },
      {
        question: "Vad betyder 'Ty' Zefs'?",
        answer: "Det är ett lokalt bretonskt uttryck som syftar på invånarna i Brest och de friska atlantvindarna som ofta blåser över staden."
      }
    ]
  },

  "lorient": {
    name: "FC Lorient",
    league: "Ligue 1",
    stadiumName: "Stade du Moustoir",
    location: "Lorient, Frankrike",
    logo: "/logos/lorient.png",
    heroImage: "/stadiums/du-moustoir-hero.jpg",
    stadiumLayoutImage: "/stadiums/du-moustoir-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+du+Moustoir,+Lorient&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade du Moustoir (officiellt Stade Yves Allainmat) rymmer cirka 18 100 åskådare och ligger mitt i centrala Lorient. Arenan är känd för sitt konstgräs under många år (numera hybridgräs) och sina starkt orange-svarta läktare som skapar en festlig och familjär atmosfär.",
    aboutTickets: "Boka biljetter till FC Lorient på Stade du Moustoir. Jämför priser för matchbiljetter och resor till Ligue 1 i Bretagne.",
    howToBuy: "Biljetter säljs via FC Lorients officiella biljettportal. För besökare som vill säkra garanterade sittplatser och hotellövernattning bokas detta enkelt via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Jean-Féry och Tribune Crédit Agricole utgör de moderna långsidorna. Tribune B&B Hôtels och Tribune South Lorient samlar de mest hängivna orangea supportergrupperna.",
    packages: "Upplev den bretonska hamnstaden Lorient och dess färgstarka fotbollskultur. Paketen inkluderar matchbiljett på Stade du Moustoir samt boende på centrala hotell.",
    history: "Football Club Lorient-Bretagne Sud grundades 1926 och kallas 'Les Merlus' (Kullarna/Kummel-fiskarna). Klubben är känd för sin attraktiva passningsorienterade fotboll, fostrad under tränarikonen Christian Gourcuff, samt sin vinst i Franska Cupen 2002.",
    faqs: [
      {
        question: "Hur tar man sig till Stade du Moustoir?",
        answer: "Arenan ligger mitt i stan! Det tar knappt 10 minuter att gå från tågstationen Gare de Lorient eller rådhuset."
      },
      {
        question: "Varför kallas laget för 'Les Merlus'?",
        answer: "Smeknamnet betyder kummel (en fisk som är vanlig i Lorients hamn) och härstammar från klubbens tidiga år då fisken prydde lokal handel och klubbsymboler."
      }
    ]
  },
  "toulouse": {
    name: "Toulouse FC",
    league: "Ligue 1",
    stadiumName: "Stadium de Toulouse",
    location: "Toulouse, Frankrike",
    logo: "/logos/toulouse.png",
    heroImage: "/stadiums/stadium-de-toulouse-hero.jpg",
    stadiumLayoutImage: "/stadiums/stadium-de-toulouse-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadium+de+Toulouse&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadium de Toulouse invigdes 1937 och rymmer drygt 33 000 åskådare. Arenan ligger vackert belägen på ön Île du Ramier mitt i floden Garonne och renoverades inför EM 2016. Med sin klassiska ovala form kallas den ibland för 'Lilla Maracanã' och bjuder på en härlig lila supporterfest.",
    aboutTickets: "Boka biljetter till Toulouse FC på Stadium de Toulouse. Jämför priser för Ligue 1-matcher i sydvästra Frankrike.",
    howToBuy: "Biljetter köps enklast via Toulouse FC:s officiella biljettbutik. För tillresande besökare som vill säkra garanterade matchbiljetter och bra hotellboende rekommenderas biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Honneur och Tribune Sud täcker de två stora långsidorna. Virage Brice Taton (kortsidan) är hemvist för klubbens mest högljuda supportergrupper som skapar fantastisk stämning.",
    packages: "Upplev 'Den rosa staden' (La Ville Rose) kombinerat med sydfransk toppfotboll. Våra paket inkluderar matchbiljett på Stadium de Toulouse samt boende på godkända hotell i centrala Toulouse.",
    history: "Toulouse Football Club grundades 1970 (med anor från tidigare föreningar). Klubbens färger är lila och vitt ('Les Violets'). Toulouse har bland annat vunnit Franska Cupen och är kända för sin starka ungdomsakademi och moderna, datadrivna rekryteringsstrategi.",
    faqs: [
      {
        question: "Hur tar man sig till Stadium de Toulouse?",
        answer: "Arenan ligger på Île du Ramier. Du tar dig enkelt hit med tunnelbana (Linje B till stationen Empalot eller St-Michel) följt av 10–15 minuters promenad över bron till ön."
      },
      {
        question: "Varför spelar Toulouse FC i lila tröjor?",
        answer: "Lila är den officiella stadsfärgen för Toulouse, djupt förknippad med stadens historiska odling och handel av lila violer."
      }
    ]
  },

  "angers": {
    name: "Angers SCO",
    league: "Ligue 1",
    stadiumName: "Stade Raymond-Kopa",
    location: "Angers, Frankrike",
    logo: "/logos/angers.png",
    heroImage: "/stadiums/raymond-kopa-hero.jpg",
    stadiumLayoutImage: "/stadiums/raymond-kopa-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Raymond-Kopa,+Angers&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade Raymond-Kopa (tidigare Stade Jean-Bouin) invigdes 1912 och rymmer drygt 19 800 åskådare. Arenan har nyligen genomgått omfattande moderniseringar med nya täckta läktare tätt intill planen, vilket ger en riktigt fin och nära matchupplevelse i Loiredalen.",
    aboutTickets: "Jämför biljetter till Angers SCO på Stade Raymond-Kopa. Se priser och fotbollsresor för Ligue 1-matcher i västra Frankrike.",
    howToBuy: "Biljetter köps via Angers SCO:s officiella biljettportal. För svenska supportrar som vill kombinera resan med boende bokas biljetter och hotellpaket smidigt via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Saint-Léonard och Tribune Coubertin är de moderna långsidorna. Tribune Coubertin Bas samlar klubbens mest passionerade svart-vita hemmaklacker.",
    packages: "Utforska vackra Loiredalen och njut av fransk ligafotboll i Angers. Paketen inkluderar officiell matchbiljett på Stade Raymond-Kopa samt boende på utvalda hotell.",
    history: "Angers Sporting Club de l'Ouest grundades 1919 och spelar i svarta och vita ränder ('Les Scoïstes'). Klubben har fostrat och inhyst flera storspelare genom tiderna, däribland den franske legendaren Raymond Kopa som tog sina första seniorkliv i föreningen.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Raymond-Kopa?",
        answer: "Arenan ligger cirka 2 km sydost om centrala Angers. Det tar 20 minuter att gå från tågstationen Gare d'Angers-Saint-Laud eller 10 minuter med spårvagn (Linje A eller C)."
      },
      {
        question: "Vem är arenan uppkallad efter?",
        answer: "Stadion döptes 2017 om för att hedra Raymond Kopa, den legendariske Ballon d'Or-vinnaren som startade sin proffskarriär i Angers SCO."
      }
    ]
  },

  "le-havre": {
    name: "Le Havre AC",
    league: "Ligue 1",
    stadiumName: "Stade Océane",
    location: "Le Havre, Frankrike",
    logo: "/logos/le-havre.png",
    heroImage: "/stadiums/stade-oceane-hero.jpg",
    stadiumLayoutImage: "/stadiums/stade-oceane-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Oc%C3%A9ane,+Le+Havre&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade Océane invigdes 2012 och rymmer drygt 25 000 åskådare. Arenan är känd för sin miljövänliga design och sin lysande mörkblå yttre fasad som glittrar i den normandiska solen. Arenan erbjuder förstklassig komfort, utmärkt sikt och god energi i Normandie.",
    aboutTickets: "Boka biljetter till Le Havre AC på Stade Océane. Jämför priser för Ligue 1-fotboll vid den franska nordkusten.",
    howToBuy: "Biljetter köps direkt via Le Havre AC:s officiella biljettsida. För svenska besökare är det tryggt och enkelt att boka officiella matchbiljetter tillsammans med hotell via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Paul Le Metayer och Tribune Valery Meurice utgör de stora långsidorna. Kortsidan Kop Ciel et Marine är samlingspunkten för hemmalagets färgstarka supportergrupper.",
    packages: "Upplev den historiska hamnstaden Le Havre i Normandie kombinerat med fransk ligafotboll. Våra paket inkluderar matchbiljett på Stade Océane samt hotellboende.",
    history: "Le Havre Athletic Club grundades 1872 och är Frankrikes äldsta fotbollsklubb som fortfarande är i drift. Klubbens färger (ljusblått och mörkblått) valdes som en hyllning till Oxford och Cambridge. HAC har en av Frankrikes mest framgångsrika akademier som fostrat stjärnor som Paul Pogba och Riyad Mahrez.",
    faqs: [
      {
        question: "Hur tar man sig till Stade Océane?",
        answer: "Arenan ligger öster om stadens centrum. Det går direkta bussar (linje 3 eller 5) samt matchbussar från tågstationen Gare du Havre direkt till stadion."
      },
      {
        question: "Varför kallas klubben 'Le Doyen'?",
        answer: "Smeknamnet betyder 'Den äldste' och syftar på att Le Havre AC grundades 1872 och räknas som pionjären inom fransk fotboll."
      }
    ]
  },

  "monaco": {
    name: "AS Monaco",
    league: "Ligue 1",
    stadiumName: "Stade Louis II",
    location: "Monaco",
    logo: "/logos/monaco.png",
    heroImage: "/stadiums/stade-louis-ii-hero.jpg",
    stadiumLayoutImage: "/stadiums/stade-louis-ii-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stade+Louis+II,+Monaco&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stade Louis II invigdes 1985 i stadsdelen Fontvieille och rymmer drygt 16 300 åskådare. Arenan är ett arkitektoniskt underverk uppbyggt på mark som utvunnits ur havet. Med sina nio ikoniska valv på kortsidan och ett underjordiskt multisportkomplex bjuder arenan på en helt unik fotbollsupplevelse vid Franska Rivieran.",
    aboutTickets: "Boka biljetter till AS Monaco på Stade Louis II. Jämför priser på Ligue 1-matcher och Champions League-fotboll i furstendömet Monaco.",
    howToBuy: "Biljetter köps enklast online via AS Monacos officiella biljettportal. För resor från Sverige bokar du smidigt garanterade platser och boende i Monaco eller närbelägna Nice via biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Honneur och Tribune Première ger bäst utsikt över matchen och VIP-platserna. Pesage är kortsidan bakom målet där hemmalagets mest engagerade supportergrupp Ultras Monaco håller till.",
    packages: "Njut av glamour, sol och toppfotboll vid Medelhavet. I våra paket ingår matchbiljett på Stade Louis II samt hotellboende i Monaco eller centrala Nice.",
    history: "Association Sportive de Monaco Football Club grundades 1924 och har vunnit den franska ligatiteln åtta gånger. Trots att klubben hör hemma i ett av världens minsta länder har man en stolt europeisk historia och en av Kontinentens mest framgångsrika spelarakademier (som bland annat fostrat Kylian Mbappé).",
    faqs: [
      {
        question: "Hur tar man sig till Stade Louis II från Nice?",
        answer: "Det går täta lokaltåg (TER) från centrala Nice (Nice-Ville) till Monaco-Monte Carlo som tar knappt 20 minuter. Därefter är det cirka 15 minuters promenad eller en kort bussresa till stadion."
      },
      {
        question: "Varför har tröjan en diagonal uppdelning?",
        answer: "Den berömda rödvita diagonala tröjdesignen skapades 1960 av Princess Grace (Grace Kelly) och blev snabbt klubbens ikoniska varumärke."
      }
    ]
  },

  "rennes": {
    name: "Stade Rennais FC",
    league: "Ligue 1",
    stadiumName: "Roazhon Park",
    location: "Rennes, Frankrike",
    logo: "/logos/rennes.png",
    heroImage: "/stadiums/roazhon-park-hero.jpg",
    stadiumLayoutImage: "/stadiums/roazhon-park-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Roazhon+Park,+Rennes&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Roazhon Park (tidigare Stade de la Route de Lorient) invigdes 1912 och rymmer drygt 29 700 åskådare. Arenan renoverades i början av 2000-talet och är känd för sin röda, intensiva inramning och sin otroliga närhet till planen. Det är en av de mest stämningsfulla och svåraste bortaarenorna i Ligue 1.",
    aboutTickets: "Jämför biljetter till Stade Rennais FC på Roazhon Park. Säkra din plats för toppmatcher i bretonsk ligafotboll.",
    howToBuy: "Biljetter släpps via Stade Rennais officiella biljettsida. Matcherna på Roazhon Park har mycket hög beläggning, så boka dina garanterade biljetter och hotellpaket smidigt i förväg på biljetterfotboll.se.",
    sectionsAndPrices: "Tribune Crédit Armorique och Tribune Lorient är långsidorna med perfekt överblick. Tribune Mordelles (kortsidan) samlar RCK (Roazhon Celltik Kop), vilka driver på stämningen och tifo-kulturen.",
    packages: "Upplev Bretagnes huvudstad Rennes kombinerat med fransk ligafotboll i absolut toppklass. Våra paket inkluderar matchbiljett på Roazhon Park samt boende på centrala hotell.",
    history: "Stade Rennais Football Club grundades 1901. 'Roazhon' är det bretonska namnet för Rennes. Laget spelar i rött och svart ('Les Rouge et Noir') och är känt för att leverera snabb, offensiv fotboll och fostra stjärntalanger som Eduardo Camavinga och Ousmane Dembélé.",
    faqs: [
      {
        question: "Hur tar man sig till Roazhon Park?",
        answer: "Stadion ligger drygt 2,5 km väster om stadens centrum längs floden Vilaine. Du tar dig enkelt hit med tunnelbana (Linje B till stationen Cleunay) eller stadsbuss på 10–15 minuter."
      },
      {
        question: "Vad betyder namnet Roazhon?",
        answer: "'Roazhon' är det bretonska ordet för staden Rennes och speglar den starka regionala stoltheten."
      }
    ]
  },

  "leipzig": {
    name: "RB Leipzig",
    league: "Bundesliga",
    stadiumName: "Red Bull Arena",
    location: "Leipzig, Tyskland",
    logo: "/logos/leipzig.png",
    heroImage: "/stadiums/red-bull-arena-leipzig-hero.jpg",
    stadiumLayoutImage: "/stadiums/red-bull-arena-leipzig-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Red+Bull+Arena,+Leipzig&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Red Bull Arena (tidigare Zentralstadion) invigdes 2004 och rymmer drygt 47 000 åskådare under ligamatcher. Arenan är unikt byggd inuti den historiska vallanläggningen från det gamla Zentralstadion från 1956. Med sina branta läktare och moderna infrastruktur bjuder den på en fantastisk syn och modern Bundesliga-atmosfär.",
    aboutTickets: "Boka biljetter till RB Leipzig på Red Bull Arena. Jämför priser på matchbiljetter och paketresor till Bundesliga och Champions League.",
    howToBuy: "Biljetter köps via RB Leipzigs officiella biljettapp (RBL Ticket App). För svenska fans som vill ha en komplett resa med boende bokas biljetter och hotellpaket enkelt via biljetterfotboll.se.",
    sectionsAndPrices: "Sektor A och Sektor C utgör de stora långsidorna. Sektor B är hemmalagets färgstarka supportersektion där stående supporterklubb skapar ljudkulissen. Sektor D inhyser bortafans och neutrala åskådare.",
    packages: "Upplev den dynamiska kultur- och musikstaden Leipzig tillsammans med tysk toppfotboll. I våra paket ingår matchbiljett på Red Bull Arena samt hotell i centrala Leipzig.",
    history: "RasenBallsport Leipzig grundades 2009 och har gjort en supersnabb klättring från de lägre divisionerna till den absolut högsta tyska och europeiska fotbollseliten. Klubben är känd för sin högintensiva pressfotboll och sin förmåga att utveckla unga världsstjärnor.",
    faqs: [
      {
        question: "Hur tar man sig till Red Bull Arena i Leipzig?",
        answer: "Arenan ligger cirka 2 km väster om Leipzig Hauptbahnhof. Du tar dig hit på cirka 7–10 minuter med spårvagn (linje 3, 7, 8 eller 15) till hållplatsen Waldplatz/Arena."
      },
      {
        question: "Ingår kollektivtrafik i matchbiljetten?",
        answer: "Ja, i regel fungerar matchbiljetter i Tyskland (MDV-området runt Leipzig) även som färdbiljett på spårvagnar och bussar fyra timmar före och efter matchen."
      }
    ]
  },

  "monchengladbach": {
    name: "Borussia Mönchengladbach",
    league: "Bundesliga",
    stadiumName: "BORUSSIA-PARK",
    location: "Mönchengladbach, Tyskland",
    logo: "/logos/monchengladbach.png",
    heroImage: "/stadiums/borussia-park-hero.jpg",
    stadiumLayoutImage: "/stadiums/borussia-park-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=BORUSSIA-PARK,+M%C3%B6nchengladbach&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "BORUSSIA-PARK invigdes 2004 och är en av Tysklands mest moderna och stämningsfulla fotbollsarenor. Arenan rymmer hela 54 042 åskådare vid ligamatcher (varav drygt 16 000 på ståplats). Arenan erbjuder fri sikt från alla platser och en klassisk, passionerad västtysk läktarkultur.",
    aboutTickets: "Boka biljetter till Borussia Mönchengladbach på BORUSSIA-PARK. Jämför priser för matchbiljetter och Bundesliga-resor.",
    howToBuy: "Biljetter släpps via Borussia Mönchengladbachs officiella biljettportal. Matcher mot Bayern München och Rheinderbyt mot Köln blir snabbt utsålda, varför det rekommenderas att boka biljetter och hotell via biljetterfotboll.se.",
    sectionsAndPrices: "Osttribüne och Westtribüne erbjuder utmärkta sittplatser på långsidorna. Den legendariska Nordkurve är ren ståplats för hemmafansen där över 16 000 'Fohlen'-supportrar skapar ett enormt grön-svart-vitt havsbrus.",
    packages: "Upplev genuin tysk fotbollskultur i Nordrhein-Westfalen. Paketen inkluderar matchbiljett på BORUSSIA-PARK samt hotellboende i Mönchengladbach eller närbelägna Düsseldorf.",
    history: "Borussia VfL 1900 Mönchengladbach grundades 1900 och kallas för 'Die Fohlen' (Fölen) tack vare sin snabba och frimodiga fotboll på 1970-talet. Under sin guldålder vann klubben fem Bundesliga-titlar och två UEFA-cuper med legendarer som Günter Netzer och Jupp Heynckes.",
    faqs: [
      {
        question: "Hur tar man sig till BORUSSIA-PARK?",
        answer: "Det går gratis matchbussar (Shuttlebuss) från tågstationerna Mönchengladbach Hauptbahnhof och Rheydt Hauptbahnhof direkt till stadion på matchdagar."
      },
      {
        question: "Vad heter derbyt mot 1. FC Köln?",
        answer: "Mötet mellan Mönchengladbach och Köln kallas för 'Rheinderby' och är ett av Bundesliga-säsongens mest intensivt laddade lokalmöten."
      }
    ]
  },

  "mainz": {
    name: "1. FSV Mainz 05",
    league: "Bundesliga",
    stadiumName: "MEWA ARENA",
    location: "Mainz, Tyskland",
    logo: "/logos/mainz.png",
    heroImage: "/stadiums/mewa-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/mewa-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=MEWA+ARENA,+Mainz&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "MEWA ARENA (tidigare Coface Arena) invigdes 2011 och rymmer 33 305 åskådare. Arenan är känd för sina markanta röda ramar i hörnen och en brant läktarkonstruktion som håller ljudet kvar inuti stadion. Här upplever du en varm, familjär och högljudd tysk matchkultur i Rheinland-Pfalz.",
    aboutTickets: "Jämför biljetter till 1. FSV Mainz 05 på MEWA ARENA. Säkra din plats för heta matcher i Bundesliga.",
    howToBuy: "Biljetter säljs via Mainz 05 officiella biljettsida. För svenska besökare är det extremt smidigt att boka officiella matcher och godkända hotellpaket i förväg via biljetterfotboll.se.",
    sectionsAndPrices: "Haupttribüne och Gegentribüne är långsidorna med bäst komfort. Stehplatz Stehtribüne (Stehtribüne Rheinhessen) på kortsidan samlar de mest passionerade röd-vita hemmasupportrarna.",
    packages: "Kombinera Bundesliga-fotboll med vinprovning och historiska sevärdheter i Mainz. I våra fotbollspaket ingår matchbiljett på MEWA ARENA samt boende på utvalda hotell.",
    history: "1. Fußball- und Sportverein Mainz 05 grundades 1905. Klubben kallas 'Die Nullfünfer' och är känd för sin prägel på den moderna tyska tränarskolan – det var här tränarikoner som Jürgen Klopp och Thomas Tuchel inledde sina framgångsrika karriärer.",
    faqs: [
      {
        question: "Hur tar man sig till MEWA ARENA?",
        answer: "Arenan ligger i västra utkanten av Mainz vid universitetscampuset. Du tar dig hit på ca 10–15 minuter med spårvagn (linje 51 eller 53) från Mainz Hauptbahnhof."
      },
      {
        question: "Ingår kollektivtrafik i biljetten?",
        answer: "Ja, matchbiljetten gäller som färdbiljett på buss och spårvagn inom RNN/RMV-området runt Mainz och Frankfurt på matchdagen."
      }
    ]
  },

  "paderborn": {
    name: "SC Paderborn 07",
    league: "2. Bundesliga",
    stadiumName: "Home Deluxe Arena",
    location: "Paderborn, Tyskland",
    logo: "/logos/paderborn.png",
    heroImage: "/stadiums/home-deluxe-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/home-deluxe-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Home+Deluxe+Arena,+Paderborn&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Home Deluxe Arena invigdes 2008 och rymmer 15 000 åskådare (varav 9 200 på ståplats). Arenan är kompakt, helt täckt och har utformats för att ge perfekt sikt oavsett sektion. Med ståplatser nära gräset skapas en entusiastisk och intim tysk läktaratmosfär.",
    aboutTickets: "Boka biljetter till SC Paderborn 07 på Home Deluxe Arena. Jämför priser på matchbiljetter och fotbollsresor till 2. Bundesliga.",
    howToBuy: "Biljetter köps via SC Paderborns officiella biljettportal. För besökare från Sverige bokas prisvärda biljetter och hotellpaket smidigt via biljetterfotboll.se.",
    sectionsAndPrices: "Haupttribüne (West) och Gegentribüne (Ost) erbjuder bekväma sittplatser, medan Südtribüne är den pulserande ståplatssektionen för hemmalagets trogna supporterskara.",
    packages: "Upplev passionerad och fartfylld tysk ligafotboll i Paderborn. Våra paket inkluderar matchbiljett på Home Deluxe Arena samt boende på trevliga hotell i centrala Paderborn.",
    history: "Sport-Club Paderborn 07 grundades i sin nuvarande form 1985 efter en sammanslagning av flera lokala klubbar. Laget spelar i blått och svart och har under 2000-talet bjudit på flera sensationella avancemang upp till Bundesliga.",
    faqs: [
      {
        question: "Hur tar man sig till Home Deluxe Arena?",
        answer: "Arenan ligger i nordvästra Paderborn. Från Paderborn Hauptbahnhof tar du dig enkelt hit med matchbuss eller linje 68 på cirka 15 minuter."
      },
      {
        question: "Vad är kapaciteten på Home Deluxe Arena?",
        answer: "Stadion har en kompakt och stämningsfull kapacitet på exakt 15 000 åskådare."
      }
    ]
  },
  "koln": {
    name: "1. FC Köln",
    league: "Bundesliga",
    stadiumName: "RheinEnergieSTADION",
    location: "Köln, Tyskland",
    logo: "/logos/koln.png",
    heroImage: "/stadiums/rheinenergiestadion-hero.jpg",
    stadiumLayoutImage: "/stadiums/rheinenergiestadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=RheinEnergieSTADION,+K%C3%B6ln&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "RheinEnergieSTADION rymmer drygt 50 000 åskådare och är känd för sin fantastiska, passionerade inramning. Arenans fyra upplysta pyloner i varje hörn är ett ikoniskt landmärke i Köln, och läktarna som ligger tätt inpå gräset skapar en enorm ljudkuliss, särskilt när hela stadion sjunger klubbhymnen inför avspark.",
    aboutTickets: "Jämför biljetter till 1. FC Köln på RheinEnergieSTADION. Upplev en av Tysklands absolut bästa och mest högljudda supporterkulturer på plats.",
    howToBuy: "Officiella biljetter släpps via klubbens egna kanaler men matcherna är ofta slutsålda. För svenska fans är det enklaste och tryggaste sättet att boka garanterade matchbiljetter och bra hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Osttribüne och Westtribüne erbjuder utmärkta sittplatser längs långsidorna. Südtribüne är hjärtat av Kölns supporterkultur, en massiv ståplatssektion där klacken skapar ett elektriskt tryck.",
    packages: "Kombinera en fotbollshelg med den magnifika Kölnerdomen och lokalt Kölsch-öl. Våra paket inkluderar matchbiljett och noga utvalda hotell i centrala Köln.",
    history: "1. FC Köln grundades 1948 och är en anrik tysk klubb som bland annat vann den allra första upplagan av Bundesliga 1963/64. Lagets levande maskot, getabocken Hennes, är en ikonisk del av klubbens identitet ('Die Geißböcke').",
    faqs: [
      {
        question: "Hur tar man sig till RheinEnergieSTADION?",
        answer: "Det smidigaste sättet är att ta spårvagn (linje 1) från exempelvis Neumarkt i centrala Köln till hållplatsen RheinEnergieStadion, vilket tar cirka 15–20 minuter."
      },
      {
        question: "Vad är Hennes för något?",
        answer: "Hennes är 1. FC Kölns levande getabock (maskot) som är med vid varje hemmamatch. Klubben kallas därför också för 'Getabockarna'."
      }
    ]
  },

  "hoffenheim": {
    name: "TSG 1899 Hoffenheim",
    league: "Bundesliga",
    stadiumName: "PreZero Arena",
    location: "Sinsheim, Tyskland",
    logo: "/logos/hoffenheim.png",
    heroImage: "/stadiums/prezero-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/prezero-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=PreZero+Arena,+Sinsheim&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "PreZero Arena ligger i staden Sinsheim i regionen Baden-Württemberg och rymmer drygt 30 100 åskådare. Arenan är toppmodern, sluten från alla sidor vilket håller ljudnivån hög, och är mycket välkänd för sitt starka fokus på hållbarhet och innovativ återvinning.",
    aboutTickets: "Boka biljetter till TSG 1899 Hoffenheim. Se underhållande tysk toppfotboll på vackra PreZero Arena.",
    howToBuy: "Biljetter släpps löpande via TSG Hoffenheims hemsida. För enkel och trygg bokning från Sverige kan du jämföra matchbiljetter och hotellpaket på biljetterfotboll.se.",
    sectionsAndPrices: "Ost- och Westtribüne erbjuder bekväma sittplatser längs långsidorna. Südkurve är hemmasupportrarnas ståplatssektion där den blåvita klacken håller till.",
    packages: "Planera en härlig fotbollsresa till regionen runt pittoreska Heidelberg och Sinsheim. Paketen inkluderar officiell matchbiljett på PreZero Arena och bekvämt hotellboende.",
    history: "Turn- und Sportgemeinschaft 1899 Hoffenheim är känd för sin mirakulösa resa från amatörligorna till Bundesliga under 2000-talet, mycket tack vare affärsmannen Dietmar Hopps investeringar. Klubben spelar i blått och vitt och satsar enormt på sin moderna ungdomsakademi.",
    faqs: [
      {
        question: "Var ligger PreZero Arena?",
        answer: "Arenan ligger inte i själva orten Hoffenheim, utan i grannstaden Sinsheim. Sinsheims tågstation ligger drygt en kilometers promenad från stadion."
      },
      {
        question: "Ingår lokaltrafiken i matchbiljetten?",
        answer: "Ja, matchbiljetten fungerar som färdbiljett för kollektivtrafiken inom VRN-nätverket på matchdagen."
      }
    ]
  },

  "elversberg": {
    name: "SV Elversberg",
    league: "2. Bundesliga",
    stadiumName: "URSAPHARM-Arena an der Kaiserlinde",
    location: "Spiesen-Elversberg, Tyskland",
    logo: "/logos/elversberg.png",
    heroImage: "/stadiums/ursapharm-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/ursapharm-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=URSAPHARM-Arena+an+der+Kaiserlinde&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "URSAPHARM-Arena an der Kaiserlinde rymmer cirka 10 000 åskådare och är en kompakt och intim arena i Saarland. Arenan har byggts ut och moderniserats kraftigt i etapper för att möta de professionella kraven för spel i den tyska andraligan, och erbjuder en genuint klassisk och nära fotbollsupplevelse.",
    aboutTickets: "Jämför biljetter till SV Elversberg i 2. Bundesliga. Kom nära spelet och upplev fantastisk småstadscharm i Saarland.",
    howToBuy: "Biljetter köps i första hand via klubbens egna kanaler. För svenska resenärer erbjuds hotell- och biljettpaket via biljetterfotboll.se inför utvalda matcher.",
    sectionsAndPrices: "Haupttribüne erbjuder taktäckt och bekväm sittplats, medan de hängivna hemmaståplatserna finns belägna bakom målet (Heim-Stehplätze).",
    packages: "Upptäck Saarland och fartfylld tysk fotboll. Boka matchbiljett kombinerat med hotellboende i den större grannstaden Saarbrücken för bästa möjliga upplevelse.",
    history: "Sportverein 07 Elversberg grundades 1907. Klubbens raketkarriär från de tyska regionalligorna rakt upp till 2. Bundesliga under 2020-talet har gjort dem till en av tysk fotbolls mest fascinerande och imponerande framgångssagor.",
    faqs: [
      {
        question: "Hur tar jag mig till arenan?",
        answer: "Enklast är att bo i eller resa via Saarbrücken eller Neunkirchen. Det går regelbundna shuttlebussar från knutpunkterna till arenan på matchdagar."
      },
      {
        question: "Vad betyder namnet 'an der Kaiserlinde'?",
        answer: "Det betyder 'vid kejsarlinden' och syftar på ett historiskt och berömt lindträd som en gång i tiden stod vid den ursprungliga fotbollsplanen."
      }
    ]
  },

  "hamburger-sv": {
    name: "Hamburger SV",
    league: "2. Bundesliga",
    stadiumName: "Volksparkstadion",
    location: "Hamburg, Tyskland",
    logo: "/logos/hamburger-sv.png",
    heroImage: "/stadiums/volksparkstadion-hero.jpg",
    stadiumLayoutImage: "/stadiums/volksparkstadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Volksparkstadion,+Hamburg&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Volksparkstadion, naturskönt belägen i Altona Volkspark, är en av Tysklands mest ikoniska arenor och rymmer enorma 57 000 åskådare. Med sin branta läktarkonstruktion och fantastiska akustik genererar den ett elektriskt tryck, och arenan är ständigt utsåld oavsett division.",
    aboutTickets: "Boka biljetter till Hamburger SV på Volksparkstadion. Upplev en av Europas mäktigaste klubbar live inför 57 000 åskådare.",
    howToBuy: "Trycket på biljetter i Hamburg är massivt. För att säkra garanterade platser och ett bekvämt boende i staden bokar du enklast kompletta matchpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Ost- och Westtribüne utgör de mäktiga långsidorna med förstklassig sikt. Nordtribüne är arenans bultande hjärta där Hamburgs mest inbitna fans huserar och skapar en massiv ljudvägg från ståplatserna.",
    packages: "Kombinera klassiska Reeperbahn, hamnkvarteren (Speicherstadt) och pulserande nattliv med tysk toppfotboll. I paketen ingår officiella matchbiljetter samt utvalda hotell i Hamburg.",
    history: "Hamburger Sport-Verein (HSV) grundades 1887 och är en jätte i tysk fotboll. Klubben kallas 'Der Dino' (Dinosaurien) då de under många decennier var det enda laget som aldrig degraderats från Bundesliga. Klubben vann Europacupen 1983.",
    faqs: [
      {
        question: "Hur tar man sig till Volksparkstadion?",
        answer: "Du åker S-Bahn (linje S3 eller S21) till stationen Stellingen. Därifrån går det gratis shuttlebussar, eller så kan man promenera cirka 15 minuter genom parken."
      },
      {
        question: "Vilka är Hamburgs största rivaler?",
        answer: "Det stora stadsderbyt ('Hamburger Stadtderby') spelas mot FC St. Pauli och är en av de mest högoktaniga, känsloladdade matcherna i europeisk fotboll."
      }
    ]
  },

  "freiburg": {
    name: "SC Freiburg",
    league: "Bundesliga",
    stadiumName: "Europa-Park Stadion",
    location: "Freiburg im Breisgau, Tyskland",
    logo: "/logos/freiburg.png",
    heroImage: "/stadiums/europa-park-stadion-hero.jpg",
    stadiumLayoutImage: "/stadiums/europa-park-stadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Europa-Park+Stadion,+Freiburg&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Europa-Park Stadion invigdes hösten 2021 och rymmer 34 700 åskådare. Det är en otroligt modern och hållbar stadion med Tysklands största solcellstak för arenor. Byggd extremt brant kombinerar den nutida komfort med den fantastiska, intima och högljudda stämning Freiburg är känt för.",
    aboutTickets: "Jämför biljetter till SC Freiburg. Säkra biljetter till en av Bundesligas allra mest stämningsfulla och charmigaste arenor.",
    howToBuy: "SC Freiburg säljer snabbt slut på nästan alla matcher tack vare starkt hemmastöd och begränsad kapacitet. Boka smidiga och garanterade biljettpaket inklusive hotell via biljetterfotboll.se.",
    sectionsAndPrices: "Långsidorna (Haupt- och Gegentribüne) bjuder på enastående komfort och närhet till gräset. Den majestätiska Südtribüne är en gigantisk renodlad ståplatsläktare där hemmafansen skapar grymt tryck.",
    packages: "Besök Schwarzwalds (Svarta skogens) mysiga huvudort, njut av universitetsstadens atmosfär och upplev Bundesligafotboll. Vi erbjuder hotell i den historiska stadskärnan tillsammans med matchbiljett.",
    history: "Sport-Club Freiburg grundades 1904. Klubben är mycket omtyckt för sina sunda värderingar, starka lokalförankring och offensiva fotboll. Tidigare tränaren Christian Streich, som ledde laget i över ett decennium, gjorde SC Freiburg till en av Tysklands mest respekterade klubbar.",
    faqs: [
      {
        question: "Kan jag åka spårvagn till arenan?",
        answer: "Ja, spårvagnslinje 4 stannar precis utanför arenan vid hållplatsen 'Europa-Park Stadion'."
      },
      {
        question: "Vad är klubbens maskot?",
        answer: "Klubbens maskot är en räv vid namn 'Füchsle' (lilla räven), vilket speglar klubbens starka band till Schwarzwald-skogen."
      }
    ]
  },

  "werder-bremen": {
    name: "SV Werder Bremen",
    league: "Bundesliga",
    stadiumName: "Weserstadion",
    location: "Bremen, Tyskland",
    logo: "/logos/werder-bremen.png",
    heroImage: "/stadiums/weserstadion-hero.jpg",
    stadiumLayoutImage: "/stadiums/weserstadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Weserstadion,+Bremen&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Weserstadion är vackert och unikt belägen precis intill floden Weser och rymmer 42 100 åskådare. Arenan kännetecknas av sina solcellsklädda fasader och täta atmosfär, där publiken kommer extremt nära inpå planen, vilket skapar en otroligt passionerad och kokande tysk läktarupplevelse.",
    aboutTickets: "Jämför biljetter till Werder Bremen. Upplev tysk fotbollskultur när den är som allra vackrast vid Weserstadion.",
    howToBuy: "Efterfrågan är alltid mycket hög och matcher mot stormotstånd är ofta utsålda. Vi rekommenderar att boka biljetter och hotell i ett tryggt paket via biljetterfotboll.se.",
    sectionsAndPrices: "Nord- och Südtribüne utgör långsidorna med bästa vy över spelet. Ostkurve är hemmaklacken och själva pulsen i Weserstadion, beryktade för sin höga sång och sina mäktiga tifon.",
    packages: "Utforska den vackra Hansastaden Bremen. Våra Werder Bremen-paket erbjuder garanterade biljetter och bra hotell nära det sagolika stadshuset, Schnoor-kvarteren och Rolandstatyn.",
    history: "Sportverein Werder Bremen grundades 1899 och spelar i ikoniskt grönt och vitt ('Die Werderaner'). Klubben har vunnit flera Bundesliga-titlar och är historiskt kända för en sprakande, offensiv fotbollsfilosofi (bland annat under legendaren Thomas Schaaf).",
    faqs: [
      {
        question: "Kan man åka båt till Weserstadion?",
        answer: "Ja! En unik upplevelse i Bremen är att du kan ta färjan från Domsheide/Sielwall direkt över floden Weser till arenan på matchdagar."
      },
      {
        question: "Vilket derby är det mest kända för Werder Bremen?",
        answer: "Det enormt laddade 'Nordderby' (Nordderbyt) spelas mot antagonisterna Hamburger SV och är en av Tysklands mest prestigefyllda matcher."
      }
    ]
  },

  "augsburg": {
    name: "FC Augsburg",
    league: "Bundesliga",
    stadiumName: "WWK Arena",
    location: "Augsburg, Tyskland",
    logo: "/logos/augsburg.png",
    heroImage: "/stadiums/wwk-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/wwk-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=WWK+Arena,+Augsburg&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "WWK Arena invigdes 2009 och rymmer 30 660 åskådare. Det är världens första CO2-neutrala fotbollsarena tack vare avancerad värmepumpsteknik. Den slutna, branta bowl-formen garanterar utmärkt sikt och ett tajt, elektriskt ljud från den sydtyska publiken.",
    aboutTickets: "Jämför priser och biljetter till FC Augsburg i Bundesliga. Säkra din fotbollsresa till regionen Schwaben i Bayern.",
    howToBuy: "Som besökare från Sverige är det klokast att boka biljetter och hotell i god tid genom biljetterfotboll.se, speciellt vid högprofilerade matcher mot bayerska rivaler.",
    sectionsAndPrices: "Haupttribüne och Gegentribüne är populära långsidor för sittplatser. Den norra kortsidan (Ulrich-Biesinger-Tribüne) rymmer hemmalagets stojiga ståplatssektion för de inbitna FCA-fansen.",
    packages: "Fotbollspaket till FC Augsburg låter dig uppleva en av Tysklands allra äldsta och mest historiska städer. I paketen ingår matchbiljett och bekvämt boende.",
    history: "Fußball-Club Augsburg 1907 spelar i rött, grönt och vitt. Sedan deras historiska första avancemang till Bundesliga 2011 har de imponerat genom att etablera sig som ett otroligt svårspelat lag, och säsongen 2015/16 nådde de hela vägen till Europa League-slutspelet.",
    faqs: [
      {
        question: "Hur åker man kollektivt till WWK Arena?",
        answer: "Från Augsburg Hauptbahnhof kan du åka med spårvagn (linje 3) direkt till ändhållplatsen 'Stadion' på drygt 20 minuter."
      },
      {
        question: "Vilket lag betraktas som värsta rivalen?",
        answer: "Även om det skiljer i storlek, anses mötena mot Bayern München vara de stora derbyna i regionen ('Bayern-Derby') och drar alltid fullt hus."
      }
    ]
  },
  "schalke": {
    name: "FC Schalke 04",
    league: "2. Bundesliga",
    stadiumName: "VELTINS-Arena",
    location: "Gelsenkirchen, Tyskland",
    logo: "/logos/schalke.png",
    heroImage: "/stadiums/veltins-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/veltins-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=VELTINS-Arena,+Gelsenkirchen&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "VELTINS-Arena (tidigare Arena AufSchalke) invigdes 2001 och rymmer drygt 62 271 åskådare. Den är en av Europas modernaste multiarenor med skjutbart tak, utskjutbar gräsplan och en jättelik videokub. Här upplever du titanisk tysk fotbollspassion i Ruhrområdet.",
    aboutTickets: "Boka biljetter till FC Schalke 04 på VELTINS-Arena. Jämför priser på matchbiljetter och fotbollsresor till Gelsenkirchen.",
    howToBuy: "Biljetterna till Schalkes hemmamatcher är otroligt eftertraktade och säljs nästan alltid slut direkt via klubben. För garanterade biljetter och hotellpaket rekommenderas bokning via biljetterfotboll.se.",
    sectionsAndPrices: "Haupttribüne och Gegentribüne erbjuder fantastiska långsidesplatser. Den legendariska Nordkurve är hemvist för Schalkes passionerade klack, där tiotusentals fans skapar en mäktig ljudvägg.",
    packages: "Upplev äkta tysk bruksortskultur och dramatisk fotboll i Ruhrområdet. Våra paket inkluderar matchbiljett samt bekvämt hotellboende.",
    history: "Fußball-Club Gelsenkirchen-Schalke 04 grundades 1904 och spelar i blått och vitt ('Die Königsblauen'). Klubben är en av Tysklands mest folkkära med miljontals supportrar och en stolt guldhistoria från förr.",
    faqs: [
      {
        question: "Hur tar man sig till VELTINS-Arena?",
        answer: "Du tar stadsbana (Stadtbahn linje 302) direkt från Gelsenkirchen Hauptbahnhof till slutstationen Veltins-Arena på knappt 15 minuter."
      },
      {
        question: "Vad är speciellt med planens konstruktion?",
        answer: "Gräsmatta kan skjutas ut ur stadion på några timmar för att få solljus och för att skydda gräset under andra stora evenemang som konserter."
      }
    ]
  },

  "groningen": {
    name: "FC Groningen",
    league: "Eredivisie",
    stadiumName: "Euroborg",
    location: "Groningen, Nederländerna",
    logo: "/logos/groningen.png",
    heroImage: "/stadiums/euroborg-hero.jpg",
    stadiumLayoutImage: "/stadiums/euroborg-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Euroborg,+Groningen&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Euroborg (sedermera Hitachi Capital Mobility Stadion) invigdes 2006 och rymmer cirka 22 550 åskådare. Arenan är känd för sin färgglada gröna exteriör, branta läktare och unika integrerade kontor och skolor i byggnaden, vilket gör den till ett levande nav i staden.",
    aboutTickets: "Jämför biljetter till FC Groningen på Euroborg. Upplev underhållande Eredivisie-fotboll i norra Nederländerna.",
    howToBuy: "Biljetter köps via Groningens officiella webbplats. För svenska besökare är det smidigt att boka kompletta paket med matchbiljett och hotell via biljetterfotboll.se.",
    sectionsAndPrices: "De långsidesplatser som vetter mot Zuid och Noord erbjuder bra överblick, medan Z-Side (kortsidan) är den stämningsfulla samlingsplatsen för Groningens mest hängivna supportrar.",
    packages: "Kombinera en weekend i den livliga studentstaden Groningen med holländsk ligafotboll. Paketen inkluderar matchbiljett och utvalda hotell.",
    history: "Football Club Groningen grundades 1971 och spelar i grön-vita tröjor ('Trots van het Noorden' – Norra stoltheten). Klubben är känd för att ha fostrat stjärnor som Arjen Robben och Luis Suárez.",
    faqs: [
      {
        question: "Hur tar man sig till Euroborg?",
        answer: "Arenan ligger i direkta anslutning till tågstationen Groningen Europapark, dit det går tåg på bara några minuter från centralstationen."
      },
      {
        question: "Vad kallas klubben?",
        answer: "Klubben kallas för 'Trots van het Noorden' (Norra stoltheten) eftersom de är det överlägset största laget i de norra delarna av landet."
      }
    ]
  },

  "cambuur": {
    name: "SC Cambuur",
    league: "Eredivisie",
    stadiumName: "Kooi Stadion",
    location: "Leeuwarden, Nederländerna",
    logo: "/logos/cambuur.png",
    heroImage: "/stadiums/kooi-stadion-hero.jpg",
    stadiumLayoutImage: "/stadiums/kooi-stadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Kooi+Stadion,+Leeuwarden&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Kooi Stadion är en helt nybyggd, modern arena som ersatte klassiska Cambuur Stadion och rymmer närmare 15 000 åskådare. Den är utformad för att bevara den intensiva, kokande närheten mellan läktare och plan som klubben är känd för.",
    aboutTickets: "Boka biljetter till SC Cambuur på det nybyggda Kooi Stadion. Upplev äkta frisisk fotbollspassion i Eredivisie.",
    howToBuy: "Biljetter säljs via Cambuurs biljettsystem. För en enklare reseupplevelse med garanterade biljetter och hotellbokning rekommenderas biljetterfotboll.se.",
    sectionsAndPrices: "De nya långsidorna erbjuder toppmodern komfort, medan den nya supporterläktaren bakom målet fortsätter att leverera gul-blå läktardominans.",
    packages: "Besök den vackra staden Leeuwarden i provinsen Friesland och njut av förstklassig holländsk fotboll. Paketen inkluderar matchbiljett och centralt boende.",
    history: "Sportclub Cambuur grundades 1964 och spelar i gult och blått. Klubben har en oerhört lojal lokal fanbase och är kända för sin kämparglöda och offensiva spelstil.",
    faqs: [
      {
        question: "Var ligger Kooi Stadion?",
        answer: "Arenan ligger i det nya industri- och evenemangsområdet i Leeuwarden, enkelt nåbart med lokala bussar från centralstationen."
      },
      {
        question: "Vilken region hör klubben hemma i?",
        answer: "Klubben hör hemma i Leeuwarden, som är huvudstad i den nordliga provinsen Friesland."
      }
    ]
  },

  "utrecht": {
    name: "FC Utrecht",
    league: "Eredivisie",
    stadiumName: "Stadion Galgenwaard",
    location: "Utrecht, Nederländerna",
    logo: "/logos/utrecht.png",
    heroImage: "/stadiums/galgenwaard-hero.jpg",
    stadiumLayoutImage: "/stadiums/galgenwaard-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Stadion+Galgenwaard,+Utrecht&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Stadion Galgenwaard invigdes i sin nuvarande moderna form 1982 och rymmer knappt 24 500 åskådare. Arenan är känd för sitt tak som hänger fritt utan skymmande pelare, vilket ger perfekt sikt och ett kompakt, intensivt supportertryck.",
    aboutTickets: "Jämför biljetter till FC Utrecht på Stadion Galgenwaard. Se spännande Eredivisie-matcher i hjärtat av Nederländerna.",
    howToBuy: "Biljetter släpps via Utrechts officiella biljettsida. Matcher mot rivaler som Ajax lockar fulla hus, så boka ditt paket med biljetter och hotell i tid via biljetterfotboll.se.",
    sectionsAndPrices: "Hoofdtribune och Zuid-tribune erbjuder långsideplatser, medan den berömda Bunnikside är hemmafansens stående fäste som bjuder på enorm stämning.",
    packages: "Upptäck pittoreska Utrecht med sina vackra kanaler och upplev heta fotbollsmatcher. Våra paket inkluderar matchbiljett och hotellövernattning.",
    history: "Football Club Utrecht grundades 1970 efter en sammanslagning av tre lokala klubbar. Laget spelar i rött och vitt ('Zus & Wit') och är en av de få klubbar utanför 'topp tre' som historiskt lyckats vinna KNVB-cupen flera gånger.",
    faqs: [
      {
        question: "Hur tar man sig till Stadion Galgenwaard?",
        answer: "Det går täta stadsbussar (bland annat linje 12) direkt från Utrecht Centraal station till arenan på cirka 10–15 minuter."
      },
      {
        question: "Vad heter hemmaklacken?",
        answer: "Hemmafansens kända läktarsektion heter Bunnikside och är känd över hela landet för sin intensitet."
      }
    ]
  },

  "den-haag": {
    name: "ADO Den Haag",
    league: "Eredivisie",
    stadiumName: "Bingoal Stadion",
    location: "Den Haag, Nederländerna",
    logo: "/logos/den-haag.png",
    heroImage: "/stadiums/bingoal-stadion-hero.jpg",
    stadiumLayoutImage: "/stadiums/bingoal-stadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Bingoal+Stadion,+Den+Haag&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Bingoal Stadion (tidigare ADO Den Haag Stadion) invigdes 2007 och rymmer 15 000 åskådare. Arenan kännetecknas av sina unika grön-gula stolsfärger och moderna slutna design som skapar en intim och högljudd inramning.",
    aboutTickets: "Boka biljetter till ADO Den Haag på Bingoal Stadion. Jämför priser på matchbiljetter och fotbollsresor till den holländska regeringsstaden.",
    howToBuy: "Biljetter kan köpas via klubbens officiella kanaler. För en trygg helhetslösning med hotell och matchbiljetter rekommenderas biljetterfotboll.se.",
    sectionsAndPrices: "Hoofdtribune och Haaglanden-tribune utgör långsidorna, medan Midden-Noord är hjärtat för de mest passionerade grön-gula hemmasupportrarna.",
    packages: "Kombinera ett besök till Den Haags stränder och sevärdheter med spännande holländsk ligafotboll. Paketen inkluderar matchbiljett och hotellboende.",
    history: "Alles Door Oefening Den Haag grundades 1905 och spelar i grönt och gult. Klubben har en stolt historia med flera nationella titlar och en hängiven supporterbas.",
    faqs: [
      {
        question: "Hur tar man sig till Bingoal Stadion?",
        answer: "Arenan ligger i Ypenburg-området. Spårvagn 19 eller stadsbussar tar dig enkelt hit från Den Haag Centraal eller Hollands Spoor."
      },
      {
        question: "Vilka är klubbens färger?",
        answer: "Klubben spelar i grönt och gult, vilket också präglar hela arenans design."
      }
    ]
  },

  "telstar": {
    name: "SC Telstar",
    league: "Eredivisie",
    stadiumName: "711 Stadion",
    location: "Velsen-Zuid, Nederländerna",
    logo: "/logos/telstar.png",
    heroImage: "/stadiums/711-stadion-hero.jpg",
    stadiumLayoutImage: "/stadiums/711-stadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=711+Stadion,+Velsen-Zuid&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "711 Stadion (tidigare Sportpark Schoonenberg) rymmer runt 3 060 åskådare och andas genomsyrad retro-charm. Beläget i Velsen-Zuid erbjuder det en av nederländsk fotbolls mest familjära och jordnära upplevelser med korta avstånd till planen.",
    aboutTickets: "Jämför biljetter till SC Telstar på 711 Stadion. Upplev genuin och folklig nederländsk fotboll nära Haarlem och Amsterdam.",
    howToBuy: "Biljetter köps enklast direkt via Telstars webbplats eller på plats. För weekendresor med boende i närliggande Haarlem eller Amsterdam kan du boka via biljetterfotboll.se.",
    sectionsAndPrices: "Huvudläktaren erbjuder klassiska sittplatser med tak, medan ståplatserna runt planen ger en nära och familjär kontakt med spelarna.",
    packages: "Kombinera en resa till Amsterdam eller kusten med charmig fotboll på 711 Stadion. Våra paket inkluderar matchbiljett och hotell.",
    history: "Stormvogels Telstar grundades 1963 och har fått sitt namn efter den kända kommunikationssatelliten Telstar som sköts upp vid samma tid. Klubben spelar i vita tröjor med blå detaljer.",
    faqs: [
      {
        question: "Var ligger 711 Stadion?",
        answer: "Arenan ligger i Velsen-Zuid, nära städerna IJmuiden och Haarlem, cirka 30 minuter från Amsterdam med bil."
      },
      {
        question: "Vad är historien bakom namnet Telstar?",
        answer: "Namnet togs efter den historiska kommunikationssatelliten som lanserades 1962, vilket speglade framtidstro under klubbens bildandeår på 60-talet."
      }
    ]
  },
  "club-brugge": {
    name: "Club Brugge",
    league: "Pro League",
    stadiumName: "Jan Breydel Stadium",
    location: "Brygge, Belgien",
    logo: "/logos/club-brugge.png",
    heroImage: "/stadiums/jan-breydel-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/jan-breydel-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Jan+Breydel+Stadium,+Brugge&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Jan Breydel Stadium rymmer närmare 29 000 åskådare och är en klassisk fotbollsarena med en intensiv, kokande atmosfär. Här delar Club Brugge hemmaplan med rivalerna Cercle Brugge, men arenan förvandlas till ett äkta blå-svart fort under matchdagarna.",
    aboutTickets: "Jämför biljetter till Club Brugge. Upplev spännande belgisk toppfotboll och europeiska stormatcher i sagolika Brygge.",
    howToBuy: "Biljetter till Club Brugge är mycket eftertraktade, särskilt till derbyn och Champions League-matcher. Säkra dina garanterade biljetter och hotellpaket smidigt via biljetterfotboll.se.",
    sectionsAndPrices: "Noord- och Zuid-tribune erbjuder utmärkta långsideplatser, medan kortsidorna är kända för att hysa klubbens mest hängivna supportrar som sjunger matchen igenom.",
    packages: "Kombinera en weekend i den medeltida världsarvsstaden Brygge med förstklassig fotboll. Våra paket inkluderar officiell matchbiljett och noga utvalt hotell.",
    history: "Club Brugge Koninklijke Voetbalvereniging grundades 1891 och är en av Belgiens mest framgångsrika klubbar med massor av ligatitlar och stora framgångar i europeiska turneringar ('Blauw-Zwart').",
    faqs: [
      {
        question: "Hur tar man sig till Jan Breydel Stadium?",
        answer: "Arenan ligger i stadsdelen Sint-Andries. Det går regelbundna stadsbussar direkt från Brygges centralstation ut till arenan på cirka 10–15 minuter."
      },
      {
        question: "Vem delar de arena med?",
        answer: "Arenan delas med stadsrivalen Cercle Brugge, även om Club Brugge drar den övervägande majoriteten av publiken."
      }
    ]
  },

  "aek-athens": {
    name: "AEK Aten",
    league: "Super League Greece",
    stadiumName: "Agia Sofia Stadium",
    location: "Aten, Grekland",
    logo: "/logos/aek-athens.png",
    heroImage: "/stadiums/agia-sofia-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/agia-sofia-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Agia+Sofia+Stadium,+Athens&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Agia Sofia Stadium (OPAP Arena) invigdes hösten 2022 och rymmer runt 32 500 åskådare. Arenan är byggd i bysantinsk stil som en hyllning till klubbens historiska rötter i Konstantinopel och erbjuder en av södra Europas mest skrämmande och högljudda atmosfärer för motståndarlag.",
    aboutTickets: "Boka biljetter till AEK Aten på den moderna OPAP Arena. Upplev grekisk fotbollspassion och magisk stämning på plats.",
    howToBuy: "Efterfrågan på biljetter till AEK Aten är enorm. För att säkra dina platser på ett tryggt sätt rekommenderar vi att boka paket med hotell och biljetter via biljetterfotboll.se.",
    sectionsAndPrices: "Långsidorna erbjuder toppmodern komfort och fina vyer, medan Original 21-klacken på kortsidan skapar ett mäktigt publikhav med bengaleldar och ständig sång.",
    packages: "Kombinera en solig resa till historiska Aten med stekhet grekisk ligafotboll. Paketen inkluderar matchbiljett och centralt boende.",
    history: "Athlitiki Enosis Konstantinoupoleos (AEK) grundades 1924 av grekiska flyktingar från Konstantinopel. Klubben har en stolt historia, stark identitet (gult och svart) och flertalet ligatitlar.",
    faqs: [
      {
        question: "Var ligger Agia Sofia Stadium?",
        answer: "Arenan ligger i Nea Filadelfia, en stadsdel i norra Aten, och nås enklast med Athens tunnelbana eller buss."
      },
      {
        question: "Vad är historien bakom arenans design?",
        answer: "Designen är inspirerad av Hagia Sofia i Istanbul (Konstantinopel) för att hedra klubbens ursprung."
      }
    ]
  },

  "lask-linz": {
    name: "LASK Linz",
    league: "Austrian Bundesliga",
    stadiumName: "Raiffeisen Arena",
    location: "Linz, Österrike",
    logo: "/logos/lask-linz.png",
    heroImage: "/stadiums/raiffeisen-arena-linz-hero.jpg",
    stadiumLayoutImage: "/stadiums/raiffeisen-arena-linz-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Raiffeisen+Arena,+Linz&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Raiffeisen Arena invigdes våren 2023 och rymmer cirka 19 080 åskådare. Det är en hypermodern fotbollsarena med Europas brantaste kortsidesläktare för hemmasupportrarna, vilket skapar ett extremt tryck och en fantastisk närhet till planen.",
    aboutTickets: "Jämför biljetter till LASK Linz på Raiffeisen Arena. Upplev fartfylld österrikisk Bundesliga-fotboll i toppmodern miljö.",
    howToBuy: "Biljetter säljs via LASK:s officiella webbplats. För svenska resenärer är det smidigt att boka garanterade biljetter och hotellpaket via biljetterfotboll.se.",
    sectionsAndPrices: "Långsidorna håller hög internationell standard med bekväma sittplatser, medan den branta ståplatsläktaren på kortsidan är hjärtat för LASK-fansen.",
    packages: "Besök vackra Linz vid Donau och kombinera kultur med spännande fotboll. Paketen inkluderar matchbiljett och utvalt hotell.",
    history: "Linzer Athletik-Sport-Klub grundades 1908 och är Österrikes äldsta bundesligaklubb från regionen utanför Wien. Laget spelar i svart och vitt.",
    faqs: [
      {
        question: "Hur tar man sig till Raiffeisen Arena?",
        answer: "Arenan ligger i stadsdelen Gugl i Linz och nås enkelt med stadens spårvagnslinjer från centralstationen."
      },
      {
        question: "Vad är unikt med arenans läktare?",
        answer: "Klubbens hemmasupportrars läktare är en av de brantaste i hela Europa, vilket ger en unik lutning och ljudbild."
      }
    ]
  },

  "porto": {
    name: "FC Porto",
    league: "Primeira Liga",
    stadiumName: "Estádio do Dragão",
    location: "Porto, Portugal",
    logo: "/logos/porto.png",
    heroImage: "/stadiums/estadio-do-dragao-hero.jpg",
    stadiumLayoutImage: "/stadiums/estadio-do-dragao-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+do+Dragao,+Porto&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estádio do Dragão (Drakens stadion) invigdes 2003 och rymmer drygt 50 000 åskådare. En magnifik, Uefa 5-stjärnig arena med fantastisk arkitektur som bjuder på flotta faciliteter och ett kokande tryck under Portos matcher i ligan och Champions League.",
    aboutTickets: "Boka biljetter till FC Porto på Estádio do Dragão. Upplev portugisisk toppfotboll i världsklass i vackra Porto.",
    howToBuy: "Efterfrågan på biljetter till FC Porto är hög, särskilt vid stormatcher mot Benfica och i Europa. Säkra din resa med matchbiljett och hotell via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna och Lateral erbjuder förstklassiga långsideplatser, medan Super Dragões-klacken på kortsidan driver på laget med oavbruten sång och energi.",
    packages: "Kombinera portvin, pittoreska gränder vid Dourofloden och solsken med spansk/portugisisk storklubbsfotboll. Paketen inkluderar matchbiljett och centralt hotell.",
    history: "Futebol Clube do Porto grundades 1893 och är en av 'Os Três Grandes' i Portugal. Klubben har vunnit flera Champions League-titlar och är en jaktmaskin för internationella stjärnor ('Os Dragões').",
    faqs: [
      {
        question: "Hur tar man sig till Estádio do Dragão?",
        answer: "Tunnelbanan i Porto har en egen stor station som heter 'Estádio do Dragão' (linjerna A, B, E och F), vilket gör det extremt enkelt att ta sig hit från centrum."
      },
      {
        question: "Vad betyder klubbens smeknamn?",
        answer: "Klubben kallas 'Os Dragões' (Drakarna) och har en drake i sitt stadsvapen, vilket även har gett arenan dess namn."
      }
    ]
  },

  "viking": {
    name: "Viking FK",
    league: "Eliteserien",
    stadiumName: "SR-Bank Arena",
    location: "Stavanger, Norge",
    logo: "/logos/viking.png",
    heroImage: "/stadiums/sr-bank-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/sr-bank-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=SR-Bank+Arena,+Stavanger&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "SR-Bank Arena (tidigare Viking Stadion) invigdes 2004 och rymmer närmare 16 000 åskådare. En intim, modern och stämningsfull fotbollsarena belägen i Jåttåvågen i Stavanger med utmärkt sikt från alla platser.",
    aboutTickets: "Jämför biljetter till Viking FK på SR-Bank Arena. Upplev spännande norsk Eliteserien-fotboll i västra Norge.",
    howToBuy: "Biljetter köps enklast via Viking FK:s officiella sidor. För svenska fotbollsfans som vill uppleva en helg i oljestaden Stavanger är det smidigt att boka via biljetterfotboll.se.",
    sectionsAndPrices: "Hovedtribunen erbjuder bekväma långsideplatser, medan fältet för fana och stående supportrar på kortsidan skapar god stämning.",
    packages: "Upptäck vackra Stavanger med sina fjordar och historiska trädhus. Våra paket inkluderar matchbiljett och hotellövernattning.",
    history: "Viking Fotballklubb grundades 1899 och är en av Norges mest anrika och meriterade klubbar med ett flertal serieguld genom historien.",
    faqs: [
      {
        question: "Hur tar man sig till SR-Bank Arena?",
        answer: "Jåttåvågen tågstation ligger bara ett stenkast från arenan, dit du enkelt tar lokaltåget på några minuter från Stavanger centrum."
      },
      {
        question: "Vilka är klubbens färger?",
        answer: "Viking spelar i mörkblå tröjor och vita byxor."
      }
    ]
  },

  "slovan-bratislava": {
    name: "Slovan Bratislava",
    league: "Slovak Super Liga",
    stadiumName: "Tehelné pole",
    location: "Bratislava, Slovakien",
    logo: "/logos/slovan-bratislava.png",
    heroImage: "/stadiums/tehelne-pole-hero.jpg",
    stadiumLayoutImage: "/stadiums/tehelne-pole-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Tehelne+pole,+Bratislava&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Tehelné pole är Slovakiens nationalarena och Slovan Bratislavas hemmaplan, med en kapacitet på över 22 500 åskådare. Den moderna anläggningen erbjuder förstklassiga faciliteter och en storslagen inramning för både ligaspel och europeiska turneringar.",
    aboutTickets: "Boka biljetter till Slovan Bratislava på Tehelné pole. Upplev toppfotboll i Slovakiens charmiga huvudstad.",
    howToBuy: "Biljetter släpps via klubbens hemsida. För garanterade biljetter och trevliga hotellpaket i Bratislava bokar du enklast via biljetterfotboll.se.",
    sectionsAndPrices: "Långsidorna håller hög standard med god överblick över planen, och kortsidorna samlar klubbens mest inbitna supportrar.",
    packages: "Kombinera en prisvärd weekend i vackra Bratislava vid Donau med spännande europeisk fotboll. Paketen inkluderar matchbiljett och hotell.",
    history: "ŠK Slovan Bratislava grundades 1919 och är historiskt sett den mest framgångsrika klubben i Slovakien (och det tidigare Tjeckoslovakien), med en triumf i Cupvinnarcupen 1969 som kronan på verket.",
    faqs: [
      {
        question: "Var ligger Tehelné pole?",
        answer: "Arenan ligger i stadsdelen Nové Mesto i Bratislava och nås enkelt med spårvagn eller buss från stadens centrala delar."
      },
      {
        question: "Vad är klubbens största internationella merit?",
        answer: "Slovan Bratislava är den enda klubben från det tidigare Tjeckoslovakien som har vunnit en europeisk storcup (Cupvinnarcupen 1969 efter seger mot FC Barcelona)."
      }
    ]
  },
  "sporting": {
    name: "Sporting CP",
    league: "Primeira Liga",
    stadiumName: "Estádio José Alvalade",
    location: "Lissabon, Portugal",
    logo: "/logos/sporting.png",
    heroImage: "/stadiums/estadio-jose-alvalade-hero.jpg",
    stadiumLayoutImage: "/stadiums/estadio-jose-alvalade-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Estadio+Jose+Alvalade,+Lisbon&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Estádio José Alvalade invigdes 2003 och rymmer drygt 50 000 åskådare. Arenan är känd för sin färgglada och moderna arkitektur samt sitt fantastiska läktartryck när de grön-vita lejonen spelar inför sina passionerade supportrar.",
    aboutTickets: "Jämför biljetter till Sporting CP. Säkra din plats till spännande matcher i den portugisiska ligan och Champions League på Estádio José Alvalade.",
    howToBuy: "Biljetter till Sporting är mycket eftertraktade, speciellt till derbyn och europeiska kvällar. För garanterade biljetter och hotellpaket rekommenderas att boka via biljetterfotboll.se.",
    sectionsAndPrices: "Tribuna och Bancada erbjuder utmärkta långsideplatser, medan kortsidorna samlar klacken (Juventude Leonina med flera) som skapar en öronbedövande ljudkuliss.",
    packages: "Upplev soliga Lissabon med dess historiska stadsdelar, utsökta mat och magisk storfotboll. Paketen inkluderar officiell matchbiljett och noga utvalda hotell.",
    history: "Sporting Clube de Portugal grundades 1906 och är en av Portugals 'Os Três Grandes'. Klubben har fostrat legendariska spelare som Cristiano Ronaldo och Luís Figo och spelar i grön-vitrandiga tröjor ('Os Leões').",
    faqs: [
      {
        question: "Hur tar man sig till Estádio José Alvalade?",
        answer: "Tunnelbanan i Lissabon har en direktstation vid arenan som heter 'Campo Grande' (linje Gula och Gröna), vilket gör det mycket enkelt att resa hit från stadskärnan."
      },
      {
        question: "Vad är klubbens smeknamn?",
        answer: "Klubben kallas 'Os Leões' (Lejonen) och har ett lejon som central symbol i sitt klubbmärke."
      }
    ]
  },

  "galatasaray": {
    name: "Galatasaray",
    league: "Süper Lig",
    stadiumName: "Rams Park",
    location: "Istanbul, Turkiet",
    logo: "/logos/galatasaray.png",
    heroImage: "/stadiums/rams-park-hero.jpg",
    stadiumLayoutImage: "/stadiums/rams-park-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Rams+Park,+Istanbul&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Rams Park (tidigare Türk Telekom Stadium) rymmer över 52 000 åskådare och är känd som en av världens absolut mest skrämmande och högljudda arenor för bortalag. Trycket och läktarkulturen här är i absolut särklass.",
    aboutTickets: "Boka biljetter till Galatasaray på Rams Park. Upplev den elektriska stämningen och passionen i Istanbul på plats.",
    howToBuy: "Efterfrågan på biljetter är enorm och matcherna slutsålda på sekunden. För garanterade matchbiljetter och trygga hotellpaket i Istanbul bokar du enklast via biljetterfotboll.se.",
    sectionsAndPrices: "Långsidorna erbjuder fin sikt och hög komfort, medan den legendariska kortsidan (ultrAslan) är ett kokande hav av rött och gult som sjunger matchen igenom.",
    packages: "Kombinera ett besök till magiska Istanbul – där Europa möter Asien – med absolut världsklass på läktaren. Paketen inkluderar matchbiljett och centralt hotellboende.",
    history: "Galatasaray Spor Kulübü grundades 1905 och är Turkiets mest meriterade klubb med flest ligatitlar samt historiska triumfer som seger i Uefa-cupen och Supercupen år 2000.",
    faqs: [
      {
        question: "Hur tar man sig till Rams Park?",
        answer: "Metrolinje M2 tar dig direkt till stationen Seyrantepe, som via en gångbro har en direktanslutning rakt in till arenan."
      },
      {
        question: "Vad kallas Galatasarays fans?",
        answer: "Huvudklacken kallas 'ultrAslan' och är känd över hela fotbollsvärlden för sina enorma tifon och öronbedövande ljudnivå."
      }
    ]
  },

  "fenerbahce": {
    name: "Fenerbahçe",
    league: "Süper Lig",
    stadiumName: "Şükrü Saracoğlu Stadium",
    location: "Istanbul, Turkiet",
    logo: "/logos/fenerbahce.png",
    heroImage: "/stadiums/sukru-saracoglu-stadium-hero.jpg",
    stadiumLayoutImage: "/stadiums/sukru-saracoglu-stadium-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Sukru+Saracoglu+Stadium,+Istanbul&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Ülker Stadyumu Şükrü Saracoğlu Spor Kompleksi rymmer över 47 000 åskådare och ligger i Kadıköy-distriktet på Istanbuls asiatiska sida. Arenan är historisk, kompakt och bjuder på ett enormt tryck.",
    aboutTickets: "Jämför biljetter till Fenerbahçe på Şükrü Saracoğlu-stadion. Upplev stekhet turkisk toppfotboll på den asiatiska sidan av Istanbul.",
    howToBuy: "Biljetttrycket är gigantiskt, särskilt vid Istanburlderbyn mot Galatasaray och Beşiktaş. Säkra din resa med matchbiljett och hotell via biljetterfotboll.se.",
    sectionsAndPrices: "Numrerade platser på långsidorna håller hög standard, medan Migros-läktaren och kortsidorna är hemvist för de passionerade gulklädda hemmasupportrarna.",
    packages: "Upptäck livliga Kadıköy, njut av fantastisk mat och storslagen fotboll. Våra paket inkluderar officiella matchbiljetter och utvalda hotell i Istanbul.",
    history: "Fenerbahçe Spor Kulübü grundades 1907 och spelar i gult och mörkblått ('Sarı-Lacivertliler'). Klubben har miljontals hängivna supportrar över hela världen och en enorm samling titlar.",
    faqs: [
      {
        question: "Var ligger stadion?",
        answer: "Arenan ligger i Kadıköy på Istanbuls asiatiska sida, enkelt nåbana med färja från den europeiska sidan följt av en kort promenad."
      },
      {
        question: "Vilket är lagets största derby?",
        answer: "Det enorma 'Kıtalararası Derbi' (Interkontinentala derbyt) mot Galatasaray är en av fotbollsvärldens mest laddade rivaliteter."
      }
    ]
  },

  "shakhtar": {
    name: "Sjachtar Donetsk",
    league: "Ukrainska Premier League",
    stadiumName: "Arena Lviv",
    location: "Lviv, Ukraina",
    logo: "/logos/shakhtar.png",
    heroImage: "/stadiums/arena-lviv-hero.jpg",
    stadiumLayoutImage: "/stadiums/arena-lviv-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Arena+Lviv,+Lviv&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Arena Lviv invigdes inför Euro 2012 och rymmer närmare 35 000 åskådare. En toppmodern och stilig anläggning som på grund av omständigheterna har fungerat som internationell hemmaplan för den ukrainska storklubben.",
    aboutTickets: "Jämför information och biljetter till Sjachtar Donetsk. Följ den ukrainska storklubbens europeiska äventyr på plats.",
    howToBuy: "Biljettinformation varierar beroende på var hemmamatcherna spelas för tillfället. För uppdaterad information om paketresor och tillgänglighet, besök biljetterfotboll.se.",
    sectionsAndPrices: "Arenan erbjuder moderna sittplatser runt hela planen med god överblick och fina faciliteter.",
    packages: "Stötta Sjachtar Donetsk i deras europeiska framträdanden. Våra paket inkluderar biljett och hotellarrangemang.",
    history: "Futbolnyj klub 'Šachtar' Doneck grundades 1936 i Donbass-regionen och har utvecklats till en av Östeuropas starkaste klubbar med flera ligatitlar och en triumf i Uefa-cupen 2009.",
    faqs: [
      {
        question: "Var spelar Sjachtar sina hemmamatcher?",
        answer: "På grund av kriget i Ukraina spelar klubben sina europeiska matcher på tillfälliga arenor, bland annat i Lviv eller utomlands."
      },
      {
        question: "Vad betyder namnet Sjachtar?",
        answer: "Det betyder 'Gruvarbetaren', vilket speglar regionens starka industri- och kolgruvtradition."
      }
    ]
  },

  "bodo-glimt": {
    name: "Bodø/Glimt",
    league: "Eliteserien",
    stadiumName: "Aspmyra Stadion",
    location: "Bodø, Norge",
    logo: "/logos/bodo-glimt.png",
    heroImage: "/stadiums/aspmyra-stadion-hero.jpg",
    stadiumLayoutImage: "/stadiums/aspmyra-stadion-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Aspmyra+Stadion,+Bodo&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Aspmyra Stadion i Bodø rymmer runt 8 300 åskådare och ligger norr om polcirkeln. Trots sin mindre storlek har den blivit en legendarisk borg där Bodø/Glimt har skapat magiska europeiska skrällar mot europeiska giganter.",
    aboutTickets: "Boka biljetter till Bodø/Glimt på Aspmyra Stadion. Upplev den otroliga fotbollssagan norr om polcirkeln.",
    howToBuy: "Biljetttrycket till matcherna i Europa och toppmatcherna i Eliteserien är extremt högt. Säkra din resa och matchbiljett genom att boka via biljetterfotboll.se.",
    sectionsAndPrices: "Hovedtribunen erbjuder bra sittplatser under tak, medan kortsidorna rymmer de hängivna Glimt-fansen som viftar med de karaktäristiska gula tandborstarna.",
    packages: "Kombinera spektakulär arktisk natur, Lofoten och fantastisk anfallsfotboll. Paketen inkluderar matchbiljett och hotell i Bodø.",
    history: "Fotballklubben Bodø/Glimt grundades 1916 och spelar i gula tröjor. Klubben har tagit Skandinavien med storm genom sin sagolika utveckling, fantastiska spelstil och stora framgångar i Uefa Europa Conference League och Champions League.",
    faqs: [
      {
        question: "Var ligger Aspmyra Stadion?",
        answer: "Arenan ligger centralt i Bodø, endast en kort promenad från både stadskärnan och flygplatsen."
      },
      {
        question: "Vad är grejen med de gula tandborstarna?",
        answer: "Bodø/Glimt-fansen har en unik tradition att vifta med stora gula tandborstar på läktaren som en rolig och lojal supporterritual."
      }
    ]
  },

  "slavia-prague": {
    name: "Slavia Prag",
    league: "Fortuna Liga",
    stadiumName: "Fortuna Arena",
    location: "Prag, Tjeckien",
    logo: "/logos/slavia-prague.png",
    heroImage: "/stadiums/fortuna-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/fortuna-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Fortuna+Arena,+Prague&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Fortuna Arena (tidigare Sinobo Stadium / Eden Arena) invigdes 2008 och rymmer drygt 19 300 åskådare. Det är Tjeckiens modernaste fotbollsarena, känd för sin branta läktardesign som ger en intim och enormt intensiv inramning.",
    aboutTickets: "Jämför biljetter till Slavia Prag på Fortuna Arena. Upplev spännande tjeckisk toppfotboll i vackra Prag.",
    howToBuy: "Biljetter till Slavia Prags toppmatcher och Europaspel är mycket eftertraktade. Säkra dina biljetter och hotellpaket smidigt via biljetterfotboll.se.",
    sectionsAndPrices: "Långsidorna erbjuder hög komfort och perfekt sikt, medan den rödvita kortsidan är hemvist för Tribuna Sever – klubben mest passionerade klack.",
    packages: "Kombinera en weekend i sagolika Prag med förstklassig europeisk fotboll. Paketen inkluderar officiell matchbiljett och centralt hotellboende.",
    history: "Sportovní Klub Slavia Praha grundades 1892 och är en av Tjeckiens äldsta och mest anrika föreningar. Laget spelar i rött och vitt och har en stolt tradition av teknisk, offensiv fotboll.",
    faqs: [
      {
        question: "Hur tar man sig till Fortuna Arena?",
        answer: "Spårvagnslinjerna 6, 7, 22 och 24 stannar precis vid hållplatsen 'Slavia' i stadsdelen Vršovice, bara ett stenkast från arenan."
      },
      {
        question: "Vad kallas klacken?",
        answer: "Klacken heter 'Tribuna Sever' och är känd för sina storslagna tifon och ständiga sång under matcherna."
      }
    ]
  },

  "sabah": {
    name: "Sabah FK",
    league: "Azerbajdzjanska Premjer Liqasy",
    stadiumName: "Bank Respublika Arena",
    location: "Masazır, Azerbajdzjan",
    logo: "/logos/sabah.png",
    heroImage: "/stadiums/bank-respublika-arena-hero.jpg",
    stadiumLayoutImage: "/stadiums/bank-respublika-arena-hero.jpg",
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Bank+Respublika+Arena,+Masazir&t=&z=16&ie=UTF8&iwloc=&output=embed",
    stadiumDescription: "Bank Respublika Arena ligger i Masazır strax utanför Baku och rymmer runt 13 000 åskådare. En intim och modern arena som fungerar som hemmaplan för den snabbväxande azerbajdzjanska klubben.",
    aboutTickets: "Jämför biljetter till Sabah FK. Följ spännande fotboll och klubbens framsteg i Azerbajdzjan.",
    howToBuy: "Biljetter köps enklast via klubbens officiella kanaler på plats i Baku. För skräddarsydda fotbollsresor och paketlösningar kan du besöka biljetterfotboll.se.",
    sectionsAndPrices: "Huvudläktaren erbjuder bekväma sittplatser med tak, och arenans kompakta utformning ger fin närhet till planen.",
    packages: "Upptäck spännande Baku vid Kaspiska havet och modern azerbajdzjansk klubbfotboll. Våra paket inkluderar matchbiljett och hotell.",
    history: "Sabah Futbol Klubu grundades så sent som 2017 men har snabbt etablerat sig i toppen av den azerbajdzjanska ligan och börjat utmana i europeiska kvalspel.",
    faqs: [
      {
        question: "Var ligger Bank Respublika Arena?",
        answer: "Arenan ligger i orten Masazır, cirka 15–20 minuters bilfärd från centrala Baku."
      },
      {
        question: "Vilka färger spelar laget i?",
        answer: "Klubben spelar i blått och vitt som sina primära färgkombinationer."
      }
    ]
  }
};
