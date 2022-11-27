import express from "express";
import { json } from "express";
import fileupload from "express-fileupload";
import cors from "cors";
import appConfig from "./configs/app.config";
import { getRouters } from "./routers";
import helmet from "helmet";
import compression from "compression";
import { log } from "./utils/log.utils";
import { offlineAdminCheckActivity } from "./jobs/schedule.jobs";

const app = express();
addFileUploadingMiddleware();
addHelmet();
addCors();
addBodyParser();
addCompression();
addRoutes();
handleUnMatchedRoutes();
app.listen(appConfig.port, "0.0.0.0", onAppStarted);
addProcessErrorHandler();

function addRoutes() {
	app.use("/api", getRouters());
}

function addProcessErrorHandler() {
	process.on("uncaughtException", (err) => {
		log(err);
		log("some error occured. you better look at the error logs");
	});
}

function addBodyParser() {
	app.use(json());
}

function addCors() {
	app.use(cors(appConfig.corsOptions));
}

function addCompression() {
	app.use(compression());
}

function addHelmet() {
	app.use(helmet());
}

function addFileUploadingMiddleware() {
	app.use(
		fileupload({
			createParentPath: true,
		})
	);
}

function handleUnMatchedRoutes() {
	app.all("*", (req: any, res: any) => {
		res.status(400).send({
			message: "no matching route found",
			status: 404,
		});
	});
}

function onAppStarted() {
	console.log(
		`app running on
local: localhost:${appConfig.port}
bindedUrl: ${appConfig.baseUrl}`
	);

	offlineAdminCheckActivity();
}
