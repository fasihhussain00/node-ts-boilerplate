import { scheduleJob, RecurrenceRule } from "node-schedule";
import jobConfig from "../configs/job.config";

const offlineAdminCheckActivity = function () {
	const offlineAdminCheckActivityName = "offline-admin-check-job";
	const offlineAdminCheckActivityCronRule =
		jobConfig.offlineAdminExpirationActivityCron;

	return scheduleJob(
		offlineAdminCheckActivityName,
		offlineAdminCheckActivityCronRule,
		() => {
			console.log("offline admin removal activity");
		}
	);
};

export { offlineAdminCheckActivity };
