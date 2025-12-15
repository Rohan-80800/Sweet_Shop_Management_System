const categoryData = [
  {
    name: "Chocolates",
    emoji: " 🍫"
  },
  {
    name: "Lollipops",
    emoji: "🍭"
  },
  {
    name: "Gummies",
    emoji: "🐻"
  },
  {
    name: "Cotton Candy",
    emoji: "🍬"
  },
  {
    name: "Hard Candy",
    emoji: "💎"
  },
  { name: "Jelly", emoji: "🫘"}
];

const CategorySection = ({ onCategorySelect }) => {
  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-fredoka mb-4">
            Browse by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your perfect treat by exploring our delicious categories
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map((category, index) => (
            <button
              key={category.name}
              onClick={() => onCategorySelect(category.name)}
              className="group p-6 bg-card rounded-3xl shadow-card hover:shadow-candy transition-all duration-500 hover:-translate-y-2 opacity-0 animate-fade-in-up"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: "forwards"
              }}
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}
              >
                {category.emoji}
              </div>
              <h3 className="font-fredoka text-lg text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
