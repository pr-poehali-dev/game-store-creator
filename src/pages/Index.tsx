import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Game {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  genre: string[];
  platform: string[];
  rating: number;
  downloads: string;
  size: string;
  discount?: number;
  isFree?: boolean;
}

const mockGames: Game[] = [
  {
    id: 1,
    title: 'Cosmic Clash',
    price: 0,
    isFree: true,
    image: '/placeholder.svg',
    genre: ['Экшен', 'Космос'],
    platform: ['iOS', 'Android'],
    rating: 4.8,
    downloads: '10M+',
    size: '156 МБ'
  },
  {
    id: 2,
    title: 'Candy Kingdom',
    price: 0,
    isFree: true,
    image: '/placeholder.svg',
    genre: ['Головоломка', 'Казуальная'],
    platform: ['iOS', 'Android'],
    rating: 4.6,
    downloads: '50M+',
    size: '89 МБ'
  },
  {
    id: 3,
    title: 'Dragon Fighters Pro',
    price: 599,
    originalPrice: 899,
    image: '/placeholder.svg',
    genre: ['RPG', 'Фэнтези'],
    platform: ['iOS', 'Android'],
    rating: 4.9,
    downloads: '5M+',
    size: '234 МБ',
    discount: 33
  },
  {
    id: 4,
    title: 'Speed Racing Xtreme',
    price: 299,
    image: '/placeholder.svg',
    genre: ['Гонки', 'Симулятор'],
    platform: ['iOS', 'Android'],
    rating: 4.5,
    downloads: '8M+',
    size: '412 МБ'
  },
  {
    id: 5,
    title: 'Zombie Apocalypse',
    price: 0,
    isFree: true,
    image: '/placeholder.svg',
    genre: ['Хоррор', 'Выживание'],
    platform: ['Android'],
    rating: 4.7,
    downloads: '15M+',
    size: '287 МБ'
  },
  {
    id: 6,
    title: 'Farm Paradise',
    price: 0,
    isFree: true,
    image: '/placeholder.svg',
    genre: ['Симулятор', 'Казуальная'],
    platform: ['iOS', 'Android'],
    rating: 4.4,
    downloads: '25M+',
    size: '145 МБ'
  },
  {
    id: 7,
    title: 'Battle Royale Mobile',
    price: 0,
    isFree: true,
    image: '/placeholder.svg',
    genre: ['Экшен', 'Мультиплеер'],
    platform: ['iOS', 'Android'],
    rating: 4.8,
    downloads: '100M+',
    size: '523 МБ'
  },
  {
    id: 8,
    title: 'Chess Master Premium',
    price: 449,
    originalPrice: 699,
    image: '/placeholder.svg',
    genre: ['Стратегия', 'Настольная'],
    platform: ['iOS', 'Android'],
    rating: 4.9,
    downloads: '3M+',
    size: '67 МБ',
    discount: 36
  },
  {
    id: 9,
    title: 'Pixel Dungeon',
    price: 0,
    isFree: true,
    image: '/placeholder.svg',
    genre: ['RPG', 'Roguelike'],
    platform: ['Android'],
    rating: 4.6,
    downloads: '12M+',
    size: '34 МБ'
  }
];

const genres = ['Экшен', 'RPG', 'Головоломка', 'Казуальная', 'Фэнтези', 'Гонки', 'Симулятор', 'Хоррор', 'Выживание', 'Стратегия', 'Мультиплеер'];
const platforms = ['iOS', 'Android'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [filterType, setFilterType] = useState<'all' | 'free' | 'paid'>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredGames = mockGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || game.genre.some(g => selectedGenres.includes(g));
    const matchesPlatform = selectedPlatforms.length === 0 || game.platform.some(p => selectedPlatforms.includes(p));
    const matchesPrice = game.price >= priceRange[0] && game.price <= priceRange[1];
    const matchesType = filterType === 'all' || 
      (filterType === 'free' && game.isFree) || 
      (filterType === 'paid' && !game.isFree);
    return matchesSearch && matchesGenre && matchesPlatform && matchesPrice && matchesType;
  });

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const addToCart = (gameId: number) => {
    setCart(prev => [...prev, gameId]);
  };

  const totalCartPrice = cart.reduce((sum, gameId) => {
    const game = mockGames.find(g => g.id === gameId);
    return sum + (game?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/90 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center glow-purple">
                <Icon name="Smartphone" className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  MobileGames
                </h1>
                <p className="text-xs text-muted-foreground">Магазин мобильных игр</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingBag" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center gradient-magenta text-xs">
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
                        <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-3" />
                        <p className="text-muted-foreground">Корзина пуста</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((gameId, idx) => {
                          const game = mockGames.find(g => g.id === gameId);
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
                        <div className="pt-4 border-t border-border">
                          <div className="flex justify-between mb-4">
                            <span className="font-semibold">Итого:</span>
                            <span className="font-bold text-xl text-primary">{totalCartPrice} ₽</span>
                          </div>
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
        <section className="mb-8 relative overflow-hidden rounded-2xl animate-fade-in">
          <div className="gradient-purple p-8 md:p-12 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-white/20 text-white border-0">🔥 Горячее</Badge>
                <Badge className="bg-white/20 text-white border-0">Новинки</Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 animate-fade-in">
                Топ игры недели
              </h2>
              <p className="text-white/90 text-lg mb-6 animate-slide-up">
                Скидки до 50% на лучшие мобильные игры
              </p>
              <div className="flex flex-wrap gap-3 animate-scale-in">
                <Button size="lg" variant="secondary" className="glow-magenta">
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Смотреть все
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Icon name="TrendingUp" className="mr-2" size={20} />
                  Рейтинг
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">Каталог игр</h3>
            <p className="text-sm text-muted-foreground">Найдено: {filteredGames.length} игр</p>
          </div>

          <div className="flex items-center gap-2">
            <Tabs value={filterType} onValueChange={(v) => setFilterType(v as any)} className="hidden sm:block">
              <TabsList>
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="free">Бесплатные</TabsTrigger>
                <TabsTrigger value="paid">Платные</TabsTrigger>
              </TabsList>
            </Tabs>

            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icon name="Filter" className="mr-2" size={16} />
                  Фильтры
                  {(selectedGenres.length > 0 || selectedPlatforms.length > 0) && (
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center gradient-magenta text-xs">
                      {selectedGenres.length + selectedPlatforms.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Gamepad2" size={18} />
                      Жанры
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {genres.map(genre => (
                        <div key={genre} className="flex items-center gap-2">
                          <Checkbox 
                            id={genre}
                            checked={selectedGenres.includes(genre)}
                            onCheckedChange={() => toggleGenre(genre)}
                          />
                          <label htmlFor={genre} className="text-sm cursor-pointer flex-1">
                            {genre}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="Smartphone" size={18} />
                      Платформы
                    </h4>
                    <div className="space-y-2">
                      {platforms.map(platform => (
                        <div key={platform} className="flex items-center gap-2">
                          <Checkbox 
                            id={platform}
                            checked={selectedPlatforms.includes(platform)}
                            onCheckedChange={() => togglePlatform(platform)}
                          />
                          <label htmlFor={platform} className="text-sm cursor-pointer flex-1">
                            {platform}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Icon name="DollarSign" size={18} />
                      Цена: {priceRange[0]} - {priceRange[1]} ₽
                    </h4>
                    <Slider
                      min={0}
                      max={1000}
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-4"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => {
                        setSelectedGenres([]);
                        setSelectedPlatforms([]);
                        setPriceRange([0, 1000]);
                      }}
                    >
                      Сбросить
                    </Button>
                    <Button 
                      className="flex-1 gradient-purple"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Применить
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-0 left-0 right-0 p-2 flex justify-between items-start">
                    {game.isFree && (
                      <Badge className="gradient-blue glow-blue text-white border-0">
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
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="font-semibold text-foreground">{game.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Download" size={14} />
                      <span>{game.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="HardDrive" size={14} />
                      <span>{game.size}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {game.platform.map(platform => (
                      <Badge key={platform} variant="outline" className="text-xs">
                        {platform === 'iOS' ? '🍎' : '🤖'} {platform}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      {game.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through mr-2">
                          {game.originalPrice} ₽
                        </span>
                      )}
                      <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {game.isFree ? 'Бесплатно' : `${game.price} ₽`}
                      </span>
                    </div>
                  </div>

                  <Button 
                    className="w-full gradient-purple glow-purple"
                    onClick={() => addToCart(game.id)}
                  >
                    {game.isFree ? (
                      <>
                        <Icon name="Download" className="mr-2" size={18} />
                        Установить
                      </>
                    ) : (
                      <>
                        <Icon name="ShoppingBag" className="mr-2" size={18} />
                        Купить
                      </>
                    )}
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
              Попробуйте изменить фильтры или поисковый запрос
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedGenres([]);
                setSelectedPlatforms([]);
                setPriceRange([0, 1000]);
                setFilterType('all');
              }}
            >
              Сбросить все фильтры
            </Button>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-12 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
              <Icon name="Smartphone" className="text-white" size={18} />
            </div>
            <span className="font-bold text-lg">MobileGames</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Лучшие мобильные игры для iOS и Android
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">О нас</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Поддержка</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Блог</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
