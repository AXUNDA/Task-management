import express, { Router } from "express";
import checkToken from "../middlewares/checkAdmin";
const router: Router = express.Router();
import { validate } from "../middlewares/validator";
import taskController from "./task.controller";

router.use(checkToken);
router.post("/", validate.CreateTask, taskController.createTask);
router.get("/", taskController.getTasks);
router
  .route("/:id")
  .get(validate.UUID, taskController.getTask)
  .patch(validate.updateTask, taskController.updateTask)
  .delete(validate.UUID, taskController.deleteTask)
  .put(validate.createComment, taskController.createComment);

router
  .route("/comments/:id")
  .delete(taskController.deleteComment)
  .patch(taskController.updateComment);

export default router;
