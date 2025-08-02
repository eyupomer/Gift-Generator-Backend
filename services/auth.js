const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@/generated/prisma")
const {createConflictError, createValidationError, createNotFoundError} = require('@/utils/errors')

const prisma = new PrismaClient()

// Create user service
const createUser = async (email, password, name) => {
    // Check if user eixsts
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })
    if (existingUser) {
        throw createConflictError("User already exists")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        }
    })

    // Generate JWT token
    const token = jwt.sign(
        {userId: newUser.id, email: newUser.email},
        process.env.JWT_SECRET,
        {expiresIn: '7d'},
    )

    // Response
    return {
        success: true,
        message: "User created successfully",
        token,
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
        }
    }
}

// Login user service
const loginUser = async (email, password) => {
    // Find user
    const user = await prisma.user.findUnique({
        where: {email}
    })
    if (!user) {
        throw createNotFoundError("Invalid email or password")
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw createValidationError("Invalid email or password")
    }

    // Generate JWT Token
    const token = jwt.sign(
        {userId: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: "7d"},
    )

    // Response
    return {
        success: true,
        message: "Login successful",
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }
}

const deleteUser = async (id) => {
    // Find user
    const user = await prisma.user.findUnique({
        where: {id}
    })
    if (!user) {
        throw createNotFoundError("User not found")
    }
    const deletedUser = await prisma.user.delete({
        where: {id: parseInt(id)}
    })

    return {
        success: true,
        message: "Account deleted",
    }
}

module.exports = {
    createUser,
    loginUser,
    deleteUser
}