import create from 'zustand';
import { ILogin, ILoginInitialState, ILoginState } from '../model/LoginModel';
import { GetCustomerDetailService, GetMasterDetailService, PostLoginService } from '../services/login-service';
import { SessionStorage } from '../services/storage';
import { responseData } from './common';

const initialValue: ILoginInitialState = {
    loggedInDetails: {},
    customerDetail: {},
    appStorage:{}
}

let LoginStore = create<ILoginState>((set) => ({
    ...initialValue,
    PostLoginAction: async (userDetails: ILogin) => {
        const response = await PostLoginService(userDetails);
        sessionStorage.setItem('token', ((response?.data?.accessToken!) || '{}'));
        set({ loggedInDetails: response?.data })
    },
    GetCustomerDetailAction: async () => {
        const response = await GetCustomerDetailService();
        SessionStorage.setObject('customer', (responseData(response?.data) || '{}'));
        set({ customerDetail: responseData(response?.data) })
    },
    GetMasterDetailAction: async () => {
        const response = await GetMasterDetailService();
        SessionStorage.setObject('app-storage', (responseData(response?.data) || '{}'));
        set({ appStorage: responseData(response?.data) })
    },
    ClearLoginStore: () => set(initialValue)
}))


export const useLoginStore = (LoginStore)