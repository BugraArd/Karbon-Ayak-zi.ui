// =============================================================================
// Karbon Ayak İzi Takip Sitesi - Configuration
// =============================================================================
// Türkiye'de karbon ayak izi takibi ve hesaplama platformu
// =============================================================================

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "Karbon Ayak İzi Takip - Türkiye",
  description: "Türkiye'de karbon ayak izinizi hesaplayın, doğalgaz tüketimi ve ulaşım karbon salınımınızı takip edin. Sürdürülebilir bir gelecek için ilk adımı atın.",
  language: "tr",
  keywords: "karbon ayak izi, karbon salınımı, doğalgaz hesaplama, ulaşım karbon, çevre, sürdürülebilirlik, Türkiye",
  ogImage: "/images/hero-banner.jpg",
  canonical: "https://karbonayakizi.com",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  dropdown?: NavDropdownItem[];
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "Karbon Ayak İzi",
  brandSubname: "Takip",
  tagline: "Sürdürülebilir Gelecek İçin",
  navLinks: [
    { name: "Ana Sayfa", href: "#hero", icon: "Home" },
    { 
      name: "Hesaplayıcılar", 
      href: "#calculators", 
      icon: "Calculator",
      dropdown: [
        { name: "Doğalgaz Hesaplayıcı", href: "#natural-gas" },
        { name: "Elektrik Tüketim Hesaplayıcı", href: "#electricity" },
      ]
    },
    { name: "İller", href: "#cities", icon: "MapPin" },
    { name: "Bilgi", href: "#info", icon: "BookOpen" },
    { name: "İletişim", href: "#contact", icon: "Mail" },
  ],
  ctaButtonText: "Hemen Başla",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "Karbon Ayak İzi",
  brandSubname: "Takip",
  yearText: "Türkiye 2026",
};

// -----------------------------------------------------------------------------
// Hero Config
// -----------------------------------------------------------------------------
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  ctaButtonText: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  scriptText: "Sürdürülebilir bir gelecek için",
  mainTitle: "Karbon Ayak İzinizi\nHesaplayın",
  ctaButtonText: "Hesaplamaya Başla",
  ctaTarget: "#calculators",
  stats: [
    { value: 81, suffix: "", label: "İl Verisi" },
    { value: 2.5, suffix: " ton", label: "Ort. CO₂/Kişi" },
    { value: 100, suffix: "%", label: "Ücretsiz" },
  ],
  decorativeText: "KARBON TAKİP",
  backgroundImage: "/images/anasayfa.png",
};

// -----------------------------------------------------------------------------
// Calculator Showcase Config (Wine Showcase yerine)
// -----------------------------------------------------------------------------
export interface Calculator {
  id: string;
  name: string;
  subtitle: string;
  year: string;
  image: string;
  filter: string;
  glowColor: string;
  description: string;
  tastingNotes: string;
  alcohol: string;
  temperature: string;
  aging: string;
}

export interface CalculatorFeature {
  icon: string;
  title: string;
  description: string;
}

export interface CalculatorQuote {
  text: string;
  attribution: string;
  prefix: string;
}

export interface CalculatorShowcaseConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  calculators: Calculator[];
  features: CalculatorFeature[];
  quote: CalculatorQuote;
}

export const calculatorShowcaseConfig: CalculatorShowcaseConfig = {
  scriptText: "Hesaplayıcılarımız",
  subtitle: "KARBON SALINIMI HESAPLAMA",
  mainTitle: "Ayak İzinizi Ölçün",
  calculators: [
    {
      id: "natural-gas",
      name: "Doğalgaz Hesaplayıcı",
      subtitle: "Türkiye 81 İl",
      year: "2026",
      image: "/images/natural-gas.jpg",
      filter: "",
      glowColor: "bg-orange-500/20",
      description: "Türkiye'nin 81 ilindeki doğalgaz tüketim verilerine göre karbon salınımınızı hesaplayın. Her ilin farklı iklim koşulları ve tüketim alışkanlıkları dikkate alınır.",
      tastingNotes: "m³ başına 2.02 kg CO₂",
      alcohol: "Ort. Fatura",
      temperature: "Isınma Derecesi",
      aging: "Yıllık Tüketim",
    },
    {
      id: "electricity",
      name: "Elektrik Tüketim Hesaplayıcı",
      subtitle: "Ev ve bireysel elektrik kullanımı",
      year: "2026",
      image: "",
      filter: "",
      glowColor: "bg-blue-500/20",
      description: "Aylık veya günlük elektrik tüketiminizi girerek tahmini karbon ayak izinizi hesaplayın. Türkiye ortalama şebeke emisyon faktörüne göre sonuç üretin.",
      tastingNotes: "kWh başına kg CO₂e",
      alcohol: "Tüketim Tipi",
      temperature: "kWh Değeri",
      aging: "Sonuç Periyodu",
    },
  ],
  features: [
    { 
      icon: "Zap", 
      title: "Kolay Hesaplama", 
      description: "Sadece tüketim verinizi girin, tahmini karbon salımınızı anında görün." 
    },
    { 
      icon: "MapPin", 
      title: "Türkiye Ortalama Şebeke Verisi", 
      description: "Güncel Türkiye elektrik emisyon katsayısına göre hesaplama yapılır." 
    },
    { 
      icon: "Clock", 
      title: "Güncel Veriler", 
      description: "kWh başına güncel karbon emisyon faktörü kullanılır." 
    },
    { 
      icon: "Sparkles", 
      title: "Öneriler", 
      description: "Elektrik tüketiminizi ve karbon ayak izinizi azaltmak için öneriler sunulur." 
    },
  ],
  quote: {
    text: "Elektrik tüketimini bilmek, karbon ayak izinizi yönetmenin en temel adımlarından biridir.",
    attribution: "Karbon Ayak İzi Takip Ekibi",
    prefix: "Bilgi",
  },
};

// -----------------------------------------------------------------------------
// Cities Carousel Config (Winery Carousel yerine)
// -----------------------------------------------------------------------------
export interface CitySlide {
  image: string;
  title: string;
  subtitle: string;
  area: string;
  unit: string;
  description: string;
}

export interface CitiesCarouselConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  locationTag: string;
  slides: CitySlide[];
}

export const citiesCarouselConfig: CitiesCarouselConfig = {
  scriptText: "İl Verileri",
  subtitle: "TÜRKİYE KARBON HARİTASI",
  mainTitle: "İllerin Karbon Profili",
  locationTag: "Türkiye, 81 İl",
  slides: [
    {
      image: "/images/istanbul-carbon.png",
      title: "İstanbul",
      subtitle: "Marmara Bölgesi",
      area: "1.850",
      unit: "kg CO₂/kişi/yıl",
      description: "Türkiye'nin en kalabalık şehri İstanbul'da doğalgaz tüketimi ve ulaşım kaynaklı karbon salınımı ortalama 1.850 kg CO₂/kişi/yıldır.",
    },
    {
      image: "/images/ankara-carbon.png",
      title: "Ankara",
      subtitle: "İç Anadolu Bölgesi",
      area: "2.420",
      unit: "kg CO₂/kişi/yıl",
      description: "Soğuk iklimi nedeniyle ısınma ihtiyacı yüksek olan Ankara'da ortalama karbon salınımı 2.420 kg CO₂/kişi/yıl seviyesindedir.",
    },
    {
      image: "/images/izmir-carbon.png",
      title: "İzmir",
      subtitle: "Ege Bölgesi",
      area: "1.520",
      unit: "kg CO₂/kişi/yıl",
      description: "Ilıman iklimi sayesinde İzmir, Türkiye'nin en düşük karbon salınımına sahip büyükşehirlerinden biri olarak öne çıkmaktadır.",
    },
    {
      image: "/images/erzurum-carbon.png",
      title: "Erzurum",
      subtitle: "Doğu Anadolu Bölgesi",
      area: "3.150",
      unit: "kg CO₂/kişi/yıl",
      description: "Türkiye'nin en soğuk illerinden biri olan Erzurum'da ısınma ihtiyacı nedeniyle karbon salınımı yüksek seyretmektedir.",
    },
  ],
};

// -----------------------------------------------------------------------------
// Info/Education Config (Museum yerine)
// -----------------------------------------------------------------------------
export interface TimelineEvent {
  year: string;
  event: string;
  image?: string;
  description?: string;
}

export interface InfoTabContent {
  title: string;
  description: string;
  highlight: string;
}

export interface InfoTab {
  id: string;
  name: string;
  icon: string;
  image: string;
  content: InfoTabContent;
}

export interface InfoQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface InfoConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  timeline: TimelineEvent[];
  tabs: InfoTab[];
  openingHours: string;
  openingHoursLabel: string;
  ctaButtonText: string;
  yearBadge: string;
  yearBadgeLabel: string;
  quote: InfoQuote;
  founderPhotoAlt: string;
  founderPhoto: string;
}

export const infoConfig: InfoConfig = {
  scriptText: "Bilgi Merkezi",
  subtitle: "KARBON AYAK İZİ HAKKINDA",
  mainTitle: "Bilgi ve Eğitim",
  introText: "Karbon ayak izi, bireylerin, kuruluşların ve ürünlerin faaliyetleri sonucu atmosfere saldığı sera gazı miktarının bir ölçüsüdür. Bu miktar genellikle karbondioksit (CO₂) eşdeğeri olarak ifade edilir.",
  timeline: [
    { 
      year: "1990", 
      event: "İklim değişikliği küresel gündeme girdi",
      image: "/images/1990.png",
      description: "1990 yılı, iklim değişikliğinin küresel ölçekte ciddi bir çevre sorunu olarak görünürlük kazandığı dönemin başlangıcı oldu. Bilimsel bulguların güçlenmesiyle birlikte hükümetler ve uluslararası kurumlar konuya daha fazla odaklanmaya başladı. Bu dönem, modern iklim politikalarının temellerinin atıldığı eşiklerden biri olarak kabul edilir."
    },
    { 
      year: "1997", 
      event: "Kyoto Protokolü imzalandı",
      image: "/images/1997.png",
      description: "Kyoto Protokolü, sera gazı emisyonlarını azaltmaya yönelik ilk büyük uluslararası adımlardan biri olarak kabul edilir. İklim krizine karşı atılan bu resmi adım, tüm dünya ülkeleri için emisyon kısıtlamalarının önemini vurguladı."
    },
    { 
      year: "2015", 
      event: "Paris İklim Anlaşması kabul edildi",
      image: "/images/2015.png",
      description: "Paris İklim Anlaşması, küresel sıcaklık artışını sınırlandırmayı hedefleyen önemli bir dönüm noktasıdır. Tüm dünyayı net sıfır karbon hedefine odaklayan bir çerçeve çizilmiştir."
    },
    { 
      year: "2021", 
      event: "Türkiye Paris Anlaşması'nı onayladı",
      image: "/images/2021.png",
      description: "Türkiye’nin Paris Anlaşması’nı onaylaması, iklim politikaları açısından önemli bir adımdı. Ulusal emisyon stratejileri bu doğrultuda yeniden yapılandırıldı."
    },
    { 
      year: "2023", 
      event: "Net Sıfır 2053 hedefi belirlendi",
      image: "/images/2023.png",
      description: "Net Sıfır 2053 hedefi, Türkiye’nin uzun vadeli karbon azaltım vizyonunu yansıtan önemli bir stratejik çerçevedir. Bu hedefle sürdürülebilir bir eko-sisteme geçiş planlanmaktadır."
    },
  ],
  tabs: [
    {
      id: "what",
      name: "Nedir?",
      icon: "BookOpen",
      image: "/images/info-what.jpg",
      content: {
        title: "Karbon Ayak İzi Nedir?",
        description: "Karbon ayak izi, bir kişinin, kuruluşun veya ürünün faaliyetleri sonucu atmosfere saldığı toplam sera gazı miktarını ifade eder. Bu miktar genellikle karbondioksit (CO₂) eşdeğeri olarak ölçülür.",
        highlight: "Türkiye ortalaması: 5.2 ton CO₂/kişi/yıl",
      },
    },
    {
      id: "why",
      name: "Neden Önemli?",
      icon: "Award",
      image: "/images/bilgi-neden-onemli.png",
      content: {
        title: "Neden Önemli?",
        description: "İklim değişikliğinin en büyük nedeni sera gazı salınımıdır. Karbon ayak izimizi azaltarak küresel ısınmayı yavaşlatabilir ve sürdürülebilir bir gelecek inşa edebiliriz.",
        highlight: "Küresel hedef: 1.5°C sınırını aşmamak",
      },
    },
    {
      id: "how",
      name: "Nasıl Azaltılır?",
      icon: "History",
      image: "/images/bilgi-nasil-azaltilir.jpeg",
      content: {
        title: "Nasıl Azaltılır?",
        description: "Enerji verimliliği, yenilenebilir enerji kullanımı, toplu taşıma tercihi, yerel tüketim ve atık azaltma karbon ayak izini düşürmenin en etkili yollarıdır.",
        highlight: "%40'a varan azaltım mümkün",
      },
    },
  ],
  openingHours: "7/24 Online",
  openingHoursLabel: "Erişim",
  ctaButtonText: "Daha Fazla Bilgi",
  yearBadge: "2026",
  yearBadgeLabel: "Güncel",
  quote: {
    prefix: "İlham",
    text: "Gelecek nesillere yaşanabilir bir dünya bırakmak için bugünden harekete geçmeliyiz.",
    attribution: "Sürdürülebilirlik Manifestosu",
  },
  founderPhotoAlt: "Sürdürülebilir Gelecek",
  founderPhoto: "/images/sustainable-future.jpg",
};

// -----------------------------------------------------------------------------
// Tips & Testimonials Config (News yerine)
// -----------------------------------------------------------------------------
export interface TipArticle {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  fullContent: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface StoryQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface StoryTimelineItem {
  value: string;
  label: string;
}

export interface TipsConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  viewAllText: string;
  readMoreText: string;
  articles: TipArticle[];
  testimonialsScriptText: string;
  testimonialsSubtitle: string;
  testimonialsMainTitle: string;
  testimonials: Testimonial[];
  storyScriptText: string;
  storySubtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyTimeline: StoryTimelineItem[];
  storyQuote: StoryQuote;
  storyImage: string;
  storyImageCaption: string;
}

export const tipsConfig: TipsConfig = {
  scriptText: "İpuçları",
  subtitle: "KARBON AZALTMA REHBERİ",
  mainTitle: "Pratik Çözümler",
  viewAllText: "Tümünü Gör",
  readMoreText: "Devamını Oku",
  articles: [
    {
      id: 1,
      image: "/images/tip-energy.jpg",
      title: "Evde Enerji Verimliliği",
      excerpt: "LED ampuller kullanmak, izolasyon yapmak ve enerji verimli cihazlar tercih etmek yılda 500 kg CO₂ tasarrufu sağlar.",
      date: "15 Mart 2026",
      category: "Ev",
      fullContent: [
        "Evde enerji verimliliği, hem ekonomik tasarruf sağlamak hem de çevresel etkileri azaltmak açısından giderek daha önemli hale geliyor. Günlük yaşamda küçük gibi görünen alışkanlıklar bile uzun vadede ciddi enerji kazanımları sağlayabilir. Bu nedenle konuya sadece teknoloji yatırımı olarak değil, aynı zamanda bir yaşam tarzı değişimi olarak yaklaşmak gerekir.",
        "Öncelikle ısı yalıtımı, evde enerji verimliliğinin temelini oluşturur. Özellikle kış aylarında ısı kaybının büyük kısmı duvarlar, pencereler ve çatılar üzerinden gerçekleşir. Çift camlı pencereler kullanmak, kapı altlarına basit yalıtım bantları eklemek ve perdeleri gece kapalı tutmak gibi yöntemler ısı kaybını ciddi şekilde azaltır. Aynı şekilde yaz aylarında güneş ışığını doğrudan içeri almamak için stor perde veya panjur kullanmak, klima ihtiyacını düşürür.",
        "Elektrikli cihazların doğru kullanımı da önemli bir diğer faktördür. Stand-by modunda bırakılan televizyon, bilgisayar ve şarj aletleri fark edilmeden sürekli enerji tüketir. Bu cihazları tamamen kapatmak ya da akıllı prizler kullanmak yıllık tüketimi gözle görülür şekilde azaltabilir. Ayrıca enerji verimliliği yüksek (A+++ gibi) beyaz eşyaların tercih edilmesi, uzun vadede daha düşük elektrik faturası anlamına gelir.",
        "Aydınlatma tarafında ise LED ampuller önemli bir avantaj sağlar. Geleneksel ampullere göre çok daha az enerji tüketirler ve ömürleri daha uzundur. Gün ışığından maksimum fayda sağlamak da oldukça basit ama etkili bir yöntemdir; gündüz saatlerinde gereksiz ışık kullanımından kaçınılmalıdır.",
        "Isıtma ve soğutma sistemlerinin bilinçli kullanımı da kritik bir rol oynar. Örneğin kombiyi çok yüksek sıcaklıklarda çalıştırmak yerine sabit ve orta seviyede tutmak daha verimlidir. Aynı şekilde klima kullanırken kapı ve pencerelerin kapalı olması gerekir. Termostat kullanımı ise sıcaklığı otomatik kontrol ederek gereksiz tüketimin önüne geçer.",
        "Son olarak su kullanımına da dikkat etmek gerekir. Sıcak su üretimi ciddi enerji gerektirir. Daha kısa duşlar almak, düşük akışlı duş başlıkları kullanmak ve çamaşır/bulaşık makinelerini tam dolu çalıştırmak enerji tasarrufuna doğrudan katkı sağlar.",
        "Özetle, evde enerji verimliliği büyük yatırımlardan ziyade bilinçli alışkanlıklarla başlar. Küçük değişiklikler bir araya geldiğinde hem bütçeye hem de çevreye önemli katkılar sağlar.",
      ],
    },
    {
      id: 2,
      image: "/images/tip-transport.jpg",
      title: "Sürdürülebilir Ulaşım",
      excerpt: "Toplu taşıma kullanmak, bisiklet tercih etmek veya elektrikli araçlara geçmek karbon ayak izinizi %30 azaltabilir.",
      date: "10 Mart 2026",
      category: "Ulaşım",
      fullContent: [
        "Ulaşım, bireysel karbon ayak izinin en büyük bileşenlerinden biridir. Özellikle fosil yakıtla çalışan araçların yaygın kullanımı, sera gazı emisyonlarının önemli bir kısmını oluşturur. Bu nedenle sürdürülebilir ulaşım tercihleri, hem bireysel hem de toplumsal ölçekte karbon salımını azaltmanın en etkili yollarından biridir.",
        "Günlük hayatta en basit ve etkili yöntemlerden biri, kısa mesafelerde yürümeyi veya bisiklet kullanmayı tercih etmektir. Bu sadece karbon salımını sıfıra indirgemekle kalmaz, aynı zamanda fiziksel sağlık açısından da önemli faydalar sağlar. Özellikle şehir içinde 2-3 kilometrelik mesafelerde araç kullanmak yerine aktif ulaşım yöntemlerine yönelmek ciddi bir fark yaratır.",
        "Toplu taşıma kullanımı da karbon ayak izini azaltmada kritik bir rol oynar. Otobüs, metro veya tren gibi sistemler, kişi başına düşen emisyon miktarını özel araçlara kıyasla önemli ölçüde düşürür. Aynı anda çok sayıda insanın taşınması, yakıt verimliliğini artırır ve trafik yoğunluğunu azaltarak dolaylı emisyonları da düşürür.",
        "Özel araç kullanımı kaçınılmaz olduğunda ise bazı stratejilerle etkiler azaltılabilir. Araç paylaşımı (carpooling) bu yöntemlerden biridir; aynı güzergâhı kullanan kişilerin birlikte seyahat etmesi toplam araç sayısını azaltır. Bunun yanı sıra düzenli bakım yapılan araçlar daha verimli çalışır ve daha az yakıt tüketir. Lastik basıncının doğru olması, ani hızlanma ve frenlerden kaçınılması gibi sürüş alışkanlıkları da yakıt tüketimini doğrudan etkiler.",
        "Elektrikli ve hibrit araçlar, uzun vadede karbon emisyonlarını azaltma potansiyeline sahiptir. Özellikle elektrik üretiminin yenilenebilir kaynaklardan sağlandığı durumlarda bu araçların çevresel avantajı daha da artar. Ancak burada önemli olan nokta, sadece araç tipini değiştirmek değil, genel ulaşım alışkanlıklarını da daha sürdürülebilir hale getirmektir.",
        "Ulaşım planlaması da çoğu zaman göz ardı edilen bir konudur. Günlük rotaları önceden planlamak, gereksiz yolculukları azaltmak ve birden fazla işi tek seferde halletmek hem zaman hem de enerji tasarrufu sağlar. Ayrıca uzaktan çalışma ve online toplantılar gibi alternatifler, ulaşım ihtiyacını doğrudan ortadan kaldırarak karbon ayak izini önemli ölçüde düşürür.",
        "Sonuç olarak, sürdürülebilir ulaşım sadece teknolojik bir dönüşüm değil, aynı zamanda davranışsal bir değişim gerektirir. Küçük tercihler — daha az araç kullanmak, toplu taşımayı seçmek veya yürümek — uzun vadede büyük çevresel kazanımlara dönüşür.",
      ],
    },
    {
      id: 3,
      image: "/images/tip-food.jpg",
      title: "Yerel ve Mevsimsel Beslenme",
      excerpt: "Yerel ürünler tüketmek ve mevsiminde beslenmek ulaşım kaynaklı emisyonları azaltır.",
      date: "5 Mart 2026",
      category: "Beslenme",
      fullContent: [
        "Yerel ve mevsimsel beslenme, karbon ayak izini azaltmanın en pratik ve etkili yollarından biridir. Gıda üretimi ve tüketimi sürecinde oluşan emisyonların önemli bir kısmı; taşıma (lojistik), depolama (soğuk zincir) ve serada üretim gibi aşamalardan kaynaklanır. Bu nedenle tükettiğimiz ürünlerin nereden geldiği ve hangi koşullarda üretildiği doğrudan çevresel etkimizi belirler.",
        "Yerel beslenme, ürünlerin uzun mesafeler kat etmeden soframıza ulaşmasını sağlar. Örneğin başka bir ülkeden ithal edilen bir sebze veya meyve, taşınma sürecinde ciddi miktarda karbon salımına neden olur. Buna karşılık yerel pazarlardan alınan ürünler hem daha taze olur hem de ulaşım kaynaklı emisyonları minimuma indirir. Aynı zamanda yerel üreticiyi desteklemek, sürdürülebilir tarımın devamlılığı açısından da önemlidir.",
        "Mevsimsel beslenme ise ürünlerin doğal yetişme döneminde tüketilmesini ifade eder. Mevsimi dışında üretilen ürünler genellikle seralarda yetiştirilir ve bu süreçte ek enerji kullanımı (ısıtma, aydınlatma vb.) gerekir. Bu da karbon ayak izini artırır. Örneğin yaz sebzesi olan domatesi kışın tüketmek yerine kış sebzelerine yönelmek daha sürdürülebilir bir tercihtir.",
        "Bu yaklaşımın bir diğer avantajı da besin değerlerinin daha yüksek olmasıdır. Mevsiminde yetişen ürünler, doğrudan doğal koşullarda olgunlaştıkları için genellikle daha lezzetli ve besleyicidir. Ayrıca daha az işleme ve depolama gerektirdiğinden gıda israfı da azalır.",
        "Günlük hayatta uygulanabilecek pratik ipuçları:\n• Haftalık alışverişinizi yerel semt pazarlarından yapmaya çalışın.\n• Mevsim takvimi oluşturarak hangi ürünün hangi dönemde tüketilmesi gerektiğini öğrenin.\n• İthal ürün yerine yerli alternatifleri tercih edin.\n• Dondurulmuş veya uzun süre depolanmış ürünler yerine taze ürünlere yönelin.\n• Gıda israfını azaltmak için ihtiyacınız kadar alışveriş yapın.\n• Bitki bazlı beslenme oranını artırarak et tüketimini dengeleyin (özellikle kırmızı etin karbon ayak izi yüksektir).",
        "Sonuç olarak yerel ve mevsimsel beslenme, büyük değişiklikler gerektirmeden uygulanabilecek sürdürülebilir bir yaşam stratejisidir. Bilinçli gıda tercihleriyle hem kendi sağlığımızı destekleyebilir hem de çevre üzerindeki baskıyı önemli ölçüde azaltabiliriz.",
      ],
    },
    {
      id: 4,
      image: "/images/tip-waste.jpg",
      title: "Atık Azaltma Stratejileri",
      excerpt: "Geri dönüşüm, kompost yapma ve tek kullanımlık ürünlerden kaçınma atık kaynaklı emisyonları düşürür.",
      date: "1 Mart 2026",
      category: "Atık",
      fullContent: [
        "Atık azaltma, karbon ayak izini düşürmenin en hızlı ve etkili yollarından biridir. Temel yaklaşım, \"az tüket, yeniden kullan, geri dönüştür\" prensibine dayanır.",
        "Günlük hayatta en önemli adım, gereksiz tüketimi azaltmaktır. İhtiyaç dışı alışverişten kaçınmak ve tek kullanımlık ürünler yerine uzun ömürlü alternatifler tercih etmek atık oluşumunu ciddi şekilde düşürür. Örneğin plastik şişe yerine matara kullanmak basit ama etkili bir çözümdür.",
        "Yeniden kullanım da kritik bir stratejidir. Cam kavanozları saklama kabı olarak değerlendirmek veya eski kıyafetleri farklı amaçlarla kullanmak, hem atığı azaltır hem de kaynak tasarrufu sağlar.",
        "Geri dönüşüm ise son aşamadır. Kağıt, plastik, cam ve metal atıkları doğru şekilde ayrıştırmak, bu malzemelerin tekrar üretime kazandırılmasına yardımcı olur. Ayrıca organik atıkları kompost yaparak değerlendirmek, hem çöp miktarını azaltır hem de doğal gübre elde edilmesini sağlar.",
        "Kısacası, bilinçli tüketim ve küçük alışkanlık değişiklikleriyle atık miktarını azaltmak mümkündür.",
      ],
    },
  ],
  testimonialsScriptText: "Kullanıcılar",
  testimonialsSubtitle: "GERÇEK HİKAYELER",
  testimonialsMainTitle: "Kullanıcı Yorumları",
  testimonials: [
    {
      name: "Ayşe Yılmaz",
      role: "Öğretmen",
      text: "Doğalgaz hesaplayıcı sayesinde kış aylarında enerji tüketimimi optimize ettim. Faturam %20 düştü, çevreye katkım arttı.",
      rating: 5,
    },
    {
      name: "Mehmet Kaya",
      role: "Mühendis",
      text: "Ulaşım hesaplayıcısı işe bisikletle gitmeye başlamamı sağladı. Hem sağlıklı hem çevre dostu bir seçim.",
      rating: 5,
    },
    {
      name: "Zeynep Demir",
      role: "Öğrenci",
      text: "Karbon ayak izimi hesapladıktan sonra günlük alışkanlıklarımı değiştirdim. Küçük adımlar büyük fark yaratıyor.",
      rating: 4,
    },
  ],
  storyScriptText: "Hikayemiz",
  storySubtitle: "MİSYONUMUZ",
  storyTitle: "Neden Karbon Takip?",
  storyParagraphs: [
    "Karbon Ayak İzi Takip platformu, Türkiye'deki bireylerin ve kuruluşların çevresel etkilerini ölçmeleri ve azaltmaları için kuruldu. Amacımız, herkesin kolayca erişebileceği, güvenilir ve kullanıcı dostu bir karbon hesaplama aracı sunmak.",
    "Türkiye'nin 81 ili için özelleştirilmiş verilerle, yerel koşulları dikkate alan doğru hesaplamalar yapıyoruz. İklim değişikliğiyle mücadelede bilinçli bireyler yetiştirmek için çalışıyoruz.",
  ],
  storyTimeline: [
    { value: "10K+", label: "Kullanıcı" },
    { value: "50K+", label: "Hesaplama" },
    { value: "81", label: "İl Verisi" },
    { value: "24/7", label: "Destek" },
  ],
  storyQuote: {
    prefix: "Vizyon",
    text: "Türkiye'nin en kapsamlı karbon ayak izi platformu olmak ve sürdürülebilir bir gelecek için herkesi harekete geçirmek.",
    attribution: "Karbon Ayak İzi Takip",
  },
  storyImage: "/images/our-story.jpg",
  storyImageCaption: "Sürdürülebilir gelecek için çalışıyoruz",
};

// -----------------------------------------------------------------------------
// Contact Form Config
// -----------------------------------------------------------------------------
export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  subtext: string;
}

export interface ContactFormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  visitDateLabel: string;
  visitorsLabel: string;
  visitorsOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactFormConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  contactInfoTitle: string;
  contactInfo: ContactInfoItem[];
  form: ContactFormFields;
  privacyNotice: string;
  formEndpoint: string;
}

export const contactFormConfig: ContactFormConfig = {
  scriptText: "İletişim",
  subtitle: "BİZE ULAŞIN",
  mainTitle: "Sorularınız Mı Var?",
  introText: "Karbon ayak izi hesaplama, sürdürülebilirlik önerileri veya platformumuz hakkında sorularınız için bize ulaşabilirsiniz.",
  contactInfoTitle: "İletişim Bilgileri",
  contactInfo: [
    {
      icon: "MapPin",
      label: "Adres",
      value: "Ankara/Çankaya, Türkiye",
      subtext: "Çevre Dostu Ofis",
    },
    {
      icon: "Mail",
      label: "E-posta",
      value: "ardaakyay@hotmail.com",
      subtext: "7/24 Yanıt",
    },
    {
      icon: "Clock",
      label: "Çalışma Saatleri",
      value: "7/24 Online",
      subtext: "Her Zaman Erişim",
    },
  ],
  form: {
    nameLabel: "Adınız Soyadınız",
    namePlaceholder: "Adınızı girin",
    emailLabel: "E-posta Adresiniz",
    emailPlaceholder: "ornek@email.com",
    phoneLabel: "Telefon Numaranız",
    phonePlaceholder: "+90 5XX XXX XX XX",
    visitDateLabel: "Tercih Ettiğiniz Tarih",
    visitorsLabel: "Konu",
    visitorsOptions: ["Genel Bilgi", "Doğalgaz Hesaplama", "Ulaşım Hesaplama", "İş Birliği", "Diğer"],
    messageLabel: "Mesajınız",
    messagePlaceholder: "Mesajınızı buraya yazın...",
    submitText: "Gönder",
    submittingText: "Gönderiliyor...",
    successMessage: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
    errorMessage: "Bir hata oluştu. Lütfen tekrar deneyin.",
  },
  privacyNotice: "Formu göndererek gizlilik politikamızı kabul etmiş olursunuz.",
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
};

// -----------------------------------------------------------------------------
// Footer Config
// -----------------------------------------------------------------------------
export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContactItem {
  icon: string;
  text: string;
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  contactItems: FooterContactItem[];
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  newsletterErrorText: string;
  newsletterEndpoint: string;
  copyrightText: string;
  legalLinks: string[];
  icpText: string;
  backToTopText: string;
  ageVerificationText: string;
}

export const footerConfig: FooterConfig = {
  brandName: "Karbon Ayak İzi",
  tagline: "Takip",
  description: "Türkiye'nin en kapsamlı karbon ayak izi hesaplama ve takip platformu. Sürdürülebilir bir gelecek için birlikte çalışıyoruz.",
  socialLinks: [
    { icon: "Linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/bugraardaakyay/" },
  ],
  linkGroups: [
    {
      title: "Hızlı Bağlantılar",
      links: [
        { name: "Ana Sayfa", href: "#hero" },
        { name: "Hesaplayıcılar", href: "#calculators" },
        { name: "İl Verileri", href: "#cities" },
        { name: "Bilgi Merkezi", href: "#info" },
      ],
    },
    {
      title: "Hesaplayıcılar",
      links: [
        { name: "Doğalgaz Hesaplayıcı", href: "#natural-gas" },
        { name: "Elektrik Tüketim Hesaplayıcı", href: "#electricity" },
      ],
    },
  ],
  contactItems: [
    { icon: "MapPin", text: "Ankara/Çankaya, Türkiye" },
    { icon: "Mail", text: "ardaakyay@hotmail.com" },
  ],
  newsletterLabel: "Bültenimize Abone Olun",
  newsletterPlaceholder: "E-posta adresiniz",
  newsletterButtonText: "Abone Ol",
  newsletterSuccessText: "Başarıyla abone oldunuz!",
  newsletterErrorText: "Bir hata oluştu. Lütfen tekrar deneyin.",
  newsletterEndpoint: "https://formspree.io/f/YOUR_NEWSLETTER_ID",
  copyrightText: "© 2026 Karbon Ayak İzi Takip. Tüm hakları saklıdır.",
  legalLinks: ["Gizlilik Politikası", "Kullanım Koşulları", "Çerez Politikası"],
  icpText: "Türkiye Cumhuriyeti Çevre, Şehircilik ve İklim Değişikliği Bakanlığı",
  backToTopText: "Yukarı Çık",
  ageVerificationText: "",
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "Yukarı çık",
};
