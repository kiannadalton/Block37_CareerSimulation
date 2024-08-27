const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { findUserById } = require("../db/users");

// routes
// path api/auth , sending it to auth/auth.js
apiRouter.use("/auth", require("./auth/auth"));

// new notes and updates
// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  // if request does not need auth header, move on
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      console.log(token);
      const { id } = jwt.verify(
        token,
        process.env.JWT || "Super secret super safe"
      );

      console.log(id);
      //   if id is successfully made, set req.user
      if (id) {
        console.log(id);
        req.user = await findUserById(id);
        console.log(req.user);
        next();
      } else {
        // 400 status on bad request
        res.status(400).send({
          name: "AuthorizationHeaderError",
          message: "Authorization Token Malformed",
        });
      }
    } catch (error) {
      console.log(error);
      next();
    }
  } else {
    // 400 status on bad request
    res.status(400).send({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.use("/comments", require("./comments"));

apiRouter.use("/reviews", require("./reviews"));

apiRouter.use("/items", require("./items"));

// apiRouter.use((error, req, res, next) => {
//   res.send(error);
// });

module.exports = apiRouter;
