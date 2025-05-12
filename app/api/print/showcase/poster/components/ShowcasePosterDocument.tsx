import React from "react";
import { Document, Page, StyleSheet, Font, View } from "@react-pdf/renderer";
import { Event } from "../types";
import { Header } from "./Header";
import { CommunityName } from "./CommunityName";
import { SmartphoneContent } from "./SmartphoneContent";
import { PartnerLogo } from "./PartnerLogo";
import { QrCodeSection } from "./QrCodeSection";
import { InformationText } from "./InformationText";
import path from "path"; // Add path import for file resolution

// Register fonts with local paths
Font.register({
  family: "Catamaran",
  fonts: [
    { src: path.join(process.cwd(), "node_modules/@fontsource/catamaran/files/catamaran-latin-400-normal.woff"), fontWeight: 400 }, // Regular
    { src: path.join(process.cwd(), "node_modules/@fontsource/catamaran/files/catamaran-latin-600-normal.woff"), fontWeight: 600 }, // SemiBold
  ],
});

// Use standard fonts for Courier New
Font.register({
  family: "Courier New",
  src: path.join(process.cwd(), "public/fonts/courier-new.ttf")
});

// Define styles for the document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 50,
    paddingBottom: 10,
    fontFamily: "Catamaran",
    
  },
  topRow: {
    flexDirection: "row",
    height: "28%", // 1/3 of the page
    marginBottom: 20,
  },
  topRowLeft: {
    flex: 1,
    paddingRight: 15,
  },
  topRowRight: {
    width: 120, // Fixed width for the partner logo
    alignItems: "flex-end",
  },
  mainContent: {
    flexDirection: "row",
    flex: 1,
    maxHeight: "66%", // 2/3 of the page
  },
  leftColumn: {
    width: "60%",
    paddingRight: 15,
    
  },
  rightColumn: {
    width: "40%",
    
  },
});

interface ShowcasePosterDocumentProps {
  communityName: string;
  slug: string;
  events: Event[];
}

/**
 * The main component for the showcase poster PDF document
 */
export const ShowcasePosterDocument: React.FC<ShowcasePosterDocumentProps> = ({ 
  communityName, 
  slug, 
  events 
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Row with Header, Community Name and Partner Logo */}
        <View style={styles.topRow}>
          <View style={styles.topRowLeft}>
            <Header />
            <CommunityName name={communityName} />
          </View>
          <View style={styles.topRowRight}>
            <PartnerLogo />
          </View>
        </View>
        
        {/* Main Content - Two Columns */}
        <View style={styles.mainContent}>
          {/* Left column with smartphone */}
          <View style={styles.leftColumn}>
            <SmartphoneContent events={events} />
          </View>

          {/* Right column with QR code and information */}
          <View style={styles.rightColumn}>
            <QrCodeSection slug={slug} />
            <InformationText />
          </View>
        </View>
      </Page>
    </Document>
  );
};
