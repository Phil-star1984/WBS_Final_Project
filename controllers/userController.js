import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Wishlist from "../models/Wishlist.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw { statusCode: 404, message: "user not found" };
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// export const updateUser = async (req, res, next) => {
//     const {id} = req.params;
//     const {firstname, lastname, birthdate, email, creationDate, wishlist, shoppingCart} = req.body;

//     try {
//         const updatedUser = await User.findByIdAndUpdate(
//             id,
//             {firstname, lastname, birthdate, email, creationDate, wishlist, shoppingCart},
//             {new: true}
//         );
//         if (!updatedUser) {
//             throw {statusCode: 404, message: 'user not found'};
//         }
//         res.json(updateUser);
//     } catch (error) {
//         next (error);
//     }
// };

// USER
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw { statusCode: 404, message: "user not found" };
    }
    res.status(200).json({ message: "user was deleted", deletedUser });
  } catch (error) {
    next(error);
  }
};

// CART
export const getCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const foundUser = await User.findById({ _id: userId });
  if (!foundUser) throw new ErrorResponse("No such user exists", 404);

  const cart = (await Cart.findOne({ user: userId })) || [];

  res.status(200).json(cart);
});

export const addGameToCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;

  const foundUser = await User.findById({ _id: userId });
  if (!foundUser) throw new ErrorResponse("No such user exists", 404);

  const existingGame = await Cart.findOne({
    user: userId,
    "games.gameId": gameId,
  });

  if (!existingGame) {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $push: { games: { gameId } } },
      { new: true, upsert: true }
    );

    if (!updatedCart)
      throw new ErrorResponse("Could not add game to cart", 404);

    res.status(200).json(updatedCart);
  } else {
    console.log("Game already in cart");
    res.status(200).json(existingGame);
  }
});

export const deleteGameInCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;
  console.log(gameId);

  if (!userId || !gameId)
    throw new ErrorResponse("UserId or GameId not correct", 400);

  const foundUser = await User.findById({ _id: userId });
  if (!foundUser) throw new ErrorResponse("No such user exists", 404);

  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { games: { gameId } } },
    { new: true }
  );

  if (!updatedCart)
    throw new ErrorResponse("Could not delete game or find cart", 404);

  res.status(200).json(updatedCart);
});

export const addManyGamesToCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { games } = req.body;

  const foundUser = await User.findById({ _id: userId });
  if (!foundUser) throw new ErrorResponse("No such user exists", 404);

  const existingGames = await Cart.findOne({
    user: userId,
    "games.gameId": { $in: games.map((game) => game.gameId) },
  });

  if (!existingGames) {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $push: { games: { $each: games } } },
      { new: true, upsert: true }
    );

    if (!updatedCart)
      throw new ErrorResponse("Could not add game to cart", 404);

    res.status(200).json(updatedCart);
  } else {
    // Filter out games that are already in the cart
    const newGames = games.filter(
      (game) =>
        !existingGames.games.some(
          (existingGame) => existingGame.gameId === game.gameId
        )
    );

    if (newGames.length > 0) {
      // Add only the new games to the cart
      const updatedCart = await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { games: { $each: newGames } } },
        { new: true }
      );

      if (!updatedCart)
        throw new ErrorResponse("Could not add game to cart", 404);

      res.status(200).json(updatedCart);
    } else {
      // If all games are already in the cart, respond with the existing cart
      console.log("All games already in cart");
      res.status(200).json(existingGames);
    }
  }
});

// WISHLIST
export const getWishlist = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) throw new ErrorResponse("Wishlist does not exist", 404);

  res.status(200).json(wishlist);
});

export const addGameToWishlist = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;

  const foundUser = await User.findById({ _id: userId });
  if (!foundUser) throw new ErrorResponse("No such user exists", 404);

  const updatedWishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $push: { games: { gameId } } },
    { new: true, upsert: true }
  );

  if (!updatedWishlist)
    throw new ErrorResponse("Could not add game to wishlist", 404);

  res.status(200).json(updatedWishlist);
});

export const deleteGameInWishlist = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { gameId } = req.body;

  const updatedWishlist = await Wishlist.findOneAndUpdate(
    { user: userId },
    { $pull: { games: { gameId } } },
    { new: true }
  );

  if (!updatedWishlist)
    throw new ErrorResponse("Could not delete game or find wishlist", 404);

  res.status(200).json(updatedWishlist);
});
