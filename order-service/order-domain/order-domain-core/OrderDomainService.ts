import Order from "./entities/Order";
import Restaurant from "./entities/Restaurant";
import OrderCancelledEvent from "./events/OrderCancelledEvent";
import OrderCreatedEvent from "./events/OrderCreatedEvent";
import OrderPaidEvent from "./events/OrderPaidEvent";

export default interface OrderDomainService {
    validateAndInitiateOrder(order: Order, restaurant: Restaurant): OrderCreatedEvent

    payOrder(order: Order): OrderPaidEvent

    approveOrder(order: Order): void

    cancelOrderPayment(order: Order, failureMessages: string[]): OrderCancelledEvent

    cancelOrder(order: Order, failureMessages: string[]): void
}