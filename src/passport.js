import passport from "passport";
import User from "./models/User";
import GoogleStrategy from "passport-google-oauth20";
import FaceBookStrategy from "passport-facebook";
import routes from "./routes";
import {
  googleLoginCallback,
  facebookLoginCallback
} from "./controllers/userController";

// strategy: passport에게 로그인 방식을 지정해주는 method(개수 상관 없이 여러 개 쓸 수 있음)
passport.use(User.createStrategy());

// passport.use(
//   new LocalStrategy.Strategy(
//     {
//       usernameField: "email",
//       passwordField: "password"
//     },
//     async (email, password, done) => {
//       const exUser = await User.findOne({ email: email });

//       if (exUser) {
//         const result = await bcrypt.compare(password, exUser.password);
//         if (result) done(null, exUser);
//         else done(null, false, { message: "Passwords do not match" });
//       } else done(null, false, { message: "가입되지 않는 회원입니다" });
//     }
//   )
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
      callbackURL: `http://localhost:4000${routes.googleCallback}`
    },
    googleLoginCallback
  )
);

passport.use(
  new FaceBookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:4000${routes.FB_CALLBACK}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
