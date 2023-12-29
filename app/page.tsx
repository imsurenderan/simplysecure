import SimplySecure from "./components/SimplySecure";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="text-center">
        <h1 className="text-4xl font-bold py-6">SimplySecure</h1>
        <h2 className="text-2xl font-semibold">
          Simple and Secure Client-side File Encryption
        </h2>
      </section>
      <SimplySecure />
    </main>
  );
}
