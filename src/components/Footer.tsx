import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cs2-dark border-t border-cs2-dark-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">CS2GG</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              CS2GG - это проект игровых серверов Counter Strike 2. Главная цель проекта является создание для игроков удобного и приятного пространства для игры.
            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <MessageCircle className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 h-auto">
                <Users className="h-4 w-4" />
              </Button>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>🇷🇺</span>
                <span>Россия</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-cs2-red transition-colors">
                  Магазин
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-cs2-red transition-colors">
                  Помощь
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-cs2-red transition-colors">
                  Личный кабинет
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-cs2-red transition-colors">
                  Техподдержка
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Документы</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-cs2-red transition-colors">
                  Договор оферты
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-cs2-red transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Discord */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Сообщество</h3>
            <div className="space-y-3">
              <Button 
                variant="cs2" 
                className="w-full justify-start"
                onClick={() => window.open('https://discord.gg/XhsNxTgpfS', '_blank')}
              >
                <MessageCircle className="h-4 w-4" />
                Присоединиться к Discord
              </Button>
              <p className="text-xs text-muted-foreground">
                Общайтесь с игроками, получайте поддержку и будьте в курсе всех новостей!
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cs2-dark-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Headshot Master CS2. Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center">
            Сделано с <Heart className="h-3 w-3 text-cs2-red mx-1" /> для игрового сообщества
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;