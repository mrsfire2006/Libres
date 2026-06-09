import { ICustomRequest } from "./IcustomRequest";

export interface ICustomMediator {
  send<TResponse>(request: ICustomRequest<TResponse>): Promise<TResponse>;
}