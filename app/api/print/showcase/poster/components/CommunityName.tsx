import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

// Disable the ESLint rule '@next/next/no-html-link-for-pages' for this file as it's not a Next.js page component.

/* eslint-disable @next/next/no-html-link-for-pages */

// Define styles for the community name
const styles = StyleSheet.create({
  communityName: {
    fontFamily: "Catamaran",
    fontWeight: 600,
    marginBottom: 10,
    lineHeight: 1.1,
  },
  shortName: {
    fontSize: 140,
  },
  longName: {
    fontSize: 80,
    paddingTop: 20,
  },

  multiLine: {
    fontSize: 80,
  },
});

interface CommunityNameProps {
  name: string;
}

/**
 * Component displaying the community name with dynamic font sizing
 */
export const CommunityName: React.FC<CommunityNameProps> = ({ name }) => {
  // Process the community name based on different conditions

  // Short name (up to 7 characters): Use large font size
  const isShortName =
    name.length <= 7 && !name.includes(" ") && !name.includes("-");

  // Name with hyphen: Split on hyphen and display on two lines
  const hasHyphen = name.includes("-");

  // Name with spaces: Split on first space and display on two lines
  const hasSpaces = name.includes(" ");

  // Determine how to render the community name
  let content: React.ReactNode;
  let styleToUse: any;

  if (isShortName) {
    // Short name: Just render as is with large font
    content = name;
    styleToUse = styles.shortName;
  } else if (hasHyphen) {
    // Name with hyphen: Split on hyphen and format with line breaks
    const parts = name.split("-");
    content = (
      <>
        {parts[0].trim()}-{"\n"}
        {parts.slice(1).join("-").trim()}
      </>
    );
    styleToUse = styles.multiLine;
  } else if (hasSpaces) {
    // Name with space(s): Split on first space for two-line format
    const firstSpaceIndex = name.indexOf(" ");
    const firstLine = name.substring(0, firstSpaceIndex);
    const secondLine = name.substring(firstSpaceIndex + 1);

    content = (
      <>
        {firstLine}
        {"\n"}
        {secondLine}
      </>
    );
    styleToUse = styles.multiLine;
  } else if (name.length >= 8 && name.length <= 11) {
    content = name;
    styleToUse = styles.longName;
  } else {
    // Other long names: Use smaller font size
    content = name;
    styleToUse = styles.multiLine;
  }

  return <Text style={[styles.communityName, styleToUse]}>{content}</Text>;
};
