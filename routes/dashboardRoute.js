const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// const upload = require("../middleware/uploader");

router.get("/admin", dashboardController.adminDashboard);
router.get("/admin/users", dashboardController.userPage);
router.get("/admin/users/create", dashboardController.createPage);

// router.post(
//   "/users/create",
//   upload.single("photo"),
//   dashboardController.createUser
// );
router.get("/admin/users/:id", dashboardController.findUserById);
// view engine = gak ada put/patch dan delete

module.exports = router;
