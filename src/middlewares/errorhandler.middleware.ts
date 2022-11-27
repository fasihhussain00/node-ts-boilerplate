import { NextFunction, Request, Response } from "express";
import { appendFileSync } from "fs";
import logConfig from "../configs/log.config";
import {
	createDirectoryIfNotExists,
	getRootDirectory,
} from "../utils/file.utils";

const catchError =
	(endpoint: Function) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await endpoint(req, res, next);
			return result;
		} catch (error) {
			if (logConfig.errorLoggingEnabled) {
				var formattedLogString = getFormattedErrorLog(req, error);
				logError(formattedLogString);
			}
			await sendErrorResponse(req, res);
		}
	};

function logError(log: string) {
	let errorLogFileName = `${logConfig.errorLogFilePreappendString}${
		new Date(Date.now()).toISOString().split("T")[0]
	}.txt`;
	appendFileSync(`${getLogDirectory()}/${errorLogFileName}`, log, {
		encoding: "utf-8",
	});
}

function getFormattedErrorLog(req: Request, error: any): string {
	let datetime = new Date(Date.now()).toJSON();
	return `
	At: ${datetime}
	Url: ${req.baseUrl}${req.url}\t${JSON.stringify(req.params)}
	headers: ${JSON.stringify(req.headers)}
	body: ${JSON.stringify(req.body)}
	stackTrace: ${error.stack}
	`;
}

async function sendErrorResponse(req: Request, res: Response): Promise<void> {
	res.status(500).send({ status: 500, message: "some error occured" });
}

function getLogDirectory(): string {
	let logDirectory = `${getRootDirectory()}/logs/${
		logConfig.errorLogDirectoryName
	}`;
	createDirectoryIfNotExists(logDirectory);
	return logDirectory;
}

export { catchError };
