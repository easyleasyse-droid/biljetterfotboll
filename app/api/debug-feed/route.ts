import { NextResponse } from "next/server";
import { getAwinData } from "@/lib/awinFeed";

export async function GET() {
  const rows = await getAwinData();
  
  // Sök ut alla rader som innehåller Betis eller Liverpool för att granska dem
  const sample = rows.filter(r => 
    r.productName.toLowerCase().includes("betis") || 
    r.productName.toLowerCase().includes("liverpool")
  );

  return NextResponse.json(sample.slice(0, 20));
}