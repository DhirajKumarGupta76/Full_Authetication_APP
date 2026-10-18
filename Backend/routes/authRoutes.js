
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
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
  }),
  (req, res) => {
    try {
      const user = req.user;

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "7d" }
      );
//After successful login, the browser should redirect to:
      res.redirect(
        `${process.env.CLIENT_URL}/auth-success?token=${token}`
      );
    } catch (error) {
      console.error("Google login error:", error);

      res.redirect(
        `${process.env.CLIENT_URL}/login?error=google_failed`
      );
    }
  }
);

// Step 3: Get the authenticated user
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;

