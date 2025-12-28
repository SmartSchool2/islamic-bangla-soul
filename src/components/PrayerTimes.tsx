import { useState, useEffect } from 'react';
import { MapPin, RefreshCw } from 'lucide-react';

interface PrayerTime {
  name: string;
  nameBn: string;
  time: string;
}

const PrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [currentPrayer, setCurrentPrayer] = useState<string>('');
  const [nextPrayer, setNextPrayer] = useState<{ name: string; countdown: string }>({ name: '', countdown: '' });
  const [location, setLocation] = useState<string>('ঢাকা, বাংলাদেশ');
  const [hijriDate, setHijriDate] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const defaultPrayerTimes: PrayerTime[] = [
    { name: 'Fajr', nameBn: 'ফজর', time: '05:15' },
    { name: 'Sunrise', nameBn: 'সূর্যোদয়', time: '06:30' },
    { name: 'Dhuhr', nameBn: 'যোহর', time: '12:05' },
    { name: 'Asr', nameBn: 'আসর', time: '15:45' },
    { name: 'Maghrib', nameBn: 'মাগরিব', time: '17:55' },
    { name: 'Isha', nameBn: 'ইশা', time: '19:15' },
  ];

  useEffect(() => {
    // Simulating API call for prayer times
    setTimeout(() => {
      setPrayerTimes(defaultPrayerTimes);
      setHijriDate('২৫ জুমাদাল আখিরা ১৪৪৬');
      setLoading(false);
      
      // Determine current and next prayer
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();
      
      let nextPrayerIndex = 0;
      for (let i = 0; i < defaultPrayerTimes.length; i++) {
        const [hours, minutes] = defaultPrayerTimes[i].time.split(':').map(Number);
        const prayerTime = hours * 60 + minutes;
        if (currentTime < prayerTime) {
          nextPrayerIndex = i;
          break;
        }
      }
      
      if (nextPrayerIndex > 0) {
        setCurrentPrayer(defaultPrayerTimes[nextPrayerIndex - 1].name);
      }
      setNextPrayer({ 
        name: defaultPrayerTimes[nextPrayerIndex].nameBn, 
        countdown: calculateCountdown(defaultPrayerTimes[nextPrayerIndex].time) 
      });
    }, 500);
  }, []);

  const calculateCountdown = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const prayerDate = new Date();
    prayerDate.setHours(hours, minutes, 0);
    
    if (prayerDate <= now) {
      prayerDate.setDate(prayerDate.getDate() + 1);
    }
    
    const diff = prayerDate.getTime() - now.getTime();
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${h}ঘ ${m}মি`;
  };

  if (loading) {
    return (
      <div className="islamic-card p-6 animate-pulse">
        <div className="h-8 bg-muted rounded w-1/2 mb-4" />
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Next Prayer Card */}
      <div className="islamic-header rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 mosque-pattern opacity-20" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/80 text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <p className="text-primary-foreground/70 text-sm mb-1">{hijriDate}</p>
          <div className="mt-4">
            <p className="text-primary-foreground/80 text-sm">পরবর্তী নামাজ</p>
            <h2 className="text-3xl font-bold text-primary-foreground">{nextPrayer.name}</h2>
            <p className="text-xl text-primary-foreground/90 mt-1">{nextPrayer.countdown}</p>
          </div>
        </div>
      </div>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-3 gap-3">
        {prayerTimes.map((prayer, index) => (
          <div
            key={prayer.name}
            className={`prayer-time-card ${currentPrayer === prayer.name ? 'active' : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <p className="text-xs text-muted-foreground">{prayer.nameBn}</p>
            <p className="text-lg font-bold text-foreground">{prayer.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrayerTimes;
