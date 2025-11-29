import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

interface Game {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  genre: string[];
  platform: string[];
  rating: number;
  downloads?: string;
  size?: string;
  discount?: number;
  isFree?: boolean;
  type: 'pc' | 'mobile';
}

const initialGames: Game[] = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    price: 2999,
    originalPrice: 3999,
    image: '/placeholder.svg',
    genre: ['Экшен', 'RPG'],
    platform: ['PC', 'Steam'],
    rating: 4.8,
    discount: 25,
    type: 'pc'
  },
  {
    id: 2,
    title: 'Elden Ring',
    price: 3499,
    image: '/placeholder.svg',
    genre: ['RPG', 'Фэнтези'],
    platform: ['PC', 'Steam'],
    rating: 4.9,
    type: 'pc'
  },
  {
    id: 3,
    title: 'GTA V',
    price: 1999,
    originalPrice: 2499,
    image: '/placeholder.svg',
    genre: ['Экшен', 'Открытый мир'],
    platform: ['PC', 'Epic Games'],
    rating: 4.7,
    discount: 20,
    type: 'pc'
  },
  {
    id: 4,
    title: 'Cosmic Clash',
    price: 0,
    isFree: true,
    image: '/placeholder.svg',
    genre: ['Экшен', 'Космос'],
    platform: ['iOS', 'Android'],
    rating: 4.8,
    downloads: '10M+',
    size: '156 МБ',
    type: 'mobile'
  },
  {
    id: 5,
    title: 'Dragon Fighters Pro',
    price: 599,
    originalPrice: 899,
    image: '/placeholder.svg',
    genre: ['RPG', 'Фэнтези'],
    platform: ['iOS', 'Android'],
    rating: 4.9,
    downloads: '5M+',
    size: '234 МБ',
    discount: 33,
    type: 'mobile'
  },
  {
    id: 6,
    title: 'Battle Royale Mobile',
    price: 0,
    isFree: true,
    image: '/placeholder.svg',
    genre: ['Экшен', 'Мультиплеер'],
    platform: ['iOS', 'Android'],
    rating: 4.8,
    downloads: '100M+',
    size: '523 МБ',
    type: 'mobile'
  }
];

const bonusPrizes = [
  { id: 1, text: '10%', color: 'gradient-purple', value: 10 },
  { id: 2, text: '25%', color: 'gradient-pink', value: 25 },
  { id: 3, text: '50%', color: 'gradient-orange', value: 50 },
  { id: 4, text: '+100₽', color: 'gradient-green', value: 100 },
  { id: 5, text: '5%', color: 'gradient-blue', value: 5 },
  { id: 6, text: '+50₽', color: 'gradient-purple', value: 50 },
  { id: 7, text: '15%', color: 'gradient-pink', value: 15 },
  { id: 8, text: '+200₽', color: 'gradient-green', value: 200 }
];

const Index = () => {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'pc' | 'mobile'>('pc');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPrize, setCurrentPrize] = useState<typeof bonusPrizes[0] | null>(null);
  const [balance, setBalance] = useState(0);
  
  const [newGame, setNewGame] = useState({
    title: '',
    price: '',
    image: '',
    genre: '',
    platform: '',
    type: 'pc' as 'pc' | 'mobile'
  });

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = game.type === activeTab;
    return matchesSearch && matchesType;
  });

  const addToCart = (gameId: number) => {
    setCart(prev => [...prev, gameId]);
  };

  const totalCartPrice = cart.reduce((sum, gameId) => {
    const game = games.find(g => g.id === gameId);
    return sum + (game?.price || 0);
  }, 0);

  const handleAddGame = () => {
    if (!newGame.title || !newGame.price) return;
    
    const game: Game = {
      id: games.length + 1,
      title: newGame.title,
      price: parseFloat(newGame.price),
      image: newGame.image || '/placeholder.svg',
      genre: newGame.genre.split(',').map(g => g.trim()),
      platform: newGame.platform.split(',').map(p => p.trim()),
      rating: 4.5,
      type: newGame.type,
      ...(newGame.type === 'mobile' && { downloads: '0+', size: '0 МБ' })
    };

    setGames([...games, game]);
    setNewGame({ title: '', price: '', image: '', genre: '', platform: '', type: 'pc' });
    setIsAdminOpen(false);
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setCurrentPrize(null);
    
    setTimeout(() => {
      const randomPrize = bonusPrizes[Math.floor(Math.random() * bonusPrizes.length)];
      setCurrentPrize(randomPrize);
      
      if (randomPrize.text.includes('₽')) {
        setBalance(prev => prev + randomPrize.value);
      }
      
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-purple flex items-center justify-center glow-purple">
                <Icon name="ShoppingBag" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  AdminShop.ru
                </h1>
                <p className="text-xs text-muted-foreground">Магазин цифровых игр</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    <Icon name="Settings" className="mr-2" size={16} />
                    Админ-панель
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Добавить игру</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Тип игры</Label>
                      <Tabs value={newGame.type} onValueChange={(v) => setNewGame({...newGame, type: v as any})}>
                        <TabsList className="w-full">
                          <TabsTrigger value="pc" className="flex-1">ПК игра</TabsTrigger>
                          <TabsTrigger value="mobile" className="flex-1">Мобильная игра</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Название игры</Label>
                      <Input 
                        placeholder="Введите название"
                        value={newGame.title}
                        onChange={(e) => setNewGame({...newGame, title: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Цена (₽)</Label>
                      <Input 
                        type="number"
                        placeholder="999"
                        value={newGame.price}
                        onChange={(e) => setNewGame({...newGame, price: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>URL изображения</Label>
                      <Input 
                        placeholder="https://example.com/image.jpg"
                        value={newGame.image}
                        onChange={(e) => setNewGame({...newGame, image: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Жанры (через запятую)</Label>
                      <Input 
                        placeholder="Экшен, RPG, Фэнтези"
                        value={newGame.genre}
                        onChange={(e) => setNewGame({...newGame, genre: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Платформы (через запятую)</Label>
                      <Input 
                        placeholder={newGame.type === 'pc' ? 'PC, Steam, Epic Games' : 'iOS, Android'}
                        value={newGame.platform}
                        onChange={(e) => setNewGame({...newGame, platform: e.target.value})}
                      />
                    </div>

                    <Button 
                      className="w-full gradient-purple glow-purple"
                      onClick={handleAddGame}
                    >
                      <Icon name="Plus" className="mr-2" size={18} />
                      Добавить игру
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center gradient-pink text-xs">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((gameId, idx) => {
                          const game = games.find(g => g.id === gameId);
                          return game ? (
                            <Card key={idx} className="border-border">
                              <CardContent className="p-3">
                                <div className="flex items-center gap-3">
                                  <img src={game.image} alt={game.title} className="w-12 h-12 rounded-lg object-cover" />
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{game.title}</p>
                                    <p className="text-xs text-muted-foreground">{game.platform.join(', ')}</p>
                                  </div>
                                  <span className="font-bold text-primary">
                                    {game.isFree ? 'Бесплатно' : `${game.price} ₽`}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          ) : null;
                        })}
                        
                        {balance > 0 && (
                          <Card className="border-green-500/50 bg-green-500/10">
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Бонусный баланс:</span>
                                <span className="font-bold text-green-400">+{balance} ₽</span>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        <div className="pt-4 border-t border-border">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">Сумма:</span>
                            <span className="text-sm">{totalCartPrice} ₽</span>
                          </div>
                          {balance > 0 && (
                            <>
                              <div className="flex justify-between mb-2 text-green-400">
                                <span className="text-sm">Бонусы:</span>
                                <span className="text-sm">-{Math.min(balance, totalCartPrice)} ₽</span>
                              </div>
                              <div className="flex justify-between mb-4 font-bold text-lg">
                                <span>Итого:</span>
                                <span className="text-primary">{Math.max(0, totalCartPrice - balance)} ₽</span>
                              </div>
                            </>
                          )}
                          {balance === 0 && (
                            <div className="flex justify-between mb-4 font-bold text-lg">
                              <span>Итого:</span>
                              <span className="text-primary">{totalCartPrice} ₽</span>
                            </div>
                          )}
                          <Button className="w-full gradient-purple glow-purple">
                            <Icon name="CreditCard" className="mr-2" size={18} />
                            Оформить заказ
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button variant="outline" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Поиск игр..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <section className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 relative overflow-hidden rounded-2xl animate-fade-in">
            <div className="gradient-purple p-8 md:p-10 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-0 mb-3">🔥 Топ продаж</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Лучшие игры недели
                </h2>
                <p className="text-white/90 mb-6">
                  Скидки до 50% на популярные игры
                </p>
                <Button size="lg" variant="secondary" className="glow-pink">
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Смотреть каталог
                </Button>
              </div>
            </div>
          </div>

          <Card className="border-border bg-gradient-to-br from-card to-card/50 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Gift" className="text-primary" size={24} />
                Бонусный барабан
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="w-full aspect-square rounded-full border-4 border-primary/30 flex items-center justify-center relative overflow-hidden">
                  <div className={`absolute inset-0 ${isSpinning ? 'animate-spin-slow' : ''}`}>
                    {bonusPrizes.map((prize, idx) => (
                      <div
                        key={prize.id}
                        className={`absolute w-full h-1/2 origin-bottom ${prize.color}`}
                        style={{
                          transform: `rotate(${idx * 45}deg)`,
                          clipPath: 'polygon(50% 0%, 65% 50%, 50% 100%, 35% 50%)'
                        }}
                      >
                        <div 
                          className="absolute top-2 left-1/2 -translate-x-1/2 text-white text-xs font-bold whitespace-nowrap"
                          style={{ transform: 'rotate(180deg)' }}
                        >
                          {prize.text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="relative z-10 w-16 h-16 rounded-full bg-card border-4 border-primary flex items-center justify-center glow-purple">
                    <Icon name="Star" className="text-primary" size={24} />
                  </div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20">
                  <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-primary glow-purple"></div>
                </div>
              </div>

              {currentPrize && (
                <div className="text-center p-4 rounded-lg border border-primary/50 bg-primary/10 animate-scale-in">
                  <p className="text-sm text-muted-foreground mb-1">Вы выиграли:</p>
                  <p className="text-2xl font-bold text-primary">
                    {currentPrize.text.includes('₽') ? `${currentPrize.text} на баланс` : `Скидка ${currentPrize.text}`}
                  </p>
                </div>
              )}

              <Button 
                className="w-full gradient-pink glow-pink"
                onClick={spinWheel}
                disabled={isSpinning}
              >
                {isSpinning ? (
                  <>
                    <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                    Вращается...
                  </>
                ) : (
                  <>
                    <Icon name="Play" className="mr-2" size={18} />
                    Крутить барабан
                  </>
                )}
              </Button>
              
              <p className="text-xs text-center text-muted-foreground">
                Получите скидку на покупку или бонусы на баланс!
              </p>
            </CardContent>
          </Card>
        </section>

        <div className="mb-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="pc" className="flex-1">
                <Icon name="Monitor" className="mr-2" size={18} />
                ПК игры
              </TabsTrigger>
              <TabsTrigger value="mobile" className="flex-1">
                <Icon name="Smartphone" className="mr-2" size={18} />
                Мобильные игры
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-1">
            {activeTab === 'pc' ? 'ПК игры' : 'Мобильные игры'}
          </h3>
          <p className="text-sm text-muted-foreground">Найдено: {filteredGames.length} игр</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredGames.map((game, idx) => (
            <Card 
              key={game.id} 
              className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:scale-[1.02] hover:glow-purple animate-fade-in"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={game.image} 
                    alt={game.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start">
                    {game.isFree && (
                      <Badge className="gradient-green glow-green text-white border-0">
                        Бесплатно
                      </Badge>
                    )}
                    {game.discount && (
                      <Badge className="gradient-orange glow-orange text-white border-0 ml-auto">
                        -{game.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex gap-1 flex-wrap">
                    {game.genre.slice(0, 2).map(genre => (
                      <Badge key={genre} variant="secondary" className="text-xs bg-black/60 text-white border-0">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <h4 className="font-bold text-lg leading-tight">{game.title}</h4>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="font-semibold text-foreground">{game.rating}</span>
                    </div>
                    {game.downloads && (
                      <div className="flex items-center gap-1">
                        <Icon name="Download" size={14} />
                        <span>{game.downloads}</span>
                      </div>
                    )}
                    {game.size && (
                      <div className="flex items-center gap-1">
                        <Icon name="HardDrive" size={14} />
                        <span>{game.size}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {game.platform.map(platform => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-2">
                    {game.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through mr-2">
                        {game.originalPrice} ₽
                      </span>
                    )}
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {game.isFree ? 'Бесплатно' : `${game.price} ₽`}
                    </span>
                  </div>

                  <Button 
                    className="w-full gradient-purple glow-purple"
                    onClick={() => addToCart(game.id)}
                  >
                    <Icon name="ShoppingBag" className="mr-2" size={18} />
                    {game.isFree ? 'Установить' : 'Купить'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <Icon name="SearchX" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold mb-2">Игры не найдены</h3>
            <p className="text-muted-foreground mb-6">
              Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-12 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
              <Icon name="ShoppingBag" className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg">AdminShop.ru</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Магазин цифровых игр для ПК и мобильных устройств
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">О нас</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Поддержка</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
