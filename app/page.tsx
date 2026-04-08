import Link from "next/link";

import { COMPONENT_LIST } from "@/resources/components-registry";

export default function Home() {
  return (
    <main className="min-h-screen text-neutral-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-12">
        <section className="max-w-2xl space-y-5">
          <p className="text-sm font-medium tracking-[0.24em] text-neutral-500 uppercase">
            React UI Lab
          </p>
          <div className="max-w-80 space-y-4 sm:max-w-120 md:max-w-none">
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Reusable{" "}
              <span className="bg-linear-to-r from-sky-700 via-cyan-600 to-emerald-500 bg-clip-text whitespace-nowrap text-transparent">
                UI components
              </span>
              , isolated and production-ready.
            </h1>
            <p className="text-base leading-7 text-neutral-600 sm:text-lg">
              Browse each component, inspect the preview, and copy the minimal
              implementation into your own project.
            </p>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {COMPONENT_LIST.map((component) => (
            <Link
              key={component.slug}
              href={`/components/${component.slug}`}
              className="group rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
                    {component.name}
                  </h2>
                  <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium tracking-[0.18em] text-neutral-500 uppercase">
                    View
                  </span>
                </div>
                <p className="text-sm leading-6 text-neutral-600">
                  {component.description}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
