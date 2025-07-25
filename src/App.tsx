import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Banlist from "./pages/Banlist";
import AdminPanel from "./pages/AdminPanel";
import Leaders from "./pages/Leaders";
import Rules from "./pages/Rules";
import Applications from "./pages/Applications";
import BattlePass from "./pages/BattlePass";
import ServerStats from "./pages/ServerStats";
import GameSettings from "./pages/GameSettings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/banlist" element={<Banlist />} />
          <Route path="/leaders" element={<Leaders />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/battlepass" element={<BattlePass />} />
          <Route path="/server-stats" element={<ServerStats />} />
          <Route path="/game-settings" element={<GameSettings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
