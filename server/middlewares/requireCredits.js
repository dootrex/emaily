module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    //w3.org documentation tells you about all static codes
    return res.status(403).send({ error: "Thou must add money" });
  }
  next();
};
