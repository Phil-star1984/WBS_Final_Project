import jwt, { verify } from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler';
import ErrorResponse from '../utils/ErrorResponse';

const verifyToken = asyncHandler(async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) throw new ErrorResponse ('You need to sign in to continue', 401);

    const decoded = jwt.verify(authorization, proces.env.JWT_SECRET);
    req.uid = decoded.uid;
    next();
});




export default verifyToken;