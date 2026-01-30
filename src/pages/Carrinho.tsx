import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  MessageCircle,
  Edit3,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import {
  formatCurrency,
  openWhatsApp,
  type CheckoutData,
} from "@/lib/whatsapp";
import {
  validateAddress,
  formatCEP,
  type AddressData,
  type AddressErrors,
} from "@/lib/addressValidation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImportantInfoCard from "@/components/ImportantInfoCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CHECKOUT_STORAGE_KEY = "doce-encanto-checkout";

export default function Carrinho() {
  const {
    items,
    removeItem,
    updateQuantity,
    updateObservation,
    clearCart,
    totalPrice,
  } = useCart();
  const [editingObservation, setEditingObservation] = useState<string | null>(
    null,
  );
  const [tempObservation, setTempObservation] = useState("");
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    name: "",
    phone: "",
    address: {
      street: "",
      number: "",
      neighborhood: "",
      city: "Sorocaba-SP",
      cep: "",
      reference: "",
    },
    deliveryType: "retirada",
    observations: "",
  });

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Load checkout data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(CHECKOUT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCheckoutData(parsed);
      } catch (error) {
        console.error("Error loading checkout data:", error);
      }
    }
  }, []);

  // Save checkout data to localStorage
  useEffect(() => {
    localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutData));
  }, [checkoutData]);

  const updateAddress = (field: keyof AddressData, value: string) => {
    let processedValue = value;
    if (field === "cep") {
      processedValue = formatCEP(value);
    }

    setCheckoutData({
      ...checkoutData,
      address: {
        ...checkoutData.address!,
        [field]: processedValue,
      },
    });

    // Clear error when user types
    if (addressErrors[field as keyof AddressErrors]) {
      setAddressErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateAddressFields = (): boolean => {
    if (checkoutData.deliveryType !== "entrega") return true;

    const errors = validateAddress(checkoutData.address || {});
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (!checkoutData.name.trim()) {
      return;
    }

    if (!validateAddressFields()) {
      return;
    }

    openWhatsApp(items, totalPrice, checkoutData);
  };

  const startEditingObservation = (itemId: string, currentObs: string = "") => {
    setEditingObservation(itemId);
    setTempObservation(currentObs);
  };

  const saveObservation = (itemId: string) => {
    updateObservation(itemId, tempObservation);
    setEditingObservation(null);
  };

  const cancelEditingObservation = () => {
    setEditingObservation(null);
    setTempObservation("");
  };

  const isCheckoutValid = () => {
    if (!checkoutData.name.trim()) return false;
    if (checkoutData.deliveryType === "entrega") {
      const errors = validateAddress(checkoutData.address || {});
      return Object.keys(errors).length === 0;
    }
    return true;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center text-center min-h-[60vh]"
            >
              <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground/30 mb-6" />
              <h1 className="text-3xl font-bold mb-4">
                Seu carrinho está vazio
              </h1>
              <p className="text-muted-foreground mb-8">
                Que tal adicionar alguns doces deliciosos? 🍬
              </p>
              <Link to="/cardapio">
                <Button
                  variant="hero"
                  size="lg"
                  aria-label="Ir para o cardápio"
                >
                  Ver Cardápio
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <Link
                to="/cardapio"
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-2"
                aria-label="Continuar comprando no cardápio"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar comprando
              </Link>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Seu <span className="gradient-text">Carrinho</span>
              </h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
              aria-label="Limpar carrinho"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-4 shadow-card"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(item.price)} /unidade
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            aria-label={`Remover ${item.name} do carrinho`}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Observation */}
                        <div className="mt-2">
                          {editingObservation === item.id ? (
                            <div className="flex gap-2 items-center">
                              <Input
                                value={tempObservation}
                                onChange={(e) =>
                                  setTempObservation(e.target.value)
                                }
                                placeholder="Ex: sem amendoim..."
                                className="h-8 text-sm"
                                autoFocus
                                aria-label="Observação do item"
                              />
                              <button
                                onClick={() => saveObservation(item.id)}
                                className="text-green-600 hover:text-green-700"
                                aria-label="Salvar observação"
                              >
                                <Check className="w-5 h-5" />
                              </button>
                              <button
                                onClick={cancelEditingObservation}
                                className="text-muted-foreground hover:text-destructive"
                                aria-label="Cancelar edição"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                startEditingObservation(
                                  item.id,
                                  item.observation,
                                )
                              }
                              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                              aria-label="Adicionar ou editar observação"
                            >
                              <Edit3 className="w-3 h-3" />
                              {item.observation || "Adicionar observação"}
                            </button>
                          )}
                        </div>

                        {/* Quantity & Subtotal */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                              aria-label="Diminuir quantidade"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                              aria-label="Aumentar quantidade"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-lg font-bold gradient-text">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Checkout Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-8 shadow-card sticky top-24">
                <h2 className="text-xl font-bold mb-6">Finalizar Pedido</h2>

                <div className="space-y-4 px-0.5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-sm font-medium mb-2"
                    >
                      Seu Nome *
                    </label>
                    <Input
                      id="checkout-name"
                      value={checkoutData.name}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Digite seu nome"
                      className="h-11"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="checkout-phone"
                      className="block text-sm font-medium mb-2"
                    >
                      WhatsApp
                    </label>
                    <Input
                      id="checkout-phone"
                      value={checkoutData.phone}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="(00) 00000-0000"
                      className="h-11"
                    />
                  </div>

                  {/* Delivery Type */}
                  <div>
                    <label
                      htmlFor="checkout-delivery"
                      className="block text-sm font-medium mb-2"
                    >
                      Tipo de Entrega
                    </label>
                    <Select
                      value={checkoutData.deliveryType}
                      onValueChange={(v) =>
                        setCheckoutData({
                          ...checkoutData,
                          deliveryType: v as "retirada" | "entrega",
                        })
                      }
                    >
                      <SelectTrigger id="checkout-delivery" className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="retirada">
                          Retirada no local
                        </SelectItem>
                        <SelectItem value="entrega">
                          Entrega (apenas Sorocaba-SP)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Address Fields (if delivery) */}
                  <AnimatePresence>
                    {checkoutData.deliveryType === "entrega" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4"
                      >
                        <p className="text-sm text-muted-foreground bg-blush/50 rounded-lg p-3">
                          📍 Entregas disponíveis apenas em Sorocaba-SP
                        </p>

                        {/* Street */}
                        <div>
                          <label
                            htmlFor="checkout-street"
                            className="block text-sm font-medium mb-2"
                          >
                            Rua *
                          </label>
                          <Input
                            id="checkout-street"
                            value={checkoutData.address?.street || ""}
                            onChange={(e) =>
                              updateAddress("street", e.target.value)
                            }
                            placeholder="Nome da rua"
                            className={`h-11 ${addressErrors.street ? "border-destructive" : ""}`}
                            aria-invalid={!!addressErrors.street}
                          />
                          {addressErrors.street && (
                            <p className="text-sm text-destructive mt-1">
                              {addressErrors.street}
                            </p>
                          )}
                        </div>

                        {/* Number + Neighborhood */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label
                              htmlFor="checkout-number"
                              className="block text-sm font-medium mb-2"
                            >
                              Número *
                            </label>
                            <Input
                              id="checkout-number"
                              value={checkoutData.address?.number || ""}
                              onChange={(e) =>
                                updateAddress("number", e.target.value)
                              }
                              placeholder="Nº"
                              className={`h-11 ${addressErrors.number ? "border-destructive" : ""}`}
                              aria-invalid={!!addressErrors.number}
                            />
                            {addressErrors.number && (
                              <p className="text-sm text-destructive mt-1">
                                {addressErrors.number}
                              </p>
                            )}
                          </div>
                          <div>
                            <label
                              htmlFor="checkout-neighborhood"
                              className="block text-sm font-medium mb-2"
                            >
                              Bairro *
                            </label>
                            <Input
                              id="checkout-neighborhood"
                              value={checkoutData.address?.neighborhood || ""}
                              onChange={(e) =>
                                updateAddress("neighborhood", e.target.value)
                              }
                              placeholder="Bairro"
                              className={`h-11 ${addressErrors.neighborhood ? "border-destructive" : ""}`}
                              aria-invalid={!!addressErrors.neighborhood}
                            />
                            {addressErrors.neighborhood && (
                              <p className="text-sm text-destructive mt-1">
                                {addressErrors.neighborhood}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* CEP */}
                        <div>
                          <label
                            htmlFor="checkout-cep"
                            className="block text-sm font-medium mb-2"
                          >
                            CEP (opcional)
                          </label>
                          <Input
                            id="checkout-cep"
                            value={checkoutData.address?.cep || ""}
                            onChange={(e) =>
                              updateAddress("cep", e.target.value)
                            }
                            placeholder="00000-000"
                            className={`h-11 ${addressErrors.cep ? "border-destructive" : ""}`}
                            aria-invalid={!!addressErrors.cep}
                            maxLength={9}
                          />
                          {addressErrors.cep && (
                            <p className="text-sm text-destructive mt-1">
                              {addressErrors.cep}
                            </p>
                          )}
                        </div>

                        {/* Reference */}
                        <div>
                          <label
                            htmlFor="checkout-reference"
                            className="block text-sm font-medium mb-2"
                          >
                            Ponto de referência (opcional)
                          </label>
                          <Textarea
                            id="checkout-reference"
                            value={checkoutData.address?.reference || ""}
                            onChange={(e) =>
                              updateAddress("reference", e.target.value)
                            }
                            placeholder="Ex: casa dos fundos, portão preto, perto do mercado..."
                            className="resize-none"
                            rows={2}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* General Observations */}
                  <div>
                    <label
                      htmlFor="checkout-observations"
                      className="block text-sm font-medium mb-2"
                    >
                      Observações Gerais (opcional)
                    </label>
                    <Textarea
                      id="checkout-observations"
                      value={checkoutData.observations}
                      onChange={(e) =>
                        setCheckoutData({
                          ...checkoutData,
                          observations: e.target.value,
                        })
                      }
                      placeholder="Alguma observação sobre o pedido..."
                      className="resize-none"
                      rows={2}
                    />
                  </div>
                </div>

                {/* Important Info */}
                <ImportantInfoCard />

                {/* Summary */}
                <div className="border-t border-border mt-6 pt-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Itens</span>
                    <span>
                      {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                      unidades
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-3 border-t">
                    <span>Total</span>
                    <span className="gradient-text">
                      {formatCurrency(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  variant="hero"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleCheckout}
                  disabled={!isCheckoutValid()}
                  aria-label="Finalizar pedido pelo WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Finalizar pelo WhatsApp
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Você será redirecionado para o WhatsApp para confirmar seu
                  pedido
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
