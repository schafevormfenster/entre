import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { CommunityProps } from "./ShowcasePosterDocument";
import { PRIMARY_FONT } from "./fonts";

// Define styles for the information text section
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingLeft: 3,
  },
  heading: {
    fontSize: 15,
    marginBottom: 5,
    fontFamily: PRIMARY_FONT,
    fontWeight: 500,
    lineHeight: 1.3
  },
  text: {
    fontSize: 11,
    marginBottom: 8,
    fontFamily: PRIMARY_FONT,
    hyphens: "none",
    lineHeight: 1.3
  },
});

/**
 * Component displaying the information text section
 */
export const InformationText: React.FC<CommunityProps> = ({ community }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deine Termine fehlen?</Text>

      <Text style={styles.heading}>
        Mach&apos; das Dorfleben sichtbar.{"\n"}
        So erfährt jeder was wann wo {"\n"}
        in {community} los ist.{"\n"}
      </Text>

      <Text style={styles.text}>
        {"\n"}So einfach geht&apos;s:{"\n"}
      </Text>
      <Text style={styles.text}>
        Schreibe deine Termine in einen Google {"\n"}Kalender. Melde dich
        einmalig an. Und deine Termine erscheinen immer aktuell {"\n"}in deinem
        Dorfkalender.{"\n"}
        {"\n\n"}
      </Text>

      <Text style={styles.text}>Mehr Infos:</Text>
      <Text style={styles.text}>
        www.schafe-vorm-fenster.de{"\n"}
        0156.78204630{"\n"}
        jan@schafe-vorm-fenster.de
      </Text>
    </View>
  );
};
