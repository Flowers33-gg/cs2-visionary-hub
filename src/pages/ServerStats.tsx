import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Activity, 
  Clock, 
  Target, 
  TrendingUp, 
  Map, 
  Server,
  Gamepad2,
  Shield,
  Trophy
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ServerInfo {
  id: string;
  name: string;
  map: string;
  players: number;
  maxPlayers: number;
  status: "online" | "offline" | "restart";
  ip: string;
  ping: number;
  mode: string;
}

interface PlayerStats {
  totalPlayers: number;
  activePlayers: number;
  newPlayersToday: number;
  topFragger: {
    name: string;
    kills: number;
    deaths: number;
    kd: string;
  };
}

const serverData: ServerInfo[] = [
  {
    id: "1",
    name: "Headshot Master #1 | DUST2 24/7",
    map: "de_dust2",
    players: 18,
    maxPlayers: 20,
    status: "online",
    ip: "185.169.134.3:27015",
    ping: 15,
    mode: "Classic Competitive"
  },
  {
    id: "2", 
    name: "Headshot Master #2 | MIRAGE ONLY",
    map: "de_mirage",
    players: 16,
    maxPlayers: 20,
    status: "online",
    ip: "185.169.134.4:27015", 
    ping: 12,
    mode: "Classic Competitive"
  },
  {
    id: "3",
    name: "Headshot Master #3 | INFERNO",
    map: "de_inferno",
    players: 14,
    maxPlayers: 18,
    status: "online",
    ip: "185.169.134.5:27015",
    ping: 18,
    mode: "Classic Competitive"
  },
  {
    id: "4",
    name: "Headshot Master #4 | CACHE",
    map: "de_cache",
    players: 0,
    maxPlayers: 20,
    status: "restart",
    ip: "185.169.134.6:27015",
    ping: 999,
    mode: "Classic Competitive"
  }
];

const playerStats: PlayerStats = {
  totalPlayers: 15420,
  activePlayers: 48,
  newPlayersToday: 127,
  topFragger: {
    name: "ProGamer2024",
    kills: 2847,
    deaths: 1205,
    kd: "2.36"
  }
};

const ServerStats = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-cs2-green text-foreground";
      case "offline":
        return "bg-destructive text-destructive-foreground";
      case "restart":
        return "bg-cs2-bronze text-foreground";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Онлайн";
      case "offline":
        return "Оффлайн";
      case "restart":
        return "Перезагрузка";
      default:
        return "Неизвестно";
    }
  };

  const connectToServer = (ip: string) => {
    window.location.href = `steam://connect/${ip}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
            <Activity className="h-8 w-8 text-cs2-red mr-3" />
            Статистика серверов
          </h1>
          <p className="text-muted-foreground">
            Мониторинг серверов Headshot Master в реальном времени
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Последнее обновление: {currentTime.toLocaleTimeString()}
          </p>
        </div>

        <Tabs defaultValue="servers" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-cs2-dark-lighter">
            <TabsTrigger value="servers" className="data-[state=active]:bg-cs2-red">
              <Server className="h-4 w-4 mr-2" />
              Серверы
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-cs2-red">
              <Trophy className="h-4 w-4 mr-2" />
              Статистика
            </TabsTrigger>
            <TabsTrigger value="maps" className="data-[state=active]:bg-cs2-red">
              <Map className="h-4 w-4 mr-2" />
              Карты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="servers" className="space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Всего серверов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{serverData.length}</div>
                  <div className="flex items-center text-cs2-green text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    100% онлайн
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Игроков онлайн
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {serverData.reduce((acc, server) => acc + server.players, 0)}
                  </div>
                  <div className="flex items-center text-cs2-blue text-sm">
                    <Users className="h-3 w-3 mr-1" />
                    из {serverData.reduce((acc, server) => acc + server.maxPlayers, 0)} слотов
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Средний пинг
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {Math.round(serverData.filter(s => s.status === "online").reduce((acc, server) => acc + server.ping, 0) / serverData.filter(s => s.status === "online").length)}ms
                  </div>
                  <div className="flex items-center text-cs2-green text-sm">
                    <Activity className="h-3 w-3 mr-1" />
                    Отличная связь
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Загрузка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {Math.round((serverData.reduce((acc, server) => acc + server.players, 0) / serverData.reduce((acc, server) => acc + server.maxPlayers, 0)) * 100)}%
                  </div>
                  <div className="flex items-center text-cs2-gold text-sm">
                    <Target className="h-3 w-3 mr-1" />
                    Хорошая загрузка
                  </div>
                </CardContent>
              </Card>
            </div>

          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Всего игроков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs2-gold">{playerStats.totalPlayers.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    Активных игроков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs2-green">{playerStats.activePlayers}</div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Новых сегодня
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cs2-blue">{playerStats.newPlayersToday}</div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                    <Trophy className="h-4 w-4 mr-2" />
                    Топ фраггер
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-foreground">{playerStats.topFragger.name}</div>
                  <div className="text-sm text-muted-foreground">
                    K/D: {playerStats.topFragger.kd}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maps" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...new Set(serverData.map(s => s.map))].map((map) => {
                const serversOnMap = serverData.filter(s => s.map === map);
                const playersOnMap = serversOnMap.reduce((acc, s) => acc + s.players, 0);
                
                return (
                  <Card key={map} className="bg-cs2-dark-lighter border-cs2-dark-border">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center">
                        <Map className="h-5 w-5 mr-2 text-cs2-gold" />
                        {map}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Серверов:</span>
                          <span className="text-foreground font-medium">{serversOnMap.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Игроков:</span>
                          <span className="text-foreground font-medium">{playersOnMap}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Популярность:</span>
                          <Badge variant="outline" className="border-cs2-gold text-cs2-gold">
                            {Math.round((playersOnMap / serverData.reduce((acc, s) => acc + s.players, 0)) * 100)}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ServerStats;