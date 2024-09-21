import Router from "express";
import userController from "../controller/user.controller.js";
import { authJwtMdw } from "../middlewares/auth.middleware.js";
const router = new Router();

router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.get("/user", authJwtMdw, userController.getUsers);
router.get("/user/:id", authJwtMdw, userController.getOneUser);
router.patch("/user", authJwtMdw, userController.updateUser);
router.delete("/user", authJwtMdw, userController.deleteUser);

export default router;
