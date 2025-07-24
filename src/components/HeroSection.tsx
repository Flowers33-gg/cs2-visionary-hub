import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Users, Clock } from "lucide-react";
import heroImage from "@/assets/cs2-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-dark overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cs2-dark via-cs2-dark/80 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Logo */}
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2">
              HEADSHOT MASTER
            </h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-cs2-red text-primary-foreground px-4 py-2 text-lg">
                CS2.GG
              </Badge>
              <span className="text-lg text-muted-foreground">МАГАЗИН</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              ПРИОБРЕТИ ПРИВИЛЕГИЮ
            </h2>
            <p className="text-xl text-muted-foreground mb-2">
              НА НУЖНОМ СЕРВЕРЕ
            </p>
            <p className="text-xl text-muted-foreground">
              И ИГРАЙ С БОНУСАМИ!
            </p>
          </div>

          {/* Action Button */}
          <Button 
            variant="cs2" 
            size="lg" 
            className="text-lg px-8 py-4 cs2-glow"
          >
            <Play className="h-5 w-5" />
            ПЕРЕЙТИ
          </Button>
        </div>
      </div>

      {/* Server Stats - Right Side */}
      <div className="absolute top-20 right-8 hidden xl:block">
        <div className="bg-cs2-dark-lighter/90 backdrop-blur-sm border border-cs2-dark-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Скинченджер</h3>
          
          <div className="space-y-3">
            <div className="bg-cs2-dark/80 rounded-lg p-4 border border-cs2-dark-border">
              <h4 className="text-sm font-medium text-foreground mb-2">Магазин</h4>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">На сайте</span>
                <span className="text-cs2-gold font-bold text-xl">4</span>
              </div>
            </div>
            
            <div className="bg-cs2-dark/80 rounded-lg p-4 border border-cs2-dark-border">
              <h4 className="text-sm font-medium text-foreground mb-2">Играют</h4>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Игроков</span>
                <span className="text-cs2-red font-bold text-xl">42</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center mt-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-cs2-gold rounded-full animate-pulse"></div>
              <span>Онлайн</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;