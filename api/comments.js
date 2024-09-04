const express = require("express");
const commentsRouter = express.Router();
const {
  createComment,
  getAllComments,
  getCommentByReviewId,
  updateComment,
  deleteComment,
} = require("../db/comments");

const { verifyUser } = require("./auth/verifyUser");

// works with new endpoint and pulls author_id from user.id
// GET /api/comments
commentsRouter.get("/", verifyUser, async (req, res) => {
  try {
    const comments = await getAllComments(req.user.id);

    res.send({ comments });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Could not retrieve comments." });
  }
});

//working with new end point and pulling review_id from body
// POST /api/comments
commentsRouter.post("/", verifyUser, async (req, res) => {
  try {
    console.log(req.user);

    const comment = await createComment({
      ...req.body,
      author_id: req.user.id,
      review_id: req.body.review_id,
    });

    res.status(200).send({ comment });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Could not add comment." });
  }
});

// works
// GET /api/comments/:id/comments
commentsRouter.get("/:id/comments", async (req, res) => {
  try {
    const comment = await getCommentByReviewId(req.params.id);

    res.send({ comment });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error, message: "Could not retrieve all of your comments." });
  }
});

// works
// PUT /api/comments/:id
commentsRouter.put("/:id", verifyUser, async (req, res) => {
  try {
    //makes sure to pull out only the columns for our comment from the req.body
    const { comment } = req.body;
    const userComment = await updateComment(req.params.id, {
      comment,
    });

    res.send({ userComment });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Could not update comment." });
  }
});

// works
// DELETE /api/comments/:id
commentsRouter.delete("/:id", verifyUser, async (req, res, next) => {
  try {
    const comment = await deleteComment(req.params.id);

    res.send({ comment });
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
