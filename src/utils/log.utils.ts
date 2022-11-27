import { appendFileSync } from "fs";
import logConfig from "../configs/log.config";
import { createDirectoryIfNotExists, getRootDirectory } from "./file.utils";

export function log(message?: any) {
	if (logConfig.loggingEnabled) {
		var formattedLogString = getFormattedErrorLog(message);
		logToFile(formattedLogString);
		return;
	}
	console.log(message);
}

function logToFile(log: string) {
	let logFileName = `${logConfig.logFilePreappendString}${
		new Date(Date.now()).toISOString().split("T")[0]
	}.txt`;
	appendFileSync(`${getLogDirectory()}/${logFileName}`, log, {
		encoding: "utf-8",
	});
}

function getFormattedErrorLog(log: string): string {
	let datetime = new Date(Date.now()).toJSON();
	return `
	At: ${datetime}
	Log: ${log}
	`;
}

function getLogDirectory(): string {
	let logDirectory = `${getRootDirectory()}/logs/${logConfig.logDirectoryName}`;
	createDirectoryIfNotExists(logDirectory);
	return logDirectory;
}
