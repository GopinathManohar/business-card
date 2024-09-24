import { notification } from 'antd';
import { FcCancel, FcOk } from "react-icons/fc";
import { TWO_HUNDRED_SUCCESS_CODE } from "../utils/common";


export const getNotificationStyle = (response: any) => {
    if ((response?.status === TWO_HUNDRED_SUCCESS_CODE) || (response?.statusCode === TWO_HUNDRED_SUCCESS_CODE)) {
        notification.open({
            message: response?.data?.message || response?.statusText ||response?.message || 'Success',
            style: {
                color: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid #b7eb8f',
                backgroundColor: '#f6ffed'
            },
            icon: <FcOk />
        });
    } else {
        notification.open({
            message: response?.data?.message || 'Something Went Wrong',
            style: {
                color: 'rgba(0, 0, 0, 0.65)',
                border: '1px solid #ffa39e',
                backgroundColor: '#fff1f0'
            },
            icon: <FcCancel />
        });
    }
}