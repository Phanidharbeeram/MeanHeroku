const mongoose = require("mongoose");
const ShoopingSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemQuantity: {
    type: Number,
    required: true,
  },
  itemBrought: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("ShoppingList", ShoopingSchema, "ShoppingList");
