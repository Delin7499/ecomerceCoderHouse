import { Router } from "express";
import { adminAuthMiddleware } from "../middlewares/adminauth.js";
import { recoveryIsValid } from "../middlewares/recoveryValid.js";

const viewsRouter = Router();

viewsRouter.get(`/login`, (req, res) => {
  if (req.session.user) {
    res.redirect("/products");
  } else {
    res.render("login", {});
  }
});
viewsRouter.get(`/signup`, (req, res) => {
  if (req.session.user) {
    res.redirect("/products");
    res.redirect("/products");
  } else {
    res.render("signup", {});
  }
});
viewsRouter.get(`/profile`, (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const { first_name, last_name, email, age, password } = req.session.user;
  res.render("profile", { first_name, last_name, email, age, password });
});

viewsRouter.get("/cookies", (req, res) => res.render("cookies", {}));
viewsRouter.get("/getCookies", (req, res) => {
  res.send(req.cookies);
});

viewsRouter.post("/setCookies", (req, res) => {
  const { nombre, valor } = req.body;
  res.cookie(nombre, valor, { maxAge: 1000000 }).send("cookie Creada");
});

viewsRouter.get(`/products`, (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const isLogged = req.session.isLogged;
  const user = req.session.user;
  const isAdmin =
    req.session.user.role === "Admin" || req.session.user.role === "Premium";
  res.render("home", { isLogged, user, isAdmin });
});
viewsRouter.get("/carts/:cid", (req, res) => {
  const cartId = req.params.cid;
  res.render("cart", { cartId });
});

viewsRouter.get(`/realtimeproducts`, adminAuthMiddleware, (req, res) => {
  const email = req.session.user.email;
  return res.render("realTimeProducts", { email });
});
viewsRouter.get(`/realtimecarts`, (req, res) =>
  res.render(`realTimeCarts`, {})
);

viewsRouter.get("/chat", (req, res) => res.render("chat", {}));

viewsRouter.get("/mycart", (req, res) => {
  const cartId = req.session.user.cart._id;
  res.render("cart", { cartId });
});

viewsRouter.get("/mytickets", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  const userEmail = req.session.user.email;
  res.render("userTickets", { userEmail });
});
viewsRouter.get("/password-recover", (req, res) => {
  res.render("passwordRecovery", {});
});

viewsRouter.get("/", (req, res) => {
  res.redirect("/products");
});

viewsRouter.get(
  "/password-reset/:email/:token",
  recoveryIsValid,
  (req, res) => {
    const email = req.params.email;
    const token = req.params.token;
    res.render("resetPassword", { email, token });
  }
);
export default viewsRouter;
