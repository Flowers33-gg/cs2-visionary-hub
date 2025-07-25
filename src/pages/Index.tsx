import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PlayerStats from "@/components/PlayerStats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PlayerStats />
      <Footer />
    </div>
  );
};

export default Index;
