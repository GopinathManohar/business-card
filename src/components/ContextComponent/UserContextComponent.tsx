import { createContext, useMemo, useCallback } from 'react';
import { IContextInitial } from '../../model/ContextModal';
import { ILoginState } from '../../model/LoginModel';
import { SessionStorage } from '../../services/storage';
import { useLoginStore } from '../../stores/LoginStore';
import { USER_CUSTOMER_TYPE, USER_ROLES } from '../../utils/common';

interface IContext {
    children: JSX.Element
}

const UserContext = createContext({} as IContextInitial);

const UserContextComponent = ({ children }: IContext) => {

    const GetCustomerDetailAction = useLoginStore((state: ILoginState) => state?.GetCustomerDetailAction);
    const ClearLoginStore = useLoginStore((state: ILoginState) => state?.ClearLoginStore);
    const GetMasterDetailAction = useLoginStore((state: ILoginState) => state?.GetMasterDetailAction);
    const appStorage = useLoginStore((state: ILoginState) => state?.appStorage);

    const customerDetailState = useLoginStore((state: ILoginState) => state?.customerDetail) || {};
    const session = SessionStorage.get('customer') ?? '{}';
    const appStorageSession = SessionStorage.get('app-storage') ? JSON.parse(SessionStorage.get('app-storage') ?? '{}') : appStorage;
    const customerDetail = Object.keys(customerDetailState).length ? customerDetailState : JSON.parse(session);
    const { unitOfMeasureLSDtoList, sampleTypeLSDtoList, country, city, odaCityDto } = (appStorageSession) || {};
    const setCustomerDetailHandle = useCallback(async () => {
        (await Promise.allSettled([
            GetCustomerDetailAction(),
            GetMasterDetailAction()
        ]))
    }, [GetCustomerDetailAction, GetMasterDetailAction])

    const clearDetailHandle = useCallback(() => {
        ClearLoginStore()
        SessionStorage.clear();
    }, [ClearLoginStore])

    const isSuperUser = (
        [USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!) &&
        [USER_ROLES.SUPER_USER].includes(customerDetail?.customerRoleId!))

    const isPossAdminUser = (
        [USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!) &&
        [USER_ROLES.ADMIN].includes(customerDetail?.customerRoleId!))

    const isNormalUser = (
        [USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!) &&
        [USER_ROLES.NORMAL_USER].includes(customerDetail?.customerRoleId!))

    const isConsigneeSuperUser = (
        [USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!) &&
        [USER_ROLES.CONSIGNEE_SUPER_USER].includes(customerDetail?.customerRoleId!))

    const isConsigneeNormalUser = (
        [USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!) &&
        [USER_ROLES.CONSIGNEE_NORMAL_USER].includes(customerDetail?.customerRoleId!))

    const isViewUser = ([USER_CUSTOMER_TYPE.VIEW_ACCESS].includes(customerDetail?.customerRoleId!));

    const isAdminUser = [USER_CUSTOMER_TYPE.DEFAULT].includes(customerDetail?.customerTypesId!)
    const isLPossUser = [USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!)

    const values = useMemo(() => ({
        setCustomerDetailHandle,
        clearDetailHandle,
        customerDetail,
        isSuperUser,
        isNormalUser,
        isConsigneeSuperUser,
        isConsigneeNormalUser,
        isAdminUser,
        isLPossUser,
        isPossAdminUser,
        unitOfMeasureLSDtoList,
        sampleTypeLSDtoList,
        country,
        city,
        isViewUser,
        odaCityDto
    }), [setCustomerDetailHandle, isPossAdminUser, isLPossUser, clearDetailHandle, customerDetail, isSuperUser,
        isNormalUser, isConsigneeSuperUser, isConsigneeNormalUser, isAdminUser, sampleTypeLSDtoList, unitOfMeasureLSDtoList,
        country, city, odaCityDto, isViewUser])


    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>

    )
}
export { UserContext };
export default UserContextComponent