import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  // passport가 user가 담긴 object를 req에도 올려주므로 바로 사용이 가능하다
  res.locals.loggedUser = req.user || null;
  // request(요청)과 response(응답) 사이(middle)에 있으므로
  next();
};

// 공개된 routes의 미들웨어
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
// 비공개 routes의 미들웨어
export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
