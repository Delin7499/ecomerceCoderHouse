import { RecoveryTokenService, UserService } from "../repositories/index.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import Mail from "../helpers/mail.js";
import { UserDTO } from "../DTO/user.dto.js";
export const logout = async (req, res) => {
  req.session.user = undefined;
  res.redirect("/login");
};

export const login = async (req, res) => {
  if (!req.user) {
    res.status(400).send();
  }

  req.session.isLogged = true;
  req.session.user = req.user;
  res.redirect("/products");
};

export const githubcallback = async (req, res) => {
  req.session.isLogged = true;
  req.session.user = req.user;

  res.redirect("/products");
};

export const sendRecoveryEmail = async (req, res) => {
  const { email } = req.body;

  const user = await UserService.getByEmail(email);

  if (!user) {
    return res.status(404).send("User not found");
  }

  const token = await RecoveryTokenService.create({
    user: email,
    token: uuidv4(),
  });

  const mail = new Mail();

  const result = await mail.send(
    user.email,
    "Password Recovery",
    `<h1>Click <a href="http://localhost:8080/password-reset/${email}/${token.token}">here</a> to recover your password</h1>`
  );

  return res.status(200).send("Recovery email sent");
};

export const resetPassword = async (req, res) => {
  const { email, token } = req.params;
  const { password } = req.body;

  const user = await UserService.getByEmail(email);
  if (!password) {
    return res.status(400).send("Password is required");
  }
  if (!user) {
    return res.status(404).send("User not found");
  }
  if (user.isGithub) {
    return res
      .status(401)
      .send("You can't change your password because you are a Github user");
  }

  const recoveryToken = await RecoveryTokenService.getOne({
    user: email,
    token,
  });

  if (!recoveryToken) {
    return res.status(404).send("Invalid or expired token");
  }
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  user.password = hashedPassword;

  await UserService.update(user._id, user);

  await RecoveryTokenService.deleteById(recoveryToken._id);

  return res.status(200).send("Password updated");
};

export const getSessionUser = async (req, res) => {
  if (!req.session.user) {
    console.log("no user");
    return res.json(null);
  }
  console.log(req.session.user);
  return res.json(req.session.user);
};
