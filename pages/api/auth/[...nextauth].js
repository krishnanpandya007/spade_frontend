import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import cookie from 'cookie'
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL, SOCIAL_ACCOUNT_ACCESS_KEY } from "../../../config/index"
import { validate_user } from "../../../components/authenticate_user"

// The session is automatically loaded when the
// `authenticate` method is called.
export default async function auth(req, res){

  return NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({

        name: "Spade",

        credentials: {

          username: { label: "Username", type: 'text' },
          password: { label: "Password", type: 'password' },

        },

        async authorize(credentials, req) {

          // Make Call to backend for access_token and refresh_token

          const user = {id: 1, name: 'John Doe'}

          if (user) {

            return user;

          }else {

            return null

          }

        }


      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,      
      }),
      TwitterProvider({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
        version: "2.0",
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        checks: 'both',
        async authorize(credentials, req) {

          // Make Call to backend for access_token and refresh_token

          const user = {id: 1, name: 'John Doe'}

          if (user) {

            return user;

          }else {

            return null

          }

        }
        // authorization:{
        //   params:{
        //     scope:"openid https://www.googleapis.com/auth/gmail.send"
        //   }
        // }
      }),
      // ...add more providers here

    ],

    callbacks: {

      /*
      NOTE: Please dont go on below code formatting i am writing in sleep!
      */

      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        console.log("Access: ", token)
        console.log("Full Account: ", account)
        // token.accessToken = account.access_token
        const response = await fetch(`${BACKEND_ROOT_URL}apio/create/social_account/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({

            // token: account.access_token,
            provider:account.provider,
            social_account_access_key: SOCIAL_ACCOUNT_ACCESS_KEY,
            name: token.name,
            email: token.email,
            profile: token.profile

          })
        })

        const data = await response.json();

        console.log("Data: ", data);

        const { access_token, refresh_token, expires_in } = data;
        res.setHeader('Set-Cookie', [cookie.serialize(
          'access', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // If in-production => true; else false // *****HARDCODED******
            maxAge: expires_in, // In Seconds
            sameSite: 'strict',
            path: '/'
          }
          ),
          cookie.serialize(
            'refresh', refresh_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production", // If in-production => true; else false // *****HARDCODED******
              maxAge: expires_in, // In Seconds
              sameSite: 'strict',
              path: '/'
            }
            )
          ]
          );


          token.accessToken = account.access_token;

        return token;

      },

      async signIn({ user, account, profile, email, credentials }) {
        console.log("THAAY CHHE")
        console.log(user, account, profile, email, credentials)

        return true
      },
    },
    pages: {
      error: "social_account/error"
    },

    secret: process.env.NEXT_PUBLIC_SECRET


  })
}
