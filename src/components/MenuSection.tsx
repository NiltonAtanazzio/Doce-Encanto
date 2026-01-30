import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

import brigadeirosImg from "@/assets/brigadeiros.jpg";
import browniesImg from "@/assets/brownies.jpg";
import donutsImg from "@/assets/donuts.jpg";
import cupcakesImg from "@/assets/cupcakes.jpg";
import trufasImg from "@/assets/trufas.jpg";
import personalizadosImg from "@/assets/personalizados.jpg";

const menuItems = [
  { id: "brig-tradicional", name: "Brigadeiros Gourmet", description: "Tradicional, Ninho, Pistache, Café e mais sabores exclusivos", price: 4.50, priceNote: "unidade", image: brigadeirosImg, tag: "Mais Vendido" as const, category: "brigadeiros" },
  { id: "brownie-tradicional", name: "Brownies Premium", description: "Chocolate belga com nozes, recheio cremoso de caramelo", price: 12.00, priceNote: "unidade", image: browniesImg, tag: null, category: "brownies" },
  { id: "donut-chocolate", name: "Donuts Artesanais", description: "Glaceados, recheados com cremes especiais e toppings", price: 8.00, priceNote: "unidade", image: donutsImg, tag: "Novo" as const, category: "donuts" },
  { id: "cupcake-redvelvet", name: "Cupcakes Decorados", description: "Baunilha, red velvet, chocolate com coberturas artísticas", price: 9.00, priceNote: "unidade", image: cupcakesImg, tag: null, category: "cupcakes" },
  { id: "trufa-champagne", name: "Trufas Finas", description: "Champagne, maracujá, framboesa e chocolate 70% cacau", price: 6.00, priceNote: "unidade", image: trufasImg, tag: null, category: "trufas" },
  { id: "pers-evento", name: "Doces Personalizados", description: "Criações exclusivas para seu evento especial", price: 0, priceNote: "", image: personalizadosImg, tag: "Premium" as const, category: "personalizados" },
];

export default function MenuSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { addItem } = useCart();

  const handleAddToCart = (item: typeof menuItems[0]) => {
    if (item.price === 0) {
      window.open(`https://wa.me/5515997755982?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre: ${item.name}`)}`, "_blank");
      return;
    }
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image, category: item.category, quantity: 1 });
    toast({
      title: "Adicionado ao carrinho! 🛒",
      description: `1x ${item.name}`,
      action: <a href="/carrinho" className="text-primary font-medium hover:underline">Ver carrinho</a>,
    });
  };

  const formatPrice = (price: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price);

  return (
    <section id="cardapio" className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-rose-gold/5 rounded-full blur-3xl" />
      <div className="container-custom relative z-10" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary/20 shadow-soft mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Nossos Doces</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Cardápio <span className="gradient-text">Irresistível</span></h2>
          <p className="text-lg text-muted-foreground">Descubra nossa seleção de doces artesanais, feitos com amor e os melhores ingredientes</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuItems.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 * index, duration: 0.5 }} className="group">
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.tag && (
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.tag === "Mais Vendido" ? "bg-gradient-to-r from-primary to-rose-gold text-white" : item.tag === "Novo" ? "bg-gradient-to-r from-lilac to-primary text-white" : "bg-gradient-to-r from-rose-gold to-gold text-white"}`}>{item.tag}</span>
                    </div>
                  )}
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} whileHover={{ scale: 1.1 }} className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="hero" size="icon" className="rounded-full shadow-premium" onClick={() => handleAddToCart(item)}><Plus className="w-5 h-5" /></Button>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {item.price > 0 ? (<><span className="text-xl font-bold gradient-text">{formatPrice(item.price)}</span>{item.priceNote && <span className="text-xs text-muted-foreground ml-1">/{item.priceNote}</span>}</>) : (<span className="text-lg font-semibold text-primary">Sob consulta</span>)}
                    </div>
                    <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors" onClick={() => handleAddToCart(item)}>{item.price > 0 ? "Adicionar" : "Consultar"}</Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.8 }} className="text-center mt-12">
          <Link to="/cardapio"><Button variant="heroOutline" size="lg">Ver Cardápio Completo<ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
        </motion.div>
      </div>
    </section>
  );
}
