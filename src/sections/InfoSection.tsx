import { useState, useEffect, useRef } from 'react';
import { History, Award, BookOpen } from 'lucide-react';
import { infoConfig } from '../config';
import { smoothScrollToSection } from '../lib/smoothScroll';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  History, Award, BookOpen,
};

export function InfoSection() {
  // Null check: if config is empty, render nothing
  if (!infoConfig.mainTitle) return null;

  const [activeTab, setActiveTab] = useState(infoConfig.tabs[0]?.id || '');
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0); // Track active timeline item
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const activeTabData = infoConfig.tabs.find(tab => tab.id === activeTab);
  const activeTimelineEvent = infoConfig.timeline[activeTimelineIdx];

  return (
    <section
      id="info"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full" style={{ background: 'radial-gradient(ellipse at 100% 30%, rgba(16,185,129,0.06) 0%, transparent 60%)' }} />
        <div className="absolute left-0 bottom-0 w-1/3 h-1/2" style={{ background: 'radial-gradient(ellipse at 0% 100%, rgba(16,185,129,0.04) 0%, transparent 60%)' }} />
        {/* Subtle horizontal line */}
        <div className="absolute top-0 left-0 right-0 section-divider" />
        <div className="absolute bottom-0 left-0 right-0 section-divider" />
      </div>

      <div className="container-custom relative">
        {/* Top Info Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Left Content */}
          <div>
            {/* Section Header */}
            <div className="slide-in-left mb-10">
              <span className="font-script text-3xl text-green-400 block mb-2">{infoConfig.scriptText}</span>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #10b981, transparent)' }} />
                <span className="text-green-500 text-xs uppercase tracking-[0.2em]">
                  {infoConfig.subtitle}
                </span>
              </div>
              <h2 className="font-serif text-h1 text-white has-bar">
                {infoConfig.mainTitle}
              </h2>
            </div>

            {/* Introduction */}
            {infoConfig.introText && (
              <p className="fade-up text-white/70 leading-relaxed mb-10 text-base" style={{ transitionDelay: '0.1s' }}>
                {infoConfig.introText}
              </p>
            )}

            {/* Tabs */}
            {infoConfig.tabs.length > 0 && (
              <div className="fade-up flex flex-wrap gap-2 mb-8" style={{ transitionDelay: '0.15s' }}>
                {infoConfig.tabs.map((tab) => {
                  const IconComponent = iconMap[tab.icon];
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      aria-pressed={activeTab === tab.id}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'text-white shadow-lg'
                          : 'text-white/60 hover:text-white/90 border border-white/10 hover:border-white/20 bg-white/3 hover:bg-white/6'
                      }`}
                      style={activeTab === tab.id ? {
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
                      } : {}}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {tab.name}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Tab Content */}
            <div className="fade-up" style={{ transitionDelay: '0.2s' }}>
              {activeTabData && (
                <div
                  className="p-6 rounded-xl transition-all duration-500"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderLeft: '2px solid rgba(16,185,129,0.4)',
                  }}
                >
                  <h3 className="font-serif text-h5 text-white mb-4">
                    {activeTabData.content.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-5">
                    {activeTabData.content.description}
                  </p>
                  <div
                    className="flex items-center gap-3 py-3 px-4 rounded-lg"
                    style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" style={{ boxShadow: '0 0 6px rgba(16,185,129,0.8)' }} />
                    <span className="text-sm font-medium text-green-400">
                      {activeTabData.content.highlight}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="slide-in-right relative" style={{ transitionDelay: '0.15s' }}>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden" style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
              {infoConfig.tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`absolute inset-0 transition-all duration-500 ${
                    activeTab === tab.id
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <img
                    src={tab.image}
                    alt={`${tab.name} - ${infoConfig.mainTitle}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                </div>
              ))}

              {/* Year Badge */}
              {infoConfig.yearBadge && (
                <div
                  className="absolute top-6 right-6 w-20 h-20 rounded-full flex items-center justify-center pulse-glow"
                  style={{
                    background: 'rgba(10,22,40,0.8)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(16,185,129,0.4)',
                  }}
                >
                  <div className="text-center">
                    <div className="font-serif text-xl text-green-400 leading-none">{infoConfig.yearBadge}</div>
                    <div className="text-[9px] text-white/60 uppercase tracking-wider mt-1">{infoConfig.yearBadgeLabel}</div>
                  </div>
                </div>
              )}

              {/* Corner accent lines */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-4 left-4 w-6 h-px bg-green-500/60" />
                <div className="absolute top-4 left-4 w-px h-6 bg-green-500/60" />
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    {infoConfig.openingHoursLabel && <p className="text-green-400 text-xs uppercase tracking-wider">{infoConfig.openingHoursLabel}</p>}
                    {infoConfig.openingHours && <p className="text-white text-lg font-serif">{infoConfig.openingHours}</p>}
                  </div>
                  {infoConfig.ctaButtonText && (
                    <button
                      onClick={() => smoothScrollToSection('#contact')}
                      className="btn-primary rounded-lg text-sm px-5"
                      aria-label={infoConfig.ctaButtonText}
                    >
                      {infoConfig.ctaButtonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Dynamic Section */}
        {infoConfig.timeline.length > 0 && (
          <div className="fade-up pt-12" style={{ transitionDelay: '0.25s', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 className="text-xs text-white/40 uppercase tracking-widest mb-12 text-center">Zaman Çizelgesi</h4>
            
            {/* Timeline Bar */}
            <div className="relative mb-14 max-w-5xl mx-auto px-4 md:px-12">
              <div className="absolute top-[7px] left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5), transparent)' }} />
              
              <div className="flex justify-between items-start">
                {infoConfig.timeline.map((event, i) => {
                  const isActive = i === activeTimelineIdx;
                  return (
                    <button 
                      key={event.year} 
                      onClick={() => setActiveTimelineIdx(i)}
                      className="relative flex flex-col items-center group flex-1 focus:outline-none"
                    >
                      <div
                        className={`w-4 h-4 rounded-full z-10 transition-all duration-300 ${isActive ? 'scale-125' : 'group-hover:scale-110'}`}
                        style={{
                          background: isActive ? '#10b981' : 'var(--gray-900)',
                          border: '2px solid #10b981',
                          boxShadow: isActive ? '0 0 16px rgba(16,185,129,0.8)' : 'none',
                        }}
                      />
                      <span className={`font-serif text-sm md:text-base mt-4 font-semibold transition-colors duration-300 ${isActive ? 'text-green-400' : 'text-white/60 group-hover:text-green-300'}`}>
                        {event.year}
                      </span>
                      <span className={`text-[10px] md:text-xs mt-2 text-center whitespace-normal leading-tight max-w-[140px] transition-colors duration-300 hidden md:block ${isActive ? 'text-white/90' : 'text-white/40 group-hover:text-white/70'}`}>
                        {event.event}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Content Block */}
            {activeTimelineEvent && (
              <div className="grid md:grid-cols-[160px_1fr] md:gap-8 gap-6 max-w-4xl mx-auto items-center animate-in fade-in zoom-in-95 duration-500">
                {/* Left: Image Card */}
                <div 
                  className="aspect-square rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(16,185,129,0.15)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 0 20px rgba(16,185,129,0.05)',
                  }}
                >
                  <img 
                    src={activeTimelineEvent.image || `/images/${activeTimelineEvent.year}.png`} 
                    alt={activeTimelineEvent.year}
                    className="w-full h-full object-contain object-center scale-[1.05]"
                  />
                </div>

                {/* Right: Info Card */}
                <div 
                  className="rounded-2xl p-6 md:p-8 flex flex-col justify-center min-h-[160px] transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(16,185,129,0.02))',
                    border: '1px solid rgba(16,185,129,0.15)',
                    borderLeft: '4px solid rgba(16,185,129,0.6)'
                  }}
                >
                  <h3 className="font-serif text-2xl text-white mb-4">
                    <span className="text-green-400 mr-2">{activeTimelineEvent.year}:</span> 
                    {activeTimelineEvent.event}
                  </h3>
                  <p className="text-white/75 leading-relaxed text-[15px] md:text-base">
                    {activeTimelineEvent.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
