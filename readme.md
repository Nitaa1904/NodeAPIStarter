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

### models

- cek apakah udah sesuai dengan yang ada di miggrations
- tambahkan validate dan overide message

### Controllers

- index.js isinya refaktor agar modular
- buat productCotroller.js

4. buat function createProduct, getAllProduct, getProductById, updateProduct, deleteProduct

#### Better Error Handling

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

### Routes

- index.js isinya refaktor agar modular

5. buat API post, get, get by id, pactch, delete (productRoutes.js)
6. defind di routes/index.js dan panggil router di server.js

   noted : buat konfigurasi mvp lainya sesuai db diagram (model, view, and controller)
   tips untuk shop dan product hampir sama jadi tinggal dublicated dan ubah isinya sesuai tabel aja

### seeder

- npm i faker bcrypt | auth.js
  faker untuk membuat data dummy

### systemController

refactor health-check dan 404 not found (untuk hendel semua yang ada di sistem)

---

## Relasi

belongsTo (jika ditabel ada foreignKey)
hasMany
hasOne

## Set Variabel di Postman

buat base url

- di postman {{nama_url}} lalu hover dan isi valuenya dengan localhost:3000/API/v1
- untuk menyimpan klik + add to dan pilih collection

---

## Finalisasi config untuk server.js

7. panggil morgan
   morgan (untuk logger('dev')) adalah middleware Node.js dan Express yang digunakan untuk mencatat permintaan dan kesalahan HTTP
8. panggil dotenv di baris pertama run apk, menandakan semua koding BE untuk panggil env
9. panggil cors (agar API bisa dihit saat sudah dideploy, semua FE bisa akses api)
   npm i cors

## attributes di sequelize query

- misal hanya butuh "name", "images", "stock", "price" yang ditampilkan maka bisa menggunakan atribut
- atribut dalam bentuk array

10. panggil kolom apa aja yang akan ditampilkan di getAllShop | shopController

## where advance dari join table untuk filter, pagination dan limit/row

### Dinamis Filter

11. jaga request query agar tidak kemana-mana dengan objek destrukturing
12. cek kondisi statis dulu
13. import OP, salah satu method sequelize untuk where dinamis kondisi (untuk handel saat kondisi statis harus serch namanya sama persis dengan yang ada didatabase menjadi dinamis) misal serch apel (statis) akan muncul tapi saat serch ape tidak muncu datanya tapi saat dinamis akan muncul data yang ada kata ape nya

14. buat kondisi OP

- iLike `%${shopName}%` (tabahkan % untuk mengabaikan kata lainnya asalkan ada yang benar)
- bedanya sama like itu di case sensitive (iLike mengabaikan huruf besar kecil)

15. Panggil kondisinya
16. buat juga kondisi pada product dan user, panggil where sesuai kondisiya masing2 di include

- cara get di postmannya {{nama_url}}/shops?shopName=collin (ganti collin dengan nama toko yang dicari)

- saat user mau mencari product yang kurang dari 25 (misal)

17. tambah total data di respon untuk menampilkan banyaknya data berdasarkan hasil filternya

### Paginations

- page => halaman
- size => banyaknya data

#### size Statis Paginations

18. tambah limit: 10, = > set get berapa data di row query (batasan data)

#### size Dinamis Paginations

- tambahkan size di const request paramnya

19. buat size pagination
20. panggil pageSize
    get di postman {{nama_url}}/shops?size=13 (ganti size sesuai keinginan)

#### Page

- tambahkan page di const request paramnya

21. buat pageNum dengan default halaman 1

22. buat offset
23. tambah offset

24. buat totalCount (ambil semua data dari query)
25. buat totalPage (banyaknya halaman)
26. tambah pagination untuk kasih tau client informasi page brapa size berapa
27. paggil totalData dengan hasil totalCount, totalData: totalCount,
    - get di postman {{nama_url}}/shops?size=13 (ganti size sesuai keinginan)
    - akan tampil totalData, page, size, pageSize

- cek pagination di postman
- get di postman {{nama_url}}/shops?size=30&page=2 (ganti size dan page sesuai keinginan)

28. tambahkan kondisi product dan user agar hasil total datanya benar saat serch data tertentu dan banyaknya data sesuai dengan yang terfilter
    - get di postman {{nama_url}}/shops?size=1&page=1&productName=pizza (ganti size, page, productName sesuai keinginan)
    - akan tampil totalData dengan nama pizza 5 (contohnya sesuai data asli di query) dan yang tampil di FE cuman satu (size 1)
29. Tambahkan kondisi utuk shopName juga agar saat shopName difilter sesuai totalPage(semua data dengan nama tertentu) dan sesuai size yang di filter
    get di postman {{nama_url}}/shops?size=1&page=1&shopName=Group (ganti size, page, productName sesuai keinginan)

noted: di product menggunakan findAndCountAll secara bersamaan

## API Documentation

- npm i swagger
- npm i swagger-is-express
- buat routes baru documentationRoute.js

30. buat url swagger yang mengarah ke documentationRoute.js | server.js
31. buat route baru docsRouter | server.js
32. buat swaggerDocument dalam bentuk swagger.json | documentationRoute.js
33. buat url use dan get swagger | documentationRoute.js

buat docs/swagger.json
isinya dibuat (contoh membuat dummy menggunakan ai hanya untuk tugas)

- GET
  get api shop
  copy responnya, copy url atau api
  tulis perintah create swagger.json for node js express project fot this API
  tambah ke swagger.jsnya
  sesuaikan schemanya dengan database
  localhost:3000/api-docs/ (coba di browser)
- POST
  post api shop
  copy url, request body, respon api
  tulis perintah for create http method POST
  sesuaikan responya dengan yang ada di localhost

tambahkan juga yang failed
copy respon api gagal
tulis perintah add new example respon failed API for post
