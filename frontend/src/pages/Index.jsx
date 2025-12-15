import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSweets, setLoading, setError } from "../slices/sweetSlice";
import { setUser } from "../slices/authSlice";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import SweetCard from "../components/SweetCard";
import CategorySection from "../components/CategorySection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import AdminPanel from "../components/AdminPanel";
import { getAllSweets, logoutUser } from "../api";
import CartModal from "../components/CartModal";
import { toast } from "sonner";

const Index = () => {
  const dispatch = useDispatch();
  const { sweets, categories, loading, error } = useSelector(
    (state) => state.sweets
  );
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [cartOpen, setCartOpen] = useState(false);


  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const sweetsRes = await getAllSweets();
        dispatch(setSweets(sweetsRes.data));
      } catch (err) {
        dispatch(
          setError(err.response?.data?.message || "Failed to load sweets")
        );
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const filteredSweets = useMemo(() => {
    return sweets.filter((sweet) => {
      const matchesSearch =
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sweet.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || sweet.category === selectedCategory;
      const matchesPrice =
        sweet.price >= priceRange[0] && sweet.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [sweets, searchTerm, selectedCategory, priceRange]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(setUser(null));
      toast.success("Logged out successfully!");
    } catch  {
      toast.error("Logout failed");
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    document.getElementById("sweets")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onLoginClick={() => {
          setAuthMode("login");
          setAuthModalOpen(true);
        }}
        onRegisterClick={() => {
          setAuthMode("register");
          setAuthModalOpen(true);
        }}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onAdminClick={() => setAdminPanelOpen(true)}
        onLogout={handleLogout}
        onCartClick={() => setCartOpen(true)}
      />
      <Hero />
      <section id="sweets" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-fredoka mb-4">
              Our <span className="text-gradient">Sweet Collection</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium candies and
              confections
            </p>
          </div>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            categories={categories}
          />
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-4 text-muted-foreground">
                Loading delicious sweets...
              </p>
            </div>
          ) : filteredSweets.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSweets.map((sweet, index) => (
                <SweetCard key={sweet._id} sweet={sweet} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="text-2xl font-fredoka text-foreground mb-2">
                No sweets found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>
      <CategorySection onCategorySelect={handleCategorySelect} />
      <AboutSection />
      <Footer />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() =>
          setAuthMode(authMode === "login" ? "register" : "login")
        }
      />
      <AdminPanel
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
      />
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Index;
