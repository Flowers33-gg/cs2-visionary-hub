import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, Clock, Trash2, Edit, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface BanRecord {
  id: number;
  type: "permanent" | "temporary" | "chat";
  player: string;
  steamId: string;
  reason: string;
  duration: string;
  admin: string;
  status: "active" | "expired";
  date: string;
}

const AdminPanel = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    player: "",
    steamId: "",
    reason: "",
    type: "",
    duration: "",
    customDuration: ""
  });

  const [banRecords, setBanRecords] = useState<BanRecord[]>([
    {
      id: 1,
      type: "permanent",
      player: "TestPlayer",
      steamId: "STEAM_1:0:123456",
      reason: "Читы",
      duration: "Навсегда",
      admin: "AdminUser",
      status: "active",
      date: "2024-01-15"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.player || !formData.reason || !formData.type) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const newBan: BanRecord = {
      id: Date.now(),
      type: formData.type as "permanent" | "temporary" | "chat",
      player: formData.player,
      steamId: formData.steamId || "Не указан",
      reason: formData.reason,
      duration: formData.type === "permanent" ? "Навсегда" : formData.duration || formData.customDuration,
      admin: "CurrentAdmin",
      status: "active",
      date: new Date().toISOString().split('T')[0]
    };

    setBanRecords([newBan, ...banRecords]);
    setFormData({
      player: "",
      steamId: "",
      reason: "",
      type: "",
      duration: "",
      customDuration: ""
    });

    toast({
      title: "Успешно",
      description: "Наказание успешно добавлено",
    });
  };

  const handleRemoveBan = (id: number) => {
    setBanRecords(banRecords.filter(ban => ban.id !== id));
    toast({
      title: "Удалено",
      description: "Наказание удалено",
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "permanent":
        return "Навсегда";
      case "temporary":
        return "Временно";
      case "chat":
        return "Чаты";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "permanent":
        return "bg-destructive text-destructive-foreground";
      case "temporary":
        return "bg-cs2-bronze text-foreground";
      case "chat":
        return "bg-cs2-gold text-cs2-dark";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Административная панель</h1>
          <p className="text-muted-foreground">Управление наказаниями и банами игроков</p>
        </div>

        <Tabs defaultValue="add-ban" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="add-ban" className="data-[state=active]:bg-cs2-gold data-[state=active]:text-cs2-dark">
              <Plus className="h-4 w-4 mr-2" />
              Добавить наказание
            </TabsTrigger>
            <TabsTrigger value="manage-bans" className="data-[state=active]:bg-cs2-gold data-[state=active]:text-cs2-dark">
              <Shield className="h-4 w-4 mr-2" />
              Управление банами
            </TabsTrigger>
            <TabsTrigger value="statistics" className="data-[state=active]:bg-cs2-gold data-[state=active]:text-cs2-dark">
              <Users className="h-4 w-4 mr-2" />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="add-ban">
            <Card className="bg-card border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Добавить новое наказание</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="player" className="text-foreground">
                        Имя игрока <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="player"
                        value={formData.player}
                        onChange={(e) => setFormData({...formData, player: e.target.value})}
                        placeholder="Введите имя игрока"
                        className="bg-input border-border"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="steamId" className="text-foreground">Steam ID</Label>
                      <Input
                        id="steamId"
                        value={formData.steamId}
                        onChange={(e) => setFormData({...formData, steamId: e.target.value})}
                        placeholder="STEAM_1:0:123456"
                        className="bg-input border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-foreground">
                        Тип наказания <span className="text-destructive">*</span>
                      </Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Выберите тип наказания" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="permanent">Навсегда (Перманентный бан)</SelectItem>
                          <SelectItem value="temporary">Временно (Временный бан)</SelectItem>
                          <SelectItem value="chat">Чаты (Мут)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.type === "temporary" && (
                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-foreground">Длительность</Label>
                        <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue placeholder="Выберите длительность" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1 час">1 час</SelectItem>
                            <SelectItem value="6 часов">6 часов</SelectItem>
                            <SelectItem value="1 день">1 день</SelectItem>
                            <SelectItem value="3 дня">3 дня</SelectItem>
                            <SelectItem value="1 неделя">1 неделя</SelectItem>
                            <SelectItem value="1 месяц">1 месяц</SelectItem>
                            <SelectItem value="custom">Указать свою</SelectItem>
                          </SelectContent>
                        </Select>
                        {formData.duration === "custom" && (
                          <Input
                            value={formData.customDuration}
                            onChange={(e) => setFormData({...formData, customDuration: e.target.value})}
                            placeholder="Например: 2 недели 3 дня"
                            className="bg-input border-border mt-2"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-foreground">
                      Причина <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="reason"
                      value={formData.reason}
                      onChange={(e) => setFormData({...formData, reason: e.target.value})}
                      placeholder="Укажите причину наказания"
                      className="bg-input border-border min-h-[100px]"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-cs2-gold hover:bg-cs2-gold-dark text-cs2-dark font-semibold"
                  >
                    Добавить наказание
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage-bans">
            <Card className="bg-card border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Управление наказаниями</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Поиск по имени игрока или причине..."
                        className="pl-10 bg-input border-border"
                      />
                    </div>
                  </div>

                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="text-foreground">Тип</TableHead>
                          <TableHead className="text-foreground">Игрок</TableHead>
                          <TableHead className="text-foreground">Steam ID</TableHead>
                          <TableHead className="text-foreground">Причина</TableHead>
                          <TableHead className="text-foreground">Длительность</TableHead>
                          <TableHead className="text-foreground">Админ</TableHead>
                          <TableHead className="text-foreground">Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {banRecords.map((ban) => (
                          <TableRow key={ban.id} className="hover:bg-muted/50">
                            <TableCell>
                              <Badge className={getTypeColor(ban.type)}>
                                {getTypeLabel(ban.type)}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium text-foreground">
                              {ban.player}
                            </TableCell>
                            <TableCell className="text-muted-foreground font-mono text-sm">
                              {ban.steamId}
                            </TableCell>
                            <TableCell className="text-muted-foreground max-w-xs truncate">
                              {ban.reason}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {ban.duration}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {ban.admin}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="h-8 w-8 p-0"
                                  onClick={() => handleRemoveBan(ban.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statistics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-card border-cs2-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-destructive/20 rounded-lg">
                      <Shield className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Всего банов</p>
                      <p className="text-2xl font-bold text-foreground">{banRecords.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-cs2-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Clock className="h-6 w-6 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Временных банов</p>
                      <p className="text-2xl font-bold text-foreground">
                        {banRecords.filter(ban => ban.type === "temporary").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-cs2-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <Users className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Мутов</p>
                      <p className="text-2xl font-bold text-foreground">
                        {banRecords.filter(ban => ban.type === "chat").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-cs2-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-cs2-gold/20 rounded-lg">
                      <Shield className="h-6 w-6 text-cs2-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Активных</p>
                      <p className="text-2xl font-bold text-foreground">
                        {banRecords.filter(ban => ban.status === "active").length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPanel;