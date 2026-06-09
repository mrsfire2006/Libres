import { ICustomMediator } from "@/libres.application/interfaces/IcustomMediator";
import { ICustomRequest } from "@/libres.application/interfaces/IcustomRequest";
import { ICustomRequestHandler } from "@/libres.application/interfaces/IcustomRequestHandler";
import { container, injectable } from "tsyringe";

@injectable()
export class CustomMediator implements ICustomMediator {
  async send<TResponse>(request: ICustomRequest<TResponse>): Promise<TResponse> {
    const commandClass = request.constructor as any;
    const handlerName = commandClass.type 
      ? `${commandClass.type}Handler` 
      : `${commandClass.name}Handler`;

    const handler = container.resolve<ICustomRequestHandler<any, TResponse>>(handlerName);

    return await handler.handle(request);
  }
}