import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "@tanstack/react-router";
import { AlertCircle, Bike, Eye, EyeOff, UserPlus } from "lucide-react";
import { type FormEvent, useState } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function SignUpPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!name.trim()) e.name = "Full name is required";
    if (!email.trim()) {
      e.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Please enter a valid email address";
    }
    if (!password) {
      e.password = "Password is required";
    } else if (password.length < 6) {
      e.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      e.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      e.confirmPassword = "Passwords do not match";
    }
    return e;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    const result = signup(name.trim(), email.trim(), password);
    setIsSubmitting(false);
    if (result.success) {
      navigate({ to: "/" });
    } else {
      setErrors({ general: result.error || "Sign up failed." });
    }
  };

  const clearError = (field: keyof FormErrors) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      {/* Background pattern */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.72 0.2 35) 0, oklch(0.72 0.2 35) 1px, transparent 0, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 justify-center mb-8 group"
        >
          <div className="w-9 h-9 bg-primary rounded-sm flex items-center justify-center group-hover:shadow-[0_0_20px_oklch(0.72_0.2_35/0.4)] transition-shadow">
            <Bike className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-800 text-2xl tracking-wider uppercase text-foreground">
            Moto<span className="text-primary">Verse</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-card border border-border rounded-sm p-8">
          <div className="mb-6">
            <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-1">
              Join MotoVerse
            </p>
            <h1 className="font-display font-900 text-3xl uppercase tracking-tight text-foreground">
              Create Account
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Sign up to save to wishlist and place orders
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* General error */}
            {errors.general && (
              <div
                className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-sm px-3 py-2.5"
                data-ocid="signup.error_state"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-destructive">
                  {errors.general}
                </p>
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="signup-name"
                className="font-display text-xs tracking-widest uppercase text-muted-foreground"
              >
                Full Name <span className="text-primary">*</span>
              </Label>
              <Input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  clearError("name");
                }}
                placeholder="Ashwin Kumar"
                autoComplete="name"
                required
                className={`bg-background border-border focus:border-primary rounded-sm font-body ${errors.name ? "border-destructive" : ""}`}
                data-ocid="signup.name.input"
              />
              {errors.name && (
                <p className="flex items-center gap-1 text-xs text-destructive font-body">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="signup-email"
                className="font-display text-xs tracking-widest uppercase text-muted-foreground"
              >
                Email Address <span className="text-primary">*</span>
              </Label>
              <Input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearError("email");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className={`bg-background border-border focus:border-primary rounded-sm font-body ${errors.email ? "border-destructive" : ""}`}
                data-ocid="signup.email.input"
              />
              {errors.email && (
                <p className="flex items-center gap-1 text-xs text-destructive font-body">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="signup-password"
                className="font-display text-xs tracking-widest uppercase text-muted-foreground"
              >
                Password <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError("password");
                  }}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  required
                  className={`bg-background border-border focus:border-primary rounded-sm font-body pr-10 ${errors.password ? "border-destructive" : ""}`}
                  data-ocid="signup.password.input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="flex items-center gap-1 text-xs text-destructive font-body">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="signup-confirm-password"
                className="font-display text-xs tracking-widest uppercase text-muted-foreground"
              >
                Confirm Password <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearError("confirmPassword");
                  }}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  required
                  className={`bg-background border-border focus:border-primary rounded-sm font-body pr-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  data-ocid="signup.confirm_password.input"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="flex items-center gap-1 text-xs text-destructive font-body">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm gap-2 mt-2"
              data-ocid="signup.submit_button"
            >
              <UserPlus className="w-4 h-4" />
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Sign in link */}
          <p className="text-center font-body text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-primary hover:text-primary/80 font-600 hover:underline transition-colors"
              data-ocid="signup.signin.link"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* Back to browse */}
        <p className="text-center mt-4">
          <Link
            to="/"
            className="text-xs font-display font-600 tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Continue Browsing Without Signing Up
          </Link>
        </p>
      </div>
    </div>
  );
}
