const express = require("express");
const router = express.Router();
const Item = require("../Models/ShoppingList");
router.get("/", (req, res) => {
  Item.find((err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log(item);
      res.json(item);
    }
  });
});
router.post("/item", (req, res) => {
  console.log(req.body);

  let newItem = new Item({
    itemName: req.body.itemName,
    itemQuantity: req.body.itemQuantity,
    itemBrought: req.body.itemBrought,
  });
  newItem.save((err, item) => {
    if (err) {
      res.json(err);
    } else {
      res.json({ msg: "Item Saved To dataBase" });
    }
  });
});
router.put("/item/:id", (req, res) => {
  Item.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        itemName: req.body.itemName,
        itemQuantity: req.body.itemQuantity,
        itemBrought: req.body.itemBrought,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Listitem updated");
      }
    }
  );
});
router.delete("/item/:id", (req, res) => {
  Item.remove({ _id: req.params.id }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Item Removed");
      res.json({ msg: "Item removed from DataBase" });
    }
  });
});
module.exports = router;
