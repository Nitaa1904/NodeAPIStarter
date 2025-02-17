const router = require("express").Router();

// pemanggilan index controllernya
const { productController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");

// 5. buat API getnya
router.post("", productController.createProduct);
router.get("", productController.getAllProduct);
router.get("/:id", authenticate, productController.getProductById); // 34. tambahkan middleware authenticate
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
