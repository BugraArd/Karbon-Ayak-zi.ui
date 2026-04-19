import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowRight, Calendar, Star, Quote, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { tipsConfig } from '../config';
import type { TipArticle } from '../config';
import { useTheme } from '../lib/ThemeContext';

// ─── Article Modal ─────────────────────────────────────────────────────────────
function ArticleModal({
  article,
  allArticles,
  onClose,
  onNavigate,
}: {
  article: TipArticle;
  allArticles: TipArticle[];
  onClose: () => void;
  onNavigate: (article: TipArticle) => void;
}) {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allArticles.length - 1;
  const scrollRef = useRef<HTMLDivElement>(null);

  // Close on Escape / navigate with arrow keys
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(allArticles[currentIndex - 1]);
      if (e.key === 'ArrowRight' && hasNext) onNavigate(allArticles[currentIndex + 1]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, hasPrev, hasNext, currentIndex, allArticles, onNavigate]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Reset scroll when article changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ background: isLight ? 'rgba(220,218,213,0.92)' : 'rgba(10,22,40,0.92)', backdropFilter: 'blur(16px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      {/* Modal Panel */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden animate-modal-in"
        style={{
          background: isLight ? 'linear-gradient(160deg, #f5f4f0 0%, #eeecea 100%)' : 'linear-gradient(160deg, #0f1d32 0%, #0a1628 100%)',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: isLight ? '0 25px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(16,185,129,0.1)' : '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.08)',
        }}
      >
        {/* Hero Image */}
        <div className="relative h-52 md:h-64 flex-shrink-0 overflow-hidden">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to top, #f5f4f0, rgba(245,244,240,0.3), transparent)' : 'linear-gradient(to top, #0f1d32, rgba(15,29,50,0.4), transparent)' }} />

          {/* Category badge */}
          <div className="absolute top-5 left-5">
            <span
              className="px-3 py-1.5 text-white text-xs font-semibold rounded-full"
              style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.95), rgba(5,150,105,0.95))', backdropFilter: 'blur(4px)' }}
            >
              {article.category}
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl text-white leading-tight">{article.title}</h2>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-8 py-6 space-y-5 custom-modal-scroll">
          {article.fullContent.map((paragraph, i) => {
            if (paragraph.includes('\n•')) {
              const [intro, ...items] = paragraph.split('\n');
              return (
                <div key={i}>
                  {intro && <p className="leading-relaxed text-[15px] mb-3" style={{ color: isLight ? 'rgba(28,28,28,0.8)' : 'rgba(255,255,255,0.8)' }}>{intro}</p>}
                  <ul className="space-y-2">
                    {items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: isLight ? 'rgba(28,28,28,0.7)' : 'rgba(255,255,255,0.7)' }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                        <span>{item.replace('• ', '')}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return <p key={i} className="leading-relaxed text-[15px]" style={{ color: isLight ? 'rgba(28,28,28,0.8)' : 'rgba(255,255,255,0.8)' }}>{paragraph}</p>;
          })}
          <div className="h-4" />
        </div>

        {/* Footer: navigation */}
        <div
          className="flex-shrink-0 flex items-center justify-between px-6 md:px-8 py-4"
          style={{ borderTop: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.07)', background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.2)' }}
        >
          <button
            onClick={() => hasPrev && onNavigate(allArticles[currentIndex - 1])}
            disabled={!hasPrev}
            className="flex items-center gap-2 text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: '#34d399' }}
          >
            <ChevronLeft className="w-4 h-4" />
            Önceki
          </button>

          <span className="text-xs tabular-nums" style={{ color: isLight ? 'rgba(28,28,28,0.35)' : 'rgba(255,255,255,0.3)' }}>
            {currentIndex + 1} / {allArticles.length}
          </span>

          <button
            onClick={() => hasNext && onNavigate(allArticles[currentIndex + 1])}
            disabled={!hasNext}
            className="flex items-center gap-2 text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: '#34d399' }}
          >
            Sonraki
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function TipsSection() {
  // *** ALL hooks MUST be called before any early return ***
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeArticle, setActiveArticle] = useState<TipArticle | null>(null);

  const handleOpenArticle = useCallback((article: TipArticle) => {
    setActiveArticle(article);
  }, []);

  const handleCloseArticle = useCallback(() => {
    setActiveArticle(null);
  }, []);

  const handleNavigateArticle = useCallback((article: TipArticle) => {
    setActiveArticle(article);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );
    const elements = sectionRef.current?.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right, .scale-in');
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Early return AFTER all hooks
  if (!tipsConfig.mainTitle) return null;

  return (
    <>
      {/* Article Modal */}
      {activeArticle && (
        <ArticleModal
          article={activeArticle}
          allArticles={tipsConfig.articles}
          onClose={handleCloseArticle}
          onNavigate={handleNavigateArticle}
        />
      )}

      <section id="tips" ref={sectionRef} className="section-padding relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute left-0 top-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
        <div className="absolute right-0 bottom-1/4 w-60 h-60 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 section-divider" />

        <div className="container-custom relative">
          {/* Section Header */}
          <div className="fade-up flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="font-script text-3xl text-green-400 block mb-2">{tipsConfig.scriptText}</span>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-8" style={{ background: 'linear-gradient(90deg, #10b981, transparent)' }} />
                <span className="text-green-500 text-xs uppercase tracking-[0.2em]">{tipsConfig.subtitle}</span>
              </div>
              <h2 className="font-serif text-h1 text-white has-bar">{tipsConfig.mainTitle}</h2>
            </div>

          </div>

          {/* Tips Grid */}
          {tipsConfig.articles.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {tipsConfig.articles.map((item, index) => (
                <article
                  key={item.id}
                  className="fade-up group cursor-pointer"
                  style={{ transitionDelay: `${0.1 + index * 0.1}s` }}
                  onClick={() => handleOpenArticle(item)}
                >
                  {/* Image */}
                  <div className="relative aspect-[3/2] rounded-xl overflow-hidden mb-5">
                    <img
                      src={item.image}
                      alt={`${item.title} - ${item.category}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{ transform: 'scale(1)', transitionProperty: 'transform' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 text-white text-xs font-medium rounded-full"
                        style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.9), rgba(5,150,105,0.9))', backdropFilter: 'blur(4px)' }}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(16,185,129,0.85)', backdropFilter: 'blur(8px)' }}
                      >
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex items-center gap-2 text-white/40 text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-serif text-h5 text-white mb-3 group-hover:text-green-400 transition-colors duration-300 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-4 line-clamp-3">{item.excerpt}</p>
                    {tipsConfig.readMoreText && (
                      <span className="inline-flex items-center gap-2 text-green-500 text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        {tipsConfig.readMoreText}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Testimonials */}
          {tipsConfig.testimonials.length > 0 && (
            <div className="mt-24">
              <div className="fade-up text-center mb-12">
                <span className="font-script text-3xl text-green-400 block mb-2">{tipsConfig.testimonialsScriptText}</span>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5))' }} />
                  <span className="text-green-500 text-xs uppercase tracking-[0.25em]">{tipsConfig.testimonialsSubtitle}</span>
                  <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.5), transparent)' }} />
                </div>
                <h2 className="font-serif text-h2 text-white">{tipsConfig.testimonialsMainTitle}</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {tipsConfig.testimonials.map((t, index) => (
                  <div
                    key={t.name}
                    className="scale-in p-8 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', transitionDelay: `${0.1 + index * 0.1}s` }}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none" style={{ background: 'rgba(16,185,129,0.06)' }} />
                    <Quote className="w-8 h-8 absolute top-6 right-6" style={{ color: 'rgba(16,185,129,0.2)' }} />
                    <div className="flex gap-1 mb-5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-green-500" style={{ color: '#10b981' }} />
                      ))}
                      {Array.from({ length: 5 - t.rating }).map((_, i) => (
                        <Star key={i + t.rating} className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.2)' }} />
                      ))}
                    </div>
                    <p className="text-white/70 leading-relaxed mb-6 italic text-sm">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                      >
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">{t.name}</p>
                        <p className="text-white/40 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Story Section */}
          {tipsConfig.storyTitle && (
            <div id="story" className="fade-up mt-24 pt-20 border-t border-white/10" style={{ transitionDelay: '0.1s' }}>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="slide-in-left">
                  <span className="font-script text-3xl text-green-400 block mb-2">{tipsConfig.storyScriptText}</span>
                  <span className="text-green-500 text-xs uppercase tracking-[0.2em] mb-4 block">{tipsConfig.storySubtitle}</span>
                  <h2 className="font-serif text-h2 text-white mb-6">{tipsConfig.storyTitle}</h2>
                  <div className="space-y-4 text-white/75 leading-relaxed">
                    {tipsConfig.storyParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  {tipsConfig.storyTimeline.length > 0 && (
                    <div className="mt-8 grid grid-cols-4 gap-3">
                      {tipsConfig.storyTimeline.map((item, index) => (
                        <div
                          key={index}
                          className="text-center p-4 rounded-xl transition-all duration-300 hover:scale-105"
                          style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}
                        >
                          <div className="font-serif text-2xl text-green-400 mb-1 stat-number">{item.value}</div>
                          <div className="text-xs text-white/50">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="slide-in-right relative">
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                    {tipsConfig.storyImage && (
                      <>
                        <img src={tipsConfig.storyImage} alt={tipsConfig.storyImageCaption} loading="lazy" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </>
                    )}
                  </div>
                  {tipsConfig.storyQuote.text && (
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-sm rounded-lg">
                      {tipsConfig.storyQuote.prefix && (
                        <p className="font-script text-2xl text-green-400 mb-1">{tipsConfig.storyQuote.prefix}</p>
                      )}
                      <p className="text-white italic text-sm leading-relaxed mb-2">"{tipsConfig.storyQuote.text}"</p>
                      {tipsConfig.storyQuote.attribution && (
                        <p className="text-green-400 text-xs">— {tipsConfig.storyQuote.attribution}</p>
                      )}
                    </div>
                  )}
                  <div className="absolute -top-4 -right-4 w-full h-full border border-green-500/20 rounded-lg -z-10" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
