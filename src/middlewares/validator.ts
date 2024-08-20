import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    return next();
  };
};

const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }
    return next();
  };
};

const schemas = {
  signup: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(20),
  }),

  createTask: Joi.object({
    title: Joi.string().required(),
    name: Joi.string().required(),
    userId: Joi.string().uuid().required(),

    tag: Joi.string().valid("URGENT", "BUG", "FEATURE"),
    description: Joi.string().required(),
  }),
  uuid: Joi.object({
    id: Joi.string().uuid().required(),
  }),
  createComment: Joi.object({
    comment: Joi.string().required(),
  }),
  updateTaskStatus: Joi.object({
    status: Joi.string().valid("TO_DO", "IN_PROGRESS", "COMPLETED"),
  }),
  updateMenuItem: Joi.object({
    name: Joi.string().optional(),
    price: Joi.number().optional(),
    description: Joi.string().optional(),
  }),
};

// Validate object with methods
const validate = {
  Signup: validateRequest(schemas.signup),

  CreateTask: validateRequest(schemas.createTask),
  UUID: validateParams(schemas.uuid),
  UpdateMenuItem: validateRequest(schemas.updateMenuItem),
};

export { validate };
