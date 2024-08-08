function requireUser(req, res, next) {
  if (!req.user || !req.user.user_id) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
}

module.exports = {
  requireUser
};
