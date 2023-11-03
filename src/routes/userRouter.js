import { Router } from "express";
import passport from "passport";

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
  async (req, res) => {
    if (!req.user) {
      res.status(400).send();
    }

    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.isLogged = true;
    req.session.role = req.user.role;
    req.session.userCart = req.user.cart._id;
    res.redirect("/products");
  }
);

userRouter.get("/logout", (req, res) => {
  req.session.isLogged = false;
  req.session.first_name = undefined;
  req.session.last_name = undefined;
  req.session.email = undefined;
  req.session.age = undefined;
  req.session.role = undefined;
  req.session.userCart = undefined;
  res.redirect("/login");
});

userRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

userRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.first_name = req.user.first_name;
    req.session.last_name = req.user.last_name;
    req.session.email = req.user.email;
    req.session.age = req.user.age;
    req.session.isLogged = true;
    req.session.role = req.user.role;
    req.session.userCart = req.user.cart._id;

    console.log(res);
    res.redirect("/products");
  }
);
export default userRouter;
