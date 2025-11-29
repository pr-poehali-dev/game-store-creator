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

interface Game {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  genre: string[];
  platform: string[];
  rating: number;
  discount?: number;
}

const mockGames: Game[] = [
  {
    id: 1,
    title: 'Cyber Warriors 2077',
    price: 1999,
    originalPrice: 2999,
    image: '/placeholder.svg',
    genre: ['Экшен', 'RPG'],
    platform: ['PC', 'PS5', 'Xbox'],
    rating: 4.8,
    discount: 33
  },
  {
    id: 2,
    title: 'Space Odyssey',
    price: 1499,
    image: '/placeholder.svg',
    genre: ['Приключения', 'Sci-Fi'],
    platform: ['PC', 'PS5'],
    rating: 4.6
  },
  {
    id: 3,
    title: 'Dragon Legends',
    price: 2499,
    originalPrice: 3499,
    image: '/placeholder.svg',
    genre: ['RPG', 'Фэнтези'],
    platform: ['PC', 'Xbox', 'Switch'],
    rating: 4.9,
    discount: 28
  },
  {
    id: 4,
    title: 'Racing Fury',
    price: 999,
    image: '/placeholder.svg',
    genre: ['Гонки', 'Спорт'],
    platform: ['PC', 'PS5', 'Xbox'],
    rating: 4.4
  },
  {
    id: 5,
    title: 'Zombie Survival',
    price: 1799,
    originalPrice: 2299,
    image: '/placeholder.svg',
    genre: ['Хоррор', 'Экшен'],
    platform: ['PC', 'PS5'],
    rating: 4.7,
    discount: 22
  },
  {
    id: 6,
    title: 'Mystery Manor',
    price: 899,
    image: '/placeholder.svg',
    genre: ['Квест', 'Приключения'],
    platform: ['PC', 'Switch'],
    rating: 4.5
  }
];

const genres = ['Экшен', 'RPG', 'Приключения', 'Sci-Fi', 'Фэнтези', 'Гонки', 'Спорт', 'Хоррор', 'Квест'];
const platforms = ['PC', 'PS5', 'Xbox', 'Switch'];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<number[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 3500]);
  const [showProfile, setShowProfile] = useState(false);

  const filteredGames = mockGames.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || game.genre.some(g => selectedGenres.includes(g));
    const matchesPlatform = selectedPlatforms.length === 0 || game.platform.some(p => selectedPlatforms.includes(p));
    const matchesPrice = game.price >= priceRange[0] && game.price <= priceRange[1];
    return matchesSearch && matchesGenre && matchesPlatform && matchesPrice;
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

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg gradient-purple flex items-center justify-center glow-purple">
                <Icon name="Gamepad2" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameStore
              </h1>
            </div>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск игр..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card border-border"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center gradient-magenta">
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
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((gameId, idx) => {
                          const game = mockGames.find(g => g.id === gameId);
                          return game ? (
                            <Card key={idx}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <span>{game.title}</span>
                                  <span className="font-bold">{game.price} ₽</span>
                                </div>
                              </CardContent>
                            </Card>
                          ) : null;
                        })}
                        <Button className="w-full gradient-purple">
                          Оформить заказ
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowProfile(!showProfile)}
              >
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 relative overflow-hidden rounded-2xl">
          <div className="gradient-purple p-12 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-5xl font-bold text-white mb-4 animate-fade-in">
                🎮 Топ игры недели
              </h2>
              <p className="text-white/90 text-xl mb-6 animate-slide-up">
                Скидки до 50% на лучшие хиты
              </p>
              <Button size="lg" variant="secondary" className="glow-magenta animate-scale-in">
                <Icon name="Sparkles" className="mr-2" size={20} />
                Смотреть все
              </Button>
            </div>
          </div>
        </section>

        <div className="flex gap-6">
          <aside className="w-64 space-y-6">
            <Card className="border-border">
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Filter" size={18} />
                    Фильтры
                  </h3>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Жанры</h4>
                  <div className="space-y-2">
                    {genres.map(genre => (
                      <div key={genre} className="flex items-center gap-2">
                        <Checkbox 
                          id={genre}
                          checked={selectedGenres.includes(genre)}
                          onCheckedChange={() => toggleGenre(genre)}
                        />
                        <label htmlFor={genre} className="text-sm cursor-pointer">
                          {genre}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Платформы</h4>
                  <div className="space-y-2">
                    {platforms.map(platform => (
                      <div key={platform} className="flex items-center gap-2">
                        <Checkbox 
                          id={platform}
                          checked={selectedPlatforms.includes(platform)}
                          onCheckedChange={() => togglePlatform(platform)}
                        />
                        <label htmlFor={platform} className="text-sm cursor-pointer">
                          {platform}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">
                    Цена: {priceRange[0]} - {priceRange[1]} ₽
                  </h4>
                  <Slider
                    min={0}
                    max={3500}
                    step={100}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedGenres([]);
                    setSelectedPlatforms([]);
                    setPriceRange([0, 3500]);
                  }}
                >
                  Сбросить
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold">
                Каталог игр
              </h3>
              <p className="text-muted-foreground">
                Найдено: {filteredGames.length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, idx) => (
                <Card 
                  key={game.id} 
                  className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:glow-purple animate-fade-in"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {game.discount && (
                        <Badge className="absolute top-2 right-2 gradient-magenta glow-magenta">
                          -{game.discount}%
                        </Badge>
                      )}
                      <div className="absolute bottom-2 left-2 flex gap-1">
                        {game.genre.slice(0, 2).map(genre => (
                          <Badge key={genre} variant="secondary" className="text-xs">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <h4 className="font-semibold text-lg">{game.title}</h4>
                      
                      <div className="flex items-center gap-2">
                        <Icon name="Star" className="text-yellow-400 fill-yellow-400" size={16} />
                        <span className="text-sm font-medium">{game.rating}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {game.platform.map(platform => (
                          <Badge key={platform} variant="outline" className="text-xs">
                            {platform}
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
                            {game.price} ₽
                          </span>
                        </div>
                      </div>

                      <Button 
                        className="w-full gradient-purple glow-purple"
                        onClick={() => addToCart(game.id)}
                      >
                        <Icon name="ShoppingCart" className="mr-2" size={18} />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
