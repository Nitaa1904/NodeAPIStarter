# Langkah Langkah

- npm init
- buat bin/www (untuk start project)
- set package.json (ngebaca bi/www)
  "start": "node -r dotenv/config bin/www",
  "dev": "nodemon -r dotenv/config bin/www",
- npm install dotenv nodemon morgan express
- buat server.js

1. import modul di server.js (expresss, morgan)
   const app dan module.export
2. buat health-check || server.js

## Database Diagram

- menggunakan db diagram
<p align="center">
  <img src="public/images/db-diagram.png" alt="alt text" width="500" />
</p>

- buat relasi model di sequelize
- npm i sequelize sequelize-cli pg pg-hstore
- npx sequlize init
- npx sequelize model:generate --name Students --attributes last_name:string,email:string,password:string
- settting validasi data yang mau asuk ke database || migrations
- npx sequelize db:migrate
- set config/config.json
- npx sequelize db:create (jika databasenya baru)
- npx sequelize db:migrate

3. middleware baca request body || server.js

noted : buat konfigurasi mvp (model, view, and controller)
