# ⚡ Website Biodata Pribadi & Portofolio Digital - Muhammad Firdaus

Website profil pribadi modern, futuristik, interaktif, dan sepenuhnya responsif yang dirancang khusus untuk **Muhammad Firdaus (Danz / Zarr / Ditz)** — Pelajar SMK Muhammadiyah 1 Palembang Jurusan TJKT, Pelatih Tim Esport, Calon Triliuner, dan Web Developer.

---

## 🌟 Fitur-Fitur Unggulan Website

1. **Desain Modern & Futuristik (Cyber Neon Purple)**
   - Perpaduan palet warna ungu tua (*deep violet*), hitam obsidian, neon purple (`#a855f7`), cyan elektrik (`#38bdf8`), dan emas mewah (`#f59e0b`).
   - Efek *glassmorphism* tembus pandang dengan blur dinamis.
   - Efek latar belakang bintang/konstelasi partikel interaktif (`HTML5 Canvas`) yang merespons pergerakan kursor mouse.
   - Efek pendaran neon (*glow pulse*) dan sudut sirkuit cyber.

2. **Loading Screen Futuristik (Preloader)**
   - Animasi terminal bootloader dengan logo heksagon cyberpunk, penghitung persentase (0% - 100%), dan log konsol status inisialisasi sistem.

3. **Jam Digital Realtime (WIB)**
   - Jam digital aktif yang menampilkan Hari, Tanggal, Bulan, Tahun, dan Detik (WIB) yang terus diperbarui setiap 1 detik.

4. **Musik Latar Prosedural (Web Audio API Synthesizer)**
   - Fitur musik latar ambient synthwave / lo-fi yang dibuat langsung melalui kode audio sintetis peramban (Web Audio API).
   - **Keunggulan:** Tidak memerlukan file MP3 eksternal yang rawan error atau terblokir CORS, 100% berjalan *offline*, dilengkapi animasi batang equalizer interaktif serta tombol ON/OFF.

5. **Holographic Cyber Pass ID Card**
   - Kartu identitas virtual dengan foto profil, barcode digital, scanline laser vertikal bergerak, dan tombol cepat salin ringkasan biodata & tombol cetak/PDF.

6. **Ketik Dinamis Otomatis (Typewriter Effect)**
   - Animasi teks berjalan di bagian Hero yang bergantian menampilkan nama samaran dan julukan: `DANZ`, `ZARR`, `DITZ`, `SISWA JURUSAN TJKT`, `PELATIH TIM ESPORT`, `CALON TRILIUNER 🚀`, `WEB DEVELOPER MUDA`.

7. **Timeline Riwayat Pendidikan Interaktif**
   - Garis waktu vertikal dengan simpul bercahaya menghubungkan jenjang SD (SD N 133 Palembang), SMP (SMP N 40 Palembang), hingga SMK (SMK Muhammadiyah 1 Palembang - Jurusan TJKT).

8. **Galeri Dokumentasi Foto + Lightbox Modal**
   - Filter kategori foto (Semua, Pribadi, Sekolah TJKT, Kegiatan & Lari, Tim & Esport).
   - Fitur Lightbox popup untuk memperbesar gambar saat diklik dengan dukungan navigasi gambar Selanjutnya (Next), Sebelumnya (Prev), serta tombol keyboard Panah & Esc.

9. **Indikator Kemampuan dengan Progress Bar Beranimasi**
   - Indikator persentase keahlian teknis (HTML5, CSS3, JavaScript, Networking TJKT, Video Editing) dan soft skills (Leadership, Teamwork, Communication, Problem Solving, Mentoring).
   - Progress bar otomatis terisi secara dinamis saat digeser (*scrolled*) ke dalam pandangan layar.

10. **Dashboard Admin Terintegrasi (Bisa Edit Biodata Langsung!)**
    - Dilengkapi verifikasi PIN keamanan (Default PIN: `1234`).
    - Memungkinkan Anda mengubah nama, panggilan, nama samaran, tempat tanggal lahir, alamat, cita-cita, game, foto profil, dan tautan media sosial secara instan melalui antarmuka web.
    - Data otomatis tersimpan di peramban web Anda via `LocalStorage` (tidak akan hilang saat halaman di-*refresh*).
    - Dilengkapi fitur **Ekspor Data JSON**, **Impor Data JSON**, dan **Reset ke Biodata Asli**.

11. **Hubungkan Media Sosial & Integrasi Chat WhatsApp Langsung**
    - Kartu tautan media sosial: Instagram, WhatsApp, TikTok, Facebook, dan YouTube.
    - Formulir kontak dengan tombol otomatis membuka percakapan WhatsApp yang telah memformat teks pesan, nama, dan topik secara instan.

12. **Mode Tema (Dark Cyber / Light Mode)**
    - Tombol penggantian tema tampilan di pojok kanan atas sistem bar.

---

## 📁 Struktur Berkas Proyek

```plaintext
biodata-firdaus/
│
├── index.html        # Struktur semantik utama dokumen HTML5
├── style.css         # Desain tampilan CSS3, animasi, dan responsivitas
├── script.js         # Logika JavaScript, LocalStorage, jam, musik, & dashboard admin
└── README.md         # Dokumentasi panduan lengkap penggunaan
```

---

## 🚀 Cara Menjalankan Website

### Cara 1: Buka Langsung di Peramban Web (Paling Mudah)
1. Buka folder proyek:
   `C:\Users\mf735\.gemini\antigravity\scratch\biodata-firdaus\`
2. Klik ganda (*double click*) berkas `index.html`.
3. Website akan langsung terbuka dan berjalan sempurna di Google Chrome, Microsoft Edge, Firefox, atau peramban favorit Anda!

### Cara 2: Menjalankan dengan Live Server (VS Code / Extension)
1. Buka folder `biodata-firdaus` di Visual Studio Code.
2. Klik kanan pada `index.html` lalu pilih **"Open with Live Server"**.
3. Website akan berjalan di alamat `http://127.0.0.1:5500`.

---

## 🛠️ Panduan Kustomisasi & Mengganti Data

Anda memiliki 2 cara mudah untuk mengganti nama, foto, atau informasi apapun:

### Cara A: Melalui Dashboard Admin di Tampilan Website (Tanpa Koding)
1. Buka website di browser.
2. Klik tombol **"ADMIN"** di bilah atas kanan atau tombol **"Edit Biodata"** yang melayang di pojok kanan bawah.
3. Masukkan PIN keamanan: **`1234`** (PIN default) lalu tekan **"Buka Akses"**.
4. Akan muncul panel pengaturan tab:
   - **Tab Identitas & Bio:** Ganti Nama Lengkap, Panggilan, Nickname, TTL, Agama, Alamat, Hobi, Cita-cita, Motto, dan Kalimat Perkenalan.
   - **Tab Media Sosial:** Ganti username dan URL tautan Instagram, WhatsApp, TikTok, Facebook, dan YouTube Anda.
   - **Tab Foto Profil:** Tempelkan link URL foto baru Anda, pilih avatar preset, atau unggah langsung foto dari laptop/HP Anda melalui tombol *Upload Foto*.
   - **Tab Backup & Reset:** Ubah PIN keamanan Anda, unduh cadangan file JSON, atau kembalikan ke setelan awal (*Reset*).
5. Klik **"Simpan Seluruh Perubahan"**. Tampilan website akan langsung terbarui seketika!

---

### Cara B: Mengedit Berkas Kode Sumber Secara Manual

#### 1. Mengganti Nama, Biodata, dan Motto di `index.html`
Buka berkas `index.html` di text editor (seperti Notepad atau VS Code):
- **Nama & Julukan:** Cari tag ber-id `display-hero-name` atau teks `MUHAMMAD FIRDAUS` pada baris sekitar 130 - 240.
- **Tabel Biodata:** Cari bagian `<div class="spec-table-grid">` pada baris sekitar 240 - 320 untuk menyesuaikan data teks.
- **Motto Hidup:** Cari teks `"Jangan berhenti ketika lelah. Berhentilah ketika selesai."`.

#### 2. Mengganti Riwayat Pendidikan
Buka berkas `index.html` dan cari bagian `<section class="section education-section" id="pendidikan">`:
- Cari judul sekolah: `SD N 133 PALEMBANG`, `SMP N 40 PALEMBANG`, dan `SMK MUHAMMADIYAH 1 PALEMBANG`.
- Anda dapat mengubah teks tahun, deskripsi kegiatan, maupun jurusan sesuai kebutuhan.

#### 3. Mengganti Foto Profil & Galeri
- **Foto Profil Utama:** Buka `index.html`, cari tag `<img>` ber-id `display-hero-avatar` dan `display-card-avatar`. Ganti atribut `src="..."` dengan path foto Anda sendiri (misalnya: `img/foto-saya.jpg` atau link URL online).
- **Foto Galeri:** Cari `<div class="gallery-grid" id="gallery-grid">` pada baris sekitar 600 - 700. Ganti tautan pada tag `<img class="gal-img" src="...">` serta judul keterangan foto pada `<h4 class="gal-title">`.

#### 4. Mengganti Tautan Media Sosial Default di `script.js`
Buka berkas `script.js` pada baris ke-10 di bagian objek `DEFAULT_BIODATA`:
```javascript
sosmed: {
  igHandle: "@muhammad.firdaus",
  igUrl: "https://instagram.com/username_kamu",
  waHandle: "+62 812-3456-7890",
  waNumber: "6281234567890", // Masukkan nomor WA diawali kode negara 62
  ttHandle: "@daus.zarr",
  ttUrl: "https://tiktok.com/@username_kamu",
  fbHandle: "Muhammad Firdaus",
  fbUrl: "https://facebook.com/username_kamu",
  ytHandle: "Danz Esport Official",
  ytUrl: "https://youtube.com/@channel_kamu"
}
```

#### 5. Menyesuaikan Persentase Keahlian (Skills)
Buka `index.html` pada bagian `<section class="section skills-section" id="keahlian">`:
- Ubah atribut `data-value="95"` dan `data-target="95"` pada masing-masing item keahlian sesuai tingkat penguasaan yang diinginkan (skala 0 - 100).

---

## 🌐 Cara Mengunggah (Deploy) ke Internet secara Gratis

Agar website biodata ini dapat diakses oleh semua orang di internet (teman, guru, rekan tim esport):

### Menggunakan GitHub Pages:
1. Buat repositori baru di [GitHub](https://github.com) dengan nama misalnya: `biodata-firdaus`.
2. Unggah ketiga berkas (`index.html`, `style.css`, `script.js`).
3. Masuk ke menu **Settings** > **Pages** di repositori GitHub Anda.
4. Pada bagian *Branch*, pilih **main** atau **master**, lalu klik **Save**.
5. Dalam beberapa detik, website Anda akan aktif di alamat: `https://username-kamu.github.io/biodata-firdaus/`.

### Menggunakan Netlify / Vercel:
1. Buka [Netlify](https://www.netlify.com/) atau [Vercel](https://vercel.com/).
2. Tarik dan lepas (*drag & drop*) folder `biodata-firdaus` ke halaman dashboard Netlify Drop.
3. Website akan langsung aktif dalam hitungan detik dengan domain gratis!

---

## 🏆 Keterangan Pengembang
- **Profil Pemilik:** Muhammad Firdaus (Danz, Zarr, Ditz)
- **Jurusan:** TJKT (Teknik Jaringan Komputer dan Telekomunikasi)
- **Sekolah:** SMK Muhammadiyah 1 Palembang
- **Lisensi:** Open Source & Personal Portfolio
