import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNavigate } from "@tanstack/react-router";
import { Lock, LogIn, UserPlus } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose();
    navigate({ to: "/signin" });
  };

  const handleSignUp = () => {
    onClose();
    navigate({ to: "/signup" });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="bg-card border-border text-foreground max-w-sm rounded-sm"
        data-ocid="auth.modal"
      >
        <DialogHeader className="items-center text-center">
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-2">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="font-display font-800 text-xl uppercase tracking-tight text-foreground">
            Sign In Required
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground leading-relaxed text-center">
            Create an account or sign in to add items to your cart or wishlist
            and place orders.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-2">
          <Button
            onClick={handleSignIn}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm gap-2"
            data-ocid="auth.signin.button"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
          <Button
            onClick={handleSignUp}
            variant="outline"
            className="w-full border-border hover:border-primary/50 hover:bg-primary/5 font-display font-700 tracking-widest uppercase rounded-sm gap-2 text-foreground"
            data-ocid="auth.signup.button"
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </Button>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-display font-600 tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors text-center mt-1"
            data-ocid="auth.close_button"
          >
            Maybe Later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
