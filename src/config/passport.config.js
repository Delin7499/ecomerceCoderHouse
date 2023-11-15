import passport from "passport";
import local from "passport-local";
import User from "../dao/users.dao.js";
import bcrypt from "bcrypt";
import GitHubStrategy from "passport-github2";
import Cart from "../dao/carts.dao.js";
import config from "../../config.js";
const LocalStrategy = local.Strategy;

const userDao = new User();
const cartDao = new Cart();

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        const userExists = await userDao.getUserByEmail(email);

        if (userExists) {
          console.log("User already exists. Registration failed.");
          return done(null, false);
        }

        const hashedPassword = bcrypt.hashSync(
          password,
          bcrypt.genSaltSync(10)
        );
        const carrito = await cartDao.createCart({ products: [] });
        const user = await userDao.createUser({
          first_name,
          last_name,
          email,
          age,
          password: hashedPassword,
          cart: carrito._id,
        });
        console.log("User registered successfully.");
        return done(null, user);
      }
    )
  );
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.1563acddd83e2cda",
        clientSecret: "2a7708575736cd1844e79eb96c4d39ddbd3a8015",
        callbackURL: "http://localhost:8080/api/users/githubcallback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value;
          const user = await userDao.getUserByEmail(email);

          if (!user) {
            const carrito = await cartDao.createCart({ products: [] });
            const newUser = await userDao.createUser({
              first_name: profile._json.login,
              last_name: "",
              email,
              age: 18,
              cart: carrito._id,
            });
            return done(null, newUser);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    if (user.role === "Admin") {
      done(null, "admin");
    } else {
      done(null, user._id);
    }
  });

  passport.deserializeUser(async (id, done) => {
    if (id === "admin") {
      const adminUser = {
        first_name: "ADMIN",
        last_name: "",
        email: config.adminName,
        age: 18,
        cart: "undefined",
        role: "Admin",
      };
      done(null, adminUser);
    } else {
      try {
        const user = await userDao.getUserById(id);
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          if (
            username == config.adminName &&
            password == config.adminPassword
          ) {
            const user = {
              _id: config.adminCoder,
              first_name: "ADMIN",
              last_name: "",
              email: config.adminName,
              age: 18,
              cart: "undefined",
              role: "Admin",
            };

            return done(null, user);
          }

          const user = await userDao.getUserByEmail(username);
          if (!user) {
            console.log("User not found. Login failed.");
            return done(null, false);
          }

          if (!bcrypt.compareSync(password, user.password)) {
            console.log("Password mismatch. Login failed.");
            return done(null, false);
          }

          console.log("User logged in successfully.");
          return done(null, user);
        } catch (error) {
          console.error("Error during login:", error);
          return done(error);
        }
      }
    )
  );
};

10 === "10";
export default initializePassport;
