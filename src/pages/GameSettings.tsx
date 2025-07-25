import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Volume2, 
  Monitor, 
  Crosshair, 
  Gamepad2, 
  Download,
  Copy,
  Upload,
  Save,
  RotateCcw,
  Eye,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GameConfig {
  // Video settings
  resolution: string;
  aspectRatio: string;
  displayMode: string;
  brightness: number;
  digitalVibrance: number;
  
  // Audio settings
  masterVolume: number;
  musicVolume: number;
  effectVolume: number;
  voiceEnable: boolean;
  
  // Crosshair settings
  crosshairSize: number;
  crosshairThickness: number;
  crosshairGap: number;
  crosshairColor: string;
  crosshairOutline: boolean;
  
  // Controls
  sensitivity: number;
  zoomSensitivity: number;
  rawInput: boolean;
  mouseAcceleration: boolean;
  
  // Game settings
  fpsMax: number;
  showFps: boolean;
  showNetGraph: boolean;
  autoReload: boolean;
  fastWeaponSwitch: boolean;
}

const defaultConfig: GameConfig = {
  resolution: "1920x1080",
  aspectRatio: "16:9", 
  displayMode: "fullscreen",
  brightness: 130,
  digitalVibrance: 100,
  masterVolume: 50,
  musicVolume: 10,
  effectVolume: 80,
  voiceEnable: true,
  crosshairSize: 2,
  crosshairThickness: 1,
  crosshairGap: 1,
  crosshairColor: "#00FF00",
  crosshairOutline: true,
  sensitivity: 2.5,
  zoomSensitivity: 1.0,
  rawInput: true,
  mouseAcceleration: false,
  fpsMax: 300,
  showFps: true,
  showNetGraph: false,
  autoReload: true,
  fastWeaponSwitch: true
};

const GameSettings = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<GameConfig>(defaultConfig);
  const [configText, setConfigText] = useState("");

  const updateConfig = (key: keyof GameConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const generateConfigText = () => {
    const cfg = `// Headshot Master CS2 Config
// Generated at ${new Date().toLocaleString()}

// === VIDEO SETTINGS ===
mat_monitorgamma "${config.brightness / 100}"
mat_monitorgamma_tv_enabled "0"

// === AUDIO SETTINGS ===
volume "${config.masterVolume / 100}"
snd_musicvolume "${config.musicVolume / 100}"
snd_mixahead "0.05"
voice_enable "${config.voiceEnable ? '1' : '0'}"

// === CROSSHAIR SETTINGS ===
cl_crosshairsize "${config.crosshairSize}"
cl_crosshairthickness "${config.crosshairThickness}"
cl_crosshairgap "${config.crosshairGap}"
cl_crosshaircolor "5"
cl_crosshair_outlinethickness "${config.crosshairOutline ? '1' : '0'}"
cl_crosshairdot "0"
cl_crosshair_drawoutline "${config.crosshairOutline ? '1' : '0'}"

// === MOUSE SETTINGS ===
sensitivity "${config.sensitivity}"
zoom_sensitivity_ratio_mouse "${config.zoomSensitivity}"
m_rawinput "${config.rawInput ? '1' : '0'}"
m_mouseaccel1 "0"
m_mouseaccel2 "0"

// === GAME SETTINGS ===
fps_max "${config.fpsMax}"
cl_showfps "${config.showFps ? '1' : '0'}"
net_graph "${config.showNetGraph ? '1' : '0'}"
cl_autowepswitch "${config.fastWeaponSwitch ? '1' : '0'}"

// === BINDS ===
bind "w" "+forward"
bind "s" "+back"
bind "a" "+moveleft"
bind "d" "+moveright"
bind "ctrl" "+duck"
bind "shift" "+walk"
bind "space" "+jump"
bind "mouse1" "+attack"
bind "mouse2" "+attack2"
bind "r" "+reload"
bind "g" "drop"
bind "f" "+use"
bind "tab" "+showscores"
bind "b" "buymenu"

// === NETWORK ===
rate "786432"
cl_cmdrate "128"
cl_updaterate "128"
cl_interp "0"
cl_interp_ratio "1"

echo "Headshot Master CS2 Config loaded successfully!"`;

    return cfg;
  };

  const downloadConfig = () => {
    const configText = generateConfigText();
    const blob = new Blob([configText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'headshot_master_config.cfg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Конфиг скачан!",
      description: "Файл headshot_master_config.cfg сохранен в папку загрузок",
    });
  };

  const copyToClipboard = () => {
    const configText = generateConfigText();
    navigator.clipboard.writeText(configText);
    toast({
      title: "Скопировано!",
      description: "Конфиг скопирован в буфер обмена",
    });
  };

  const resetToDefault = () => {
    setConfig(defaultConfig);
    toast({
      title: "Настройки сброшены",
      description: "Все настройки возвращены к значениям по умолчанию",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
            <Settings className="h-8 w-8 text-cs2-red mr-3" />
            Настройки игры
          </h1>
          <p className="text-muted-foreground">
            Настройте параметры CS2 для оптимальной игры на серверах Headshot Master
          </p>
        </div>

        <Tabs defaultValue="video" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-cs2-dark-lighter">
            <TabsTrigger value="video" className="data-[state=active]:bg-cs2-red">
              <Monitor className="h-4 w-4 mr-2" />
              Видео
            </TabsTrigger>
            <TabsTrigger value="audio" className="data-[state=active]:bg-cs2-red">
              <Volume2 className="h-4 w-4 mr-2" />
              Звук
            </TabsTrigger>
            <TabsTrigger value="crosshair" className="data-[state=active]:bg-cs2-red">
              <Crosshair className="h-4 w-4 mr-2" />
              Прицел
            </TabsTrigger>
            <TabsTrigger value="controls" className="data-[state=active]:bg-cs2-red">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Управление
            </TabsTrigger>
            <TabsTrigger value="export" className="data-[state=active]:bg-cs2-red">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Дисплей</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resolution">Разрешение</Label>
                    <Select value={config.resolution} onValueChange={(value) => updateConfig('resolution', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1920x1080">1920x1080 (Full HD)</SelectItem>
                        <SelectItem value="2560x1440">2560x1440 (2K)</SelectItem>
                        <SelectItem value="3840x2160">3840x2160 (4K)</SelectItem>
                        <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayMode">Режим отображения</Label>
                    <Select value={config.displayMode} onValueChange={(value) => updateConfig('displayMode', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fullscreen">Полный экран</SelectItem>
                        <SelectItem value="windowed">Оконный</SelectItem>
                        <SelectItem value="borderless">Без рамки</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Изображение</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Яркость: {config.brightness}%</Label>
                    <Slider
                      value={[config.brightness]}
                      onValueChange={(value) => updateConfig('brightness', value[0])}
                      max={200}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Цифровая насыщенность: {config.digitalVibrance}%</Label>
                    <Slider
                      value={[config.digitalVibrance]}
                      onValueChange={(value) => updateConfig('digitalVibrance', value[0])}
                      max={200}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-6">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-foreground">Настройки звука</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Общая громкость: {config.masterVolume}%</Label>
                      <Slider
                        value={[config.masterVolume]}
                        onValueChange={(value) => updateConfig('masterVolume', value[0])}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Музыка: {config.musicVolume}%</Label>
                      <Slider
                        value={[config.musicVolume]}
                        onValueChange={(value) => updateConfig('musicVolume', value[0])}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Эффекты: {config.effectVolume}%</Label>
                      <Slider
                        value={[config.effectVolume]}
                        onValueChange={(value) => updateConfig('effectVolume', value[0])}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="voice">Голосовой чат</Label>
                      <Switch
                        id="voice"
                        checked={config.voiceEnable}
                        onCheckedChange={(checked) => updateConfig('voiceEnable', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crosshair" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Настройки прицела</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Размер: {config.crosshairSize}</Label>
                    <Slider
                      value={[config.crosshairSize]}
                      onValueChange={(value) => updateConfig('crosshairSize', value[0])}
                      max={10}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Толщина: {config.crosshairThickness}</Label>
                    <Slider
                      value={[config.crosshairThickness]}
                      onValueChange={(value) => updateConfig('crosshairThickness', value[0])}
                      max={5}
                      min={0}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Промежуток: {config.crosshairGap}</Label>
                    <Slider
                      value={[config.crosshairGap]}
                      onValueChange={(value) => updateConfig('crosshairGap', value[0])}
                      max={10}
                      min={-5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="outline">Обводка</Label>
                    <Switch
                      id="outline"
                      checked={config.crosshairOutline}
                      onCheckedChange={(checked) => updateConfig('crosshairOutline', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Предпросмотр
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative bg-gradient-to-br from-cs2-dark to-cs2-dark-lighter rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                    {/* Crosshair Preview */}
                    <div className="relative">
                      {/* Horizontal line */}
                      <div 
                        className="absolute bg-cs2-green"
                        style={{
                          width: `${config.crosshairSize * 6}px`,
                          height: `${config.crosshairThickness * 2}px`,
                          left: `${-config.crosshairSize * 3}px`,
                          top: `${-config.crosshairThickness}px`,
                          border: config.crosshairOutline ? '1px solid black' : 'none'
                        }}
                      />
                      {/* Vertical line */}
                      <div 
                        className="absolute bg-cs2-green"
                        style={{
                          width: `${config.crosshairThickness * 2}px`,
                          height: `${config.crosshairSize * 6}px`,
                          left: `${-config.crosshairThickness}px`,
                          top: `${-config.crosshairSize * 3}px`,
                          border: config.crosshairOutline ? '1px solid black' : 'none'
                        }}
                      />
                      {/* Gap */}
                      <div 
                        className="absolute bg-cs2-dark-lighter"
                        style={{
                          width: `${config.crosshairGap * 4}px`,
                          height: `${config.crosshairGap * 4}px`,
                          left: `${-config.crosshairGap * 2}px`,
                          top: `${-config.crosshairGap * 2}px`,
                        }}
                      />
                    </div>
                    
                    <Badge className="absolute top-2 right-2 bg-cs2-red text-primary-foreground">
                      Предпросмотр
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="controls" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Мышь</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Чувствительность: {config.sensitivity}</Label>
                    <Slider
                      value={[config.sensitivity]}
                      onValueChange={(value) => updateConfig('sensitivity', Math.round(value[0] * 100) / 100)}
                      max={10}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Чувствительность прицела: {config.zoomSensitivity}</Label>
                    <Slider
                      value={[config.zoomSensitivity]}
                      onValueChange={(value) => updateConfig('zoomSensitivity', Math.round(value[0] * 100) / 100)}
                      max={2}
                      min={0.1}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="rawInput">Raw Input</Label>
                    <Switch
                      id="rawInput"
                      checked={config.rawInput}
                      onCheckedChange={(checked) => updateConfig('rawInput', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="mouseAccel">Ускорение мыши</Label>
                    <Switch
                      id="mouseAccel"
                      checked={config.mouseAcceleration}
                      onCheckedChange={(checked) => updateConfig('mouseAcceleration', checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Игровые настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Максимальный FPS: {config.fpsMax}</Label>
                    <Slider
                      value={[config.fpsMax]}
                      onValueChange={(value) => updateConfig('fpsMax', value[0])}
                      max={500}
                      min={60}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="showFps">Показывать FPS</Label>
                    <Switch
                      id="showFps"
                      checked={config.showFps}
                      onCheckedChange={(checked) => updateConfig('showFps', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="showNet">NetGraph</Label>
                    <Switch
                      id="showNet"
                      checked={config.showNetGraph}
                      onCheckedChange={(checked) => updateConfig('showNetGraph', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="fastSwitch">Быстрая смена оружия</Label>
                    <Switch
                      id="fastSwitch"
                      checked={config.fastWeaponSwitch}
                      onCheckedChange={(checked) => updateConfig('fastWeaponSwitch', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card className="bg-cs2-dark-lighter border-cs2-dark-border">
              <CardHeader>
                <CardTitle className="text-foreground">Экспорт конфигурации</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={downloadConfig} variant="cs2" className="flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Скачать CFG
                  </Button>
                  
                  <Button onClick={copyToClipboard} variant="outline" className="flex items-center">
                    <Copy className="h-4 w-4 mr-2" />
                    Копировать
                  </Button>
                  
                  <Button onClick={resetToDefault} variant="destructive" className="flex items-center">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Сбросить
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="configPreview">Предпросмотр конфига</Label>
                  <Textarea
                    id="configPreview"
                    value={generateConfigText()}
                    readOnly
                    className="min-h-[300px] font-mono text-xs bg-cs2-dark border-cs2-dark-border"
                  />
                </div>

                <div className="bg-cs2-dark p-4 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Инструкция по установке:</h3>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Скачайте конфиг или скопируйте текст</li>
                    <li>Откройте папку Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg/</li>
                    <li>Вставьте файл в папку cfg</li>
                    <li>В игре выполните команду: exec headshot_master_config</li>
                    <li>Готово! Настройки применены</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default GameSettings;