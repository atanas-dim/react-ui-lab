import { readFile } from "node:fs/promises";
import path from "node:path";

import type { FC } from "react";

export type PreviewPath = string;

export const loadPreviewComponent = async (
  previewPath: PreviewPath,
): Promise<{ default: FC }> => {
  // Dynamically import the preview component by relative component path.
  // Example: previewPath = "jelly-button/JellyButtonPreview"
  return import(`@/components/${previewPath}`) as Promise<{ default: FC }>;
};

export const loadUsageExample = async (
  previewPath: PreviewPath,
): Promise<string> => {
  return readFile(
    path.join(process.cwd(), "components", `${previewPath}.tsx`),
    "utf8",
  );
};
