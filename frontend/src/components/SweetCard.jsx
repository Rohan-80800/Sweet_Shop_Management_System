import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "../slices/cartSlice";
import { useSelector } from "react-redux";
import { updateSweetQuantity } from "../slices/sweetSlice";

const SweetCard = ({ sweet, index }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const cartItem = cartItems.find((item) => item.sweetId === sweet._id);

  useEffect(() => {
    if (!cartItem) {
      setShowSuccess(false);
      setQuantity(1);
    }
  }, [cartItem]);

  const handlePurchase = async () => {
    if (sweet.quantity === 0) return;
    setIsPurchasing(true);
    try {
      dispatch(
        addToCart({
          sweetId: sweet._id,
          quantity,
          name: sweet.name,
          price: sweet.price,
          image: sweet.image,
          category: sweet.category
        })
      );
      dispatch(
        updateSweetQuantity({
          sweetId: sweet._id,
          quantity
        })
      );
      setShowSuccess(true);
      toast.success("Added to cart!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Purchase failed");
    } finally {
      setIsPurchasing(false);
    }
  };

  const isOutOfStock = sweet.quantity === 0;

  return (
    <div
      className="card-sweet group opacity-0 animate-fade-in-up"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards"
      }}
    >
      <div
        className={`relative h-48 bg-gradient-to-br ${sweet.color} overflow-hidden`}
      >
        <img
          src={sweet.image}
          alt={sweet.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full bg-card/90 text-foreground backdrop-blur-sm">
          {sweet.category}
        </span>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center">
            <span className="px-4 py-2 bg-destructive text-destructive-foreground font-bold rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-fredoka text-foreground mb-2 group-hover:text-primary transition-colors">
          {sweet.name}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            ${sweet.price.toFixed(2)}
          </span>
          <span
            className={`text-sm font-medium ${
              isOutOfStock ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {sweet.quantity} in stock
          </span>
        </div>
        {isLoggedIn && !isAdmin && !isOutOfStock && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm text-muted-foreground">Qty:</span>
            <div className="flex items-center gap-2 bg-muted rounded-full px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:bg-primary/10 rounded-full transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-8 text-center font-semibold">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(Math.min(sweet.quantity, quantity + 1))
                }
                className="p-1 hover:bg-primary/10 rounded-full transition-colors"
                disabled={quantity >= sweet.quantity}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {isLoggedIn && !isAdmin && (
          <button
            onClick={handlePurchase}
            disabled={isOutOfStock || isPurchasing}
            className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
              isOutOfStock
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : showSuccess
                ? "bg-secondary text-secondary-foreground"
                : "btn-candy"
            }`}
          >
            {isPurchasing ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : showSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default SweetCard;
