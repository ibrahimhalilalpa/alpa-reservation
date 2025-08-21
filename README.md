# Alpa Reservation
<img width="1903" height="901" alt="image" src="https://github.com/user-attachments/assets/d5669f62-3069-4483-bf03-97018ce16a88" />

Kullanıcıların şehir, ilçe ve sektör bazlı filtrelerle işletme bulup randevu alabildiği, işletmelerin de kendi randevularını yönetebildiği bir çevrim içi rezervasyon sistemi.

##  Özellikler

- İşletmeleri şehir, ilçe ve sektöre göre filtreleme
    
- Kullanıcı kaydı ve giriş sistemi
    
- Randevu alma özelliği, dolu saatlerin devre dışı bırakılması
    
- İşletme detay sayfası ve işletmeye ait bilgilerin görüntülenmesi
    
- Firebase tabanlı veri saklama ve kimlik doğrulama
    

##  Kullanılan Teknolojiler

- **React** – Arayüz geliştirme
    
- **Firebase** – Kimlik doğrulama, Firestore veritabanı, Storage
    
- **React Router** – Sayfa yönlendirme
    
- **CSS / Tailwind (isteğe bağlı)** – Stil ve tasarım
    

## Gereksinimler

- Node.js (>=16)
    
- Firebase projesi ve yapılandırması
    
- npm veya yarn
    

Kurulum için:

```bash
git clone https://github.com/ibrahimhalilalpa/alpa-reservation.git
cd alpa-reservation
npm install
npm run dev
```

## ✅ Yapılanlar

- Genel yapıların oluşturulması
    
- Firebase bağlantısının tamamlanması
    
- İşletme ve randevu verilerinin eklenmesi
    
- İşletmelerin il, ilçe ve sektöre göre filtrelenebilir hale getirilmesi
    
- Kayıt ve giriş sisteminin eklenmesi ve stabil çalışması
    
- Randevu alma özelliği, dolu saatlerin pasife düşürülmesi
    
- İşletme detay sayfasının oluşturulması
    
- İşletme bilgilerinin detay sayfasında görüntülenmesi


## 🔜 Yapılacaklar (TODO)

- [x] Kullanıcı rolleri: **admin, işletme sahibi, normal kullanıcı** olarak ayrılacak
    
- [x] Admin paneli ile işletme ve kullanıcı yönetimi yapılabilecek
    
- [ ] İşletme sahipleri için randevu yönetim paneli eklenecek
    
- [ ]  Kullanıcıların kendi randevularını görüntüleyip iptal edebileceği profil sayfası eklenecek
    
- [ ] İşletmeler için fotoğraf yükleme ve güncelleme desteği eklenecek
    
- [ ]  Gelişmiş arama ve filtreleme (ör. çalışma saatine göre) yapılacak
    
- [x]  Mobil uyumluluk ve responsive tasarım iyileştirmeleri yapılacak
