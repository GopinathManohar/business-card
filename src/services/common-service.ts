import { AxiosError } from 'axios';
import config from "react-global-configuration";
import { getNotificationStyle } from '../common/notification';
import { UploadFormData } from '../stores/common';
import { IFileUpload, IFileUploads, IFilter, IReport } from './../model/CommonModel';
import AjexPortalService from "./api";

const countryId = config.get('countryId');
const city = config.get('city');
const cityId = config.get('cityId');
const odaCity = config.get('odaCity');
const industryType = config.get('industryType')
const employee = config.get('employee');
const salesPerson = config.get('salesPerson')
const currency = config.get('currency');
const waybillSticker = config.get('waybillSticker');
const manualWayBill = config.get('manualWayBill');
const print = config.get('print');
const customerAccountFile = config.get('customerAccountFile');
const uploadFile = config.get('uploadFile');
const clientSubId = config.get('clientSubId');
const booking = config.get('booking');
const filter = config.get('filter');
const fileAttachment = config.get('fileAttachment');
const upload = config.get('upload');
const downloadAll = config.get('downloadAll');
const downloadFile = config.get('downloadFile');
const customer = config.get('customer');
const customerReport = config.get('customerReport');
const podFiles = config.get('podFiles');
const subClient = config.get('subClient');


const bookingURL = process.env.REACT_APP_TMS_INTEGRATION_BOOKING_SERVICE;
const commonURL = process.env.REACT_APP_TMS_INTEGRATION_COMMON_SERVICE;
const reportURL = process.env.REACT_APP_TMS_REPORT_SERVICE;

export const GetOriginListService = async (id: number) => {
    try {
        return await AjexPortalService.get(`${bookingURL}${city}/${countryId}/${id}`);
    } catch (error: unknown) {
        const err = error as AxiosError;
        getNotificationStyle(err?.response);

        return err?.response;
    }
};

export const GetSubCityListService = async (id: number) => {
    try {
        return await AjexPortalService.get(`${bookingURL}${odaCity}/${cityId}/${id}`);
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);

        return err?.response;
    }
};

export const GetIndustryListService = async () => {
    try {
        return await AjexPortalService.get(`${bookingURL}${industryType}`);
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);

        return err?.response;
    }
};

export const GetSalesPersonService = async () => {
    try {
        //employee/sales-person
        return await AjexPortalService.get(`${employee}/${salesPerson}`);
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);

        return err?.response;
    }
};

export const GetCurrencyService = async () => {
    try {
        return await AjexPortalService.get(`${bookingURL}${currency}/`)
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);

        return (err?.response)
    }
}
export const PrintWayBillService = async (airWayBill: string) => {
    try {
        return await AjexPortalService.get(`${commonURL}${print}/${manualWayBill}/${airWayBill}`)
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);
        return (err?.response)
    }
}
export const PrintStickerService = async (airWayBill: string) => {
    try {
        //print/waybill-sticker/A10000010000016
        return await AjexPortalService.get(`${commonURL}${print}/${waybillSticker}/${airWayBill}`)
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);
        return (err?.response)
    }
}
export const UploadFilesService = async (fileObject: IFileUpload) => {
    try {
        const { formData, configuration } = UploadFormData(fileObject)
        //customer-account-file/upload-file
        return await AjexPortalService.post(`${customerAccountFile}/${uploadFile}`, formData, configuration)
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);
        return (err?.response)
    }
}

export const GetUploadedFileListService = async (subClientId: number) => {
    try {
        return await AjexPortalService.get(`${customerAccountFile}/${clientSubId}/${subClientId}`)
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);
        return (err?.response)
    }
}

export const SearchFilterService = async (filteredData: IFilter) => {
    try {
        ///api/v1/booking/filter
        return await AjexPortalService.post(`${booking}/${filter}`, filteredData);
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);
        return (err?.response)
    }
}

export const UploadFileService = async (fileObject: IFileUploads) => {
    try {
        // const { formData, configuration } = UploadFormData(fileObject)
        //customer-account-file/upload-file
        return await AjexPortalService.post(`${commonURL}${fileAttachment}/${upload}`, fileObject)
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);
        return (err?.response)
    }
}

export const GetOperationFilesListService = async (wayBillNumber: string | undefined) => {
    //file-attachment/download-all/A10000010000362
    try {
        return await AjexPortalService.get(`${commonURL}${fileAttachment}/${downloadAll}/${wayBillNumber}`)
    } catch (error: unknown) {
        const err = error as AxiosError
        getNotificationStyle(err?.response);
        return (err?.response);
    }
}
export const DownloadFilesActionService = async (id: number) => {
    //file-attachment/download-file/105
    try {
        return await AjexPortalService.get(`${commonURL}${fileAttachment}/${downloadFile}/${id}`);
    } catch (error: unknown) {
        const err = error as AxiosError;
        getNotificationStyle(err?.response);
        return err?.response;
    }
};

export const CustomerDailyRecapReportService = async (request: IReport) => {
    //file-attachment/download-file/105
    try {
        return await AjexPortalService.post(`${reportURL}report/customer-daily-recap-report/download/date-filter`, request);
    } catch (error: unknown) {
        const err = error as AxiosError;
        getNotificationStyle(err?.response);
        return err?.response;
    }
};


export const CustomerReportService = async (request: IReport) => {
    //file-attachment/download-file/105
    try {
        return await AjexPortalService.post(`${reportURL}/${customer}/${customerReport}`, request);
    } catch (error: unknown) {
        const err = error as AxiosError;
        getNotificationStyle(err?.response);
        return err?.response;
    }
};

export const GetPodFilesListService = async (id: number) => {
    try {
        return await AjexPortalService.get(`${commonURL}${podFiles}/${subClient}/${id}`)
    } catch (error: unknown) {
        const err = error as AxiosError;
        return err?.response
    }
}