import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import path from "path";
import fs from "fs";

// Define styles for the QR code section
const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    marginBottom: 30,
    alignItems: "center",
  },
  qrCode: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  scanText: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: "Catamaran",
  },
  urlText: {
    fontSize: 10,
    textAlign: "center",
    fontFamily: "Catamaran",
    fontWeight: 600,
  },
});

interface QrCodeSectionProps {
  slug: string;
}

/**
 * Component displaying the QR code and scan instructions
 */
export const QrCodeSection: React.FC<QrCodeSectionProps> = ({ slug }) => {
  // QR Code URL
  const qrCodeBaseUrl = process.env.NEXT_PUBLIC_QR_BASE_URL || "https://svf.li/";
  const qrCodeBasePath = process.env.NEXT_PUBLIC_QR_CODE_BASE_PATH || "q/";
  const qrCodeUrl = qrCodeBaseUrl + qrCodeBasePath + slug;
  
  // For PDF generation in React-PDF, we need to use a synchronous operation
  // So we'll use a logo image instead of async QR code generation
  let logoBase64 = "";
  try {
    const logoPath = path.join(process.cwd(), "public", "Schafe-vorm-Fenster-UG_Logo.png");
    logoBase64 = fs.readFileSync(logoPath).toString("base64");
  } catch (error) {
    console.error("Failed to load logo:", error);
  }
  
  return (
    <View style={styles.container}>
      {logoBase64 && (
        <Image 
          src={`data:image/png;base64,${logoBase64}`} 
          style={styles.qrCode}
        />
      )}
      <Text style={styles.scanText}>QR-Code scannen und alle Termine sehen</Text>
      <Text style={styles.urlText}>{qrCodeUrl}</Text>
    </View>
  );
};
