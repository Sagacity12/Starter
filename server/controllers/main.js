const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  //mongoose validation
  //Joi
  // check in the controller

  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const id = new Date().getDate();

  //In production use long, complex and unguessable string value!!!!!!!!!
  //try to keep payload small, better expreience for user
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
 const LickyNumber = Math.floor(Math.random() * 100);


    res
      .status(200)
      .json({
        mgs: `Hello, ${req.user.username}`, 
        secret: `Here is your authorized data, you're lucky number is ${LuckyNumber}`,
      });


};

module.exports = {
  login,
  dashboard,
};
