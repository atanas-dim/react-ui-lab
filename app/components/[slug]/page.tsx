import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COMPONENT_LIST,
  getComponentBySlug,
} from "@/resources/components-registry";
import { ChevronLeftIcon, CodeIcon } from "lucide-react";
import { USAGE_EXAMPLES } from "@/resources/usage-examples";
import { ComponentSlug } from "@/resources/component-slugs";

type ComponentPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return COMPONENT_LIST.map((component) => ({
    slug: component.slug,
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;
  const component = getComponentBySlug(slug as ComponentSlug);

  if (!component) {
    notFound();
  }

  const { default: PreviewComponent } = await component.component();
  const usageExample =
    USAGE_EXAMPLES[component.slug] ?? "// Usage example coming soon";

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-16 sm:px-10 lg:px-12">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center underline-offset-4 text-sm font-medium underline text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ChevronLeftIcon /> Back to components
          </Link>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {component.name}
            </h1>
            <p className="max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">
              {component.description}
            </p>
          </div>
        </div>

        <section className="space-y-6">
          <div className="rounded-4xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-neutral-900">
                Live preview
              </h2>
              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
                Interactive
              </span>
            </div>
            <div className="flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 p-6">
              <PreviewComponent />
            </div>
          </div>

          <div>
            <section className="rounded-4xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold text-neutral-900">
                  Usage
                </h2>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600"
                  href={`https://github.com/atanas-dim/react-ui-lab/tree/main/components/${component.slug}`}
                >
                  <CodeIcon className="size-4" />
                  Open on GitHub
                </a>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-2xl bg-neutral-950 p-5 text-sm leading-6 text-neutral-100">
                <code>{usageExample}</code>
              </pre>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
