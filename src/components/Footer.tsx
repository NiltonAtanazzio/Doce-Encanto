import { Sparkles, Instagram, MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { WHATSAPP_NUMBER, INSTAGRAM_URL } from "@/lib/whatsapp";

const footerLinks = [
  { name: "Início", href: "/#inicio" },
  { name: "Sobre", href: "/#sobre" },
  { name: "Cardápio", href: "/cardapio" },
  { name: "Kits", href: "/#kits" },
  { name: "Contato", href: "/#contato" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const element = document.querySelector(href.replace("/", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-foreground text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-rose-gold/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16 border-b border-white/10">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <Link
                to="/"
                className="flex items-center gap-2 mb-6"
                aria-label="Doce Encanto - Página inicial"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose-gold flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Doce Encanto</span>
              </Link>
              <p className="text-white/60 leading-relaxed mb-6">
                Transformando momentos em experiências inesquecíveis através de
                doces artesanais feitos com amor e dedicação.
              </p>
              <div className="flex gap-4">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Siga-nos no Instagram @doceencanto"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os doces 🍬")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Entre em contato pelo WhatsApp"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith("/") && !link.href.includes("#") ? (
                      <Link
                        to={link.href}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          if (link.href.startsWith("/#")) {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }
                        }}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contato</h4>
              <ul className="space-y-3 text-white/60">
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre os doces 🍬")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    (15) 99999-9999
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@doceencanto.com"
                    className="hover:text-white transition-colors"
                  >
                    contato@doceencanto.com
                  </a>
                </li>
                <li>Rua das Flores, 123</li>
                <li>Sorocaba - SP</li>
                <li className="pt-2">
                  <span className="text-white/40">Seg-Sáb:</span> 9h às 19h
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {currentYear} Atanasio.Dev. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> no
            Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
