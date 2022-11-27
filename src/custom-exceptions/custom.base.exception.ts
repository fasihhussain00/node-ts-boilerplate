export abstract class CustomException extends Error {
	abstract statusCode: number;
	abstract customCode: number;
	abstract message: string;
	abstract data: any;
}
