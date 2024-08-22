import express, { Router } from "express";
const router: Router = express.Router();
import taskRoutes from "../task/task.routes";
import authRoutes from "../auth/auth.routes";

router.use("/task", taskRoutes);
router.use("/auth", authRoutes);

export default router;
