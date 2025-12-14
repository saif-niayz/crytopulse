export default function About() {
  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl font-semibold">About CryptoPulse</h1>
      <p className="text-sm text-slate-300">
        CryptoPulse is a small desktop-focused web app that shows live
        cryptocurrency data using the CoinGecko API. The main goal of this
        project is to practice building a clean, simple website with Next.js,
        Tailwind CSS, and real-time data.
      </p>
      <p className="text-sm text-slate-300">
        The app lets you search for coins, see their latest price, 24 hour price
        change, and market value, and view a short history chart for each coin.
        It also includes dark and light mode, and a simple layout that is easy
        to read on a computer screen.
      </p>
      <p className="text-sm text-slate-300">
        This project is built as part of a web development course and is meant
        to be clear, realistic, and easy to extend in the future.
      </p>
    </div>
  );
}
