const { Users } = require("../models");
const { Op } = require("sequelize");

const findUsers = async (req, res, next) => {
  try {
    // Ambil query params untuk filtering
    const { name, minAge, maxAge, role, address } = req.query;

    const userCondition = {};

    if (name) userCondition.name = { [Op.iLike]: `%${name}%` };
    if (minAge) userCondition.age = { [Op.gte]: minAge };
    if (maxAge) {
      userCondition.age = {
        ...userCondition.age,
        [Op.lte]: maxAge,
      };
    }
    if (role) userCondition.role = { [Op.iLike]: `%${role}%` };
    if (address) userCondition.address = { [Op.iLike]: `%${address}%` };

    // Fetch semua pengguna berdasarkan syarat pencarian
    const users = await Users.findAll({
      where: userCondition,
      attributes: ["id", "name", "age", "role", "address"],
    });

    const totalData = users.length;

    res.status(200).json({
      status: "Success",
      message: "Berhasil mendapatkan data pengguna",
      isSuccess: true,
      data: {
        totalData,
        users,
      },
    });
  } catch (err) {
    console.error(err.name);
    res.status(500).json({
      status: "Failed",
      message: "Terjadi kesalahan pada server",
      isSuccess: false,
      data: null,
    });
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        user,
      },
    });
  } catch (err) {}
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address, shopId } = req.body;
  try {
    await Users.update(
      {
        name,
        age,
        role,
        address,
        shopId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update user",
    });
  } catch (err) {}
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete user",
    });
  } catch (err) {}
};

module.exports = {
  findUsers,
  findUserById,
  updateUser,
  deleteUser,
};
