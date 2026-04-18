import { useState } from 'react';
import { Leaf, MapPin, Phone, Mail, Linkedin, ArrowUp, CheckCircle } from 'lucide-react';
import { footerConfig } from '../config';
import { smoothScrollToSection, smoothScrollToY } from '../lib/smoothScroll';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf, MapPin, Phone, Mail, Linkedin, ArrowUp,
};

export function Footer() {
  // Null check: if config is empty, render nothing
  if (!footerConfig.brandName) return null;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const scrollToTop = () => smoothScrollToY(0);

  const scrollToSection = (href: string) => smoothScrollToSection(href);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      const response = await fetch(footerConfig.newsletterEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newsletterEmail,
        }),
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
      }
    } catch {
      setNewsletterStatus('error');
    }

    setTimeout(() => setNewsletterStatus('idle'), 4000);
  };

  return (
    <footer className="relative border-t border-white/8" role="contentinfo" style={{ background: 'linear-gradient(to bottom, rgba(10,22,40,0) 0%, rgba(6,12,22,0.8) 100%)' }}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)' }} />
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(16,185,129,0.4)' }} />
                <Leaf className="w-8 h-8 text-green-500 relative z-10 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              </div>
              <div>
                <span className="font-serif text-xl text-white block">{footerConfig.brandName}</span>
                {footerConfig.tagline && (
                  <span className="text-[10px] text-green-400 tracking-widest uppercase">{footerConfig.tagline}</span>
                )}
              </div>
            </div>
            {footerConfig.description && (
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {footerConfig.description}
              </p>
            )}
            {/* Social Links */}
            {footerConfig.socialLinks.length > 0 && (
              <nav aria-label="Social media links">
                <div className="flex gap-2.5">
                  {footerConfig.socialLinks.map((social) => {
                    const IconComponent = iconMap[social.icon];
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #10b981, #059669)';
                          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(16,185,129,0.5)';
                          (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 15px rgba(16,185,129,0.3)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                          (e.currentTarget as HTMLElement).style.border = '1px solid rgba(255,255,255,0.08)';
                          (e.currentTarget as HTMLElement).style.boxShadow = '';
                        }}
                      >
                        {IconComponent && <IconComponent className="w-4 h-4 text-white/70" />}
                      </a>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>

          {/* Link Groups */}
          {footerConfig.linkGroups.map((group, index) => (
            <nav key={index} aria-label={group.title}>
              <h3 className="font-serif text-lg text-white mb-5">{group.title}</h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/50 text-sm hover:text-green-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-green-500 transition-all duration-300" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact Info + Newsletter */}
          <div>
            {footerConfig.contactItems.length > 0 && (
              <>
                <h3 className="font-serif text-lg text-white mb-5">İletişim</h3>
                <ul className="space-y-4">
                  {footerConfig.contactItems.map((item, index) => {
                    const IconComponent = iconMap[item.icon];
                    return (
                      <li key={index} className="flex items-start gap-3">
                        {IconComponent && <IconComponent className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />}
                        <span className="text-white/70 text-sm">{item.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {/* Newsletter */}
            {footerConfig.newsletterLabel && (
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-white/60 text-xs uppercase tracking-widest mb-3">{footerConfig.newsletterLabel}</p>
                {newsletterStatus === 'success' ? (
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>{footerConfig.newsletterSuccessText}</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletter} className="flex gap-2">
                    <label htmlFor="newsletter-email" className="sr-only">{footerConfig.newsletterLabel}</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={footerConfig.newsletterPlaceholder}
                      required
                      autoComplete="email"
                      className="flex-1 px-3 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none transition-colors rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(16,185,129,0.5)')}
                      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 text-white text-sm rounded-lg transition-all duration-300 hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
                    >
                      {footerConfig.newsletterButtonText}
                    </button>
                  </form>
                )}
                {newsletterStatus === 'error' && (
                  <p className="text-red-400 text-xs mt-2">{footerConfig.newsletterErrorText}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/50 text-xs">
            {footerConfig.copyrightText && (
              <span>&copy; {new Date().getFullYear()} {footerConfig.copyrightText}</span>
            )}
            {footerConfig.legalLinks.map((link, index) => (
              <span key={index}>
                <span className="hidden md:inline">|</span>
                <button className="hover:text-green-400 transition-colors ml-2 md:ml-0">{link}</button>
              </span>
            ))}
            {footerConfig.icpText && (
              <>
                <span className="hidden md:inline">|</span>
                <span>{footerConfig.icpText}</span>
              </>
            )}
          </div>

          {/* Back to Top */}
          {footerConfig.backToTopText && (
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-white/70 text-sm hover:text-green-400 transition-colors group"
              aria-label={footerConfig.backToTopText}
            >
              <span>{footerConfig.backToTopText}</span>
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-green-500 group-hover:bg-green-500 transition-all duration-300">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
