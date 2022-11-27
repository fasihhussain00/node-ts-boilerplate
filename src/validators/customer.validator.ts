import Joi from "joi";
export const addCustomerSchema = Joi.object().keys({
	companyName: Joi.string().required().max(30),
	contactName: Joi.string().required().max(30),
	companyPhone: Joi.string().required().max(20),
	companyEmail: Joi.string().email({ tlds: false }).required(),
	companyAddress: Joi.array()
		.items(
			Joi.object().keys({
				streetName: Joi.string().required(),
				appartmentNumber: Joi.string().optional().allow(null),
				city: Joi.string().required(),
				zip: Joi.string().required(),
				stateId: Joi.number().required(),
			})
		)
		.required(),
	dbaName: Joi.string().max(100).optional().allow(null),
	businessWebsite: Joi.string().required().max(500),
	multipleLocations: Joi.boolean().strict().required(),
	billingContactName: Joi.string().max(20),
	billingContactNumber: Joi.string().max(20),
	medicalGroup: Joi.object()
		.keys({
			firstname: Joi.string().required().max(20),
			lastname: Joi.string().required().max(20),
			phone: Joi.string().required().max(20),
			email: Joi.string().email({ tlds: false }).required(),
			licenseType: Joi.string()
				.required()
				.valid(...["MD", "DO", "NP", "PA"]),
		})
		.required(),
});
export default {
	addCustomerSchema,
};
