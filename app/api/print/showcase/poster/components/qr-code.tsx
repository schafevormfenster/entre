import { View, Image } from "@react-pdf/renderer";

interface QrCodeProps {
  url: string;
  size?: number;
}

// Generate a QR code as data URL synchronously using qr-image
const generateQRCodeSync = (url: string) => {
  try {
    const qrImage = require("qr-image");
    
    // Generate QR code as PNG buffer synchronously
    const qrPng = qrImage.imageSync(url, {
      type: 'png',
      size: 10,
      margin: 1,
      'parse_url': false
    });
    
    // Convert buffer to data URL
    const base64 = qrPng.toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;
    
    return dataUrl;
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