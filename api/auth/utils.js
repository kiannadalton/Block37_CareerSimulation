const { findUserByUsername } = require("../../db/users");

const checkUserData = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Please provide a username and password" });
  }

  next();
};

const checkUsername = async (req, res, next) => {
  const oldUser = await findUserByUsername(req.body.username);

  if (oldUser) {
    return res.status(400).send({ message: "That username is already taken." });
  }
  next();
};


module.exports = { checkUserData, checkUsername };
