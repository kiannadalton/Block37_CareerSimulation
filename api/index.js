const express = require('express');
const jwt = require("jsonwebtoken");
const { findUserById } = require("../db/users");
const apiRouter = express.Router();
const { requireUser } = require("./utils");


// routes
// path api/auth , sending it to auth/auth.js
const authRouter = require("./auth/auth");

apiRouter.use('/auth', authRouter);

// new notes and updates
// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(
        token,
        process.env.JWT || "super duper secret"
      );

      if (id) {
        req.user = await findUserById(id);
        next();
      } else {
        next({
          name: "AuthorizationHeaderError",
          message: "Authorization token malformed",
        });
      }
    } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ error, message: "Could not authorize user." });
    }
  } 
});

const commentsRouter = require("./comments");

const reviewsRouter = require("./reviews");

const itemRouter = require("./items");

apiRouter.use("/reviews", reviewsRouter)

apiRouter.use("/items", itemRouter);

/**
 * Since all comments routes need authorization we will
 * require a user on all routes here instead of inside
 * comments.js
 */
apiRouter.use("/comments", requireUser, commentsRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});


module.exports = apiRouter;