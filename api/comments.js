const express = require("express");
const commentsRouter = express.Router();
const {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} = require("../db/comments");

// GET /api/comments
commentsRouter.get("/", async (req, res ) => {
  try {
    const comments = await getAllComments(req.user.user_id);

    res.send({ comments });
  } catch (error) {
        console.log(error);
        res.status(500).send({ error, message: "Could not retrieve comments." });
  }
});

// POST /api/comments
commentsRouter.post("/", async (req, res ) => {
  try {
    const comment = await createComment({ ...req.body, user_id: req.user.user_id });

    res.send({ comment });
  } catch (error) {
        console.log(error);
        res.status(500).send({ error, message: "Could not add comment." });
  }
});

// GET /api/comments/:id
commentsRouter.get("/:id", async (req, res ) => {
  try {
    const comment = await getCommentById(req.params.id);

    res.send({ comment });
  } catch (error) {
        console.log(error);
        res.status(500).send({ error, message: "Could not retrieve all of your comments." });
  }
});

// PUT /api/comments/:id
commentsRouter.put("/:id", async (req, res) => {
  try {
    //makes sure to pull out only the columns for our comment from the req.body
    const { comment } = req.body;
    const userComment = await updateComment(req.params.id, {
      comment
    });

    res.send({ userComment });
  } catch (error) {
        console.log(error);
        res.status(500).send({ error, message: "Could not update comment." });
  }
});

// DELETE /api/plants/:id
commentsRouter.delete("/:id", async (req, res, next) => {
  try {
    const comment = await deleteComment(req.params.id);

    res.send({ comment });
  } catch (error) {
    next(error);
  }
});

module.exports = commentsRouter;
