import { IBookingTray, IPieceBarCode } from '../model/BookingModel';
import { IFileUpload } from '../model/CommonModel';
import { DE_ACTIVATE_ID, DE_ACTIVE, TWO_HUNDRED_SUCCESS_CODE } from '../utils/common';

export const responseData = (response: any) => {
    const { data, statusCode } = response || {}
    if (statusCode === TWO_HUNDRED_SUCCESS_CODE) {
        return data;
    }
}

export const responseStatus = (response: any) => {
    const { statusCode } = response || {}
    return { statusCode };
}

export enum messageEnum {
    ACCOUNT_CREATED_SUCCESSFULLY = 'Account Created Successful ',
    CUSTOMER_BILLING_CREATED_SUCCESSFULLY = 'Customer Billing Created Successful',
    CUSTOMER_ADDRESS_CREATED_SUCCESSFULLY = 'Customer Address Created Successful',
    CUSTOMER_CREATED_SUCCESSFULLY = 'Customer Created Successful',
    ASSIGNED_DRIVER_SUCCESSFULLY = 'Driver Assigned Successful',
    ASSIGNED_DELIVERY_DRIVER_SUCCESSFULLY = 'Delivery Driver Assigned Successful',
    BOOKING_CANCELED = 'Booking Canceled Successful',
    RTO_SUCCESSFUL = 'RTO Successful',
    CUSTOMER_DELETED = 'Customer Deleted Successful',
    ASSIGNED_DELIVERY_SHEET = ' Assigned Delivery Sheet Successful',
    BOOKING_CREATED_SUCCESSFULLY = 'Booking Created Successful',
    FILE_UPLOADED_SUCCESSFULLY = 'File Uploaded Successful'
}

export const UploadFormData = (fileObject: any, isUploadBooking: boolean = false) => {
    const { file, fileName, clientId, clientSubId, fileTypeId, subAccount, productId, subProductId, temperatureId } = fileObject;
    const fileUploadRequest = {
        clientId,
        subAccount,
        productId,
        subProductId,
        temperatureId
    }
    const formData = new FormData();
    formData.append('file', file);
    isUploadBooking && formData.append('booking', new Blob([
        JSON.stringify(fileUploadRequest)
    ], {
        type: "application/json"
    }));
    fileName && formData.append('fileName', fileName);
    fileTypeId && formData.append('fileTypeId', fileTypeId);
    clientSubId && formData.append('clientSubId', clientSubId);
    const configuration = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    };
    return { formData, configuration };
}

export const emptyUploadedFileValue = (e: any) => e.target.value = '';

export const mapBookingTrayList = (data: any[]) => {
    return data?.map((bookingTray) => ({
        ...bookingTray,
        children: bookingTray?.trayPieceBarCodeList?.map((item: IPieceBarCode) => ({ ...item, unitOfMeasureId: item?.unitOfMeasureId ?? 1 }))
            ?.filter((bookingFilterTray: IPieceBarCode) => bookingFilterTray?.statusId !== DE_ACTIVATE_ID),
        trayPieceBarCodeList: bookingTray?.trayPieceBarCodeList?.map((item: IPieceBarCode) => ({ ...item, unitOfMeasureId: item?.unitOfMeasureId ?? 1 }))
            ?.filter((bookingFilterTray: IPieceBarCode) => bookingFilterTray?.statusId !== DE_ACTIVATE_ID),
        statusId: bookingTray?.statusId ? bookingTray?.statusId : 1
    })).filter(item => (item?.statusId !== DE_ACTIVATE_ID));
}

