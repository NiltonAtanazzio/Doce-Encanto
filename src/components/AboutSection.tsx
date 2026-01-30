import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cherry, Gift, Heart, Sparkles } from "lucide-react";
import aboutChef from "@/assets/about-chef.jpg";

const features = [
  {
    icon: Cherry,
    title: "Ingredientes Premium",
    description: "Selecionamos os melhores ingredientes para criar doces de qualidade excepcional.",
    gradient: "from-primary to-rose-gold",
  },
  {
    icon: Gift,
    title: "Embalagens Elegantes",
    description: "Cada pedido é cuidadosamente embalado para tornar o momento ainda mais especial.",
    gradient: "from-rose-gold to-gold",
  },
  {
    icon: Heart,
    title: "Produção Artesanal",
    description: "Feitos à mão com amor e dedicação, preservando a tradição da confeitaria.",
    gradient: "from-lilac to-primary",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-padding bg-cream relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-lilac/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-premium">
                <img
                  src={aboutChef}
                  alt="Confeiteira preparando doces artesanais"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute -right-8 bottom-12 glass-card-strong p-6 rounded-2xl shadow-premium max-w-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center flex-shrink-0 animate-glow">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold gradient-text">5 Anos</div>
                    <div className="text-sm text-muted-foreground">Criando momentos doces</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary/20 shadow-soft mb-6"
            >
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Nossa História</span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Tradição e <span className="gradient-text">inovação</span> em cada mordida
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nascemos do amor pela confeitaria e do desejo de criar experiências 
              únicas através de doces extraordinários. Cada receita é desenvolvida 
              com carinho, combinando técnicas tradicionais com toques modernos 
              que surpreendem e encantam.
            </p>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Nossa missão é transformar momentos simples em lembranças inesquecíveis, 
              através de sabores que aquecem o coração e celebram a vida.
            </p>

            {/* Features Grid */}
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 hover:shadow-soft transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
