import PrayerTimes from './PrayerTimes';
import { MapPin, Compass, Calendar } from 'lucide-react';

const NamazScreen = () => {
  return (
    <div className="pb-24 space-y-6">
      {/* Prayer Times */}
      <div className="px-4 pt-4">
        <PrayerTimes />
      </div>

      {/* Qibla Direction Placeholder */}
      <div className="px-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">কিবলা দিক</h3>
        <div className="islamic-card p-6 flex flex-col items-center justify-center space-y-4">
          <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
            <Compass className="w-16 h-16 text-primary" />
          </div>
          <p className="text-muted-foreground text-center">
            কিবলা দিক নির্ণয়ের জন্য আপনার ডিভাইসে কম্পাস সেন্সর প্রয়োজন
          </p>
        </div>
      </div>

      {/* Prayer Guide */}
      <div className="px-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">নামাজের রাকাত</h3>
        <div className="space-y-2">
          {[
            { name: 'ফজর', sunnah: '২', fard: '২' },
            { name: 'যোহর', sunnah: '৪+২', fard: '৪' },
            { name: 'আসর', sunnah: '৪', fard: '৪' },
            { name: 'মাগরিব', sunnah: '২', fard: '৩' },
            { name: 'ইশা', sunnah: '৪+২', fard: '৪', witr: '৩' },
          ].map((prayer) => (
            <div key={prayer.name} className="islamic-card p-4 flex items-center justify-between">
              <span className="font-medium text-foreground">{prayer.name}</span>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">সুন্নত: {prayer.sunnah}</span>
                <span className="text-primary font-medium">ফরজ: {prayer.fard}</span>
                {prayer.witr && <span className="text-muted-foreground">বিতর: {prayer.witr}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Important Dates */}
      <div className="px-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">গুরুত্বপূর্ণ তারিখ</h3>
        <div className="islamic-card p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium text-foreground">জুমআ মোবারক</p>
              <p className="text-sm text-muted-foreground">প্রতি শুক্রবার</p>
            </div>
          </div>
          <div className="border-t border-border/50 pt-3">
            <p className="text-sm text-muted-foreground">
              জুমআর দিনে সূরা কাহফ তিলাওয়াত করুন এবং নবী (সা.) এর উপর বেশি বেশি দরূদ পড়ুন।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NamazScreen;
