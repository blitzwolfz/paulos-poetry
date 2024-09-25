import { Router } from "express";
import bcrypt from "bcrypt";
import { getDb } from "../db";
import jwt from "jsonwebtoken";

export const userRouter = Router();

// Run dotenv config
// require("dotenv").config();

// ------------------ REGISTER ------------------
userRouter.route("/register").post(async (req, res) => {
  const collection = getDb().collection("users");
  // const email = req.body.email;
  // const password = req.body.password;
  const { email, password, firstName, lastName } = req.body;

  // Generate salt and hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Check if user already exists
  const user = await collection.findOne({ email: email });
  if (user) return res.status(409).json({ error: "User already exists" });

  // Insert user to database
  const additionalUserData = {
    role: "basic",
    level: "1",
    profilePicture: "",
    createdAt: Date.now(),
  };

  await collection.insertOne({ email, password: hashedPassword, firstName, lastName, ...additionalUserData });
  res.json({ message: "User successfully registered" });
});

// ------------------ LOGIN ------------------
userRouter.route("/login").post(async (req, res) => {
  try {
    const collection = getDb().collection("users");

    const email = req.body.email;
    const password = req.body.password;
    const user = await collection.findOne({ email });

    // Compare emails
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const id = user._id;

    // Compare passwords
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) return res.status(401).json({ error: "Invalid username or password" });

    // Beyond this point, the user is authenticated
    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: "Internal server error" });

    // Generate JWT
    // The user information that is sent to the client
    const clientUser = {
      id,
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      profilePicture: user.profilePicture,
      level: user.level,
      role: user.role,
    };
    const token = jwt.sign(clientUser, secret, { expiresIn: "1h" });

    // Return user id
    res.json({ ...clientUser, token });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ------------------ LOGIN BY JWT ------------------
userRouter.route("/loginByToken").get(async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  // Check if there is a token
  // I don't want to return an error status because it could be somebody's first time on the site
  if (!token) return res.json({ message: "No token provided" });

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // Return user id
    return res.status(200).json(decoded);
  } catch (err) {
    // If token is invalid, return an error
    return res.status(401).json({ error: "Invalid token" });
  }
});
