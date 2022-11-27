import express from "express";
import { authorize } from "../middlewares/auth.middleware";
import { catchError } from "../middlewares/errorhandler.middleware";
import { login } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", catchError(login));

export default router;
