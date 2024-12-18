//routes/index.js

import { Router } from "express";
import UserController from "../controllers/user.js";
import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { authenticate } from "../middlewares/token.js";

const router = Router();
const userController = new UserController();

router.post(
  "/",
  //  authenticate,
  AsyncWrapper(userController.postUser)
);
router.get(
  "/",
  //  authenticate,
  AsyncWrapper(userController.getUser)
);
router.put(
  "/",
  // authenticate,
  AsyncWrapper(userController.putUser)
);

export const userRouter = { baseUrl: "/api/user", router };
