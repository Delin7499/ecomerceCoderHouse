import { Router } from "express";
import passport from "passport";
import {
  githubcallback,
  login,
  logout,
} from "../controller/users.controller.js";

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
export default userRouter;
