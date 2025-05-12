import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import path from "path";
import fs from "fs";

// Define styles for the partner logo section
const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    marginBottom: 30,
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
  // Load kulturlandbüro logo
  const logoPath = path.join(
    process.cwd(),
    "app",
    "api",
    "print",
    "showcase",
    "poster",
    "description",
    "logo-kulturlandbüro.svg"
  );
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");

  return (
    <View style={styles.container}>
      <Text style={styles.kooperationText}>in Kooperation mit dem</Text>
      <View style={styles.logoContainer}>
        <Image
          src={`data:image/svg+xml;base64,${logoBase64}`}
          style={styles.logo}
        />
      </View>
    </View>
  );
};
