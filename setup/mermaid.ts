import { defineMermaidSetup } from "@slidev/types";

/**
 * Mermaid ships a `handDrawn` look (rough.js under the hood) which is exactly
 * the Excalidraw aesthetic. `look` is newer than the bundled type definitions,
 * hence the cast.
 */
export default defineMermaidSetup(() => ({
  theme: "base",
  look: "handDrawn",
  handDrawnSeed: 7,
  fontFamily: "Virgil, cursive",
  themeVariables: {
    background: "#ffffff",
    primaryColor: "#ffec99",
    primaryTextColor: "#1e1e1e",
    primaryBorderColor: "#1e1e1e",
    secondaryColor: "#a5d8ff",
    tertiaryColor: "#b2f2bb",
    lineColor: "#1e1e1e",
    textColor: "#1e1e1e",
    edgeLabelBackground: "#ffffff",
    fontSize: "16px",
  },
}) as any);
