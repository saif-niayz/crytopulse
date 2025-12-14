export default function SearchBar({ value, onChange }) {
  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Search by name or symbol…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md bg-slate-900 border border-slate-700 px-4 py-2 text-sm focus:outline-none focus:border-teal-400"
      />
    </div>
  );
}
