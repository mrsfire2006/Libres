import { Entity } from "./entity";

export abstract class Aggregate extends Entity {

  constructor(id: string) {
    super(id);
  }
}
