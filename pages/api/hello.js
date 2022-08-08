// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  res.setHeader('Content-Type', 'application/json')

  // res.setHeader('Location', '/')
res.redirect(307, '/')
  res.setHeader('Content-Type', 'application/json')
  

}
