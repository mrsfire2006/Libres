export abstract class Entity {
    protected readonly _id: string;

    constructor(id: string) {
        this._id = id;
    }

    get id(): string {
        return this._id;
    }


    public equals(obj?: Entity): boolean {
        if (obj === null || obj === undefined) return false;
        if (this === obj) return true;
        
        if (Object.getPrototypeOf(this) !== Object.getPrototypeOf(obj)) {
            return false;
        }

        return this._id === obj._id;
    }
}