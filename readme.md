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

### **Kompetensi yang Dipelajari:**

- Implementasi middleware autentikasi JWT.
- Penggunaan **bcrypt** untuk enkripsi password.
- Dokumentasi API menggunakan Swagger UI.
- Struktur kode modular dan validasi data pengguna.

### **Output:**

- API backend dengan autentikasi JWT dan dokumentasi Swagger.
- Middleware kustom untuk melindungi endpoint.
- Struktur proyek yang terorganisasi dan aman.

---

# Langkah Langkah

- npm init
- buat bin/www (untuk start project)
- set package.json (ngebaca bi/www)
  "start": "node -r dotenv/config bin/www",
  "dev": "nodemon -r dotenv/config bin/www",
  dan lainnya
- npm install dotenv nodemon morgan express
- buat server.js

1. import modul di server.js (expresss, morgan)
   const app dan module.export
2. buat health-check || server.js

## Database Diagram

3. middleware baca request body || server.js

- menggunakan db diagram
<p align="center">
  <img src="public/images/db-diagram.png" alt="alt text" width="500" />
</p>

### migrations

- buat relasi model di sequelize
- npm i sequelize sequelize-cli pg pg-hstore
- npx sequlize init
- npx sequelize model:generate --name Products --attributes name:string,images:array,stock:integer,price:integer
- npx sequelize model:generate --name Shops --attributes name:string,productId:integer,userId:integer
- settting validasi atau modifikasi data disetiap kolomnya yang mau masuk ke database || migrations
  noted boleh diubah2 isinya disesuaikan sebelum di migrate
- npm run db:migrate
- set config/config.json
- npx sequelize db:create (jika databasenya baru)
- npx sequelize db:migrate

  noted : buat konfigurasi mvp sesuai db diagram(model, view, and controller)

### models

- cek apakah udah sesuai dengan yang ada di miggrations
- tambahkan validate dan overide message

### Controllers

- buat productCotroller.js

4. buat function createProduct

### Routes

- index.js isinya redirek atau modul routesnya

5. buat API getnya (productRoutes.js)
6. defind di routes/index.js dan panggil router di server.js

## Better Error Handling

tambahkan di semua controller

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

## Relasi antar Table
