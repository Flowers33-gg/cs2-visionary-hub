import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Medal, Trophy, ChevronRight, ChevronLeft } from "lucide-react";

const Leaders = () => {
  const topPlayers = [
    {
      rank: 3,
      name: "Лучших из полых",
      level: 47,
      experience: "30 342 Опыт",
      medal: "bronze"
    },
    {
      rank: 1,
      name: "464646",
      level: 49,
      experience: "33 546 Опыт",
      medal: "gold"
    },
    {
      rank: 2,
      name: "МОНАРХ",
      level: 47,
      experience: "30 342 Опыт", 
      medal: "silver"
    }
  ];

  const leaderboardData = [
    { rank: 4, name: "MrKrass", points: 26796, level: 45, kills: 1426, deaths: 696, kd: "2.05", headshots: 427, playtime: "5дн.16ч", lastSeen: "21.07.2025 13:23" },
    { rank: 5, name: "Харли Квин", points: 25528, level: 45, kills: 1349, deaths: 734, kd: "1.70", headshots: 706, playtime: "21ч.35мин.", lastSeen: "24.07.2025 18:41" },
    { rank: 6, name: "ПарТиЗан", points: 25516, level: 44, kills: 1301, deaths: 664, kd: "1.44", headshots: 743, playtime: "1дн.4ч.", lastSeen: "12.07.2025 06:14" },
    { rank: 7, name: "иПу", points: 24014, level: 44, kills: 1221, deaths: 609, kd: "1.74", headshots: 1113, playtime: "1дн.", lastSeen: "24.07.2025 23:52" },
    { rank: 8, name: "BOXBOY", points: 20907, level: 42, kills: 1265, deaths: 763, kd: "1.59", headshots: 509, playtime: "1дн.4ч.", lastSeen: "24.07.2025 12:27" },
    { rank: 9, name: "TALANT [saxod]", points: 20551, level: 42, kills: 1273, deaths: 1185, kd: "1.07", headshots: 730, playtime: "3дн.19ч.", lastSeen: "25.07.2025 00:26" },
    { rank: 10, name: "ПивеЦербоган", points: 19740, level: 40, kills: 1110, deaths: 848, kd: "1.17", headshots: 579, playtime: "1дн.1ч.", lastSeen: "23.07.2025 22:47" },
    { rank: 11, name: "Ажей", points: 19912, level: 37, kills: 791, deaths: 552, kd: "1.43", headshots: 505, playtime: "1дн.12ч.", lastSeen: "16.07.2025 23:15" }
  ];

  const getMedalIcon = (medal: string) => {
    switch (medal) {
      case "gold":
        return <Crown className="h-8 w-8 text-cs2-gold" />;
      case "silver":
        return <Medal className="h-8 w-8 text-cs2-silver" />;
      case "bronze":
        return <Trophy className="h-8 w-8 text-cs2-bronze" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cs2-dark flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground">ТОП 3</h1>
            <Badge variant="secondary" className="bg-cs2-red text-primary-foreground">
              MIRAGE #1
            </Badge>
          </div>

          {/* Top 3 Players */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topPlayers.map((player) => (
              <Card key={player.rank} className={`bg-cs2-dark-lighter border-cs2-dark-border ${player.rank === 1 ? 'order-2 md:order-1' : player.rank === 2 ? 'order-3 md:order-2' : 'order-1 md:order-3'}`}>
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    {getMedalIcon(player.medal)}
                  </div>
                  <div className={`text-6xl font-bold mb-2 ${player.rank === 1 ? 'text-cs2-gold' : player.rank === 2 ? 'text-cs2-silver' : 'text-cs2-bronze'}`}>
                    {player.rank}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{player.name}</h3>
                  <div className={`text-4xl font-bold mb-2 ${player.rank === 1 ? 'text-cs2-gold' : 'text-cs2-green'}`}>
                    {player.level}
                  </div>
                  <p className="text-muted-foreground">{player.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard Table */}
        <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cs2-dark-border">
                    <th className="text-left p-4 text-muted-foreground font-medium">#</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">ИГРОК</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">ОЧКИ</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">УБИЙСТВА</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">СМЕРТИ</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">K/D</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">В ГОЛОВУ</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">НАИГРАЛ</th>
                    <th className="text-left p-4 text-muted-foreground font-medium">ПОСЛЕДНЯЯ ИГРА</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((player) => (
                    <tr key={player.rank} className="border-b border-cs2-dark-border hover:bg-cs2-dark/50 transition-colors">
                      <td className="p-4">
                        <Badge variant="outline" className="border-cs2-green text-cs2-green">
                          {player.level}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-cs2-gold to-cs2-red rounded"></div>
                          <span className="text-foreground font-medium">{player.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-foreground font-medium">{player.points.toLocaleString()}</td>
                      <td className="p-4 text-foreground">{player.kills.toLocaleString()}</td>
                      <td className="p-4 text-foreground">{player.deaths}</td>
                      <td className="p-4 text-foreground">{player.kd}</td>
                      <td className="p-4 text-foreground">{player.headshots}</td>
                      <td className="p-4 text-foreground">{player.playtime}</td>
                      <td className="p-4 text-muted-foreground text-sm">{player.lastSeen}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-center p-6 space-x-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="bg-cs2-red text-primary-foreground hover:bg-cs2-red/80">
                1
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                2
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                3
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                4
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                5
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                6
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                7
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Leaders;