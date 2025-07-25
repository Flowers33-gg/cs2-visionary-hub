import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Gamepad2, Crown, MessageCircle, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="border-b border-cs2-dark-border bg-cs2-dark-lighter">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-cs2-gold" />
              <span className="text-xl font-bold headshot-gradient">Headshot Master</span>
            </div>
            <Badge variant="secondary" className="bg-cs2-red text-primary-foreground">
              CS2
            </Badge>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-foreground hover:text-cs2-red transition-colors duration-300">
              Магазин
            </Link>
            <Link to="/leaders" className="text-foreground hover:text-cs2-gold transition-colors duration-300">
              Лидеры
            </Link>
            <Link to="/banlist" className="text-foreground hover:text-cs2-gold transition-colors duration-300">
              Банлист
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-cs2-red transition-colors duration-300">
                <span>Информация</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-cs2-dark-lighter border-cs2-dark-border">
                <DropdownMenuItem asChild>
                  <Link to="/rules" className="text-foreground hover:text-cs2-gold cursor-pointer">
                    Правила
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/applications" className="text-foreground hover:text-cs2-gold cursor-pointer">
                    Заявки
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/battlepass" className="text-foreground hover:text-cs2-gold transition-colors duration-300">
              Battle Pass
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>На сайте: 4</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Gamepad2 className="h-4 w-4" />
                <span>Играют: 42</span>
              </div>
            </div>
            
            <Button variant="cs2" className="cs2-glow">
              <MessageCircle className="h-4 w-4" />
              Discord
            </Button>
            
            <Link to="/profile">
              <Button variant="outline">
                <User className="h-4 w-4" />
                Профиль
              </Button>
            </Link>
            
            <Button variant="cs2Gold">
              Пополнить
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-4">
          <Link to="/shop" className="text-sm text-foreground hover:text-cs2-red transition-colors">
            Магазин
          </Link>
          <Link to="/leaders" className="text-sm text-foreground hover:text-cs2-gold transition-colors">
            Лидеры
          </Link>
          <Link to="/banlist" className="text-sm text-foreground hover:text-cs2-gold transition-colors">
            Банлист
          </Link>
          <Link to="/rules" className="text-sm text-foreground hover:text-cs2-gold transition-colors">
            Правила
          </Link>
          <Link to="/applications" className="text-sm text-foreground hover:text-cs2-gold transition-colors">
            Заявки
          </Link>
          <Link to="/server-stats" className="text-sm text-foreground hover:text-cs2-gold transition-colors">
            Сервера
          </Link>
          <Link to="/game-settings" className="text-sm text-foreground hover:text-cs2-gold transition-colors">
            Настройки
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;