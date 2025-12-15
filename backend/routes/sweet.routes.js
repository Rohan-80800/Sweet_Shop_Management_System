import express from "express";
import isAuth from "../middlewares/isAuth.js";
import authorizeRole from "../middlewares/authorizeRole.js";
import { upload } from "../middlewares/multer.js";

import {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../controllers/sweet.controllers.js";

const router = express.Router();

router.get("/", isAuth, getSweets);
router.get("/search", isAuth, searchSweets);

router.post(
  "/",
  isAuth,
  authorizeRole("admin"),
  upload.single("image"),
  addSweet
);
router.put(
  "/:id",
  isAuth,
  authorizeRole("admin"),
  upload.single("image"),
  updateSweet
);
router.delete("/:id", isAuth, authorizeRole("admin"), deleteSweet);

router.post("/purchase", isAuth, purchaseSweet);
router.post("/:id/restock", isAuth, authorizeRole("admin"), restockSweet);

export default router;
