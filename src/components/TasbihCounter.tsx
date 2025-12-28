import { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Settings2, Volume2, VolumeX, Save } from 'lucide-react';

const TasbihCounter = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [totalCount, setTotalCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showTargetSelector, setShowTargetSelector] = useState(false);

  const targets = [33, 99, 100, 500, 1000];

  useEffect(() => {
    const savedTotal = localStorage.getItem('tasbihTotal');
    if (savedTotal) {
      setTotalCount(parseInt(savedTotal));
    }
  }, []);

  const handleTap = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 150);
    
    const newCount = count + 1;
    setCount(newCount);
    
    if (newCount >= target) {
      // Reset and add to total
      setCount(0);
      const newTotal = totalCount + target;
      setTotalCount(newTotal);
      localStorage.setItem('tasbihTotal', newTotal.toString());
      
      // Vibration feedback if supported
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    } else if (navigator.vibrate && soundEnabled) {
      navigator.vibrate(10);
    }
  }, [count, target, totalCount, soundEnabled]);

  const reset = () => {
    setCount(0);
  };

  const resetTotal = () => {
    setTotalCount(0);
    localStorage.setItem('tasbihTotal', '0');
  };

  const progress = (count / target) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Target Selector */}
      {showTargetSelector && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-center animate-fade-in">
          <div className="islamic-card p-6 w-80 space-y-4">
            <h3 className="text-lg font-semibold text-center text-foreground">লক্ষ্য নির্ধারণ করুন</h3>
            <div className="grid grid-cols-3 gap-3">
              {targets.map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    setTarget(t);
                    setCount(0);
                    setShowTargetSelector(false);
                  }}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    target === t 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-accent text-accent-foreground hover:bg-primary/20'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTargetSelector(false)}
              className="w-full p-3 rounded-xl bg-muted text-muted-foreground"
            >
              বাতিল
            </button>
          </div>
        </div>
      )}

      {/* Total Count */}
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground">মোট গণনা</p>
        <p className="text-2xl font-bold text-foreground">{totalCount.toLocaleString('bn-BD')}</p>
      </div>

      {/* Progress Ring */}
      <div className="relative mb-8">
        <svg className="w-48 h-48 transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-muted"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={553}
            strokeDashoffset={553 - (553 * progress) / 100}
            className="text-primary transition-all duration-200"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Counter Button */}
        <button
          onClick={handleTap}
          className={`tasbih-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-foreground ${
            isAnimating ? 'scale-95' : ''
          }`}
        >
          <span className={isAnimating ? 'count-pulse' : ''}>
            {count.toLocaleString('bn-BD')}
          </span>
        </button>
      </div>

      {/* Target Display */}
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          লক্ষ্য: <span className="font-bold text-foreground">{target.toLocaleString('bn-BD')}</span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={reset}
          className="p-4 rounded-full bg-accent hover:bg-accent/80 transition-colors"
        >
          <RotateCcw className="w-6 h-6 text-accent-foreground" />
        </button>
        
        <button
          onClick={() => setShowTargetSelector(true)}
          className="p-4 rounded-full bg-accent hover:bg-accent/80 transition-colors"
        >
          <Settings2 className="w-6 h-6 text-accent-foreground" />
        </button>
        
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-4 rounded-full bg-accent hover:bg-accent/80 transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-6 h-6 text-accent-foreground" />
          ) : (
            <VolumeX className="w-6 h-6 text-accent-foreground" />
          )}
        </button>
      </div>

      {/* Tasbihat Guide */}
      <div className="mt-8 w-full max-w-sm space-y-2">
        <p className="text-sm text-center text-muted-foreground mb-3">তাসবীহাত</p>
        <div className="grid grid-cols-1 gap-2">
          {[
            { text: 'সুবহানাল্লাহ', count: '৩৩ বার' },
            { text: 'আলহামদুলিল্লাহ', count: '৩৩ বার' },
            { text: 'আল্লাহু আকবার', count: '৩৪ বার' },
          ].map((item) => (
            <div key={item.text} className="flex items-center justify-between p-3 rounded-xl bg-accent/50">
              <span className="text-foreground font-medium">{item.text}</span>
              <span className="text-sm text-muted-foreground">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasbihCounter;
