import { useState, useMemo } from 'react';
import { Search, X, ChevronLeft } from 'lucide-react';
import HadithCard from './HadithCard';
import { hadithCategories, getHadithsByCategory, searchHadiths, getDailyHadith } from '@/data/hadith';

const HadithScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dailyHadith = getDailyHadith();

  const filteredHadiths = useMemo(() => {
    if (searchQuery) {
      return searchHadiths(searchQuery);
    }
    if (selectedCategory) {
      return getHadithsByCategory(selectedCategory);
    }
    return [];
  }, [selectedCategory, searchQuery]);

  const selectedCategoryData = hadithCategories.find(c => c.id === selectedCategory);

  return (
    <div className="pb-24">
      {/* Search Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm px-4 py-3 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="হাদীস খুঁজুন..."
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
              {filteredHadiths.length} টি হাদীস পাওয়া গেছে
            </p>
            {filteredHadiths.map((hadith, index) => (
              <HadithCard key={hadith.id} hadith={hadith} index={index} />
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
              {filteredHadiths.map((hadith, index) => (
                <HadithCard key={hadith.id} hadith={hadith} index={index} />
              ))}
            </div>
          </div>
        ) : (
          // Home View
          <div className="space-y-6">
            {/* Daily Hadith */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">আজকের হাদীস</h2>
              <div className="islamic-card p-4 space-y-3 border-l-4 border-primary">
                <h3 className="font-semibold text-foreground">{dailyHadith.title}</h3>
                <p className="text-foreground/90 leading-relaxed">{dailyHadith.bangla}</p>
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">{dailyHadith.narrator}</span>
                  <span className="text-xs font-medium text-primary">{dailyHadith.reference}</span>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">হাদীসের বিষয়</h2>
              <div className="grid grid-cols-2 gap-3">
                {hadithCategories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="islamic-card p-4 text-left hover:shadow-lg transition-all active:scale-[0.98] animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <span className="text-3xl mb-2 block">{category.icon}</span>
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {getHadithsByCategory(category.id).length} টি হাদীস
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HadithScreen;
