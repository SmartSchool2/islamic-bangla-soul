import { useState, useEffect } from 'react';
import { BookOpen, Heart, Clock, CircleDot, ChevronRight, Star } from 'lucide-react';
import PrayerTimes from './PrayerTimes';
import { getDailyHadith } from '@/data/hadith';
import type { Hadith } from '@/data/hadith';

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const [dailyHadith, setDailyHadith] = useState<Hadith | null>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setDailyHadith(getDailyHadith());
    
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('সুপ্রভাত');
    } else if (hour < 17) {
      setGreeting('শুভ দুপুর');
    } else if (hour < 20) {
      setGreeting('শুভ সন্ধ্যা');
    } else {
      setGreeting('শুভ রাত্রি');
    }
  }, []);

  const quickActions = [
    { id: 'dua', label: 'দোয়া সমূহ', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
    { id: 'tasbih', label: 'তাসবীহ', icon: CircleDot, color: 'from-blue-500 to-cyan-500' },
    { id: 'hadith', label: 'হাদীস', icon: Heart, color: 'from-rose-500 to-pink-500' },
    { id: 'namaz', label: 'নামাজ', icon: Clock, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Greeting */}
      <div className="px-4">
        <p className="text-muted-foreground text-sm">{greeting}</p>
        <h2 className="text-xl font-bold text-foreground">আস-সালামু আলাইকুম</h2>
      </div>

      {/* Prayer Times */}
      <div className="px-4">
        <PrayerTimes />
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">দ্রুত প্রবেশ</h3>
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.id)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-all active:scale-95"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Hadith */}
      {dailyHadith && (
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">আজকের হাদীস</h3>
            <button 
              onClick={() => onNavigate('hadith')}
              className="text-sm text-primary flex items-center gap-1"
            >
              সব দেখুন <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="islamic-card p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-islamic-gold fill-islamic-gold" />
              <h4 className="font-semibold text-foreground">{dailyHadith.title}</h4>
            </div>
            <p className="text-foreground/90 leading-relaxed line-clamp-3">
              {dailyHadith.bangla}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <span className="text-xs text-muted-foreground">{dailyHadith.narrator}</span>
              <span className="text-xs font-medium text-primary">{dailyHadith.reference}</span>
            </div>
          </div>
        </div>
      )}

      {/* Features Preview */}
      <div className="px-4 space-y-3">
        <h3 className="text-lg font-semibold text-foreground">বিশেষ বৈশিষ্ট্য</h3>
        
        <button 
          onClick={() => onNavigate('dua')}
          className="w-full islamic-card p-4 flex items-center gap-4 hover:shadow-lg transition-all"
        >
          <div className="p-3 rounded-xl bg-primary/10">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-semibold text-foreground">সম্পূর্ণ দোয়া সংকলন</h4>
            <p className="text-sm text-muted-foreground">সকল প্রয়োজনীয় মাসনূন দোয়া বাংলায়</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        <button 
          onClick={() => onNavigate('tasbih')}
          className="w-full islamic-card p-4 flex items-center gap-4 hover:shadow-lg transition-all"
        >
          <div className="p-3 rounded-xl bg-blue-500/10">
            <CircleDot className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="font-semibold text-foreground">ডিজিটাল তাসবীহ</h4>
            <p className="text-sm text-muted-foreground">সহজে গণনা করুন ও সংরক্ষণ করুন</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
