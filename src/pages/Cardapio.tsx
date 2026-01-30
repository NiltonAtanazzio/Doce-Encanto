import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Minus, ShoppingCart, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { products, categories, sortOptions, filterAndSortProducts, type SortOption, type Product } from "@/lib/products";
import { formatCurrency } from "@/lib/whatsapp";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function Cardapio() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("todos");
  const [sort, setSort] = useState<SortOption>("relevancia");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [observation, setObservation] = useState("");
  const { addItem, totalItems } = useCart();

  // Scroll to top when navigating to cart
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, category, search, sort);
  }, [category, search, sort]);

  const handleAddToCart = (product: Product, qty: number = 1, obs: string = "") => {
    if (product.price === 0) {
      window.open(
        `https://wa.me/5515997755982?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre: ${product.name}`)}`,
        "_blank"
      );
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      observation: obs || undefined,
      quantity: qty,
    });

    toast({
      title: "Adicionado ao carrinho! 🛒",
      description: `${qty}x ${product.name}`,
      action: (
        <a href="/carrinho" className="text-primary font-medium hover:underline">
          Ver carrinho
        </a>
      ),
    });
  };

  const handleQuickAdd = (product: Product) => {
    handleAddToCart(product, 1);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setObservation("");
  };

  const handleModalAdd = () => {
    if (selectedProduct) {
      handleAddToCart(selectedProduct, quantity, observation);
      setSelectedProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Nosso <span className="gradient-text">Cardápio</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore nossa seleção completa de doces artesanais
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar doces..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 rounded-xl"
              />
            </div>

            {/* Sort */}
            <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
              <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  category === cat.id
                    ? "bg-gradient-to-r from-primary to-rose-gold text-white shadow-glow"
                    : "bg-white/80 border border-border hover:border-primary hover:shadow-soft"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </motion.div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                className="group"
              >
                <div 
                  className="relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-premium transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Tag */}
                    {product.tag && (
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.tag === "Mais Vendido" 
                            ? "bg-gradient-to-r from-primary to-rose-gold text-white"
                            : product.tag === "Novo"
                            ? "bg-gradient-to-r from-lilac to-primary text-white"
                            : product.tag === "Promo"
                            ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
                            : "bg-gradient-to-r from-rose-gold to-gold text-white"
                        }`}>
                          {product.tag}
                        </span>
                      </div>
                    )}

                    {/* Quick Add Button */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuickAdd(product);
                      }}
                      className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-gradient-to-r from-primary to-rose-gold text-white flex items-center justify-center shadow-premium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                    <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.price > 0 ? (
                          <>
                            <span className="text-xl font-bold gradient-text">
                              {formatCurrency(product.price)}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              /{product.priceNote}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-semibold text-primary">
                            Sob consulta
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                Nenhum produto encontrado 😢
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setCategory("todos");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Product Detail Modal */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-lg">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Image */}
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description */}
                <p className="text-muted-foreground">
                  {selectedProduct.fullDescription || selectedProduct.description}
                </p>

                {/* Ingredients */}
                {selectedProduct.ingredients && (
                  <div>
                    <h4 className="font-semibold mb-2">Ingredientes:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.ingredients.map((ing) => (
                        <span
                          key={ing}
                          className="px-3 py-1 bg-blush rounded-full text-sm"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Allergens */}
                {selectedProduct.allergens && selectedProduct.allergens.length > 0 && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-xl">
                    ⚠️ Contém: {selectedProduct.allergens.join(", ")}
                  </div>
                )}

                {/* Price */}
                <div className="text-2xl font-bold gradient-text">
                  {selectedProduct.price > 0 
                    ? formatCurrency(selectedProduct.price) 
                    : "Sob consulta"}
                  {selectedProduct.priceNote && selectedProduct.price > 0 && (
                    <span className="text-sm text-muted-foreground font-normal ml-1">
                      /{selectedProduct.priceNote}
                    </span>
                  )}
                </div>

                {selectedProduct.price > 0 && (
                  <>
                    {/* Quantity */}
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Quantidade:</span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="text-xl font-semibold w-8 text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Observation */}
                    <div>
                      <label className="block font-medium mb-2">
                        Observação (opcional):
                      </label>
                      <Textarea
                        placeholder="Ex: sem amendoim, menos doce..."
                        value={observation}
                        onChange={(e) => setObservation(e.target.value)}
                        className="resize-none"
                        rows={2}
                      />
                    </div>

                    {/* Add Button */}
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleModalAdd}
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Adicionar {formatCurrency(selectedProduct.price * quantity)}
                    </Button>
                  </>
                )}

                {selectedProduct.price === 0 && (
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      window.open(
                        `https://wa.me/5515997755982?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre: ${selectedProduct.name}`)}`,
                        "_blank"
                      );
                    }}
                  >
                    Solicitar Orçamento
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <motion.a
          href="/carrinho"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-24 right-6 z-40"
          aria-label={`Ver carrinho com ${totalItems} itens`}
        >
          <Button variant="hero" size="lg" className="rounded-full shadow-premium">
            <ShoppingCart className="w-5 h-5" />
            <span className="ml-2">{totalItems}</span>
          </Button>
        </motion.a>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
