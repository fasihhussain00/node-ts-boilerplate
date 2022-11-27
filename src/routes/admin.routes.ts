import express from "express";
import { dashboard } from "../controllers/admin.controller";
import { authorize } from "../middlewares/auth.middleware";
import { catchError } from "../middlewares/errorhandler.middleware";

const router = express.Router();

router.get(
	"/admin/dashboard",
	authorize(["ADMIN_DASHBOARD"]),
	catchError(dashboard)
);

export default router;
