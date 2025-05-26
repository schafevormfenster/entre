import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { CommunityProps, ShowcasePosterDocument } from "./components/ShowcasePosterDocument";
import { Event } from "./types";


interface GeneratePDFProps extends CommunityProps {
  events: Event[];
}

/**
 * Generates a PDF buffer for the showcase poster
 * @param props - The properties needed for PDF generation
 * @returns A Promise that resolves to a Buffer containing the PDF
 */
export async function generatePDF(props: GeneratePDFProps): Promise<Buffer> {
  const { community, slug, events } = props;

  // Create the PDF document
  const pdfDocument = <ShowcasePosterDocument 
    community={community} 
    slug={slug} 
    events={events as Event[]} 
  />;

  // Render the document to a buffer
  return renderToBuffer(pdfDocument);
}
