import prisma from "../lib/prisma";

const createPushSubscription = async (req, res) => {

    const { endpoint, expirationTime, keys } = req.body;
    const { p256dh, auth } = keys;

    const push_subscription = await prisma.pushSubscription.create({
        data: {

            endpoint,
            expirationTime,
            p256dh,
            auth

        }
    })

    res.status(200).json({})

}

export default createPushSubscription