<p align="center">
  <img src="public/LOGORN.png" alt="Resep Nusantara Logo" width="150"/>
</p>

<h1 align="center">
  Resep Nusantara (PWA) - Modul 5
</h1>

<p align="center">
  Proyek Progressive Web App (PWA) untuk Praktikum Pemrograman Perangkat Bergerak (PPB)
  <br />
  <strong>Teknik Komputer, Universitas Diponegoro - Kelompok 4 Shift 1</strong>
</p>

---

## 🚀 Live Demo (Deploy Vercel)

Aplikasi ini telah di-deploy menggunakan Vercel dan dapat diakses secara publik melalui tautan di bawah ini:

**➡️ [https://modul5-ppb-kel4.vercel.app/](https://modul5-ppb-kel4.vercel.app/)**

---

## 👥 Anggota Kelompok 4 (Shift 1)

Proyek ini disusun oleh:

* **Muhammad Riza Saputra** (21120123140117)
* **Ryan Sukma Purwojanarko** (21120123130100)
* **Ian Widi Antaressa** (21120123140137)
* **Muhammad Ilham** (21120123120003)

---

## 📖 Deskripsi Proyek

**Resep Nusantara** adalah sebuah *Progressive Web App* (PWA) yang berfungsi sebagai katalog resep masakan dan minuman khas Indonesia. Aplikasi ini dibangun menggunakan React (Vite) dan terhubung ke RESTful API eksternal untuk mengelola data resep.

Proyek ini mengimplementasikan fungsionalitas **CRUD** (Create, Read, Update, Delete) penuh, *state management* dengan React Hooks, dan *data persistence* menggunakan `localStorage` untuk fitur seperti *draft* dan profil pengguna.

## ✨ Fitur Utama

* **Koneksi API (CRUD):** Terhubung ke API eksternal (`modlima.fuadfakhruz.id`) untuk mengambil (*Read*), membuat (*Create*), mengedit (*Update*), dan menghapus (*Delete*) data resep.
* **PWA (Progressive Web App):** Dapat diinstal pada perangkat *mobile* atau *desktop* dan memiliki *service worker* untuk fungsionalitas dasar *offline*.
* **Filtering & Pagination:** Memfilter resep berdasarkan nama, kesulitan, dan waktu, serta menggunakan *pagination* sisi *server*.
* **Upload Gambar:** Fungsionalitas untuk mengunggah gambar resep ke *server* saat membuat resep baru.
* **State Management (Hooks):** Menggunakan *custom hooks* (cth: `useRecipes`, `useReviews`) untuk mengelola *state* API (loading, error, data).
* **Penyimpanan Lokal:** Menggunakan `localStorage` untuk fitur *draft* resep dan kustomisasi profil kelompok.
* **Desain Responsif:** Tampilan yang adaptif untuk *mobile* dan *desktop* menggunakan Tailwind CSS.

## 🛠️ Teknologi yang Digunakan

* **React 19** (Menggunakan Vite)
* **Vite** sebagai *build tool*
* **Tailwind CSS** untuk *styling*
* **Axios** untuk *fetching* RESTful API
* **Vite PWA Plugin** untuk generasi *service worker* & manifest
* **Lucide React** untuk ikon
* **Vercel** untuk *deployment*

## 📦 Instalasi & Menjalankan Lokal

1.  *Clone* repository ini:
    ```bash
    git clone https://github.com/rizasaputra29/modul5-ppb.git
    cd modul5-ppb
    ```
2.  Install semua *dependencies*:
    ```bash
    npm install
    ```
3.  Buat file `.env` di *root* proyek dan isi dengan URL API:
    ```
    VITE_API_BASE_URL=[https://modlima.fuadfakhruz.id](https://modlima.fuadfakhruz.id)
    ```
4.  Jalankan *development server*:
    ```bash
    npm run dev
    ```
5.  Buka [http://localhost:5173](http://localhost:5173) di browser.