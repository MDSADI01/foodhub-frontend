export default function TermsAndConditionsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          This is a static summary page for your app. Replace with your legal
          text if needed.
        </p>
      </header>

      <div className="space-y-6">
        <section className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-bold">Using FoodyVerse</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            By creating an account or placing an order, you agree to follow the
            app rules and provide accurate information.
          </p>
        </section>

        <section className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-bold">Orders &amp; refunds</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Order availability, delivery times, and refunds may vary depending
            on restaurant/provider confirmation and policy.
          </p>
        </section>

        <section className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-bold">Account responsibility</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep your login secure. You’re responsible for activity on your
            account unless reported otherwise.
          </p>
        </section>
      </div>
    </div>
  );
}

