import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { AlertCircle, Bike, Eye, EyeOff, LogIn } from "lucide-react";
import { type FormEvent, useState } from "react";

export default function SignInPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  // @ts-ignore – search params not typed in route config
  const search = useSearch({ strict: false }) as { redirect?: string };
  const redirectTo = search?.redirect || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setIsSubmitting(true);
    const result = login(email.trim(), password);
    setIsSubmitting(false);
    if (result.success) {
      navigate({ to: redirectTo as "/" });
    } else {
      setError(result.error || "Sign in failed.");
    }
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
              Welcome Back
            </p>
            <h1 className="font-display font-900 text-3xl uppercase tracking-tight text-foreground">
              Sign In
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">
              Sign in to manage your cart and wishlist
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Global error */}
            {error && (
              <div
                className="flex items-start gap-2 bg-destructive/10 border border-destructive/30 rounded-sm px-3 py-2.5"
                data-ocid="signin.error_state"
                role="alert"
              >
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <Label
                htmlFor="signin-email"
                className="font-display text-xs tracking-widest uppercase text-muted-foreground"
              >
                Email Address <span className="text-primary">*</span>
              </Label>
              <Input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="bg-background border-border focus:border-primary rounded-sm font-body"
                data-ocid="signin.email.input"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label
                htmlFor="signin-password"
                className="font-display text-xs tracking-widest uppercase text-muted-foreground"
              >
                Password <span className="text-primary">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  autoComplete="current-password"
                  required
                  className="bg-background border-border focus:border-primary rounded-sm font-body pr-10"
                  data-ocid="signin.password.input"
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
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm gap-2 mt-2"
              data-ocid="signin.submit_button"
            >
              <LogIn className="w-4 h-4" />
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="text-center font-body text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:text-primary/80 font-600 hover:underline transition-colors"
              data-ocid="signin.signup.link"
            >
              Sign Up
            </Link>
          </p>
        </div>

        {/* Back to browse */}
        <p className="text-center mt-4">
          <Link
            to="/"
            className="text-xs font-display font-600 tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Continue Browsing Without Signing In
          </Link>
        </p>
      </div>
    </div>
  );
}
