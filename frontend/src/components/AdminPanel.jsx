import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  X,
  Plus,
  Save,
  Trash2,
  Package,
  RefreshCw,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import {
  addSweetLocal,
  updateSweetLocal,
  deleteSweetLocal,
  updateStockLocal
} from "../slices/sweetSlice";
import {
  addSweet,
  updateSweet,
  deleteSweet as deleteSweetApi,
  restockSweet
} from "../api";

const AdminPanel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { sweets } = useSelector((state) => state.sweets);
  const categories = useSelector((state) => state.sweets.categories.slice(1));
  const [activeTab, setActiveTab] = useState("add");
  const [editingSweet, setEditingSweet] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [restockAmount, setRestockAmount] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    imageFile: null,
    previewImage: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      quantity: "",
      imageFile: null,
      previewImage: ""
    });
    setEditingSweet(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const sweetData = new FormData();
    sweetData.append("name", formData.name);
    sweetData.append("category", formData.category);
    sweetData.append("price", formData.price);
    sweetData.append("quantity", formData.quantity);
    if (formData.imageFile) {
      sweetData.append("image", formData.imageFile);
    } else if (!editingSweet) {
      toast.error("Image is required!");
      setIsLoading(false);
      return;
    }
    try {
      let res;
      if (editingSweet) {
        res = await updateSweet(editingSweet._id, sweetData);
        dispatch(updateSweetLocal(res.data));
        toast.success("Sweet updated!");
      } else {
        res = await addSweet(sweetData);
        dispatch(addSweetLocal(res.data));
        toast.success("Sweet added!");
      }
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setFormData({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
      imageFile: null,
      previewImage: sweet.image
    });
    setActiveTab("add");
  };

  const handleRestock = async (sweetId) => {
    const amount = parseInt(restockAmount[sweetId]);
    if (!amount || amount <= 0) {
      toast.error("Enter a valid quantity!");
      return;
    }
    try {
      const res = await restockSweet(sweetId, amount);
      dispatch(updateStockLocal(res.data));
      toast.success("Restocked!");
      setRestockAmount((prev) => ({ ...prev, [sweetId]: "" }));
    } catch (err) {
      toast.error(err.response?.data?.message || "Restock failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSweetApi(id);
      dispatch(deleteSweetLocal(id));
      toast.success("Deleted!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
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
              <Package className="w-6 h-6 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-fredoka">Admin Panel</h2>
              <p className="text-sm text-muted-foreground">
                Manage your sweet inventory
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
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab("add")}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === "add"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            {editingSweet ? "Edit Sweet" : "Add Sweet"}
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex-1 py-4 font-semibold transition-colors ${
              activeTab === "inventory"
                ? "text-primary border-b-2 border-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Inventory
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === "add" ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Sweet Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Rainbow Lollipop"
                    className="input-candy"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g., Lollipops"
                    list="categories"
                    className="input-candy"
                    required
                  />
                  <datalist id="categories">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="input-candy"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Initial Stock
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className="input-candy"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Sweet Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData((prev) => ({
                          ...prev,
                          previewImage: reader.result,
                          imageFile: file
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="input-candy"
                  required={!editingSweet}
                />
                {(formData.previewImage ||
                  (editingSweet && editingSweet.image)) && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-3">Preview:</p>
                    <img
                      src={formData.previewImage || editingSweet?.image}
                      alt="Sweet preview"
                      className="w-full h-64 object-cover rounded-2xl shadow-candy"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                {editingSweet && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 rounded-2xl font-semibold bg-muted hover:bg-muted/80 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-candy flex items-center gap-2 flex-1"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{editingSweet ? "Update Sweet" : "Add Sweet"}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {sweets.map((sweet) => (
                <div
                  key={sweet._id}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-colors"
                >
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold">{sweet.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {sweet.category} • ${sweet.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        sweet.quantity === 0
                          ? "bg-destructive/20 text-destructive"
                          : sweet.quantity < 20
                          ? "bg-accent/20 text-accent"
                          : "bg-secondary/20 text-secondary"
                      }`}
                    >
                      {sweet.quantity} in stock
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      value={restockAmount[sweet._id] || ""}
                      onChange={(e) =>
                        setRestockAmount((prev) => ({
                          ...prev,
                          [sweet._id]: e.target.value
                        }))
                      }
                      className="w-20 px-3 py-2 rounded-xl bg-card border border-border text-sm"
                      min="1"
                    />
                    <button
                      onClick={() => handleRestock(sweet._id)}
                      className="p-2 bg-secondary/10 hover:bg-secondary/20 rounded-xl transition-colors"
                      title="Restock"
                    >
                      <RefreshCw className="w-5 h-5 text-secondary" />
                    </button>
                    <button
                      onClick={() => handleEdit(sweet)}
                      className="p-2 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors"
                      title="Edit"
                    >
                      <Save className="w-5 h-5 text-primary" />
                    </button>
                    <button
                      onClick={() => handleDelete(sweet._id)}
                      className="p-2 bg-destructive/10 hover:bg-destructive/20 rounded-xl transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
