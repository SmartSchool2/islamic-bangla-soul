import { useState } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import HomeScreen from '@/components/HomeScreen';
import DuaScreen from '@/components/DuaScreen';
import NamazScreen from '@/components/NamazScreen';
import TasbihCounter from '@/components/TasbihCounter';
import HadithScreen from '@/components/HadithScreen';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const getHeaderProps = () => {
    switch (activeTab) {
      case 'home':
        return { title: 'ইসলামিক বাংলা', subtitle: 'আপনার ইসলামী সঙ্গী' };
      case 'dua':
        return { title: 'দোয়া সমূহ', subtitle: 'প্রয়োজনীয় সব দোয়া বাংলায়' };
      case 'namaz':
        return { title: 'নামাজের সময়', subtitle: 'আজকের নামাজের সময়সূচী' };
      case 'tasbih':
        return { title: 'ডিজিটাল তাসবীহ', subtitle: 'যিকির গণনা করুন', showMosque: false };
      case 'hadith':
        return { title: 'হাদীস শরীফ', subtitle: 'রাসূলুল্লাহ (সা.) এর বাণী' };
      default:
        return { title: 'ইসলামিক বাংলা' };
    }
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen onNavigate={setActiveTab} />;
      case 'dua':
        return <DuaScreen />;
      case 'namaz':
        return <NamazScreen />;
      case 'tasbih':
        return <TasbihCounter />;
      case 'hadith':
        return <HadithScreen />;
      default:
        return <HomeScreen onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header {...getHeaderProps()} />
      <main className="pt-2">
        {renderScreen()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
