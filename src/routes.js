const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//User
const USERS = "/users";
const USER_DETAIl = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const PASSWORDFIND = "/password-find";
const LOGINTIME = "/login-time";
const ME = "/me";

//Friend
const FRIEND = "/friend";
const FRIEND_LIST = "/:id/list";
const FRIEND_ADD = "/:id/add";
const FRIEND_DELETE = "/:id/delete";
const FRIEND_ACCEPT = "/:id/accept";
const FRIEND_REQUEST_LIST = "/:id/request-list";

//summary
const SUMMARY = "/summary";
const SUMMARY_ADD = "/:id/add";
const SUMMARY_LIST = "/:id/list";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  search: SEARCH,
  logout: LOGOUT,
  friend: FRIEND,
  summary: SUMMARY,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIl;
  },
  users: USERS,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  me: ME,
  loginTime: LOGINTIME,
  passwordFind: PASSWORDFIND,
  friendAdd: id => {
    if (id) {
      return `/friend/${id}/add`;
    }
    return FRIEND_ADD;
  },
  friendDelete: id => {
    if (id) {
      return `/friend/${id}/delete`;
    }
    return FRIEND_DELETE;
  },
  friendAccept: id => {
    if (id) {
      return `friend/${id}/accept`;
    }
    return FRIEND_ACCEPT;
  },
  friendRequestList: id => {
    if (id) {
      return `friend/${id}/request-list`;
    }
    return FRIEND_REQUEST_LIST;
  },
  friendList: id => {
    if (id) {
      return `friend/${id}/list`;
    }
    return FRIEND_LIST;
  },
  summary_add: id => {
    if (id) {
      return `summary/${id}/add`;
    }
    return SUMMARY_ADD;
  },
  sumamry_list: id => {
    if (id) {
      return `summary/${id}/list`;
    }
    return SUMMARY_LIST;
  }
};

export default routes;
