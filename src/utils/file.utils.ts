import { existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";

const getDirectorySeperator = (): string => {
	return __dirname.includes("\\") ? "\\" : "/";
};
export const getRootDirectory = (): string => {
	let currentDirectory = __dirname;
	let directorySeperator = getDirectorySeperator();
	let splittedDirectories = currentDirectory.split(directorySeperator);
	let currentPoppedDirectory;
	do {
		currentPoppedDirectory = splittedDirectories.pop();
	} while (currentPoppedDirectory != "src");
	return splittedDirectories.join(directorySeperator);
};

export const createDirectoryIfNotExists = (directory: string) => {
	if (!existsSync(directory)) {
		mkdirSync(directory, { recursive: true });
	}
};

export const fileToBase64 = (filePath: string): string | null => {
	if (!existsSync(filePath)) {
		return null;
	}
	return readFileSync(filePath, { encoding: "base64" });
};

export const getExtension = (fileName: string): string => {
	return path.extname(fileName);
};
