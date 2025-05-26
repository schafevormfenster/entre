import { NextRequest, NextResponse } from "next/server";
import { generatePDF } from "./pdf-generator";
import { getGeoLocation } from "../../../../clients/geo-api/get-geo-location";
import { GeoLocation } from "../../../../clients/geo-api/types/geo-location.types";
import { getEventsByCommunity } from "../../../../clients/sanity/get-events-by-community";


export const dynamic = "force-dynamic";

// Handle GET request to generate PDF
export async function GET(
  request: NextRequest
) {

  console.log("Generating PDF...");

  try {
    // Get community name and slug from query parameters
    const searchParams = request.nextUrl.searchParams;
    const slug: string = searchParams.get("slug") || "default";


    //  get community name by slug from geo api
    const community: GeoLocation | null = await getGeoLocation(slug);
    if (!community) {
      console.error(`Community with slug "${slug}" not found.`);
      throw new Error(`Community with slug "${slug}" not found.`);
    }
    // Get events from sanity using the new function
    console.log(`Generating PDF for community: ${community.name} (slug: ${slug})`);

    // Fetch real events from Sanity
    const events = await getEventsByCommunity(slug);

    // Generate PDF as buffer
    const pdfBuffer = await generatePDF({
      community: community.name as string,
      slug,
      events,
    });

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="showcase-poster-${slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate PDF" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

// Function to generate sample events for demonstration
function generateSampleEvents() {
  return [
    {
      date: "2025-05-15",
      time: "19:00",
      title: "Dorfmusik-Probe",
      location: "Gemeindehaus",
    },
    {
      date: "2025-05-18",
      time: "10:00",
      title: "Sonntags-Brunch",
      location: "Dorfcafé",
    },
    {
      date: "2025-05-20",
      time: "15:30",
      title: "Seniorennachmittag",
      location: "Gemeindehaus",
    },
    {
      date: "2025-05-25",
      title: "Gelber Sack",
      location: "Dorfplatz",
    },
    {
      date: "2025-06-01",
      time: "09:00",
      title: "Freiwilliger Arbeitseinsatz",
      location: "Treffpunkt Feuerwehrhaus",
    },
    {
      date: "2025-06-05",
      time: "18:00",
      title: "Kinoabend im Gemeindehaus",
      location: "Gemeindehaus",
    },
    {
      date: "2025-06-10",
      time: "20:00",
      title: "Bürgerforum - Ideen für die Zukunft",
      location: "Dorfgemeinschaftshaus",
    },
    {
      date: "2025-06-15",
      time: "14:00",
      title: "Flohmarkt auf dem Dorfplatz",
      location: "Dorfplatz",
    },
  ];
}
