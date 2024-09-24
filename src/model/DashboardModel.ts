
export type IDashboardResponse = {
    total?: number,
    pickup?: number,
    delivered?: number,
    ofd?: number,
    rto?: number
}
export interface IDashboardInitial {
    dashboardObject: IDashboardResponse
}
export interface IDashboard extends IDashboardInitial {
    GetDashboardRecordAction: () => Promise<void>;
    GetDashboardRecordByDatesAction: (from: number, to: number) => Promise<void>;
}