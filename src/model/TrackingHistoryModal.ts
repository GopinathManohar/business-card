import { IFilter } from "./CommonModel";

export type ITrackingHistory = {
    waybillNo: string,
    eventText: string,
    eventCode: string,
    customerDisplayNameEn: string,
    isInternal: boolean,
    isBoth: boolean,
    scannedBy: string,
    station: string,
    notes: string,
    remarks: string,
    comment: string,
    scanDate: number
}

export interface ITrackingHistoryResponse {
    waybillNo: string,
    bookingCode: string,
    customerAccount: string,
    shipperName: string,
    orgCity: string,
    orgCountry: string,
    consName: string,
    desCity: string,
    desCountry: string,
    product: string,
    subProduct: string,
    temp: string,
    pieceCount: number,
    weight: number,
    isCancelled: boolean,
    statusId: string,
    isRto: boolean,
    originalWaybillNo: string,
    pickupDate: string,
    deliveryDate: string,
    pickupDriver: string,
    deliveryDriver: string,
    lastStatus: string,
    lastEvent_date: string,
    rowNum: string,
    cnt: string
}

export interface ITrackingHistoryInitialValue {
    trackingHistoryList: ITrackingHistory[],
    trackingHistory: ITrackingHistory[],
    temperatureHistory:ITemperatureHistory[],
}

export type ITemperatureHistory = {
    imei: string,
    temp: string,
    humi: string,
    bat: string,
    rtc: boolean,
    alert: boolean,
    createTime: string,
    deviceTypeName: string,
    gsm: IGsm,
    lbs: ILbs[],
}
export type IGsm = {
    csq: string,
    sta: string,
}
export type ILbs = {
    cell: string,
    earfcn: string,
    lac: string,
    mcc: string,
    mnc: string,
    pci: string,
    rsrp: string,
    rsrq: string,
    rssi: string,
    rxlev: string,
    type: string,
}

export interface ITrackingHistoryState extends ITrackingHistoryInitialValue {
    GetTrackingHistoryAction: () => Promise<void>;
    GetTrackingHistoryByWayBillAction: (wayBill: string) => Promise<void>;
    SearchFilterAction: (filteredData: IFilter) => Promise<void>;
    ClearTrackingStore: () => void;
    GetTemperatureByWayBillAction: (wayBill: string) => Promise<void>;
    DownloadPodFileByWaybillAction: (waybill: string) => Promise<void>;
}