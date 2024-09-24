import { AxiosRequestConfig, AxiosResponse } from "axios";
import moment, { Moment } from "moment";
import { IProductType, ISubProductList } from "../model/BookingModel";
import { IDropDown } from "../model/CommonModel";
import { yesterdayDate } from "./luxon";
// Status Code
export const SUCCESS_CODE = 100,
    TWO_HUNDRED_SUCCESS_CODE = 200,
    FOUR_HUNDRED_SUCCESS_CODE = 400,
    FIFTY_FOUR = 54,
    EIGHTY_CODE = 80,
    SEVENTY_CODE = 70,
    FOUR_ZERO_ONE = 401,
    FOUR_HUNDRED = 400,
    START_RTO_CODE = 998,
    COMPLETE_RTO_CODE = 999,
    DELETE_MESSAGE = `Are you sure you want to delete?`,
    EMAIL_PLACEHOLDER = 'email@address.com',
    PICKUP_DATE_ERROR = 'Pickup date should be less than delivery date',
    DELIVERY_DATE_ERROR = 'Delivery date should be greater than pickUp date',
    INVALID_USER_NAME_OR_PASSWORD_ERROR = 'Invalid Username or Password',
    YYYY_MM_DD_HH_mm = 'YYYY-MM-DD HH:mm',
    YYYY_MM_DD = 'YYYY-MM-DD',
    YYYY_MM_DD_DATE_FORMAT = 'yyyy-MM-dd',
    DD_MM_YYYY_H_MM = 'dd-MM-yyyy HH:mm',
    YYYY_MM_DD_H_MM_SS = 'yyyy-MM-dd HH:mm:ss',
    FINANCE_ID = 2,
    BOOKING_FILE = 'Booking File',
    LIFE_SCIENCE_PRODUCT_ID = 39,
    POSS_CLIENT_ID = 61,
    // POSS_CLIENT_ID = 203,
    ACCOUNT_ID = 1,
    CASH_ID = 2,
    DE_ACTIVATE_ID = 2,
    DE_ACTIVE = 'De-Active',
    ACTIVE = 'Active',
    LIFE_SCIENCE = 'Life Science',
    JEDDAH_CITY_ID = 7,
    DISABLED_TIME = 3,
    ONE_MONTH = 1,
    fallbackFile = 'iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="'

export const fileExclude = (type: string) => ["image/png", "image/jpg", "image/jpeg", 'application/pdf'].includes(type);

export enum UPLOAD_DOWNLOAD_ACCESS {
    DOMESTIC_ROAD_EXPRESS = 'Domestic Road Express',
    DOMESTIC_ROAD_PALLETS = 'Domestic Road Pallets',
    DOMESTIC_TEMP_EXPRESS = 'Domestic Temp Express',
    DOMESTIC_TEMP_BOX = 'Domestic Temp box'
}
export enum USER_ROLES {
    ADMIN = 1,
    SUPER_USER = 2,
    NORMAL_USER = 3,
    CONSIGNEE_SUPER_USER = 4,
    CONSIGNEE_NORMAL_USER = 5,
}
export enum USER_CUSTOMER_TYPE {
    DEFAULT = 1,
    LS_POSS = 2,
    VIEW_ACCESS = 8
}

export enum UserEum {
    FINANCE = 10
}
export const SUB_CITY_ACCESS = {
    DOMESTIC_FTL: 'domestic ftl'
} as const
export const blobConfiguration: AxiosRequestConfig<any> = {
    responseType: 'blob',
    timeout: 30000,
}

export enum FileEnums {
    EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    IMAGE_PNG = 'image/png',
    IMAGE_JPG = 'image/jpg',
    IMAGE_JPEG = 'image/jpeg',
    APPLICATION_PDF = 'application/pdf',
    APPLICATION_MS_WORD = 'application/msword',
    APPLICATION_DOCUMENT = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
};


export const fileFormat: Record<string, string> = {
    jpeg: FileEnums.IMAGE_JPEG,
    jpg: FileEnums.IMAGE_JPG,
    pdf: FileEnums.APPLICATION_PDF,
    png: FileEnums.IMAGE_PNG,
    excel: FileEnums.EXCEL
}

export const disableHours = (date: any, disableHours: number) => {
    const result: number[] = [];
    if (moment(date).isSame(moment(), 'date')) {
        const currentHour = moment().hour();
        const addedTime = currentHour + disableHours;
        for (let i = 0; i <= addedTime; i++) {
            result.push(i);
        };
        return result;
    }
    return result
};
export const downloadURL = async (url: string | unknown) => {
    if (typeof (url) === 'string') {
        try {
            // Fetch the file
            const response = await fetch(url, {
                mode: 'no-cors'
            });
            // Check if the request was successful
            if (!response.ok) {
                downloadFile(url, 'application/pdf')
                //throw new Error(`Unable to download file. HTTP status: ${response.status}`);
            }
            if (response.ok) {
                const blob = await response.blob();
                const { type } = blob;
                downloadFile(blob, type, 'download');
            }
        }
        catch {
            console.error(`Unable to download file`)
        }
    }
}
export const downloadFiles = (response: AxiosResponse<any, any> | undefined) => {
    if (response?.status === TWO_HUNDRED_SUCCESS_CODE) {
        const contentType = response?.headers?.['content-type'];
        const [, fileName] = (response?.headers?.['content-disposition']?.split('filename=')) || [];
        downloadFile(response?.data, contentType, fileName);
    }

}
export const downloadFile = (response: Blob | string | unknown, applicationType: string | undefined, fileName?: string) => {
    const url = (response instanceof Blob) ? window.URL.createObjectURL(new Blob([(response)], { type: applicationType })) : response;
    const link = document.createElement('a')
    link.href = url as string;
    link.target = "_blank";
    fileName && link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
}

export const downloadBlob = async (response: any, fileName: string, fileType = 'application/pdf') => {
    const href = `data:${fileType};base64,${response}`;
    fetch(href)
        .then(res => res.blob())
        .then((response) => {
            downloadFile(response, fileType, fileName)
        })
}

export const BOOKED = 'Booked',
    BOOKING_CONFIRMED = 'AJ0002',
    BOOKING_COMPLETED = 'AJ0003',
    BOOKING_REJECTED = 'Booking Canceled',
    PICKUP_DRIVER_ASSIGNED = 'AJ0005',
    PICKUP_DRIVER_ACKNOWLEDGED = 'AJ0006',
    PICKED_UP = 'AJ0007',
    RECEIVED_AT_HUB = 'Recived at Hub',
    DELIVERY_DRIVER_ASSIGNED = 'AJ0009',
    DELIVERY_DRIVER_ACKNOWLEDGED = 'Delivery Driver Acknowledged',
    DELIVERED = 'Delivered',
    LOAD_TO_DEST = 'AJ0012',
    ARRIVED_AT_TRANSIT = 'AJ0013';

export const errorCode: { [key: string]: string } = {
    [BOOKED]: 'processing',
    [DELIVERED]: 'success',
    [BOOKING_REJECTED]: 'error',
    [RECEIVED_AT_HUB]: 'warning',
    [DELIVERY_DRIVER_ACKNOWLEDGED]: '#2db7f5',
};

export const isEmptyCheck = (value: string | undefined | null) => ['', undefined, null].includes(value);
export const isLifeScienceCustomer = (value: number | undefined) => [USER_CUSTOMER_TYPE.LS_POSS].includes(value!);

// normally TABLE_HEADER_HEIGHT would be 55.
export const TABLE_HEADER_HEIGHT = 80, NAV_HEADER_HEIGHT = 65;

export const getSubClient = (productId: number, accountDetailList: IProductType[], subProductId?: number) => {
    return accountDetailList?.filter((item) => (item?.productId === productId))
        .flatMap(item => item?.subProductList?.filter((i) => (i?.subProductId === subProductId))?.map((subProduct) => ({
            ...subProduct,
            id: subProduct?.subProductId,
            value: subProduct?.subProductName
        })));
}

export const getSubClientList = (productId: number, accountDetailList: IProductType[]) => {
    return accountDetailList?.filter((item) => (item?.productId === productId))
        .flatMap(item => item?.subProductList?.map((subProduct) => ({
            ...subProduct,
            id: subProduct?.subProductId,
            value: subProduct?.subProductName
        })));
}

export const getTemperatureList = (subProductId: number, subClientList: ISubProductList[]) => {

    return subClientList?.filter(
        (item: ISubProductList) => (item?.subProductId === subProductId))
        .flatMap((item: any) => item.temperatureList?.map((temperature: any) => ({
            id: temperature?.temperatureId,
            value: `${temperature?.customerRange} - ${temperature?.temperature}` ?? temperature?.temperature,
        })));
}

export const getTemperatureFromSubClient = (subClientList: ISubProductList) => {
    return subClientList?.temperatureList?.map((temperature) => ({
        id: temperature?.temperatureId,
        value: temperature?.customerRange ?? temperature?.temperature,
        range: temperature?.range,
        temperature: temperature?.temperature,
        temperatureId: temperature?.temperatureId
    })) || [];
}
export const isNotEmptyObject = (obj: {} | undefined | null) => (obj && Object.keys(obj).length > 0) || false;

export const disabledDateFromYesterday = (currentDate: Moment) => currentDate <= yesterdayDate(-1)

export const convertSetToArray = (data: any) => [...data];

export const addItem = (set: Set<any>, item: any) => {
    const id = convertSetToArray(set).find((i: any) => i?.id === item.id);
    if (set.has(id)) {
        //items = items.map(x => (x.id === item.id) ? item : x)
        return new Set(convertSetToArray(set).map((list: any) => (list.id === item.id) ? ({ ...list, isTextNeeded: item.isTextNeeded }) : list));
    }
    const newSet = new Set(set);
    newSet.add(item);
    return newSet;
};

export const deleteItem = (set: any, item: any) => {
    return (convertSetToArray(set).filter((setItem: any) => setItem?.id !== item?.key));
};


export const dropDownMapping = (list: IDropDown[] | any[] | undefined, key: string, value: string) => {
    return list?.map((item: any) => ({
        ...item,
        id: item[key],
        value: item[value]
    })) ?? [];
};


export const fileToBase64 = (e: any) => {
    const reader = new FileReader();
    reader?.readAsDataURL(e);
    return reader;
};

export function removeDuplicateObjects(arr: any[], property: string) {
    return [...new Map(arr?.map(obj => [obj?.[property], obj])).values()];
}
export const marr2 = (arr2: any[]) => new Map(arr2.map(e => [e.id, e]));

export const accountListMap = (list: any[], id: string, code: string, name: string) => {
    return list?.map(item => ({
        id: item?.[id],
        value: `${item?.[code]} - ${item?.[name]}`,
    })) || [];
}

export enum POSS_PRODUCT_TYPE_ID {
        LIFE_SCIENCE_EXPRESS = 20,
        DOMESTIC_TEMP_BOX = 27,
        // LIFE_SCIENCE_EXPRESS = 39,
        // DOMESTIC_TEMP_BOX = 7,
}