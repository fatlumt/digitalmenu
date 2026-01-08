export type ThemeConfig = {
  id: string;
  name: string;
  description: string;
  palette: string[];
  typography: string;
};

export const themes: ThemeConfig[] = [
  {
    id: "minimal",
    name: "Minimal / Modern",
    description: "Lightweight typography with generous spacing.",
    palette: ["#111827", "#4F46E5", "#E5E7EB"],
    typography: "Inter",
  },
  {
    id: "elegant",
    name: "Elegant / Fine dining",
    description: "Classic serif with gold accents.",
    palette: ["#1F2937", "#D4AF37", "#F8FAFC"],
    typography: "Playfair Display",
  },
  {
    id: "bold",
    name: "Bold / Street food",
    description: "High-contrast hues and playful visuals.",
    palette: ["#0F172A", "#F97316", "#38BDF8"],
    typography: "Space Grotesk",
  },
];
