const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { sendEmail } = require("../../helpers");

const { User } = require("../../models");
const { nanoid } = require("nanoid");

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(5));
  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    verificationToken,
    avatarURL,
  });
  const mail = {
    to: email,
    subject: "Підтвардження email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Нажміть для підтвердження</a>`,
  };
  await sendEmail(mail);
  res.status(201).json(result);
};

module.exports = signup;
