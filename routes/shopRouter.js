// pemanggilan index controllernya
const { shopController } = require("../controllers");
const authenticate = require("../middlewares/authenticate");

const router = require("express").Router();

// 49. tambahkan middleware authenticate
router.post("", authenticate, shopController.createShop);
router.get("", authenticate, shopController.getAllShop);
router.get("/:id", shopController.getShopById);
router.patch("/:id", shopController.updateShop);
router.delete("/:id", shopController.deleteShop);

module.exports = router;
