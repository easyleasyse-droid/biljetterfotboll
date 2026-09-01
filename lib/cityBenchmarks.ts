export interface CityBenchmark {
  cityName: string;
  flightEstimateSEK: number;
  hotelPerNightSEK: number;
  transitSEK: number;
}

export const CITY_BENCHMARKS: Record<string, CityBenchmark> = {
  // Spanien
  madrid: {
    cityName: "Madrid",
    flightEstimateSEK: 3200, // Direkt/smidig mellanlandning helg
    hotelPerNightSEK: 2200,
    transitSEK: 450,
  },
  barcelona: {
    cityName: "Barcelona",
    flightEstimateSEK: 2800,
    hotelPerNightSEK: 2100,
    transitSEK: 400,
  },
  sevilla: {
    cityName: "Sevilla",
    flightEstimateSEK: 3500,
    hotelPerNightSEK: 1800,
    transitSEK: 350,
  },

  // England
  london: {
    cityName: "London",
    flightEstimateSEK: 2400,
    hotelPerNightSEK: 2500,
    transitSEK: 600, // Express-tåg / Underground
  },
  manchester: {
    cityName: "Manchester",
    flightEstimateSEK: 2900,
    hotelPerNightSEK: 2000,
    transitSEK: 400,
  },
  liverpool: {
    cityName: "Liverpool",
    flightEstimateSEK: 3100,
    hotelPerNightSEK: 2100,
    transitSEK: 400,
  },
  birmingham: {
    cityName: "Birmingham",
    flightEstimateSEK: 2800,
    hotelPerNightSEK: 1700,
    transitSEK: 350,
  },

  // Italien
  milano: {
    cityName: "Milano",
    flightEstimateSEK: 2500,
    hotelPerNightSEK: 2200,
    transitSEK: 450,
  },
  milan: {
    cityName: "Milano",
    flightEstimateSEK: 2500,
    hotelPerNightSEK: 2200,
    transitSEK: 450,
  },
  rom: {
    cityName: "Rom",
    flightEstimateSEK: 2700,
    hotelPerNightSEK: 2000,
    transitSEK: 400,
  },
  roma: {
    cityName: "Rom",
    flightEstimateSEK: 2700,
    hotelPerNightSEK: 2000,
    transitSEK: 400,
  },
  neapel: {
    cityName: "Neapel",
    flightEstimateSEK: 3200,
    hotelPerNightSEK: 1600,
    transitSEK: 350,
  },
  napoli: {
    cityName: "Neapel",
    flightEstimateSEK: 3200,
    hotelPerNightSEK: 1600,
    transitSEK: 350,
  },
  turin: {
    cityName: "Turin",
    flightEstimateSEK: 3000,
    hotelPerNightSEK: 1700,
    transitSEK: 350,
  },

  // Tyskland
  münchen: {
    cityName: "München",
    flightEstimateSEK: 2600,
    hotelPerNightSEK: 2300,
    transitSEK: 400,
  },
  munich: {
    cityName: "München",
    flightEstimateSEK: 2600,
    hotelPerNightSEK: 2300,
    transitSEK: 400,
  },
  dortmund: {
    cityName: "Dortmund",
    flightEstimateSEK: 2400, // Ofta flyg till Düsseldorf
    hotelPerNightSEK: 1700,
    transitSEK: 450,
  },
  berlin: {
    cityName: "Berlin",
    flightEstimateSEK: 2100,
    hotelPerNightSEK: 1800,
    transitSEK: 350,
  },

  // Frankrike & Övriga Europa
  paris: {
    cityName: "Paris",
    flightEstimateSEK: 2600,
    hotelPerNightSEK: 2400,
    transitSEK: 500,
  },
  amsterdam: {
    cityName: "Amsterdam",
    flightEstimateSEK: 2200,
    hotelPerNightSEK: 2500,
    transitSEK: 400,
  },
  lissabon: {
    cityName: "Lissabon",
    flightEstimateSEK: 3100,
    hotelPerNightSEK: 1800,
    transitSEK: 350,
  },
};

// Fallback om staden saknas i listan
export const DEFAULT_BENCHMARK: CityBenchmark = {
  cityName: "Europa",
  flightEstimateSEK: 2800,
  hotelPerNightSEK: 1900,
  transitSEK: 400,
};

export function getCityBenchmark(cityName: string): CityBenchmark {
  if (!cityName) return DEFAULT_BENCHMARK;
  const key = cityName.toLowerCase().trim();
  return CITY_BENCHMARKS[key] || DEFAULT_BENCHMARK;
}