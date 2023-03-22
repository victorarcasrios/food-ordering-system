import BaseId from "../../../../common/common-domain/value-objects/BaseId";

export default class OrderItemId extends BaseId<number> {
    constructor(id: number) {
        super(id)
    }
 }