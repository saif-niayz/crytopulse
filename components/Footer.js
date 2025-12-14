export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-8">
      <div className="max-w-6xl mx-auto px-8 py-4 text-xs text-slate-500 dark:text-slate-400 flex justify-between">
        <span>© {new Date().getFullYear()} CryptoPulse</span>
        <span>
          Data from{" "}
          <a
            href="https://www.coingecko.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-teal-300"
          >
            CoinGecko API
          </a>
        </span>
      </div>
    </footer>
  );
}
