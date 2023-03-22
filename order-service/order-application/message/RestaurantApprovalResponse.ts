import OrderApprovalStatus from "../../../common/common-domain/value-objects/OrderApprovalStatus";

export default class RestaurantApprovalResponse {
    constructor(
        readonly id: string,
        readonly sagaId: string,
        readonly orderId: string,
        readonly restaurantId: string,
        readonly createdAt: Date,
        readonly orderApprovalStatus: OrderApprovalStatus,
        readonly failureMessages: string[]
    ) { }
}