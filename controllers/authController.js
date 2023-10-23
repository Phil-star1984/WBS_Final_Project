import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// SignUp
export const signUp = asyncHandler(async (req, res, next) => {
  /* Check if User exists by email*/

  const { firstName, lastName, username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse("An account with this Email already exists", 409);

    const hash = await bcrypt.hash(password, 10)
    const newUser = await User.create({
        firstName,
        lastName,
        username,

    })
});
