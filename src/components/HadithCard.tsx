import { useState } from 'react';
import { Bookmark, Share2 } from 'lucide-react';
import type { Hadith } from '@/data/hadith';

interface HadithCardProps {
  hadith: Hadith;
  index?: number;
}

const HadithCard = ({ hadith, index = 0 }: HadithCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="islamic-card p-4 space-y-3 animate-slide-up cursor-pointer hover:shadow-lg transition-all"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-foreground">{hadith.title}</h3>
        <button className="p-2 rounded-full hover:bg-accent transition-colors">
          <Bookmark className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <p className={`text-foreground leading-relaxed ${!isExpanded && hadith.bangla.length > 150 ? 'line-clamp-3' : ''}`}>
        {hadith.bangla}
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
            {hadith.narrator}
          </span>
        </div>
        <span className="text-xs font-medium text-primary">
          {hadith.reference}
        </span>
      </div>
    </div>
  );
};

export default HadithCard;
