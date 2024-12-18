import { Router } from "express";
import UserProfileController from "../controllers/userProfile.js";
import { AsyncWrapper } from "../utils/AsyncWrapper.js";
import { authenticate } from "../middlewares/token.js";

const router = Router();
const userProfileController = new UserProfileController();

router.post(
  "/",
  authenticate,
  AsyncWrapper(userProfileController.postUserProfile)
);
router.put(
  "/",
  authenticate,
  AsyncWrapper(userProfileController.putUserProfile)
);
router.get(
  "/",
  authenticate,
  AsyncWrapper(userProfileController.getUserProfile)
);

export const userProfileRouter = { baseUrl: "/api/userProfile", router };
