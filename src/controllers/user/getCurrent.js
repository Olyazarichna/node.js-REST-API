const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  console.log(req.user);
  res.json({
    email,
    subscription,
  });
};

module.exports = getCurrent;
