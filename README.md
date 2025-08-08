# Türkiye Hava Durumu Uygulaması

Modern ve kullanıcı dostu bir hava durumu uygulaması. Türkiye'deki tüm şehirler için detaylı hava durumu bilgilerine erişim sağlar.

## 🌟 Özellikler

### Hava Durumu Bilgileri
- **Güncel sıcaklık** ve hissedilen sıcaklık
- **Günlük maksimum ve minimum sıcaklıklar** (WeatherAPI forecast endpoint kullanılarak)
- **Hava durumu açıklaması** (Bulutlu, Güneşli, Yağmurlu, vb.)
- **Nem oranı ve rüzgar hızı** bilgileri

### Şehir Seçimi
- **Tüm Türkiye şehirlerini** içeren kapsamlı liste
- **Arama özelliği**: Şehir adı yazarak hızlı filtreleme
- **Otomatik tamamlama**: Yazdıkça eşleşen şehirler görüntülenir
- **Konum desteği**: GPS ile otomatik şehir tespiti (isteğe bağlı)
- Konum izni verilmezse Ankara varsayılan şehir olarak gösterilir

### Görsel Tasarım
- **Yüksek çözünürlüklü SVG weather iconları**: WeatherAPI'nin varsayılan iconları yerine özel tasarım iconlar
- **Karanlık tema**: Göz yorucu olmayan arayüz
- **Responsive tasarım**: Mobil ve masaüstü uyumlu
- **Modern Material UI** bileşenleri

### Kullanıcı Deneyimi
- **Yükleniyor göstergesi**: Veri alınırken görsel geri bildirim
- **Hata yönetimi**: API hatalarında kullanıcı dostu mesajlar
- **Konum bulunamadığında** uygun geri bildirim
- **Demo modu**: API anahtarı olmadan da çalışabilen mock data desteği

## 🚀 Kurulum

### Gereksinimler
- [Node.js](https://nodejs.org/) (v18+ önerilir)
- [npm](https://www.npmjs.com/) veya [yarn](https://yarnpkg.com/)

### Adımlar

1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/yourusername/wheather_map_project.git
   cd wheather_map_project
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **WeatherAPI anahtarı alın:**
    - [WeatherAPI.com](https://www.weatherapi.com/) sitesinden ücretsiz API anahtarı alın

4. **Ortam değişkeni dosyası oluşturun:**
   ```bash
   # .env dosyası oluşturun
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

### Uygulamayı Çalıştırma

```bash
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173/` adresinde çalışmaya başlayacaktır.

## 📁 Proje Yapısı

```
src/
├── App.jsx              # Ana uygulama komponenti ve ana mantık
├── CitySelector.jsx     # Şehir seçim komponenti (arama + konum)  
├── WeatherCard.jsx      # Hava durumu bilgilerini gösteren kart
├── WeatherIcon.jsx      # SVG hava durumu iconlarını yöneten komponent
├── api.js               # WeatherAPI entegrasyonu ve mock data
├── icons/               # Özel SVG hava durumu iconları
│   ├── sunny.svg        # Güneşli hava
│   ├── partly-cloudy.svg # Parçalı bulutlu
│   ├── cloudy.svg       # Bulutlu
│   ├── rainy.svg        # Yağmurlu  
│   ├── heavy-rain.svg   # Şiddetli yağmur
│   ├── snow.svg         # Karlı
│   ├── thunderstorm.svg # Fırtınalı
│   └── mist.svg         # Sisli
└── main.jsx             # Uygulama giriş noktası
```

## 🎨 Hava Durumu İconları

Uygulama, WeatherAPI'nin condition code'larını özel SVG iconlarla eşleştiren kapsamlı bir sistem kullanır:

- **1000**: Güneşli/Açık ☀️
- **1003**: Parçalı bulutlu ⛅
- **1006, 1009**: Bulutlu ☁️
- **1030, 1135, 1147**: Sisli/Puslu 🌫️
- **1063, 1150, 1153, 1180, 1183, 1240**: Hafif yağmur 🌦️
- **1186, 1189, 1192, 1195, 1243, 1246**: Şiddetli yağmur 🌧️
- **1066, 1114, 1117, 1210-1282**: Kar ❄️
- **1087, 1273, 1276**: Fırtına ⛈️

## 🌍 Demo Modu

API anahtarı yoksa veya `test_key_placeholder` olarak ayarlıysa, uygulama örnek verilerle çalışır:

- **Ankara**: 15°C, Parçalı Bulutlu
- **İstanbul**: 22°C, Yağmurlu
- **İzmir**: 28°C, Güneşli
- **Antalya**: 26°C, Bulutlu
- **Erzurum**: -2°C, Kar Yağışlı
- **Trabzon**: 18°C, Sisli

## 🛠️ Geliştirme

### Komutlar

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Üretim build'i
npm run lint     # Kod kalitesi kontrolü
npm run preview  # Build önizlemesi
```

### Teknolojiler

- **React 19** - Modern React framework
- **Vite** - Hızlı build aracı
- **Material UI** - UI bileşen kütüphanesi
- **Axios** - HTTP istemcisi
- **WeatherAPI** - Hava durumu verisi API'si

## 🔐 Güvenlik

- API anahtarınız `.env` dosyasında güvenli şekilde saklanır
- `.gitignore` ile API anahtarı sürüm kontrolüne dahil edilmez
- Geolocation API'si kullanıcı izni gerektirir

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.