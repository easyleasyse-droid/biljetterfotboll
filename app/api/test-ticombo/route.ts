import { NextResponse } from "next/server";
import { fetchTicomboFeedRows } from "@/lib/ticomboFeed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await fetchTicomboFeedRows();

    return NextResponse.json({
      success: true,
      totalRows: rows.length,
      sampleRows: rows.slice(0, 5), // Visar de 5 första raderna direkt
      firstRowKeys: rows.length > 0 ? Object.keys(rows[0]) : [],
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Kunde inte hämta Ticombo-feeden",
      },
      { status: 500 }
    );
  }
}