import { ComponentSlug } from "./component-slugs";

export const USAGE_EXAMPLES: Record<ComponentSlug, string> = {
  [ComponentSlug.PillButton]: `import PillButton from "@/components/pill-button/PillButton";

export default function Example() {
  return <PillButton>Launch</PillButton>;
}`,
};
