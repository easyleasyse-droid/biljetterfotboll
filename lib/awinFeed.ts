// I route.ts, där Awin-biljetterna läggs till:
        const feedUrl = process.env.AWIN_PRODUCT_FEED_URL || process.env.AWIN_FEED_URL;
        const awinTickets = findAwinTicketsForMatchSync(awinRows, homeName, awayName);

      if (Array.isArray(awinTickets) && awinTickets.length > 0) {
        // Gigsberg (ID 122390 eller namn)
        const gigsbergMatch = awinTickets.find(
          (t) => t.merchantName.toLowerCase().includes("gigsberg") || t.merchantId === "122390"
        );
        if (gigsbergMatch && gigsbergMatch.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-gigsberg`,
            merchantName: "Gigsberg",
            rating: 4.7,
            reviewsCount: 890,
            section: "Verifierad Marknadsplats",
            category: "Standard / VIP",
            priceSEK: gigsbergMatch.priceSEK,
            availableQuantity: 6,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: gigsbergMatch.url,
            type: "ticket"
          });
        }

        // FootballTicketNet
        const ftnMatch = awinTickets.find(
          (t) =>
            t.merchantName.toLowerCase().includes("football ticket") ||
            t.merchantName.toLowerCase().includes("footballticketnet") ||
            t.merchantName.toLowerCase().includes("ftn")
        );
        if (ftnMatch && ftnMatch.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-ftn`,
            merchantName: "Football Ticket Net",
            rating: 4.6,
            reviewsCount: 380,
            section: "Sittplats / Sektion valfri",
            category: "Standard / VIP",
            priceSEK: ftnMatch.priceSEK,
            availableQuantity: 6,
            deliveryType: "E-biljett / Mobil",
            isVerified: true,
            url: ftnMatch.url,
            type: "ticket"
          });
        }

        // TicketNetwork (ID 12028 eller namn)
        const tnMatch = awinTickets.find(
          (t) =>
            t.merchantName.toLowerCase().includes("ticketnetwork") ||
            t.merchantName.toLowerCase().includes("ticket network") ||
            t.merchantId === "12028"
        );
        if (tnMatch && tnMatch.priceSEK > 0) {
          offers.push({
            id: `o-${matchId}-ticketnetwork`,
            merchantName: "TicketNetwork",
            rating: 4.5,
            reviewsCount: 1120,
            section: "Verifierad Säljare",
            category: "Standard / VIP",
            priceSEK: tnMatch.priceSEK,
            availableQuantity: 5,
            deliveryType: "E-biljett (Direkt)",
            isVerified: true,
            url: tnMatch.url,
            type: "ticket"
          });
        }
      }