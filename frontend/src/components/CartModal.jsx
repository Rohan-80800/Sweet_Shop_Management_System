import { useSelector, useDispatch } from "react-redux";
import { X, Trash2, ShoppingCart } from "lucide-react";
import { removeFromCart } from "../slices/cartSlice";
import { purchaseSweet } from "../api";
import { clearCart } from "../slices/cartSlice";
import { toast } from "sonner";

const CartModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  if (!isOpen) return null;

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleBuy = async () => {
    try {
      await purchaseSweet(
        cartItems.map((item) => ({
          sweetId: item.sweetId,
          quantity: item.quantity
        }))
      );

      dispatch(clearCart());
      toast.success("Purchase successful 🍬");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-3xl shadow-2xl overflow-hidden animate-fade-in-scale">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gradient-sweet flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-fredoka">Your Cart</h2>
              <p className="text-sm text-muted-foreground">
                Review your selected sweets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                Your cart is empty 🍬
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.sweetId}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.category} • ${item.price.toFixed(2)} ×{" "}
                      {item.quantity}
                    </p>
                    <p className="font-semibold mt-1">
                      Subtotal: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item.sweetId))}
                    className="p-2 bg-destructive/10 hover:bg-destructive/20 rounded-xl transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-border flex items-center justify-between gap-4">
            <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>

            <button onClick={handleBuy} className="btn-candy px-8 py-3 text-lg">
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
