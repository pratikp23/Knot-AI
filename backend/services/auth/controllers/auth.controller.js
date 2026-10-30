import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";



// Login function that verifies Firebase ID token, creates a user if not exists, generates a session ID, stores it in Redis, and sets a secure cookie.
export const login = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Firebase ID token is required" });
    }

    const decoded = await getAuth(app).verifyIdToken(token);
    let user = await User.findOne({
      firebaseId: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseId: decoded.uid,
        email: decoded.email,
        username: decoded.name,
        avatar: decoded.picture,
      });
    }

    // Generating a unique session ID and store it in Redis
    const sessionId = crypto.randomUUID();
    await redis.set(`session:${sessionId}`, JSON.stringify({
      userId: user._id,
      name: user.username,
      email: user.email,
      avatar: user.avatar
    }), "EX", 7 * 24 * 60 * 60); // Session expires in 7 days


    // Setting the session ID in a secure, HTTP-only cookie
    res.cookie("session", sessionId, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ error: `Login failed` });
  }
};


// Logout function that deletes the session from Redis and clears the cookie.
export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies?.session;
    if (!sessionId) {
      return res.status(400).json({ error: "No session found" });
    }

    await redis.del(`session:${sessionId}`);
    res.clearCookie("session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout failed:", error);
    return res.status(500).json({ error: `Logout failed: ${error.message}` });
  }
};
