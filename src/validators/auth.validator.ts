import Joi from "joi";

export default {
	loginSchema: Joi.object().keys({
		emailOrUsername: Joi.string().required(),
		password: Joi.string().required(),
	}),
	changeCredentialsSchema: Joi.object().keys({
		currentPassword: Joi.string().required().label("current password"),
		newPassword: Joi.string().required().label("password"),
		confirmPassword: Joi.any()
			.valid(Joi.ref("newPassword"))
			.required()
			.label("confirm password"),
	}),
	resetPassword: Joi.object().keys({
		userId: Joi.number().required(),
		otp: Joi.string().required(),
		newPassword: Joi.string().required(),
		confirmPassword: Joi.any()
			.valid(Joi.ref("newPassword"))
			.required()
			.label("confirm password"),
	}),
};
