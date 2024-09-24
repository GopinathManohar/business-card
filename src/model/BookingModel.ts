import { Moment } from "moment";
import { IFileUpload, IFilter, IResponseCode } from "./CommonModel";
import { ICity, ICountryInterface, IProductList } from "./MasterModel";

interface IAccountList {
    accountId: string;
    accountName: string;
    blocked: boolean;
    cashOnly: boolean;
    clientId: number;
    codOnly: boolean;
    companyName: string;
    onAccountOnly: boolean;
    subClientId: number;
}

interface IAccountName {
    subClientId?: number;
    subAccountCode?: string;
    name?: string;
    clientId?: number;
}

export interface IProductType {
    productId: number;
    productName: string;
    subProductList: ISubProductList[];
}

export interface ISubProductList extends IDropDown {
    subProductId: number;
    subProductName: string;
    temperatureList: ITemperatureList[];
}

export interface ITemperatureList extends IDropDown {
    range: string;
    temperature: string;
    temperatureId: number;
    customerRange: string;
}

export interface IBookingResponse {
    bookingCode?: string;
    consigneeId?: number;
    deliveryInstruction?: string | undefined | number;
    id?: number;
    isCanceled?: boolean;
    hasInsurance?: boolean;
    isPickedUp?: boolean;
    orderSourceId?: string;
    pieceCount?: number;
    productId?: number;
    shipperId?: number;
    status?: string;
    subProductId?: number;
    temperatureId?: number;
    waybillNo?: string;
    weight?: number;
    clientId?: number;
    podList?: IProofOfDeliveryRequest[];
    etdDeliverytimeMs?: Moment | undefined | number;
    pickupDatetimeMs?: Moment | undefined | number;
    //Barcode
    bookingTrayList?: IBookingTray[];
}

export type IProofOfDelivery = {
    status?: string;
    id?: number;
    podFileType: string;
    podFileTypeAr: string;
    isTextNeeded: boolean;
};

type IProofOfDeliveryListRequest = {
    bookingId?: number;
    waybillNo?: string;
    id?: number;
};
export type IProofOfDeliveryRequest = IProofOfDeliveryListRequest & {
    podFileOptionsId: number | string;
    podRefText: string;
    collectAtPickup: boolean;
    collectAtDelivery: boolean;
    isTextNeeded?: boolean;
    isDisabled?: boolean;
};
export type IUserStatus = {
    statusCode?: number;
    message?: string;
};


export type IPieceBarCode = {
    id?: number;
    pieceBarcode: string;
    sampleTypeLSId: number | string;
    unitOfMeasureId: number | string;
    mlValue: number | string;
    status: string;
    statusId: number;
};

export type IBookingTray = {
    id?: number;
    trayBarcode?: string;
    pieceCount?: number | string;
    trayPieceBarCodeList?: IPieceBarCode[] | undefined;
    children?: IPieceBarCode[] | undefined;
    bookingId?: number | string;
    trayBarcodeId?: number | string | undefined;
    status?: string;
    statusId?: number;
    isLifeScience?: boolean;
};
export type IConsigneeCountryCity = {
    dest?: {
        country?: ICountryInterface[];
        city?: ICity[];
    };
    city?: ICity[];
    country?: ICountryInterface[],
    filteredCity?: ICity[],
    consigneeDtoList?: ConsigneeInterface[];
};
export type IShipperCountryCity = {
    dest?: {
        country?: ICountryInterface[],
        city?: ICity[],
    },
    country?: ICountryInterface[],
    city?: ICity[],
    shipperDtoList?: ConsigneeInterface[]
}
export interface IBookingInitialState {
    bookingList: IBookingList[];
    accountList: IAccountList[];
    subProductList: ISubProductList[];
    productList: IProductList[];
    temperatureList: IDropDown[];
    shippersList: IShipper[];
    consigneeList: ConsigneeInterface[];
    accountName: IAccountName;
    bookingDetail: IBookingResponse;
    bookingSuccess: IResponseCode;
    accountDetailList: IProductType[];
    proofOfDeliveryList: IProofOfDelivery[];
    airWayBillTracking: IAirwayBillTracking;
    userStatus: number | undefined;
    uploadBulkFileResponse: number | undefined;
    consigneeResponse: number | undefined;
    shipperResponse: number | undefined;
    deleteTrayPieceBarCodeResponse: number | undefined;
    deletePieceBarCodeResponse: number | undefined;
    shipperUpdateResponse: number | undefined;
    consigneeUpdateResponse: number | undefined;
    consigneeApproval: number | undefined;
    originDestination: IOriginDestination;
    bookingTrayList: IBookingTray[];
    trayPieceBarcode: IBookingTray;
    downloads: {
        file?: string;
        fileFormat?: string;
        fileName?: string;
        fileType?: string;
        id?: number;
    };
    consigneeCountryCity: IConsigneeCountryCity;
    consigneeImageApproval: IApproval,
    shipperCountryCity: IShipperCountryCity,
    shipperDetail: Partial<IShipper>
    consigneeDetail: Partial<ConsigneeInterface>,
    productDescription: IProductDescription
}
export type IOriginDestination = {
    origin?: {
        country?: ICountryInterface[],
        city?: ICity[]
    },
    dest?: {
        country?: ICountryInterface[],
        city?: ICity[]
    },
    country?: ICountryInterface[],
    city?: ICity[]
    filteredCity?: ICity[]
}

export type IAirwayBillTracking = {
    driverId?: number;
    lat?: number;
    lng?: number;
    date?: string;
    vehicleId?: string;
    speed?: number;
    odometer?: number;
    moving?: boolean;
    activeStatus?: boolean;
    city?: string;
    vehicleCategory?: string;
    driverName?: string;
    errorCode?: number;
    temperature?: number;
    humidity?: number;
};

export interface ICustomerBookingRequest {
    subClientId: number;
    waybillno: string | null;
    startDate: number | null;
    endDate: number | null;
    bookingRefNo: string | null;
    origincityID: number | null;
    destCityID: number | null;
    startIndex: number;
    count: number;
}
export type IBulkPrint = {
    waybillList: (string | undefined)[]
}
export interface IBookingState extends IBookingInitialState {
    GetBookingListAction: (
        pageNumber: number,
        pageSize: number,
        data: Partial<ICustomerBookingRequest>
    ) => Promise<void>;
    ClearStore: () => void;
    GetAccountNameById: (id: number) => Promise<void>;
    GetCustomerByIdAction: (id: number) => Promise<void>;
    GetSubProductByIdAction: (list: ISubProductList[]) => any;
    GetProductAction: (subId: number) => Promise<void>;
    GetTemperatureByIdAction: (list: IDropDown[]) => any;
    GetShipperDetailsByIdAction: (id: number) => Promise<void>;
    GetConsigneeDetailsByIdAction: (id: number) => Promise<void>;
    GetProofOfDeliveryAction: () => Promise<void>;
    GetShipperByIdAction: (id: number | undefined) => Promise<void>;
    GetConsigneeByIdAction: (id: number | undefined) => Promise<void>;
    SaveBookingAction: (data: IBooking) => Promise<void>;
    SaveShipperAction: (data: IShipperRequestInterface) => Promise<void>;
    SaveConsigneeAction: (data: IConsigneeRequestInterface) => Promise<void>;
    GetBookingDetailByIdAction: (id: number) => Promise<void>;
    CancelBookingByIdAction: (id: number | undefined) => Promise<void>;
    UpdateBookingDetailAction: (
        id: number | undefined,
        data: IBooking
    ) => Promise<void>;
    SearchFilterAction: (filteredData: IFilter) => Promise<void>;
    GetBookingDetailsAction: (id: number) => Promise<void>;
    SaveProofOfDeliveryAction: (
        data: IProofOfDeliveryRequest,
        id: number
    ) => Promise<void>;
    DeleteProofOfDeliveryAction: (
        id: number | undefined,
        bookingId: number
    ) => Promise<void>;
    ClearDropDownStore: () => any;
    GetOriginDestinationCountryCityAction: (
        request: IOriginDestinationRequest,
        countryId?: number
    ) => Promise<void>;
    TrackWayBillAction: (waybillNumber: string) => Promise<void>;
    DownloadFileAction: (waybillNumber: string) => Promise<void>;
    DownloadPodFileAction: (id: number | undefined) => Promise<void>;
    UserStatusAction: (id: number | string | undefined) => Promise<void>;
    SaveBarCodeAction: (list: IBookingTray) => void;
    UpdateBarCodeAction: (
        row: IBookingTray,
        id: number | string | undefined,
        paramsId: number | undefined
    ) => Promise<void>;
    DeleteBarCodeAction: (
        row: IBookingTray,
        id: number | undefined
    ) => Promise<void>;
    GetTrayBarCodeAction: (request: IGetTrayBarcode) => Promise<void>;
    GetBarCodeAction: (id: number) => Promise<void>;
    DeleteTrayPieceBarCodeAction: (
        row: IBarCodeDelete,
        getTrayBarcodeRequest: IGetTrayBarcode,
        id: number | undefined
    ) => Promise<void>;
    UploadBulkBookingAction: (
        file: Omit<IFileUpload, "clientSubId" | "fileTypeId">,
        isUploadBooking: boolean
    ) => Promise<void>;
    DownloadBookingExcelAction: () => Promise<void>;
    ConsigneeApprovalAction: (request: IApproval) => Promise<void>;
    GetConsigneeApprovalByIdAction: (id: number) => Promise<void>;
    GetConsigneeDetailsByShipperAndAccountDetailsAction: (
        request: IShipperAndAccountDetailRequest,
        countryId?: number
    ) => Promise<void>;
    UpdateConsigneeApprovalAction: (request: IApproval) => Promise<void>;
    GetShipperDetailsByAccountDetailsAction: (request: Partial<Omit<IShipperAndAccountDetailRequest, 'originCityId'>>) => Promise<void>;
    PrintBulkWayBillAction: (waybillList: IBulkPrint) => Promise<void>;
    PrintBulkStickerAction: (waybillList: IBulkPrint) => Promise<void>;
    UpdateShipperByIdAction: (request: Partial<IShipper>, id: number | undefined) => Promise<void>;
    UpdateConsigneeByIdAction: (request: Partial<ConsigneeInterface>, id: number | undefined) => Promise<void>;
    ProductDescriptionByProductIdAction: (request: number) => Promise<void>;

}

export type IProductDescription = {
    fileType?: string,
    file?: string,
    fileContent?: string,
    subject?: string,
    subjectAr?: string,
    description?: string,
    descriptionAr?: string,
}
export type IBarCodeDelete = {
    bookingId: number | undefined;
    trayBarcodeId: number | undefined;
    trayPieceBarCodeId: number | undefined;
};

export type IApproval = {
    bookingId?: number | undefined;
    confirm?: boolean;
    sealNo?: string;
    remarks?: string;
    id?: number;
};

export type IGetTrayBarcode = {
    trayId: number;
    bookingId: number;
};
export type IOriginDestinationRequest = {
    subclientId?: number | undefined;
    productId?: number | undefined;
    subProductId?: number | undefined;
    temperatureId?: number | undefined;
    TrackWayBillAction?: (waybillNumber: string) => Promise<void>;
    DownloadFileAction?: (waybillNumber: string) => Promise<void>;
    DownloadPodFileAction?: (id: number | undefined) => Promise<void>;
    UserStatusAction?: (id: number | string | undefined) => Promise<void>;
};

export interface AccountTypeInterface {
    id: number;
    label: string;
}

export type IDropDown = {
    id: number;
    value: string;
};

export interface IBooking {
    id?: number;
    clientId?: IDropDown | string | number;
    shipperId?: string;
    billTypeId?: number;
    accountId?: IDropDown | string;
    accountName?: IDropDown | string;
    pickupDriver?: IDropDown | string;
    deliveryDate?: IDropDown | string;
    productType?: IDropDown | string;
    subProduct?: IDropDown | string;
    temperature?: IDropDown | string;
    boxCount: undefined | number;
    palletCount: undefined | number;
    pieceCount: undefined | string | number;
    isUrgent: boolean;
    deliveryInstruction?: string | undefined | number;
    weight?: undefined | number;
    referenceNo: string;
    referenceNumber: string;
    consigneeId?: number | undefined;
    productId?: number | undefined;
    orderSourceId: string | undefined;
    // Shipper Details
    shipperMobile?: string;
    shipperName?: string;
    shipperCountry?: IDropDown | string;
    shipperOrigin?: IDropDown | string;
    pickupDatetimeMs?: undefined | number;
    etdDeliverytimeMs?: undefined | number;
    shipperSubCity?: IDropDown | string;
    shipperGoogleAddress?: string;
    shipperAddress?: string;
    subProductId?: IDropDown | number | undefined;
    temperatureId?: IDropDown | number | undefined;

    // Consignee Details
    consigneeMobile?: string;
    consigneeName?: string;
    consigneeCountry?: IDropDown | string;
    consigneeDestination?: IDropDown | string;
    consigneeGoogleAddress?: string;
    consigneeDeliveryDate?: number;
    consigneeAddress?: string;
    consigneeSubCity?: IDropDown | string;
    //Insurance Details
    declaredValue?: number;
    currencyId?: IDropDown | number;
    insuranceValue?: number | undefined;

    //Other Details
    otherDetails?: string;
    //COD
    shipmentValue?: number | string;
    freightCharge?: number;
    hasInsurance?: boolean;
    isLifeScience?: boolean;
    podList: IProofOfDeliveryRequest[];

    //Barcode
    bookingTrayList: IBookingTray[];

    actualVMDetails: string | undefined;
}
export type IShipperAndAccountDetailRequest = {
    subclientId: number | undefined;
    productId: number | undefined;
    subProductId: number | undefined;
    temperatureId: number | undefined;
    originCityId: number | undefined;
}

export interface IShipper {
    createdBy: string;
    status: string;
    id: number;
    name: string;
    nameAr: string;
    mobileNumber1: number;
    mobileNumber2: number;
    email: string;
    address: string;
    area: string;
    cityId: number;
    city: string;
    countryId: number;
    country: string;
    createdDate: number;
    oda: boolean;
    employee: string;
    statusId: number;
    customerSubAccount: string;
    customerSubAccountId: number;
    odaCityId: number;
    odaCityName: string;
    isoda: boolean;
    shipperGoogleAddress: string;
    consigneeGoogleAddress: string;
    latitude: number;
    longitude: number;
}

export interface ConsigneeInterface extends IShipper {
    id: number;
    lat: number;
    lng: number;
    remarks: string;
    customerSubAccountId: number;
    customerSubAccount: string;
    salesPersonId: number;
    salesPerson: string;
    status: string;
    companyName: string;
}

export interface IBookingList {
    id: number;
    waybillNo: string;
    bookingCode: string;
    shipperId: number;
    consigneeId: number;
    productId: number;
    subProductId: number;
    temperatureId: number;
    pieceCount: number;
    weight: number;
    billTypeId: number;
    orderSourceId: string;
    status: string;
    boxCount: number;
    palletCount: number;
    deliveryInstruction: string | undefined | number;
    pickupDatetimeMs: number;
    etdDeliverytimeMs: number;
    isCanceled: boolean;
    companyLegalNameEn: string;
    customerAccount: string;
    shipperName: string;
    originCity: string;
    originCountry: string;
    consigneeName: string;
    destinationCity: string;
    destinationCountry: string;
    productName: string;
    temperature: string;
    billType: string;
    isCancelled: boolean;
    eventCode: string;
    lastStatus: string;
    cusLastStatus: string;
    lastEventDate: number;
    isPickedup: boolean;
    createdDate: number;
    referenceNo: string;
}

export interface IShipperRequestInterface {
    name: string;
    mobileNumber1: string;
    mobileNumber2: string;
    email: string;
    address: string;
    area: string;
    cityId: IDropDown | string | undefined;
    countryId: IDropDown | number | undefined;
    isoda: boolean;
    employee: string;
    statusId: number;
    customerSubAccountId: number | undefined;
    status: string;
    odaCityId: IDropDown | string;
    waybill?: string;
    latitude?: number;
    longitude?: number;
    shipperGoogleAddress?: string;
}

export interface IConsigneeRequestInterface {
    name: string;
    mobileNumber1: string;
    mobileNumber2: string;
    email: string;
    address: string;
    area: string;
    cityId: IDropDown | string;
    countryId: IDropDown | number;
    isoda: boolean;
    employee: string;
    statusId: number;
    customerSubAccountId: number | undefined;
    status: string;
    odaCityId: IDropDown | string;
    consigneeGoogleAddress?: string;
    waybill?: string;
    latitude?: number;
    longitude?: number;
}

export interface IAccount {
    value: string;
    id: number;
    name: string;
    clientId: number;
}

export interface ISubProductList extends IDropDown {
    subProductId: number;
    subProductName: string;
    temperatureList: ITemperatureList[];
}

export type IProofOfDeliveryState = {
    isTextNeeded: boolean;
    id: number;
    isDisabled: boolean;
};

export type IConsigneeApproval = {
    id?: number,
    bookingId?: number,
    confirm?: boolean,
    sealNo?: string,
    remarks?: string,
    statusId?: number,
    status?: string,
    createdById?: number,
    createdBy?: string
}
