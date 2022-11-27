interface INotifier {
	send(channel: string, event: string, data: any): Promise<void>;
}

class pusherNotifier implements INotifier {
	constructor() {}
	public async send(channel: string, event: string, data: any): Promise<void> {}
}

export class Notifier {
	public static get getNotifier(): pusherNotifier {
		return new pusherNotifier();
	}
}
