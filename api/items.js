// router.get
const express = require("express");
const itemRouter = express.Router();
const reviewsRouter = express.Router();

const {
  findItembyId,
  findAllItems,
} = require("../db/items.js");

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


module.exports = itemRouter;
