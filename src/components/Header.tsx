import { Moon, Sun, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showMosque?: boolean;
}

const Header = ({ title, subtitle, showMosque = true }: HeaderProps) => {
  return (
    <header className="islamic-header relative overflow-hidden">
      {showMosque && (
        <div className="absolute inset-0 mosque-pattern opacity-30" />
      )}
      <div className="relative z-10 px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-primary-foreground">{title}</h1>
            {subtitle && (
              <p className="text-primary-foreground/80 text-sm mt-1">{subtitle}</p>
            )}
          </div>
          <button className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
            <Settings className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-background to-transparent" />
    </header>
  );
};

export default Header;
