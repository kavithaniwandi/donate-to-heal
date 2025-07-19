import express from "express";
import authorization from "../middleware/authorization.js";
import { login, register, viewAllUsers, viewOneUser, updateUser, deleteUser }  from "../controllers/userController.js";
import { upload } from "../server.js";

const router = express.Router();

router.post("/login", login);
router.post("/", register);
router.get("/", authorization, viewAllUsers);
router.get("/:id", authorization, viewOneUser);
router.put("/:id", authorization, updateUser);
router.delete("/:id", authorization, deleteUser);

router.post("/", upload.single("profileImage"), register);

export default router;