import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Trophy, Star, Gift, Lock, CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for battle pass levels
const battlePassLevels = [
  { level: 1, xp: 100, reward: "Наклейка 'Новичок'", type: "sticker", unlocked: true },
  { level: 2, xp: 250, reward: "Граффити 'CS2GO'", type: "graffiti", unlocked: true },
  { level: 3, xp: 400, reward: "Скин AK-47", type: "weapon", unlocked: true },
  { level: 4, xp: 600, reward: "Чемодан с оружием", type: "case", unlocked: false },
  { level: 5, xp: 850, reward: "VIP статус (7 дней)", type: "vip", unlocked: false },
  { level: 6, xp: 1100, reward: "Скин AWP", type: "weapon", unlocked: false },
  { level: 7, xp: 1400, reward: "Редкая наклейка", type: "sticker", unlocked: false },
  { level: 8, xp: 1750, reward: "Граффити 'Headshot'", type: "graffiti", unlocked: false },
  { level: 9, xp: 2150, reward: "Скин M4A4", type: "weapon", unlocked: false },
  { level: 10, xp: 2600, reward: "Золотой чемодан", type: "case", unlocked: false },
  { level: 11, xp: 3100, reward: "VIP+ статус (3 дня)", type: "vip", unlocked: false },
  { level: 12, xp: 3650, reward: "Легендарный скин", type: "weapon", unlocked: false },
  { level: 13, xp: 4250, reward: "Эксклюзивный титул", type: "title", unlocked: false },
];

// Mock data for top players
const topPlayers = [
  { rank: 1, name: "M.Dinar", level: 13, xp: 4250, avatar: "" },
  { rank: 2, name: "Agency Expert", level: 12, xp: 3800, avatar: "" },
  { rank: 3, name: "Daniil", level: 11, xp: 3200, avatar: "" },
  { rank: 4, name: "TALENT eSports", level: 10, xp: 2850, avatar: "" },
  { rank: 5, name: "Pro Player", level: 9, xp: 2400, avatar: "" },
];

const getRewardIcon = (type: string) => {
  switch (type) {
    case "weapon": return <Trophy className="h-4 w-4" />;
    case "case": return <Gift className="h-4 w-4" />;
    case "vip": return <Star className="h-4 w-4" />;
    case "sticker": return <Badge className="h-4 w-4" />;
    case "graffiti": return <Badge className="h-4 w-4" />;
    case "title": return <Trophy className="h-4 w-4" />;
    default: return <Gift className="h-4 w-4" />;
  }
};

const getRewardColor = (type: string) => {
  switch (type) {
    case "weapon": return "text-cs2-gold";
    case "case": return "text-purple-400";
    case "vip": return "text-cs2-red";
    case "sticker": return "text-blue-400";
    case "graffiti": return "text-green-400";
    case "title": return "text-orange-400";
    default: return "text-gray-400";
  }
};

const BattlePass = () => {
  const currentLevel = 3;
  const currentXP = 400;
  const nextLevelXP = battlePassLevels[currentLevel]?.xp || 0;
  const progress = ((currentXP / nextLevelXP) * 100);

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
              <h1 className="text-3xl font-bold text-cs2-red flex items-center space-x-2">
                <Trophy className="h-8 w-8" />
                <span>Боевой пропуск</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Выполняйте задания и получайте награды
              </p>
            </div>
          </div>
          
          <Badge variant="secondary" className="bg-cs2-red text-primary-foreground px-4 py-2">
            СЕЗОН 1
          </Badge>
        </div>

        {/* Current Progress */}
        <Card className="bg-cs2-dark-lighter border-cs2-dark-border mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold text-cs2-red">Уровень {currentLevel}</div>
                <div className="text-sm text-muted-foreground">
                  {currentXP} / {nextLevelXP} XP
                </div>
              </div>
              <Button variant="cs2" size="sm">
                <Gift className="h-4 w-4 mr-2" />
                Купить Battle Pass
              </Button>
            </div>
            <Progress value={progress} className="h-3" />
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Battle Pass Levels */}
          <div className="lg:col-span-3">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Уровни Battle Pass</h2>
                
                <div className="grid gap-4">
                  {battlePassLevels.map((level) => (
                    <div 
                      key={level.level}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        level.unlocked 
                          ? 'border-cs2-gold bg-cs2-gold/5' 
                          : 'border-cs2-dark-border bg-cs2-dark/30'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          level.unlocked ? 'bg-cs2-gold text-black' : 'bg-cs2-dark text-muted-foreground'
                        }`}>
                          {level.level}
                        </div>
                        
                        <div>
                          <div className="font-medium text-foreground">{level.reward}</div>
                          <div className="text-sm text-muted-foreground">{level.xp} XP</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className={getRewardColor(level.type)}>
                          {getRewardIcon(level.type)}
                        </div>
                        {level.unlocked ? (
                          <CheckCircle className="h-5 w-5 text-cs2-gold" />
                        ) : (
                          <Lock className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Players */}
          <div className="lg:col-span-1">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Топ игроков
                </h2>
                
                <div className="space-y-4">
                  {topPlayers.map((player) => (
                    <div key={player.rank} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          player.rank === 1 ? 'bg-cs2-gold text-black' : 
                          player.rank === 2 ? 'bg-gray-400 text-black' : 
                          player.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-cs2-dark text-muted-foreground'
                        }`}>
                          {player.rank}
                        </div>
                        
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={player.avatar} alt={player.name} />
                          <AvatarFallback className="bg-cs2-dark text-foreground text-xs">
                            {player.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="text-sm font-medium text-foreground">{player.name}</div>
                          <div className="text-xs text-muted-foreground">Уровень {player.level}</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-cs2-gold font-medium">
                        {player.xp} XP
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6" size="sm">
                  Показать больше
                </Button>
              </CardContent>
            </Card>

            {/* Season Info */}
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Информация о сезоне</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Осталось дней:</span>
                    <span className="text-cs2-red font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Всего уровней:</span>
                    <span className="text-foreground">13</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Игроков участвует:</span>
                    <span className="text-foreground">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BattlePass;