const authService = require("@/services/auth");
const { isValidEmail, isValidPassword } = require("@/utils/validations");

const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    //Validation
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, password and name are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Call service
    const result = await authService.createUser(email, password, name);

    res.status(201).json(result);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "E-mail and password are required",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const result = await authService.loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id

    const result = await authService.deleteUser(userId)

      res.status(200).json(result)
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      })
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

module.exports = {
  register,
  login,
  deleteAccount,
};
