import { generatePdf } from "html-pdf-node";
import { readFileSync, appendFileSync } from "fs";
import { createDirectoryIfNotExists } from "./file.utils";

let pdfOption = {
	format: "A4",
	margin: {
		right: 70,
		left: 70,
		top: 65,
		bottom: 65,
	},
};

export function htmlStringToPdf(
	htmlTemplate: string,
	destinationCompleteFilePath: string,
	templateData: any = null
) {
	let fileStringContent = htmlTemplate;
	if (templateData)
		fileStringContent = buildHtmlTemplate(fileStringContent, templateData);

	let file = {
		content: fileStringContent,
	};
	let destinationCompleteDirectory = destinationCompleteFilePath
		.split("/")
		.slice(0, -1)
		.join("/");
	createDirectoryIfNotExists(destinationCompleteDirectory);

	generatePdf(file, pdfOption, (err, fileBuffer) => {
		if (!err) appendFileSync(destinationCompleteFilePath, fileBuffer);
	});
}

export function getPdf(
	filePath: string,
	destinationCompleteFilePath: string,
	templateData: any = null
) {
	let fileStringContent = readFileSync(filePath, { encoding: "utf-8" });
	if (templateData)
		fileStringContent = buildHtmlTemplate(fileStringContent, templateData);

	let file = {
		content: fileStringContent,
	};

	generatePdf(file, pdfOption, (err, fileBuffer) => {
		if (!err) appendFileSync(destinationCompleteFilePath, fileBuffer);
	});
}

function buildHtmlTemplate(fileHTML: string, data: any): string {
	for (let [key, value] of Object.entries(data)) {
		key = `{{${key}}}`;
		fileHTML = fileHTML.replace(key, value as string);
	}
	return fileHTML;
}
