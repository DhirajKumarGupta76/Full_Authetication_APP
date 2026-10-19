
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { User } from "../Models/userModel.js";
// console.log("Google Client ID loaded:", !!process.env.GOOGLE_CLIENT_ID);
// console.log("Google Client Secret loaded:", !!process.env.GOOGLE_CLIENT_SECRET);
// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
//     },

//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         // Check whether the user already exists in MongoDB.
//         let user = await User.findOne({
//           googleId: profile.id,
//         });

//         // If the user does not exist, create a new user.
//         if (!user) {
//           user = await User.create({
//             googleId: profile.id,
//             username: profile.displayName,
//             email: profile.emails?.[0]?.value,
//             avatar: profile.photos?.[0]?.value,
//           });
//         }

//         // Pass the authenticated user to Passport.
//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );


import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../Models/userModel.js";

// Check whether Google OAuth credentials are loaded.
console.log("Google Client ID loaded:", !!process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret loaded:", !!process.env.GOOGLE_CLIENT_SECRET);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      // callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        // Step 1: Get the user's email from the Google profile.
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("Google account did not provide an email address"),
            null
          );
        }

        // Step 2: Check whether this Google account already exists.
        let user = await User.findOne({
          googleId: profile.id,
        });

        if (user) {
          return done(null, user);
        }

        // Step 3: Check whether this email already belongs to an account.
        user = await User.findOne({ email });

        if (user) {
          // Do not create a duplicate email or automatically link accounts.
          return done(null, false, {
            message:
              "An account with this email already exists. Please sign in using your existing login method.",
          });
        }

        // Step 4: Create a new user for a new Google account.
        user = await User.create({
          googleId: profile.id,
          username: profile.displayName || "Google User",
          email: email,
          avatar: profile.photos?.[0]?.value || null,
          isLoggedIn:true,
          isverified: true,
        });

        // Step 5: Pass the authenticated user to Passport.
        return done(null, user);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error, null);
      }
    }
  )
);

export default passport;
