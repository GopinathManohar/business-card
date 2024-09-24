import axios, { AxiosRequestConfig } from "axios";
import { SessionStorage } from "./storage";

const baseURL: string | undefined = process.env.REACT_APP_API_BASE_URL;

const AjexPortalService = axios.create({
    baseURL: baseURL,
    headers: {
        Accept: 'application/json',
    }
});

AjexPortalService.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = SessionStorage.get('token');
    if (token?.length) {
        if (token) {
            config.headers!.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}
);

export default AjexPortalService;
