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
app.set("trust proxy", 1);
const port = process.env.PORT || 5000;

const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }
      if (
        origin === process.env.FRONTEND_URL 
      ) {
        return callback(null, true);
      }

      console.warn("CORS blocked origin:", origin);
      return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
