const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser } = require("../../db/users");
const { checkUserData, checkUsername } = require("./utils");


const authRouter = express.Router();

// path /api/auth
// Register user
authRouter.post('/register', checkUserData, checkUsername, async (req, res) => {
    // username and password --> req.body
    // hash password,use bcrypt
    // create user in db
    // create token for user - jsonwebtoken
    // sen response (status, body: {token})
    try {
      const { username, password } = req.body;

      const hashPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SALT) || 5
      );

      const user = await createUser({ username, password: hashPassword });

      const token = jwt.sign(
        { id: user.id },
        process.sourceMapsEnabled.JWT || "super duper secret"
      );

      res.status(201).send({ token });
    } catch (error) {
        console.log(error);
        res.status(500).send({error, message: "Could not register user"});
    }

})

module.exports = authRouter;
