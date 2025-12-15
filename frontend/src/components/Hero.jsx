import { Sparkles, ArrowDown } from "lucide-react";

const FloatingCandy = ({ emoji, className, delay = 0 }) => (
  <div
    className={`absolute text-4xl md:text-6xl animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {emoji}
  </div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-hero pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingCandy emoji="🍭" className="top-32 left-[10%]" delay={0} />
        <FloatingCandy emoji="🍬" className="top-32 right-[15%]" delay={0.5} />
        <FloatingCandy emoji="🍫" className="top-[40%] left-[5%]" delay={1} />
        <FloatingCandy
          emoji="🍩"
          className="top-[30%] right-[8%]"
          delay={1.5}
        />
        <FloatingCandy emoji="🧁" className="bottom-32 left-[20%]" delay={2} />
        <FloatingCandy
          emoji="🍪"
          className="bottom-40 right-[20%]"
          delay={0.8}
        />
        <FloatingCandy
          emoji="🎂"
          className="top-[60%] left-[15%]"
          delay={1.2}
        />
        <FloatingCandy
          emoji="🍰"
          className="top-[50%] right-[12%]"
          delay={1.8}
        />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            <span>Welcome to the sweetest place on earth!</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-fredoka mb-6 animate-fade-in-up stagger-1">
            <span className="text-gradient">Sweet</span>{" "}
            <span className="text-foreground">Treats</span>
            <br />
            <span className="text-foreground">for</span>{" "}
            <span className="text-gradient">Everyone</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            Discover our handcrafted collection of premium candies, chocolates,
            and confections. Each piece made with love and the finest
            ingredients.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <a
              href="#sweets"
              className="btn-candy text-lg px-8 py-4 flex items-center gap-2"
            >
              <span>Explore Sweets</span>
              <span className="text-xl">🍭</span>
            </a>
            <a
              href="#categories"
              className="px-8 py-4 font-semibold text-foreground hover:text-primary transition-all flex items-center gap-2 group"
            >
              <span>Browse Categories</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in-up stagger-4">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-fredoka text-primary mb-1">
                100+
              </div>
              <div className="text-sm text-muted-foreground">
                Sweet Varieties
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-fredoka text-secondary mb-1">
                50k+
              </div>
              <div className="text-sm text-muted-foreground">
                Happy Customers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-fredoka text-accent mb-1">
                4.9★
              </div>
              <div className="text-sm text-muted-foreground">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
