import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  AlertCircle,
  Bike,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllBikes, useSubmitInquiry } from "../hooks/useQueries";

interface FormData {
  name: string;
  email: string;
  phone: string;
  bikeId: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  bikeId?: string;
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }
  if (!data.phone.trim()) errors.phone = "Phone number is required";
  if (!data.bikeId) errors.bikeId = "Please select a bike";
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function ContactPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { bikeId?: string };
  const { data: bikes } = useGetAllBikes();
  const submitInquiry = useSubmitInquiry();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    bikeId: search?.bikeId ?? "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (search?.bikeId) {
      setFormData((prev) => ({ ...prev, bikeId: search.bikeId! }));
    }
  }, [search?.bikeId]);

  const update = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await submitInquiry.mutateAsync({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        bikeId: BigInt(formData.bikeId),
        message: formData.message.trim(),
      });
      navigate({ to: "/contact/success" });
    } catch (_err) {
      setSubmitError("Failed to submit inquiry. Please try again.");
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="font-display text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Get In Touch
          </p>
          <h1 className="font-display font-900 text-4xl sm:text-5xl uppercase tracking-tight text-foreground mb-3">
            Inquire About a Bike
          </h1>
          <p className="text-muted-foreground font-body max-w-lg">
            Fill out the form below and our team will get back to you within 24
            hours with pricing, availability, and test ride options.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} noValidate>
              <div className="bg-card border border-border rounded-sm p-6 sm:p-8 space-y-6">
                {submitError && (
                  <Alert variant="destructive" className="rounded-sm">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                )}

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="font-display text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5" />
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="John Doe"
                      className={`bg-background border-border rounded-sm font-body ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-destructive text-xs font-body">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="font-display text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Email Address <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="john@example.com"
                      className={`bg-background border-border rounded-sm font-body ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-destructive text-xs font-body">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Bike */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="phone"
                      className="font-display text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Phone Number <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className={`bg-background border-border rounded-sm font-body ${errors.phone ? "border-destructive" : ""}`}
                    />
                    {errors.phone && (
                      <p className="text-destructive text-xs font-body">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="bike"
                      className="font-display text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5"
                    >
                      <Bike className="w-3.5 h-3.5" />
                      Bike of Interest <span className="text-primary">*</span>
                    </Label>
                    <Select
                      value={formData.bikeId}
                      onValueChange={(v) => update("bikeId", v)}
                    >
                      <SelectTrigger
                        id="bike"
                        className={`bg-background border-border rounded-sm font-body ${errors.bikeId ? "border-destructive" : ""}`}
                      >
                        <SelectValue placeholder="Select a bike..." />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border rounded-sm">
                        {bikes?.map((bike) => (
                          <SelectItem
                            key={bike.id.toString()}
                            value={bike.id.toString()}
                            className="font-body"
                          >
                            {bike.brand} {bike.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.bikeId && (
                      <p className="text-destructive text-xs font-body">
                        {errors.bikeId}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="font-display text-xs tracking-widest uppercase text-muted-foreground flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your interest, preferred test ride dates, or any questions you have..."
                    rows={5}
                    className={`bg-background border-border rounded-sm font-body resize-none ${errors.message ? "border-destructive" : ""}`}
                  />
                  {errors.message && (
                    <p className="text-destructive text-xs font-body">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitInquiry.isPending}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-700 tracking-widest uppercase rounded-sm shadow-glow"
                >
                  {submitInquiry.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-sm p-6">
              <h3 className="font-display font-700 text-sm tracking-widest uppercase text-foreground mb-4">
                What Happens Next?
              </h3>
              <ol className="space-y-4">
                {[
                  {
                    step: "01",
                    text: "We receive your inquiry and review your requirements.",
                  },
                  {
                    step: "02",
                    text: "Our team contacts you within 24 hours.",
                  },
                  {
                    step: "03",
                    text: "We arrange a test ride or virtual walkthrough.",
                  },
                  {
                    step: "04",
                    text: "Finalize your purchase with our experts.",
                  },
                ].map(({ step, text }) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="font-display font-800 text-primary text-sm flex-shrink-0">
                      {step}
                    </span>
                    <p className="text-muted-foreground text-sm font-body leading-relaxed">
                      {text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-sm p-6">
              <h3 className="font-display font-700 text-sm tracking-widest uppercase text-foreground mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-muted-foreground text-sm font-body mb-4">
                Our showroom is open Monday–Saturday, 9am–6pm.
              </p>
              <div className="flex items-center gap-2 text-primary">
                <Phone className="w-4 h-4" />
                <span className="font-display font-600 text-sm tracking-wider">
                  +1 (800) MOTO-VERSE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
