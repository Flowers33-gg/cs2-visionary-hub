import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Crown, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Import privilege images
import vipPlusIcon from "@/assets/vip-plus-icon.png";
import vipIcon from "@/assets/vip-icon.png";
import battlePassIcon from "@/assets/battle-pass-icon.png";

const privileges = [
  {
    id: 4,
    name: "VIP+",
    price: 450,
    originalPrice: null,
    image: vipPlusIcon,
    color: "from-pink-600 to-pink-400",
    textColor: "text-pink-100",
    features: [
      "Элитный статус игрока",
      "Расширенный чат",
      "Коллекция скинов",
      "Быстрый доступ к серверу",
      "Элитная поддержка"
    ]
  },
  {
    id: 5,
    name: "VIP",
    price: 250,
    originalPrice: null,
    image: vipIcon,
    color: "from-cyan-600 to-cyan-400",
    textColor: "text-cyan-100",
    features: [
      "VIP статус",
      "Основные привилегии",
      "Базовые скины",
      "Улучшенное подключение",
      "VIP поддержка"
    ]
  },
  {
    id: 6,
    name: "Battle Pass",
    price: 175,
    originalPrice: null,
    image: battlePassIcon,
    color: "from-orange-600 to-orange-400",
    textColor: "text-orange-100",
    features: [
      "Базовый боевой допуск",
      "Стандартные возможности",
      "Начальные скины",
      "Обычное подключение",
      "Стандартная поддержка"
    ]
  }
];

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
                Назад
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8 text-cs2-red" />
                <span>Магазин привилегий</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Выберите подходящую привилегию для игры на сервере Headshot Master
              </p>
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-cs2-red text-primary-foreground px-4 py-2">
            CS2 SHOP
          </Badge>
        </div>

        {/* Privileges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {privileges.map((privilege) => (
            <Card 
              key={privilege.id} 
              className="bg-cs2-dark-lighter border-cs2-dark-border overflow-hidden hover:border-cs2-red transition-all duration-300 hover:shadow-lg hover:shadow-cs2-red/20"
            >
              <div className="relative">
                {/* Background Image */}
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${privilege.image})` }}
                >
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${privilege.color} opacity-80`} />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <Badge variant="secondary" className={`${privilege.textColor} bg-black/30 backdrop-blur-sm`}>
                        {privilege.name}
                      </Badge>
                      <Crown className={`h-6 w-6 ${privilege.textColor}`} />
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${privilege.textColor}`}>
                        {privilege.price} ₽
                      </div>
                      {privilege.originalPrice && (
                        <div className={`text-sm line-through ${privilege.textColor} opacity-70`}>
                          {privilege.originalPrice} ₽
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 space-y-4">
                {/* Features */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground mb-3">Возможности:</h3>
                  <ul className="space-y-1">
                    {privilege.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-cs2-gold flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <Button 
                  variant="cs2" 
                  className="w-full cs2-glow"
                  onClick={() => {
                    // Add to cart logic here
                    console.log(`Adding ${privilege.name} to cart`);
                  }}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Купить за {privilege.price} ₽
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-cs2-dark-lighter border border-cs2-dark-border rounded-lg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Информация о покупке</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
            <div>
              <h3 className="font-medium text-foreground mb-2">Способы оплаты:</h3>
              <ul className="space-y-1">
                <li>• Банковские карты (Visa, MasterCard)</li>
                <li>• Электронные кошельки</li>
                <li>• Криптовалюта</li>
                <li>• Мобильные платежи</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Важная информация:</h3>
              <ul className="space-y-1">
                <li>• Активация мгновенная</li>
                <li>• Привилегии действуют 30 дней</li>
                <li>• Возможно продление</li>
                <li>• Поддержка 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;