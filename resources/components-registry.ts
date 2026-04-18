import { ComponentSlug } from "@/resources/component-slugs";
import type { PreviewPath } from "@/utils/preview-loader";

export type ShowcaseComponent = {
  slug: ComponentSlug;
  name: string;
  description: string;
  previewPath: PreviewPath;
};

export const COMPONENTS: Record<ComponentSlug, ShowcaseComponent> = {
  [ComponentSlug.JellyButton]: {
    slug: ComponentSlug.JellyButton,
    name: "Jelly Button",
    description:
      "Rounded call-to-action button with a soft lift, subtle glow, and interactive jelly-like motion.",
    previewPath: "jelly-button/JellyButtonPreview",
  },
  [ComponentSlug.JellyInput]: {
    slug: ComponentSlug.JellyInput,
    name: "Jelly Input",
    description:
      "Polished input with subtle focus, floating label, and a soft noise texture for depth.",
    previewPath: "jelly-input/JellyInputPreview",
  },
};

export const COMPONENT_LIST = Object.values(COMPONENTS);

export const getComponentBySlug = (
  slug: ComponentSlug,
): ShowcaseComponent | undefined => {
  return COMPONENTS[slug];
};
