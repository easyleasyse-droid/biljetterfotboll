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

export const TEAMS_SEO_DATA: Record<string, TeamSEOData> = {
  "arsenal": {
    name: "Arsenal FC",
    stadiumName: "Emirates Stadium",
    logo: "/logos/arsenal.png",
    stadiumDescription: "Emirates Stadium, som slog upp portarna 2006 i norra London, är ett arkitektoniskt mästerverk och en av världens mest lönsamma och moderna arenor. Med en kapacitet på 60 704 åskådare erbjuder den enastående siktlinjer från varenda stol, rymliga concourses under läktarna och en helt fantastisk gräsmatta som ofta kallas för världens bästa. Arenan är uppdelad i fyra etage och är känd för att vara extremt tillgänglig och bekväm, även om purister ibland saknar atmosfären från gamla Highbury. Under de senaste åren, i takt med lagets sportsliga framgångar, har stämningen dock lyft till helt nya höjder, särskilt på den södra läktaren (The Clock End) där de mest röststarka fansen samlas.",
    location: "London, England",
    league: "Premier League",
    aboutTickets: "Hitta auktoriserade biljetter till Arsenal på Emirates Stadium. Vi jämför priser för allt från prisvärda kortsidesbiljetter till exklusiva Club Level-paket med mat och dryck inkluderat.",
    heroImage: "https://images.unsplash.com/photo-1513568690814-db9512f36f60?q=80&w=1200&auto=format&fit=crop", // Garanterad fotbollsarena/stadion
    contentImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop", // Arenastrålkastare/matchmiljö
    stadiumLayoutImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop", // Läktarsektioner
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2480.24584281729!2d-0.10842242337777176!3d51.5548884718247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b764bf00001%3A0x12e9491176b9117a!2sEmirates%20Stadium!5e0!3m2!1ssv!2sse!4v1710000000000!5m2!1ssv!2sse",
    howToBuy: "Att köpa biljetter direkt via Arsenals officiella kanaler kräver i princip alltid ett betalt medlemskap (Red Membership, ca £35/år) per biljett. Biljetterna släpps exakt två månader före match via ett digitalt kösystem där chanserna är små för populära helgmatcher. För internationella resenärer är det betydligt tryggare och smidigare att köpa via auktoriserade 'Official Overseas Travel Agents' som säljer officiella hospitality-biljetter i kombination med hotell eller louloger, helt utan krav på medlemskap. Vi listar enbart verifierade aktörer så att du slipper oroa dig för falska biljetter på andrahandsmarknaden.",
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
    heroImage: "https://images.unsplash.com/photo-1622760807800-47b29302b3c4?q=80&w=1200&auto=format&fit=crop", // Garanterad röd/fotbollsarena känsla
    contentImage: "https://images.unsplash.com/photo-1510563800743-aed2364902cb?q=80&w=600&auto=format&fit=crop", // Klassisk läktare/stadion
    stadiumLayoutImage: "/stadiums/old-trafford.jpg",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2375.3129596489387!2d-2.293902323267597!3d53.46305886623668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bae72e7e47f69%3A0x6c930e96df4455fe!2sOld%20Trafford!5e0!3m2!1ssv!2sse!4v1710000000001!5m2!1ssv!2sse",
    howToBuy: "Ordinarie biljetter säljs via klubbens officiella sajt enbart till personer med ett betalt 'Official Membership'. Till stormatcherna (mot Liverpool, Man City, Arsenal, Chelsea) lottas biljetterna ut bland medlemmarna, vilket gör det nästan omöjligt för turister att få plats. Lösningen för internationella fans är att boka officiella matchpaket (Hospitality) via auktoriserade agenter. Dessa biljetter kräver inget medlemskap och ger dig garanterat en äkta biljett samt tillgång till exklusiva lounger som International Suite, 500 Club eller Academy Lounge innan matchstart.",
    sectionsAndPrices: "Arenan är indelad i fyra huvudläktare: Sir Alex Ferguson Stand (North), Sir Bobby Charlton Stand (South), Stretford End (West) och East Stand. Kortsidan East Stand är ofta det mest prisvärda alternativet, och det är även här bortafansen har en liten sektion. Sir Alex Ferguson Stand är den största läktaren i tre etage som ger en spektakulär panoramavy men kan kännas lite långt ifrån om du hamnar högst upp (Tier 3). Priserna skjuter i höjden för stormatcher, medan tidiga cupmatcher eller matcher mot bottenlag ofta erbjuder mycket bra priser på långsidorna.",
    packages: "Ett fotbollspaket till Manchester United är det absolut bekvämaste sättet att resa. Paketen innehåller en officiell matchbiljett (ofta placerad på Quadrant-sektionerna på North-West eller North-East, vilket ger utmärkt sikt diagonal över planen) kombinerat med hotellboende. Du kan välja hotell i centrala Manchester (runt Piccadilly eller Deansgate för ett aktivt nattliv) eller nära Salford Quays/MediaCityUK om du vill ha gångavstånd till arenan och slippa trängseln på spårvagnarna efter slutsignal.",
    history: "Klubben bildades ursprungligen 1878 under namnet Newton Heath LYR FC av järnvägsarbetare. Efter att ha varit nära konkurs räddades klubben 1902 av lokala affärsmän som ändrade namnet till Manchester United. Klubbens moderna historia är starkt präglad av två legendariska tränare. Först Sir Matt Busby, som byggde upp det unga, fantastiska laget 'Busby Babes' som tragiskt drabbades av flygkatastrofen i München 1958 där 8 spelare omkom. Busby överlevde och byggde ett nytt lag som vann Europacupen 10 år senare (1968). Den andra guldåldern leddes av Sir Alex Ferguson (1986–2013), som gjorde klubben till världens största med 13 Premier League-titlar och den historiska 'The Treble' (Ligan, FA-cupen och Champions League) 1999.",
    faqs: [
      {
        question: "Vad är 'Hospitality-biljetter' på Old Trafford?",
        answer: "Det är officiella biljetter som säljs helt lagligt till icke-medlemmar. De inkluderar matchbiljett på långsidan eller i hörnen (Quadrant), samt tillgång till en uppvärmd bar/lounge innan match, gratis matchprogram och halvtidssnacks."
      },
      {
        question: "Hur tar man sig till Old Trafford från centrum?",
        answer: "Det absolut snabbaste sättet är att ta spårvagnen (Metrolink) från Manchester Piccadilly eller Deansgate-Castlefield direkt till stationen 'Old Trafford' (Altrincham-linjen) eller 'Wharfside' (Trafford Park-linjen). Det tar cirka 15 minuter."
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
    aboutTickets: "Jämför biljetter och hotellpaket till Liverpool FC på Anfield. Upplev den unika stämningen på The Kop eller njut av förstklassig hospitality på Main Stand.",
    heroImage: "https://images.unsplash.com/photo-1531124432170-4963503f1f3a?q=80&w=1200&auto=format&fit=crop", // Garanterad röd läktare/fotbollsmiljö
    contentImage: "https://images.unsplash.com/photo-1556056504-51717367a80c?q=80&w=600&auto=format&fit=crop", // Match/stadion
    stadiumLayoutImage: "https://images.unsplash.com/photo-1516515429572-bf32372f2409?q=80&w=600&auto=format&fit=crop", // Läktarstolar/stadion (RENSAD FRÅN LAMBORGHINI)
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2377.12353110292!2d-2.9634283232692257!3d53.43082936865611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b216f7dddb69b%3A0x6b448f760da62fef!2sAnfield!5e0!3m2!1ssv!2sse!4v1710000000002!5m2!1ssv!2sse",
    howToBuy: "Biljetter till Anfield är bland de svåraste i hela världen att köpa på egen hand. Klubbens egna släpp kräver medlemskap och sker via ett poängsystem (du måste ha gått på ett visst antal matcher föregående säsong för att få köpa till stormatcher). Att köpa svart utanför arenan är förenat med enorm risk då Liverpool använder strikt digitala NFC-biljetter som är låsta till telefoner. Den enda säkra vägen för svenska fans är att boka officiella matchbiljetter med hospitality-tillgång via auktoriserade sportresebyråer. Det garanterar en laglig biljett som skickas direkt till din smartphone via klubbens officiella app.",
    sectionsAndPrices: "Arenan är uppdelad i The Kop (kortsidan med bäst stämning), Main Stand (det enorma nya långsidoetaget med fantastiska faciliteter), Sir Kenny Dalglish Stand (motsvarande långsida, klassisk och nära planen) samt Anfield Road End (kortsidan där även bortafansen huserar). Priserna på Anfield är generellt högre än på många andra engelska arenor på grund av den extrema efterfrågan. Platser högt upp på Main Stand ger en otrolig vy över staden men kan kännas avlägsna, medan platser på Sir Kenny Dalglish Stand sätter dig mitt i händelsernas centrum.",
    packages: "Ett typiskt Liverpool-paket innehåller 2 nätters hotellboende i centrala Liverpool (t.ex. runt Albert Dock eller Lime Street Station) samt en officiell matchbiljett. Biljetterna är oftast placerade på det nya, moderna Main Stand (t.ex. sektion L11/L12) eller Anfield Road End, och inkluderar ofta tillgång till en lounge (antingen på arenan eller på en närliggande legendarisk mötesplats som The Sandon) där det bjuds på mat och dryck innan match. Det är den perfekta kombinationen för en trygg och oförglömlig fotbollshelg.",
    history: "Liverpool FC bildades 1892 efter en numera historisk intern fejd. Affärsmannen John Houlding, som ägde Anfield, hamnade i en hyrestvist med Everton FC (som då spelade på Anfield). Everton packade sina väskor och flyttade till Goodison Park, varpå Houlding stod med en tom arena och inget lag. Han startade då Liverpool FC som kom att bli en av världens mest framgångsrika klubbar. Under ledning av Bill Shankly på 1960-talet transformerades klubben från ett division 2-lag till en europeisk stormakt och skapade 'The Boot Room'-kulturen. Klubben dominerade totalt under 70- och 80-talet under Bob Paisley och Kenny Dalglish, och har i modern tid återvänt till den absoluta världstoppen under Jürgen Klopps karismatiska ledarskap.",
    faqs: [
      {
        question: "När levereras biljetterna till Anfield och hur fungerar de?",
        answer: "Liverpool FC använder 100 % digitala mobilbiljetter (NFC). Du får en personlig länk via e-post från din leverantör cirka 2–4 dagar före match, och du laddar ner biljetten direkt till din telefons digitala plånbok (Apple Wallet / Google Wallet) för att skanna vid vändkorset."
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
    aboutTickets: "Hitta biljetter till Chelsea FC på Stamford Bridge. Jämför allt från vanliga kortsidor till exklusiva paket med hotell i London.",
    heroImage: "https://images.unsplash.com/photo-1599422315622-be129cc6dbb4?q=80&w=1200&auto=format&fit=crop", // Blå/fotbollskänsla
    contentImage: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=600&auto=format&fit=crop", // Fotbollsplan/gräs
    stadiumLayoutImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop", // Läktare under strålkastare
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.3783777553335!2d-0.1936173233797677!3d51.48166667180479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760fa619bf1993%3A0x89db7a72da7793e5!2sStamford%20Bridge!5e0!3m2!1ssv!2sse!4v1710000000003!5m2!1ssv!2sse",
    howToBuy: "På grund av arenans begränsade kapacitet säljer i stort sett alla Premier League-matcher slut direkt till Chelseas egna medlemmar. Det är därför extremt svårt att köpa lösa biljetter på egen hand utan ett medlemskap. Den säkraste och smidigaste vägen är att boka via auktoriserade researrangörer som säljer officiella hospitality-biljetter. Dessa biljetter inkluderar officiell sittplats på West Stand eller East Stand och ger dig dessutom inträde till en lounge (t.ex. Tea Bar eller Captains Bar) före matchen med dryck, matchprogram och mat inkluderat, helt utan dolda medlemskrav.",
    sectionsAndPrices: "Stamford Bridge har fyra huvudläktare: West Stand (modern och lyxig långsida), East Stand (arenans äldsta läktare med familjesektioner), Matthew Harding Stand (där hemmasupportrarna sjunger mest) och Shed End (kortsidan där bortafansen sitter på ena halvan). Priserna är generellt höga, i linje med Londons prisnivåer, och stiger rejält under London-derbyn mot Arsenal och Tottenham eller vid matcher mot de övriga topplagen. Platser på West Stand Upper erbjuder fantastisk sikt över båda lagens bänkar och taktik.",
    packages: "Att boka ett Chelsea-paket är perfekt för en weekendresa till London. Paketen inkluderar en garanterad matchbiljett (ofta placerad på West Stand Middle/Upper eller East Stand) tillsammans med hotellboende. Du kan med fördel välja ett hotell i områdena Kensington, Earl's Court eller Fulham för att ha korta resvägar med tunnelbanan till matchen, samtidigt som du har hela centrala Londons utbud av shopping, restauranger och sevärdheter bara 15 minuter bort.",
    history: "Stamford Bridge öppnade ursprungligen 1877 som en friidrottsarena. Ägarna erbjöd arenan till Fulham FC, som tackade nej. För att inte stå med en tom arena fattade man då beslutet att starta en helt egen fotbollsklubb – och därmed föddes Chelsea FC 1905. Klubben vann sin första ligatitel 1955 men pendlade under långa perioder mellan divisionerna. Allt förändrades dramatiskt år 2003 när den ryska miljardären Roman Abramovich köpte klubben. Genom massiva investeringar och rekryteringen av José Mourinho ('The Special One') transformerades Chelsea till en global stormakt som radat upp Premier League-titlar och vunnit Champions League flera gånger under 2000-talet.",
    faqs: [
      {
        question: "Finns det en klädkod på Chelseas hospitality-platser?",
        answer: "Ja, Stamford Bridges lounger tillämpar en 'Smart Casual'-policy. Det innebär att du inte får bära trasiga jeans, träningskläder eller bortalagets färger. Chelseas hemmatröjor är dock tillåtna i de flesta mer avslappnade lounger."
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
    aboutTickets: "Köp biljetter till Tottenham Hotspur på deras toppmoderna hemmaarena. Jämför priser på officiella biljetter och exklusiva resepaket.",
    heroImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=1200&auto=format&fit=crop", // Garanterad fotbollsarena/arkitektur
    contentImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop", // Strålkastarljus/arena
    stadiumLayoutImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop", // Läktarsektioner
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2476.3268427928236!2d-0.06899722337345595!3d51.60428617183492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761e1b8577114b%3A0x7d6360bf008f5d02!2sTottenham%20Hotspur%20Stadium!5e0!3m2!1ssv!2sse!4v1710000000004!5m2!1ssv!2sse",
    howToBuy: "Tottenham har ett mycket modernt och smidigt biljettsystem, men precis som för övriga Londonklubbar krävs ett One Hotspur-medlemskap för att kunna köpa biljetter direkt via klubben. Lyckligtvis har klubben ett stort och välfungerande nätverk av officiella partners som säljer 'Premium Seats'. Dessa biljetter säljs helt utan krav på medlemskap och ger dig fantastiska platser på långsidan (etage 2 eller 3) kombinerat med tillgång till arenans prisbelönta lounger, mattorg och barer (inklusive den berömda 'Goal Line Bar' som är Europas längsta bar). Vi listar enbart dessa auktoriserade återförsäljare.",
    sectionsAndPrices: "Arenan är uppdelad i North, South, East och West Stand. Platser på South Stand är fantastiska för att uppleva stämningen på nära håll. Östra och västra långsidorna erbjuder premiumplatser med enastående komfort och sikt. Priserna varierar beroende på motstånd men tack vare arenans storlek finns det ofta ett bra utbud av biljetter till rimliga priser för matcher utanför toppskiktet. Det övre etaget (Tier 5) ger en otrolig överblick över hela arenan och spelet men ligger väldigt högt upp.",
    packages: "Ett matchpaket till Tottenham Hotspur är en fantastisk helhetsupplevelse tack vare den extremt höga standarden på arenans faciliteter. Paketen inkluderar officiella matchbiljetter (ofta i block 200-300 på långsidan med lounge-tillgång) samt hotellboende. Eftersom arenan ligger en bit norrut i London, är det mycket smidigt att bo på ett hotell nära Liverpool Street Station eller King's Cross. Därifrån tar du dig snabbt och enkelt med tåg direkt upp till arenan på matchdagen och har samtidigt bästa tänkbara utgångsläge för resten av din London-vistelse.",
    history: "Tottenham Hotspur grundades 1882 av ett gäng lokala skolpojkar från en cricketklubb och namngavs efter den historiske riddaren Harry Hotspur. Klubben blev historisk 1901 när de som första och enda lag utanför det officiella ligasystemet lyckades vinna FA-cupen. Under ledning av Bill Nicholson på 1950- och 60-talet upplevde klubben sin absoluta guldålder. De vann 'The Double' (ligan och FA-cupen samma år) 1961 och blev 1963 den första brittiska klubben någonsin att vinna en stor europeisk titel (Cupvinnarcupen). Klubben är känd för sin tradition av att spela attraktiv, offensiv fotboll under mottot 'Audere est Facere' (Att våga är att göra).",
    faqs: [
      {
        question: "Kan man betala med kontanter på Tottenham Hotspur Stadium?",
        answer: "Nej, arenan är 100 % kontantfri. Alla barer, matställen och souvenirbutiker accepterar enbart kort eller mobila betalningar (Apple Pay / Google Pay)."
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
    heroImage: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1200&auto=format&fit=crop", // Garanterad vacker stadion/stadsvy
    contentImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop", // Fotbollsplan/stadion
    stadiumLayoutImage: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=600&auto=format&fit=crop", // Match/gräsmatta
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3035.7176182390884!2d-3.69094772390506!3d40.45305405338167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228e23705d39f%3A0xa87652e78bc5aa!2sEstadio%20Santiago%20Bernab%C3%A9u!5e0!3m2!1ssv!2sse!4v1710000000005!5m2!1ssv!2sse",
    howToBuy: "Att köpa biljetter direkt via Real Madrids officiella hemsida är känt för att vara krångligt. Allmänna biljettsläpp sker ofta så sent som 5–7 dagar före matchstart och säljer slut på sekunder till klubbens medlemmar (Socios) och 'Madridistas Premium'. Dessutom nekar det spanska betalsystemet ofta utländska kreditkort. Det absolut säkraste sättet att planera sin resa i god tid är att köpa via auktoriserade biljettförmedlare och sportresebyråer. De har garanterade kvoter av officiella biljetter (både standard- och hospitality-paket) som levereras digitalt som e-biljetter direkt till din e-post.",
    sectionsAndPrices: "Arenan är uppdelad i Lateral Oeste (långsida väst, där spelarbänkarna finns och som är dyrast), Lateral Este (långsida öst, bäst för TV-vy) samt Fondo Norte och Fondo Sur (kortsidorna). Varje sida har flera etage (Tribuna, Primer Anfiteatro, Segundo Anfiteatro, Tercer Anfiteatro och Cuarto Anfiteatro). Priserna är generellt mycket överkomliga för matcher mot mindre La Liga-lag på de övre etagen, men exploderar till astronomiska summor för 'El Clásico' mot Barcelona eller slutspelsmatcher i Champions League.",
    packages: "Ett fotbollspaket till Real Madrid kombinerar världsfotboll med en fantastisk storstadssemester. Paketen inkluderar en garanterad matchbiljett (ofta på Lateral Este eller kortsidorna) samt boende på hotell i centrala Madrid. Vi rekommenderar att välja ett hotell nära paradgatan Gran Vía eller runt Sol/Atocha. Därifrån tar du dig extremt enkelt med tunnelbanans linje 10 direkt till stationen 'Santiago Bernabéu' på matchdagen, och har samtidigt gångavstånd till Madrids världsberömda tapasbarer, museer och nattliv under resten av helgen.",
    history: "Real Madrid grundades 1902 och utsågs av FIFA till 1900-talets mest framgångsrika klubb. Klubbens moderna storhetstid inleddes på 1940-talet under den visionäre presidenten Santiago Bernabéu, som ritade upp planerna för arenan och började värva världens bästa spelare, däribland Alfredo Di Stéfano och Ferenc Puskás. Laget vann de fem första upplagorna av Europacupen (nuvarande Champions League) i rad mellan 1956 och 1960. Under tidigt 2000-tal skapade presidenten Florentino Pérez det berömda 'Galácticos'-konceptet genom att värva superstjärnor som Zidane, Ronaldo, Beckham och Figo – en tradition av att samla världens absolut största stjärnor i den helvita tröjan som klubben stolt förvaltar än idag.",
    faqs: [
      {
        question: "Hur fungerar de digitala biljetterna till Bernabéu?",
        answer: "Biljetterna levereras som mobilbiljetter i PDF-format eller som en länk till din smartphone. Du öppnar dokumentet i telefonen och skannar streckkoden/QR-koden direkt i de automatiska vändkorsen vid den port (Puerta) som står angiven på din biljett."
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
    heroImage: "https://images.unsplash.com/photo-1524331408101-7fe03bf90f33?q=80&w=1200&auto=format&fit=crop", // Garanterad fotbollsarena
    contentImage: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop", // Stadion/publik/match
    stadiumLayoutImage: "https://images.unsplash.com/photo-1556056504-51717367a80c?q=80&w=600&auto=format&fit=crop", // Sektioner/fotboll
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.673892794411!2d2.1202723239474934!3d41.38089944365313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a413d07e26d9%3A0xf658f844ca1ba3b!2sSpotify%20Camp%20Nou!5e0!3m2!1ssv!2sse!4v1710000000006!5m2!1ssv!2sse",
    howToBuy: "Biljetter till FC Barcelona säljs i stor utsträckning via klubbens egna kanaler, men till de absolut största matcherna (El Clásico mot Real Madrid, derbyt mot Espanyol eller avgörande Champions League-slutspel) är det i princip omöjligt för icke-medlemmar att få tag på biljetter då klubbens säsongskortsinnehavare lägger beslag på platserna. Genom att använda vår jämförelsetjänst hittar du officiella sportresebyråer och verifierade biljettpartners som har fasta, garanterade biljettkvoter tilldelade direkt från klubben. Det gör att du kan boka din resa månader i förväg med fullständig trygghet.",
    sectionsAndPrices: "Camp Nou är indelat i Tribuna (långsidan med spelartunnel och VIP-boxar, dyrast), Lateral (motsatta långsidan som ger perfekt TV-vy och är mycket populär), samt Gol Nord och Gol Sud (kortsidorna). Platser på första etage (Golgata/1a Grada) tar dig extremt nära planen men har låg vinkel, medan andra etage (2a Grada) allmänt anses ge arenans absolut bästa sikt. Tredje etage (3a Grada) är gigantiskt och ligger väldigt högt upp, vilket erbjuder billiga biljetter men kräver ett bra falköga för att följa bollen.",
    packages: "Kombinationen av sol, strand, fantastisk tapas, arkitektur och fotboll i absolut världsklass gör Barcelona till det ultimata resmålet för en fotbollsresa. Ett komplett paket inkluderar officiella matchbiljetter (där platser i par alltid garanteras) och hotellboende. Det är klokt att välja ett hotell nära tunnelbanelinjerna L3 eller L5 (t.ex. runt Sants, Eixample eller Diagonal). Då tar du dig blixtsnabbt till arenan på matchdagen via stationerna Les Corts eller Collblanc, och bor samtidigt perfekt till för att utforska Las Ramblas och stranden under resten av helgen.",
    history: "FC Barcelona grundades 1899 av den schweiziske affärsmannen Joan Gamper. Klubben utvecklades snabbt till en symbol för den katalanska identiteten och motståndet mot centralstyret i Madrid, vilket sammanfattas i det världsberömda mottot 'Més que un club' (Mer än en klubb). Klubben har en unik fotbollsfilosofi baserad på bollinnehav och teknisk briljans, en filosofi som lades grunden till av holländske legenden Johan Cruyff under hans tid som spelare och senare tränare för 'Dream Team' på 1990-talet. Denna skola nådde sin absoluta kulmen under Pep Guardiola och klubbens egna akademi La Masia, som fostrat ikoner som Xavi, Iniesta och framför allt Lionel Messi, allmänt ansedd som historiens bästa fotbollsspelare.",
    faqs: [
      {
        question: "Garanteras platser tillsammans om vi bokar flera biljetter?",
        answer: "Ja, de etablerade leverantörer vi listar på vår sajt garanterar alltid att ni får sitta tillsammans i par (två och två). Om ni är ett större sällskap som reser ihop kan ni i de flesta fall välja till en 'sällskapsgaranti' i kassan för att säkra tre eller fyra platser i rad."
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
    heroImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop", // Garanterad fotbollsarena på kvällen
    contentImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop", // Läktarvy/stadion
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop", // Fotbollsplan/gräs
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.0028751508933!2d-3.6019556239053896!3d40.43588975376517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422f2cb82915cb%3A0x6b13fa250320a27c!2sEstadio%20C%C3%ADvitas%20Metropolitano!5e0!3m2!1ssv!2sse!4v1710000000007!5m2!1ssv!2sse",
    howToBuy: "Biljetter till Atlético Madrids matcher är i allmänhet betydligt mer lättillgängliga och prisvärda än till grannklubben Real Madrid, med undantag för det glödheta Madrid-derbyt (El Derbi Madrileño) eller stormatcher i Champions League. Klubbens officiella biljettsläpp sker digitalt några veckor före match. För att garantera sina platser långt i förväg och säkra bra sittplatser bredvid varandra på långsidorna väljer de flesta svenskar att köpa via auktoriserade biljettförmedlare eller boka kompletta fotbollspaket där officiell matchbiljett och hotellövernattning ingår.",
    sectionsAndPrices: "Metropolitano har en mycket tydlig struktur uppdelad i Lateral Oeste (västra långsidan med VIP och bänkar), Lateral Este (östra långsidan, perfekt för sol och tv-vy), Fondo Norte och Fondo Sur (kortsidorna). Läktarna är uppdelade i tre etage (Grada Baja, Grada Media och Grada Alta). Priserna på kortsidorna och det översta etaget är mycket plånboksvänliga och perfekta för budgetresenären, medan Grada Media på långsidorna erbjuder den absolut bästa balansen mellan fantastisk sikt, komfort och närhet till spelet.",
    packages: "Ett fotbollspaket till Atlético Madrid är ett fantastiskt sätt att uppleva den genuina, passionerade spanska fotbollskulturen. Paketen inkluderar officiell matchbiljett och boende på ett bra, centralt hotell i Madrid. Eftersom Estadio Metropolitano ligger i de östra utkanterna av staden, är det smartast att bo kvar i Madrids centrum (t.ex. runt Atocha eller Retiro-parken). På matchdagen tar du helt enkelt tunnelbanans linje 7 (orange linje) som går direkt ut till stationen 'Estadio Metropolitano' som ligger precis utanför arenans entré – smidigare kan det inte bli.",
    history: "Klubben grundades 1903 under namnet Athletic Club Sucursal de Madrid av baskiska studenter bosatta i huvudstaden, som en filial till Athletic Bilbao. Klubben blev självständig 1907 och antog de karaktäristiska rödvitrandiga tröjorna, vilket gav dem smeknamnet 'Los Colchoneros' (Madrassmakarna), eftersom madrasser i Spanien på den tiden tillverkades i exakt det tyget. Atlético har historiskt varit folkets och arbetarklassens lag i Madrid, i skarp kontrast till Real Madrids kungliga status. Klubbens moderna historia är helt synonym med tränarikonen Diego 'Cholo' Simeone, som tog över 2011 och transformerade klubben till en defensiv maskin som lyckats bryta Real Madrids och Barcelonas dominans och vinna flera historiska La Liga-titlar samt nått flera Champions League-finaler.",
    faqs: [
      {
        question: "Hur tar man sig lättast till Estadio Metropolitano?",
        answer: "Det absolut smidigaste sättet är att ta tunnelbanans linje 7 (orange linje) och gå av vid stationen 'Estadio Metropolitano' som ligger direkt under arenans huvudentré. Det tar cirka 25–30 minuter från centrala Madrid."
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
    heroImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop", // Garanterad fotbollsstadion i strålkastarljus (INGEN LAMBORGHINI HÄR!)
    contentImage: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop", // Fotboll på gräs
    stadiumLayoutImage: "https://images.unsplash.com/photo-1556056504-51717367a80c?q=80&w=600&auto=format&fit=crop", // Läktarsektioner
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2254.735235546252!2d12.985449273413988!3d55.58434726410427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4653a15dc4a3b723%3A0x633519894e6dc637!2sEleda%20Stadion!5e0!3m2!1ssv!2sse!4v1710000000008!5m2!1ssv!2sse",
    howToBuy: "Till ordinarie allsvenska seriematcher säljs biljetter enkelt direkt via Malmö FF:s officiella biljettsystem (axs). Men till de glödheta Skånederbyna, guldmatcher eller vid de prestigefyllda matcherna i Europa League och Champions League blir arenan snabbt helt slutsåld till klubbens över 10 000 säsongskortsinnehavare och medlemmar. För supportrar som reser långväga och vill säkra sina sittplatser i god tid samlar vi säkra, verifierade paketlösningar och resealternativ som garanterar officiella sittplatser på långsidorna.",
    sectionsAndPrices: "Arenan är uppdelad i Norra Läktaren (hemmaståplats, bäst tryck och mest prisvärt), Södra Läktaren (sittplats samt en sektion för bortafans), Östra Läktaren och Västra Läktaren (långsidorna). Västra Läktaren rymmer VIP-boxar och spelargången och ligger högst i pris. För familjer är de sydvästra sektionerna på sittplats utmärkta val med bra sikt och en lugnare miljö. Priserna på Eleda Stadion är mycket rimliga i jämförelse med europeiska toppligor, vilket gör ett besök till en extremt prisvärd fotbollsupplevelse.",
    packages: "För supportrar som reser till Malmö utifrån landet eller från norra Sverige finns det mycket smidiga hotellpaket. Dessa paket inkluderar en garanterad, officiell sittplatsbiljett på långsidan (Östra eller Västra läktaren) kombinerat med en eller två nätters övernattning på ett högklassigt hotell i centrala Malmö (t.ex. runt Clarion Hotel Live eller vid Centralstationen). Det ger dig en perfekt fotbollshelg med chans att avnjuta Malmös rika restaurangliv och ta en smidig promenad eller buss ut till stadionområdet på matchdagen.",
    history: "Malmö Fotbollförening grundades 1910 och har under mer än ett sekel etablerat sig som Sveriges mest framgångsrika fotbollsklubb, med flest SM-guld och segrar i Svenska Cupen i historien. Klubben är dessutom historisk i hela Norden som den enda skandinaviska förening som lyckats nå en final i Europacupen för mästarlag (nuvarande Champions League), vilket skedde 1979 under ledning av den legendariske engelske tränaren Bob Houghton, där man dock föll med 1-0 mot Nottingham Forest på Olympiastadion i München. Under ledning av starka profiler som Eric Persson ('Hövdingen') lades grunden till den professionella vinnarkultur och den starka lokala förankring i staden som gör att MFF än idag dominerar svensk fotboll och regelbundet kvalificerar sig för de stora europeiska gruppspelen.",
    faqs: [
      {
        question: "Hur tar jag mig lättast till Eleda Stadion?",
        answer: "Stadion ligger centralt i Malmö. Du tar dig hit på under 10 minuter från Malmö Central eller Triangeln genom att ta stadsbuss linje 3 (mot Ringlinjen) eller linje 8 (mot Hyllie) och gå av vid hållplats 'Stadion'."
      }
    ]
  }, // <--- Detta kommatecken är LIVSVIKTIGT för att Valencia ska fungera
  "valencia": {
    name: "Valencia CF",
    stadiumName: "Mestalla",
    logo: "/logos/valencia.png",
    stadiumDescription: "Mestalla är en av Spaniens mest historiska och intensiva arenor, känd för sina extremt branta läktare som ger en unik närhet till planen.",
    location: "Valencia, Spanien",
    league: "La Liga",
    aboutTickets: "Upplev den unika atmosfären på Mestalla. Vi jämför priser för officiella biljetter till Valencia CF.",
    heroImage: "https://images.unsplash.com/photo-1577223625816-7546f939037e?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.799732731872!2d-0.3637372239337581!3d39.47453457161822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048995a9a4b3d%3A0xe543e49e917d4a2d!2sEstadio%20de%20Mestalla!5e0!3m2!1ssv!2sse!4v1710000000008!5m2!1ssv!2sse",
    howToBuy: "Biljetter till Valencia köps smidigast via klubbens officiella sajt. För stormatcher rekommenderas officiella matchpaket.",
    sectionsAndPrices: "Arenan är uppdelad i olika sektioner där 'Grada Central' erbjuder bäst sikt. Kortsidorna är mer prisvärda.",
    packages: "Vi listar paket som inkluderar officiell matchbiljett och hotell i centrala Valencia.",
    history: "Valencia CF grundades 1919 och är en av Spaniens mest framgångsrika klubbar med flera ligatitlar och europeiska framgångar.",
    faqs: [
      {
        question: "Hur tar man sig till Mestalla?",
        answer: "Mestalla ligger centralt och nås enkelt med tunnelbana, station 'Aragón' ligger precis utanför."
      }
    ]
  },
  "inter": {
    name: "Inter Milan",
    stadiumName: "San Siro",
    logo: "/logos/inter.png",
    stadiumDescription: "En av världens mest ikoniska arenor, delad med stadsrivalen Milan.",
    location: "Milano, Italien",
    league: "Serie A",
    aboutTickets: "Inter säljer biljetter via sin officiella hemsida. För större matcher krävs ofta medlemskap.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",// För både Inter och AC Milan, använd denna URL:
    howToBuy: "Köp biljetter direkt via Inter.it eller officiella återförsäljare.",
    sectionsAndPrices: "För bästa sikt, välj sektionerna på långsidan (Primo Anello).",
    packages: "Vi erbjuder paket med hotell i Milano och officiell matchbiljett.",
    history: "Inter grundades 1908 och är en av Italiens mest framgångsrika klubbar.",
    faqs: [
      {
        question: "Var ligger San Siro?",
        answer: "Arenan ligger i nordvästra Milano och nås enkelt med spårvagn linje 16."
      }
    ]
  },
  "ac-milan": {
    name: "AC Milan",
    stadiumName: "San Siro",
    logo: "/logos/milan.png",
    stadiumDescription: "San Siro är hem för Milan och är en av fotbollsvärldens riktiga katedraler.",
    location: "Milano, Italien",
    league: "Serie A",
    aboutTickets: "Milan biljetter köps enklast via deras officiella portal.",
    heroImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Officiella hemsidan är säkrast. Tänk på att ha ID tillgängligt.",
    sectionsAndPrices: "Curva Sud är platsen för den mest fanatiska stämningen.",
    packages: "Hotell + biljett-paket finns tillgängliga för de flesta hemmamatcher.",
    history: "Grundad 1899, Milan är en av de mest klassiska klubbarna i europeisk fotboll.",
    faqs: [
      {
        question: "Behöver jag ID för att gå på match?",
        answer: "Ja, i Italien krävs giltig ID-handling för att komma in på arenan."
      }
    ]
  },
  "manchester-city": {
    name: "Manchester City",
    stadiumName: "Etihad Stadium",
    logo: "/logos/manchester-city.png",
    stadiumDescription: "En modern och imponerande arena som speglar klubbens framgångar.",
    location: "Manchester, England",
    league: "Premier League",
    aboutTickets: "City har en av Premier Leagues största arenor, men biljetterna går åt snabbt.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.455648756024!2d-2.202868284157143!3d53.48316397998651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb0814f61f7e3%3A0x6b4f74d02330a8c!2sEtihad%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Officiella hemsidan är bäst. Medlemskap krävs för toppmatcher.",
    sectionsAndPrices: "East Stand har bra överblick.",
    packages: "Matchpaket med hotell i Manchester finns tillgängliga.",
    history: "Klubben har dominerat engelsk fotboll under det senaste decenniet.",
    faqs: [{ question: "Hur tar man sig till Etihad?", answer: "Metrolink-spårvagn till hållplats 'Etihad Campus'." }]
  },
  "newcastle": {
    name: "Newcastle United",
    stadiumName: "St. James' Park",
    logo: "/logos/newcastle.png",
    stadiumDescription: "En ikonisk arena som tornar upp sig över staden Newcastle.",
    location: "Newcastle upon Tyne, England",
    league: "Premier League",
    aboutTickets: "Extremt högt tryck – boka i god tid.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2277.685324546875!2d-1.6234394841285!3d54.975586680335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e70b8c66e4a2d%3A0x1d5821034f5a2b1!2sSt%20James'%20Park!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Biljetter via officiella hemsidan, ofta genom lottningssystem för medlemmar.",
    sectionsAndPrices: "Gallowgate End erbjuder den mest intensiva stämningen.",
    packages: "Vi erbjuder paket med hotell i Newcastle.",
    history: "En klubb med enorm passion och en lång historia.",
    faqs: [{ question: "Var ligger arenan?", answer: "Den ligger mitt i centrum, gångavstånd från järnvägsstationen." }]
  },
  "leeds": {
    name: "Leeds United",
    stadiumName: "Elland Road",
    logo: "/logos/leeds.png",
    stadiumDescription: "En klassisk engelsk arena med en mycket intim atmosfär.",
    location: "Leeds, England",
    league: "Premier League",
    aboutTickets: "Lojala fans gör att biljetterna ofta säljer slut snabbt.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2356.5412345678!2d-1.5714321!3d53.777823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48795c123456789!2sElland%20Road!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Köp via officiella kanaler eller officiella matchpaket.",
    sectionsAndPrices: "Kop-läktaren är legendarisk.",
    packages: "Matchpaket finns tillgängliga.",
    history: "Leeds har en stolt historia och en av Englands mest hängivna supporterskaror.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Bussar går regelbundet från Leeds centrum." }]
  },
  "aston-villa": {
    name: "Aston Villa",
    stadiumName: "Villa Park",
    logo: "/logos/aston-villa.png",
    stadiumDescription: "En av Englands mest anrika arenor som ofta värd för semifinaler i FA-cupen.",
    location: "Birmingham, England",
    league: "Premier League",
    aboutTickets: "Villa Park är en fantastisk upplevelse för alla fotbollsfans.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.4321!2d-1.8845!3d52.5094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4870bc123456!2sVilla%20Park!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Officiella hemsidan är säkrast.",
    sectionsAndPrices: "Trinity Road Stand erbjuder utmärkt sikt.",
    packages: "Matchpaket med hotell i Birmingham rekommenderas.",
    history: "En klubb med anor från 1874 och vinnare av Europacupen 1982.",
    faqs: [{ question: "Var ligger arenan?", answer: "Den ligger i området Aston, en kort tågresa från Birmingham New Street." }]
  },
  "villarreal": {
    name: "Villarreal CF",
    stadiumName: "Estadio de la Cerámica",
    logo: "/logos/villareal.png",
    stadiumDescription: "En modern arena känd för sin fantastiska arkitektur och keramiska fasad.",
    location: "Villarreal, Spanien",
    league: "La Liga",
    aboutTickets: "Villarreal erbjuder en mycket gemytlig upplevelse med hög biljettillgänglighet.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "http://googleusercontent.com/maps.google.com/6",
    howToBuy: "Biljetter köps smidigast via klubbens officiella sajt.",
    sectionsAndPrices: "Tribuna-sektionerna erbjuder bäst sikt över planen.",
    packages: "Matchpaket med hotell i närliggande Castellón eller Valencia.",
    history: "Klubben har på kort tid etablerat sig som en stormakt i spansk och europeisk fotboll.",
    faqs: [{ question: "Hur reser man bäst hit?", answer: "Tåg från Valencia till Vila-real tar cirka en timme." }]
  },
  "real-betis": {
    name: "Real Betis",
    stadiumName: "Benito Villamarín",
    logo: "/logos/real-betis.png",
    stadiumDescription: "En av Spaniens mest passionerade arenor belägen i vackra Sevilla.",
    location: "Sevilla, Spanien",
    league: "La Liga",
    aboutTickets: "Sevilla-derbyt är en av de mest eftertraktade matcherna i Spanien.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "http://googleusercontent.com/maps.google.com/7",
    howToBuy: "Officiella hemsidan är säkrast. Undvik oseriösa andrahandsajter.",
    sectionsAndPrices: "Golsur-läktaren är känd för sin fantastiska stämning.",
    packages: "Vi listar paket som inkluderar hotell i centrala Sevilla.",
    history: "Grundades 1907 och har en av de mest lojala supporterbaserna i landet.",
    faqs: [{ question: "Var ligger arenan?", answer: "Den ligger i stadsdelen Heliópolis, väl ansluten med buss." }]
  },
  "sevilla": {
    name: "Sevilla FC",
    stadiumName: "Ramón Sánchez Pizjuán",
    logo: "/logos/sevilla.png",
    stadiumDescription: "En kompakt och intensiv arena som är känd för att vara en mardröm för motståndarlag.",
    location: "Sevilla, Spanien",
    league: "La Liga",
    aboutTickets: "Stort tryck, särskilt vid stora europeiska kvällar.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "http://googleusercontent.com/maps.google.com/8",
    howToBuy: "Via klubbens officiella biljettsida.",
    sectionsAndPrices: "Gol Norte är platsen för fansen.",
    packages: "Matchpaket med hotellvistelse i Sevilla finns tillgängliga.",
    history: "Europas kungar i Europa League – Sevilla är en klubb med en vinnarkultur utöver det vanliga.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Arenan ligger centralt, gångavstånd från tågstationen Santa Justa." }]
  },
  "real-sociedad": {
    name: "Real Sociedad",
    stadiumName: "Reale Arena",
    logo: "/logos/real-sociedad.png",
    stadiumDescription: "En toppmodern arena i den vackra kuststaden San Sebastián.",
    location: "San Sebastián, Spanien",
    league: "La Liga",
    aboutTickets: "Biljetter säljer ofta slut snabbt, särskilt mot storklubbar.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "http://googleusercontent.com/maps.google.com/9",
    howToBuy: "Köp via officiella kanaler i god tid.",
    sectionsAndPrices: "Tribuna Principal ger bäst vy över hela arenan.",
    packages: "Kombinera matchen med besök på stadens världsberömda restauranger.",
    history: "En klubb med stolta baskiska rötter och en rik historia.",
    faqs: [{ question: "Var ligger arenan?", answer: "Belägen i stadsdelen Amara, enkel att nå med lokalbuss eller tåg." }]
  },
  "athletic-bilbao": {
    name: "Athletic Bilbao",
    stadiumName: "San Mamés",
    logo: "/logos/athletic-bilbao.png",
    stadiumDescription: "Känd som 'katedralen' – en av de mest respekterade arenorna i fotbollsvärlden.",
    location: "Bilbao, Spanien",
    league: "La Liga",
    aboutTickets: "Att se en match på San Mamés är en bucket-list-upplevelse för alla fotbollsfans.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse0",
    howToBuy: "Biljetter köps enklast via officiella kanaler.",
    sectionsAndPrices: "Tribuna Norte är den mest stämningsfulla delen.",
    packages: "Vi rekommenderar matchpaket med hotell i närheten av arenan.",
    history: "Klubben har en unik policy att endast spela med spelare från regionen.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Mycket centralt läge, nås enkelt med spårvagn eller tunnelbana." }]
  },
  "juventus": {
    name: "Juventus",
    stadiumName: "Allianz Stadium",
    logo: "/logos/juventus.png",
    stadiumDescription: "En modern arena byggd för en intensiv fotbollsupplevelse.",
    location: "Turin, Italien",
    league: "Serie A",
    aboutTickets: "Juventus har en lojal publik, boka biljetter i god tid.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2817.5!2d7.638!3d45.109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886d38e2d2780b%3A0x1d4a0b2d6a5e1!2sAllianz%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Officiella hemsidan är säkrast.",
    sectionsAndPrices: "Tribuna Sud är där de mest inbitna fansen sitter.",
    packages: "Matchpaket med hotell i Turin finns.",
    history: "Italiens mest framgångsrika klubb genom tiderna.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Lokala bussar går regelbundet från Turins centrum." }]
  },
  "napoli": {
    name: "Napoli",
    stadiumName: "Stadio Diego Armando Maradona",
    logo: "/logos/napoli.png",
    stadiumDescription: "En arena med en av världens mest elektriska atmosfärer.",
    location: "Neapel, Italien",
    league: "Serie A",
    aboutTickets: "En match på Maradona-stadion är en unik upplevelse.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3019.2!2d14.193!3d40.818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b08e5!2sStadio%20Diego%20Armando%20Maradona!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Köp biljetter online i god tid.",
    sectionsAndPrices: "Curva B är hjärtat av stödet.",
    packages: "Kombinera matchen med pizza och kultur i Neapel.",
    history: "Klubben förknippas starkt med legenden Diego Maradona.",
    faqs: [{ question: "Är det svårt att få biljett?", answer: "Storklubbar säljer snabbt slut, planera i förväg." }]
  },
  "roma": {
    name: "AS Roma",
    stadiumName: "Stadio Olimpico",
    logo: "/logos/roma.png",
    stadiumDescription: "En historisk arena delad med Lazio, belägen i hjärtat av Rom.",
    location: "Rom, Italien",
    league: "Serie A",
    aboutTickets: "Stadio Olimpico är enorm och har bra biljettillgänglighet.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.2!2d12.454!3d41.933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f606!2sStadio%20Olimpico!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Officiella hemsidan.",
    sectionsAndPrices: "Curva Sud är Romas hemmaplan för fansen.",
    packages: "Matchpaket med hotell i Rom rekommenderas.",
    history: "Grundad 1927, en av de mest ikoniska klubbarna i Italien.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Spårvagn 2 stannar nära arenan." }]
  },
  "lazio": {
    name: "SS Lazio",
    stadiumName: "Stadio Olimpico",
    logo: "/logos/lazio.png",
    stadiumDescription: "Samma arena som Roma, men med sin egen unika atmosfär.",
    location: "Rom, Italien",
    league: "Serie A",
    aboutTickets: "Biljetter via officiella kanaler.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.2!2d12.454!3d41.933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f606!2sStadio%20Olimpico!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Enklast via deras officiella portal.",
    sectionsAndPrices: "Curva Nord är platsen för Lazios supportrar.",
    packages: "Vi listar paket med hotell i Rom.",
    history: "En klubb med stolta rötter i Rom sedan 1900.",
    faqs: [{ question: "Behöver jag ID?", answer: "Ja, alltid." }]
  },
  "atalanta": {
    name: "Atalanta",
    stadiumName: "Gewiss Stadium",
    logo: "/logos/atalanta.png",
    stadiumDescription: "En charmig arena i den vackra staden Bergamo.",
    location: "Bergamo, Italien",
    league: "Serie A",
    aboutTickets: "Atalanta är populära, boka i förväg.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.5!2d9.673!3d45.709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47814e5!2sGewiss%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Officiella kanaler.",
    sectionsAndPrices: "Curva Pisani är hjärtat.",
    packages: "Matchpaket finns.",
    history: "Klubben har på senare år blivit en europeisk kraft.",
    faqs: [{ question: "Hur tar man sig till Bergamo?", answer: "Tåg från Milano." }]
  },
  "bologna": {
    name: "Bologna FC",
    stadiumName: "Renato Dall'Ara",
    logo: "/logos/bologna.png",
    stadiumDescription: "En av Italiens mest klassiska arenor med ett anrikt torn.",
    location: "Bologna, Italien",
    league: "Serie A",
    aboutTickets: "Biljetter säljs via officiella kanaler.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.4!2d11.312!3d44.493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477fd4a!2sStadio%20Renato%20Dall'Ara!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Bolognas hemsida.",
    sectionsAndPrices: "Distinti ger bra överblick.",
    packages: "Matchpaket med hotell i Bologna.",
    history: "En av Italiens äldsta och mest anrika klubbar.",
    faqs: [{ question: "Var ligger arenan?", answer: "Lite utanför centrum, men lätt att nå med buss." }]
  },
  "como": {
    name: "Como 1907",
    stadiumName: "Stadio Giuseppe Sinigaglia",
    logo: "/logos/como.png",
    stadiumDescription: "En idyllisk arena belägen precis vid Comosjöns strand.",
    location: "Como, Italien",
    league: "Serie A",
    aboutTickets: "Att se Como spela är en unik upplevelse vid sjön.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2745.2!2d9.076!3d45.811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478696!2sStadio%20Giuseppe%20Sinigaglia!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Köp biljetter online.",
    sectionsAndPrices: "Huvudläktaren har den bästa utsikten.",
    packages: "Matchpaket med hotell vid sjön rekommenderas starkt.",
    history: "En klubb med mycket charm och spännande historia.",
    faqs: [{ question: "Var ligger arenan?", answer: "Precis vid Comosjöns strand i staden Como." }]
  },
  "psg": {
    name: "Paris Saint-Germain",
    stadiumName: "Parc des Princes",
    logo: "/logos/psg.png",
    stadiumDescription: "En modern arena i hjärtat av Paris med en intensiv atmosfär.",
    location: "Paris, Frankrike",
    league: "Ligue 1",
    aboutTickets: "PSG säljer biljetter via sin officiella hemsida och efterfrågan är enorm.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse3",
    howToBuy: "Köp via officiella PSG-kanaler för att undvika problem.",
    sectionsAndPrices: "Auteuil-läktaren är hjärtat av hemmasupportrarna.",
    packages: "Exklusiva matchpaket med hotell i centrala Paris finns tillgängliga.",
    history: "Grundad 1970, PSG är Frankrikes dominerande kraft i modern tid.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Tunnelbana linje 9 eller 10 är smidigast." }]
  },
  "strasbourg": {
    name: "RC Strasbourg",
    stadiumName: "Stade de la Meinau",
    logo: "/logos/strasbourg.png",
    stadiumDescription: "En klassisk arena med en fantastisk och högljudd publik.",
    location: "Strasbourg, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Biljetter är populära bland lokalbefolkningen, boka i tid.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse4",
    howToBuy: "Officiella hemsidan.",
    sectionsAndPrices: "Tribune Sud är känd för sin stämning.",
    packages: "Matchpaket med hotell i mysiga Strasbourg.",
    history: "En av Frankrikes mest historiska klubbar.",
    faqs: [{ question: "Var ligger arenan?", answer: "Söder om stadens centrum, lättillgänglig med spårvagn." }]
  },
  "lille": {
    name: "Lille OSC",
    stadiumName: "Stade Pierre-Mauroy",
    logo: "/logos/lille.png",
    stadiumDescription: "En toppmodern arena med ett tak som kan stängas vid dåligt väder.",
    location: "Lille, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Goda möjligheter att få tag på biljetter via klubbens sida.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse5",
    howToBuy: "Online via officiella kanaler.",
    sectionsAndPrices: "Sektionerna längs långsidan ger utmärkt sikt.",
    packages: "Matchpaket finns.",
    history: "En klubb med stor framgång under 2000-talet.",
    faqs: [{ question: "Hur reser man hit?", answer: "Lille är en knutpunkt för tåg från Paris och London." }]
  },
  "marseille": {
    name: "Olympique de Marseille",
    stadiumName: "Stade Vélodrome",
    logo: "/logos/marseille.png",
    stadiumDescription: "Kanske Frankrikes mest ikoniska arena med en otrolig inramning vid havet.",
    location: "Marseille, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Trycket är enormt – planera din resa i god tid.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse6",
    howToBuy: "Officiella hemsidan.",
    sectionsAndPrices: "Curva Sud är magisk.",
    packages: "Matchpaket med hotell i Marseille rekommenderas starkt.",
    history: "Den enda franska klubben som vunnit Champions League.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Tunnelbana linje 2 stannar precis vid arenan." }]
  },
  "nice": {
    name: "OGC Nice",
    stadiumName: "Allianz Riviera",
    logo: "/logos/nice.png",
    stadiumDescription: "En modern och hållbar arena vid franska rivieran.",
    location: "Nice, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Biljetter är tillgängliga via officiella sajten.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse7",
    howToBuy: "Boka online.",
    sectionsAndPrices: "Södra läktaren har den bästa stämningen.",
    packages: "Kombinera fotboll med semester vid kusten.",
    history: "En klubb med gamla anor och stor passion.",
    faqs: [{ question: "Var ligger arenan?", answer: "I den västra delen av Nice, lätt att nå med buss." }]
  },
  "lyon": {
    name: "Olympique Lyonnais",
    stadiumName: "Groupama Stadium",
    logo: "/logos/lyon.png",
    stadiumDescription: "En av Frankrikes mest moderna och imponerande arenor.",
    location: "Lyon, Frankrike",
    league: "Ligue 1",
    aboutTickets: "Bra tillgänglighet för de flesta hemmamatcher.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.541334994273!2d9.121516076587425!3d45.47810377107293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c12563f8d951%3A0x6b4f74d02330a8c!2sSan%20Siro!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse8",
    howToBuy: "Via deras officiella biljettsystem.",
    sectionsAndPrices: "Kortsidorna är mest prisvärda.",
    packages: "Matchpaket med hotell i Lyon finns.",
    history: "Dominerade fransk fotboll under 2000-talets början.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Spårvagnslinje T3 går direkt till arenan." }]
  },
  "bayern-munchen": {
    name: "Bayern München",
    stadiumName: "Allianz Arena",
    logo: "/logos/bayern-munchen.png",
    stadiumDescription: "En arkitektonisk pärla känd för sin lysande fasad.",
    location: "München, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Allianz Arena är nästan alltid utsåld, var ute i god tid.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.3!2d11.625!3d48.218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e74!2sAllianz%20Arena!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Officiella hemsidan.",
    sectionsAndPrices: "Südkurve är hjärtat av supportrarna.",
    packages: "Matchpaket med hotell i München.",
    history: "Tysklands mest framgångsrika klubb.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "U-Bahn U6 till Fröttmaning." }]
  },
  "borussia-dortmund": {
    name: "Borussia Dortmund",
    stadiumName: "Signal Iduna Park",
    logo: "/logos/borussia-dortmund.png",
    stadiumDescription: "Hem till 'Den gula väggen' och en av världens bästa atmosfärer.",
    location: "Dortmund, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Ett av de svåraste biljettsläppen i Europa.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5!2d7.452!3d51.492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b91a!2sSignal%20Iduna%20Park!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Boka via klubbens sida.",
    sectionsAndPrices: "Süd-Tribüne är den legendariska ståplatsläktaren.",
    packages: "Vi listar paket med hotell i Dortmund.",
    history: "En klubb känd för sin unika kultur och sina fans.",
    faqs: [{ question: "Är stämningen så bra som de säger?", answer: "Ja, det är en av fotbollsvärldens höjdpunkter." }]
  },
  "bayer-leverkusen": {
    name: "Bayer Leverkusen",
    stadiumName: "BayArena",
    logo: "/logos/bayer-leverkusen.png",
    stadiumDescription: "En intim och modern arena med mycket hög standard.",
    location: "Leverkusen, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Bra biljettillgänglighet.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2516.4!2d6.992!3d51.037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478546!2sBayArena!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Officiella hemsidan.",
    sectionsAndPrices: "Huvudläktaren har utmärkt sikt.",
    packages: "Matchpaket finns.",
    history: "En klubb på frammarsch.",
    faqs: [{ question: "Hur reser man hit?", answer: "Enkel tågresa från Köln eller Düsseldorf." }]
  },
  "eintracht-frankfurt": {
    name: "Eintracht Frankfurt",
    stadiumName: "Deutsche Bank Park",
    logo: "/logos/eintracht-frankfurt.png",
    stadiumDescription: "Känd för sin fantastiska stämning under europeiska kvällar.",
    location: "Frankfurt, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Extremt lojala fans, biljetter går fort.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.8!2d8.645!3d50.068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0b!2sDeutsche%20Bank%20Park!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Boka online i förväg.",
    sectionsAndPrices: "Westkurve är fantastisk.",
    packages: "Matchpaket med hotell i Frankfurt.",
    history: "En av Tysklands mest anrika klubbar.",
    faqs: [{ question: "Var ligger arenan?", answer: "I stadsdelen Niederrad." }]
  },
  "stuttgart": {
    name: "VfB Stuttgart",
    stadiumName: "MHPArena",
    logo: "/logos/stuttgart.png",
    stadiumDescription: "En traditionell tysk arena med modern touch.",
    location: "Stuttgart, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Bra tillgänglighet för de flesta matcher.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2633.7!2d9.233!3d48.792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4799c8!2sMHPArena!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Klubbens officiella portal.",
    sectionsAndPrices: "Långsidorna ger bra vy.",
    packages: "Matchpaket finns.",
    history: "En klubb med mycket historia i södra Tyskland.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "S-Bahn till station Neckarpark." }]
  },
  "union-berlin": {
    name: "1. FC Union Berlin",
    stadiumName: "Stadion An der Alten Försterei",
    logo: "/logos/union-berlin.png",
    stadiumDescription: "Känd för sin unika, nästan hemmastadda atmosfär.",
    location: "Berlin, Tyskland",
    league: "Bundesliga",
    aboutTickets: "Mycket eftertraktade biljetter, ofta slutsålt.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.4!2d13.568!3d52.457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84c!2sStadion%20An%20der%20Alten%20Försterei!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse",
    howToBuy: "Boka via officiella kanaler i god tid.",
    sectionsAndPrices: "En hel arenaupplevelse på ståplats.",
    packages: "Matchpaket med hotell i Berlin.",
    history: "En klubb med en fantastisk historia av lojalitet.",
    faqs: [{ question: "Hur är stämningen?", answer: "Unik och mycket intensiv." }]
  },
  "ajax": {
    name: "Ajax",
    stadiumName: "Johan Cruyff Arena",
    logo: "/logos/ajax.png",
    stadiumDescription: "En modern arena döpt efter den legendariska spelaren Johan Cruyff.",
    location: "Amsterdam, Nederländerna",
    league: "Eredivisie",
    aboutTickets: "Stort tryck på biljetterna, boka via officiella kanaler.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.455648756024!2d-2.202868284157143!3d53.48316397998651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb0814f61f7e3%3A0x6b4f74d02330a8c!2sEtihad%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse5",
    howToBuy: "Officiella hemsidan.",
    sectionsAndPrices: "F-Side är den mest stämningsfulla läktaren.",
    packages: "Matchpaket med hotell i Amsterdam.",
    history: "Nederländernas mest framgångsrika klubb.",
    faqs: [{ question: "Hur tar man sig till arenan?", answer: "Tunnelbana till station Strandvliet." }]
  },
  "psv": {
    name: "PSV Eindhoven",
    stadiumName: "Philips Stadion",
    logo: "/logos/psv.png",
    stadiumDescription: "En intim och atmosfärisk arena i Eindhoven.",
    location: "Eindhoven, Nederländerna",
    league: "Eredivisie",
    aboutTickets: "Bra biljettillgänglighet för de flesta matcher.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.455648756024!2d-2.202868284157143!3d53.48316397998651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb0814f61f7e3%3A0x6b4f74d02330a8c!2sEtihad%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse6",
    howToBuy: "Boka online via PSV.",
    sectionsAndPrices: "Huvudläktaren har utmärkt sikt.",
    packages: "Matchpaket finns tillgängliga.",
    history: "En klubb med stor europeisk framgång.",
    faqs: [{ question: "Var ligger arenan?", answer: "Gångavstånd från centralstationen i Eindhoven." }]
  },
  "feyenoord": {
    name: "Feyenoord",
    stadiumName: "De Kuip",
    logo: "/logos/feyenoord.png",
    stadiumDescription: "En av Europas mest legendariska och ikoniska arenor.",
    location: "Rotterdam, Nederländerna",
    league: "Eredivisie",
    aboutTickets: "Ett måste att uppleva, boka i god tid.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.455648756024!2d-2.202868284157143!3d53.48316397998651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb0814f61f7e3%3A0x6b4f74d02330a8c!2sEtihad%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse7",
    howToBuy: "Officiella hemsidan.",
    sectionsAndPrices: "Noord-läktaren är hjärtat av stödet.",
    packages: "Matchpaket med hotell i Rotterdam.",
    history: "Feyenoord är känt för sin otroliga passion.",
    faqs: [{ question: "Hur reser man hit?", answer: "Spårvagn från centralstationen." }]
  },
  "twente": {
    name: "FC Twente",
    stadiumName: "De Grolsch Veste",
    logo: "/logos/twente.png",
    stadiumDescription: "En modern och mycket trivsam arena.",
    location: "Enschede, Nederländerna",
    league: "Eredivisie",
    aboutTickets: "Goda möjligheter att få tag på biljetter.",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200&auto=format&fit=crop",
    contentImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    stadiumLayoutImage: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=600&auto=format&fit=crop",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.455648756024!2d-2.202868284157143!3d53.48316397998651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb0814f61f7e3%3A0x6b4f74d02330a8c!2sEtihad%20Stadium!5e0!3m2!1ssv!2sse!4v1718460000000!5m2!1ssv!2sse8",
    howToBuy: "Officiella kanaler.",
    sectionsAndPrices: "Hela arenan har bra sikt.",
    packages: "Matchpaket finns.",
    history: "En klubb med starkt regionalt stöd.",
    faqs: [{ question: "Var ligger arenan?", answer: "Strax utanför Enschede centrum." }]
  }
};