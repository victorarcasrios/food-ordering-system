import BaseId from "../../../../common/common-domain/value-objects/BaseId";
import Uid from "../../../../common/common-domain/value-objects/Uid";

export default class TrackingId extends BaseId<Uid> {
    constructor(id: Uid) {
        super(id)
    }
}