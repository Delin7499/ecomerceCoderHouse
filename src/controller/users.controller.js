import User from "../dao/users.dao.js";

const userDao = new User();

export const getUsers = async (req, res) => {
  res.send({ status: "succes", result: "getUsers" });
};

export const logout = async (req, res) => {
  req.session.isLogged = false;
  req.session.first_name = undefined;
  req.session.last_name = undefined;
  req.session.email = undefined;
  req.session.age = undefined;
  req.session.role = undefined;
  req.session.userCart = undefined;
  res.redirect("/login");
};

export const login = async (req, res) => {
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
};

export const githubcallback = async (req, res) => {
  console.log(req.user);
  req.session.first_name = req.user.first_name;
  req.session.last_name = req.user.last_name;
  req.session.email = req.user.email;
  req.session.age = req.user.age;
  req.session.isLogged = true;
  req.session.role = req.user.role;
  req.session.userCart = req.user.cart._id;

  res.redirect("/products");
};
