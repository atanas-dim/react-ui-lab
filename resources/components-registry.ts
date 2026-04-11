import { ComponentSlug } from "@/resources/component-slugs";

export type ShowcaseComponent = {
  slug: ComponentSlug;
  name: string;
  description: string;
  previewPath: string;
};

export const COMPONENTS: Record<ComponentSlug, ShowcaseComponent> = {
  [ComponentSlug.JellyButton]: {
    slug: ComponentSlug.JellyButton,
    name: "Jelly Button",
    description:
      "Rounded call-to-action button with a soft lift, subtle glow,\nand interactive jelly-like motion.",
    previewPath: "jelly-button/JellyButtonPreview",
  },
};

export const COMPONENT_LIST = Object.values(COMPONENTS);

export const getComponentBySlug = (
  slug: ComponentSlug,
): ShowcaseComponent | undefined => {
  return COMPONENTS[slug];
};
