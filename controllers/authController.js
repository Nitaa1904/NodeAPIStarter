// 43. import bcrypt untuk password
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");
const { Auths, Users } = require("../models");
const { JsonWebTokenError } = require("jsonwebtoken");
const { Where } = require("sequelize/lib/utils");

const register = async (req, res, next) => {
  try {
    res.status(201).json({
      status: "Success",
      data: {},
    });
  } catch (err) {}
};

const login = async (req, res, next) => {
  try {
    // 38. login menggunakan email password (token)
    const { email, password } = req.body;

    // 39. mencari data by email
    const data = await Auths.findOne({
      include: [
        {
          model: Users,
          as: "user",
        },
      ],
      Where: {
        email,
      },
    });

    // 40. validasi user
    if (!data) {
      return res.status(404).json({
        status: "Failed",
        message: "User does not exist",
        isSuccess: false,
        data: null,
      });
    }

    // 42. jika user ada dan password benar
    if (data && bcrypt.compareSync(password, data.password)) {
      // 43. menggunakan bcrypt untuk password
      const token = jwt.sign(
        // 44. generate token menggunakan jwt
        {
          id: data.id,
          username: data.user.name,
          email: data.email,
          userId: data.user.id,
        },
        // 45. simpan di jwt dan buat di env
        process.env.JWT_SECRET,
        {
          // 46. expire dan buat juga di jwt
          expiresIn: process.env.JWT_EXPIRED,
        }
      );

      res.status(200).json({
        status: "Success",
        message: "Success login",
        isSuccess: true,
        data: {
          username: data.user.name,
          // 47. panggil token
          token,
        },
      });
    } else {
      res.status(401).json({
        status: "Failed",
        message: "Incorrect password",
        isSuccess: false,
        data: null,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "Failed",
      message: "An error occurred",
      data: null,
    });
  }
};

const authenticate = async (req, res) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {}
};

module.exports = {
  register,
  login,
  authenticate,
};
