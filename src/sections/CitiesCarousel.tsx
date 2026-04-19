import { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { citiesCarouselConfig, navigationConfig, allCitiesData } from '../config';
import { smoothScrollToSection } from '../lib/smoothScroll';
import { useTheme } from '../lib/ThemeContext';

export function CitiesCarousel() {
  // Null check: if config is empty, render nothing
  if (!citiesCarouselConfig.mainTitle || citiesCarouselConfig.slides.length === 0) return null;

  const slides = citiesCarouselConfig.slides;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
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

  const [autoKey, setAutoKey] = useState(0); // bump to reset timer after manual click

  const goToSlide = (index: number, dir: 'next' | 'prev' = 'next') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
    setAutoKey(k => k + 1); // reset the auto-advance countdown
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length, 'next');
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length, 'prev');
  };

  // Auto-advance every 10 seconds; resets when user manually changes slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setDirection('next');
      setCurrentSlide(prev => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 600);
    }, 10000);
    return () => clearInterval(timer);
  }, [autoKey, slides.length]);

  return (
    <section
      id="cities"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
        backgroundSize: '28px 28px'
      }} />
      <div className="absolute top-0 left-0 right-0 section-divider" />
      <div className="absolute bottom-0 left-0 right-0 section-divider" />

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="fade-up text-center mb-12">
          <span className="font-script text-3xl text-green-400 block mb-2">{citiesCarouselConfig.scriptText}</span>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5))' }} />
            <span className="text-green-500 text-xs uppercase tracking-[0.25em]">
              {citiesCarouselConfig.subtitle}
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.5), transparent)' }} />
          </div>
          <h2 className="font-serif text-h1 text-white">
            {citiesCarouselConfig.mainTitle}
          </h2>
        </div>

        {/* Carousel */}
        <div className="slide-in-left" style={{ transitionDelay: '0.1s' }}>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0 items-stretch">
            {/* Image Side with Ken Burns */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[500px] rounded-lg lg:rounded-r-none overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-600 ease-out ${
                    index === currentSlide
                      ? 'opacity-100 scale-100 z-10'
                      : index === (currentSlide - 1 + slides.length) % slides.length && direction === 'next'
                        ? 'opacity-0 -translate-x-full z-0'
                        : index === (currentSlide + 1) % slides.length && direction === 'prev'
                          ? 'opacity-0 translate-x-full z-0'
                          : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={`${slide.title} - ${slide.description}`}
                    loading="lazy"
                    className={`w-full h-full object-cover ${index === currentSlide ? 'kenburns' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              ))}

              {/* Navigation Arrows */}
              <div className="absolute bottom-6 left-6 flex gap-3 z-20">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
                  aria-label="Previous slide"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.15)' }}
                  aria-label="Next slide"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(16,185,129,0.85)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index, index > currentSlide ? 'next' : 'prev')}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'w-8 bg-green-500'
                        : 'w-4 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${index + 1}: ${slides[index].title}`}
                  />
                ))}
              </div>
            </div>

            {/* Content Side */}
            <div
              className="p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden lg:rounded-r-2xl"
              style={{
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: 'none',
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentSlide
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4 absolute'
                  }`}
                  style={{ display: index === currentSlide ? 'block' : 'none' }}
                >
                  {/* Location Tag */}
                  {citiesCarouselConfig.locationTag && (
                    <div className="flex items-center gap-2 text-green-500 text-sm mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{citiesCarouselConfig.locationTag}</span>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-serif text-h3 text-white mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-white/70 text-lg mb-6">
                    {slide.subtitle}
                  </p>

                  {/* Carbon Stats */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="font-serif text-5xl lg:text-6xl text-gradient-green stat-number">
                      {slide.area}
                    </span>
                    <span className="text-white/60 text-base">{slide.unit}</span>
                  </div>

                  {/* Description */}
                  <p className="text-white/75 leading-relaxed mb-8">
                    {slide.description}
                  </p>

                  {/* CTA */}
                  {navigationConfig.ctaButtonText && (
                    <button
                      onClick={() => smoothScrollToSection('#contact')}
                      className="btn-primary rounded-lg"
                      aria-label={navigationConfig.ctaButtonText}
                    >
                      {navigationConfig.ctaButtonText}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="fade-up mt-8 flex justify-center lg:justify-start" style={{ transitionDelay: '0.2s' }}>
          <div className="flex items-center gap-4 text-sm">
            <span className="font-serif text-2xl text-gradient-green">
              {String(currentSlide + 1).padStart(2, '0')}
            </span>
            <div className="w-12 h-px" style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.6), rgba(255,255,255,0.15))' }} />
            <span className="text-white/40">
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* City Comparison */}
        <CityComparison />
      </div>
    </section>
  );
}

function CityComparison() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [selectedCity, setSelectedCity] = useState('');

  const sorted = useMemo(() => [...allCitiesData].sort((a, b) => a.co2PerPerson - b.co2PerPerson), []);
  const turkeyAvg = useMemo(() => Math.round(allCitiesData.reduce((s, c) => s + c.co2PerPerson, 0) / allCitiesData.length), []);
  const maxVal = sorted[sorted.length - 1].co2PerPerson;

  const city = allCitiesData.find(c => c.name === selectedCity) ?? null;
  const rank = city ? sorted.findIndex(c => c.name === city.name) + 1 : null;
  const barPct = city ? Math.round((city.co2PerPerson / maxVal) * 100) : 0;
  const avgBarPct = Math.round((turkeyAvg / maxVal) * 100);

  const diff = city ? city.co2PerPerson - turkeyAvg : 0;
  const barColor = !city ? '#10b981' : diff <= 0 ? '#10b981' : diff < 400 ? '#f59e0b' : '#ef4444';

  return (
    <div id="city-compare" className="fade-up mt-16 pt-14" style={{ transitionDelay: '0.3s', borderTop: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)' }}>
      {/* Başlık */}
      <div className="text-center mb-10">
        <span className="font-script text-3xl text-green-400 block mb-2">Karşılaştır</span>
        <h3 className="font-serif text-h3" style={{ color: isLight ? '#1c1c1c' : '#ffffff' }}>İlinizin Karbon Profiline Bakın</h3>
        <p className="text-sm mt-2" style={{ color: isLight ? 'rgba(28,28,28,0.55)' : 'rgba(255,255,255,0.5)' }}>Türkiye'nin 81 ilinden birini seçin, ortalamayla nasıl kıyaslandığını görün.</p>
      </div>

      {/* Select */}
      <div className="max-w-sm mx-auto mb-8">
        <select
          value={selectedCity}
          onChange={e => setSelectedCity(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl text-sm focus:outline-none transition-all duration-300"
          style={{
            background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(16,185,129,0.25)',
            color: isLight ? '#1c1c1c' : '#ffffff',
            colorScheme: isLight ? 'light' : 'dark',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.6)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(16,185,129,0.08)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.25)'; e.currentTarget.style.boxShadow = ''; }}
        >
          <option value="" className={isLight ? '' : 'bg-[#0a1628]'}>— İl seçin —</option>
          {allCitiesData.map(c => (
            <option key={c.name} value={c.name} className={isLight ? '' : 'bg-[#0a1628]'}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Sonuç Kartı */}
      {city && rank !== null ? (
        <div
          className="max-w-2xl mx-auto rounded-2xl p-6 md:p-8 animate-in fade-in zoom-in-95 duration-300"
          style={{
            background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.03)',
            border: isLight ? '1px solid rgba(0,0,0,0.10)' : '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Başlık satırı */}
          <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
            <div>
              <h4 className="font-serif text-3xl" style={{ color: isLight ? '#1c1c1c' : '#ffffff' }}>{city.name}</h4>
              <span className="text-xs text-green-400 uppercase tracking-widest">{city.region} Bölgesi</span>
            </div>
            <div
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                background: diff <= 0 ? 'rgba(16,185,129,0.15)' : diff < 400 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
                color: diff <= 0 ? '#34d399' : diff < 400 ? '#fbbf24' : '#f87171',
                border: `1px solid ${diff <= 0 ? 'rgba(16,185,129,0.3)' : diff < 400 ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'}`,
              }}
            >
              {diff <= 0 ? `Ortalamanın ${Math.abs(diff)} kg altında` : `Ortalamanın ${diff} kg üstünde`}
            </div>
          </div>

          {/* Ana değer */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-serif text-5xl" style={{ color: barColor }}>{city.co2PerPerson.toLocaleString('tr-TR')}</span>
            <span className="text-base" style={{ color: isLight ? 'rgba(28,28,28,0.5)' : 'rgba(255,255,255,0.5)' }}>kg CO₂ / kişi / yıl</span>
          </div>

          {/* Karşılaştırma barları */}
          <div className="space-y-4 mb-6">
            {/* Bu il */}
            <div>
              <div className="flex justify-between text-xs mb-1.5" style={{ color: isLight ? 'rgba(28,28,28,0.5)' : 'rgba(255,255,255,0.5)' }}>
                <span>{city.name}</span>
                <span>{city.co2PerPerson.toLocaleString('tr-TR')} kg</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${barPct}%`, background: `linear-gradient(90deg, ${barColor}, ${barColor}99)` }}
                />
              </div>
            </div>

            {/* Türkiye ortalaması */}
            <div>
              <div className="flex justify-between text-xs mb-1.5" style={{ color: isLight ? 'rgba(28,28,28,0.5)' : 'rgba(255,255,255,0.5)' }}>
                <span>Türkiye Ortalaması</span>
                <span>{turkeyAvg.toLocaleString('tr-TR')} kg</span>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${avgBarPct}%`, background: isLight ? 'linear-gradient(90deg, rgba(0,0,0,0.25), rgba(0,0,0,0.12))' : 'linear-gradient(90deg, rgba(255,255,255,0.35), rgba(255,255,255,0.15))' }}
                />
              </div>
            </div>
          </div>

          {/* Sıralama */}
          <div className="flex items-center gap-3 pt-4" style={{ borderTop: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.06)' }}>
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-serif text-lg flex-shrink-0"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}
            >
              {rank}
            </div>
            <p className="text-sm" style={{ color: isLight ? 'rgba(28,28,28,0.6)' : 'rgba(255,255,255,0.6)' }}>
              81 il arasında <span className="font-medium" style={{ color: isLight ? '#1c1c1c' : '#ffffff' }}>{rank}. sırada</span> —{' '}
              {rank <= 20 ? 'en düşük salınımlı iller arasında yer alıyor' : rank <= 60 ? 'Türkiye ortalamasına yakın bir seviyede' : 'yüksek ısınma ihtiyacı nedeniyle salınımı yüksek iller arasında'}
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center py-12 rounded-2xl" style={{ border: isLight ? '1px dashed rgba(0,0,0,0.1)' : '1px dashed rgba(255,255,255,0.1)' }}>
          <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: isLight ? 'rgba(28,28,28,0.2)' : 'rgba(255,255,255,0.2)' }} />
          <p className="text-sm" style={{ color: isLight ? 'rgba(28,28,28,0.3)' : 'rgba(255,255,255,0.3)' }}>Yukarıdan bir il seçin</p>
        </div>
      )}
    </div>
  );
}
