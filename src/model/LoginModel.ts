export interface ILogin {
    username: string;
    password: string;
}

export interface ILoginResponse {
    accessToken: string,
    tokenType: string,
    error?: string,
    message?: string
    path?: string
    status?: number
}

export interface ILoginInitialState {
    loggedInDetails: any;
    customerDetail: ICustomer,
    appStorage: {}
}
export interface ILoginState extends ILoginInitialState {
    PostLoginAction: (userDetails: ILogin) => Promise<void>;
    GetCustomerDetailAction: () => Promise<void>;
    ClearLoginStore: () => void;
    GetMasterDetailAction: () => Promise<void>;
}

export interface ICustomer {
    status?: string,
    id?: number,
    userName?: string,
    mobileNo?: string,
    clientId?: number,
    subClientName?: string,
    subClientId?: number | undefined,
    subClient?: string,
    cityId?: number,
    city?: string,
    countryId?: number,
    country?: string,
    customerName?: string,
    customerRole?: string,
    customerRoleId?: number,
    customerTypes?: string,
    customerTypesId?: number,
    email?: string
    positionId?: number
}
