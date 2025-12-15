import { Heart, Award, Leaf, Truck } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every sweet is handcrafted with care and passion by our expert confectioners.",
    color: "text-primary"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We use only the finest ingredients sourced from trusted suppliers worldwide.",
    color: "text-accent"
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    description:
      "No artificial preservatives. Just pure, natural flavors in every bite.",
    color: "text-secondary"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Fresh sweets delivered to your doorstep within 24-48 hours.",
    color: "text-candy-purple"
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
              About Sweet Haven
            </span>
            <h2 className="text-4xl md:text-5xl font-fredoka mb-6">
              Crafting <span className="text-gradient">Sweet Memories</span>{" "}
              Since 2020
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At Sweet Haven, we believe that every piece of candy should tell a
              story. Our master confectioners blend traditional techniques with
              innovative flavors to create treats that delight the senses and
              warm the heart.
            </p>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              From classic chocolates to whimsical gummies, each creation is a
              labor of love, designed to bring joy to candy lovers of all ages.
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted rounded-2xl">
                <div className="text-3xl font-fredoka text-primary mb-1">
                  5+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="text-center p-4 bg-muted rounded-2xl">
                <div className="text-3xl font-fredoka text-secondary mb-1">
                  100+
                </div>
                <div className="text-sm text-muted-foreground">
                  Sweet Varieties
                </div>
              </div>
              <div className="text-center p-4 bg-muted rounded-2xl">
                <div className="text-3xl font-fredoka text-accent mb-1">
                  50k+
                </div>
                <div className="text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 bg-card rounded-3xl shadow-card hover:shadow-candy transition-all duration-500 hover:-translate-y-1 opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: "forwards"
                }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4 ${feature.color}`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-fredoka text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
