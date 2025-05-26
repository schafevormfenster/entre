/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import QrCode from "./qr-code";
import { CommunityProps } from "./ShowcasePosterDocument";

// Define styles for the QR code section
const styles = StyleSheet.create({
  container : {
    marginBottom: 20,

  },
  qrcontainer: {
    marginTop: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  qrCode: {
    width: 70,
    height: 70,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 5,
  },
  scanText: {
    fontSize: 10,
    textAlign: "left",
    fontFamily: "Catamaran",
    paddingLeft: 3,
    marginTop:2,
    lineHeight: 1.3
  },
});

/**
 * Component displaying the QR code and scan instructions
 */
export const QrCodeSection: React.FC<CommunityProps> = ({
  slug,
  community,
}) => {
  // QR Code URL
  const qrCodeBaseUrl =
    process.env.NEXT_PUBLIC_QR_BASE_URL || "https://svf.li/";
  const qrCodeBasePath = process.env.NEXT_PUBLIC_QR_CODE_BASE_PATH || "s/";
  const qrCodeUrl = qrCodeBaseUrl + qrCodeBasePath + slug;
  const webBaseUrl =
    process.env.NEXT_PUBLIC_WEB_BASE_URL || "https://schafe-vorm-fenster.de/";

  return (
    <View style={styles.container}>
      <View style={styles.qrcontainer}>
        <QrCode url={qrCodeUrl} size={100} />
        <View style={styles.textContainer}>
          <Text style={styles.scanText}>
            Hol&apos; dir den Kalender für {community} auf dein Handy.
          </Text>
        </View>
      </View>
      {/* <Text style={styles.scanText}>{webBaseUrl + slug}</Text> */}
    </View>
  );
};
