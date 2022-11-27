import { expect, should } from "chai";
import appConfig from "../src/configs/app.config";
import { app } from "../src/app";

export function createLocation(location: any, whenDone: Function) {
	chai
		.request(app)
		.post("/api/location")
		.set("apikey", appConfig.apiKey)
		.send(location)
		.end((err, res) => {
			should().equal(res.status, 201);
			expect(res.body).to.be.a("object");
			expect(res.body).to.have.a.property("payload");
			expect(res.body.payload).to.be.a("object");
			expect(res.body.payload).to.have.property("id");
			expect(res.body.payload.id).to.be.a("number");
			whenDone();
		});
}

export function createCustomer(customer: any, whenDone: Function) {
	chai
		.request(app)
		.post("/api/customer")
		.send()
		.end((err, res) => {
			should().equal(res.status, 201);
			expect(res.body).to.be.a("object");
			expect(res.body).have.a.property("payload");
			expect(res.body.payload).to.be.a("object");
			expect(res.body.payload).have.property("id");
			whenDone();
		});
}
