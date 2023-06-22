const { Router } = require("express");

const userRoute = require(`./users`);

const router = Router();

router.use("/users", userRoute);

module.exports = router;
