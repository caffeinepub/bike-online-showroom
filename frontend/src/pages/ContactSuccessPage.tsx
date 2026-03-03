import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';

export default function ContactSuccessPage() {
  return (
    <div className="animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-lg mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-primary/10 rounded-sm flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Inquiry Received
          </p>
          <h1 className="font-display font-900 text-4xl sm:text-5xl uppercase tracking-tight text-foreground mb-4">
            Thank You!
          </h1>
          <p className="text-muted-foreground font-body text-lg leading-relaxed mb-10">
            Your inquiry has been successfully submitted. Our team will review your request and get back to you within <strong className="text-foreground">24 hours</strong>.
          </p>

          {/* What to expect */}
          <div className="bg-card border border-border rounded-sm p-6 mb-10 text-left">
            <h2 className="font-display font-700 text-sm tracking-widest uppercase text-foreground mb-4">
              What to Expect
            </h2>
            <ul className="space-y-3">
              {[
                'A confirmation email will be sent to your inbox shortly.',
                'Our sales team will review your inquiry and bike preferences.',
                'We\'ll reach out to schedule a test ride or answer your questions.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 bg-primary/20 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-display font-800 text-primary text-xs">{i + 1}</span>
                  </span>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Browse More Bikes
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border font-display font-700 tracking-widest uppercase rounded-sm"
            >
              <Link to="/contact">
                Submit Another Inquiry
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
