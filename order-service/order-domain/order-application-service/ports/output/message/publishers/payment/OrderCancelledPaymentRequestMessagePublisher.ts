import DomainEventPublisher from "../../../../../../../../common/common-domain/events/publishers/DomainEventPublisher";
import OrderCancelledEvent from "../../../../../../order-domain-core/events/OrderCancelledEvent";

export default interface OrderCancelledPaymentRequestMessagePublisher
    extends DomainEventPublisher<OrderCancelledEvent> { }