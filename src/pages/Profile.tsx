import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp,
  Crown,
  Shield,
  Award,
  Calendar,
  MapPin,
  Gamepad2,
  Star,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PlayerProfile {
  steamId: string;
  username: string;
  displayName: string;
  avatar: string;
  level: number;
  experience: number;
  nextLevelXp: number;
  rank: string;
  joinDate: string;
  lastSeen: string;
  country: string;
  privileges: string[];
  
  // Statistics
  totalKills: number;
  totalDeaths: number;
  headshots: number;
  playtime: string;
  gamesPlayed: number;
  wins: number;
  losses: number;
  roundsWon: number;
  roundsLost: number;
  
  // Achievements
  achievements: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress?: number;
    maxProgress?: number;
  }[];
  
  // Recent matches
  recentMatches: {
    id: string;
    map: string;
    result: "win" | "loss" | "draw";
    kills: number;
    deaths: number;
    assists: number;
    score: number;
    date: string;
    duration: string;
  }[];
}

const mockProfile: PlayerProfile = {
  steamId: "STEAM_0:1:123456789",
  username: "ProGamer2024",
  displayName: "ProGamer2024",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  level: 42,
  experience: 8750,
  nextLevelXp: 10000,
  rank: "Легендарный Беркут",
  joinDate: "2023-06-15",
  lastSeen: "2024-01-25 15:30",
  country: "RU",
  privileges: ["VIP", "Premium"],
  
  totalKills: 15420,
  totalDeaths: 8932,
  headshots: 7891,
  playtime: "487ч 32м",
  gamesPlayed: 1247,
  wins: 789,
  losses: 458,
  roundsWon: 12456,
  roundsLost: 8932,
  
  achievements: [
    {
      id: "first_kill",
      name: "Первая кровь",
      description: "Совершите первое убийство",
      icon: "🎯",
      unlocked: true
    },
    {
      id: "headshot_master",
      name: "Мастер хэдшотов",
      description: "Совершите 1000 убийств в голову",
      icon: "🔥",
      unlocked: true
    },
    {
      id: "ace_killer",
      name: "Убийца эйсов",
      description: "Совершите 10 эйсов",
      icon: "⭐",
      unlocked: false,
      progress: 7,
      maxProgress: 10
    },
    {
      id: "survivor",
      name: "Выживальщик",
      description: "Выиграйте раунд в одиночку",
      icon: "🛡️",
      unlocked: true
    }
  ],
  
  recentMatches: [
    {
      id: "1",
      map: "de_dust2",
      result: "win",
      kills: 24,
      deaths: 16,
      assists: 8,
      score: 2847,
      date: "2024-01-25",
      duration: "42:15"
    },
    {
      id: "2", 
      map: "de_mirage",
      result: "loss",
      kills: 18,
      deaths: 21,
      assists: 6,
      score: 2156,
      date: "2024-01-24",
      duration: "38:22"
    },
    {
      id: "3",
      map: "de_inferno",
      result: "win", 
      kills: 29,
      deaths: 12,
      assists: 11,
      score: 3421,
      date: "2024-01-24",
      duration: "45:33"
    }
  ]
};

const Profile = () => {
  const { toast } = useToast();
  const [profile] = useState<PlayerProfile>(mockProfile);

  const kd = (profile.totalKills / profile.totalDeaths).toFixed(2);
  const headshotPercentage = ((profile.headshots / profile.totalKills) * 100).toFixed(1);
  const winPercentage = ((profile.wins / profile.gamesPlayed) * 100).toFixed(1);
  const experiencePercentage = ((profile.experience / profile.nextLevelXp) * 100);

  const getResultColor = (result: string) => {
    switch (result) {
      case "win":
        return "text-cs2-green";
      case "loss":
        return "text-cs2-red";
      case "draw":
        return "text-cs2-bronze";
      default:
        return "text-muted-foreground";
    }
  };

  const getResultBadgeColor = (result: string) => {
    switch (result) {
      case "win":
        return "bg-cs2-green text-foreground";
      case "loss":
        return "bg-destructive text-destructive-foreground";
      case "draw":
        return "bg-cs2-bronze text-foreground";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="bg-cs2-dark-lighter border-cs2-dark-border mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-cs2-gold">
                  <AvatarImage src={profile.avatar} alt={profile.displayName} />
                  <AvatarFallback className="bg-cs2-dark text-foreground text-2xl">
                    {profile.displayName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{profile.displayName}</h1>
                  <div className="flex items-center gap-4 mb-3">
                    <Badge className="bg-cs2-gold text-cs2-dark">
                      Уровень {profile.level}
                    </Badge>
                    <Badge variant="outline" className="border-cs2-red text-cs2-red">
                      {profile.rank}
                    </Badge>
                    {profile.privileges.map((privilege) => (
                      <Badge key={privilege} className="bg-cs2-blue text-foreground">
                        {privilege}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Steam ID: {profile.steamId}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      На проекте с: {new Date(profile.joinDate).toLocaleDateString('ru-RU')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Последний раз в сети: {profile.lastSeen}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full md:w-auto">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Опыт до следующего уровня
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {profile.experience.toLocaleString()} / {profile.nextLevelXp.toLocaleString()} XP
                    </span>
                  </div>
                  <Progress value={experiencePercentage} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cs2-gold">{kd}</div>
                    <div className="text-xs text-muted-foreground">K/D</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cs2-red">{headshotPercentage}%</div>
                    <div className="text-xs text-muted-foreground">HS%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cs2-green">{winPercentage}%</div>
                    <div className="text-xs text-muted-foreground">WR</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cs2-blue">{profile.playtime}</div>
                    <div className="text-xs text-muted-foreground">Игра</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-cs2-dark-lighter">
            <TabsTrigger value="stats" className="data-[state=active]:bg-cs2-red">
              <Trophy className="h-4 w-4 mr-2" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-cs2-red">
              <Award className="h-4 w-4 mr-2" />
              Достижения
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-cs2-red">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Матчи
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-cs2-red">
              <User className="h-4 w-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Убийства
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs2-red">{profile.totalKills.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {profile.headshots.toLocaleString()} хэдшотов
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Смерти
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{profile.totalDeaths.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    K/D: {kd}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Trophy className="h-4 w-4 mr-2" />
                    Игры
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs2-green">{profile.gamesPlayed}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {profile.wins}W / {profile.losses}L
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Время в игре
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs2-blue">{profile.playtime}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Активный игрок
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-foreground">Детальная статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Процент хэдшотов</span>
                      <span className="font-medium text-foreground">{headshotPercentage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Процент побед</span>
                      <span className="font-medium text-foreground">{winPercentage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Раундов выиграно</span>
                      <span className="font-medium text-foreground">{profile.roundsWon.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Раундов проиграно</span>
                      <span className="font-medium text-foreground">{profile.roundsLost.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Средние убийства за игру</span>
                      <span className="font-medium text-foreground">
                        {(profile.totalKills / profile.gamesPlayed).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Средние смерти за игру</span>
                      <span className="font-medium text-foreground">
                        {(profile.totalDeaths / profile.gamesPlayed).toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Средний счет</span>
                      <span className="font-medium text-foreground">2,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Лучшая серия</span>
                      <span className="font-medium text-foreground">13 побед</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`border transition-all duration-300 ${
                    achievement.unlocked 
                      ? 'bg-cs2-dark-lighter border-cs2-gold shadow-lg shadow-cs2-gold/20' 
                      : 'bg-cs2-dark border-cs2-dark-border opacity-75'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl ${achievement.unlocked ? 'grayscale-0' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-semibold ${achievement.unlocked ? 'text-cs2-gold' : 'text-muted-foreground'}`}>
                            {achievement.name}
                          </h3>
                          {achievement.unlocked && (
                            <Badge className="bg-cs2-green text-foreground">
                              Получено
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3">
                          {achievement.description}
                        </p>
                        
                        {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Прогресс</span>
                              <span className="text-foreground">{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="matches" className="space-y-6">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-foreground">Последние матчи</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.recentMatches.map((match) => (
                    <div 
                      key={match.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-cs2-dark border border-cs2-dark-border"
                    >
                      <div className="flex items-center gap-4">
                        <Badge className={getResultBadgeColor(match.result)}>
                          {match.result === "win" ? "Победа" : match.result === "loss" ? "Поражение" : "Ничья"}
                        </Badge>
                        
                        <div>
                          <div className="font-medium text-foreground">{match.map}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(match.date).toLocaleDateString('ru-RU')} • {match.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-semibold text-foreground">
                          {match.kills}/{match.deaths}/{match.assists}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          K/D/A • Счет: {match.score.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-foreground">Настройки профиля</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Button 
                    variant="cs2" 
                    onClick={() => {
                      toast({
                        title: "Функция недоступна",
                        description: "Смена аватара временно недоступна",
                      });
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Изменить аватар
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toast({
                        title: "Функция недоступна",
                        description: "Настройки приватности временно недоступны",
                      });
                    }}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Настройки приватности
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      toast({
                        title: "Функция недоступна", 
                        description: "Экспорт статистики временно недоступен",
                      });
                    }}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Экспорт статистики
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;