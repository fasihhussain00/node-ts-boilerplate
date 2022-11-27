import express from "express";
import { catchError } from "../middlewares/errorhandler.middleware";
import { uploadFile, getFile } from "../controllers/file.controller";

const router = express.Router();

router.post("/file", catchError(uploadFile));
router.get("/file/:fileid", catchError(getFile));

export default router;
