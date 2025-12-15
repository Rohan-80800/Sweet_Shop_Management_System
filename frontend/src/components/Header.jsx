import { useState } from "react";
import { Candy, Menu, X, User, ShoppingBag, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

const Header = ({
  onLoginClick,
  onRegisterClick,
  isLoggedIn,
  isAdmin,
  onAdminClick,
  onLogout,
  onCartClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useSelector((state) =>
    state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl gradient-candy flex items-center justify-center shadow-candy group-hover:animate-wiggle transition-transform">
                <Candy className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-candy-yellow rounded-full animate-bounce-soft" />
            </div>
            <span className="text-2xl font-fredoka text-gradient hidden sm:block">
              Sweet Haven
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#sweets"
              className="font-semibold text-foreground/80 hover:text-primary transition-colors relative group"
            >
              Sweets
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#categories"
              className="font-semibold text-foreground/80 hover:text-primary transition-colors relative group"
            >
              Categories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#about"
              className="font-semibold text-foreground/80 hover:text-primary transition-colors relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <button
                    onClick={onAdminClick}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold hover:bg-secondary/20 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                    Admin
                  </button>
                )}
                {!isAdmin && (
                  <button
                    onClick={onCartClick}
                    className="relative p-3 rounded-full bg-muted hover:bg-primary/10 transition-all group"
                  >
                    <ShoppingBag className="w-5 h-5 text-foreground/70 group-hover:text-primary" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  </button>
                )}

                <button
                  onClick={onLogout}
                  className="btn-candy flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-5 py-2.5 font-semibold text-primary hover:bg-primary/10 rounded-full transition-all"
                >
                  Login
                </button>
                <button onClick={onRegisterClick} className="btn-candy">
                  Sign Up
                </button>
              </>
            )}
          </div>
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-muted transition-all"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-card border-t border-border animate-fade-in-up">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <a
              href="#sweets"
              className="font-semibold py-2 hover:text-primary transition-colors"
            >
              Sweets
            </a>
            <a
              href="#categories"
              className="font-semibold py-2 hover:text-primary transition-colors"
            >
              Categories
            </a>
            <a
              href="#about"
              className="font-semibold py-2 hover:text-primary transition-colors"
            >
              About
            </a>
            <hr className="border-border" />
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <button
                    onClick={() => {
                      onAdminClick();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 py-2 text-secondary font-semibold"
                  >
                    <Settings />
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={onCartClick}
                  className="relative p-3 rounded-full bg-muted hover:bg-primary/10 transition-all group"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Cart ({cartCount})
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-candy text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2 font-semibold text-primary"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onRegisterClick();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-candy text-center"
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
