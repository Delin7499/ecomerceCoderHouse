import { Router } from "express";
import { adminAuthMiddleware } from "../middlewares/adminAuth.js";

const viewsRouter = Router();

viewsRouter.get(`/login`, (req, res) => {
  if (req.session.isLogged) {
    res.redirect("/products");
  } else {
    res.render("login", {});
  }
});
viewsRouter.get(`/signup`, (req, res) => {
  if (req.session.isLogged) {
    res.redirect("/products");
  } else {
    res.render("signup", {});
  }
});
viewsRouter.get(`/profile`, (req, res) => {
  if (!req.session.isLogged) {
    return res.redirect("/login");
  }
  const { first_name, last_name, email, age, password } = req.session;
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
  if (!req.session.isLogged) {
    return res.redirect("/login");
  }
  const session = req.session;
  const isAdmin = req.session.role === "Admin";
  res.render("home", { session, isAdmin });
});
viewsRouter.get("/carts/:cid", (req, res) => {
  const cartId = req.params.cid;
  res.render("cart", { cartId });
});

viewsRouter.get(`/realtimeproducts`, adminAuthMiddleware, (req, res) =>
  res.render("realTimeProducts", {})
);
viewsRouter.get(`/realtimecarts`, (req, res) =>
  res.render(`realTimeCarts`, {})
);

viewsRouter.get("/chat", (req, res) => res.render("chat", {}));

viewsRouter.get("/mycart", (req, res) => {
  const cartId = req.session.userCart;
  res.render("cart", { cartId });
});

export default viewsRouter;
