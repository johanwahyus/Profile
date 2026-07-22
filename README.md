# Website Pribadi — Johan Wahyu Saputro

Website ini dibuat pakai HTML, CSS, dan JavaScript murni, plus **CMS gratis
(Decap CMS)** supaya kamu bisa edit konten lewat halaman login online — tanpa
harus buka/edit file HTML sama sekali.

## Struktur file

```
├── index.html          -> kerangka halaman (jarang perlu diubah lagi)
├── style.css            -> semua tampilan (warna, font, layout)
├── script.js             -> ambil data dari content/data.json & tampilkan ke halaman
├── content/
│   └── data.json         -> SEMUA ISI WEBSITE ada di sini (ini yang diedit CMS)
├── admin/
│   ├── index.html         -> halaman CMS (tempat kamu login)
│   └── config.yml          -> pengaturan field CMS
└── README.md
```

**Cara kerjanya:** `script.js` otomatis membaca `content/data.json` lalu
menampilkannya ke halaman. Jadi kalau `data.json` berubah, tampilan website
ikut berubah — tanpa sentuh HTML. Nah, CMS di `/admin` itu fungsinya jadi
"formulir" untuk mengedit `data.json` itu lewat browser, dengan login.

## Setup supaya CMS-nya bisa dipakai (sekali saja di awal)

> Catatan: Netlify baru saja menghentikan fitur "Identity" yang biasa dipakai
> untuk login CMS. Sebagai gantinya, kita pakai **DecapBridge** — layanan
> gratis yang dibuat khusus untuk kasus ini, dan setupnya malah lebih simpel
> (tidak perlu bikin GitHub OAuth App sendiri).

1. **Pastikan semua file** (termasuk folder `content/` dan `admin/`) sudah
   ter-upload ke repo GitHub kamu, dan website sudah tayang di Netlify.
2. Buka **decapbridge.com** → daftar/login (bisa pakai akun GitHub).
3. Klik **Create a Site** (atau tombol serupa untuk menambah situs baru).
4. Isi informasi yang diminta:
   - **Repository**: pilih repo GitHub kamu (`johanwahyus/Profile`)
   - **Admin URL**: alamat website Netlify kamu + `/admin`, misal
     `https://johanwahyus.netlify.app/admin`
5. Setelah situs dibuat, DecapBridge akan kasih kamu potongan konfigurasi
   berisi `identity_url` dan `gateway_url` yang unik untuk situsmu.
6. Buka file `admin/config.yml` di repo kamu (lewat VS Code), lalu ganti
   baris `identity_url` dengan yang diberikan DecapBridge (baris `repo` dan
   `gateway_url` biasanya sudah cocok, tapi cek lagi biar sama persis).
7. **Commit** dan **Sync Changes** perubahan itu lewat VS Code seperti
   biasa, supaya ter-upload ke GitHub dan Netlify otomatis build ulang.
8. Di dashboard DecapBridge, cari menu **Invite users** / **Collaborators**
   → masukkan email kamu sendiri → cek inbox → ikuti link untuk membuat
   password login.

## Cara pakai CMS setelah setup

1. Buka `https://[nama-website-kamu].netlify.app/admin/`
2. Login pakai email & password dari DecapBridge tadi.
3. Edit bagian yang kamu mau (Hero, Tentang, CV, Keahlian, Portfolio, Blog,
   Kontak) — semua lewat form, tinggal isi/upload gambar.
4. Klik **Publish** — perubahan otomatis ter-*commit* ke GitHub dan
   website ter-update dalam beberapa menit.

## Menambah karya editing foto lewat CMS

Buka `/admin` → bagian **Portfolio (Galeri Editing Foto)** → klik
**Add Portfolio** → upload gambar & isi judul karya → **Publish**.
Tidak perlu edit HTML sama sekali.

## Kalau mau tetap pakai GitHub Pages (tanpa Netlify)

Bisa, tapi CMS-nya (`/admin`) tetap butuh DecapBridge untuk urusan login,
jadi Netlify tetap dibutuhkan hanya untuk **hosting website-nya** saja
(gratis). Kalau nggak mau pakai CMS sama sekali, kamu tetap bisa edit
`content/data.json` manual lewat GitHub kapan saja.

## Cara coba di komputer sendiri

Karena sekarang website mengambil data lewat `fetch()`, tidak bisa dibuka
langsung dengan double-click file. Jalankan server lokal dulu, misal pakai
extension **Live Server** di VS Code, lalu buka `index.html` dari situ.


## Fitur tambahan yang baru ditambahkan

- **Favicon** — ikon "JW" kecil di tab browser, filenya `favicon.ico` dan
  folder `assets/favicon-*.png`. Upload semua file itu ke repo GitHub kamu
  (di posisi yang sama seperti struktur folder ini, sejajar dengan `index.html`).
- **Preview saat link di-share** (ke WhatsApp/Instagram/dll) — pakai gambar
  `assets/og-image.jpg`. Upload juga file ini ke repo.
- **Testimoni** — section baru, sudah bisa diedit lewat `/admin` (cari
  bagian "Testimoni"). Tambahkan testimoni asli dari rekan kerja/atasan
  kapan saja lewat CMS, tanpa perlu edit kode.

## Yang masih perlu kamu lengkapi sendiri

- **Isi blog** — section blog masih placeholder. Kalau sudah siap nulis
  cerita, tinggal edit lewat `/admin` bagian Blog, atau kasih tau aku
  tulisannya, nanti aku bantu masukin.
- **Google Analytics** (opsional) — kalau mau tau statistik pengunjung
  website, buat akun gratis di analytics.google.com, ambil kode "Tracking
  ID"-nya (formatnya `G-XXXXXXX`), lalu kasih ke aku atau tempel sendiri
  potongan kode dari Google Analytics ke bagian `<head>` di `index.html`.
