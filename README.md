# 📅 Aplikasi Booking Meeting Room

Aplikasi web sederhana untuk melakukan pemesanan ruang meeting, dibuat menggunakan **Laravel** (backend), **Vue.js** (frontend), dan **MySQL** (database). Aplikasi ini mendukung dua jenis pengguna: **User** dan **Admin**, dengan fitur autentikasi berbasis **JWT**.

---

## 🚀 Fitur

### 👤 User
- Registrasi dan login.
- Melihat daftar ruang meeting yang tersedia.
- Melakukan booking ruang berdasarkan tanggal dan waktu.
- Melihat riwayat booking mereka sendiri.
- Membatalkan booking mereka sendiri.

### 🛠️ Admin
- Melihat semua booking dari semua user.
- Membatalkan booking siapa pun.

### 🔐 Validasi
- Tidak bisa melakukan double booking (waktu dan ruang yang sama).
- Hanya admin yang dapat membatalkan semua booking, user hanya bisa membatalkan booking mereka sendiri.

---

## 🧱 Teknologi yang Digunakan

| Layer       | Teknologi                  |
|-------------|-----------------------------|
| Frontend    | Vue.js 3, Pinia, Vue Router |
| Backend     | Laravel 10, Laravel Sanctum |
| Database    | MySQL                       |
| Auth        | JWT Token                   |

---

## 🗄️ Struktur Tabel Database

### Users
- `id`
- `name`
- `email`
- `password`
- `role` (admin/user)

### Rooms
- `id`
- `name`
- `location`
- `capacity`

### Bookings
- `id`
- `user_id`
- `room_id`
- `date`
- `start_time`
- `end_time`
- `status` (booked/cancelled)

---

## ⚙️ Instalasi & Menjalankan

### Backend (Laravel)
```bash
cd booking-backend
composer install
cp .env.example .env
php artisan jwt:secret
copy secret ke .env
php artisan key:generate
php artisan migrate
php artisan serve


### Frontend (Vue JS)
```bash
cd booking-frontend
npm install
npm run dev