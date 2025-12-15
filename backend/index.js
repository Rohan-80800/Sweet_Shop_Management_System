import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import sweetRouter from "./routes/sweet.routes.js";
import cors from "cors";
import isAuth from "./middlewares/isAuth.js";

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/sweets", isAuth, sweetRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running on ${port}`);
    connectDB();
  });
}

export default app;
