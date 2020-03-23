const express = require("express");
const router = new express.Router();
const userAuth = require("../middleware/userAuth");
const userService = require("../services/user");

router.post("/signup", async (req, res) => {
  try {
    const response = await userService.create(req.body);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const response = await userService.login(req.body.email, req.body.password);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/logout", userAuth, async (req, res) => {
  try {
    console.log(req);
    const response = await userService.logout(req.user);
    res.status(201).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
