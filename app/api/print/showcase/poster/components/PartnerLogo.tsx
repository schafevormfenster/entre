/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import path from "path";
import fs from "fs";

// Define styles for the partner logo section
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
  },
  kooperationText: {
    fontSize: 8,
    marginBottom: 5,
    fontFamily: "Catamaran",
  },
  logoContainer: {
    width: 120,
  },
  logo: {
    width: "100%",
    height: 30,
    objectFit: "contain",
  },
});

/**
 * Component displaying the partner logo and cooperation text
 */
export const PartnerLogo: React.FC = () => {
  // Use the Kulturlandbüro PNG logo for better PDF compatibility
  let logoBase64 = "";
  try {
    // Load the kulturlandbüro logo PNG file
    const logoPath = path.join(
      process.cwd(),
      "app",
      "api",
      "print",
      "showcase",
      "poster",
      "description",
      "logo-kulturlandbüro.png"
    );
    logoBase64 = fs.readFileSync(logoPath).toString("base64");
  } catch (error) {
    console.error("Failed to load partner logo:", error);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.kooperationText}>in Kooperation mit dem</Text>
      <View style={styles.logoContainer}>
        {logoBase64 && (
          <Image
            src={`data:image/png;base64,${logoBase64}`}
            style={styles.logo}
          />
        )}
      </View>
    </View>
  );
};
