export type ICountry = {
    status: string,
    id: number,
    name: string,
    alpha2Code: string
}

export type ICity = {
    cityId: number,
    city: string,
    cityCode: string,
    countryId: number,
    country: string
}
interface IOriginInterface {
    id: number,
    name: string,
    code: string
}

interface ICurrencyInterface {
    id: number,
    currency: string,
    currencyName: string
}

interface IIndustry {
    status: string,
    id: number,
    nameEn: string,
    nameAr: string
}


export interface IPodFiles {
    id: number,
    fileName: string,
    fileType: string,
    fileFormat: string,
    waybill: string,
    podFileType: string,
    podRefText: string,
    collectAtDelivery: boolean,
    collectAtPickup: boolean,
    dbTableName: string,
    podId: number
}
interface ISalesPerson {
    createAt: number,
    status: string,
    id: number,
    name: string,
    userName: string,
    employeeId: number,
    cityId: number,
    countryId: number,
    businessId: number,
    divisionId: number,
    reportingTo: number,
    isSalesperson: boolean,
    email: string,
    phone: string
}

export interface ICommonInitialState {
    originList: IOriginInterface[],
    subCityList: IOriginInterface[],
    industryList: IIndustry[],
    salesPersonList: ISalesPerson[],
    currencyList: ICurrencyInterface[],
    fileList: IFileList[],
    googlePosition: any,
    fileUploadResponse: number | undefined,
    operationFiles: { bookingFileList?: [{ id?: number, fileName: string, fileFormat: string, fileType: string }] },
    downloads: { download?: string | null | undefined, fileFormat?: string },
    download: string | null | undefined,
    podFilesList: IPodFiles[],
}

export type IReport = {
    subClientId: number | undefined,
    startDate: number | undefined,
    endDate: number | undefined,
    startIndex?: number | undefined,
    count?: number | undefined,
    isBookingDate: number,
    isPickupDate: number,
    subAccountId: number | undefined
}
export interface ICommonState extends ICommonInitialState {
    GetOriginListAction: (id: number) => Promise<void>
    GetSubCityListAction: (id: number) => Promise<void>
    GetIndustryListAction: () => Promise<void>
    GetSalesPersonAction: () => Promise<void>,
    GetCurrencyAction: () => Promise<void>;
    PrintWayBillAction: (airWayBill: string) => Promise<void>;
    PrintStickerAction: (airWayBill: string) => Promise<void>;
    UploadFilesAction: (fileObject: IFileUpload) => Promise<void>;
    GetUploadedFileListAction: (subCLientId: number | undefined) => Promise<void>;
    SaveGooglePosition: (data: any) => void;
    GetOperationFilesListAction: (wayBillNumber: string | undefined) => Promise<void>;
    UploadFileAction: (fileObject: IFileUploads, waybillNo: string) => Promise<void>;
    DownloadFilesAction: (id: number, fileName: string, fileFormat: string, isLifeScience: boolean) => Promise<void>
    CustomerDailyRecapReportAction: (request: IReport) => Promise<void>
    CustomerReportAction: (request: IReport) => Promise<void>
    GetPodFilesListAction: (id: number) => Promise<void>;
}

export interface IResponseCode {
    statusCode?: number
}

type commonType = string | number | undefined;

export interface IFileUpload {
    clientSubId: string,
    file: File,
    fileName: string;
    clientId: commonType;
    fileTypeId: commonType;
    subAccount: string,
    productId: commonType,
    subProductId: commonType,
    temperatureId: commonType
}

export interface IDropDown {
    id: number,
    name: string
}

export interface IFileList {
    id: number,
    clientId: number,
    client: string,
    clientSubId: number,
    clientSub: string,
    fileName: string,
    filePath: string,
    fileTypeName: string,
    createdBy: string,
    fileTypeId: number
}

export interface IConfirmation {
    hideModal: () => void;
    confirmClicked: () => void;
    openModal: boolean,
    label?: string
    isLoading?: boolean
}

export interface IFilter {
    waybillId: number | string,
    isInternal: number | null,
    startDate: number | string,
    endDate: number | string,
    waybillno: string | undefined,
    bookingRefNo: string | undefined,
    origincityID: number | string,
    destCityID: number | string,
    startIndex: number,
    count: number,
    employeeId: number | null,
    subClientId?: string | null
}

export interface IGooglePosition {
    lat: number,
    lng: number
}


export interface IGoogleMapsProps {
    isMarkerShown: boolean,
    open: boolean,
    setOpen: (value: boolean) => void,
    getLocation: () => void,
    title: string,
    positions?: IGooglePosition | IGooglePosition[],
    isSearchable?: boolean,
    selectedLocationAddress?: string,
    isInfoShown?: boolean,
    zoom?: number,
    icon?: string
}


export type IFiles = {
    attachmentDataString: string | ArrayBuffer | null,
    category?: string;
    categoryId?: number | undefined,
    fileFormat?: string;
    fileType?: string;
    tripPlanNumber?: string;
    wayBillNumber?: string;
}

export type IFileUploads = {
    attachmentList: IFiles[]
}