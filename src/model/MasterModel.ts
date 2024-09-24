export type IOdaCity = {
    createAt: number,
    id: number,
    name: string,
    name_ar: string,
    cityName: string,
    cityId: number,
    odaChargePrice: number,
    businessId: number,
    businessName: string
}

export interface ExceptionInterface {

    exceptionId: number,
    exception: string,
    exceptionAr: string,
    exceptionCode: string,
    exceptionCategoryId: number,
    exceptionCategory: string,
    business: string,
    division: string

}


export interface EmployeeInterface {
    employeeId: number,
    employeeName: string,
    city: string,
    country: string,
    businessId: number,
    business: string,
    divisionId: number,
    division: string,
    email: string,
    phone: string,
    positionId: number,
    position: string,
}


export interface VehiclesInterface {
    vehId: number,
    driverName: string,
    nameAr: string,
    fleetCode: string,
    plateNumber: string,
    trailerNumber: string,
    vehicleType: string,
    city: string,
    country: string,
    business: string,
    division: string,
    operationType: string,
    fuelCapacity: number,
    driverId: number,
    owner: string
}


export interface CustomerInterface {
    accountId: string,
    accountName: string,
    subClientId: number,
    clientId: number,
    companyName: string,
    blocked: boolean,
    cashOnly: boolean,
    codOnly: boolean,
    onAccountOnly: boolean,
}


export interface ICity {
    id: number,
    cityId: number,
    city: string,
    cityCode: string,
    countryId: number,
    country: string,
    countryCode: string,
    regionId: number,
    region: string
}

export interface EventInterface {
    eventId: number,
    code: string,
    name: string,
    nameAr: string,
    customerDisplayNameEn: string,
    customerDisplayNameAr: string,
    isinternal: boolean,
    isboth: number,
    business: string,
    division: string,
}


export interface TripRoutesInterface {
    tripId: number,
    tripCode: string,
    fromCityId: number,
    fromCity: string,
    toCityId: number,
    toCity: string,
    business: string,
    division: string,
    distance: number,
    travelTime: number,
}

export interface ICountryInterface {
    status: string,
    id: number,
    name: string
}

export interface IRegion {
    id: number,
    name: string,
    nameAr: string,
    code: string
}

export interface IOda {
    createAt: number,
    id: number,
    name: string,
    name_ar: string,
    cityName: string,
    cityId: number,
}

export interface IProductList {
    createAt: number,
    createdBy: string,
    status: string,
    id: number,
    name: string,
    nameAr: string,
    code: string,
    statusId: number,
    businessId: number,
    businessName: string,
    divisionId: number,
    divisionName: string
}

export interface IMasterInitial {
    exceptionList: ExceptionInterface[];
    employeeList: EmployeeInterface[];
    vehiclesList: VehiclesInterface[];
    customerList: CustomerInterface[];
    cityList: ICity[];
    eventList: EventInterface[];
    tripRouteList: TripRoutesInterface[];
    countryList: ICountryInterface[]
    regionList: IRegion[]
    odaList: IOda[],
    productList: IProductList[],
    shipperDeleteResponse: number | undefined,
    consigneeDeleteResponse: number | undefined,
}
export interface IMasterInterface extends IMasterInitial {
    GetCountryListAction: () => Promise<void>;
    DeleteShipperByIdAction: (id: number | undefined) => Promise<void>;
    DeleteConsigneeByIdAction: (id: number | undefined) => Promise<void>;

}