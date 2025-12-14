import axios from "axios";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CoinDetails({ coin, chartData }) {
  if (!coin) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-rose-400">
          Sorry, we could not load this coin.
        </p>
        <Link href="/" className="text-sm text-teal-400">
          ← Back to home
        </Link>
      </div>
    );
  }

  const marketData = coin.market_data;

  return (
    <div className="space-y-8">
      <Link href="/" className="text-xs text-teal-400 hover:text-teal-300">
        ← Back to home
      </Link>

      <section className="flex justify-between items-start gap-8">
        <div className="flex items-center gap-4">
          <img
            src={coin.image.large}
            alt={coin.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold">
              {coin.name}{" "}
              <span className="uppercase text-slate-400 text-sm">
                {coin.symbol}
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Rank #{coin.market_cap_rank}
            </p>
          </div>
        </div>
        <div className="text-right space-y-1">
          <div className="text-2xl font-semibold">
            ${marketData.current_price.usd.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">
            Market cap: ${marketData.market_cap.usd.toLocaleString()}
          </div>
          <div
            className={
              "text-xs font-semibold " +
              (marketData.price_change_percentage_24h >= 0
                ? "text-emerald-400"
                : "text-rose-400")
            }
          >
            24h: {marketData.price_change_percentage_24h.toFixed(2)}%
          </div>
        </div>
      </section>

      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
        <h2 className="text-sm font-semibold mb-3 text-slate-200">
          7-day price history (USD)
        </h2>
        {chartData && chartData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "#9ca3af" }}
                  tickLine={false}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderColor: "#1f2937",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#14b8a6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            No chart data available for this coin.
          </p>
        )}
      </section>

      <section className="space-y-2 max-w-3xl">
        <h2 className="text-sm font-semibold text-slate-200">Overview</h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          {coin.description.en
            ? coin.description.en
                .replace(/<\/?[^>]+(>|$)/g, "")
                .split(". ")
                .slice(0, 3)
                .join(". ") + "."
            : "No description available for this coin."}
        </p>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const [coinRes, chartRes] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      }),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: 7,
          interval: "daily",
        },
      }),
    ]);

    const prices = chartRes.data?.prices || [];
    const chartData = prices.map(([timestamp, price]) => {
      const date = new Date(timestamp);
      return {
        date: `${date.getMonth() + 1}/${date.getDate()}`,
        price: Number(price.toFixed(2)),
      };
    });

    return {
      props: {
        coin: coinRes.data,
        chartData,
      },
    };
  } catch (err) {
    console.error("Error fetching coin:", err.message);
    return {
      props: {
        coin: null,
        chartData: [],
      },
    };
  }
}
