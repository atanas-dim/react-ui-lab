import type { FC } from "react";
import { ComponentSlug } from "@/resources/component-slugs";

export type ShowcaseComponent = {
  slug: ComponentSlug;
  name: string;
  description: string;
  component: () => Promise<{ default: FC }>;
};

export const COMPONENTS: Record<ComponentSlug, ShowcaseComponent> = {
  [ComponentSlug.PillButton]: {
    slug: ComponentSlug.PillButton,
    name: "Pill Button",
    description:
      "Rounded call-to-action button with a soft lift, subtle glow, and reusable Tailwind-only styling.",
    component: () => import("@/components/pill-button/PillButton"),
  },
};

export const COMPONENT_LIST = Object.values(COMPONENTS);

export const getComponentBySlug = (
  slug: ComponentSlug,
): ShowcaseComponent | undefined => {
  return COMPONENTS[slug];
};
