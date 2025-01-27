const jwt = require("jsonwebtoken");
const { Users } = require("../models");

// 35. buat module function authenticate
module.exports = async (req, res, next) => {
  console.log(req.headers.authorization);

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
    const token = bearerToken.split("Bearer")[1]; // hanya ngambil tokenya aja
    const payload = jwt.verify(token, process.env.JWT_SECRET); // pauload (data user) menggunakan wentoken json verify
    const user = await Users.findByPk(payload.userId, {}); // middleware (mengambil usernya)

    // disimpan user yg udah login
    req.user = user;
    next();
  } catch (err) {
    // 37. tokenya ada tetapi salah
    return res.status(500).json({
      status: "Failed",
      message: err.message,
      isSuccess: false,
      data: null,
    });
  }
};
