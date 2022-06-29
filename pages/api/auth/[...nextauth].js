import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import TwitterProvider from "next-auth/providers/twitter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import cookie from 'cookie'
import { BACKEND_ROOT_URL, SOCIAL_ACCOUNT_ACCESS_KEY } from "../../../config/index"
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
        checks: 'both'
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
  
/*
        
        if (account.provider === 'google') {
          
          const { access_token } = token;
          
          if (access_token) {
            console.log("Inside")
            

              console.log("Success Full Updations")

          } 

        } else if (account.provider === 'facebook') {

          const { accessToken } = token;
          
          if (accessToken) {
            
                const response = await fetch(`${BACKEND_ROOT_URL}auth/convert-token/`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                  },
                  body: JSON.stringify({
        
                    token: accessToken,
                    backend: 'google-oauth2',
                    grant_type: 'convert_token',
                    client_id: 'hk2vfzk2o8knXSpVx3434ru79YbScYeMHgvc5z6M',
                    client_secret: 'OeyrUmeEL7dKHqGXaq0QNfJfYdkvu5JwR6qYBt5ZNxBMPJZslR9vD7ajX4o4YGU25yA0LlcxFGK3AXuEP3vxmF2NvPo7BuihRinQdYfZDEAkxt1QkCPxFvHpXapmoR6T',
        
                  })
                })
            

            const { access_token, refresh_token, expires_in } = await response.json();

                res.setHeader('Set-Cookie', [cookie.serialize(
                  'access', access_token, {
                      httpOnly: true,
                      secure: false, // If in-production => true; else false // *****HARDCODED******
                      maxAge: expires_in, // In Seconds
                      sameSite: 'strict',
                      path: '/'
                      }
                  ),
                  cookie.serialize(
                    'refresh', refresh_token, {
                        httpOnly: true,
                        secure: false, // If in-production => true; else false // *****HARDCODED******
                        maxAge: expires_in, // In Seconds
                        sameSite: 'strict',
                        path: '/'
                        }
                    )
              ]
          );


          }

        }
        */

        // const access_token = token.accessToken ?? token.access_token ?? false;
        // // Provider: Google => access_token
        // // Provider: Facebook => accessToken

        // if(access_token){

        //   if (account) {
        //     })
          // const 
          token.accessToken = account.access_token;
        
        return token;
  
          // const body = await response.json();
  
          // console.log("Response: ", body)
  
          // const another_response = await fetch(`${BACKEND_ROOT_URL}account/user/`, {
          //   method: "GET",
          //   headers: {
          //     "Content-Type": "application/json",
          //     "Accept": "application/json",
          //     "Authorization": `Bearer ${body.access_token}`
          //   }
          // })
  
          // const another_body = await another_response.json();
  
          // console.log("Another Response: ", another_body);
  
        // } else {
        //   return null;
        // }
      },

    },

    secret: process.env.NEXT_PUBLIC_SECRET
    
  
  })
}