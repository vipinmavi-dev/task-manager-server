import express from "express";
import { getStatuses, getPriorities, changePassword, updateProfile } from "../controllers/helper/helper.controller.js";
import authUser from "../middlewares/authUser.js";
const router = express.Router();

router.get("/statues", authUser, getStatuses);
router.get("/priority", authUser, getPriorities);
router.post("/change-password", authUser, changePassword);
router.post("/update-profile", authUser, updateProfile);

export default router;