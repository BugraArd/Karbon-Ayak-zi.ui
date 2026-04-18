import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { citiesCarouselConfig, navigationConfig } from '../config';
import { smoothScrollToSection } from '../lib/smoothScroll';

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
      </div>
    </section>
  );
}
