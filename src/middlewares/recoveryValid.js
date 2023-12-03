import { RecoveryTokenService } from "../repositories/index.js";

export const recoveryIsValid = async (req, res, next) => {
  const token = req.params.token;
  const email = req.params.email;

  const ticketData = { token, user: email };

  const recoveryToken = await RecoveryTokenService.getOne(ticketData);

  if (!recoveryToken) {
    return res.status(404).send("Invalid or expired token");
  }
  next();
};
