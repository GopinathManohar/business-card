import { trackPromise } from 'react-promise-tracker';
import create from 'zustand';
import { getNotificationStyle } from '../common/notification';
import { ICommonState, IFileUpload, IFileUploads, IReport } from '../model/CommonModel';
import { CustomerDailyRecapReportService, CustomerReportService, DownloadFilesActionService, GetCurrencyService, GetIndustryListService, GetOperationFilesListService, GetOriginListService, GetPodFilesListService, GetSalesPersonService, GetSubCityListService, GetUploadedFileListService, PrintStickerService, PrintWayBillService, UploadFileService, UploadFilesService } from '../services/common-service';
import { TWO_HUNDRED_SUCCESS_CODE, downloadBlob, fileFormat } from '../utils/common';
import { ICommonInitialState } from './../model/CommonModel';
import { messageEnum, responseData } from "./common";

const initialValue: ICommonInitialState = {
    originList: [],
    subCityList: [],
    industryList: [],
    salesPersonList: [],
    currencyList: [],
    fileList: [],
    googlePosition: {},
    operationFiles: {},
    fileUploadResponse: undefined,
    download: null,
    downloads: {}, 
    podFilesList:[]
}

const CommonStore = create<ICommonState>(((set, get) => ({
    ...initialValue,
    GetOriginListAction: async (id: number) => {
        const response = await GetOriginListService(id);
        set({ originList: responseData(response?.data) })
    },
    GetSubCityListAction: async (id: number) => {
        const response = await GetSubCityListService(id);
        set({ subCityList: responseData(response?.data) })
    },
    GetIndustryListAction: async () => {
        const response = await GetIndustryListService();
        set({ industryList: responseData(response?.data) })
    },
    GetSalesPersonAction: async () => {
        const response = await GetSalesPersonService();
        set({ salesPersonList: responseData(response?.data) })
    },
    GetCurrencyAction: async () => {
        const response = await GetCurrencyService();
        set({ currencyList: responseData(response?.data) })
    },
    PrintWayBillAction: async (airWayBill: string) => {
        const response = await PrintWayBillService(airWayBill);
        if (response?.status === TWO_HUNDRED_SUCCESS_CODE) {
            downloadBlob(responseData(response?.data), `${airWayBill}.pdf`);
        }
    },
    PrintStickerAction: async (airWayBill: string) => {
        const response = await PrintStickerService(airWayBill);
        if (response?.status === TWO_HUNDRED_SUCCESS_CODE) {
            downloadBlob(responseData(response?.data), `${airWayBill}.pdf`);
        }
    },
    GetUploadedFileListAction: async (subClientId: number | undefined) => {
        const response = await GetUploadedFileListService(subClientId!);
        set({ fileList: responseData(response?.data) })
    },
    UploadFilesAction: async (fileObject: IFileUpload) => {
        const response = await UploadFilesService(fileObject);
        const { clientSubId } = responseData(response?.data)
        if (response?.status === TWO_HUNDRED_SUCCESS_CODE) {
            getNotificationStyle({ ...responseData(response?.data), statusText: messageEnum?.FILE_UPLOADED_SUCCESSFULLY });
            get().GetUploadedFileListAction(clientSubId)
        }
    },
    GetOperationFilesListAction: async (wayBillNumber: string | undefined) => {
        const response = await GetOperationFilesListService(wayBillNumber);
        set({ operationFiles: responseData(response?.data) });
    },
    UploadFileAction: async (fileObject: IFileUploads, waybillNo: string) => {
        const response = await UploadFileService(fileObject);
        if (response?.status === TWO_HUNDRED_SUCCESS_CODE) {
            set({ fileUploadResponse: response?.status });
            getNotificationStyle({ ...response, statusText: responseData(response?.data?.message!) });
            trackPromise(get().GetOperationFilesListAction(waybillNo), 'files-list-area')
        }
    },
    DownloadFilesAction: async (id: number, fileName: string, fileFormat: string, isLifeScience: boolean) => {
        const response = await DownloadFilesActionService(id);
        if (response?.status === TWO_HUNDRED_SUCCESS_CODE) {
            downloadBlob(responseData(response?.data), fileName, fileFormat);
        }
    },
    CustomerDailyRecapReportAction: async (request: IReport) => {
        const response = await CustomerDailyRecapReportService(request);
        if (response?.status === TWO_HUNDRED_SUCCESS_CODE) {
            const { fileName, fileType, file } = responseData(response?.data);
            downloadBlob(file, `${fileName}.xlsx`, fileFormat[fileType]);
        }
    },
    CustomerReportAction: async (request: IReport) => {
        const response = await CustomerReportService(request);
        if (response?.status === TWO_HUNDRED_SUCCESS_CODE) {
            const { fileName, fileType, file } = responseData(response?.data);
            downloadBlob(file, `${fileName}.xlsx`, fileFormat[fileType]);
        }
    },
    GetPodFilesListAction: async (id: number) => {
        const response = await GetPodFilesListService(id);
        set({ podFilesList: responseData(response?.data) });
    },
    SaveGooglePosition: (data: any) => {
        set({ googlePosition: data })
    }
})))


export const useCommonStore = (CommonStore);