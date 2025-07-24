import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Rules = () => {
  const [activeSection, setActiveSection] = useState("general");

  const rulesData = {
    general: [
      {
        id: "1.1",
        title: "Администрация проекта имеет право выдавать наказания по своему усмотрению",
        punishment: "Наказание: По усмотрению администрации",
      },
      {
        id: "1.2", 
        title: "Незнание правил не освобождает от ответственности",
        punishment: "Наказание: Предупреждение",
      },
      {
        id: "1.3",
        title: "Попытка обойти наказание (смена ника, SteamID) запрещена",
        punishment: "Наказание: Увеличение срока наказания в 2 раза",
      },
    ],
    communication: [
      {
        id: "2.1",
        title: "Запрещено использование программ для изменения голоса, а так же использование сторонних программ для включения музыки/звуков.",
        punishment: "Наказание: Предупреждение, Мут от 10 минут до 1 часа",
      },
      {
        id: "2.2",
        title: "Запрещено применение оскорблений и слова в любом его виде",
        punishment: "Наказание: Мут, Гаг последующие нарушения Мут впоть до 7 дней",
      },
      {
        id: "2.3",
        title: "Запрещено любое оскорбление/унижение родственников игроков",
        punishment: "Наказание: Мут, Гаг на 7 дней",
      },
    ],
    forbidden: [
      {
        id: "3.1",
        title: "Запрещено использование читов, багов и эксплойтов",
        punishment: "Наказание: Бан навсегда",
      },
      {
        id: "3.2",
        title: "Запрещена передача аккаунта третьим лицам",
        punishment: "Наказание: Бан 30 дней",
      },
      {
        id: "3.3",
        title: "Запрещено создание мультиаккаунтов",
        punishment: "Наказание: Бан 7 дней",
      },
    ],
    privileges: [
      {
        id: "4.1",
        title: "Владельцы привилегий должны соблюдать все правила проекта",
        punishment: "Наказание: Лишение привилегии + основное наказание",
      },
      {
        id: "4.2",
        title: "Запрещена передача привилегий другим игрокам",
        punishment: "Наказание: Лишение привилегии навсегда",
      },
      {
        id: "4.3",
        title: "Злоупотребление возможностями привилегий",
        punishment: "Наказание: Лишение привилегии на 30 дней",
      },
    ],
    adminCheck: [
      {
        id: "5.1",
        title: "Администратор обязан предоставить демо записи по требованию",
        punishment: "Наказание: Снятие с должности",
      },
      {
        id: "5.2",
        title: "Администратор должен соблюдать этику общения",
        punishment: "Наказание: Выговор / Снятие с должности",
      },
    ],
    playerCheck: [
      {
        id: "6.1",
        title: "Игрок обязан предоставить демо записи по требованию администрации",
        punishment: "Наказание: Бан 7 дней (отказ от предоставления)",
      },
      {
        id: "6.2",
        title: "Игрок должен включить демо запись при подозрении в читах",
        punishment: "Наказание: Бан 30 дней (отказ от включения)",
      },
    ],
  };

  const sections = [
    { id: "general", title: "Общие положения", icon: "📖", description: "Основные правила проекта" },
    { id: "communication", title: "Общение", icon: "💬", description: "Правила общения в чате и голосе" },
    { id: "forbidden", title: "На серверах запрещено", icon: "📵", description: "Запрещенные действия" },
    { id: "privileges", title: "Правила для привилегий", icon: "⚖️", description: "Особые правила для VIP игроков" },
    { id: "adminCheck", title: "Проверка (Администратора)", icon: "🛡️", description: "Правила для администрации" },
    { id: "playerCheck", title: "Проверка (Игрок)", icon: "🎮", description: "Правила проверки игроков" },
  ];

  return (
    <div className="min-h-screen bg-cs2-dark flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">ПРАВИЛА ПРОЕКТА CS2GG</h1>
            <p className="text-cs2-red text-lg">НАЙДИТЕ ОТВЕТЫ НА СВОИ ВОПРОСЫ</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardContent className="p-4">
                  <h3 className="text-foreground font-bold mb-4 flex items-center">
                    <span className="mr-2">📋</span>
                    Разделы правил
                  </h3>
                   <div className="space-y-2">
                    {sections.map((section) => (
                      <div 
                        key={section.id}
                        className={`p-3 bg-cs2-dark rounded cursor-pointer hover:bg-cs2-dark/80 transition-colors ${
                          activeSection === section.id ? 'border-l-4 border-cs2-red' : ''
                        }`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <span className="text-muted-foreground">{section.icon}</span>
                        <span className={`ml-2 ${activeSection === section.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {section.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      {sections.find(s => s.id === activeSection)?.title}
                    </h2>
                    <Badge variant="secondary" className="bg-cs2-dark text-muted-foreground">
                      29 мая 2025
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {rulesData[activeSection as keyof typeof rulesData]?.map((rule) => (
                      <div key={rule.id} className="border-l-4 border-cs2-red pl-4">
                        <div className="flex items-start space-x-2 mb-2">
                          <Badge variant="destructive" className="bg-cs2-red text-primary-foreground shrink-0">
                            {rule.id}
                          </Badge>
                          <p className="text-foreground leading-relaxed">{rule.title}</p>
                        </div>
                        <p className="text-cs2-red text-sm font-medium ml-12">{rule.punishment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Rules;