import routes from "../routes";
import User from "../models/User";
import Friend from "../models/Friend";

//Post ADD Friend
export const postAddFriend = async (req, res) => {
  const {
    params: { id },
    body: { friend_id }
  } = req;
  try {
    const user = await User.findById(friend_id);
    const newFriend = await Friend.create({
      userId: id
    });
    user.friends.push(newFriend);
    user.save();
    res.status(200).json({ result: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//Post Delete Friend
export const deleteFriend = async (req, res) => {
  const {
    params: { id },
    body: { friend_id }
  } = req;
  try {
    const users = await User.findById(id);
    if (users.id !== req.user.id) {
      throw Error();
    }
    await Friend.findOneAndRemove({ _id: friend_id });
    res.status(200).json({ result: "ok" });
  } catch (error) {
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};
//Post Add Friend Accept
export const AddFirendAccept = async (req, res) => {
  const {
    params: { id },
    body: { friend_id }
  } = req;
  try {
    const users = await User.findById(id);
    if (users.id !== req.user.id) {
      throw Error();
    }
    //Todo
    await Friend.findOneAndUpdate({ _id: friend_id }, { consent: true });
    res.status(200).json({ result: "ok" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ result: "error" });
  } finally {
    res.end();
  }
};

//
export const requestFirendList = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    let usersFirend = [];
    usersFirend = await User.findById(id).populate({
      path: "friends",
      match: { consent: false }
    });
    if (!usersFirend.friends.length > 0) {
      res.json({
        users: usersFirend.friends,
        requestCnt: usersFirend.friends.length
      });
    } else {
      let result = await Promise.all(
        usersFirend.friends.map(async friend => {
          let user = await User.findById(friend.userId);
          return {
            name: user.name,
            email: user.email,
            id: user._id
          };
        })
      );

      res.json({ users: result, requestCnt: result.length });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

export const friendList = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    let usersFirend = [];
    usersFirend = await User.findById(id).populate({
      path: "friends",
      match: { consent: true }
    });
    if (!usersFirend.friends.length > 0)
      res.json({ users: usersFirend.friends });
    else {
      let result = await Promise.all(
        usersFirend.friends.map(async friend => {
          let user = await User.findById(friend.userId);
          return {
            name: user.name,
            email: user.email,
            id: user._id
          };
        })
      );
      res.json(result);
    }
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
