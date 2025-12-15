import { Sparkles } from "lucide-react";

const FloatingCandy = ({ emoji, className, delay = 0 }) => (
  <div
    className={`absolute text-3xl md:text-5xl animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    {emoji}
  </div>
);

const Loadingscreen = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background transition-colors">
      <div className="absolute inset-0 pointer-events-none">
        <FloatingCandy emoji="🍭" className="top-24 left-[15%]" delay={0} />
        <FloatingCandy emoji="🍬" className="top-32 right-[20%]" delay={0.4} />
        <FloatingCandy
          emoji="🍫"
          className="bottom-40 left-[10%]"
          delay={0.8}
        />
        <FloatingCandy
          emoji="🧁"
          className="bottom-32 right-[15%]"
          delay={1.2}
        />

        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Preparing Sweetness</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-fredoka mb-4">
          <span className="text-gradient">Sweet Haven</span>
        </h1>

        <p className="text-muted-foreground mb-8">
          Loading delicious treats for you 🍩
        </p>

        <div className="flex items-center justify-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-bounce" />
          <span className="w-3 h-3 rounded-full bg-secondary animate-bounce delay-150" />
          <span className="w-3 h-3 rounded-full bg-accent animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
};

export default Loadingscreen;
