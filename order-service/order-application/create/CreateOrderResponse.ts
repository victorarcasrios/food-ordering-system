import OrderStatus from "../../../common/common-domain/value-objects/OrderStatus";
import Uid from "../../../common/common-domain/value-objects/Uid";

export default class CreateOrderResponse {
    constructor(
        readonly orderTrackingId: Uid,
        readonly orderStatus: OrderStatus,
        readonly message: string = ""
    ) { }
}