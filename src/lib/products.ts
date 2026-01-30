import brigadeirosImg from "@/assets/brigadeiros.jpg";
import browniesImg from "@/assets/brownies.jpg";
import donutsImg from "@/assets/donuts.jpg";
import cupcakesImg from "@/assets/cupcakes.jpg";
import trufasImg from "@/assets/trufas.jpg";
import personalizadosImg from "@/assets/personalizados.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  priceNote: string;
  image: string;
  category: string;
  tag?: "Mais Vendido" | "Novo" | "Premium" | "Promo";
  ingredients?: string[];
  allergens?: string[];
}

export const categories = [
  { id: "todos", name: "Todos", icon: "🍬" },
  { id: "brigadeiros", name: "Brigadeiros", icon: "🍫" },
  { id: "brownies", name: "Brownies", icon: "🍪" },
  { id: "donuts", name: "Donuts", icon: "🍩" },
  { id: "cupcakes", name: "Cupcakes", icon: "🧁" },
  { id: "trufas", name: "Trufas", icon: "🍬" },
  { id: "personalizados", name: "Personalizados", icon: "🎁" },
  { id: "kits", name: "Kits Especiais", icon: "🎂" },
];

export const products: Product[] = [
  // Brigadeiros
  {
    id: "brig-tradicional",
    name: "Brigadeiro Tradicional",
    description: "O clássico que nunca sai de moda, feito com chocolate belga",
    fullDescription: "Nosso brigadeiro tradicional é preparado com chocolate belga de alta qualidade, leite condensado especial e manteiga artesanal. Cada unidade é enrolada à mão e finalizada com granulado premium.",
    price: 4.50,
    priceNote: "unidade",
    image: brigadeirosImg,
    category: "brigadeiros",
    tag: "Mais Vendido",
    ingredients: ["Chocolate belga", "Leite condensado", "Manteiga", "Granulado"],
    allergens: ["Leite", "Glúten"],
  },
  {
    id: "brig-ninho",
    name: "Brigadeiro de Ninho",
    description: "Cremoso brigadeiro de leite ninho com toque de baunilha",
    price: 5.00,
    priceNote: "unidade",
    image: brigadeirosImg,
    category: "brigadeiros",
    ingredients: ["Leite ninho", "Leite condensado", "Manteiga", "Baunilha"],
    allergens: ["Leite"],
  },
  {
    id: "brig-pistache",
    name: "Brigadeiro de Pistache",
    description: "Exclusivo brigadeiro de pistache importado da Sicília",
    price: 7.00,
    priceNote: "unidade",
    image: brigadeirosImg,
    category: "brigadeiros",
    tag: "Premium",
    ingredients: ["Pasta de pistache", "Leite condensado", "Manteiga"],
    allergens: ["Leite", "Nozes"],
  },
  {
    id: "brig-cafe",
    name: "Brigadeiro de Café",
    description: "Para os amantes de café, sabor intenso e aromático",
    price: 5.50,
    priceNote: "unidade",
    image: brigadeirosImg,
    category: "brigadeiros",
    tag: "Novo",
    ingredients: ["Café especial", "Chocolate", "Leite condensado", "Manteiga"],
    allergens: ["Leite"],
  },
  {
    id: "brig-churros",
    name: "Brigadeiro de Churros",
    description: "Com doce de leite e canela, uma explosão de sabor",
    price: 5.50,
    priceNote: "unidade",
    image: brigadeirosImg,
    category: "brigadeiros",
    ingredients: ["Doce de leite", "Canela", "Leite condensado", "Manteiga"],
    allergens: ["Leite"],
  },
  // Brownies
  {
    id: "brownie-tradicional",
    name: "Brownie Tradicional",
    description: "Chocolate belga intenso com nozes crocantes",
    price: 12.00,
    priceNote: "unidade",
    image: browniesImg,
    category: "brownies",
    tag: "Mais Vendido",
    ingredients: ["Chocolate belga 70%", "Manteiga", "Nozes", "Açúcar mascavo"],
    allergens: ["Leite", "Nozes", "Glúten", "Ovos"],
  },
  {
    id: "brownie-caramelo",
    name: "Brownie de Caramelo Salgado",
    description: "Recheio cremoso de caramelo salgado irresistível",
    price: 14.00,
    priceNote: "unidade",
    image: browniesImg,
    category: "brownies",
    tag: "Premium",
    ingredients: ["Chocolate", "Caramelo salgado", "Flor de sal", "Nozes"],
    allergens: ["Leite", "Nozes", "Glúten", "Ovos"],
  },
  {
    id: "brownie-nutella",
    name: "Brownie de Nutella",
    description: "Recheado e coberto com Nutella cremosa",
    price: 14.00,
    priceNote: "unidade",
    image: browniesImg,
    category: "brownies",
    tag: "Novo",
    ingredients: ["Chocolate", "Nutella", "Avelãs"],
    allergens: ["Leite", "Nozes", "Glúten", "Ovos"],
  },
  // Donuts
  {
    id: "donut-glaceado",
    name: "Donut Glaceado Clássico",
    description: "Massa fofinha com cobertura açucarada perfeita",
    price: 8.00,
    priceNote: "unidade",
    image: donutsImg,
    category: "donuts",
    ingredients: ["Farinha especial", "Açúcar de confeiteiro", "Leite"],
    allergens: ["Leite", "Glúten", "Ovos"],
  },
  {
    id: "donut-chocolate",
    name: "Donut de Chocolate",
    description: "Cobertura de chocolate belga e granulado colorido",
    price: 9.00,
    priceNote: "unidade",
    image: donutsImg,
    category: "donuts",
    tag: "Mais Vendido",
    ingredients: ["Chocolate belga", "Granulado", "Massa especial"],
    allergens: ["Leite", "Glúten", "Ovos"],
  },
  {
    id: "donut-morango",
    name: "Donut de Morango",
    description: "Glaceado rosa com recheio cremoso de morango",
    price: 10.00,
    priceNote: "unidade",
    image: donutsImg,
    category: "donuts",
    tag: "Novo",
    ingredients: ["Morango fresco", "Creme", "Açúcar"],
    allergens: ["Leite", "Glúten", "Ovos"],
  },
  // Cupcakes
  {
    id: "cupcake-baunilha",
    name: "Cupcake de Baunilha",
    description: "Massa amanteigada com buttercream de baunilha",
    price: 9.00,
    priceNote: "unidade",
    image: cupcakesImg,
    category: "cupcakes",
    ingredients: ["Baunilha de Madagascar", "Buttercream", "Manteiga"],
    allergens: ["Leite", "Glúten", "Ovos"],
  },
  {
    id: "cupcake-redvelvet",
    name: "Cupcake Red Velvet",
    description: "O clássico americano com cream cheese frosting",
    price: 11.00,
    priceNote: "unidade",
    image: cupcakesImg,
    category: "cupcakes",
    tag: "Mais Vendido",
    ingredients: ["Cacau", "Cream cheese", "Buttermilk"],
    allergens: ["Leite", "Glúten", "Ovos"],
  },
  {
    id: "cupcake-chocolate",
    name: "Cupcake Triplo Chocolate",
    description: "Para os chocólatras: massa, recheio e cobertura de chocolate",
    price: 12.00,
    priceNote: "unidade",
    image: cupcakesImg,
    category: "cupcakes",
    tag: "Premium",
    ingredients: ["Chocolate 70%", "Ganache", "Raspas de chocolate"],
    allergens: ["Leite", "Glúten", "Ovos"],
  },
  // Trufas
  {
    id: "trufa-champagne",
    name: "Trufa de Champagne",
    description: "Sofisticada trufa com toque de champagne francês",
    price: 8.00,
    priceNote: "unidade",
    image: trufasImg,
    category: "trufas",
    tag: "Premium",
    ingredients: ["Chocolate belga", "Champagne", "Creme de leite"],
    allergens: ["Leite", "Álcool"],
  },
  {
    id: "trufa-maracuja",
    name: "Trufa de Maracujá",
    description: "Equilíbrio perfeito entre o azedo e o doce",
    price: 6.00,
    priceNote: "unidade",
    image: trufasImg,
    category: "trufas",
    ingredients: ["Chocolate branco", "Maracujá fresco", "Creme"],
    allergens: ["Leite"],
  },
  {
    id: "trufa-framboesa",
    name: "Trufa de Framboesa",
    description: "Frutas vermelhas frescas com chocolate meio amargo",
    price: 7.00,
    priceNote: "unidade",
    image: trufasImg,
    category: "trufas",
    tag: "Novo",
    ingredients: ["Chocolate 60%", "Framboesa", "Creme"],
    allergens: ["Leite"],
  },
  {
    id: "trufa-70cacau",
    name: "Trufa 70% Cacau",
    description: "Intensidade pura do chocolate para paladares exigentes",
    price: 7.00,
    priceNote: "unidade",
    image: trufasImg,
    category: "trufas",
    ingredients: ["Chocolate 70% cacau", "Creme de leite fresco"],
    allergens: ["Leite"],
  },
  // Personalizados
  {
    id: "pers-evento",
    name: "Doces para Evento",
    description: "Criações exclusivas personalizadas para seu evento especial",
    price: 0,
    priceNote: "sob consulta",
    image: personalizadosImg,
    category: "personalizados",
    tag: "Premium",
  },
  {
    id: "pers-casamento",
    name: "Mesa de Doces Casamento",
    description: "Pacote completo para seu grande dia",
    price: 0,
    priceNote: "sob consulta",
    image: personalizadosImg,
    category: "personalizados",
  },
  // Kits
  {
    id: "kit-aniversario",
    name: "Kit Aniversário",
    description: "30 brigadeiros + 12 cupcakes + 6 brownies",
    fullDescription: "Seleção especial para celebrar datas memoráveis com doces exclusivos. Inclui 30 brigadeiros sortidos, 12 cupcakes decorados e 6 brownies premium.",
    price: 189.00,
    priceNote: "kit",
    image: brigadeirosImg,
    category: "kits",
    tag: "Mais Vendido",
  },
  {
    id: "kit-presente",
    name: "Kit Presente",
    description: "20 trufas + 15 brigadeiros + caixa premium",
    fullDescription: "Perfeito para surpreender quem você ama com elegância. Embalagem especial de presente.",
    price: 129.00,
    priceNote: "kit",
    image: trufasImg,
    category: "kits",
  },
  {
    id: "kit-casal",
    name: "Kit Casal",
    description: "12 trufas + 8 brigadeiros + 2 mini tortas",
    fullDescription: "Momentos românticos pedem doces especiais. Ideal para celebrações a dois.",
    price: 99.00,
    priceNote: "kit",
    image: trufasImg,
    category: "kits",
  },
  {
    id: "kit-festas",
    name: "Kit Festas",
    description: "100 doces variados + embalagens personalizadas",
    fullDescription: "Para eventos corporativos e comemorações maiores. Personalização inclusa.",
    price: 350.00,
    priceNote: "a partir de",
    image: brigadeirosImg,
    category: "kits",
    tag: "Premium",
  },
];

export type SortOption = "relevancia" | "preco-asc" | "preco-desc" | "mais-vendidos";

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevancia", label: "Relevância" },
  { value: "mais-vendidos", label: "Mais vendidos" },
  { value: "preco-asc", label: "Menor preço" },
  { value: "preco-desc", label: "Maior preço" },
];

export function filterAndSortProducts(
  products: Product[],
  category: string,
  search: string,
  sort: SortOption
): Product[] {
  let filtered = [...products];

  // Filter by category
  if (category !== "todos") {
    filtered = filtered.filter((p) => p.category === category);
  }

  // Filter by search
  if (search.trim()) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  switch (sort) {
    case "preco-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "preco-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "mais-vendidos":
      filtered.sort((a, b) => {
        const tagOrder = { "Mais Vendido": 0, Premium: 1, Novo: 2 };
        const aOrder = a.tag ? tagOrder[a.tag] ?? 3 : 3;
        const bOrder = b.tag ? tagOrder[b.tag] ?? 3 : 3;
        return aOrder - bOrder;
      });
      break;
    default:
      // relevancia - keep original order
      break;
  }

  return filtered;
}
