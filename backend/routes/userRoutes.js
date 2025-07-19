import express from "express";
import authorization from "../middleware/authorization.js";
import { login, register, viewAllUsers, viewOneUser, updateUser, deleteUser }  from "../controllers/userController.js";

const router = express.Router();

router.post("/login", login);
router.post("/", register);
router.get("/", authorization, viewAllUsers);
router.get("/:id", authorization, viewOneUser);
router.put("/:id", authorization, updateUser);
router.delete("/:id", authorization, deleteUser);

export default router;