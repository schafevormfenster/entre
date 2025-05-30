import React from "react";
import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";
import { Event } from "../types";
import { Header } from "./Header";
import { CommunityName } from "./CommunityName";
import { SmartphoneContent } from "./SmartphoneContent";
import { PartnerLogo } from "./PartnerLogo";
import { QrCodeSection } from "./QrCodeSection";
import { InformationText } from "./InformationText";
import { PRIMARY_FONT } from "./fonts"; // Import fonts configuration

// Define styles for the document
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 60,
    paddingTop: 20,
    paddingBottom: 10,
    fontFamily: PRIMARY_FONT,
  },
  topRow: {
    flexDirection: "row",
    height: "12%",
    marginBottom: 0,
  },
  topRowLeft: {
    flex: 1,
    paddingTop: 14,
  },
  topRowRight: {
    width: 120, // Fixed width for the partner logo
    alignItems: "flex-end",
  },
  communityRow: {
    height: "28%",
    marginTop: -10,
  },
  mainContent: {
    flexDirection: "row",
    flex: 1,
    maxHeight: "57%", // 2/3 of the page
  },
  leftColumn: {
    width: "53%",
    marginRight: 25,
  },
  rightColumn: {
    width: "40%",
  },
});

export interface CommunityProps {
  community: string;
  slug: string;
}

interface ShowcasePosterDocumentProps extends CommunityProps {
  events: Event[];
}

/**
 * The main component for the showcase poster PDF document
 */
export const ShowcasePosterDocument: React.FC<ShowcasePosterDocumentProps> = ({
  community,
  slug,
  events,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Row with Header, Community Name and Partner Logo */}
        <View style={styles.topRow}>
          <View style={styles.topRowLeft}>
            <Header />
          </View>
          <View style={styles.topRowRight}>
            <PartnerLogo />
          </View>
        </View>
        <View style={styles.communityRow}>
          <CommunityName name={community} />
        </View>

        {/* Main Content - Two Columns */}
        <View style={styles.mainContent}>
          {/* Left column with smartphone */}
          <View style={styles.leftColumn}>
            <SmartphoneContent
              events={events}
              slug={slug}
              community={community}
            />
          </View>

          {/* Right column with QR code and information */}
          <View style={styles.rightColumn}>
            <QrCodeSection slug={slug} community={community} />
            <InformationText slug={slug} community={community} />
          </View>
        </View>
      </Page>
    </Document>
  );
};
