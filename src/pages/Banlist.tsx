import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Shield, Clock, Users, AlertTriangle, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  steamId?: string;
  ip?: string;
}

const mockBanData: BanRecord[] = [
  {
    id: 1,
    type: "Навсегда",
    player: "злебака [278]",
    reason: "Читы (WallHack + AimBot)",
    duration: "Навсегда",
    admin: "shrinlex",
    status: "active",
    date: "2024-01-15",
    steamId: "STEAM_1:0:123456789"
  },
  {
    id: 2,
    type: "Временно", 
    player: "callmogs",
    reason: "Отказ от проверки на читы",
    duration: "6 дн. 19 ч.",
    admin: "Dolcon",
    status: "active",
    date: "2024-01-14",
    steamId: "STEAM_1:1:987654321"
  },
  {
    id: 3,
    type: "Чаты",
    player: "TBOHasker-VIP",
    reason: "Оскорбления в чате",
    duration: "Навсегда",
    admin: "Dalininsk Das",
    status: "active",
    date: "2024-01-13",
    steamId: "STEAM_1:0:456789123"
  },
  {
    id: 4,
    type: "Временно",
    player: "bonicaco",
    reason: "Подозрение в использовании читов",
    duration: "6 дн. 19 ч.",
    admin: "Dolcon",
    status: "active",
    date: "2024-01-12",
    steamId: "STEAM_1:1:654321987"
  },
  {
    id: 5,
    type: "Чаты",
    player: "ps4masterfriefu",
    reason: "Спам в голосовом чате",
    duration: "4 нед. 1 дн.",
    admin: "ERWQ-shalnlyll",
    status: "active",
    date: "2024-01-11",
    steamId: "STEAM_1:0:789123456"
  },
  {
    id: 6,
    type: "Навсегда",
    player: "CheatMaster2024",
    reason: "Многократное использование читов",
    duration: "Навсегда",
    admin: "AdminChief",
    status: "active",
    date: "2024-01-10",
    steamId: "STEAM_1:1:147258369"
  },
  {
    id: 7,
    type: "Временно",
    player: "ToxicPlayer",
    reason: "Токсичное поведение",
    duration: "3 дня",
    admin: "ModeratorX",
    status: "expired",
    date: "2024-01-05",
    steamId: "STEAM_1:0:369258147"
  }
];

const Banlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("bans");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredBans = mockBanData.filter(ban => {
    const matchesSearch = ban.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ban.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ban.admin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || ban.type === filterType;
    const matchesStatus = filterStatus === "all" || ban.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const paginatedBans = filteredBans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredBans.length / itemsPerPage);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-cs2-red text-foreground";
      case "expired":
        return "bg-cs2-green text-foreground";
      default:
        return "bg-muted";
    }
  };

  const stats = {
    total: mockBanData.length,
    permanent: mockBanData.filter(ban => ban.type === "Навсегда").length,
    temporary: mockBanData.filter(ban => ban.type === "Временно").length,
    chat: mockBanData.filter(ban => ban.type === "Чаты").length,
    active: mockBanData.filter(ban => ban.status === "active").length,
    expired: mockBanData.filter(ban => ban.status === "expired").length
  };

  const recentBans = mockBanData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const exportBanlist = () => {
    const csvContent = [
      ["ID", "Тип", "Игрок", "Причина", "Длительность", "Администратор", "Статус", "Дата", "Steam ID"].join(","),
      ...filteredBans.map(ban => [
        ban.id,
        ban.type,
        ban.player,
        ban.reason,
        ban.duration,
        ban.admin,
        ban.status,
        ban.date,
        ban.steamId || ""
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'banlist.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
            <Shield className="h-8 w-8 text-cs2-red mr-3" />
            Банлист сервера
          </h1>
          <p className="text-muted-foreground">
            Список заблокированных игроков на серверах Headshot Master
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 text-cs2-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.total}</div>
              <div className="text-xs text-muted-foreground">Всего банов</div>
            </CardContent>
          </Card>

          <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.permanent}</div>
              <div className="text-xs text-muted-foreground">Перманентные</div>
            </CardContent>
          </Card>

          <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-cs2-bronze mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.temporary}</div>
              <div className="text-xs text-muted-foreground">Временные</div>
            </CardContent>
          </Card>

          <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 text-cs2-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.chat}</div>
              <div className="text-xs text-muted-foreground">Чат баны</div>
            </CardContent>
          </Card>

          <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 text-cs2-red mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.active}</div>
              <div className="text-xs text-muted-foreground">Активные</div>
            </CardContent>
          </Card>

          <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 text-cs2-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stats.expired}</div>
              <div className="text-xs text-muted-foreground">Истекшие</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-cs2-dark-lighter">
            <TabsTrigger value="bans" className="data-[state=active]:bg-cs2-red">
              <Shield className="h-4 w-4 mr-2" />
              Банлист
            </TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-cs2-red">
              <Clock className="h-4 w-4 mr-2" />
              Последние баны
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-cs2-red">
              <Users className="h-4 w-4 mr-2" />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bans" className="space-y-6">
            {/* Filters */}
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Поиск по игроку, причине или админу..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-cs2-dark border-cs2-dark-border"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-32 bg-cs2-dark border-cs2-dark-border">
                        <SelectValue placeholder="Тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все типы</SelectItem>
                        <SelectItem value="Навсегда">Навсегда</SelectItem>
                        <SelectItem value="Временно">Временно</SelectItem>
                        <SelectItem value="Чаты">Чаты</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32 bg-cs2-dark border-cs2-dark-border">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="active">Активные</SelectItem>
                        <SelectItem value="expired">Истекшие</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={exportBanlist}>
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Banlist Table */}
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <Table>
                <TableHeader>
                  <TableRow className="border-cs2-dark-border hover:bg-cs2-dark/50">
                    <TableHead className="text-left p-4 text-muted-foreground font-medium">ТИП</TableHead>
                    <TableHead className="text-left p-4 text-muted-foreground font-medium">ИГРОК</TableHead>
                    <TableHead className="text-left p-4 text-muted-foreground font-medium">ПРИЧИНА</TableHead>
                    <TableHead className="text-left p-4 text-muted-foreground font-medium">ДЛИТЕЛЬНОСТЬ</TableHead>
                    <TableHead className="text-left p-4 text-muted-foreground font-medium">АДМИНИСТРАТОР</TableHead>
                    <TableHead className="text-left p-4 text-muted-foreground font-medium">СТАТУС</TableHead>
                    <TableHead className="text-left p-4 text-muted-foreground font-medium">ДАТА</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedBans.map((ban) => (
                    <TableRow key={ban.id} className="border-cs2-dark-border hover:bg-cs2-dark/50 transition-colors">
                      <TableCell className="p-4">
                        <Badge className={getTypeColor(ban.type)}>
                          {ban.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4">
                        <div>
                          <div className="font-medium text-foreground">{ban.player}</div>
                          {ban.steamId && (
                            <div className="text-xs text-muted-foreground font-mono">{ban.steamId}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="p-4 max-w-xs">
                        <span className="text-foreground">{ban.reason}</span>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className="text-foreground font-medium">{ban.duration}</span>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className="text-cs2-blue">{ban.admin}</span>
                      </TableCell>
                      <TableCell className="p-4">
                        <Badge className={getStatusColor(ban.status)}>
                          {ban.status === "active" ? "Активен" : "Истек"}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-4">
                        <span className="text-muted-foreground">
                          {new Date(ban.date).toLocaleDateString('ru-RU')}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-cs2-dark-border">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Показано {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredBans.length)} из {filteredBans.length}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Назад
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Вперед
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-foreground">Последние наказания</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentBans.map((ban) => (
                  <div key={ban.id} className="p-4 rounded-lg bg-cs2-dark border border-cs2-dark-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Badge className={getTypeColor(ban.type)}>{ban.type}</Badge>
                        <span className="font-medium text-foreground">{ban.player}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(ban.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">{ban.reason}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Админ: {ban.admin}</span>
                      <span className="text-xs text-foreground">{ban.duration}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Статистика по типам</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Перманентные баны</span>
                      <Badge variant="destructive">{stats.permanent}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Временные баны</span>
                      <Badge className="bg-cs2-bronze text-foreground">{stats.temporary}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Баны чата</span>
                      <Badge className="bg-cs2-gold text-cs2-dark">{stats.chat}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Активность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Активные наказания</span>
                      <Badge className="bg-cs2-red text-foreground">{stats.active}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Истекшие наказания</span>
                      <Badge className="bg-cs2-green text-foreground">{stats.expired}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Всего наказаний</span>
                      <Badge variant="outline">{stats.total}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Banlist;