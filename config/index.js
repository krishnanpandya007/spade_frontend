
export const BACKEND_ROOT_URL = process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8000/' : 'http://159.65.152.43/'
export const FRONTEND_ROOT_URL = process.env.NODE_ENV === "development" ? 'http://127.0.0.1:3000/' : 'https://www.spadebeta.in/'

export const defaultBorderColor = '#bdbdbd'

// Spade Core-Id/Secret
export const CLIENT_ID = 'cCTTnSfqe0p3HtVJlgF1LSEEszZkJX4uNmRIYIRe'

export const CLIENT_SECRET = process.env.NODE_ENV === "development" ? 'pbkdf2_sha256$320000$QxV0wNwbJPiIEEA0qtsaDF$dmzFPWhPCRIbVTF7DTFRmji/ciyCXkhy/qHhoptcENU=' : 'ousK9Ltw9QRV27ITeBsLjMd1vRWIqnpiDabjZuzSTILJKbrwwnqk2cAkhzv2gw1TYSxcIUsvLuJ52M8WGozG9QRfPXiRXkucZ9p4u0qxjRS3rLbh7XiR4bDLNs7GdGnA'

export const SOCIAL_ACCOUNT_ACCESS_KEY = "ThisRandomKey69IsSomethingBig";