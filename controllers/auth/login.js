const jwt = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");
const { HttpError } = require("http-errors");
const bcrypt = require("bcrypt");

const { User } = require("../../models");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify) {
    throw new HttpError(401, "Email is wrong or not verify");
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(201).json({
    token,
  });
};

module.exports = login;
