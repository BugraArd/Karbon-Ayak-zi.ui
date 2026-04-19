import { useState, useEffect, useRef, useCallback } from 'react';
import { Calculator, Sparkles, Thermometer, Clock, Zap, Flame, Leaf, AlertCircle, MapPin, Info, Car } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/ui/tooltip';
import { calculatorShowcaseConfig } from '../config';
import { smoothScrollToSection } from '../lib/smoothScroll';
import { useTheme } from '../lib/ThemeContext';

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
                <span className="text-white/50 text-sm flex items-center gap-1">
                  CO₂ Emisyonu
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-white/30 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[200px] text-center" style={{ background: '#0f1d32', border: '1px solid rgba(16,185,129,0.3)', color: '#e2e8f0' }}>
                      Doğalgazın yanmasıyla atmosfere salınan karbondioksit miktarı
                    </TooltipContent>
                  </Tooltip>
                </span>
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
            1 m³ doğalgaz yandığında ~{EMISSION_FACTOR_KG_PER_M3} kg CO₂ açığa çıkar (BOTAŞ)
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
            className="w-full py-3.5 rounded-xl text-white font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 4px 20px rgba(59,130,246,0.35)',
            }}
          >
            <span className="inline-flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Emisyonu Hesapla
            </span>
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-white/40 text-sm ml-1.5 cursor-help border-b border-dashed border-white/20">kg CO₂e</span>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[220px] text-center" style={{ background: '#0f1d32', border: '1px solid rgba(59,130,246,0.3)', color: '#e2e8f0' }}>
                      CO₂e (karbondioksit eşdeğeri): Farklı sera gazlarının iklim üzerindeki etkisini CO₂ cinsinden ifade eder
                    </TooltipContent>
                  </Tooltip>
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
                <li>• Bekleme modundaki cihazları tamamen kapatmak yıllık tüketimi gözle görülür azaltır.</li>
                <li>• LED ampüle geçmek, aynı aydınlık için %80 daha az enerji kullanmanızı sağlar.</li>
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
            Türkiye şebekesinde 1 kWh için ~{ELECTRICITY_EMISSION_FACTOR} kg CO₂ salınır (TEİAŞ, 2022)
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

// ─── Vehicle Data ──────────────────────────────────────────────────────────────
const VEHICLE_DATA: Record<string, Record<string, Record<string, Record<string, number>>>> = {
  Toyota: {
    Corolla: {
      "2020–2022": {
        "1.8 Hybrid HB Icon": 102,
        "1.8 Hybrid HB Icon Tech": 102,
        "1.8 Hybrid HB Design": 111,
        "1.8 Hybrid HB GR Sport": 112,
        "1.8 Hybrid HB Excel": 112,
        "2.0 Hybrid HB Icon": 111,
        "2.0 Hybrid HB Design": 120,
        "2.0 Hybrid HB GR Sport": 119,
        "2.0 Hybrid HB Excel": 120,
        "Touring Sports 1.8 Icon": 103,
        "Touring Sports 1.8 Design": 112,
        "Touring Sports 1.8 GR Sport": 112,
        "Touring Sports 1.8 Excel": 112,
        "Touring Sports 2.0 Icon": 112,
        "Touring Sports 2.0 Design": 121,
        "Touring Sports 2.0 GR Sport": 121,
        "Touring Sports 2.0 Excel": 121,
        "Saloon 1.8 Icon": 102,
        "Saloon 1.8 Icon Tech": 102,
        "Saloon 1.8 Design": 111,
      },
      "2023": {
        "1.8 Hybrid HB Icon": 100,
        "1.8 Hybrid HB Design": 104,
        "1.8 Hybrid HB GR Sport": 105,
        "1.8 Hybrid HB Excel": 106,
        "2.0 Hybrid HB Icon": 98,
        "2.0 Hybrid HB Design": 102,
        "2.0 Hybrid HB GR Sport": 103,
        "2.0 Hybrid HB Excel": 103,
        "Touring Sports 1.8 Icon": 101,
        "Touring Sports 1.8 Design": 106,
        "Touring Sports 1.8 GR Sport": 107,
        "Touring Sports 2.0 Icon": 100,
        "Touring Sports 2.0 Design": 104,
        "Touring Sports 2.0 GR Sport": 105,
      },
      "2026": {
        "1.8 Hybrid HB Icon": 100,
        "1.8 Hybrid HB Design": 104,
        "1.8 Hybrid HB GR Sport": 105,
        "1.8 Hybrid HB Excel": 106,
        "2.0 Hybrid HB Icon": 101,
        "2.0 Hybrid HB Design": 105,
        "2.0 Hybrid HB GR Sport": 106,
        "2.0 Hybrid HB Excel": 106,
        "Touring Sports 1.8 Icon": 101,
        "Touring Sports 1.8 Design": 106,
        "Touring Sports 1.8 GR Sport": 107,
        "Touring Sports 1.8 Excel": 107,
        "Touring Sports 2.0 Icon": 103,
        "Touring Sports 2.0 Design": 107,
        "Touring Sports 2.0 GR Sport": 107,
        "Touring Sports 2.0 Excel": 108,
      },
    },
    RAV4: {
      "2022": {
        "FWD Icon": 128,
        "FWD Design": 130,
        "FWD Excel": 132,
        "FWD Dynamic": 132,
        "AWD Design": 132,
        "AWD Excel": 134,
        "AWD Dynamic": 134,
      },
    },
    Camry: {
      "2021": {
        "Hybrid 17 inç": 120,
        "Hybrid 18 inç": 125,
      },
    },
    Hilux: {
      "2020–2022": {
        "2.4D 150hp": 214,
        "2.8D 204hp": 226,
      },
      "2023–2025 (mild hybrid)": {
        "2.8D Hybrid 48V": 212,
      },
    },
    Prius: {
      "2020–2022": {
        "Hybrid": 77,
        "Plug-in Hybrid": 26,
      },
      "2023–2025 (yeni kasa)": {
        "Hybrid": 72,
        "PHEV": 16,
      },
    },
  },
  Honda: {
    Civic: {
      "2020–2021": {
        "1.0 CVT S": 135,
        "1.0 CVT SE": 143,
        "1.0 CVT SR": 147,
        "1.0 CVT EX": 152,
        "1.0 CVT EX Sport Line": 152,
        "1.5 Manuel Sport": 137,
        "1.5 CVT Sport": 150,
      },
      "2023 e:HEV": {
        "e:HEV Base": 108,
        "e:HEV Mid": 113,
        "e:HEV High": 114,
      },
    },
    "CR-V": {
      "2020": {
        "Hybrid 2WD S": 156,
        "Hybrid 2WD SE": 156,
        "Hybrid 2WD SR": 156,
        "Hybrid AWD SE": 166,
        "Hybrid AWD SR": 166,
        "Hybrid AWD EX": 168,
      },
      "2023": {
        "Hybrid 2WD": 150,
        "Hybrid AWD": 165,
        "PHEV": 19,
      },
    },
    Accord: {
      "2020–2022": {
        "1.5 Turbo": 145,
        "2.0 Hybrid": 113,
      },
      "2023+": {
        "Hybrid": 108,
      },
    },
  },
  Volkswagen: {
    Golf: {
      "2020–2022 Golf 8": {
        "1.0 TSI 110hp": 123,
        "1.5 TSI 130hp": 125,
        "1.5 eTSI (mild hybrid)": 124,
        "2.0 TDI 115hp": 114,
        "2.0 TDI 150hp": 120,
        "GTI 2.0 TSI": 156,
        "GTE (PHEV weighted)": 24,
      },
      "2023–2025 (facelift öncesi)": {
        "1.0 eTSI": 121,
        "1.5 eTSI": 122,
        "2.0 TDI": 113,
        "GTE (PHEV)": 23,
      },
    },
    Passat: {
      "2020–2022": {
        "1.5 TSI": 140,
        "2.0 TDI 150hp": 126,
        "2.0 TDI 200hp": 142,
        "GTE Plug-in Hybrid": 28,
      },
      "2023–2025 (yeni kasa)": {
        "1.5 eTSI": 127,
        "2.0 TDI": 123,
        "PHEV": 21,
      },
    },
  },
  Ford: {
    "F-Series": {
      "2020–2022": {
        "2.7 EcoBoost": 255,
        "3.5 EcoBoost": 280,
        "5.0 V8": 310,
        "PowerBoost Hybrid": 215,
      },
      "2023–2025": {
        "Hybrid": 205,
        "Raptor / yüksek performans": 350,
      },
    },
    Focus: {
      "2020–2022": {
        "1.0 EcoBoost": 120,
        "1.5 EcoBoost": 136,
        "1.5 Diesel": 114,
        "ST": 180,
      },
      "2023–2025": {
        "1.0 Hybrid": 119,
        "1.5 Diesel": 111,
      },
    },
  },
  Hyundai: {
    Elantra: {
      "2020–2022": {
        "1.6 MPI": 140,
        "Hybrid": 98,
      },
      "2023–2025": {
        "Hybrid": 93,
      },
    },
    Tucson: {
      "2020–2022": {
        "1.6 T-GDI": 160,
        "Hybrid": 133,
        "PHEV": 32,
      },
      "2023–2025": {
        "Hybrid": 128,
        "PHEV": 28,
      },
    },
  },
  Kia: {
    Sportage: {
      "2020–2022": {
        "1.6 T-GDI": 157,
        "Hybrid": 128,
        "PHEV": 30,
      },
      "2023–2025": {
        "Hybrid": 125,
        "PHEV": 27,
      },
    },
  },
  BMW: {
    "3 Series": {
      "2020–2022": {
        "318i": 134,
        "320i": 140,
        "320d": 120,
        "330e (PHEV)": 38,
      },
      "2023–2025 (LCI)": {
        "320i": 135,
        "320d": 115,
        "330e": 29,
      },
    },
  },
  "Mercedes-Benz": {
    "C-Class": {
      "2020–2022": {
        "C180": 148,
        "C200": 153,
        "C220d": 125,
        "C300e (PHEV)": 38,
      },
      "2023–2025": {
        "C200 mild hybrid": 143,
        "C220d": 120,
        "C300e": 19,
      },
    },
  },
  Chevrolet: {
    Silverado: {
      "2020–2022": {
        "2.7 Turbo": 255,
        "5.3 V8": 325,
        "6.2 V8": 345,
        "3.0 Diesel": 225,
      },
      "2023–2025": {
        "Güncellenmiş motorlar": 290,
      },
    },
  },
};

function VehicleCalculator() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [version, setVersion] = useState('');
  const [km, setKm] = useState('');
  const [result, setResult] = useState<{ co2kg: number; gPerKm: number } | null>(null);
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const models = brand ? Object.keys(VEHICLE_DATA[brand]) : [];
  const years = brand && model ? Object.keys(VEHICLE_DATA[brand][model]) : [];
  const versions = brand && model && year ? Object.keys(VEHICLE_DATA[brand][model][year]) : [];
  const gPerKm = brand && model && year && version ? VEHICLE_DATA[brand][model][year][version] : null;
  const isPHEV = version.includes('PHEV');

  const resetFrom = (level: 'brand' | 'model' | 'year' | 'version') => {
    if (level === 'brand') { setModel(''); setYear(''); setVersion(''); }
    if (level === 'model') { setYear(''); setVersion(''); }
    if (level === 'year') setVersion('');
    setResult(null);
    setError('');
  };

  const handleCalculate = useCallback(() => {
    if (!brand || !model || !year || !version) {
      setError('Lütfen tüm araç bilgilerini seçin');
      return;
    }
    const numKm = parseFloat(km.replace(',', '.'));
    if (!km || isNaN(numKm) || numKm <= 0) {
      setError('Lütfen geçerli bir km değeri girin');
      return;
    }
    setError('');
    setIsAnimating(true);
    setResult({ co2kg: (numKm * gPerKm!) / 1000, gPerKm: gPerKm! });
    setTimeout(() => setIsAnimating(false), 600);
  }, [brand, model, year, version, km, gPerKm]);

  const barPct = result ? Math.min((result.gPerKm / 200) * 100, 100) : 0;
  const barColor = !result ? '#f59e0b' : result.gPerKm <= 110 ? '#10b981' : result.gPerKm <= 150 ? '#f59e0b' : '#ef4444';
  const trees = result ? (result.co2kg / 21).toFixed(2) : null;

  const selectStyle: React.CSSProperties = {
    background: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(245,158,11,0.2)',
    color: isLight ? '#1c1c1c' : '#ffffff',
    colorScheme: isLight ? 'light' : 'dark',
    width: '100%',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.75rem',
    fontSize: '0.8rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    appearance: 'auto',
  };

  const optCls = isLight ? '' : 'bg-[#0a1628]';

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, rgba(245,158,11,0.08), rgba(180,83,9,0.12))',
          border: '1px solid rgba(245,158,11,0.2)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(245,158,11,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div
          className="px-6 pt-5 pb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))',
            borderBottom: '1px solid rgba(245,158,11,0.12)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 15px rgba(245,158,11,0.4)' }}
            >
              <Car className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm tracking-wide">Araç Karbon Hesaplayıcı</h3>
              <p className="text-white/40 text-xs">WLTP Standardı · Tailpipe CO₂</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-3">
          {/* Brand */}
          <div>
            <label className="block text-white/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Marka</label>
            <select
              value={brand}
              onChange={e => { setBrand(e.target.value); resetFrom('brand'); }}
              style={selectStyle}
            >
              <option value="" className={optCls}>— Marka seçin —</option>
              {Object.keys(VEHICLE_DATA).map(b => <option key={b} value={b} className={optCls}>{b}</option>)}
            </select>
          </div>

          {/* Model */}
          <div>
            <label className="block text-white/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Model</label>
            <select
              value={model}
              onChange={e => { setModel(e.target.value); resetFrom('model'); }}
              disabled={!brand}
              style={{ ...selectStyle, opacity: !brand ? 0.4 : 1 }}
            >
              <option value="" className={optCls}>— Model seçin —</option>
              {models.map(m => <option key={m} value={m} className={optCls}>{m}</option>)}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="block text-white/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Model Yılı</label>
            <select
              value={year}
              onChange={e => { setYear(e.target.value); resetFrom('year'); }}
              disabled={!model}
              style={{ ...selectStyle, opacity: !model ? 0.4 : 1 }}
            >
              <option value="" className={optCls}>— Yıl seçin —</option>
              {years.map(y => <option key={y} value={y} className={optCls}>{y}</option>)}
            </select>
          </div>

          {/* Version */}
          <div>
            <label className="block text-white/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Versiyon</label>
            <select
              value={version}
              onChange={e => { setVersion(e.target.value); setResult(null); setError(''); }}
              disabled={!year}
              style={{ ...selectStyle, opacity: !year ? 0.4 : 1 }}
            >
              <option value="" className={optCls}>— Versiyon seçin —</option>
              {versions.map(v => <option key={v} value={v} className={optCls}>{v}</option>)}
            </select>
          </div>

          {/* KM Input */}
          <div>
            <label className="block text-white/70 text-xs font-medium mb-1.5 uppercase tracking-wide">Mesafe</label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                value={km}
                onChange={e => {
                  const v = e.target.value;
                  if (v === '' || /^\d*[.,]?\d*$/.test(v)) { setKm(v); setError(''); }
                }}
                onKeyDown={e => { if (e.key === 'Enter') handleCalculate(); }}
                placeholder="Örn: 150"
                className="w-full px-4 py-3 rounded-xl text-white text-base font-medium placeholder-white/20 outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: error && error.includes('km') ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(245,158,11,0.15)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-medium">km</span>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-1.5 text-red-400 text-xs">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full py-3 rounded-xl text-white font-medium text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', boxShadow: '0 4px 20px rgba(245,158,11,0.35)' }}
          >
            <span className="inline-flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              CO₂ Hesapla
            </span>
          </button>

          {/* Results */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${result ? 'max-h-[320px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            {result && (
              <div
                className={`rounded-xl p-4 space-y-3 transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
              >
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-amber-400" />
                  <span className="text-white/70 text-xs font-medium uppercase tracking-wide">Emisyon Sonucu</span>
                </div>

                {/* CO₂ total */}
                <div className="flex items-baseline justify-between">
                  <span className="text-white/50 text-sm">Toplam CO₂</span>
                  <div>
                    <span className="text-amber-400 font-serif text-2xl font-semibold">{result.co2kg.toFixed(2)}</span>
                    <span className="text-white/40 text-sm ml-1.5">kg</span>
                  </div>
                </div>

                {/* g/km bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <span>Araç emisyonu</span>
                    <span style={{ color: barColor }}>{result.gPerKm} g/km</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${barPct}%`, background: `linear-gradient(90deg, ${barColor}, ${barColor}99)` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1" style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>
                    <span>0</span><span>200 g/km</span>
                  </div>
                </div>

                {/* Tree equivalent */}
                <div className="flex items-center gap-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <span className="text-base leading-none">🌳</span>
                  <span className="text-white/50 text-xs leading-snug">
                    <span className="text-green-400 font-medium">{trees} ağacın</span> yıllık CO₂ emilimine eşdeğer
                  </span>
                </div>

                {/* PHEV note */}
                {isPHEV && (
                  <div
                    className="flex items-start gap-2 p-2 rounded-lg"
                    style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-px" />
                    <span className="text-amber-400/80 text-[11px] leading-snug">
                      Bu değer elektrik kullanımına göre değişebilir
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-3 text-center flex items-center justify-center gap-2"
          style={{ background: 'rgba(0,0,0,0.15)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="text-white/25 text-[10px] leading-relaxed">
            Değerler WLTP test standardına göre tailpipe CO₂'yi yansıtır
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex-shrink-0 cursor-help transition-all hover:scale-110" aria-label="Bilgi">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500/80 hover:text-amber-400" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[250px] text-center" style={{ background: '#0f1d32', border: '1px solid rgba(245,158,11,0.3)', color: '#e2e8f0', padding: '12px' }}>
              Veriler resmi kaynaklara(WLTP/EPA) dayansa da araç versiyonu ve koşullara göre değişebilir. Sonuçlar yaklaşık değerlerdir.
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div
        className="absolute -inset-4 -z-10 rounded-3xl blur-2xl pulse-glow"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.10) 0%, transparent 70%)' }}
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
  const isVehicleActive = calculator.id === 'vehicle';

  const accentHex   = isNaturalGasActive ? '#10b981' : isVehicleActive ? '#f59e0b' : '#3b82f6';
  const accentDark  = isNaturalGasActive ? '#059669' : isVehicleActive ? '#d97706' : '#2563eb';
  const accentRgb   = isNaturalGasActive ? '16,185,129' : isVehicleActive ? '245,158,11' : '59,130,246';
  const accentText  = isNaturalGasActive ? 'text-green-400' : isVehicleActive ? 'text-amber-400' : 'text-blue-400';
  const accentText5 = isNaturalGasActive ? 'text-green-500' : isVehicleActive ? 'text-amber-500' : 'text-blue-500';
  const CalcIcon    = isNaturalGasActive ? Flame : isVehicleActive ? Car : Zap;

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
                background: `linear-gradient(135deg, ${accentHex}, ${accentDark})`,
                boxShadow: `0 4px 20px rgba(${accentRgb},0.3)`,
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
                  <span className={`font-script text-xl ${accentText}`}>{calculator.subtitle}</span>
                </div>
              </div>
              <div className="h-px w-16" style={{ background: `linear-gradient(90deg, ${accentHex}, transparent)` }} />
            </div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed mb-3">{calculator.description}</p>
            <p className="text-white/50 leading-relaxed text-sm mb-8 flex items-center gap-2">
              <CalcIcon className={`w-3.5 h-3.5 ${accentText5} flex-shrink-0`} />
              {calculator.tastingNotes}
            </p>

            {/* Calculator Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {(isNaturalGasActive ? [
                { label: '1.942 kg', value: 'CO₂/m³ Faktörü' },
                { label: '~950 m³', value: 'Ort. Hane/Yıl' },
                { label: '81 İl', value: 'Veri Kapsamı' },
              ] : isVehicleActive ? [
                { label: 'WLTP', value: 'Test Standardı' },
                { label: '2 Marka', value: 'Model Seçimi' },
                { label: '21 kg', value: '1 Ağaç/Yıl' },
              ] : [
                { label: '0.469 kg', value: 'CO₂e/kWh Faktörü' },
                { label: '~3.200 kWh', value: 'Ort. Hane/Yıl' },
                { label: 'TEİAŞ', value: '2022 Kaynağı' },
              ]).map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl p-3 text-center transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div className={`font-serif text-[15px] ${accentText} mb-1`}>{item.label}</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-wider">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Calculator Widget */}
          <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center">
            {isNaturalGasActive ? (
              <div className="relative" style={{ width: '320px', minHeight: '380px' }}>
                <NaturalGasCalculator />
              </div>
            ) : isVehicleActive ? (
              <div className="relative animate-in fade-in" style={{ width: '320px' }}>
                <VehicleCalculator />
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
                      <IconComponent className={`w-5 h-5 ${accentText}`} />
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
                background: `linear-gradient(135deg, rgba(${accentRgb},0.06), rgba(${accentRgb},0.02))`,
                border: `1px solid rgba(${accentRgb},0.15)`,
                borderLeft: `3px solid rgba(${accentRgb},0.6)`,
              }}>
                {quote.prefix && <p className={`font-script text-2xl mb-2 ${accentText}`}>{quote.prefix}</p>}
                <p className="text-white/65 text-sm italic leading-relaxed">
                  "{quote.text}"
                </p>
                {quote.attribution && <p className={`text-xs mt-3 ${accentText5} opacity-70`}>— {quote.attribution}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
