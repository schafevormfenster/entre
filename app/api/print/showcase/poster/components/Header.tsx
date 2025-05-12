import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

// Define styles for the header
const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    marginBottom: 10,
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
