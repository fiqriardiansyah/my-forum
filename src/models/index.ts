import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ThunkDispatch, ThunkAction, AnyAction } from "@reduxjs/toolkit";

export * from "./response";
export * from "./request";

export interface BaseResponse<T = any> {
    data: T;
    status: "success" | "fail";
    message: string;
}

export interface GetMethodParams<T = any> {
    url: string;
    config?: AxiosRequestConfig<T>;
}

export interface PostMethodParams<T = any> {
    url: string;
    data?: any;
    config?: AxiosRequestConfig<T>;
}

export interface PutMethodParams<T = any> {
    url: string;
    data?: any;
    config?: AxiosRequestConfig<T>;
}

export interface DeleteMethodParams<T = any> {
    url: string;
    config?: AxiosRequestConfig<T>;
}

export type AxiosResponseCustom<T> = AxiosResponse<BaseResponse<T>, any>;

export default {};
