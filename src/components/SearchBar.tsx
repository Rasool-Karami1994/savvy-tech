import { FiSearch } from "react-icons/fi";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search items by title or subtitle…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative w-full flex-1">
      <FiSearch
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-title/50"
        aria-hidden
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search items"
        className="w-full md:max-w-2xl lg:max-w-4xl rounded-lg border border-border bg-fields text-title placeholder:text-title/50 placeholder:font-semibold placeholder:text-sm
                   pl-10 pr-3 py-2 outline-none transition-shadow duration-150
                   focus:bg-main focus:border-btn focus:ring-1 focus:ring-btn focus:shadow-elev-1"
      />
    </div>
  );
}
