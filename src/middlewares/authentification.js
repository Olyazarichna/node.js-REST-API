const jwt = require("jsonwebtoken");
const RequestError = require("../heplers/RequestError");

const { User } = require("../models/users");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [tokenType = "", token = ""] = authorization.split(" ");
    if (tokenType !== "Bearer" || !token) {
      throw RequestError(401);
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw RequestError("Not authorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw RequestError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
