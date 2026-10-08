import express, { type Request, type Response, type Router } from "express";
const router: Router = express.Router();
import User from "../models/Users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authUser from "../middlewares/authUser.js";
import nodemailer from "nodemailer";

router.post("/login", async (req: Request, res: Response) => {
  const userCredential: Readonly<{ email: string; password: string }> =
    req.body;
  // Check if user exists
  const resFindOne = await User.findOne({
    where: { email: userCredential.email },
  });
  if (!resFindOne) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
      data: null,
    });
  }

  const {
    created_at,
    updated_at,
    password,
    auth_type_id,
    id,
    last_active_at,
    ...user
  } = resFindOne.toJSON();
  // Check if password matches
  const userCheck: boolean = await bcrypt.compare(
    userCredential.password,
    password
  );

  if (!userCheck) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
      data: null,
    });
  }

  // Create JWT token and send it in response
  // TODO: This should be moved to a separate function and should be used in other routes as well
  const token = jwt.sign(
    { id: id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  // Send the token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    partitioned: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: user,
  });
});

router.post("/logout", (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
      data: null,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
      data: null,
    });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  const userData: Readonly<{ name: string; email: string; password: string }> =
    req.body;

  const hashPassword: string = await bcrypt.hash(userData.password, 13);

  const customUserData: Readonly<{
    name: string;
    email: string;
    password: string;
    auth_type_id: number;
  }> = {
    ...userData,
    password: hashPassword,
    auth_type_id: 1,
  };
  try {
    const isExist = await User.findOne({ where: { email: userData.email } });
    if (!isExist) {
      const createdUser = await User.create(customUserData);
      const { password, auth_type_id, updated_at, ...userResponse } =
        createdUser.toJSON();
      res.status(200).json({
        success: true,
        message: "User created successfully",
        data: userResponse,
      });
    } else {
      res.status(409).json({
        success: false,
        message: "User already exists",
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create user",
      data: error,
    });
  }
});
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
router.post("/forgot-password", async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = User.findOne({ where: { email } });
  if (user) {
    const resetToken = jwt.sign(
      { id: (user as any).id, email },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );
    const resetLink = `${process.env.CLIENT_URL}/auth/reset-password/?token=${resetToken}`;
    await transporter.sendMail({
      from: `"Task Manager" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Reset your Task Manager password",

      html: `
              <div>
                <h2>Reset your password</h2>
        
                <p>
                  You requested to reset your Task Manager password.
                </p>
        
                <p>
                  Click the button below to create a new password.
                </p>
        
                <a
                  href="${resetLink}"
                  style="
                    display:inline-block;
                    padding:10px 18px;
                    background:#2563eb;
                    color:white;
                    text-decoration:none;
                    border-radius:6px;
                  "
                >
                  Reset Password
                </a>
        
                <p>
                  This link will expire in 15 minutes.
                </p>
        
                <p>
                  If you didn't request this, you can safely ignore this email.
                </p>
              </div>
            `,
    });
  }
  res.status(200).json({
    success: true,
    message: "If the email exists, a reset link has been sent.",
    data: null,
  });
});
router.post("/reset-password", async (req: Request, res: Response) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const hashPassword = bcrypt.hashSync(password, 13);
    await User.update(
      { password: hashPassword },
      { where: { email: (decoded as any).email } }
    );
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid or expired token",
      data: null,
    });
  }
  res.send("reset password route");
});
router.get("/me", authUser, async (req: Request, res: Response) => {
  try {
    const apiRes = await User.findOne({ where: { id: req.user?.id } });
    const { password, auth_type_id, updated_at, ...userResponse } =
      apiRes?.toJSON() || {};
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: userResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      data: error,
    });
  }
});

export default router;
