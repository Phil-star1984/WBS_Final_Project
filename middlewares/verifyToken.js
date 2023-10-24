import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    throw new ErrorResponse("You need to sign in to continue", 401);
  console.log(authorization);
  const token = authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.uid = decoded.uid;
  next();
});

export default verifyToken;
