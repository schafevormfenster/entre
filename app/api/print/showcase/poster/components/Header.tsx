import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

// Define styles for the header
const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    marginBottom: 0,
    fontFamily: "Catamaran",
    fontWeight: 500,
  },
});

/**
 * Component displaying the header "Was ist los in"
 */
export const Header: React.FC = () => (
  <Text style={styles.header}>Was ist los in</Text>
);
