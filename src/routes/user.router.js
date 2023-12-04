import { Router } from "express";
import passport from "passport";
import {
  getSessionUser,
  githubcallback,
  login,
  logout,
  resetPassword,
  sendRecoveryEmail,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post(
  "/signup",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    res.redirect("/login");
  }
);

userRouter.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/failogin" }),
  login
);

userRouter.get("/logout", logout);

userRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

userRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubcallback
);

userRouter.post("/recover", sendRecoveryEmail);

userRouter.post("/reset-password/:email/:token", resetPassword);

userRouter.get("/session-user", getSessionUser);
export default userRouter;
