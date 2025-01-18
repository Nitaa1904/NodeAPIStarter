const router = require("express").Router();

const Product = require("./productRouter");
const Shop = require("./shopRouter");
const Auths = require("./authRouter");
const User = require("./userRouter");

router.use("/products", Product);
router.use("/shops", Shop);
router.use("/auths", Auths);
router.use("/users", User);

module.exports = router;
