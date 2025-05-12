import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

// Define styles for the community name
const styles = StyleSheet.create({
  communityName: {
    fontFamily: "Catamaran",
    fontWeight: 600,
    marginBottom: 30,
  },
  shortName: {
    fontSize: 48,
  },
  longName: {
    fontSize: 36,
  },
});

interface CommunityNameProps {
  name: string;
}

/**
 * Component displaying the community name with dynamic font sizing
 */
export const CommunityName: React.FC<CommunityNameProps> = ({ name }) => {
  // Determine if we should use the smaller font size
  // Use smaller font size for names longer than 12 characters or containing spaces
  const isLongName = name.length > 12 || name.includes(' ');
  
  return (
    <Text style={[
      styles.communityName,
      isLongName ? styles.longName : styles.shortName
    ]}>
      {name}
    </Text>
  );
};
