import { container } from "@/di/container"; 
import { ICustomMediator } from "@/libres.application/interfaces/IcustomMediator";

export const getMediator = (): ICustomMediator => {
    return container.resolve<ICustomMediator>("ICustomMediator");
};