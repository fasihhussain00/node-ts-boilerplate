import appConfig from "../configs/app.config";
import { log } from "../utils/log.utils";

let onlineAdminState: {
	adminId: number;
	lastSeenAt: number;
}[] = [];

export function addOnlineAdminToState(adminId: number): {
	adminId: number;
	lastSeenAt: number;
} | null {
	let [exist] = existInState(adminId);
	if (exist) return null;
	let adminToBePushedInState = {
		adminId,
		lastSeenAt: getCurrentTimeStamp(),
	};
	onlineAdminState.push(adminToBePushedInState);
	log(`admin ${adminId} online`);
	return adminToBePushedInState;
}

export function currentOnlineAdmin() {
	return onlineAdminState.length;
}

export function isAdminOnline(adminId: number): boolean {
	let [exist, index] = existInState(adminId);
	return exist;
}

export function removeOfflineAdminFromState(adminId: number): void {
	let [exist, index] = existInState(adminId);
	if (!exist) return;
	onlineAdminState.splice(index, 1);
	log(`admin ${adminId} offline`);
}

export function pingReceivedOfOnlineAdmin(adminId: number) {
	let [exist, index] = existInState(adminId);
	if (!exist) {
		addOnlineAdminToState(adminId);
		return;
	}
	onlineAdminState[index].lastSeenAt = getCurrentTimeStamp();
	log(`admin ${adminId} pinged`);
}

export function getCurrentOnlineAdminsState(): {
	adminId: number;
	lastSeenAt: number;
}[] {
	return [...onlineAdminState];
}

export function getExpiredOnlineAdmins(): number[] {
	log("Admin Online expiration activity...");

	let adminShouldBeOffline: number[] = [];
	for (let index = 0; index < onlineAdminState.length; index++) {
		let currentAdmin = onlineAdminState[index];
		if (!isAdminPingExpired(currentAdmin.lastSeenAt)) continue;
		adminShouldBeOffline.push(currentAdmin.adminId);
		log(`admin ${currentAdmin.adminId} going to be offline`);
	}
	return adminShouldBeOffline;
}

function getCurrentTimeStamp(): number {
	return Date.now();
}

function existInState(adminId: number): [exist: boolean, index: number] {
	let foundIndex = onlineAdminState.findIndex(
		(x) => x.adminId == adminId
	);
	if (foundIndex != -1) return [true, foundIndex];
	return [false, -1];
}

function isAdminPingExpired(ping: number): boolean {
	return !(
		ping + allowedOnlineAdminsPingDelayInMilliseconds() >
		getCurrentTimeStamp()
	);
}

function allowedOnlineAdminsPingDelayInMilliseconds(): number {
	return appConfig.onlineAdminsAllowedPingDelayInSeconds * 1000;
}
