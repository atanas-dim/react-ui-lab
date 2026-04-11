import { readFile } from "node:fs/promises";
import path from "node:path";

import type { FC } from "react";

export const loadPreviewComponent = async (
  previewPath: string,
): Promise<{ default: FC }> => {
  return import(`@/components/${previewPath}`);
};

export const loadUsageExample = async (
  previewPath: string,
): Promise<string> => {
  return readFile(
    path.join(process.cwd(), "components", `${previewPath}.tsx`),
    "utf8",
  );
};
