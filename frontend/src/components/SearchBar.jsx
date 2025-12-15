import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  categories
}) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <div className="relative flex items-center gap-3">
        <div className="flex-1 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search for your favorite sweets..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-candy pl-14 pr-12 py-4 text-lg w-full"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-4 rounded-2xl transition-all ${
            showFilters
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-primary/10"
          }`}
        >
          <SlidersHorizontal className="w-6 h-6" />
        </button>
      </div>
      {showFilters && (
        <div className="mt-4 p-6 bg-card rounded-3xl shadow-card animate-fade-in-scale">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-candy"
                        : "bg-muted hover:bg-primary/10 text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={priceRange[0]}
                  onChange={(e) =>
                    onPriceRangeChange([Number(e.target.value), priceRange[1]])
                  }
                  className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={priceRange[1]}
                  onChange={(e) =>
                    onPriceRangeChange([priceRange[0], Number(e.target.value)])
                  }
                  className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              onCategoryChange("All");
              onPriceRangeChange([0, 20]);
              onSearchChange("");
            }}
            className="mt-4 text-sm font-semibold text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.slice(0, 5).map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-candy"
                : "bg-muted/50 hover:bg-muted text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
