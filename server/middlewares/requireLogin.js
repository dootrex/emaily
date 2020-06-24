//as the name suggest this checks for the coming in api request if the user is logged in

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "Thou must login" });
  }
  next();
};
