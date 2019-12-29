import passport from "passport";
import User from "./models/User";

import routes from "./routes";

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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
