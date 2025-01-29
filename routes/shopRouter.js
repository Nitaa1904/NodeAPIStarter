const router = require("express").Router();

// pemanggilan index controllernya
const { shopController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");

// 49. tambahkan middleware authenticate
router.post("", authenticate, shopController.createShop);
router.get("", shopController.getAllShop);
router.get("/:id", shopController.getShopById);
router.patch("/:id", shopController.updateShop);
router.delete("/:id", shopController.deleteShop);

module.exports = router;
