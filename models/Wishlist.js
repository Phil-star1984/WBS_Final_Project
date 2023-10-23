import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;
