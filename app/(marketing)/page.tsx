import { ContactForm } from '@/features/contact';

export default function HomePage() {
  return (
    <main id="main" className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2">
      <section aria-labelledby="intro-heading">
        <h1 id="intro-heading" className="text-4xl font-semibold tracking-tight">
          Ship features, not setup
        </h1>
        <p className="mt-4 text-lg text-fg-muted">
          This starter wires up TypeScript, Tailwind CSS, testing, linting, and CI so a new project
          builds, tests, and deploys on day one.
        </p>
      </section>
      <section
        aria-labelledby="contact-heading"
        className="rounded-card border border-border bg-surface p-6"
      >
        <h2 id="contact-heading" className="text-xl font-semibold">
          Get in touch
        </h2>
        <p className="mt-1 text-sm text-fg-muted">An example Server Action with Zod validation.</p>
        <ContactForm />
      </section>
    </main>
  );
}
