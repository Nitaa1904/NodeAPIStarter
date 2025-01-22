require("dotenv").config();

// 1. import modul2
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const router = require("./routes");
const docsRouter = require("./routes/documentationRouter");

const { systemController } = require("./controllers");

const app = express();

app.use(cors());
// 3. middleware baca request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("dev"));

// 2. buat health-check
app.get("/api/v1/health-check", systemController.healtcheck);
// 6. panggil router
app.use("/api/v1", router);
app.use("/api-docs", docsRouter);

app.use(systemController.onLost);

module.exports = app;
