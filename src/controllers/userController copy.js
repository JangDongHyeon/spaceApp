import passport from "passport";
import routes from "../routes";
import User from "../models/User";

//Join Post
export const postJoin = async (req, res) => {
  const {
    body: { name, email, password }
  } = req;
  try {
    const user = await User({
      name,
      email
    });
    await User.register(user, password);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }

  //Post Login
};
export const postLogin = passport.authenticate(
  "local",
  {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: "Welcome",
    failureFlash: "Can't log in. Check email and/or password"
  }
  //   async (req, res) => {
  //     try {
  //       await User.findByIdAndUpdate(res.id, {
  //         updatedAt: Date.now()
  //       });

  //       res.status(200);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
);

export const LoginTimeUpdate = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      updatedAt: Date.now()
    });
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

// export const postLogin = (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//       console.log(user);
//       if (err) return next(err);
//       if (!user) {
//         return res.redirect(routes.login);
//       }
//       req.login(user, async err => {
//         if (err) return next(err);
//         console.log(res);
//         await User.findByIdAndUpdate(user.id, {
//           updatedAt: Date.now()
//         });
//         return res.redirect(routes.home);
//       })(req, res, next);
//     });
//   };

//Log Out
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};

export const postFindPassword = async (req, res) => {
  //email 받아 이메일에 패스워드 전송
  //   const {
  //     body: { email }
  //   } = req;

  try {
    console.log(req.user);
    const randomPassword = Math.random()
      .toString(36)
      .substr(2, 5);
    await req.user.setPassword(randomPassword);
    req.user.save();
    res.json({ password: randomPassword }).status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

//email search
export const search = async (req, res) => {
  const {
    query: { email: email }
  } = req;
  let users = [];
  try {
    users = await User.find({
      email: { $regex: email, $options: "i" }
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
