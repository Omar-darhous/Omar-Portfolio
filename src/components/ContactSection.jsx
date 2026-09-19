import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Github,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: t("contact.valNameRequired"),
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: t("contact.valEmailRequired"),
        variant: "destructive",
      });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: t("contact.valEmailInvalid"),
        variant: "destructive",
      });
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: t("contact.valMessageLength"),
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xwpbojaj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: t("contact.toastSuccessTitle"),
          description: t("contact.toastSuccessDesc"),
          variant: "success",
          className:
            "bg-green-600 text-white dark:bg-green-500 border border-green-700 shadow-lg",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: t("contact.toastErrorTitle"),
        description: t("contact.toastErrorDesc"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 relative bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium rounded-full bg-primary/10 text-primary mb-3 sm:mb-4">
            {t("contact.badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {t("contact.title")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8 p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-secondary/20 to-background border border-border text-start">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-primary shrink-0"></span>
              {t("contact.detailsTitle")}
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-accent/30 rounded-lg sm:rounded-xl transition-all duration-300">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary shrink-0">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t("contact.email")}
                  </p>
                  <a
                    href="mailto:omardarhous111@gmail.com"
                    className="text-sm sm:text-base font-medium hover:text-primary transition-colors"
                  >
                    omardarhous111@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-accent/30 rounded-lg sm:rounded-xl transition-all duration-300">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary shrink-0">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t("contact.phone")}
                  </p>
                  <a
                    href="tel:+201032960398"
                    className="text-sm sm:text-base font-medium hover:text-primary transition-colors"
                    dir="ltr"
                  >
                    +20 1032960398
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-accent/30 rounded-lg sm:rounded-xl transition-all duration-300">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary shrink-0">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t("contact.location")}
                  </p>
                  <span className="text-sm sm:text-base font-medium">
                    {t("contact.locationValue")}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8">
              <h4 className="font-medium mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                {t("contact.findMeOn")}
              </h4>
              <div className="flex gap-2 sm:gap-3">
                {[
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/in/omar-darhous-0560b21a7/",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    url: "https://github.com/Omar-darhous",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-accent hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-card border border-border shadow-sm text-start">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <span className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-primary shrink-0"></span>
              {t("contact.formTitle")}
            </h3>

            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
                >
                  {t("contact.nameLabel")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all text-sm sm:text-base text-start"
                  placeholder={t("contact.namePlaceholder")}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
                >
                  {t("contact.emailLabel")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all text-sm sm:text-base text-start"
                  placeholder={t("contact.emailPlaceholder")}
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="message"
                  className="text-xs sm:text-sm font-medium text-muted-foreground"
                >
                  {t("contact.messageLabel")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none text-sm sm:text-base text-start"
                  placeholder={t("contact.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:opacity-90 transition-all duration-300 shadow-lg shadow-primary/20 text-sm sm:text-base",
                  isSubmitting && "opacity-80 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                    {t("contact.sending")}
                  </>
                ) : (
                  <>
                    {t("contact.sendMessage")}
                    <Send size={16} className="sm:size-[18px] rtl:rotate-180" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
