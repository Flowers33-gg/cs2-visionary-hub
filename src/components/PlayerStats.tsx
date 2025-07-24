import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PlayerStats = () => {
  const stats = [
    {
      label: "Игроков",
      value: "7981",
      icon: "🎮",
      color: "text-cs2-gold",
    },
    {
      label: "За 24 часа",
      value: "78",
      icon: "⏰",
      color: "text-cs2-gold",
    },
    {
      label: "VIP игроков",
      value: "25",
      icon: "👑",
      color: "text-cs2-gold",
    },
    {
      label: "Админов",
      value: "18",
      icon: "🛡️",
      color: "text-foreground",
    },
    {
      label: "Банов",
      value: "358",
      icon: "🚫",
      color: "text-cs2-red",
    },
    {
      label: "Мутов",
      value: "223",
      icon: "🔇",
      color: "text-muted-foreground",
    },
  ];

  return (
    <section className="py-16 bg-cs2-dark-lighter">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-foreground mb-12">
          Статистика сервера
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="bg-cs2-dark border-cs2-dark-border hover:border-cs2-red/30 transition-all duration-300 text-center group"
            >
              <CardHeader className="pb-2 pt-6">
                <div className="text-2xl mb-2 group-hover:animate-float">
                  {stat.icon}
                </div>
                <CardTitle className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0 pb-6">
                <div className={`text-2xl font-bold ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayerStats;