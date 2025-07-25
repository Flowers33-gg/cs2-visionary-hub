import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Shield, Clock, Users, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BanRecord {
  id: number;
  type: "Навсегда" | "Временно" | "Чаты";
  player: string;
  reason: string;
  duration: string;
  admin: string;
  status: "active" | "expired";
  date: string;
}

const mockBanData: BanRecord[] = [
  {
    id: 1,
    type: "Навсегда",
    player: "злебака [278]",
    reason: "Читы",
    duration: "Навсегда",
    admin: "shrinlex",
    status: "active",
    date: "2024-01-15"
  },
  {
    id: 2,
    type: "Временно", 
    player: "callmogs",
    reason: "отказ от проверки",
    duration: "6 дн. 19 ч.",
    admin: "Dolcon",
    status: "active",
    date: "2024-01-14"
  },
  {
    id: 3,
    type: "Чаты",
    player: "TBOHasker-VIP - C...",
    reason: "За неадекват",
    duration: "Навсегда",
    admin: "Dalininsk Das",
    status: "active",
    date: "2024-01-13"
  },
  {
    id: 4,
    type: "Временно",
    player: "bonicaco",
    reason: "отказ от проверки",
    duration: "6 дн. 19 ч.",
    admin: "Dolcon",
    status: "active",
    date: "2024-01-12"
  },
  {
    id: 5,
    type: "Чаты",
    player: "ps4masterfriefu...",
    reason: "Лаг в проверки",
    duration: "4 нед. 1 дн.",
    admin: "ERWQ-shalnlyll",
    status: "active",
    date: "2024-01-11"
  }
];

const Banlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("bans");

  const filteredBans = mockBanData.filter(ban =>
    ban.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ban.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ban.admin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Навсегда":
        return "bg-destructive text-destructive-foreground";
      case "Временно":
        return "bg-cs2-bronze text-foreground";
      case "Чаты":
        return "bg-cs2-gold text-cs2-dark";
      default:
        return "bg-muted";
    }
  };

  const stats = {
    total: mockBanData.length,
    permanent: mockBanData.filter(ban => ban.type === "Навсегда").length,
    temporary: mockBanData.filter(ban => ban.type === "Временно").length,
    chat: mockBanData.filter(ban => ban.type === "Чаты").length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="bg-card border-cs2-dark-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">Информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-destructive/20 border border-destructive/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <span className="font-medium text-destructive">Играешь блокировка: 1</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Статистика наказаний</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Всего банов</span>
                      <Badge variant="secondary" className="bg-cs2-gold text-cs2-dark">
                        {stats.total}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Активных банов</span>
                      <Badge variant="secondary" className="bg-cs2-gold text-cs2-dark">
                        {stats.permanent + stats.temporary}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Перманентных банов</span>
                      <Badge variant="destructive">
                        {stats.permanent}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Всего мутов</span>
                      <Badge variant="secondary" className="bg-cs2-gold text-cs2-dark">
                        {stats.chat}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-cs2-dark-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle className="text-xl text-foreground">Список наказаний</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Ник игрока / reason / STEAMID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 bg-input border-border"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 bg-muted">
                    <TabsTrigger value="bans" className="data-[state=active]:bg-cs2-gold data-[state=active]:text-cs2-dark">
                      Баны
                    </TabsTrigger>
                    <TabsTrigger value="mutes" className="data-[state=active]:bg-cs2-gold data-[state=active]:text-cs2-dark">
                      Муты
                    </TabsTrigger>
                    <TabsTrigger value="games" className="data-[state=active]:bg-cs2-gold data-[state=active]:text-cs2-dark">
                      Найти игроков
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="bans" className="mt-6">
                    <div className="rounded-lg border border-border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead className="text-foreground">Тип</TableHead>
                            <TableHead className="text-foreground">Игрок</TableHead>
                            <TableHead className="text-foreground">Причина</TableHead>
                            <TableHead className="text-foreground">Срок</TableHead>
                            <TableHead className="text-foreground">Админ</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredBans.map((ban) => (
                            <TableRow key={ban.id} className="hover:bg-muted/50">
                              <TableCell>
                                <Badge className={getTypeColor(ban.type)}>
                                  {ban.type}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium text-foreground">
                                {ban.player}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {ban.reason}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {ban.duration}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {ban.admin}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mutes" className="mt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      Данные о мутах загружаются...
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="games" className="mt-6">
                    <div className="text-center py-8 text-muted-foreground">
                      Поиск игроков по играм...
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Banlist;