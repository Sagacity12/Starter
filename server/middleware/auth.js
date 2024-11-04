const user = require('../model/user.model.js')
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");


const authenticationMiddleware = async (req,res,next) =>{
    const authHeader = req.headers.authorization

     if (!authHeader || !authHeader.startWith("Bearer")) {
    throw new UnauthenticatedError("No token provided",);

    const token = authHeader.split(" ")[1];

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach the user to the routes
    //const {id, username } = decoded 
    const user = User.findById(payload.id).select('-password')
    req.user = user 
    req.user = { userId:payload.userId, name:payload.name };
    next()

  } catch (error) {
    //throw new UnauthenticatedError("Not authorized to access this route ", 401);
    throw new UnauthenticatedError(" Authentication Invalid ");
  }
};

}

module.exports = authenticationMiddleware 