import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CoinCard({ coin }) {
  const change = coin.price_change_percentage_24h;

  return (
    <Link href={`/coin/${coin.id}`}>
      <div className="group border rounded-xl p-4 bg-white hover:bg-slate-50 border-slate-200 hover:border-teal-400 dark:bg-slate-900/50 dark:hover:bg-slate-900 dark:border-slate-800 transition cursor-pointer h-full flex flex-col justify-between">

        <div className="flex items-center gap-3 mb-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <div className="text-sm font-semibold">
              {coin.name}{" "}
              <span className="text-xs text-slate-400 uppercase">
                {coin.symbol}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              Rank #{coin.market_cap_rank}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-lg font-semibold">
            ${coin.current_price.toLocaleString()}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Market cap: ${coin.market_cap.toLocaleString()}
            </span>
            <span
              className={classNames(
                "font-semibold",
                change >= 0 ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {change ? change.toFixed(2) : "0.00"}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
