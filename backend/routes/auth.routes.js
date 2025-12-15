import express from "express";
import {
  signUp,
  signIn,
  signOut,
  me
} from "../controllers/auth.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const authRouter = express.Router();

authRouter.get("/me",isAuth, me);
authRouter.post("/register", signUp);
authRouter.post("/login", signIn);
authRouter.get("/signout", signOut);

export default authRouter;
