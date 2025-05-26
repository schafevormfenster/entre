/* eslint-disable @next/next/no-img-element, jsx-a11y/alt-text */
import React from "react";
import { View, StyleSheet, Image, Text, Svg, Path } from "@react-pdf/renderer";
import path from "path";
import fs from "fs";
import { Event } from "../types";
import {
  formatEventDate,
  getWeekday,
  getDayNumber,
  getMonthName,
} from "../utils";
import { CommunityProps } from "./ShowcasePosterDocument";

// Define styles for the smartphone content
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 260,
    height: 545,
    marginTop: 0,
  },
  smartphone: {
    width: "95%",
    height: "100%",
  },
  content: {
    position: "absolute",
    top: 18,
    left: 25,
    right: 37,
    bottom: 12,
    backgroundColor: "#ffffff",
    padding: 0,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
  },
  header: {
    height: 55,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    paddingVertical: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLogo: {
    marginTop: 5,
    marginBottom: -2,
    width: 32,
    height: 32,
  },
  headerText: {
    fontSize: 8,
    fontFamily: "Catamaran",
  },
  eventItem: {
    marginBottom: 15,
    flexDirection: "row",
  },
  eventDate: {
    flexDirection: "column",
    width: 25,
    marginRight: 10,
    paddingTop: 1,
  },
  dateMini: {
    textAlign: "center",
    fontSize: 7,
    lineHeight: 0.8,
    fontFamily: "Catamaran",
  },

  dateText: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 1.1,
    fontFamily: "Catamaran",
    fontWeight: 700,
    marginBottom: 2,
  },
  eventDetails: {
    flexDirection: "column",
    fontSize: 10,
    fontFamily: "Catamaran",
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: "Catamaran",
    fontWeight: 500,
    width: "160",
    lineHeight: 1.2,
    marginTop: -2,
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 6,
  },
  icon: {
    width: 9,
    height: 9,
    marginRight: 3,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    width: "160",
    overflow: "hidden",
  },
});

/**
 * Simple icon component that renders SVG paths
 */
const Icon: React.FC<{
  path: string;
  viewBox?: string;
  style?: any;
}> = ({ path, viewBox = "0 0 512 512", style = {} }) => (
  <Svg viewBox={viewBox} style={[styles.icon, style]}>
    <Path d={path} fill="#666666" />
  </Svg>
);

// Font Awesome icon paths
const ICONS = {
  // Clock icon (fa-clock)
  clock:
    "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z",
  // Location/map-marker icon (fa-map-marker-alt)
  location:
    "M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z",
};

interface SmartphoneContentProps extends CommunityProps {
  events: Event[];
}

/**
 * Component displaying the smartphone mockup with events
 */
export const SmartphoneContent: React.FC<SmartphoneContentProps> = ({
  events,
  slug,
}) => {
  // Load smartphone PNG for better PDF compatibility
  const smartphonePath = path.join(
    process.cwd(),
    "app",
    "api",
    "print",
    "showcase",
    "poster",
    "description",
    "smartphone-canvas.png"
  );

  let phoneImageBase64 = "";
  let logoBase64 = "";

  try {
    phoneImageBase64 = fs.readFileSync(smartphonePath).toString("base64");

    // Load logo
    const logoPath = path.join(
      process.cwd(),
      "public",
      "Schafe-vorm-Fenster-UG_Logo.png"
    );
    logoBase64 = fs.readFileSync(logoPath).toString("base64");
  } catch (error) {
    console.error("Error loading images:", error);
  }

  return (
    <View style={styles.container}>
      {/* Smartphone frame */}
      {phoneImageBase64 && (
        <Image
          src={`data:image/png;base64,${phoneImageBase64}`}
          style={styles.smartphone}
        />
      )}

      {/* Content - Event List */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {logoBase64 && (
            <Image
              src={`data:image/png;base64,${logoBase64}`}
              style={styles.headerLogo}
            />
          )}
          <Text style={styles.headerText}>
            https://schafe-vorm-fenster.de/{slug}
          </Text>
        </View>
        {events.map((event, index) => (
          <View key={`event-${index}`} style={styles.eventItem}>
            <View style={styles.eventDate}>
              <Text style={styles.dateMini}>{getWeekday(event.date)}</Text>
              <Text style={styles.dateText}>{getDayNumber(event.date)}</Text>
              <Text style={styles.dateMini}>{getMonthName(event.date)}</Text>
            </View>
            <View style={styles.eventDetails}>
              <View style={styles.infoRow}>
                {event.time && (
                  <>
                    <Icon path={ICONS.clock} />
                    <Text style={{ marginRight: 10 }}>{event.time} Uhr</Text>
                  </>
                )}
                <Icon path={ICONS.location} />
                <Text>{event.location}</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
