const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const users = require("../models/users");

// 35. buat module function authenticate
module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    // 36. jika tidak ada request (token kosong)
    if (!bearerToken) {
      return res.status(401).json({
        status: "Failed",
        message: "Token is missing",
        isSuccess: false,
        data: null,
      });
    }

    // 48. validasi jsonwebtoken
    const token = bearerToken.split(" ")[1]; // hanya ngambil tokenya aja
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "Invalid token format",
        isSuccess: false,
        data: null,
      });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET); // pauload (data user) menggunakan wentoken json verify
    if (!payload) {
      return res.status(401).json({
        status: "Failed",
        message: "Unauthorized",
        isSuccess: false,
        data: null,
      });
    }
    const user = await Users.findByPk(payload.userId);

    if (!user) {
      return res.status(401).json({
        status: "Failed",
        message: "User not found",
        isSuccess: false,
        data: null,
      });
    }

    // disimpan user yg udah login
    req.user = user;
    next();
  } catch (err) {
    // 37. tokenya ada tetapi salah
    return res.status(403).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};
