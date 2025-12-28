import { useState, useEffect } from 'react';
import { Heart, Share2, Copy, Check } from 'lucide-react';
import type { Dua } from '@/data/duas';

interface DuaCardProps {
  dua: Dua;
  index?: number;
}

const DuaCard = ({ dua, index = 0 }: DuaCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteDuas') || '[]');
    setIsFavorite(favorites.includes(dua.id));
  }, [dua.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteDuas') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((id: string) => id !== dua.id);
    } else {
      newFavorites = [...favorites, dua.id];
    }
    
    localStorage.setItem('favoriteDuas', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const copyToClipboard = async () => {
    const text = `${dua.title}\n\n${dua.arabic || ''}\n\n${dua.bangla}\n\n${dua.transliteration || ''}\n\n${dua.reference || ''}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="dua-card animate-slide-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-foreground flex-1">{dua.title}</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-primary" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <Heart 
              className={`w-4 h-4 transition-colors ${
                isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'
              }`} 
            />
          </button>
        </div>
      </div>

      {dua.arabic && (
        <p className="text-xl text-right font-arabic leading-loose text-foreground/90 py-3 border-b border-border/50">
          {dua.arabic}
        </p>
      )}

      <p className="text-foreground leading-relaxed py-2">
        {dua.bangla}
      </p>

      {dua.transliteration && (
        <p className="text-sm text-muted-foreground italic py-1">
          {dua.transliteration}
        </p>
      )}

      {dua.reference && (
        <div className="flex items-center gap-2 pt-2 mt-2 border-t border-border/50">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
            {dua.reference}
          </span>
        </div>
      )}
    </div>
  );
};

export default DuaCard;
