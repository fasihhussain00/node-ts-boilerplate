import express from "express";
import { test } from "../controllers/test.controller";
import { catchError } from "../middlewares/errorhandler.middleware";

const router = express.Router();

router.get("/test", catchError(test));

export default router;
