import express from "express";
import { authorize } from "../middlewares/auth.middleware";
import { catchError } from "../middlewares/errorhandler.middleware";
import {
	addCustomer,
	filterCustomer,
	getCustomer,
} from "../controllers/customer.controller";
import { validate } from "../middlewares/validation.middleware";
import { addCustomerSchema } from "../validators/customer.validator";

const router = express.Router();

router.post(
	"/customer",
	validate(addCustomerSchema, "body"),
	catchError(addCustomer)
);

router.get(
	"/customer/:id",
	authorize(["CUSTOMER_FETCH"]),
	catchError(getCustomer)
);

router.get(
	"/customer",
	authorize(["CUSTOMER_FETCH"]),
	catchError(filterCustomer)
);
export default router;
