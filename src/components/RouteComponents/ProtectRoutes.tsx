import { Navigate, useLocation } from 'react-router-dom';
import { SessionStorage } from '../../services/storage';

export interface IProtectRoute {
    children: JSX.Element
}
const ProtectedRoute = ({ children }: IProtectRoute) => {
    const location = useLocation();
    return SessionStorage.get('customer') === null ? <Navigate to='/' replace={true} state={{ from: location }} /> : children
}

export default ProtectedRoute