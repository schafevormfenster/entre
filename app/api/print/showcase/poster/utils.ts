import { createCanvas } from "canvas";
import QRCode from "qrcode";

/**
 * Formats an ISO date string (YYYY-MM-DD) to a readable German format (DD.MM.YYYY)
 * @param dateStr - ISO format date string
 * @returns Formatted date string
 */
export function formatEventDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    console.error("Invalid date format:", dateStr);
    return dateStr;
  }
}

/**
 * Generates a QR code as a data URL
 * @param url - The URL to encode in the QR code
 * @returns A data URL representing the QR code image
 */
export async function generateQRCode(url: string): Promise<string> {
  try {
    const canvas = createCanvas(200, 200);
    await QRCode.toCanvas(canvas, url, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      }
    });
    
    return canvas.toDataURL();
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw error;
  }
}
