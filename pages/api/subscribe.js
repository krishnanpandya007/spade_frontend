// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import web_push from "web-push"
// import createPushSubscription from "../../controllers/PushSubscriptions"
import prisma from "../../lib/prisma";
web_push.setVapidDetails('mailto:team.spadebeta@gmail.com', process.env.NEXT_PUBLIC_NOTIFICATION_KEY, process.env.NOTIFICATION_PRIVATE_KEY)


export default async (req, res) => {

    const { endpoint, expirationTime, keys } = req.body;
    if(typeof keys === 'object' && Object.keys(keys).includes('p256dh') && Object.keys(keys).includes('auth')){

        const { p256dh, auth } = keys;
        console.log("DEBUG_INFO::", req.body)
        const push_subscription = await prisma.pushSubscription.create({
            data: {
    
                endpoint,
                expirationTime,
                p256dh,
                auth
    
            }
        })
        console.log("RETURN::", push_subscription)

    } else {
        const p256dh = null, auth = null;
        const push_subscription = await prisma.pushSubscription.create({
            data: {
    
                endpoint,
                expirationTime,
                p256dh,
                auth
    
            }
        })

        console.log("RETURN::", push_subscription)
    }


    res.status(200).json({})

}



// export default createPushSubscription;

// export default function handler(req, res) {

//   // console.log(web_push.generateVAPIDKeys())

//   const subscription = req.body;

//   console.log("DEBUG:SUBS=>", subscription)
//   console.log("TYPE:",  typeof subscription)
//   console.log("DEBUG:SUBS=>", typeof subscription === 'object' ? Object.keys(subscription) : "Not Object")
//   console.log("Inner")
//   Object.keys(subscription).map((val, idx) => {
//     console.log(val, " | ", typeof val)
//   })

//   res.status(201).json({});

//   const payload = JSON.stringify({ title: 'New Post Added!' })

//   web_push.sendNotification(subscription, payload).catch((err) => console.log("Error while notify(ing) user: ", err))
  

// }
