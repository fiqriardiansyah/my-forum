import client from "config/axios";
import { AxiosResponseCustom, DeleteMethodParams, GetMethodParams, PostMethodParams, PutMethodParams } from "models";

const methods = {
    get<T>(data: GetMethodParams): Promise<AxiosResponseCustom<T>> {
        return client.get(data.url, data?.config);
    },

    post<T>(data: PostMethodParams): Promise<AxiosResponseCustom<T>> {
        return client.post(data.url, data?.data, data?.config);
    },

    put<T>(data: PutMethodParams): Promise<AxiosResponseCustom<T>> {
        return client.put(data.url, data?.data, data?.config);
    },

    delete<T>(data: DeleteMethodParams): Promise<AxiosResponseCustom<T>> {
        return client.delete(data.url, data?.config);
    },
};

export default methods;
