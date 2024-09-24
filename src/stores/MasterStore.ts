import create from 'zustand';
import { IMasterInterface } from '../model/MasterModel';
import { DeleteConsigneeByIdService, DeleteShipperByIdService, GetCountryService } from '../services/master-services';
import { IMasterInitial } from './../model/MasterModel';
import { responseData } from "./common";
import { TWO_HUNDRED_SUCCESS_CODE } from '../utils/common';
import { getNotificationStyle } from '../common/notification';

const initialValue: IMasterInitial = {
    exceptionList: [],
    employeeList: [],
    vehiclesList: [],
    customerList: [],
    cityList: [],
    eventList: [],
    tripRouteList: [],
    countryList: [],
    regionList: [],
    odaList: [],
    productList: [],
    shipperDeleteResponse: undefined,
    consigneeDeleteResponse: undefined,
}

const MasterStore = create<IMasterInterface>(((set) => ({
    ...initialValue,
    GetCountryListAction: async () => {
        const response = await GetCountryService();
        set({ countryList: responseData(response?.data) })
    },
    DeleteShipperByIdAction: async (id: number | undefined) => {
        const response = await DeleteShipperByIdService(id);
        const { statusCode } = response?.data || {};
        if (statusCode === TWO_HUNDRED_SUCCESS_CODE) {
            getNotificationStyle(response);
            set({ shipperDeleteResponse: statusCode })
        }
    },
    DeleteConsigneeByIdAction: async (id: number | undefined) => {
        const response = await DeleteConsigneeByIdService(id);
        const { statusCode } = response?.data || {};
        if (statusCode === TWO_HUNDRED_SUCCESS_CODE) {
            getNotificationStyle(response);
            set({ consigneeDeleteResponse: statusCode })
        }
    },
})))

export const useMasterStore = (MasterStore)