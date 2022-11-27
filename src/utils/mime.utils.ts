import { getType } from "mime";

const getMimeType = (filePath: string): string => {
	return getType(filePath) ?? "application/octet-stream";
};
export { getMimeType };
