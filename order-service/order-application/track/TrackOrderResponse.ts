import OrderStatus from "../../../common/common-domain/value-objects/OrderStatus";
import Uid from "../../../common/common-domain/value-objects/Uid";

export default class TrackOrderResponse {
    constructor(
        readonly trackingOrderId: Uid,
        readonly orderStatus: OrderStatus,
        readonly failureMessages: string[]
    ) { }
}