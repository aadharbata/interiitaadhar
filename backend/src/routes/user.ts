import express, { Request, Response } from "express"; 
import { PrismaClient } from "@prisma/client";
import { hashPassword, verifyPassword } from '../hash'; 
import { z } from "zod";
import jwt from "jsonwebtoken";

const JWT_SECRET = "__RANDOM__@@";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Define schemas for signup and signin
const signupSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string(),
});

const signinSchema = z.object({
  email: z.string().email({ message: "Must be a valid email" }),
  password: z.string(),
});

// Create a new Express router
const router = express.Router();

// POST /signup route
router.post("/signup", async (req: any, res: any) => {
  const { success, error } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: error.errors, 
    });
  }
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ 
        message: "Email already taken",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    return res.status(200).json({ 
      message: "User created successfully",
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "An error occurred while signing up",
    });
  }
});

// POST /signin route
router.post("/signin", async (req: any, res: any) => {
  const { success, error } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: error.errors, 
    });
  }
  
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const storedHash = user.password;
    const isPasswordValid = await verifyPassword(storedHash, password);

    if (!isPasswordValid) {
      return res.status(403).json({ error: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    return res.status(200).json({ 
      message: "User signed in successfully",
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      message: "An error occurred while signing in",
    });
  }
});

export default router;
