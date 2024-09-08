// router.get
const express = require("express");
const itemRouter = express.Router();
const { verifyUser } = require("./auth/verifyUser");

const {
  findItembyId,
  findAllItems,
} = require("../db/items.js");
const {
  createReview
} = require("../db/reviews");

// works
// GET /api/items/
itemRouter.get("/", async (req, res) => {
  try {
    const allItems = await findAllItems(req.id);

    res.send({ allItems });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error, message: "Items not found." });
  }
});

// works
// GET /api/items/:id
itemRouter.get("/:id", async (req, res) => {
  try {
    const itemId = await findItembyId(req.params.id);

    res.send({ itemId });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error, message: "Item not found." });
  }
});

// post review
// POST /api/items
itemRouter.post("/:item_id/review", verifyUser, async (req, res) => {
  try {
    console.log(req.user);
    const review = await createReview({
      ...req.body,
      user_id: req.user.id,
      item_id: req.params.item_id,
    });

    res.status(200).send({ review });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error, message: "Could not add review." });
  }
});


module.exports = itemRouter;
