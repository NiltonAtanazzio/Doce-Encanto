import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  MessageCircle,
  Send,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  contactFormSchema,
  formatPhoneNumber,
  type ContactFormData,
} from "@/lib/validation";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/whatsapp";

const contactInfo = [
  {
    icon: Phone,
    label: "WhatsApp",
    value: WHATSAPP_NUMBER,
    link: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os doces 🍬")}`,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@doceencanto",
    link: INSTAGRAM_URL,
  },
  {
    icon: MapPin,
    label: "Endereço",
    value: "Rua das Flores, 123 - Sorocaba",
    link: null,
  },
  {
    icon: Clock,
    label: "Horário",
    value: "Seg-Sáb: 9h às 19h",
    link: null,
  },
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (
    field: keyof ContactFormData,
    value: string,
  ): string | undefined => {
    try {
      const fieldSchema = contactFormSchema.shape[field];
      fieldSchema.parse(value);
      return undefined;
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error &&
        Array.isArray((error as { errors: { message: string }[] }).errors)
      ) {
        return (error as { errors: { message: string }[] }).errors[0]?.message;
      }

      if (error instanceof Error) {
        return error.message;
      }

      return "Erro inesperado.";
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    let processedValue = value;

    // Format phone number (only digits)
    if (field === "phone") {
      processedValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({ ...prev, [field]: processedValue }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    const error = validateField(field, formData[field]);
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Web3Forms API - free and reliable
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f807b1fc-01e5-431a-9ab6-d7ca5d25e93a",
          subject: `Novo contato de ${formData.name} - Doce Encanto`,
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          timestamp: new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
          }),
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Mensagem enviada com sucesso! ✨",
          description: "Entraremos em contato em breve.",
        });

        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("Falha ao enviar");
      }
    } catch (error) {
      toast({
        title: "Não foi possível enviar agora",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contato"
      className="section-padding bg-cream relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-lilac/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary/20 shadow-soft mb-6"
          >
            <MessageCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Fale Conosco
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Estamos prontos para criar doces incríveis para você
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-8">Informações de Contato</h3>

            <div className="space-y-6 mb-10">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${info.label}: ${info.value}`}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:shadow-soft hover:bg-white/80 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {info.label}
                        </div>
                        <div className="font-semibold">{info.value}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lilac to-primary flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {info.label}
                        </div>
                        <div className="font-semibold">{info.value}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Siga-nos no Instagram"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os doces 🍬")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Entre em contato pelo WhatsApp"
                className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform shadow-soft"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-card border border-border/50">
              <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium mb-2"
                  >
                    Nome *
                  </label>
                  <Input
                    id="contact-name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={`h-12 rounded-xl border-border/50 focus:border-primary ${
                      errors.name
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      className="text-sm text-destructive mt-1.5"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium mb-2"
                  >
                    E-mail *
                  </label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={`h-12 rounded-xl border-border/50 focus:border-primary ${
                      errors.email
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="text-sm text-destructive mt-1.5"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium mb-2"
                  >
                    WhatsApp *
                  </label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="15999999999"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    className={`h-12 rounded-xl border-border/50 focus:border-primary ${
                      errors.phone
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p
                      id="phone-error"
                      className="text-sm text-destructive mt-1.5"
                    >
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium mb-2"
                  >
                    Mensagem *
                  </label>
                  <Textarea
                    id="contact-message"
                    placeholder="Conte-nos sobre seu pedido ou evento..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    className={`rounded-xl border-border/50 focus:border-primary resize-none ${
                      errors.message
                        ? "border-destructive focus:border-destructive"
                        : ""
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="text-sm text-destructive mt-1.5"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting}
                  aria-label={
                    isSubmitting ? "Enviando mensagem..." : "Enviar mensagem"
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
