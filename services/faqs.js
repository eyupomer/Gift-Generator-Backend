const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@/generated/prisma")
const {createConflictError, createValidationError, createNotFoundError} = require('@/utils/errors')

const prisma = new PrismaClient()

// Create faqs service
const createFaq = async (question, answer) => {

    // Create faq
    const newUser = await prisma.faqs.create({
        data: {
            question,
            answer
        }
    })

    // Response
    return {
        success: true,
        message: "Faq created successfully",
        token,
        faq: {
           question,
           answer
        }
    }
}

module.exports = {
    createFaq,
}