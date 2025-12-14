import axios from "axios";
import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";
import TrendingSection from "../components/TrendingSection";

export default function Home({ coins, trending, hadError }) {
  const [search, setSearch] = useState("");

  const filteredCoins = useMemo(() => {
    if (!search.trim()) return coins;
    const lower = search.toLowerCase();
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(lower) ||
        coin.symbol.toLowerCase().includes(lower)
    );
  }, [coins, search]);

  return (
    <div className="space-y-8">
      {hadError && (
        <div className="text-xs text-rose-400 border border-rose-800/60 bg-rose-950/40 rounded-md px-3 py-2">
          We could not load live market data right now. This may be a temporary
          issue with the API (rate limit or network). Please refresh the page
          after a minute and try again.
        </div>
      )}

      <section className="flex justify-between items-start gap-8">
        <div className="space-y-4 max-w-xl">
          <h1 className="text-3xl font-semibold">
            Track live{" "}
            <span className="text-teal-400">cryptocurrency prices</span>.
          </h1>
          <p className="text-sm text-slate-300">
            CryptoPulse shows live crypto market data in a clean and simple
            desktop website. Search for coins, check prices, and see what&apos;s
            trending.
          </p>
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="w-64">
          <TrendingSection trending={trending} />
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Top cryptocurrencies by market cap
          </h2>
          <span className="text-xs text-slate-400">
            Showing {filteredCoins.length} of {coins.length}
          </span>
        </div>
        <CoinList coins={filteredCoins} />
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const [marketsRes, trendingRes] = await Promise.all([
      axios.get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 60,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      }),
      axios.get("https://api.coingecko.com/api/v3/search/trending"),
    ]);

    return {
      props: {
        coins: marketsRes.data,
        trending: trendingRes.data?.coins || [],
        hadError: false,
      },
    };
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return {
      props: {
        coins: [],
        trending: [],
        hadError: true,
      },
    };
  }
}
