import { assert, expect, Assertion, use, should } from "chai";
import chaiHttp from "chai-http";
import { customerModel, locationModel } from "./test-data";
import { createCustomer, createLocation } from "./test-helper";

use(chaiHttp);

describe("POST /location", () => {
	it("should create a location", (done) => {
		createLocation(locationModel.data, done);
	});
});

describe("POST /customer", () => {
	before((done) => {
		createLocation(locationModel.setData("location f", "state"), done);
	});
	it("should create a customer", (done) => {
		createCustomer(customerModel.setData("hell1@mail.com", [1, 2, 3]), done);
	});
});
