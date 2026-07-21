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

CMS ini butuh **Netlify** untuk mengurus login & penyimpanan (gratis, dan
kode kamu tetap di GitHub seperti biasa — Netlify cuma "menyambungkan").

1. **Upload semua file** di folder ini ke repository GitHub kamu (termasuk
   folder `content/` dan `admin/`).
2. Buka **netlify.com** → daftar/login pakai akun GitHub kamu (gratis).
3. Klik **Add new site → Import an existing project** → pilih repo GitHub
   kamu. Biarkan pengaturan default, klik **Deploy**.
   - Setelah ini, website kamu bisa diakses lewat domain dari Netlify
     (misal `nama-acak.netlify.app`, bisa diganti nama di Site settings).
4. Di dashboard Netlify, buka menu **Identity** → klik **Enable Identity**.
5. Di **Identity → Settings → Registration**, ubah ke **Invite only**
   (supaya cuma kamu yang bisa daftar akun admin).
6. Masih di menu Identity, klik **Invite users** → masukkan email kamu
   sendiri → cek inbox email → klik link undangan → buat password.
7. Buka menu **Identity → Services**, aktifkan **Git Gateway** (biar
   Identity terhubung ke repo GitHub kamu).
8. Buka `admin/config.yml`, ganti baris `site_url` dengan alamat website
   Netlify kamu (boleh dihapus juga kalau bingung, tidak wajib).

## Cara pakai CMS setelah setup

1. Buka `https://[nama-website-kamu].netlify.app/admin/`
2. Login pakai email & password yang tadi kamu buat.
3. Edit bagian yang kamu mau (Hero, Tentang, CV, Keahlian, Portfolio, Blog,
   Kontak) — semua lewat form, tinggal isi/upload gambar.
4. Klik **Publish** — perubahan otomatis ter-*commit* ke GitHub dan
   website ter-update dalam beberapa menit.

## Menambah karya editing foto lewat CMS

Buka `/admin` → bagian **Portfolio (Galeri Editing Foto)** → klik
**Add Portfolio** → upload gambar & isi judul karya → **Publish**.
Tidak perlu edit HTML sama sekali.

## Kalau mau tetap pakai GitHub Pages (tanpa Netlify)

Bisa, tapi CMS-nya (`/admin`) tidak akan berfungsi tanpa Netlify Identity —
kamu tetap harus edit `content/data.json` manual lewat GitHub kalau begitu.
Jadi kalau mau fitur login beneran, ikuti langkah Netlify di atas.

## Cara coba di komputer sendiri

Karena sekarang website mengambil data lewat `fetch()`, tidak bisa dibuka
langsung dengan double-click file. Jalankan server lokal dulu, misal pakai
extension **Live Server** di VS Code, lalu buka `index.html` dari situ.

