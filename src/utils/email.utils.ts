import mailer from "nodemailer";
import mailConfig from "../configs/mail.config";
import { buildTemplate } from "./template.utils";
const transporter = mailer.createTransport({
	host: mailConfig.host,
	port: mailConfig.port,
	auth: {
		user: mailConfig.username,
		pass: mailConfig.password,
	},
});

export async function sendMail(
	to: string,
	subject: string,
	body: string,
	isTemplate: boolean = true,
	data: any = {}
): Promise<string> {
	if (isTemplate) {
		body = buildTemplate(body, data);
	}
	const mailConfigurations = {
		from: mailConfig.from,
		to: to,
		subject: subject,
		html: body,
	};
	try{
		var res = await transporter.sendMail(mailConfigurations);
		return res.response;
	}
	catch(err){
		return "";
	}
}
