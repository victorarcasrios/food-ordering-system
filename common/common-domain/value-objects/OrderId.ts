import BaseId from "./BaseId";
import Uid from "./Uid";

export default class OrderId extends BaseId<Uid> {
    constructor(uid: Uid) {
        super(uid)
    }
}