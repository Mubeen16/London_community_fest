import { siteConfig } from "@/lib/config/site";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-forest-900 px-6 py-16 text-center">
      <h1 className="font-serif text-6xl text-cream">
        London Community <span className="text-gold-400 italic">Fest</span>
      </h1>

      <p className="text-lg text-cream-muted">{siteConfig.tagline}</p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          className="rounded-full bg-crimson-400 px-6 py-3 text-cream"
        >
          Crimson button
        </button>
        <button
          type="button"
          className="rounded-full bg-gold-400 px-6 py-3 text-forest-900"
        >
          Gold button
        </button>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div
          className="size-12 rounded-md bg-paper-200"
          title="paper-200"
          aria-hidden
        />
        <div
          className="size-12 rounded-md bg-forest-700"
          title="forest-700"
          aria-hidden
        />
        <div
          className="size-12 rounded-md bg-crimson-600"
          title="crimson-600"
          aria-hidden
        />
      </div>
    </main>
  );
}
