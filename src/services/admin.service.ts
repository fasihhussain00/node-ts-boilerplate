import dbfactory from "../dbmanager/db.factory";
import DBmanager from "../dbmanager/db.manager";
import { AdminStatusCode } from "../custom-exceptions/custom.base.exception";
import {
	getDateTimeUsingTimezone,
	getEndTimeOfDate,
	getStartTimeOfDate,
	toSqlDatetime,
} from "../utils/date.utils";
import queries from "../utils/queries.utils";

export class AdminService {
	private dbmanager: DBmanager;
	constructor() {
		this.dbmanager = dbfactory.instance;
	}
	public static get instance() {
		return new AdminService();
	}
	public async dashboard(user: any, timezone: string) {
		let dashboardData: any[] | null = null;
		let currentTimeOfGivenTimezone = getDateTimeUsingTimezone(timezone);
		var parameters = {
			todaystartdatetime: toSqlDatetime(
				getStartTimeOfDate(currentTimeOfGivenTimezone)
			),
			todayenddatetime: toSqlDatetime(
				getEndTimeOfDate(currentTimeOfGivenTimezone)
			),
			currentdatetime: toSqlDatetime(
				new Date(currentTimeOfGivenTimezone + (timezone ? timezone : ""))
			),
		};
		var table = await this.dbmanager.executeQuery(
			queries.adminDashboard,
			parameters
		);

		if (table.rows)
			dashboardData = Array.isArray(table.rows) ? table.rows : [table.rows];

		if (!dashboardData || !dashboardData.length) {
			return { code: AdminStatusCode.NotFound, data: {} };
		}

		dashboardData = dashboardData.map((x) => {
			let totalGfeTime = dashboardData?.reduce(
				(partialSum, a) => partialSum + a.gfeTimeInSeconds,
				0
			);

			let totalGfeCount = dashboardData?.reduce(
				(partialSum, a) => partialSum + a.noOfGfes,
				0
			);
			x.providerId = +x.providerId;
			x.noOfGfes = +x.noOfGfes;
			x.gfeTimeInSeconds = +x.gfeTimeInSeconds;
			x.avgTimeInSeconds = +x.avgTimeInSeconds;
			x.noOfGfesToday = +x.noOfGfesToday;
			x.gfeTimeToday = +x.gfeTimeToday;
			x.avgGfeTimeTodayInSeconds = +x.avgGfeTimeTodayInSeconds;
			x.noOfGfesCurrentMonth = +x.noOfGfesCurrentMonth;
			x.gfeTimeCurrentMonth = +x.gfeTimeCurrentMonth;
			x.avgGfeTimeCurrentMonthInSeconds = +x.avgGfeTimeCurrentMonthInSeconds;
			x.noOfGfeLastMonth = +x.noOfGfeLastMonth;
			x.allProviderAvgGfeTimeInSeconds = totalGfeTime / totalGfeCount;

			return x;
		});

		return { code: AdminStatusCode.Success, data: dashboardData };
	}
}
