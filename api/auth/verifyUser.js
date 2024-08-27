function verifyUser(req, res, next) {
  if (!req.user || !req.user.id) {
    return res.status(401).send("You must be logged in to do that.");
  }
  next();
}

module.exports = {
  verifyUser,
};
