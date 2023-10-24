import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// SignUp
export const signUp = asyncHandler(async (req, res, next) => {
  /* Check if User exists by email*/

  const { firstName, lastName, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse("An account with this Email already exists", 409);

  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
  });

  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
});

//SingIn
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email }).select("+password");
  if (!existingUser) throw new ErrorResponse("User does not exist", 404);

  const match = await bcrypt.compare(password, existingUser.password);
  if (!match) throw new ErrorResponse("Wrong Password", 401);

  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET);
  res.status(200).send({ token });
});

export const getUser = asyncHandler(async (req, res, next) => {
  console.log(req.uid);
  const user = await User.findById(req.uid, { password: 0 });

  res.json(user);
});
