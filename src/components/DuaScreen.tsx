import { useState, useMemo } from 'react';
import { Search, X, ChevronLeft } from 'lucide-react';
import DuaCard from './DuaCard';
import { duaCategories, getDuasByCategory, searchDuas } from '@/data/duas';

const DuaScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDuas = useMemo(() => {
    if (searchQuery) {
      return searchDuas(searchQuery);
    }
    if (selectedCategory) {
      return getDuasByCategory(selectedCategory);
    }
    return [];
  }, [selectedCategory, searchQuery]);

  const selectedCategoryData = duaCategories.find(c => c.id === selectedCategory);

  return (
    <div className="pb-24">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="দোয়া খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-accent border-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {searchQuery ? (
          // Search Results
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {filteredDuas.length} টি দোয়া পাওয়া গেছে
            </p>
            {filteredDuas.map((dua, index) => (
              <DuaCard key={dua.id} dua={dua} index={index} />
            ))}
          </div>
        ) : selectedCategory ? (
          // Category View
          <div className="space-y-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2 text-primary"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>সব ক্যাটাগরি</span>
            </button>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <span>{selectedCategoryData?.icon}</span>
              {selectedCategoryData?.name}
            </h2>
            <div className="space-y-3">
              {filteredDuas.map((dua, index) => (
                <DuaCard key={dua.id} dua={dua} index={index} />
              ))}
            </div>
          </div>
        ) : (
          // Categories Grid
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">দোয়ার ক্যাটাগরি</h2>
            <div className="grid grid-cols-2 gap-3">
              {duaCategories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="islamic-card p-4 text-left hover:shadow-lg transition-all active:scale-[0.98] animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="text-3xl mb-2 block">{category.icon}</span>
                  <h3 className="font-semibold text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {getDuasByCategory(category.id).length} টি দোয়া
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuaScreen;
