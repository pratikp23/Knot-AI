import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import crypto from "crypto";

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

    const sessionId = crypto.randomUUID();

    res.cookie("session", sessionId, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ error: "Login failed" });
  }
};
