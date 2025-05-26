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
  const startTime = Date.now();

  try {
    // Get community name and slug from query parameters
    const searchParams = request.nextUrl.searchParams;
    const slug: string = searchParams.get("slug") || "default";

    // Fetch community and events in parallel for better performance
    console.log(`Fetching data for slug: ${slug}`);
    const [community, events] = await Promise.all([
      getGeoLocation(slug),
      getEventsByCommunity(slug)
    ]);

    if (!community) {
      console.error(`Community with slug "${slug}" not found.`);
      throw new Error(`Community with slug "${slug}" not found.`);
    }

    console.log(`Data fetched in ${Date.now() - startTime}ms`);
    console.log(`Generating PDF for community: ${community.name} (slug: ${slug})`);

    // Generate PDF as buffer
    const pdfStartTime = Date.now();
    const pdfBuffer = await generatePDF({
      community: community.name as string,
      slug,
      events,
    });
    
    console.log(`PDF generated in ${Date.now() - pdfStartTime}ms`);
    console.log(`Total processing time: ${Date.now() - startTime}ms`);

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="showcase-poster-${slug}.pdf"`,
        "Cache-Control": "public, max-age=300", // Cache for 5 minutes
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

