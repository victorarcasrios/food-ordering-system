import OrderCreatedEvent from "../order-domain-core/events/OrderCreatedEvent";
import OrderCreatedPaymentRequestMessagePublisher from "./ports/output/message/publishers/payment/OrderCreatedPaymentRequestMessagePublisher";

export default class OrderCreatedEventApplicationListener {
    constructor(
        private readonly orderCreatedPaymentRequestMessagePublisher: OrderCreatedPaymentRequestMessagePublisher
    ) { }

    // TODO: Transactional event listener
    process(orderCreatedEvent: OrderCreatedEvent): void {

    }
}