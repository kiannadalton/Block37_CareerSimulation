const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByUsername } = require("../../db/users");
const { checkUserData, checkUsername } = require("./utils");

const authRouter = express.Router();

// path /api/auth
// Register user
authRouter.post("/register", checkUserData, checkUsername, async (req, res) => {
  // username and password --> req.body
  // hash password,use bcrypt
  // create user in db
  // create token for user - jsonwebtoken
  // sen response (status, body: {token})
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both a username and a password." });
    }

    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT || 5)
    );

    // adds user to database
    const newUser = await createUser({ ...req.body, password: hashPassword });

    // creates token for new user
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT || "super secret super safe"
    );

    res.status(201).send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Could not register user." });
  }
});

// path /api/auth
// login user
authRouter.post("/login", async (req, res) => {
  // find the user b username --> req.body
  // hash password,use bcrypt
  // check is username and password matches
  // create token with user_id - jsonwebtoken
  // send response (status, body: {token})
  try {
    const user = await findUserByUsername(req.body.username);

    const samePassword = await bcrypt.compare(req.body.password, user.password);

    if (!user || !samePassword) {
      return res.status(401).send("Oh no! It looks like one of those fields were incorrect. Please try again!");
    }

    // creates token/sends it
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT || "super secret super safe"
    );
 
    res.send({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Could not login user." });
  }
});

module.exports = authRouter;
