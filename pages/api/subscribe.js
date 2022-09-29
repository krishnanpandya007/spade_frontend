// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import web_push from "web-push"

web_push.setVapidDetails('mailto:team.spadebeta@gmail.com', process.env.NEXT_PUBLIC_NOTIFICATION_KEY, process.env.NOTIFICATION_PRIVATE_KEY)

export default function handler(req, res) {

  // console.log(web_push.generateVAPIDKeys())

  const subscription = req.body;

  console.log("DEBUG:SUBS=>", subscription)
  console.log("TYPE:",  typeof subscription)
  console.log("DEBUG:SUBS=>", typeof subscription === 'object' ? Object.keys(subscription) : "Not Object")
  console.log("Inner")
  Object.keys(subscription).map((val, idx) => {
    console.log(val, " | ", typeof val)
  })

  res.status(201).json({});

  const payload = JSON.stringify({ title: 'New Post Added!' })

  web_push.sendNotification(subscription, payload).catch((err) => console.log("Error while notify(ing) user: ", err))
  

}
