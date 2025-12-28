import { Home, BookOpen, Clock, Heart, CircleDot } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'home', label: 'হোম', icon: Home },
  { id: 'dua', label: 'দোয়া', icon: BookOpen },
  { id: 'namaz', label: 'নামাজ', icon: Clock },
  { id: 'tasbih', label: 'তাসবীহ', icon: CircleDot },
  { id: 'hadith', label: 'হাদীস', icon: Heart },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-area-bottom z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`nav-item flex-1 ${isActive ? 'active' : ''}`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-glow' 
                  : 'text-muted-foreground hover:bg-accent'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
