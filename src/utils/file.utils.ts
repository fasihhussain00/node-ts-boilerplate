import { existsSync, mkdirSync, readFileSync } from "fs";
import path from "path";

export const getRootDirectory = (): string => {
	return require.main?.filename?.replace(/[\/|\\]src(.*)app(.*)/gm, "") || "";
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
