### **Judul Proyek:**

**Backend API dengan Middleware Autentikasi dan Dokumentasi Swagger**

### **Deskripsi Proyek:**

Proyek ini adalah backend aplikasi berbasis **Node.js** dan **Express.js** yang fokus pada **middleware autentikasi** menggunakan **JWT**, manajemen pengguna, dan integrasi dokumentasi API menggunakan **Swagger**. Fitur utama meliputi registrasi, login, validasi token, dan sistem health check, dengan struktur kode modular dan error handling yang terorganisasi.

### **Fitur Utama:**

1. **Autentikasi JWT:** Registrasi, login, validasi token.
2. **Dokumentasi API:** Menggunakan Swagger UI.
3. **Manajemen Pengguna:** CRUD pengguna dengan keamanan data terenkripsi.
4. **Error Handling Terstruktur:** Penanganan berbagai skenario kesalahan.
5. **Health Check Endpoint:** Memastikan aplikasi berjalan dengan baik.

---

# Langkah-Langkah

- `npm init`
- Buat `bin/www` (untuk start project)
- Set `package.json` agar membaca `bin/www`:
  ```json
  "start": "node -r dotenv/config bin/www",
  "dev": "nodemon -r dotenv/config bin/www"
  ```
  dan lainnya.
- `npm install dotenv nodemon morgan express`
- Buat `server.js`

### 1. Import Modul di `server.js`

- Gunakan `express` dan `morgan`.
- Definisikan `const app` dan `module.exports`.

### 2. Buat Health-Check di `server.js`

## Database Diagram

### 3. Middleware untuk Membaca Request Body di `server.js`

- Menggunakan DB Diagram:
  <p align="center">
    <img src="public/images/db-diagram.png" alt="Database Diagram" width="500" />
  </p>

## Migrations

- Buat relasi model di Sequelize.
- Instal dependensi:
  ```sh
  npm install sequelize sequelize-cli pg pg-hstore
  ```
- Inisialisasi Sequelize:
  ```sh
  npx sequelize init
  ```
- Buat model dan migration:
  ```sh
  npx sequelize model:generate --name Products --attributes name:string,images:array,stock:integer,price:integer
  npx sequelize model:generate --name Shops --attributes name:string,productId:integer,userId:integer
  ```
- Setting validasi atau modifikasi data di setiap kolom sebelum migrate.
- Jalankan migrasi:
  ```sh
  npm run db:migrate
  ```
- Set konfigurasi di `config/config.json`.
- Buat database jika belum ada:
  ```sh
  npx sequelize db:create
  ```
- Jalankan migrasi:
  ```sh
  npx sequelize db:migrate
  ```

## Models

- Cek apakah model sudah sesuai dengan migration.
- Tambahkan validasi dan override message.

## Controllers

- Buat `index.js` untuk refaktor agar modular.
- Buat `productController.js`.

### 4. Buat Fungsi CRUD

- `createProduct`
- `getAllProduct`
- `getProductById`
- `updateProduct`
- `deleteProduct`

### Better Error Handling

Tambahkan di semua controller:

```javascript
catch (error) {
    console.log(error.name);

    // Handle Sequelize validation errors
    if (error.name === "SequelizeValidationError") {
        const errorMessage = error.errors.map((err) => err.message);
        return res.status(400).json({
            status: "Failed",
            message: errorMessage[0],
            isSuccess: false,
            data: null,
        });
    }

    // Handle Sequelize database errors
    else if (error.name === "SequelizeDatabaseError") {
        return res.status(400).json({
            status: "Failed",
            message: error.message || "Database error",
            isSuccess: false,
            data: null,
        });
    }

    // Handle other unexpected errors
    else {
        return res.status(500).json({
            status: "Failed",
            message: "An unexpected error occurred",
            isSuccess: false,
            data: null,
        });
    }
}
```

## Routes

- `index.js` untuk refaktor agar modular.

### 5. Buat API Routes (`productRoutes.js`)

- **POST**: Menambahkan produk.
- **GET**: Mengambil semua produk.
- **GET by ID**: Mengambil produk berdasarkan ID.
- **PATCH**: Memperbarui produk.
- **DELETE**: Menghapus produk.
- Definisikan di `routes/index.js` dan panggil router di `server.js`.

_Noted_: Buat konfigurasi MVP lainnya sesuai dengan DB Diagram (Model, View, Controller).
_Tips_: Struktur untuk Shop dan Product hampir sama, cukup duplikasi dan sesuaikan isinya.

## Seeder

- Instal dependensi untuk membuat data dummy:
  ```sh
  npm install faker bcrypt
  ```
- Buat file `auth.js` untuk autentikasi.

## SystemController

- Refaktor health-check dan handling **404 Not Found** untuk menangani semua error di sistem.

## Relasi

- `belongsTo` (digunakan jika tabel memiliki foreignKey)
- `hasMany`
- `hasOne`

## Set Variabel di Postman

Buat base URL:

1. Di Postman, gunakan `{{nama_url}}`, lalu hover dan isi valuenya dengan `localhost:3000/API/v1`.
2. Untuk menyimpan, klik `+ Add to` dan pilih `Collection`.

---

## Finalisasi Konfigurasi untuk `server.js`

7. Panggil `morgan`:
   - `morgan` (untuk `logger('dev')`) adalah middleware Node.js dan Express yang digunakan untuk mencatat permintaan dan kesalahan HTTP.
8. Panggil `dotenv` di baris pertama saat menjalankan aplikasi, menandakan bahwa semua kode backend dapat memanggil variabel dari file `.env`.
9. Panggil `cors` agar API dapat diakses saat sudah dideploy, memungkinkan semua frontend untuk mengakses API.
   - Install dengan perintah: `npm i cors`

## Attributes di Sequelize Query

- Jika hanya membutuhkan beberapa kolom tertentu seperti `name`, `images`, `stock`, dan `price`, maka dapat menggunakan atribut.
- Atribut dituliskan dalam bentuk array.

10. Panggil kolom apa saja yang akan ditampilkan di `getAllShop` dalam `shopController`.

## Where Advance dari Join Table untuk Filter, Pagination, dan Limit/Row

### Dinamis Filter

11. Jaga request query agar tidak meluas dengan objek destructuring.
12. Cek kondisi statis terlebih dahulu.
13. Import `Op`, salah satu metode Sequelize untuk `where` dinamis (memungkinkan pencarian lebih fleksibel).

    - Contoh: Jika pencarian statis hanya menampilkan data yang cocok persis (`apel`), pencarian dinamis akan menampilkan data yang mengandung kata `ape`.

14. Buat kondisi `Op`:

    - Menggunakan `iLike '%${shopName}%'` (tambahkan `%` agar tetap menampilkan hasil yang mengandung kata yang dicari).
    - `iLike` berbeda dengan `LIKE`, karena tidak case-sensitive (mengabaikan huruf besar/kecil).

15. Panggil kondisi `where` yang telah dibuat.
16. Buat juga kondisi pada `product` dan `user`, lalu panggil `where` sesuai kondisinya masing-masing dalam `include`.

    - Cara menggunakannya di Postman: `{{nama_url}}/shops?shopName=collin` (ganti `collin` dengan nama toko yang dicari).
    - Jika ingin mencari produk dengan stok kurang dari 25: `{{nama_url}}/shops?stock<25`

17. Tambahkan total data di respons untuk menampilkan jumlah hasil yang difilter.

### Pagination

- `page` → halaman
- `size` → jumlah data per halaman

#### Size Statis Pagination

18. Tambahkan `limit: 10` untuk membatasi jumlah data yang ditampilkan per query.

#### Size Dinamis Pagination

- Tambahkan `size` dalam `const` request param.

19. Buat size pagination.
20. Panggil `pageSize`.
    - Contoh penggunaan di Postman: `{{nama_url}}/shops?size=13` (ganti `size` sesuai kebutuhan).

#### Page

- Tambahkan `page` dalam `const` request param.

21. Buat `pageNum` dengan default halaman `1`.
22. Buat `offset`.
23. Tambahkan `offset` ke dalam query.

24. Buat `totalCount` (mengambil semua data dari query).
25. Buat `totalPage` (menghitung jumlah halaman berdasarkan total data).
26. Tambahkan informasi pagination dalam respons untuk memberi tahu client mengenai halaman dan ukuran data yang ditampilkan.

    - Contoh penggunaan di Postman: `{{nama_url}}/shops?size=13`
    - Akan menampilkan `totalData`, `page`, `size`, dan `pageSize`.

27. Cek pagination di Postman:

    - `{{nama_url}}/shops?size=30&page=2` (ganti `size` dan `page` sesuai kebutuhan).

28. Tambahkan kondisi pada `product` dan `user` agar hasil `totalData` sesuai dengan pencarian yang difilter.

    - Contoh di Postman: `{{nama_url}}/shops?size=1&page=1&productName=pizza`
    - Jika terdapat 5 produk `pizza`, maka `totalData = 5`, tetapi yang ditampilkan hanya `size = 1`.

29. Tambahkan kondisi untuk `shopName`, agar saat filter dilakukan, total halaman dan data sesuai dengan hasil pencarian.
    - Contoh di Postman: `{{nama_url}}/shops?size=1&page=1&shopName=Group`

**Catatan:** Pada `product`, gunakan `findAndCountAll` secara bersamaan untuk mendapatkan total data sekaligus.

## API Documentation

### Instalasi Swagger

1. Jalankan perintah berikut untuk menginstal Swagger:
   ```sh
   npm i swagger
   npm i swagger-ui-express
   ```
2. Buat file `documentationRoute.js`.

### Konfigurasi Swagger

3. Tambahkan URL Swagger yang mengarah ke `documentationRoute.js` di `server.js`.
4. Buat route baru `docsRouter` di `server.js`.
5. Buat `swaggerDocument` dalam bentuk `swagger.json` di `documentationRoute.js`.
6. Tambahkan endpoint `use` dan `get` untuk Swagger di `documentationRoute.js`.

### Pembuatan `swagger.json`

7. Buat file `docs/swagger.json` dan tambahkan skema berikut sebagai contoh:
   - **GET**
     - Endpoint: `GET /api/shop`
     - Salin respons dari API dan URL terkait.
     - Gunakan perintah untuk membuat `swagger.json` untuk proyek Node.js Express ini.
     - Sesuaikan skema dengan database.
     - Coba akses di browser: `http://localhost:3000/api-docs/`.
   - **POST**
     - Endpoint: `POST /api/shop`
     - Salin URL, request body, dan respons API.
     - Gunakan perintah untuk membuat HTTP method POST.
     - Sesuaikan respons dengan API di `localhost`.
   - **Error Handling**
     - Salin respons API gagal.
     - Tambahkan contoh respons gagal di `swagger.json`.

---

## JWT Authentication

### Implementasi Middleware

1. Buat folder `middleware/` dan file `authenticate.js`.
2. Tambahkan middleware `authenticate` di **GET** | `productRouter.js`.
3. Buat module function `authenticate` di `authenticate.js`.

### Request Header Authorization

- Pastikan request header authorization dikirim dengan format yang benar.
- Kirim request dan cek log di terminal untuk memastikan middleware berfungsi.

### Instalasi JWT

1. Instal package JSON Web Token:
   ```sh
   npm i jsonwebtoken
   ```
2. Generate token saat user berhasil login.

### Validasi JWT

1. Tambahkan validasi jika tidak ada request token (token kosong) di `authenticate.js`.
2. Tambahkan validasi jika token ada tetapi salah di `authenticate.js`.
3. Edit `authController` agar login menggunakan email dan password dengan JWT.
4. Cari data user berdasarkan email.
5. Validasi user jika tidak ditemukan.

### Mengambil Data User untuk Login

1. Buka **pgAdmin**.
2. Navigasi ke `schema/Tables/auth` lalu klik kanan `View All Rows`.

### Implementasi Login

1. Jika route login belum ada, buat route login.
2. Pastikan validasi user:
   - Jika user ditemukan dan password benar.
3. Gunakan **bcrypt** untuk hash password.
4. Generate token menggunakan **JWT**.
5. Simpan token di **.env**.
6. Tentukan waktu expire untuk token di **JWT**.
7. Kirim token dalam respons **200**.
8. Validasi token dari client ke API di `authenticate.js`.
9. Uji coba menggunakan **Postman**.

### Implementasi Middleware di Create Shop

1. Tambahkan middleware `authenticate` di POST | `shopRouter.js`.
2. Panggil `user.id` dari middleware di `shopController.js`.

### Contoh Penggunaan API

- **GET** `{{nama_url}}/products/1`
