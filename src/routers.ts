import { Router } from "express";
import adminRoute from "./routes/admin.routes";
import customerRoute from "./routes/customer.routes";
import loginRoutes from "./routes/auth.routes";
import fileRoutes from "./routes/file.route";
import testRoutes from "./routes/test.routes";

export function getRouters(): Router[] {
	return [adminRoute, customerRoute, loginRoutes, fileRoutes, testRoutes];
}
