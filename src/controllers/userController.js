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
    res.status(200).json({ result: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }

  //Post Login
};
export const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  successFlash: "ok",
  failureFlash: "Can't log in. Check email and/or password",
  successMessage: "ok",
  failureMessage: "error"
});

export const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
  successFlash: "ok",
  failureFlash: "can't log in at this time"
});

export const googleLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { sub, name, email }
  } = profile;
  try {
    console.log("asd");
    const user = await User.findOne({ email });
    if (user) {
      // 동일한 이메일이 발견됐을 경우
      user.googleId = sub;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: sub
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleLogin = async (req, res) => {
  const users = await User.findById({ _id: req.user.id });

  res.status(200).json({ result: "ok", name: users.name, id: users._id });
  res.end();
  // res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "ok",
  failureFlash: "can't log in at this time"
});

export const facebookLoginCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, name, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      // 동일한 이메일이 발견됐을 경우
      user.facebookId = id;
      // user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id
      // avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => {
  res.status(200).json({ result: "ok" });
  res.end();
  // res.redirect(routes.home);
};

export const LoginTimeUpdate = async (req, res) => {
  const {
    body: { email }
  } = req;

  try {
    const users = await User.findOne({ email });

    if (users.id === req.user.id) {
      await User.findByIdAndUpdate(req.user.id, {
        updatedAt: Date.now()
      });
      res.status(200).json({ result: "ok" });
    } else {
      res.status(400).json({ result: "error" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
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
  try {
    req.logout();
    res.status(200).json({ result: "ok" });
  } catch (error) {
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400).json({ result: "error" });
      //res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.status(200).json({ result: "ok" });
  } catch (error) {
    res.status(400).json({ result: "error" });
    //res.redirect(`/users${routes.changePassword}`);
  } finally {
    res.end();
  }
};

export const postFindPassword = async (req, res) => {
  //  email 받아 이메일에 패스워드 전송
  const {
    body: { email }
  } = req;

  try {
    const users = await User.findOne(email);
    if (users.id === req.user.id) {
      const randomPassword = Math.random()
        .toString(36)
        .substr(2, 5);
      await req.user.setPassword(randomPassword);
      req.user.save();
      res.json({ password: randomPassword, result: "ok" }).status(200);
    } else {
      res.status(400).json({ result: "error" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//email search
export const search = async (req, res) => {
  const {
    query: { email: email }
  } = req;

  try {
    const users = await User.findOne({
      email: { $regex: email, $options: "i" }
    });
    const user = { id: users._id, name: users.name, email: users.email };
    res.json(user).status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//이메일 찿기
export const emailFind = async (req, res) => {
  const {
    query: { email }
  } = req;
  try {
    const user = await User.findOne({ email });
    res.json(user).status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};
