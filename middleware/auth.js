const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@/generated/prisma");
const { createAuthenticationError } = require("@/utils/errors");

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw createAuthenticationError("Access token required");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      throw createAuthenticationError("User not found");
    }

    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
      });
    }
    res.status(500).json({
        success:false,
        message: 'Server error'
    })
  }
};

module.exports = {
    authenticateToken
}
