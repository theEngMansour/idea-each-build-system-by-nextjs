"use server"

import push from "web-push"

push.setVapidDetails(
        "https://your-website.com",
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
        process.env.VAPID_PRIVATE_KEY!
)

// Store subscription in a more production-ready way
// In production, you'd use a database instead of a module variable
let subscription: push.PushSubscription | null = null

// Helper function to convert browser PushSubscription to web-push format
function convertToWebPushSubscription(browserSub: PushSubscription): push.PushSubscription {
    const p256dh = browserSub.getKey("p256dh")
    const auth = browserSub.getKey("auth")

    if (!p256dh || !auth) {
        throw new Error("Missing required keys in push subscription")
    }

    return {
        endpoint: browserSub.endpoint,
        keys: {
            p256dh: Buffer.from(p256dh).toString("base64"),
            auth: Buffer.from(auth).toString("base64"),
        },
    }
}

export async function subscribeUser(sub: PushSubscription) {
    try {
        // Convert browser subscription to web-push format
        subscription = convertToWebPushSubscription(sub)

        // In a production environment, you would want to store the subscription in a database
        // For example: await db.subscriptions.create({ data: webPushSub })

        return {success: true}
    } catch (error) {
        console.error("Error subscribing user:", error)
        return {success: false, error: "Failed to subscribe user"}
    }
}

export async function unsubscribeUser() {
    subscription = null
    // In a production environment, you would want to remove the subscription from the database
    // For example: await db.subscriptions.delete({ where: { ... } })
    return {success: true}
}

export async function sendNotification(message: string) {
    if (!subscription) {
        throw new Error("No subscription available")
    }

    try {
        await push.sendNotification(
                subscription, // Now this is the correct web-push type
                JSON.stringify({
                    title: "Test Notification",
                    body: message,
                    icon: "/icon.png",
                })
        )
        return {success: true}
    } catch (error) {
        console.error("Error sending push notification:", error)
        return {success: false, error: "Failed to send notification"}
    }
}
