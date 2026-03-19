"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen">
        <h1>A Critical Error Occurred</h1>
        <button onClick={() => reset()}>Refresh Application</button>
      </body>
    </html>
  );
}