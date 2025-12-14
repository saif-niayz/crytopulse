import Link from "next/link";

export default function TrendingSection({ trending }) {
  if (!trending || trending.length === 0) return null;

  return (
    <div className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
      <h2 className="text-sm font-semibold mb-3 text-slate-200">
        Trending coins
      </h2>
      <div className="space-y-2 text-xs">
        {trending.map((item) => {
          const coin = item.item;
          return (
            <Link key={coin.id} href={`/coin/${coin.id}`}>
              <div className="flex items-center justify-between hover:text-teal-300 cursor-pointer">
                <div className="flex items-center gap-2">
                  <img
                    src={coin.small}
                    alt={coin.name}
                    className="w-5 h-5 rounded-full"
                  />
                  <span>{coin.name}</span>
                </div>
                <span className="text-slate-400 uppercase">{coin.symbol}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
