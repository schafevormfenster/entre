import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";
import { PRIMARY_FONT } from "./fonts";

// Define styles for the header
const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    paddingTop:35,
    marginBottom: -7,
    fontFamily: PRIMARY_FONT,
    fontWeight: 500,
  },
});

/**
 * Component displaying the header "Was ist los in"
 */
export const Header: React.FC = () => (
  <Text style={styles.header}>Was ist los in</Text>
);
