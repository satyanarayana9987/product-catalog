import "./CategoryMenu.css";

export default function CategoryMenu({ categories, selected, onSelect }) {
  const cats = Array.isArray(categories) ? categories : [];
  const current = selected ?? "all";
  const select = onSelect ?? (() => {});

  return (
    <div className="category-container">

      <div
        className={`category-box ${current === "all" ? "active" : ""}`}
        onClick={() => select("all")}
      >
        All
      </div>

      {cats.map((cat) => (
        <div
          key={cat}
          className={`category-box ${current === cat ? "active" : ""}`}
          onClick={() => select(cat)}
        >
          {cat}
        </div>
      ))}

    </div>
  );
}
