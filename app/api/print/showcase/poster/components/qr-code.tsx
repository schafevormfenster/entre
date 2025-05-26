import { View, Image } from "@react-pdf/renderer";
import { error } from "console";
import path from "path";

interface QrCodeProps {
  url: string;
  size?: number;
}

// Pre-generate a QR code image
const generateQRCodeSync = (url: string) => {
  // We need to generate QR codes synchronously for React PDF
  try {
    // Generate a temporary file path for our QR code
    const tempFilePath = path.join(process.cwd(), "temp-qr-code.png");
    
    // Use the canvas library to generate a QR code synchronously
    const { createCanvas } = require("canvas");
    const QRCode = require("qrcode");
    
    // Create a canvas and render the QR code
    const canvas = createCanvas(200, 200);
    QRCode.toCanvas(canvas, url, {
      width: 200,
      margin: 1,
      color: { dark: '#000000', light: '#ffffff' },
      errorCorrectionLevel: 'Q',
    });
    
    // Convert the canvas to a data URL
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Failed to generate QR code:", error);
    throw new Error("QR code generation failed");
  }
};

// Sync component for React PDF
export default function QrCode({ url, size = 70 }: QrCodeProps) {
  // Generate QR code synchronously
  const qrImageUrl = generateQRCodeSync(url);
  
  return (
    <View style={{ width: size, height: size, position: 'relative' }}>
      <Image src={qrImageUrl} style={{ width: size, height: size }} />
    </View>
  );
}