import { useContext } from "react";
import { UserContext } from "../components/ContextComponent/UserContextComponent";

export const useContextHook = () => {
    // get the context
    const context = useContext(UserContext);
    // if `undefined`, throw an error
    if (!context) {
        throw new Error("useUserContext was used outside of its Provider");
    }
    return context;
};