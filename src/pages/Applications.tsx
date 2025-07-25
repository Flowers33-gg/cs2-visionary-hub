import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Applications = () => {
  const [formData, setFormData] = useState({
    reason: "",
    steamId: "",
    nickname: "",
    contactInfo: "",
    additionalInfo: "",
    banType: "",
    appealType: "unban"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-cs2-dark flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <span className="mr-2">📝</span>
                  Мои заявки
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-cs2-dark-border hover:bg-cs2-dark"
                  >
                    Администрация
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-foreground">Информация</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-6xl mb-3">🔰</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">РЕКОМЕНДАЦИИ</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "Молодые" игроки "Славяне-CS2" - это ответственный член команды, который отвечает 
                      за качественное поддержание порядка и выступает ответственным модером среди 
                      игроков. Обычно должен быть внимательным и понимающе относиться разграничиться в 
                      нарушении и проводить полноценные меры, чтобы предотвратить конфликты и обеспечить 
                      честную игру. Основные обязанности модератора: Славяне-CS2: Реагирование на 
                      неадекватные поведения нарушения правил, записывай способления, авторство н.д. 
                      Такой, что, модератор может также высказать другие задачи, связанные с управлением 
                      сообществом и поддержанием порядка на сервере.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Администрация</CardTitle>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="border-cs2-blue text-cs2-blue">
                      DISCORD
                    </Badge>
                    <span className="text-muted-foreground">Неизвестный0000</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Тип заявки */}
                  <div className="space-y-3">
                    <Label className="text-foreground font-medium">Лист заявок</Label>
                    <Select defaultValue="administration">
                      <SelectTrigger className="bg-cs2-dark border-cs2-dark-border text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-cs2-dark-lighter border-cs2-dark-border">
                        <SelectItem value="administration" className="text-foreground">Администрация</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Steam ID */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-cs2-blue">🔵</span>
                      <Label className="text-foreground font-medium">TELEGRAMM</Label>
                    </div>
                    <Input
                      placeholder="Неизвестный0000"
                      className="bg-cs2-dark border-cs2-dark-border text-foreground placeholder:text-muted-foreground"
                      value={formData.steamId}
                      onChange={(e) => setFormData({...formData, steamId: e.target.value})}
                    />
                  </div>

                  {/* Никнейм */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">🔴</span>
                      <Label className="text-foreground font-medium">STEAM/ЧВК</Label>
                    </div>
                    <Input
                      placeholder="Неизвестный0000"
                      className="bg-cs2-dark border-cs2-dark-border text-foreground placeholder:text-muted-foreground"
                      value={formData.nickname}
                      onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    />
                  </div>

                  {/* Контактная информация */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-500">🟢</span>
                      <Label className="text-foreground font-medium">КОНТАКТ</Label>
                    </div>
                    <Input
                      placeholder="Сколько Вам полных лет"
                      className="bg-cs2-dark border-cs2-dark-border text-foreground placeholder:text-muted-foreground"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                    />
                  </div>

                  {/* Опыт работы */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500">🔵</span>
                      <Label className="text-foreground font-medium">ОПЫТ РАБОТЫ НА АНАЛОГИЧНЫХ СЕРВЕРАХ</Label>
                    </div>
                    <RadioGroup defaultValue="no" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" className="border-cs2-dark-border" />
                        <Label htmlFor="no" className="text-foreground">Нет опыта/Нет</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" className="border-cs2-dark-border" />
                        <Label htmlFor="yes" className="text-foreground">Опыт/Нет</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Опыт с читерами */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-blue-500">🔵</span>
                      <Label className="text-foreground font-medium">ОПЫТ РАБОТЫ НА СЕРВЕРАХ С ЧИТЕРАМИ</Label>
                    </div>
                    <RadioGroup defaultValue="no" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no-cheat" className="border-cs2-dark-border" />
                        <Label htmlFor="no-cheat" className="text-foreground">Нет опыт/нет</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes-cheat" className="border-cs2-dark-border" />
                        <Label htmlFor="yes-cheat" className="text-foreground">Опыт/нет</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Готовность к обучению */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500">🔴</span>
                      <Label className="text-foreground font-medium">Нет опыт/нет</Label>
                    </div>
                    <RadioGroup defaultValue="no" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="not-ready" className="border-cs2-dark-border" />
                        <Label htmlFor="not-ready" className="text-foreground">Нет опыт/нет</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="ready" className="border-cs2-dark-border" />
                        <Label htmlFor="ready" className="text-foreground">Опыт/нет</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-cs2-dark-border text-foreground hover:bg-cs2-dark"
                    >
                      Отправить заявку
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1 bg-cs2-red hover:bg-cs2-red/80"
                    >
                      Я передумал
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Applications;