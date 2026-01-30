import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Gift, Heart, Users, PartyPopper, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { generateKitsQuestionMessage, generateWhatsAppURL, WHATSAPP_NUMBER } from "@/lib/whatsapp";

const kits = [
  {
    id: "kit-aniversario",
    icon: PartyPopper,
    name: "Kit Aniversário",
    description: "Seleção especial para celebrar datas memoráveis com doces exclusivos",
    items: "30 brigadeiros + 12 cupcakes + 6 brownies",
    price: 189.00,
    priceDisplay: "R$ 189,00",
    gradient: "from-primary via-rose-gold to-gold",
    image: "/placeholder.svg",
  },
  {
    id: "kit-presente",
    icon: Gift,
    name: "Kit Presente",
    description: "Perfeito para surpreender quem você ama com elegância",
    items: "20 trufas + 15 brigadeiros + caixa premium",
    price: 129.00,
    priceDisplay: "R$ 129,00",
    gradient: "from-rose-gold via-gold to-rose-gold",
    image: "/placeholder.svg",
  },
  {
    id: "kit-casal",
    icon: Heart,
    name: "Kit Casal",
    description: "Momentos românticos pedem doces especiais",
    items: "12 trufas + 8 brigadeiros + 2 mini tortas",
    price: 99.00,
    priceDisplay: "R$ 99,00",
    gradient: "from-lilac via-primary to-rose-gold",
    image: "/placeholder.svg",
  },
  {
    id: "kit-festas",
    icon: Users,
    name: "Kit Festas",
    description: "Para eventos corporativos e comemorações maiores",
    items: "100 doces variados + embalagens personalizadas",
    price: 350.00,
    priceDisplay: "A partir de R$ 350,00",
    gradient: "from-gold via-rose-gold to-primary",
    image: "/placeholder.svg",
  },
];

export default function SpecialKitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addItem } = useCart();

  const handleAddKitToCart = (kit: typeof kits[0]) => {
    addItem({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      image: kit.image,
      category: "kits",
    });
    
    toast({
      title: "Kit adicionado ao carrinho! 🎁",
      description: kit.name,
    });
  };

  const handleContactClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById("contato");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWhatsAppContact = () => {
    const message = generateKitsQuestionMessage();
    const url = generateWhatsAppURL(message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="kits"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(340, 60%, 95%) 0%, hsl(15, 50%, 95%) 50%, hsl(270, 40%, 95%) 100%)",
      }}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-rose-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-lilac/10 rounded-full blur-3xl translate-x-1/2" />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-gold/20 to-transparent" />
      </div>

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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-rose-gold/30 shadow-soft mb-6"
          >
            <Gift className="w-4 h-4 text-rose-gold" />
            <span className="text-sm font-medium gradient-text-gold">Coleção Exclusiva</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Kits <span className="gradient-text-gold">Especiais</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Combinações perfeitas para cada momento especial da sua vida
          </p>
        </motion.div>

        {/* Kits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kits.map((kit, index) => (
            <motion.div
              key={kit.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="group"
            >
              <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/50 shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-3">
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${kit.gradient}`} />

                {/* Content */}
                <div className="p-6 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${kit.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                    <kit.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{kit.name}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {kit.description}
                  </p>

                  {/* Items included */}
                  <div className="bg-blush/50 rounded-xl p-3 mb-5">
                    <p className="text-xs text-muted-foreground font-medium">
                      {kit.items}
                    </p>
                  </div>

                  {/* Price & CTA */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="text-2xl font-bold gradient-text-gold mb-4">
                      {kit.priceDisplay}
                    </div>
                    <Button 
                      variant="premium" 
                      size="default" 
                      className="w-full group-hover:shadow-glow"
                      onClick={() => handleAddKitToCart(kit)}
                      aria-label={`Encomendar ${kit.name}`}
                    >
                      Encomendar
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-foreground to-foreground/90 p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/20 to-rose-gold/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-br from-lilac/20 to-primary/20 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Quer um kit personalizado?
                </h3>
                <p className="text-white/70">
                  Criamos kits exclusivos para seu evento especial
                </p>
              </div>
              <Button 
                variant="glass" 
                size="lg" 
                className="flex-shrink-0"
                onClick={handleContactClick}
                aria-label="Fale conosco sobre kits personalizados"
              >
                Fale Conosco
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
