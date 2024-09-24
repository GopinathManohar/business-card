import { ICity, ICountry } from "./CommonModel";
import { ICustomer } from "./LoginModel";
import { IOdaCity } from "./MasterModel";

type IList = { status: string, id: number, name: string, nameAr: string, statusId: number }
export interface IContextInitial {
    setCustomerDetailHandle?: () => void,
    customerDetail: ICustomer | null
    isSuperUser: boolean,
    isNormalUser: boolean,
    isConsigneeSuperUser: boolean,
    isConsigneeNormalUser: boolean,
    isViewUser: boolean,
    isAdminUser: boolean,
    isPossAdminUser: boolean,
    isLPossUser: boolean,
    unitOfMeasureLSDtoList: IList[],
    sampleTypeLSDtoList: IList[]
    country: ICountry[],
    city: ICity[],
    odaCityDto: IOdaCity[],
}