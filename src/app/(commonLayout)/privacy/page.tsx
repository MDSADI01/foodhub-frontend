export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-28 pb-16 md:px-10 md:pt-32 md:pb-20">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          This is a static summary page for your app. Replace with your legal
          text if needed.
        </p>
      </header>

      <div className="space-y-6">
        <section className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-bold">What we collect</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Basic account details (name, email), delivery details you provide,
            and order-related information to run the service.
          </p>
        </section>

        <section className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-bold">How we use data</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>To create and manage your account.</li>
            <li>To process orders and show order status.</li>
            <li>To improve the app experience and reliability.</li>
          </ul>
        </section>

        <section className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-bold">Cookies</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We may use cookies or similar technologies for authentication and
            basic analytics.
          </p>
        </section>
      </div>
    </div>
  );
}

