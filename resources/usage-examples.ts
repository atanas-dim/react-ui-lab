import { ComponentSlug } from "./component-slugs";

export const USAGE_EXAMPLES: Record<ComponentSlug, string> = {
  [ComponentSlug.PillButton]: `import { type FC } from "react";
import PillButton from "@/components/pill-button/PillButton";
  
export const PillButtonPreview: FC = () => {
  return (
    <div className="relative z-10 perspective-[200px]">
      <div className="absolute inset-0 -z-1 size-30 -translate-x-16 translate-y-3 rounded-xl bg-mist-500" />
      <div className="absolute inset-0 -z-1 size-20 translate-x-26 -translate-y-6 rounded-full bg-mauve-400" />

      <PillButton className="mx-auto">Launch</PillButton>
    </div>
  );
};`,
};
