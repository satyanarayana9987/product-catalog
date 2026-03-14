import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="search"
      placeholder="Search products..."
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      aria-label="Search Products"
    />
  );
}
