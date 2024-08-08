// router.get
const express = require("express");
const itemRouter = express.Router();
const {
  findItembyId,
  findItembyName,
  findAllItems,
} = require("../db/items.js");



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

// GET /api/items/name
itemRouter.get("/name", async (req, res) => {
  try {
    const itemName = await findItembyName(req.body.name);

    res.send({ itemName });
  } catch (error) {
    console.log(error);
    res.status(404).send({ error, message: "No items found with that name." });
  }
});

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
