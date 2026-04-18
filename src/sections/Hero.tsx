import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroConfig } from '../config';
import { smoothScrollToSection } from '../lib/smoothScroll';

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!start || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

export function Hero({ isReady }: { isReady: boolean }) {
  // Null check: if config is empty, render nothing
  if (!heroConfig.mainTitle) return null;

  const [phase, setPhase] = useState(0);
  // phase 0: hidden, 1: bg visible, 2: title, 3: cta, 4: stats counting

  // Build count-up hooks from stats config
  const stat0 = heroConfig.stats[0];
  const stat1 = heroConfig.stats[1];
  const stat2 = heroConfig.stats[2];
  const count0 = useCountUp(stat0?.value ?? 0, 2000, phase >= 4);
  const count1 = useCountUp(stat1?.value ?? 0, 2200, phase >= 4);
  const count2 = useCountUp(stat2?.value ?? 0, 1800, phase >= 4);
  const counts = [count0, count1, count2];

  useEffect(() => {
    if (!isReady) return;
    // Stagger: bg -> title -> cta -> stats
    const t1 = setTimeout(() => setPhase(1), 100);   // bg reveal
    const t2 = setTimeout(() => setPhase(2), 800);   // title
    const t3 = setTimeout(() => setPhase(3), 1400);  // cta
    const t4 = setTimeout(() => setPhase(4), 2000);  // stats
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isReady]);

  const scrollToSection = (href: string) => {
    smoothScrollToSection(href);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Ken Burns */}
      <div className={`absolute inset-0 transition-opacity duration-[1.5s] ease-out ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 hero-kenburns">
          <img
            src={heroConfig.backgroundImage}
            alt={heroConfig.mainTitle}
            className="w-full h-full object-cover scale-105"
          />
        </div>
        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        {/* Radial green glow from center */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(16,185,129,0.08) 0%, transparent 65%)' }} />
      </div>

      {/* Decorative rotating ring */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-[2s] ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <div
          className="rotate-slow"
          style={{
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            border: '1px solid rgba(16,185,129,0.06)',
          }}
        />
      </div>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-[2s] ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <div
          style={{
            width: '800px',
            height: '800px',
            borderRadius: '50%',
            border: '1px dashed rgba(16,185,129,0.04)',
            animation: 'rotate-slow 35s linear infinite reverse',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32 lg:py-40">
        {/* Script accent */}
        <div className={`transition-all duration-1000 ease-out ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="font-script text-5xl md:text-6xl lg:text-7xl text-green-400 shimmer-text">
            {heroConfig.scriptText}
          </span>
        </div>

        {/* Divider line */}
        <div className={`mx-auto my-6 h-px transition-all duration-1000 ease-out ${phase >= 2 ? 'w-32 opacity-100' : 'w-0 opacity-0'}`} style={{ transitionDelay: '0.2s', background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.7), transparent)' }} />

        {/* Main Title */}
        <h1 className={`font-serif text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.5rem] text-white leading-[1.05] tracking-wide transition-all duration-1000 ease-out ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.3s', textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}>
          {heroConfig.mainTitle}
        </h1>

        {/* Subtitle line */}
        <div className={`mt-4 transition-all duration-700 ease-out ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '0.1s' }}>
          <p className="text-white/60 text-sm md:text-base tracking-widest uppercase">
            Türkiye · Karbon Takip Platformu
          </p>
        </div>

        {/* CTA */}
        {heroConfig.ctaButtonText && (
          <div className={`mt-10 flex items-center justify-center gap-4 transition-all duration-700 ease-out ${phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.2s' }}>
            <button
              onClick={() => scrollToSection(heroConfig.ctaTarget || '#calculators')}
              className="btn-primary rounded-sm inline-flex items-center gap-2 group"
              aria-label={heroConfig.ctaButtonText}
            >
              {heroConfig.ctaButtonText}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollToSection('#info')}
              className="hidden md:inline-flex items-center gap-2 px-6 py-3 text-sm text-white/70 hover:text-green-400 border border-white/15 hover:border-green-500/50 rounded-sm transition-all duration-300 hover:bg-green-500/5"
            >
              Daha Fazla Bilgi
            </button>
          </div>
        )}

        {/* Stats — inside content flow, below the CTA buttons */}
        {heroConfig.stats.length > 0 && (
          <div className={`mt-12 transition-all duration-1000 ease-out ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div
              className="max-w-2xl mx-auto rounded-xl border border-white/10 overflow-hidden"
              style={{ background: 'rgba(10,22,40,0.65)', backdropFilter: 'blur(16px)' }}
            >
              <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${heroConfig.stats.length}, minmax(0, 1fr))` }}>
                {heroConfig.stats.map((stat, index) => (
                  <div key={index} className={`text-center py-5 px-4 ${index > 0 ? 'border-l border-white/10' : ''}`}>
                    <div className="font-serif text-3xl md:text-4xl text-green-400 mb-1 tabular-nums stat-number">
                      {counts[index]}{stat.suffix}
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scroll indicator — inside content, below stats */}
        <div className={`mt-10 flex justify-center bounce-slow transition-opacity duration-1000 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={() => scrollToSection('#calculators')}
            className="flex flex-col items-center gap-2 text-white/40 hover:text-green-400 transition-colors"
            aria-label="Aşağı kaydır"
          >
            <span className="text-[10px] uppercase tracking-[0.2em]">Keşfet</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>


      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a1628] to-transparent" />


      {/* Side decorative */}
      {heroConfig.decorativeText && (
        <div className={`absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 transition-opacity duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-green-500/40 to-transparent" />
          <span className="text-green-500/70 text-xs tracking-widest" style={{ writingMode: 'vertical-lr' }}>{heroConfig.decorativeText}</span>
          <div className="w-px h-20 bg-gradient-to-b from-transparent via-green-500/40 to-transparent" />
        </div>
      )}

      {/* Right side social / year indicator */}
      <div className={`absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 transition-opacity duration-1000 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <span className="text-white/30 text-xs tracking-widest" style={{ writingMode: 'vertical-lr' }}>2026</span>
        <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      </div>
    </section>
  );
}
