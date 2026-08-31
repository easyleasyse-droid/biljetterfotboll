export interface CityBenchmark {
  cityName: string;
  flightEstimateSEK: number; // Schablon tur/retur från Sverige
  hotelPerNightSEK: number;  // Medelklasshotell per rum/natt
  transitSEK: number;        // Lokaltrafik/taxi flygplats & arena
}

export const CITY_BENCHMARKS: Record<string, CityBenchmark> = {
  "london": {
    cityName: "London",
    flightEstimateSEK: 1200,
    hotelPerNightSEK: 1600,
    transitSEK: 450,
  },
  "madrid": {
    cityName: "Madrid",
    flightEstimateSEK: 1400,
    hotelPerNightSEK: 1100,
    transitSEK: 300,
  },
  "barcelona": {
    cityName: "Barcelona",
    flightEstimateSEK: 1300,
    hotelPerNightSEK: 1200,
    transitSEK: 300,
  },
  "manchester": {
    cityName: "Manchester",
    flightEstimateSEK: 1500,
    hotelPerNightSEK: 1300,
    transitSEK: 350,
  },
  "milano": {
    cityName: "Milano",
    flightEstimateSEK: 1300,
    hotelPerNightSEK: 1400,
    transitSEK: 350,
  },
  "paris": {
    cityName: "Paris",
    flightEstimateSEK: 1400,
    hotelPerNightSEK: 1700,
    transitSEK: 400,
  },
  "münchen": {
    cityName: "München",
    flightEstimateSEK: 1600,
    hotelPerNightSEK: 1300,
    transitSEK: 350,
  },
  "dortmund": {
    cityName: "Dortmund",
    flightEstimateSEK: 1200, // Ofta flyg till Düsseldorf/Köln
    hotelPerNightSEK: 1000,
    transitSEK: 300,
  },
  // Standardvärden om staden saknas i listan ovan
  "default": {
    cityName: "Europa",
    flightEstimateSEK: 1400,
    hotelPerNightSEK: 1300,
    transitSEK: 350,
  },
};

/**
 * Hjälpfunktion för att hämta benchmark baserat på stad.
 * Hanterar även gemener/versaler och trimning av mellanslag.
 */
export function getCityBenchmark(cityInput?: string): CityBenchmark {
  if (!cityInput) return CITY_BENCHMARKS["default"];
  
  // Rensa stadsnamnet (t.ex. "London, Storbritannien" -> "london")
  const cleanCity = cityInput.split(",")[0].trim().toLowerCase();
  
  return CITY_BENCHMARKS[cleanCity] || CITY_BENCHMARKS["default"];
}