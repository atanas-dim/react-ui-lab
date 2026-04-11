import { ComponentSlug } from "./component-slugs";

export const USAGE_EXAMPLES: Record<ComponentSlug, string> = {
  [ComponentSlug.JellyButton]: `import { type FC } from "react";
import JellyButton from "@/components/jelly-button/JellyButton";
  
export const JellyButtonPreview: FC = () => {
  return (
    <div className="relative z-10 perspective-[200px]">
      <div className="absolute inset-0 -z-1 size-30 -translate-x-16 translate-y-3 rounded-xl bg-mist-500" />
      <div className="absolute inset-0 -z-1 size-20 translate-x-26 -translate-y-6 rounded-full bg-mauve-400" />

      <JellyButton className="mx-auto">Launch</JellyButton>
    </div>
  );
};`,
};
