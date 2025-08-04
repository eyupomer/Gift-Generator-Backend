const {createAuthenticationError} = require("@/utils/errors")

const requireAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            throw createAuthenticationError("User not autthenticated")
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            })
        }

        next()
    } catch (error) {
        if (error.statusCode) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message
            })
        }

        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

module.exports = {
    requireAdmin
}