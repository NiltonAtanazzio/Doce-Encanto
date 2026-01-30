import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, ShoppingCart, MessageCircle, Heart } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: Search,
    title: "Escolha seus doces favoritos",
    description: "Explore o cardápio e selecione o que mais combina com seu momento.",
  },
  {
    number: 2,
    icon: ShoppingCart,
    title: "Adicione ao carrinho",
    description: "Escolha a quantidade desejada e monte seu pedido com facilidade.",
  },
  {
    number: 3,
    icon: MessageCircle,
    title: "Finalize pelo WhatsApp",
    description: "Envie seu pedido de forma rápida e prática.",
  },
  {
    number: 4,
    icon: Heart,
    title: "Preparamos tudo com carinho",
    description: "Produção artesanal feita especialmente para você. 💖",
  },
];

export default function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-lilac/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream border border-primary/20 shadow-soft mb-6"
          >
            <ShoppingCart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Simples e Rápido</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Como funciona o <span className="gradient-text">pedido</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Fazer seu pedido é fácil e rápido. Siga os passos abaixo!
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group"
            >
              <div className="relative bg-cream/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/50 shadow-soft hover:shadow-card transition-all duration-300 h-full">
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-lilac/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/30 to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
