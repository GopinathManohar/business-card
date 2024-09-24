import { AxiosError } from 'axios';
import AjexPortalService from "./api";
import { ILogin } from "../model/LoginModel";
import config from './config';
import { getNotificationStyle } from '../common/notification';

const loginURL: string | undefined = process.env.REACT_APP_API_AUTHENTICATION_URL;
const bookingURL = process.env.REACT_APP_TMS_INTEGRATION_BOOKING_SERVICE;

const user = config.get('user');
const master = config.get('master');
const all = config.get('all');
export const PostLoginService = async (userDetails: ILogin) => {
    try {
        return await AjexPortalService.post(loginURL!, userDetails);
    } catch (error: unknown) {
        const err = error as AxiosError;
        return err?.response;
    }
}

export const GetCustomerDetailService = async () => {
    try {
        return await AjexPortalService.get(`${user}`)
    } catch (error) {
        const err = error as AxiosError;
        getNotificationStyle(err?.response);
        return err?.response;
    }
}

export const GetMasterDetailService = async () => {
    try {
        return await AjexPortalService.get(`${bookingURL}/${master}/${all}`)
    } catch (error) {
        const err = error as AxiosError;
        getNotificationStyle(err?.response);
        return err?.response;
    }
}