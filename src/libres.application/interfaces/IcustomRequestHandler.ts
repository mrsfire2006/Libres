export interface ICustomRequestHandler<TRequest, TResponse> {
    handle(request: TRequest): Promise<TResponse>;
}