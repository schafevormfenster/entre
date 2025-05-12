import React from "react";
import { Document, Page, StyleSheet, Font, View } from "@react-pdf/renderer";
import { Event } from "../types";
import { Header } from "./Header";
import { CommunityName } from "./CommunityName";
import { SmartphoneContent } from "./SmartphoneContent";
import { PartnerLogo } from "./PartnerLogo";
import { QrCodeSection } from "./QrCodeSection";
import { InformationText } from "./InformationText";


// Register fonts
Font.register({
  family: "Catamaran",
  fonts: [
    { src: "https://fonts.gstatic.com/s/catamaran/v18/o-0IIpQoyXQa2RxT7-5r8zRAW_0.ttf", fontWeight: 300 }, // Light
    { src: "https://fonts.gstatic.com/s/catamaran/v18/o-0IIpQoyXQa2RxT7-5r6zRAW_0.ttf", fontWeight: 400 }, // Regular
    { src: "https://fonts.gstatic.com/s/catamaran/v18/o-0IIpQoyXQa2RxT7-5r5zRAW_0.ttf", fontWeight: 500 }, // Medium
    { src: "https://fonts.gstatic.com/s/catamaran/v18/o-0IIpQoyXQa2RxT7-5r4zRAW_0.ttf", fontWeight: 600 }, // SemiBold
  ],
});

Font.register({
  family: "Courier New",
  src: "https://fonts.gstatic.com/s/courierprime/v9/u-450q2lgwslOqpF_6gQ8kELawRpX837pvjxPA.ttf"
});

// Define styles for the document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 30,
    fontFamily: "Catamaran",
  },
  leftColumn: {
    width: "65%",
    paddingRight: 15,
  },
  rightColumn: {
    width: "35%",
    position: "absolute",
    right: 30,
    top: 30,
    bottom: 30,
  },
  container: {
    flexDirection: "row",
    flex: 1,
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
        <View style={styles.container}>
          {/* Left column */}
          <View style={styles.leftColumn}>
            <Header />
            <CommunityName name={communityName} />
            <SmartphoneContent events={events} />
          </View>

          {/* Right column */}
          <View style={styles.rightColumn}>
            <PartnerLogo />
            <QrCodeSection slug={slug} />
            <InformationText />
          </View>
        </View>
      </Page>
    </Document>
  );
};
