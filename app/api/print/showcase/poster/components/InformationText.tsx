import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

// Define styles for the information text section
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
        

  },
  heading: {
    fontSize: 14,
    marginBottom: 5,
    fontFamily: "Catamaran",
    fontWeight: 600,
  },
  subheading: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 3,
    fontFamily: "Catamaran",
    fontWeight: 500,
  },
  text: {
    fontSize: 10,
    marginBottom: 8,
    fontFamily: "Catamaran",
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 0,
    fontFamily: "Catamaran",
  },
});

/**
 * Component displaying the information text section
 */
export const InformationText: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Deine Termine fehlen?</Text>
      <Text style={styles.text}>
        Trag deine Veranstaltung einfach ins digitale Schafe vorm Fenster-Dorfleben ein.
      </Text>

      <Text style={styles.heading}>Mach&apos; das Dorfleben sichtbar.</Text>
      <Text style={styles.text}>
        Nutze die Online-Plattform Schafe vorm Fenster für alle Termine, Treffpunkte und Vereine in deinem Ort.
      </Text>

      <Text style={styles.subheading}>So einfach geht es:</Text>
      <Text style={styles.text}>
        1. Melde dich kostenlos an{"\n"}
        2. Erstelle deinen Termin{"\n"}
        3. Fertig - dein Termin erscheint automatisch auf dieser Liste
      </Text>

      <Text style={styles.subheading}>Mehr Infos:</Text>
      <Text style={styles.contactInfo}>www.schafe-vorm-fenster.de</Text>
      <Text style={styles.contactInfo}>Telefon: 03831 / 293 381</Text>
      <Text style={styles.contactInfo}>info@schafe-vorm-fenster.de</Text>
    </View>
  );
};
