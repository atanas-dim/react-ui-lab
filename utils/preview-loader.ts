import { readFile } from "node:fs/promises";
import path from "node:path";

import type { FC } from "react";

const PREVIEW_COMPONENTS = {
  "jelly-button/JellyButtonPreview": () =>
    import("@/components/jelly-button/JellyButtonPreview"),
  "jelly-input/JellyInputPreview": () =>
    import("@/components/jelly-input/JellyInputPreview"),
} as const;

export type PreviewPath = keyof typeof PREVIEW_COMPONENTS;

export const loadPreviewComponent = async (
  previewPath: PreviewPath,
): Promise<{ default: FC }> => {
  return PREVIEW_COMPONENTS[previewPath]();
};

export const loadUsageExample = async (
  previewPath: PreviewPath,
): Promise<string> => {
  return readFile(
    path.join(process.cwd(), "components", `${previewPath}.tsx`),
    "utf8",
  );
};
