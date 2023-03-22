import RestaurantApprovalResponse from "../../../../../../../order-application/message/RestaurantApprovalResponse";

export default interface RestaurantApprovalResponseMessageListener {
    orderApproved(restaurantApprovalResponse: RestaurantApprovalResponse): void

    orderRejected(restaurantApprovalResponse: RestaurantApprovalResponse): void
}