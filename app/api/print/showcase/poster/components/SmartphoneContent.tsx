import React from "react";
import { View, StyleSheet, Image, Text } from "@react-pdf/renderer";
import path from "path";
import fs from "fs";
import { Event } from "../types";
import { formatEventDate } from "../utils";


// Define styles for the smartphone content
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 300,
    height: 345,
    marginTop: 30,
  },
  smartphone: {
    width: "100%",
    height: "100%",
  },
  header: {
    position: "absolute",
    top: 33,
    left: 55,
    right: 55,
    height: 25,
    backgroundColor: "#ffffff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLogo: {
    width: 15,
    height: 15,
  },
  headerText: {
    fontSize: 8,
    fontFamily: "Catamaran",
  },
  content: {
    position: "absolute",
    top: 58,
    left: 55,
    right: 55,
    bottom: 35,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  eventItem: {
    marginBottom: 12,
  },
  dateText: {
    fontSize: 10,
    fontFamily: "Catamaran",
    fontWeight: 600,
    marginBottom: 2,
  },
  eventTitle: {
    fontSize: 12,
    fontFamily: "Catamaran",
    fontWeight: 600,
  },
  eventDetails: {
    fontSize: 10,
    fontFamily: "Catamaran",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 6,
  },
});

interface SmartphoneContentProps {
  events: Event[];
}

/**
 * Component displaying the smartphone mockup with events
 */
export const SmartphoneContent: React.FC<SmartphoneContentProps> = ({ events }) => {
  // Load smartphone SVG
  const svgPath = path.join(
    process.cwd(),
    "app",
    "api",
    "print",
    "showcase",
    "poster",
    "description",
    "smartphone-canvas.svg"
  );
  
  let svgContent = "";
  let logoBase64 = "";
  
  try {
    svgContent = fs.readFileSync(svgPath).toString("base64");
    
    // Load logo
    const logoPath = path.join(process.cwd(), "public", "Schafe-vorm-Fenster-UG_Logo.png");
    logoBase64 = fs.readFileSync(logoPath).toString("base64");
  } catch (error) {
    console.error("Error loading images:", error);
  }

  return (
    <View style={styles.container}>
      {/* Smartphone frame */}
      {svgContent && (
        <Image 
          src={`data:image/svg+xml;base64,${svgContent}`}
          style={styles.smartphone}
        />
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>www.schafe-vorm-fenster.de</Text>
        {logoBase64 && (
          <Image
            src={`data:image/png;base64,${logoBase64}`}
            style={styles.headerLogo}
          />
        )}
      </View>
      
      {/* Content - Event List */}
      <View style={styles.content}>
        {events.map((event, index) => (
          <View key={`event-${index}`} style={styles.eventItem}>
            <Text style={styles.dateText}>
              {formatEventDate(event.date)} | {event.time} Uhr
            </Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventDetails}>{event.location}</Text>
            {index < events.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </View>
  );
};
