import CoinCard from "./CoinCard";

export default function CoinList({ coins }) {
  if (!coins || coins.length === 0) {
    return (
      <div className="text-sm text-slate-400">
        No coins found. Try a different search.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}
