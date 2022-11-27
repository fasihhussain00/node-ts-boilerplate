import { Request, Response } from "express";
export async function test(req: Request, resp: Response) {
	resp.send("Testing...");
}

export default {
	test,
};
