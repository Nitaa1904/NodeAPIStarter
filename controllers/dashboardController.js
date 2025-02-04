const { Users } = require("../models");
// const imagekit = require("../lib/imagekit");

const adminDashboard = async (req, res) => {
  try {
    res.render("layout", {
      title: "Dashboard",
      body: "<h1 class='text-2xl font-bold'>Welcome to the Admin Dashboard</h1>",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const userPage = async (req, res) => {
  try {
    const users = await Users.findAll();

    res.render("users/index", {
      title: "User Page",
      layout: "layout", // Pastikan pakai layout
      users: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// async function createUser(req, res) {
//   const newUser = req.body;

//   let uploadedImage = null;

//   if (req.file) {
//     const file = req.file;
//     const split = file.originalname.split(".");
//     const ext = split[split.length - 1];
//     const filename = `Profile-${Date.now()}.${ext}`;

//     try {
//       uploadedImage = await imagekit.upload({
//         file: file.buffer,
//         fileName: filename,
//       });
//     } catch (uploadError) {
//       console.log("Error uploading image:", uploadError);
//       return res.redirect("/error");
//     }
//   }

//   try {
//     await Users.create({
//       ...newUser,
//       photoProfile: uploadedImage ? uploadedImage.url : null,
//     });

//     res.redirect("/users");
//   } catch (error) {
//     console.log("Error creating user:", error);
//     res.redirect("/error");
//   }
// }

// g. buat create user
async function createPage(req, res) {
  try {
    res.render("users/create", {
      title: "Create page",
    });
  } catch (error) {
    res.render("error", {
      message: error.message,
    });
  }
}

const findUserById = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).render("errors/404", {
        title: "User Not Found",
        layout: "layout",
        message: "Pengguna tidak ditemukan.",
      });
    }

    res.render("users/userDetail", {
      title: `Detail User: ${user.name}`,
      layout: "layout",
      user: user, // Kirim user tanpa `users`
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errors/500", {
      title: "Server Error",
      layout: "layout",
      message: "Terjadi kesalahan pada server.",
    });
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Pengguna tidak ditemukan",
        isSuccess: false,
      });
    }

    await Users.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Sukses delete user",
      isSuccess: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "Terjadi kesalahan pada server",
      isSuccess: false,
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "Pengguna tidak ditemukan",
        isSuccess: false,
      });
    }

    const updatedUser = {
      name: req.body.name || user.name,
      age: req.body.age || user.age,
      role: req.body.role || user.role,
      address: req.body.address || user.address,
      shopId: req.body.shopId || user.shopId,
    };

    await Users.update(updatedUser, { where: { id: req.params.id } });

    res.status(200).json({
      status: "Success",
      message: "Sukses update user",
      isSuccess: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "Failed",
      message: "Terjadi kesalahan pada server",
      isSuccess: false,
    });
  }
};

module.exports = {
  adminDashboard,
  userPage,
  createPage,
  findUserById,
  deleteUser,
  updateUser,
  //   createUser,
};
