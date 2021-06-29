const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Dishes = mongoose.model("Dish", dishSchema);

module.exports = Dishes;
