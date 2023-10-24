import User from "../models/User.js";

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

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw { statusCode: 404, message: "user not found" };
    }
    res.status(200).json({ message: "user was deleted" });
  } catch (error) {
    next(error);
  }
};
