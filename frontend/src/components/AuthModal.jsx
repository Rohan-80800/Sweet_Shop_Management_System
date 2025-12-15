import { useState } from "react";
import { useDispatch } from "react-redux";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setUser, setAuthError } from "../slices/authSlice";
import { loginUser, registerUser } from "../api";

const AuthModal = ({ isOpen, onClose, mode, onSwitchMode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const isLogin = mode === "login";

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Min 6 characters";
    if (!isLogin && formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            fullName: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role
          };

      const res = await (isLogin ? loginUser : registerUser)(payload);
      dispatch(setUser(res.data));
      toast.success(isLogin ? "Logged in!" : "Account created!");
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (isLogin ? "Login failed" : "Registration failed");
      dispatch(setAuthError(msg));
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="h-16 gradient-candy relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 bg-card rounded-full hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="w-12 h-12 mx-auto -mt-10 mb-4 rounded-xl gradient-candy flex items-center justify-center shadow-candy">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>

          <h2 className="text-xl sm:text-2xl font-fredoka text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {isLogin ? "Sign in to continue" : "Join us for exclusive treats"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-candy ${
                      errors.name ? "border-destructive" : ""
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="input-candy h-10"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className={`input-candy ${
                  errors.email ? "border-destructive" : ""
                }`}
              />
              {errors.email && (
                <p className="text-xs text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`input-candy pr-12 ${
                  errors.password ? "border-destructive" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              {errors.password && (
                <p className="text-xs text-destructive mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {!isLogin && (
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`input-candy ${
                    errors.confirmPassword ? "border-destructive" : ""
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-candy w-full py-3 flex justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Please wait
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-muted-foreground">
            {isLogin ? "No account?" : "Already registered?"}{" "}
            <button
              onClick={onSwitchMode}
              className="text-primary font-semibold"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
