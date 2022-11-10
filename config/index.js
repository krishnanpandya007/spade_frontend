
export const BACKEND_ROOT_URL = process.env.NODE_ENV === "development" ? 'http://127.0.0.1:8000/' : 'https://core.backend-61489.spadebeta.in/'
export const FRONTEND_ROOT_URL = process.env.NODE_ENV === "development" ? 'http://127.0.0.1:3000/' : 'https://www.spadebeta.in/'
export const DOCS_ROOT_URL = 'https://docs.spadebeta.in/'

export const defaultBorderColor = '#bdbdbd'
export const NEW_UNCOMPLETED_PROFILE_PREFFIX = 'NEW_'

// Spade Core-Id/Secret 
export const CLIENT_ID = 'V44iomZHWwpZvATuBYUjMKEl5y0BbUEFMPgc0LP3'

export const CLIENT_SECRET = process.env.NODE_ENV === "development" ? 'pbkdf2_sha256$320000$QxV0wNwbJPiIEEA0qtsaDF$dmzFPWhPCRIbVTF7DTFRmji/ciyCXkhy/qHhoptcENU=' : '5vmkPjmtTqp3gkRxeKNYwg5SImnqXcVKMzRZP0lkyK22dPbrnxUB45gNrnNW21REGVxfm0ziq0kJm8D9uYnnQBfQS2wpsmPKDyQ17cgJB93XO3nvs5QCMzNeXXqgElrg'

export const SOCIAL_ACCOUNT_ACCESS_KEY = "ThisRandomKey69IsSomethingBig";


export const IMAGE_COMPRESSION_THRESHOLD = 0.7 // If image is bigger then 700 kb, compress it!