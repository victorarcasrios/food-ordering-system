import BaseId from "./BaseId";
import Uid from "./Uid";

export default class CustomerId extends BaseId<Uid> {
    constructor(id: Uid) {
        super(id)
    }
}