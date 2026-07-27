import { ComponentType } from "@/generated/prisma/enums";

// One fixed hue per life component, shared by the weight bar and pie chart so
// a component always reads as the same color everywhere. Order follows
// COMPONENTS in lib/weights.ts. Chosen and validated (OKLab CVD separation,
// chroma floor, contrast) as a 9-slot categorical set using the project's
// data-viz palette methodology — see dataviz skill references/color-formula.md.
export const COMPONENT_COLORS: Record<ComponentType, string> = {
  MENTAL: "#2a78d6",
  PHYSICAL: "#008300",
  FINANCIAL: "#e87ba4",
  CAREER: "#eda100",
  RELATIONSHIPS: "#1baf7a",
  SOCIAL: "#eb6834",
  HABITS: "#4a3aa7",
  LEARNING: "#e34948",
  PURPOSE: "#5c4a9c",
};
