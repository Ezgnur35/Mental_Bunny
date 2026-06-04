# 🐰 MentalBunny

MentalBunny, zihinsel sağlığı desteklemek amacıyla geliştirilmiş bir mobil uygulamadır. Kullanıcıların günlük ruh hallerini takip etmelerine, düşüncelerini boşaltmalarına ve çeşitli rahatlama teknikleri uygulamalarına olanak tanır.

Bu proje, Expo ve React Native kullanılarak geliştirilmiş olup backend için Convex kullanılmaktadır.

---

## 📸 Ekran Görüntüleri

> *(Aşağıdaki alanları kendi ekran görüntülerinizle doldurunuz)*

### Giriş Ekranı
<!-- Buraya giriş ekranının görüntüsünü ekleyin -->
```
[Ekran görüntüsü eklenecek]
```

### Ana Sayfa
<!-- Buraya ana sayfanın görüntüsünü ekleyin -->
```
[Ekran görüntüsü eklenecek]
```

### Ruh Hali Takibi
<!-- Buraya ruh hali seçim ekranının görüntüsünü ekleyin -->
```
[Ekran görüntüsü eklenecek]
```

### Nefes Egzersizi
<!-- Buraya nefes egzersizi ekranının görüntüsünü ekleyin -->
```
[Ekran görüntüsü eklenecek]
```

### Grounding (5-4-3-2-1 Tekniği)
<!-- Buraya grounding ekranının görüntüsünü ekleyin -->
```
[Ekran görüntüsü eklenecek]
```

### Brain Dump (Düşünce Boşaltma)
<!-- Buraya brain dump ekranının görüntüsünü ekleyin -->
```
[Ekran görüntüsü eklenecek]
```

### Günlük (Journal)
<!-- Buraya günlük ekranının görüntüsünü ekleyin -->
```
[Ekran görüntüsü eklenecek]
```

### Karanlık / Aydınlık Tema
<!-- Buraya tema değişikliğinin görüntüsünü ekleyin -->
```
[Ekran görüntüsü eklenecek]
```

---

## 🌟 Özellikler

- **Ruh Hali Takibi** — Günlük ruh halini (İyi, Sakin, Gergin, Yorgun) kaydedebilirsin.
- **Nefes Egzersizi** — Yavaş ve düzenli nefes alarak bedeni sakinleştirme egzersizi.
- **Grounding (5-4-3-2-1)** — Panik anlarında şu ana dönmeye yardımcı olan bir teknik.
- **Brain Dump** — Kafanı dolduran düşünceleri yazıp zihnini boşaltma özelliği.
- **Günlük (Journal)** — Günlük notlar ve ruh hali kayıtları tutabilirsin.
- **Karanlık / Aydınlık Tema** — Sistem temasına göre otomatik uyum sağlar, istersen manuel de değiştirebilirsin.
- **Kullanıcı Girişi** — E-posta ve şifre ile kayıt ve giriş yapabilirsin.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
|---|---|
| [React Native](https://reactnative.dev/) | Mobil uygulama geliştirme çerçevesi |
| [Expo](https://expo.dev/) | React Native geliştirme platformu |
| [Expo Router](https://expo.github.io/router/) | Dosya tabanlı yönlendirme |
| [Convex](https://www.convex.dev/) | Backend ve gerçek zamanlı veritabanı |
| TypeScript | Tip güvenli geliştirme |

---

## 🗂️ Proje Yapısı

```
MentalBunny/
├── app/
│   ├── (tabs)/          # Tab navigasyonu ekranları
│   │   ├── index.tsx    # Ana sayfa
│   │   ├── journal.tsx  # Günlük ekranı
│   │   ├── bunny.tsx    # Bunny ekranı
│   │   └── settings.tsx # Ayarlar
│   ├── auth/            # Giriş / Kayıt ekranları
│   ├── breathing/       # Nefes egzersizi
│   ├── grounding/       # Grounding tekniği
│   └── brain-dump/      # Brain dump ekranları
├── components/          # Tekrar kullanılabilir bileşenler
├── convex/              # Backend fonksiyonları ve şema
├── hooks/               # Custom React hooks
└── services/            # Yardımcı servisler
```

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Expo Go uygulaması (telefonda test için)

### Adımlar

1. Repoyu klonla:
   ```bash
   git clone <repo-url>
   cd MentalBunny
   ```

2. Bağımlılıkları yükle:
   ```bash
   npm install
   ```

3. Convex backend'i başlat:
   ```bash
   npm run convex:dev
   ```

4. Expo'yu başlat:
   ```bash
   npm start
   ```

5. Expo Go uygulamasıyla QR kodu tara ya da emülatörde çalıştır.

---

## 💾 Veritabanı Şeması

Uygulama Convex üzerinde aşağıdaki tabloları kullanmaktadır:

- **users** — Kullanıcı bilgileri (ad, e-posta, şifre, kayıt tarihi)
- **journal** — Günlük notları ve ruh hali kayıtları
- **brainDump** — Düşünce boşaltma yazıları
- **grounding** — 5-4-3-2-1 tekniği yanıtları
- **mood** — Günlük ruh hali geçmişi

---

## 👩‍💻 Geliştirici

Bu proje bir ders projesi kapsamında geliştirilmiştir.

---

## 📄 Lisans

Bu proje eğitim amaçlıdır.
