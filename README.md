# 🐰 MentalBunny

MentalBunny, zihinsel sağlığı desteklemek amacıyla geliştirilmiş bir mobil uygulamadır. Kullanıcıların günlük ruh hallerini takip etmelerine, düşüncelerini boşaltmalarına ve çeşitli rahatlama teknikleri uygulamalarına olanak tanır.

Bu proje, Expo ve React Native kullanılarak geliştirilmiş olup backend için Convex kullanılmaktadır.

---

## 📸 Ekran Görüntüleri

### Giriş Ekranı
<!-- Buraya giriş ekranının görüntüsünü ekleyin -->
```
        <img width="955" height="2048" alt="giriş_yap" src="https://github.com/user-attachments/assets/db83ef3a-cddf-42b9-98a1-49567b9ef22c" />
  
```

### Kayıt Ol Ekranı
<!-- Buraya ana sayfanın görüntüsünü ekleyin -->
```
<img width="955" height="2048" alt="kayit_OL" src="https://github.com/user-attachments/assets/f4e906b5-90c9-43b6-a091-bc2fa886c38a" />


```

### Ana Sayfa
<!-- Buraya ruh hali seçim ekranının görüntüsünü ekleyin -->
```
 <img width="955" height="2048" alt="ANASAYFA" src="https://github.com/user-attachments/assets/68bccef6-8981-4ed9-ac9d-9689aa0fe907" />
```

### Nefes Egzersizi
<!-- Buraya nefes egzersizi ekranının görüntüsünü ekleyin -->
```
<img width="1080" height="2316" alt="NEFES" src="https://github.com/user-attachments/assets/0038187c-d85f-47be-af01-f3f955d3a8f5" />

```

### Grounding (5-4-3-2-1 Tekniği)
<!-- Buraya grounding ekranının görüntüsünü ekleyin -->
```
<img width="955" height="2048" alt="GROUND" src="https://github.com/user-attachments/assets/c9fb257e-4348-487c-b5ec-4b7d93ed8806" />

```

### Brain Dump (Düşünce Boşaltma)
<!-- Buraya brain dump ekranının görüntüsünü ekleyin -->
```
<img width="955" height="2048" alt="KAVANOZ" src="https://github.com/user-attachments/assets/1aa9dc25-6b47-47aa-9f31-361e7d6ce625" />

```

### Günlük (Journal)
<!-- Buraya günlük ekranının görüntüsünü ekleyin -->
```
<img width="955" height="2048" alt="GUNLUK" src="https://github.com/user-attachments/assets/b0b3b9c5-d1fc-48e9-931d-d92e595b7a97" />

```

### Ayarlar Ekranı
<!-- Buraya tema değişikliğinin görüntüsünü ekleyin -->
```
<img width="955" height="2048" alt="ayarlare" src="https://github.com/user-attachments/assets/94a6e1fe-4f3d-4c26-8617-d0e51d3124ce" />

```

### Aydınlık Tema
<!-- Buraya tema değişikliğinin görüntüsünü ekleyin -->
```
<img width="955" height="2048" alt="aydınlık" src="https://github.com/user-attachments/assets/1e927420-9402-4ce6-99f7-c0ce490ac566" />

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
