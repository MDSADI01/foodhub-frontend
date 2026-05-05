export default function HelpCenterPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Help Center
        </h1>
        <p className="mt-2 text-muted-foreground">
          Quick answers and ways to contact us.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-bold">Orders</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Track your order from your dashboard.</li>
            <li>If a meal arrives late or incorrect, contact support.</li>
            <li>Refunds depend on the restaurant’s confirmation status.</li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-bold">Account</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Use “Sign in” to access your customer/provider dashboard.</li>
            <li>If you forgot your password, try signing in again and follow prompts.</li>
            <li>Keep your profile info up to date for faster delivery.</li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-background p-6 md:col-span-2">
          <h2 className="text-lg font-bold">Contact support</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            For urgent issues, please use the Contact page and include your order
            ID and email.
          </p>
          <div className="mt-4 inline-flex rounded-xl border bg-muted/30 px-4 py-3 text-sm">
            Support hours: 10:00 AM – 10:00 PM (local time)
          </div>
        </section>
      </div>
    </div>
  );
}

