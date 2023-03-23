import injectLogger from "../../../common/common-domain/logs/injectLogger";
import LoggerInjected from "../../../common/common-domain/logs/LoggerInjected";
import CreateOrderCommand from "../../order-application/create/CreateOrderCommand";
import CreateOrderResponse from "../../order-application/create/CreateOrderResponse";
import OrderDataMapper from "./mappers/OrderDataMapper";
import OrderCreateHelper from "./OrderCreateHelper";
import OrderCancelledPaymentRequestMessagePublisher from "./ports/output/message/publishers/payment/OrderCancelledPaymentRequestMessagePublisher";

@injectLogger
class OrderCreateCommandHandler {
    constructor(
        private readonly orderCreateHelper: OrderCreateHelper,
        private readonly orderDataMapper: OrderDataMapper,
        private readonly orderCreatedPaymentRequestMessagePublisher: OrderCancelledPaymentRequestMessagePublisher
    ) {}

    createOrder(createOrderCommand: CreateOrderCommand): CreateOrderResponse {
        const orderCreatedEvent = this.orderCreateHelper.persistOrder(
            createOrderCommand
        )
        this.logger.info(
            `Order is created with id: ${orderCreatedEvent.order.id?.value}`
        )
        this.orderCreatedPaymentRequestMessagePublisher.publish(orderCreatedEvent)
        return this.orderDataMapper.orderToCreateOrderResponse(orderCreatedEvent.order)
    }
}

declare interface OrderCreateCommandHandler extends LoggerInjected {}

export default OrderCreateCommandHandler