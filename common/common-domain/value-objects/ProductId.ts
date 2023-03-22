import BaseId from "./BaseId";
import Uid from "./Uid";

export default class ProductId extends BaseId<Uid> {
    constructor(id: Uid) {
        super(id)
    }
}