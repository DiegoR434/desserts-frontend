interface ProductFiltersProps {
  search: string;
  category: string;
  categories: string[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

function ProductFilters({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-3 sm:flex-row">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar postres..."
        aria-label="Buscar productos por nombre"
        className="w-full rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red sm:flex-1"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filtrar por categoría"
        className="rounded-lg border border-rose-300 bg-white px-4 py-3 outline-none focus:border-red sm:w-52"
      >
        <option value="">Todas las categorías</option>

        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProductFilters;
