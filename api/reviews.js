const express = require("express");
const reviewsRouter = express.Router();
const {
  createReview,
  getReviewByItemId,
  getReviewByUserId,
  updateReview,
  deleteReview,
} = require("../db/reviews");

const { verifyUser } = require("./auth/verifyUser");

// works
// Get all reviews a user had made
// GET /api/reviews/myreviews
reviewsRouter.get("/myreviews", verifyUser, async (req, res) => {
  try {
    const review = await getReviewByUserId(req.user.id);

    res.send({ review });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error, message: "Could not retrieve all of your reviews." });
  }
});

// works
// GET /api/reviews/:id/reviews
reviewsRouter.get("/:id/reviews", async (req, res) => {
  try {
    const comment = await getReviewByItemId(req.params.id);

    res.send({ comment });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ error, message: "Could not retrieve all of your comments." });
  }
});

// works
// PUT /api/reviews/:id
reviewsRouter.put("/:id", verifyUser, async (req, res) => {
  try {
    //makes sure to pull out only the columns for our review from the req.body
    const { score, txt } = req.body;
    const review = await updateReview(req.params.id, {
      score,
      txt,
    });

    res.send({ review });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Could not update review." });
  }
});

// works
// DELETE /api/reviews/:id
reviewsRouter.delete("/:id", verifyUser, async (req, res, next) => {
  try {
    const review = await deleteReview(req.params.id);

    res.send({ review });
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
