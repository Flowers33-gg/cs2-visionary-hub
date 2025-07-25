import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Play, Users, Clock, MessageCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/cs2-hero.jpg";

const HeroSection = () => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Скопировано!",
        description: `${platform} ID скопирован в буфер обмена`,
      });
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать в буфер обмена",
        variant: "destructive",
      });
    }
  };

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
                HEADSHOT MASTER
              </Badge>
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
          <Link to="/shop">
            <Button 
              variant="cs2" 
              size="lg" 
              className="text-lg px-8 py-4 cs2-glow"
            >
              <Play className="h-5 w-5" />
              МАГАЗИН
            </Button>
          </Link>
        </div>
      </div>

      {/* Founder Panel */}
      <div className="absolute top-6 right-6 z-20">
        <Card className="bg-card/90 backdrop-blur-sm border-cs2-red/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-center founder-glow">Основатель</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2 border-cs2-red/30 hover:bg-cs2-red/10"
              onClick={() => copyToClipboard("ramzik0314", "Discord")}
            >
              <MessageCircle className="h-4 w-4" />
              Discord
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center gap-2 border-cs2-red/30 hover:bg-cs2-red/10"
              onClick={() => copyToClipboard("@Pohyi_mne_33", "Telegram")}
            >
              <Send className="h-4 w-4" />
              Telegram
            </Button>
          </CardContent>
        </Card>
      </div>

    </section>
  );
};

export default HeroSection;