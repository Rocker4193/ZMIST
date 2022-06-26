import api from "./api";

const apiRequest = (params, callbacks) => {
    const controller = new AbortController();

    api({
        signal: controller.signal,
        ...params,
    })
        .then(callbacks?.success)
        .catch(callbacks?.error)
        .finally(callbacks?.always);

    return controller;
};

export default apiRequest;
