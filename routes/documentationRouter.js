const express = require("express");
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
// 31. buat swaggerDocument dalam bentuk swagger.json
const swaggerDocument = require("../docs/swagger.json");

// 33. buat url use dan get swagger
router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument));

module.exports = router;
