
import React, { useState, useEffect, useRef } from 'react';
import { ContentItem, FeedCategory } from './types';
import { MOCK_VIDEOS } from './constants';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import VideoCard from './components/VideoCard';
import UploadView from './components/UploadView';
import ProfileView from './components/ProfileView';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [category, setCategory] = useState<FeedCategory>('Videos');
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentView, setCurrentView] = useState<'feed' | 'upload' | 'profile'>('feed');
  const [feedItems, setFeedItems] = useState<ContentItem[]>(MOCK_VIDEOS);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showRealityCheck, setShowRealityCheck] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Intro Splash Timer
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3200); // Duration matches CSS animation flow
    return () => clearTimeout(splashTimer);
  }, []);

  // Mindfulness Timer: Increment every second when in the feed
  useEffect(() => {
    let interval: number;
    if (!showSplash && currentView === 'feed' && !showRealityCheck) {
      interval = window.setInterval(() => {
        setTimeSpent((prev) => {
          const newTime = prev + 1;
          // Trigger after 30 seconds
          if (newTime >= 30) {
            setShowRealityCheck(true);
            return 0; // Reset timer for next cycle
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentView, showRealityCheck, showSplash]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const height = e.currentTarget.clientHeight;
    const newIndex = Math.round(scrollTop / height);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const handlePost = (newItem: ContentItem) => {
    setFeedItems([newItem, ...feedItems]);
    setCategory('Videos');
    setCurrentView('feed');
    setActiveIndex(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredContent = feedItems.filter(item => {
    if (category === 'All') return true;
    if (category === 'Videos') return item.type === 'video';
    if (category === 'Photos') return item.type === 'photo';
    if (category === 'Posts') return item.type === 'post';
    return true;
  });

  const userUploadedItems = feedItems.filter(item => item.creator.handle === '@mindful_explorer');

  return (
    <div className="relative h-screen w-screen bg-[#050a14] overflow-hidden">
      
      {/* Intro Splash Screen */}
      {showSplash && (
        <div className="fixed inset-0 z-[1000] bg-[#050a14] flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-2 overflow-hidden px-10">
            <span className="text-white/40 text-sm uppercase tracking-[1em] mb-4 opacity-0 animate-in fade-in slide-in-from-bottom duration-1000 delay-100">MindfulStream</span>
            <div className="flex gap-4">
              <span className="text-5xl md:text-7xl font-black text-white opacity-0 animate-word-the tracking-tight">The</span>
              <span className="text-5xl md:text-7xl font-black text-[#E4FF1A] opacity-0 animate-word-reason tracking-tight">Reason</span>
            </div>
          </div>
          <div className="absolute bottom-12 w-8 h-[1px] bg-white/10 overflow-hidden">
             <div className="w-full h-full bg-[#E4FF1A] animate-in slide-in-from-left duration-[3000]"></div>
          </div>
        </div>
      )}

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[#0B1221] opacity-50"></div>

      {/* Status Bar Mockup */}
      <div className="fixed top-0 left-0 right-0 z-[160] h-10 px-8 flex justify-between items-center text-xs font-bold text-white pointer-events-none">
        <span>9:41</span>
        <div className="flex gap-2 items-center">
          <i className="fa-solid fa-signal"></i>
          <i className="fa-solid fa-wifi"></i>
          <i className="fa-solid fa-battery-full"></i>
        </div>
      </div>

      {!showSplash && currentView === 'feed' && (
        <>
          <TopNav activeCategory={category} onCategoryChange={setCategory} />
          
          {/* Vertical Feed Container */}
          <div 
            ref={scrollRef}
            className="h-full w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar animate-in fade-in duration-1000"
            onScroll={handleScroll}
          >
            {filteredContent.length > 0 ? (
              filteredContent.map((item, idx) => (
                <div key={item.id} className="snap-start h-full w-full">
                  <VideoCard item={item} isActive={idx === activeIndex} />
                </div>
              ))
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center p-10 text-center">
                <div className="text-4xl mb-4 opacity-20">
                  <i className="fa-solid fa-brain"></i>
                </div>
                <h2 className="text-xl font-bold mb-2">No {category} vetted yet</h2>
                <p className="text-white/40 text-sm">
                  The AI is currently vetting new educational content for your growth.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {!showSplash && currentView === 'upload' && (
        <UploadView 
          onClose={() => setCurrentView('feed')} 
          onPost={handlePost}
        />
      )}

      {!showSplash && currentView === 'profile' && <ProfileView userItems={userUploadedItems} />}

      {!showSplash && (
        <BottomNav 
          activeView={currentView} 
          onHomeClick={() => setCurrentView('feed')} 
          onUploadClick={() => setCurrentView('upload')} 
          onProfileClick={() => setCurrentView('profile')}
        />
      )}

      {/* Mindfulness Reality Check Modal */}
      {showRealityCheck && (
        <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black/80 backdrop-blur-[60px] p-8 animate-in fade-in duration-700">
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
             <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                <i className="fa-solid fa-briefcase text-4xl text-[#E4FF1A] drop-shadow-[0_0_15px_rgba(228,255,26,0.5)]"></i>
             </div>
             <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none px-4 drop-shadow-2xl">
                Go to work in <br/><span className="text-[#E4FF1A]">real life</span>
             </h1>
             <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-medium max-w-xs leading-relaxed">
                You have been reasoning for over 30 seconds. The collective intellect requires your presence in the physical world.
             </p>
          </div>
          
          <div className="w-full max-w-xs pb-12">
            <button 
              onClick={() => setShowRealityCheck(false)}
              className="w-full py-5 bg-[#E4FF1A] text-black font-black uppercase tracking-widest rounded-[28px] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(228,255,26,0.2)]"
            >
              Keep Reasoning
            </button>
            <p className="text-[10px] text-white/20 text-center mt-6 uppercase tracking-widest font-bold">
              Mindfulness Level: 10/10
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
