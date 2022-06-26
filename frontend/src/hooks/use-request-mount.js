import { useEffect } from "react";
import apiRequest from "utils/request";

const useRequestMount = (params, callbacks) => {
    useEffect(() => {
        const controller = apiRequest(params, callbacks)
        
        return () => controller?.abort?.();
    }, []); // eslint-disable-line
};

export default useRequestMount;