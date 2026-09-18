import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#08060F", panel: "#110B20", panel2: "#170F2A",
        line: "#251A3B", line2: "#352551",
        ink: "#F2F0F8", dim: "#A79FBC", faint: "#6B6285",
        accent: "#7C4DFF", accent2: "#A78BFA", up: "#2ECC71", down: "#8B3FE8",
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
