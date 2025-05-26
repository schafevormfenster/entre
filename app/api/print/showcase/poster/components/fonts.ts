import { Font } from "@react-pdf/renderer";
import path from "path";

// Register fonts at module level (once during cold start)
// This happens when the module is first imported, not during component rendering
try {
  Font.register({
    family: "Catamaran",
    fonts: [
      {
        src: path.join(process.cwd(), "public/fonts/catamaran-400.woff"),
        fontWeight: 400,
      }, // Regular
      {
        src: path.join(process.cwd(), "public/fonts/catamaran-500.woff"),
        fontWeight: 500,
      }, // Medium
      {
        src: path.join(process.cwd(), "public/fonts/catamaran-600.woff"),
        fontWeight: 600,
      }, // SemiBold
      {
        src: path.join(process.cwd(), "public/fonts/catamaran-700.woff"),
        fontWeight: 700,
      }, // Bold
    ],
  });

  Font.register({
    family: "Courier New",
    src: path.join(process.cwd(), "public/fonts/courier-new.ttf"),
  });

  console.log("Fonts registered successfully");
} catch (error) {
  console.warn("Font registration failed:", error);
}

// Export primary font name for consistent usage
export const PRIMARY_FONT = "Catamaran";
export const MONOSPACE_FONT = "Courier New";
