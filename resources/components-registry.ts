import type { FC } from "react";

export type ShowcaseComponent = {
  slug: string;
  name: string;
  description: string;
  component: () => Promise<{ default: FC }>;
};

export const COMPONENTS: ShowcaseComponent[] = [
  {
    slug: "pill-button",
    name: "Pill Button",
    description:
      "Rounded call-to-action button with a soft lift, subtle glow, and reusable Tailwind-only styling.",
    component: () => import("@/components/pill-button/PillButton"),
  },
];

export const getComponentBySlug = (
  slug: string,
): ShowcaseComponent | undefined => {
  return COMPONENTS.find((component) => component.slug === slug);
};
