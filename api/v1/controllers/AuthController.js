const AuthService = require("../services/AuthService");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw {
        status: 400,
        message: "Email and password fields must be provided"
      }
    }
    const user = await AuthService.login({ email, password });
    return res.json(user);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json(error?.message || error);
  }
}

const handlePasswordResetRequest = async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      throw {
        status: 400,
        message: "No email provided"
      }
    }
    await AuthService.handlePasswordResetRequest(email);
    return res.json({ status: 'OK' });
  } catch(error) {
    return res
      .status(error?.status || 500)
      .json(error?.message || error);
  }
}

const resetPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const password = req.body.password;
    const user = await AuthService.resetPassword(userId, password);
    return res.json(user);
  } catch (error) {
    return res
      .status(error?.status || 500)
      .json(error?.message || error);
  }
}

module.exports = {
  login,
  resetPassword,
  handlePasswordResetRequest
}