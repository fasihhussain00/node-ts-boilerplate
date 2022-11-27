import { Request, Response } from "express";
import { createReadStream } from "fs";
import { ResponseBuilder } from "../utils/response.utils";
import appConfig from "../configs/app.config";
import { getExtension, getRootDirectory } from "../utils/file.utils";
import { getUUID } from "../utils/uuid.utils";
import { getMimeType } from "../utils/mime.utils";
import fileUpload from "express-fileupload";

export async function uploadFile(req: Request, resp: Response) {
	if (!req.files) {
		resp
			.status(400)
			.send(
				ResponseBuilder.buildResponse(
					400,
					"please send file in form data with name file"
				)
			);
		return;
	}
	let files = Array.isArray(req.files.file) ? req.files.file : [req.files.file];
	let uploadedFileNames = await saveFiles(files);
	resp.status(200).send(
		ResponseBuilder.buildResponse(
			200,
			"file uploaded",
			uploadedFileNames.map((fileName) => {
				if (fileName)
					return {
						fileAccessAbsoluteUrl: `${appConfig.baseUrl}/api/file/${fileName}`,
						fileAccessRelativeUrl: `/api/file/${fileName}`,
					};
				return {
					error: "some error uploading file",
				};
			})
		)
	);
}

async function saveFiles(files: fileUpload.UploadedFile[]): Promise<string[]> {
	return new Promise((resolve, reject) => {
		let uploadedFiles: string[] = [];
		for (const file of files) {
			let fileExtension = getExtension(file.name);
			let filename = `${getUUID()}${fileExtension}`;
			let filePath = `${getFileDirectory()}/${filename}`;
			file.mv(filePath, function (err) {
				if (err) uploadedFiles.push("");
				if (!err) uploadedFiles.push(filename);
				if (files.length == uploadedFiles.length) return resolve(uploadedFiles);
			});
		}
	});
}
export async function getFile(req: Request, resp: Response) {
	const { fileid } = req.params;

	var filePath = `${getFileDirectory()}/${fileid}`;
	var readStream = createReadStream(filePath);
	readStream.on("error", (err) => {
		return resp
			.status(404)
			.send(ResponseBuilder.buildResponse(404, "file not found"));
	});
	resp.setHeader("Content-Type", getMimeType(filePath));
	readStream.pipe(resp);
}
export function getFileDirectory(): string {
	return `${getRootDirectory()}/files`;
}
export default {
	uploadFile,
	getFile,
};
