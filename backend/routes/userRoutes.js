import express from "express";
import authorization from "../middleware/authorization.js";

import { login, register, viewAllUsers, viewOneUser, updateUser, deleteUser }  from "../controllers/userController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/login", login);
router.post("/", upload.single("profileimage"), register);
router.get("/", viewAllUsers);
router.get("/:id", authorization, viewOneUser);
router.put("/:id", authorization, updateUser);
router.delete("/:id", authorization, deleteUser);

export default router;