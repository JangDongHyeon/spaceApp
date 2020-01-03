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

//CHAT
const CHAT = "/chat";
const CHAT_LIST = "/:id/list";
const CHAT_ADD = "/:id/add";
const CHAT_CONTENT = "/:id/:room_index/content";
const CHAT_SUMMARY = "/:id/:room_index/summary";

//ROOM
const ROOM = "/room";
const ROOM_ADD = "/:id/add";
const ROOM_LIST = "/:id/list";
const ROOM_BOT_LEVEL = "/:id/bot";
const ROOM_INVITE = "/:id/invite";
const ROOM_EXILE = "/:id/exile";
const ROOM_EXIT = "/:id/exit";
const ROOM_BOT_MODE = "/:id/mode";
const ROOM_BOT_LANGUAGE = "/:id/language";

//Google
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

// Facebook
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  search: SEARCH,
  logout: LOGOUT,
  friend: FRIEND,
  summary: SUMMARY,
  room: ROOM,
  chat: CHAT,
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
  },
  room_add: id => {
    if (id) {
      return `room/${id}/add`;
    }
    return ROOM_ADD;
  },

  room_bot_level: id => {
    if (id) {
      return `room/${id}/bot`;
    }
    return ROOM_BOT_LEVEL;
  },
  room_bot_mode: id => {
    if (id) {
      return `room/${id}/mode`;
    }
    return ROOM_BOT_MODE;
  },
  room_bot_language: id => {
    if (id) {
      return `room/${id}/language`;
    }
    return ROOM_BOT_LANGUAGE;
  },
  room_invite: id => {
    if (id) {
      return `room/${id}/invite`;
    }
    return ROOM_INVITE;
  },
  room_exile: id => {
    if (id) {
      return `room/${id}/exile`;
    }
    return ROOM_EXILE;
  },
  room_exit: id => {
    if (id) {
      return `room/${id}/exit`;
    }
    return ROOM_EXIT;
  },
  chat_add: id => {
    if (id) {
      return `chat/${id}/add`;
    }
    return CHAT_ADD;
  },
  chat_list: id => {
    if (id) {
      return `chat/${id}/list`;
    }
    return CHAT_LIST;
  },
  chat_content: (id, room_index) => {
    if (id && room_index) {
      return `chat/${id}/${room_index}/content`;
    }
    return CHAT_CONTENT;
  },
  chat_summary: (id, room_index) => {
    if (id && room_index) {
      return `chat/${id}/${room_index}/summary`;
    }
    return CHAT_SUMMARY;
  },
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
  facebook: FB,
  facebookCallback: FB_CALLBACK
};

export default routes;
