import { AxiosError } from 'axios';
import { getNotificationStyle } from '../common/notification';
import AjexPortalService from "./api";
import config from './config';



const country = config.get('country');
const shipper = config.get('shipper');
const consignee = config.get('consignee');

const bookingURL = process.env.REACT_APP_TMS_INTEGRATION_BOOKING_SERVICE;
const tmsReportURL = process.env.REACT_APP_TMS_REPORT_SERVICE;

export const GetCountryService = async () => {
  try {
    return await AjexPortalService.get(`${bookingURL}${country}`);
  } catch (error: unknown) {
    const err = error as AxiosError
    return err?.response;

  }

}
export const DeleteShipperByIdService = async (id: number | undefined) => {
  try {
    return await AjexPortalService.delete(`${bookingURL}${shipper}/${id}`)
  } catch (error: unknown) {
    const err = error as AxiosError;
    getNotificationStyle(err?.response);
    return err?.response;
  }
}


export const DeleteConsigneeByIdService = async (id: number | undefined) => {
  try {
    return await AjexPortalService.delete(`${bookingURL}${consignee}/${id}`)
  } catch (error: unknown) {
    const err = error as AxiosError;
    getNotificationStyle(err?.response);
    return err?.response;
  }
}