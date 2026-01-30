import { motion } from "framer-motion";
import { Info } from "lucide-react";

const infoItems = [
  "Produção artesanal, feita sob encomenda",
  "Pedidos sujeitos à disponibilidade",
  "Valores podem variar conforme personalização",
  "Entregas conforme região e horário",
];

export default function ImportantInfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-blush/30 to-lilac/20 rounded-xl p-5 border border-primary/10 mt-5"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Info className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-3">
            Informações importantes
          </h4>
          <ul className="space-y-2">
            {infoItems.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
