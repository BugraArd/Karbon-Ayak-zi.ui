import { useState, useEffect, useRef, useCallback } from 'react';
import { Calculator, Sparkles, Thermometer, Clock, ArrowRight, Zap, Flame, Leaf, AlertCircle, MapPin } from 'lucide-react';
import { calculatorShowcaseConfig } from '../config';
import { smoothScrollToSection } from '../lib/smoothScroll';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Calculator, Sparkles, Thermometer, Clock, Zap, MapPin
};

// Emisyon faktörü sabitleri
const EMISSION_FACTOR_KG_PER_M3 = 1.942; // Doğalgaz
const ELECTRICITY_EMISSION_FACTOR = 0.469; // Elektrik

function NaturalGasCalculator() {
  const [inputValue, setInputValue] = useState('');
  const [emissionKg, setEmissionKg] = useState<number | null>(null);
  const [emissionTon, setEmissionTon] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Sadece pozitif sayı ve ondalık nokta/virgül kabul et
    if (value === '' || /^\d*[.,]?\d*$/.test(value)) {
      setInputValue(value);
      setError('');
      
      // Otomatik hesaplama
      const numValue = parseFloat(value.replace(',', '.'));
      if (value && !isNaN(numValue) && numValue > 0) {
        const kg = numValue * EMISSION_FACTOR_KG_PER_M3;
        const ton = kg / 1000;
        setEmissionKg(kg);
        setEmissionTon(ton);
        setIsCalculated(true);
      } else {
        setEmissionKg(null);
        setEmissionTon(null);
        setIsCalculated(false);
      }
    }
  };

  const handleCalculate = useCallback(() => {
    const numValue = parseFloat(inputValue.replace(',', '.'));
    
    if (!inputValue || isNaN(numValue)) {
      setError('Lütfen geçerli bir değer girin');
      return;
    }
    
    if (numValue <= 0) {
      setError('Değer sıfırdan büyük olmalıdır');
      return;
    }

    setError('');
    setIsAnimating(true);
    
    const kg = numValue * EMISSION_FACTOR_KG_PER_M3;
    const ton = kg / 1000;
    
    setEmissionKg(kg);
    setEmissionTon(ton);
    setIsCalculated(true);
    
    setTimeout(() => setIsAnimating(false), 600);
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Calculator Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(16,185,129,0.08), rgba(6,78,59,0.15))',
          border: '1px solid rgba(16,185,129,0.2)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(16,185,129,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div
          className="px-6 pt-6 pb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
            borderBottom: '1px solid rgba(16,185,129,0.12)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 4px 15px rgba(16,185,129,0.4)',
              }}
            >
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm tracking-wide">
                Doğalgaz Karbon Ayak İzi
              </h3>
              <p className="text-white/40 text-xs">Hesaplayıcı</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Input Section */}
          <div>
            <label className="block text-white/70 text-xs font-medium mb-2 tracking-wide uppercase">
              Tüketim (m³)
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Örn: 150"
                className="w-full px-4 py-3.5 rounded-xl text-white text-lg font-medium placeholder-white/20 outline-none transition-all duration-300 focus:ring-2"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(16,185,129,0.15)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                }}
                aria-label="Doğalgaz tüketimi m³ değeri"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-medium">
                m³
              </span>
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-red-400 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-xl text-white font-medium text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              boxShadow: '0 4px 20px rgba(16,185,129,0.35)',
            }}
          >
            <Calculator className="w-4 h-4" />
            Hesapla
          </button>

          {/* Results */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              isCalculated ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div
              className="rounded-xl p-4 space-y-3"
              style={{
                background: 'rgba(16,185,129,0.06)',
                border: '1px solid rgba(16,185,129,0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-green-400" />
                <span className="text-white/70 text-xs font-medium uppercase tracking-wide">
                  Tahmini Emisyon Sonucu
                </span>
              </div>
              
              {/* kg Result */}
              <div className="flex items-baseline justify-between">
                <span className="text-white/50 text-sm">CO₂ Emisyonu</span>
                <div className={`transition-all duration-300 ${isAnimating ? 'scale-110 text-green-300' : 'scale-100'}`}>
                  <span className="text-green-400 font-serif text-2xl font-semibold">
                    {emissionKg !== null ? emissionKg.toFixed(2) : '—'}
                  </span>
                  <span className="text-white/40 text-sm ml-1.5">kg</span>
                </div>
              </div>

              {/* ton Result */}
              <div className="flex items-baseline justify-between">
                <span className="text-white/50 text-sm">CO₂ Emisyonu</span>
                <div className={`transition-all duration-300 ${isAnimating ? 'scale-110 text-green-300' : 'scale-100'}`}>
                  <span className="text-green-400 font-serif text-2xl font-semibold">
                    {emissionTon !== null ? emissionTon.toFixed(2) : '—'}
                  </span>
                  <span className="text-white/40 text-sm ml-1.5">ton</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer note */}
        <div
          className="px-6 py-3 text-center"
          style={{
            background: 'rgba(0,0,0,0.15)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <p className="text-white/25 text-[10px] leading-relaxed">
            Emisyon faktörü: {EMISSION_FACTOR_KG_PER_M3} kg CO₂/m³
          </p>
        </div>
      </div>

      {/* Decorative Glow Behind Card */}
      <div
        className="absolute -inset-4 -z-10 rounded-3xl blur-2xl pulse-glow"
        style={{
          background: 'radial-gradient(ellipse, rgba(16,185,129,0.12) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

function ElectricityCalculator() {
  const [period, setPeriod] = useState<'Aylık' | 'Günlük'>('Aylık');
  const [inputValue, setInputValue] = useState('');
  const [emissionKg, setEmissionKg] = useState<number | null>(null);
  const [yearlyEstimate, setYearlyEstimate] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const calculateEmissions = (value: number, currentPeriod: 'Aylık' | 'Günlük') => {
    // Toplam salım (kg)
    const kg = value * ELECTRICITY_EMISSION_FACTOR;
    
    // Yıllık tahmin (varsayım)
    let yearlyKg = 0;
    if (currentPeriod === 'Günlük') {
      yearlyKg = kg * 365;
    } else {
      yearlyKg = kg * 12;
    }

    setEmissionKg(kg);
    setYearlyEstimate(yearlyKg / 1000); // ton cinsinden
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*[.,]?\d*$/.test(value)) {
      setInputValue(value);
      setError('');
      
      const numValue = parseFloat(value.replace(',', '.'));
      if (value && !isNaN(numValue) && numValue > 0) {
        calculateEmissions(numValue, period);
        setIsCalculated(true);
      } else {
        setEmissionKg(null);
        setYearlyEstimate(null);
        setIsCalculated(false);
      }
    }
  };

  const handleCalculate = useCallback(() => {
    const numValue = parseFloat(inputValue.replace(',', '.'));
    
    if (!inputValue || isNaN(numValue)) {
      setError('Lütfen geçerli bir değer girin');
      return;
    }
    
    if (numValue <= 0) {
      setError('Değer sıfırdan büyük olmalıdır');
      return;
    }

    setError('');
    setIsAnimating(true);
    
    calculateEmissions(numValue, period);
    setIsCalculated(true);
    
    setTimeout(() => setIsAnimating(false), 600);
  }, [inputValue, period]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCalculate();
  };

  const handlePeriodChange = (newPeriod: 'Aylık' | 'Günlük') => {
    setPeriod(newPeriod);
    const numValue = parseFloat(inputValue.replace(',', '.'));
    if (isCalculated && !isNaN(numValue) && numValue > 0) {
      calculateEmissions(numValue, newPeriod);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Calculator Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(59,130,246,0.08), rgba(30,58,138,0.15))',
          border: '1px solid rgba(59,130,246,0.2)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(59,130,246,0.08)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div
          className="px-6 pt-6 pb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))',
            borderBottom: '1px solid rgba(59,130,246,0.12)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
              }}
            >
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm tracking-wide">
                Elektrik Tüketimi
              </h3>
              <p className="text-white/40 text-xs">Karbon Ayak İzi Hesaplayıcısı</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          
          {/* Period Selection */}
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            {(['Aylık', 'Günlük'] as const).map(p => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                  period === p 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Section */}
          <div>
            <label className="block text-white/70 text-xs font-medium mb-2 tracking-wide uppercase">
              Tüketim (kWh)
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Örn: 240"
                className="w-full px-4 py-3.5 rounded-xl text-white text-lg font-medium placeholder-white/20 outline-none transition-all duration-300 focus:ring-2"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: error ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(59,130,246,0.15)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                }}
                aria-label="Elektrik tüketimi kWh değeri"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-medium">
                kWh
              </span>
            </div>
            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-red-400 text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-3.5 rounded-xl text-white font-medium text-sm tracking-wide transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
            }}
          >
            <Calculator className="w-4 h-4" />
            Emisyonu Hesapla
          </button>

          {/* Results */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              isCalculated ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div
              className="rounded-xl p-4 space-y-3"
              style={{
                background: 'rgba(59,130,246,0.06)',
                border: '1px solid rgba(59,130,246,0.15)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-blue-400" />
                <span className="text-white/70 text-xs font-medium uppercase tracking-wide">
                  Tahmini Salım Sonucu
                </span>
              </div>
              
              {/* kg Result */}
              <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                <span className="text-white/50 text-sm">Girdiğiniz Tüketim İçin</span>
                <div className={`transition-all duration-300 ${isAnimating ? 'scale-110 text-blue-300' : 'scale-100'}`}>
                  <span className="text-blue-400 font-serif text-2xl font-semibold">
                    {emissionKg !== null ? emissionKg.toFixed(2) : '—'}
                  </span>
                  <span className="text-white/40 text-sm ml-1.5">kg CO₂e</span>
                </div>
              </div>

              {/* Yearly ton Result */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="text-white/50 text-sm">Yıllık Tahmin</span>
                <div className={`transition-all duration-300 ${isAnimating ? 'scale-110 text-blue-300' : 'scale-100'}`}>
                  <span className="text-blue-400 font-serif text-xl font-semibold">
                    {yearlyEstimate !== null ? yearlyEstimate.toFixed(2) : '—'}
                  </span>
                  <span className="text-white/40 text-sm ml-1.5">ton CO₂e</span>
                </div>
              </div>

              {/* Suggestions */}
              <ul className="text-white/40 text-[10px] space-y-1 mt-2 pt-2 border-t border-white/5">
                <li>• Bekleme modundaki elektronik cihazları kapatın.</li>
                <li>• Aydınlatmada LED tipi tasarruflu ampuller tercih edin.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div
          className="px-6 py-3 text-center"
          style={{
            background: 'rgba(0,0,0,0.15)',
            borderTop: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <p className="text-white/25 text-[10px] leading-relaxed">
            Emisyon faktörü: {ELECTRICITY_EMISSION_FACTOR} kg CO₂e/kWh
          </p>
        </div>
      </div>

      {/* Decorative Glow Behind Card */}
      <div
        className="absolute -inset-4 -z-10 rounded-3xl blur-2xl pulse-glow"
        style={{
          background: 'radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}

export function CalculatorShowcase() {
  // Null check: if config is empty, render nothing
  if (!calculatorShowcaseConfig.mainTitle || calculatorShowcaseConfig.calculators.length === 0) return null;

  const [activeCalculator, setActiveCalculator] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCalculatorChange = (e: CustomEvent) => {
      const target = e.detail;
      const idx = calculatorShowcaseConfig.calculators.findIndex(c => `#${c.id}` === target);
      if (idx !== -1) setActiveCalculator(idx);
    };
    window.addEventListener('changeCalculator', handleCalculatorChange as EventListener);
    return () => window.removeEventListener('changeCalculator', handleCalculatorChange as EventListener);
  }, []);

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

  const calculators = calculatorShowcaseConfig.calculators;
  const features = calculatorShowcaseConfig.features;
  const quote = calculatorShowcaseConfig.quote;
  const calculator = calculators[activeCalculator];

  const isNaturalGasActive = calculator.id === 'natural-gas';

  return (
    <section
      id="calculators"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, #10b981 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        {/* Green radial glow top-left */}
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)' }} />
        {/* Blue/teal glow bottom-right */}
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="container-custom relative">
        {/* Section Title */}
        <div className="fade-up text-center mb-16">
          <span className="font-script text-3xl text-green-400 block mb-2">{calculatorShowcaseConfig.scriptText}</span>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(16,185,129,0.5))' }} />
            <span className="text-green-500 text-xs uppercase tracking-[0.25em]">
              {calculatorShowcaseConfig.subtitle}
            </span>
            <div className="h-px w-12" style={{ background: 'linear-gradient(90deg, rgba(16,185,129,0.5), transparent)' }} />
          </div>
          <h2 className="font-serif text-h1 text-white">{calculatorShowcaseConfig.mainTitle}</h2>
        </div>

        {/* Calculator Tabs */}
        <div className="fade-up flex justify-center gap-3 mb-16" style={{ transitionDelay: '0.1s' }}>
          {calculators.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActiveCalculator(i)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                i === activeCalculator
                  ? 'text-white shadow-lg'
                  : 'text-white/60 hover:text-white/90 border border-white/10 hover:border-white/20 hover:bg-white/5'
              }`}
              style={i === activeCalculator ? {
                background: isNaturalGasActive ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: isNaturalGasActive ? '0 4px 20px rgba(16,185,129,0.3)' : '0 4px 20px rgba(59,130,246,0.3)',
              } : {}}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left: Calculator Info */}
          <div className="slide-in-left lg:col-span-2 order-2 lg:order-1">
            {/* Year + Name */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-serif text-6xl lg:text-7xl leading-none" style={{ color: 'rgba(255,255,255,0.06)' }}>{calculator.year}</span>
                <div>
                  <h2 className="font-serif text-h3 text-white leading-tight">{calculator.name}</h2>
                  <span className={`font-script text-xl ${isNaturalGasActive ? 'text-green-400' : 'text-blue-400'}`}>{calculator.subtitle}</span>
                </div>
              </div>
              <div className="h-px w-16" style={{ background: isNaturalGasActive ? 'linear-gradient(90deg, #10b981, transparent)' : 'linear-gradient(90deg, #3b82f6, transparent)' }} />
            </div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed mb-3">{calculator.description}</p>
            <p className="text-white/50 leading-relaxed text-sm mb-8 flex items-center gap-2">
              {isNaturalGasActive ? <Flame className="w-3.5 h-3.5 text-green-500 flex-shrink-0" /> : <Zap className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />}
              {calculator.tastingNotes}
            </p>

            {/* Calculator Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { label: calculator.alcohol, value: isNaturalGasActive ? 'Ortalama' : 'Girdi (kWh)' },
                { label: calculator.temperature, value: isNaturalGasActive ? 'Parametre' : 'Tüketim' },
                { label: calculator.aging, value: isNaturalGasActive ? 'Periyot' : 'Zaman' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 text-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className={`font-serif text-[15px] ${isNaturalGasActive ? 'text-green-400' : 'text-blue-400'} mb-1`}>{item.label}</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-wider">{item.value}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => smoothScrollToSection('#contact')}
              className={`rounded-lg flex items-center gap-2 group text-sm font-medium py-3 px-6 transition-all duration-300 text-white hover:opacity-90`}
              style={{
                background: isNaturalGasActive ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #2563eb)',
              }}
              aria-label={calculatorShowcaseConfig.mainTitle}
            >
              Hemen Başla
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Center: Calculator Widget */}
          <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center">
            {isNaturalGasActive ? (
              <div className="relative" style={{ width: '320px', minHeight: '380px' }}>
                <NaturalGasCalculator />
              </div>
            ) : (
              <div className="relative animate-in fade-in" style={{ width: '320px', minHeight: '380px' }}>
                <ElectricityCalculator />
              </div>
            )}
          </div>

          {/* Right: Features + Quote */}
          <div className="slide-in-right lg:col-span-2 order-3">
            <div className="space-y-4">
              {features.map((feature) => {
                const IconComponent = iconMap[feature.icon] || Calculator;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 group p-4 rounded-xl transition-all duration-300 hover:bg-white/3"
                  >
                    <div className="feature-icon group-hover:scale-110">
                      <IconComponent className={`w-5 h-5 ${isNaturalGasActive ? 'text-green-400' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-1 group-hover:text-white/90 transition-colors">{feature.title}</h3>
                      <p className="text-sm text-white/55 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            {quote.text && (
              <div className="mt-8 p-6 rounded-xl transition-all duration-300 hover:bg-white-[0.02]" style={{
                background: isNaturalGasActive 
                  ? 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))'
                  : 'linear-gradient(135deg, rgba(59,130,246,0.06), rgba(59,130,246,0.02))',
                border: isNaturalGasActive ? '1px solid rgba(16,185,129,0.15)' : '1px solid rgba(59,130,246,0.15)',
                borderLeft: isNaturalGasActive ? '3px solid rgba(16,185,129,0.6)' : '3px solid rgba(59,130,246,0.6)',
              }}>
                {quote.prefix && <p className={`font-script text-2xl mb-2 ${isNaturalGasActive ? 'text-green-400' : 'text-blue-400'}`}>{quote.prefix}</p>}
                <p className="text-white/65 text-sm italic leading-relaxed">
                  "{quote.text}"
                </p>
                {quote.attribution && <p className={`text-xs mt-3 ${isNaturalGasActive ? 'text-green-500/70' : 'text-blue-500/70'}`}>— {quote.attribution}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
