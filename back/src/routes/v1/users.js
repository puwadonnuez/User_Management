const { Router } = require("express");
const {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getUserById,
} = require("../../controller/user");

const router = Router();

router.get("/", getUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
