import express, { Router } from "express";
import authController from "./auth.controller";
import { validate } from "../middlewares/validator";
import checkToken from "../middlewares/checkAdmin";
import checkAdmin from "../middlewares/checkAdmin";

const router: Router = express.Router();

router.post("/", validate.Signup, authController.signup);
router.post("/login", validate.Signup, authController.login);
router.patch("/", [checkToken, checkAdmin], authController.setAsAdmin);

export default router;
