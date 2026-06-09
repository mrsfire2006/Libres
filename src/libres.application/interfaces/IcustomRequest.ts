// 1. الواجهة العامة (Generic)
export interface ICustomRequest<TResponse> {
}

export type ICustomBooleanRequest = ICustomRequest<boolean>;