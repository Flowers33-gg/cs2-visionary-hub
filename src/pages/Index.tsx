import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Activity, 
  Crown, 
  Trophy, 
  Target, 
  Gamepad2,
  Server,
  Star,
  TrendingUp,
  Play,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServerModes from "@/components/ServerModes";
import PlayerStats from "@/components/PlayerStats";
import Footer from "@/components/Footer";

const Index = () => {
  const [onlineStats, setOnlineStats] = useState({
    totalPlayers: 1247,
    onlineNow: 89,
    serversOnline: 4,
    todayPeak: 156
  });

  const [topPlayers] = useState([
    { name: "ProGamer2024", score: 15420, level: 42 },
    { name: "HeadshotKing", score: 14890, level: 41 },
    { name: "CS2Legend", score: 14245, level: 40 }
  ]);

  const [recentNews] = useState([
    {
      id: 1,
      title: "Новый Battle Pass уже доступен!",
      description: "100+ наград, эксклюзивные скины и уникальные достижения",
      date: "2024-01-25",
      type: "update"
    },
    {
      id: 2,
      title: "Турнир выходного дня",
      description: "Призовой фонд 50,000 рублей. Регистрация открыта",
      date: "2024-01-24", 
      type: "tournament"
    },
    {
      id: 3,
      title: "Обновление античит системы",
      description: "Повышенная защита от читеров и улучшенная стабильность",
      date: "2024-01-23",
      type: "security"
    }
  ]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setOnlineStats(prev => ({
        ...prev,
        onlineNow: prev.onlineNow + Math.floor(Math.random() * 3) - 1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getNewsIcon = (type: string) => {
    switch (type) {
      case "update": return <Star className="h-5 w-5 text-cs2-gold" />;
      case "tournament": return <Trophy className="h-5 w-5 text-cs2-red" />;
      case "security": return <Activity className="h-5 w-5 text-cs2-green" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      
      {/* Quick Stats */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-cs2-dark-lighter border-cs2-dark-border hover:border-cs2-gold transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-cs2-blue mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">{onlineStats.onlineNow}</div>
              <div className="text-sm text-muted-foreground">Игроков онлайн</div>
            </CardContent>
          </Card>

          <Card className="bg-cs2-dark-lighter border-cs2-dark-border hover:border-cs2-gold transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Server className="h-8 w-8 text-cs2-green mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">{onlineStats.serversOnline}</div>
              <div className="text-sm text-muted-foreground">Серверов активно</div>
            </CardContent>
          </Card>

          <Card className="bg-cs2-dark-lighter border-cs2-dark-border hover:border-cs2-gold transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-cs2-red mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">{onlineStats.todayPeak}</div>
              <div className="text-sm text-muted-foreground">Пик сегодня</div>
            </CardContent>
          </Card>

          <Card className="bg-cs2-dark-lighter border-cs2-dark-border hover:border-cs2-gold transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-cs2-gold mx-auto mb-3" />
              <div className="text-3xl font-bold text-foreground mb-1">{onlineStats.totalPlayers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Всего игроков</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Top Players */}
          <Card className="bg-cs2-dark-lighter border-cs2-dark-border lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Crown className="h-5 w-5 text-cs2-gold mr-2" />
                Топ игроки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topPlayers.map((player, index) => (
                <div key={player.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-cs2-gold text-cs2-dark' : 
                      index === 1 ? 'bg-cs2-silver text-cs2-dark' : 
                      'bg-cs2-bronze text-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{player.name}</div>
                      <div className="text-sm text-muted-foreground">Уровень {player.level}</div>
                    </div>
                  </div>
                  <div className="text-cs2-gold font-bold">{player.score.toLocaleString()}</div>
                </div>
              ))}
              <Link to="/leaders">
                <Button variant="outline" className="w-full mt-4">
                  Полная таблица лидеров
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* News */}
          <Card className="bg-cs2-dark-lighter border-cs2-dark-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <TrendingUp className="h-5 w-5 text-cs2-red mr-2" />
                Последние новости
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentNews.map((news) => (
                <div key={news.id} className="p-4 rounded-lg bg-cs2-dark border border-cs2-dark-border hover:border-cs2-gold transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {getNewsIcon(news.type)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{news.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{news.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {new Date(news.date).toLocaleDateString('ru-RU')}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-cs2-blue hover:text-cs2-gold">
                          Подробнее <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <ServerModes />
      <PlayerStats />
      
      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-cs2-dark-lighter to-cs2-dark rounded-lg p-8 border border-cs2-dark-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Готов начать играть?</h2>
            <p className="text-lg text-muted-foreground">
              Присоединяйся к тысячам игроков на лучших CS2 серверах
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/server-stats">
              <Button variant="cs2" className="w-full h-16 text-lg">
                <Play className="h-6 w-6 mr-2" />
                Подключиться к серверу
              </Button>
            </Link>
            
            <Link to="/shop">
              <Button variant="cs2Gold" className="w-full h-16 text-lg">
                <Crown className="h-6 w-6 mr-2" />
                Купить привилегии
              </Button>
            </Link>
            
            <Link to="/battlepass">
              <Button variant="outline" className="w-full h-16 text-lg border-cs2-gold text-cs2-gold hover:bg-cs2-gold hover:text-cs2-dark">
                <Target className="h-6 w-6 mr-2" />
                Battle Pass
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
