
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../middleware/isAuthenticated.js";


const router = express.Router();

// Step 1: Redirect the user to Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Step 2: Handle Google's callback

router.get("/google/callback", (req, res, next) => {
  console.log("Google callback route reached");

  passport.authenticate(
    "google",
    { session: false },
    (err, user, info) => {
      if (err) {
        console.error("GOOGLE OAUTH ERROR:", err.message);
        console.error("OAUTH RESPONSE:", err.oauthError?.data);

        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=google_failed`
        );
      }

      if (!user) {
        console.error(
          "GOOGLE AUTH FAILED:",
          info?.message || info || "No user returned"
        );

        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=google_failed`
        );
      }

      try {
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          process.env.SECRET_KEY,
          { expiresIn: "7d" }
        );

        return res.redirect(
          `${process.env.FRONTEND_URL}/auth-success?token=${token}`
        );
      } catch (error) {
        console.error("JWT ERROR:", error.message);

        return res.redirect(
          `${process.env.FRONTEND_URL}/login?error=google_failed`
        );
      }
    }
  )(req, res, next);
});


// Step 3: Get the authenticated user
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;

