import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Calculator, Home, BookOpen, Newspaper, Users, Mail, MapPin, Leaf, Sun, Moon } from 'lucide-react';
import { navigationConfig } from '../config';
import { smoothScrollToSection } from '../lib/smoothScroll';
import { useTheme } from '../lib/ThemeContext';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home, BookOpen, Newspaper, Users, Mail, MapPin, Calculator, Menu, X, ChevDown: ChevronDown, Leaf,
};

export function Navigation() {
  // Null check: if config is empty, render nothing
  if (!navigationConfig.brandName) return null;

  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      // Calculate scroll progress for the thin indicator bar
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    smoothScrollToSection(href);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const navLinks = navigationConfig.navLinks;

  return (
    <>
      {/* Scroll progress bar at top */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] transition-all duration-150"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #10b981, #34d399)',
          boxShadow: '0 0 8px rgba(16,185,129,0.6)',
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3'
            : 'bg-transparent py-5'
        }`}
        style={isScrolled ? {
          background: theme === 'dark' ? 'rgba(10, 22, 40, 0.92)' : 'rgba(242, 241, 237, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: theme === 'dark' ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
          boxShadow: theme === 'dark' ? '0 4px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.08)',
        } : {}}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#hero')}
            className="flex items-center gap-3 group"
            aria-label={navigationConfig.brandName}
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(16,185,129,0.3)' }}
              />
              <Leaf className="w-8 h-8 text-green-500 transition-all duration-300 group-hover:scale-110 group-hover:text-green-400 relative z-10" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl text-white tracking-wide group-hover:text-green-100 transition-colors duration-300">{navigationConfig.brandName}</span>
              <span className="text-[10px] text-green-400 tracking-widest uppercase">{navigationConfig.tagline}</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8" role="menubar">
            {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  role="none"
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="nav-link-underline flex items-center gap-1 text-sm text-white/75 hover:text-green-400 transition-colors duration-300 py-2 font-medium"
                    role="menuitem"
                    aria-haspopup={link.dropdown ? 'true' : undefined}
                    aria-expanded={link.dropdown ? activeDropdown === link.name : undefined}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        activeDropdown === link.name ? 'rotate-180 text-green-400' : ''
                      }`} aria-hidden="true" />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {link.dropdown && (
                    <div
                      className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                        activeDropdown === link.name
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                      role="menu"
                    >
                      <div
                        className="overflow-hidden min-w-[200px] rounded-xl border border-white/10"
                        style={{
                          background: 'rgba(10,22,40,0.95)',
                          backdropFilter: 'blur(24px)',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.08)',
                        }}
                      >
                        {link.dropdown.map((item, i) => (
                          <button
                            key={item.name}
                            onClick={() => scrollToSection(item.href)}
                            className={`block w-full text-left px-5 py-3.5 text-sm text-white/75 hover:bg-green-500/10 hover:text-green-400 transition-all duration-200 ${i > 0 ? 'border-t border-white/5' : ''}`}
                            role="menuitem"
                          >
                            <span className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-green-500/50" />
                              {item.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
            style={{
              background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
              border: theme === 'dark' ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
            }}
            aria-label={theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç'}
          >
            {theme === 'dark'
              ? <Sun className="w-4 h-4 text-white/70" />
              : <Moon className="w-4 h-4 text-gray-600" />
            }
          </button>

          {/* CTA Button */}
          {navigationConfig.ctaButtonText && (
            <button
              onClick={() => scrollToSection('#contact')}
              className="hidden lg:block btn-primary rounded-lg text-sm"
              aria-label={navigationConfig.ctaButtonText}
            >
              {navigationConfig.ctaButtonText}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white hover:text-green-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 top-[72px] transition-all duration-500 ${
            isMobileMenuOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible pointer-events-none'
          }`}
          style={{ background: theme === 'dark' ? 'rgba(10,22,40,0.98)' : 'rgba(242,241,237,0.98)', backdropFilter: 'blur(24px)' }}
          role="menu"
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="container-custom py-8 flex flex-col gap-2">
            {navLinks.map((link, index) => {
              const IconComponent = iconMap[link.icon];
              return (
                <div
                  key={link.name}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                        className="flex items-center justify-between w-full py-4 text-lg text-white border-b border-white/8 hover:text-green-400 transition-colors"
                        aria-expanded={activeDropdown === link.name}
                        role="menuitem"
                      >
                        <span className="flex items-center gap-3">
                          {IconComponent && <IconComponent className="w-5 h-5 text-green-500" />}
                          {link.name}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
                          activeDropdown === link.name ? 'rotate-180 text-green-400' : ''
                        }`} aria-hidden="true" />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          activeDropdown === link.name ? 'max-h-40' : 'max-h-0'
                        }`}
                        role="menu"
                      >
                        {link.dropdown.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => scrollToSection(item.href)}
                            className="flex items-center gap-2 w-full text-left pl-12 py-3 text-white/60 hover:text-green-400 transition-colors"
                            role="menuitem"
                          >
                            <span className="w-1 h-1 rounded-full bg-green-500/50" />
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="flex items-center gap-3 w-full py-4 text-lg text-white border-b border-white/8 hover:text-green-400 transition-colors"
                      role="menuitem"
                    >
                      {IconComponent && <IconComponent className="w-5 h-5 text-green-500" />}
                      {link.name}
                    </button>
                  )}
                </div>
              );
            })}

            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full py-4 text-lg border-b border-white/8 transition-colors"
              role="menuitem"
            >
              {theme === 'dark'
                ? <><Sun className="w-5 h-5 text-green-500" /><span className="text-white hover:text-green-400">Açık Tema</span></>
                : <><Moon className="w-5 h-5 text-green-500" /><span className="text-gray-800 hover:text-green-600">Koyu Tema</span></>
              }
            </button>

            {navigationConfig.ctaButtonText && (
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary rounded-lg mt-6 text-center"
                role="menuitem"
              >
                {navigationConfig.ctaButtonText}
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
