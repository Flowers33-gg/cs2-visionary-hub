import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Rules = () => {
  const rules = [
    {
      id: "11",
      title: "Запрещено использование программ для изменения голоса, а так же использование сторонних программ для включения музыки/звуков.",
      punishment: "Наказание: Предупреждение, Мут от 10 минут до 1 часа",
      category: "general"
    },
    {
      id: "12",
      title: "Запрещено применение оскорблений и слова в любом его виде",
      punishment: "Наказание: Мут, Гаг последующие нарушения Мут впоть до 7 дней",
      category: "general"
    },
    {
      id: "13",
      title: "Запрещено любое оскорбление/унижение родственников игроков",
      punishment: "Наказание: Мут, Гаг на 7 дней",
      category: "general"
    },
    {
      id: "14",
      title: "Запрещено распространение присутствия администрации проекта на сервере, если он находится в режиме сверки.",
      punishment: "Наказание: Предупреждение, Мут от 10 минут до 1 часа",
      category: "general"
    },
    {
      id: "15",
      title: "Микрофон 16+ Исключение: Вы можете говорить с разрешения СОЗДАТЕЛЕЙ или ВЫСШЕЙ АДМИНИСТРАЦИИ",
      punishment: "Наказание: Предупреждение, Мут от 10 минут до 1 часа",
      category: "general"
    },
    {
      id: "16",
      title: "Спам в микрофон/чат (Крик, спам одинаковыми сообщениями)",
      punishment: "Наказание: Предупреждение, Мут от 10 минут до 1 часа",
      category: "general"
    },
    {
      id: "17",
      title: "Запрещено попрошайничество чего-либо у игроков, администрации и модераторов проекта",
      punishment: "Наказание: Мут 1 час",
      category: "general"
    },
    {
      id: "18",
      title: "Запрещено рекламировать какие-либо сервера, сайты, услуги и т.д. и т.п., если реклама не относится к проекту",
      punishment: "Наказание: Мут 1 день / постоянный нарушение Бан 7 дней",
      category: "general"
    },
    {
      id: "19",
      title: "Провокация на нарушения правил (Подстрекательство)",
      punishment: "Наказание: Бан от 15 минут до 1 часа",
      category: "general"
    },
    {
      id: "110",
      title: "Запрещено осуществление действий администрацией/Модерацией на игровых серверах",
      punishment: "Наказание: Мут 1 час",
      category: "general"
    },
    {
      id: "111",
      title: "Запрещено мошенничество (неоправданно злоупотребление) в любых формах",
      punishment: "Наказание: Предупреждение, Мут от 10 минут до 1 часа",
      category: "general"
    },
    {
      id: "112",
      title: "Запрещено вводить в заблуждение Администрацию/Модерацию проекта",
      punishment: "Наказание: Бан 1 час",
      category: "general"
    },
    {
      id: "113",
      title: "Запрещено распространять личную информацию игроков проекта без их согласия",
      punishment: "Наказание: Мут 1 день",
      category: "general"
    }
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
                    <div className="p-3 bg-cs2-dark rounded cursor-pointer hover:bg-cs2-dark/80 transition-colors">
                      <span className="text-muted-foreground">📖</span>
                      <span className="ml-2 text-foreground">Общие положения</span>
                    </div>
                    <div className="p-3 bg-cs2-dark rounded cursor-pointer hover:bg-cs2-dark/80 transition-colors">
                      <span className="text-muted-foreground">💬</span>
                      <span className="ml-2 text-muted-foreground">Общение</span>
                    </div>
                    <div className="p-3 bg-cs2-dark rounded cursor-pointer hover:bg-cs2-dark/80 transition-colors">
                      <span className="text-muted-foreground">📵</span>
                      <span className="ml-2 text-muted-foreground">На серверах запрещено</span>
                    </div>
                    <div className="p-3 bg-cs2-dark rounded cursor-pointer hover:bg-cs2-dark/80 transition-colors">
                      <span className="text-muted-foreground">⚖️</span>
                      <span className="ml-2 text-muted-foreground">Правила для привилегий</span>
                    </div>
                    <div className="p-3 bg-cs2-dark rounded cursor-pointer hover:bg-cs2-dark/80 transition-colors">
                      <span className="text-muted-foreground">🛡️</span>
                      <span className="ml-2 text-muted-foreground">Проверка (Администратора)</span>
                    </div>
                    <div className="p-3 bg-cs2-dark rounded cursor-pointer hover:bg-cs2-dark/80 transition-colors">
                      <span className="text-muted-foreground">🎮</span>
                      <span className="ml-2 text-muted-foreground">Проверка (Игрок)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Общение</h2>
                    <Badge variant="secondary" className="bg-cs2-dark text-muted-foreground">
                      29 мая 2025
                    </Badge>
                  </div>

                  <div className="space-y-6">
                    {rules.map((rule) => (
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