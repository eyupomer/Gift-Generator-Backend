const {PrismaClient} = require("@/generated/prisma")
const { createConflictError, createNotFoundError} = require('@/utils/errors')

const prisma = new PrismaClient()

// Subscribe to newsletter
const subscribe = async (email) => {
    const existingSubscription = await prisma.newsletter.findUnique({
        where: {email}
    })
    if (existingSubscription) {
        if (existingSubscription.isActive) {
            throw createConflictError("Email already subscribed");
        } else {
            const updatedSubscription = await prisma.newsletter.update({
                where: {email},
                data: {isActive: true}
            })

            return {
                success: true,
                message: "Newsletter subscription reactivated",
                email: updatedSubscription.email,
            }
        }
    }

    // Create new subscription
    const newSubscription = await prisma.newsletter.create({
        data: {email}
    })

    return {
        success: true,
        message: "Successfully subscribed to newsletter",
        email: newSubscription.email
    }
}

const unsubscribe = async (email) => {
    const subscription = await prisma.newsletter.findUnique({
        where: {email}
    })

    if (!subscription) {
        throw createNotFoundError("Email not found in newsletter list");
    }

    if (!subscription.isActive) {
        throw createConflictError("Email already unsubscribed")
    }

    await prisma.newsletter.update({
        where: {email},
        data: {isActive: false},
    })

    return {
        success: true,
        message: "Successfully unsubscribed from newsletter",
        email: subscription.email,
    }
}

const getAllSubscriptions = async () => {
    const subscriptions = await prisma.newsletter.findMany({
        where: {isActive: true},
        orderBy: {createdAt: 'desc'},
    })

    return {
        success: true,
        count: subscriptions.length,
        subscriptions: subscriptions.map((subscription) => ({
            id: subscription.id,
            email: subscription.email,
            createdAt: subscription.createdAt
        }))
    }
}

module.exports = {
    subscribe,
    unsubscribe,
    getAllSubscriptions,
}