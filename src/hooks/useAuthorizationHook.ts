import { UserEum } from '../utils/common';
import { useContextHook } from './useContextHook';

const useAuthorizationHook = (positionId?: number) => {

    const { customerDetail }: any = useContextHook();

    return (
        //If the positionId is 10 then hidden is false
        //else hidden is true
        [UserEum.FINANCE].includes(customerDetail?.positionId) ? true : false
    )
}

export default useAuthorizationHook