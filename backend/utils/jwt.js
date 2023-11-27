const sendToken = (user, statusCode, res) => {
  //creating JWT Token
  const token = user.getJwtToken();
  //setting cokkies to send token
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ), //7 days
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = sendToken;
