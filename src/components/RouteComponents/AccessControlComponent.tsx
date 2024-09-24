import { SessionStorage } from "../../services/storage";
import NoAccessComponent from "../CommonComponent/NoAccessComponent";

const AccessControlComponent = ({ children, access }: { children: JSX.Element, access: number[] }) => {

    const userRoles = JSON.parse(SessionStorage.get('employee') ?? '{}');
    const isAllowed = access?.some(role => userRoles?.positionId === (role));

    if (!isAllowed) {
        return (<NoAccessComponent />)
    }

    return (
        children
    )
}

export default AccessControlComponent