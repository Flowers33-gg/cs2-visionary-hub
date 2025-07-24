import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, MapPin } from "lucide-react";

const ServerModes = () => {
  const servers = [
    {
      id: 1,
      name: "DUST2",
      mode: "Все",
      players: "12/32",
      map: "de_dust2",
      status: "online",
      featured: true
    }
  ];

  return (
    <section className="py-16 bg-cs2-dark">
      <div className="container mx-auto px-4">
        {/* Server Mode Selection */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-1 bg-cs2-dark-lighter rounded-lg p-1 border border-cs2-dark-border">
            <Button variant="cs2" size="sm" className="rounded-md">
              DUST2
            </Button>
          </div>
        </div>

        {/* Server Cards */}
        <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          {servers.map((server) => (
            <Card 
              key={server.id} 
              className={`bg-cs2-dark-lighter border-cs2-dark-border hover:border-cs2-red/50 transition-all duration-300 ${
                server.featured ? 'cs2-glow' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-foreground">
                    {server.name}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={server.featured ? "default" : "secondary"}
                      className={server.featured ? "bg-cs2-red text-primary-foreground" : ""}
                    >
                      {server.mode}
                    </Badge>
                    <div className="w-2 h-2 bg-cs2-gold rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{server.players}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{server.map}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button 
                      variant="cs2Outline" 
                      size="sm"
                      className="flex-1 mr-2"
                    >
                      Подключиться
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServerModes;