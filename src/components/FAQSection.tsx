import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    icon: "📦",
    question: "Vocês fazem entrega?",
    answer: "Sim, realizamos entregas conforme região e disponibilidade.",
  },
  {
    icon: "⏰",
    question: "Qual o prazo de produção?",
    answer:
      "O prazo pode variar conforme o pedido e a demanda do dia. Para encomendas maiores ou personalizadas, recomendamos entrar em contato com antecedência.",
  },
  {
    icon: "💳",
    question: "Como funciona o pagamento?",
    answer:
      "As informações de pagamento são combinadas diretamente no atendimento pelo WhatsApp. Aceitamos PIX, dinheiro e cartões.",
  },
  {
    icon: "🍬",
    question: "Vocês trabalham sob encomenda?",
    answer:
      "Sim, todos os nossos doces são preparados sob encomenda para garantir a máxima frescura e qualidade.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-lilac/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream border border-primary/20 shadow-soft mb-6"
          >
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Tire suas dúvidas
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Dúvidas <span className="gradient-text">frequentes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Encontre respostas para as perguntas mais comuns
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-cream/50 backdrop-blur-sm rounded-xl border border-white/50 shadow-soft px-6 overflow-hidden data-[state=open]:shadow-card transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-xl" role="img" aria-hidden="true">
                        {faq.icon}
                      </span>
                      <span className="font-semibold text-foreground">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed pl-10">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
