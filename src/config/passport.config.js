import passport from "passport";
import local from "passport-local";
import bcrypt from "bcrypt";
import GitHubStrategy from "passport-github2";
import UserManager from "../controller/UserManager.js";
import CartManager from "../controller/CartManager.js";

const LocalStrategy = local.Strategy;

const userManager = new UserManager();
const cartManager = new CartManager();

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        const userExists = await userManager.getUserByEmail(email);

        if (userExists) {
          console.log("User already exists. Registration failed.");
          return done(null, false);
        }

        const hashedPassword = bcrypt.hashSync(
          password,
          bcrypt.genSaltSync(10)
        );
        const carrito = await cartManager.createCart([]);
        const user = await userManager.createUser(
          first_name,
          last_name,
          email,
          age,
          hashedPassword,
          carrito._id
        );

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
          console.log(profile);
          const email = profile.emails[0].value;
          const user = await userManager.getUserByEmail(email);

          if (!user) {
            const carrito = await cartManager.createCart([]);
            const newUser = await userManager.createUser(
              profile._json.name,
              "",
              email,
              18,
              carrito._id
            );

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
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userManager.getUserById(id);
    done(null, user);
  });

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userManager.getUserByEmail(email);
          if (!user) {
            console.log("User not found. Login failed.");
            return done(null, false);
          }
          console.log(user.password);
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
