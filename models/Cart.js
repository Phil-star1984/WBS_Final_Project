import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  games: [
    {
      gameId: {
        type: String,
        required: true,
      },
      dateAdded: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
