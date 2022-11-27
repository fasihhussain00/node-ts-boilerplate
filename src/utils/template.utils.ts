import { readFileSync } from "fs";
import { getRootDirectory } from "./file.utils";

function getTemplate(templateName: string) {
	let templatePath = `${getRootDirectory()}/src/scripts/templates/${templateName}.html`;
	return readFileSync(templatePath, "utf8");
}

export function buildTemplate(templateString: string, data: any): string {
	for (let [key, value] of Object.entries(data)) {
		for (let eachOccurance of templateString.matchAll(
			new RegExp(`{{${key}}}`, "gi")
		)) {
			templateString = templateString.replace(
				eachOccurance[0] as string,
				value as string
			);
		}
	}
	return templateString;
}

export default {
	providerContract: getTemplate(`provider.contract.template`),
	customerContract: getTemplate(`customer.contract.template`),
	directorContract: getTemplate(`director.contract.template`),
	customerCredentials: getTemplate(`customer.credentails.template`),
	customerDirectorCredentials: getTemplate(
		`customer-director.credentails.template`
	),
	directorCredentials: getTemplate(`director.credentails.template`),
	providerCredentials: getTemplate(`provider.credentails.template`),
	passwordReset: getTemplate(`password.reset.link.template`),
};
