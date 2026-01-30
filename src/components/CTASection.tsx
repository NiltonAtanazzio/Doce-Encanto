import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const message = "Olá! Gostaria de fazer um pedido";
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, hsl(340, 75%, 65%) 0%, hsl(15, 70%, 70%) 50%, hsl(40, 80%, 55%) 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
          </div>

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
                               radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 px-8 py-16 md:py-24 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Peça Agora</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto"
            >
              Pronto para adoçar seu dia?
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-white/80 max-w-xl mx-auto mb-10"
            >
              Faça seu pedido pelo WhatsApp e receba doces fresquinhos na sua
              porta
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="whatsapp"
                size="xl"
                className="w-full sm:w-auto shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(37,211,102,0.5)]"
                asChild
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
                >
                  <MessageCircle className="w-6 h-6 shrink-0" />
                  <span className="ml-2 break-words">
                    Fazer Pedido pelo WhatsApp
                  </span>
                </a>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/60 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Resposta em minutos
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Entrega no mesmo dia
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                Pagamento flexível
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
