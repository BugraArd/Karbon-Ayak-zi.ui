# Karbon Ayak İzi - Carbon Footprint Tracker

Modern, interaktif ve kullanıcı dostu bir Karbon Ayak İzi hesaplama platformu. Kullanıcıların günlük yaşamlarındaki enerji tüketimlerini ve ulaşım alışkanlıklarını analiz ederek çevreye etkilerini anlamalarına yardımcı olmak amacıyla geliştirilmiştir.

## Özellikler

- **Gelişmiş Hesaplayıcılar**: Doğalgaz, Elektrik ve Araç (kapsamlı marka/model/yıl desteği ve WLTP/EPA referanslarıyla) emisyon hesaplamaları.
- **Glassmorphism Tasarım**: Şık, modern, karanlık tema tabanlı ve cam (glass) efektleriyle zenginleştirilmiş premium kullanıcı deneyimi.
- **Eğitici İçerikler & İpuçları**: Karbon ayak izini düşürmek için okunabilecek detaylı makaleler ve modal (açılır pencere) yapısı.
- **İnteraktif Zaman Çizelgesi (Timeline)**: İklim değişikliği, regülasyonlar ve karbon salınımı tarihçesini anlatan görsel destekli interaktif yapı.
- **Akıcı Animasyonlar**: Tüm elementlerde kullanıcı deneyimini yüksek tutan pürüzsüz geçiş, scroll (sayfa içi kaydırma) ve mikro etkileşim efektleri.
- **Tam Duyarlı Tasarım (Responsive)**: Tüm cihaz ekranlarında (Mobil, Tablet, Masaüstü) kusursuz görünüm.

## Kullanılan Teknolojiler

- **React 18 & TypeScript**
- **Vite** (Derleme ve geliştirme ortamı)
- **Tailwind CSS** (Stil motoru ve özel glassmorphism utility'leri)
- **Lucide React** (Modern ikon seti)
- **shadcn/ui** (Tooltip ve bazı arayüz bileşenleri)

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

```bash
# 1. Gerekli kütüphane ve bağımlılıkları yükleyin
npm install

# 2. Geliştirme sunucusunu (Vite dev server) başlatın
npm run dev
```

## Proje Yapısı ve İçerik Yönetimi

Projenin metin ve görsel içerikleri genellikle `src/config.ts` dosyasından veya ilgili bileşenlerin kendi yapısından merkezi olarak okumaktadır:

- `CalculatorShowcase`: Elektrik, Doğalgaz ve kapsamlı Araç Karbon salınım hesaplayıcılarını barındıran çekirdek yapı.
- `InfoSection / Timeline`: Karbon tarihçesini yıl bazlı anlatan interaktif bilgi paneli.
- `TipsSection`: Ekolojik tavsiyeleri gösteren esnek makale panoları.
