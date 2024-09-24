import { IDropDown } from './CommonModel';

export interface ICustomerResponse {
    createAt?: number,
    createdBy?: string,
    status?: string,
    clientId?: number,
    mainAccount?: string,
    name?: string,
    companyLegalNameAr?: string,
    companyTradeName?: string,
    companySponsorName?: string,
    companyRegisterNumber?: string,
    companyVatNumber?: string,
    industryTypeId?: number,
    businessSource?: string,
    salespersonEmpId?: number,
    businessId?: number,
    remarks?: string,
    subAccounts?: ISubAccounts[]
}

export interface ICustomersList {
    accountId: string,
    accountName: string,
    clientId: number,
    subClientId: number,
    companyName: string,
    blocked: boolean,
    cashOnly: boolean,
    codOnly: boolean,
    onAccountOnly: boolean
}

interface ISubAccounts {
    subClientId?: number,
    subAccountCode?: string,
    name?: string
}

export interface ISubAccountAddress {
    createAt?: number,
    createdBy?: string,
    status?: boolean,
    id?: number,
    subClientId?: number,
    countryId?: IDropDown | string,
    cityId?: IDropDown | string,
    addressStreet?: string,
    mobile?: string,
    email?: string,
    fax?: string,
    city?: string,
    country?: string
}

export interface ICustomerInitial {
    customers: ICustomerResponse,
    customerDetail: ICustomerResponse,
    subAccountAddressList: ISubAccountAddress[],
    subAccountBillingAddressList: ICustomerBillingDetails[],
    fileTypeList: IFileType[]
}
export interface ICustomerState extends ICustomerInitial {
  
}

export interface ICustomer {
    name?: string,
    companyLegalNameAr?: string,
    companyTradeName?: string,
    companySponsorName?: string,
    companyRegisterNumber?: string,
    companyVatNumber?: string,
    industryTypeId?: IDropDown | string,
    businessSource?: string,
    salespersonEmpId?: IDropDown | string,
    countryId?: IDropDown | string,
    businessId?: number,
    remarks?: string,
    mainAccount: string
}

export interface ICustomerAddress {
    addressStreet?: string,
    countryId?: IDropDown | string,
    cityId?: IDropDown | string,
    postalCode?: string,
    mobile?: string,
    email?: string,
    fax?: string,
    subClientId?: number,
    clientId?: number
}

export interface ICustomerBillingDetails {
    id?: number,
    clientId?: number,
    clientSubId?: number,
    billingContactName?: string,
    billingContactPhone?: string,
    billingEInvoiceEmail?: string,
    billingCountryId?: IDropDown | string,
    billingCityId?: IDropDown | string,
    billingPostal?: string,
    billingAddressStreet?: string,
    billingPhone?: string,
    billingEmail?: string,
    billingFax?: string,
    bankName?: string,
    bankCountryId?: IDropDown | string,
    beneficiaryName?: string,
    bankActNumber?: string,
    bankCurrencyId?: IDropDown | string,
    bankSwiftCode?: string,
    ibanNumber?: string,
    salespersonIdEmpid?: IDropDown | string,
    creditTermDays?: number,
    creditLimit?: number
}

export interface ISubAccount {
    id?: number,
    name: string,
    clientId?: number,
    subClientId?: number,
    salesPersonId: IDropDown | string,
    countryId: IDropDown | string,
}

export interface IFileType {
    status: string,
    id: number,
    name: string,
    nameAr: string,
    statusId: number,
    fileTypeCategoryId: number,
    fileTypeCategory: string

}