const express = require("express");
const reviewsRouter = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../db/reviews");

const { requireUser } = require("./utils");


// GET /api/reviews
reviewsRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getAllReviews(req.user.user_id);

    res.send({ reviews });
  } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ error, message: "Could not retrieve comments." });  
        }
});

// POST /api/reviews
reviewsRouter.post("/", async (req, res, next) => {
  try {
    const review = await createReview({ ...req.body, user_id: req.user.user_id });

    res.send({ review });
  } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ error, message: "Could not add review." });   
  }
});

// GET /api/reviews/:id
reviewsRouter.get("/:id", requireUser, async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.id);

    res.send({ review });
  } catch (error) {
        console.log(error);
        res
          .status(500)
          .send({ error, message: "Could not retrieve all of your comments." });  }
});

// PUT /api/reviews/:id
reviewsRouter.put("/:id", requireUser, async (req, res, next) => {
  try {
    //makes sure to pull out only the columns for our review from the req.body
    const { score, txt} = req.body;
    const review = await updateReview(req.params.id, {
      score,
      txt
    });

    res.send({ review });
  } catch (error) {
        console.log(error);
        res.status(500).send({ error, message: "Could not update review." });  }
});

// DELETE /api/reviews/:id
reviewsRouter.delete("/:id", requireUser, async (req, res, next) => {
  try {
    const review = await deleteReview(req.params.id);

    res.send({ review });
  } catch (error) {
    next(error);
  }
});

module.exports = reviewsRouter;
