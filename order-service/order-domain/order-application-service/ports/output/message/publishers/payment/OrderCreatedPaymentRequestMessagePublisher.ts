import DomainEventPublisher from "../../../../../../../../common/common-domain/events/publishers/DomainEventPublisher";
import OrderCreatedEvent from "../../../../../../order-domain-core/events/OrderCreatedEvent";

export default interface OrderCreatedPaymentRequestMessagePublisher
    extends DomainEventPublisher<OrderCreatedEvent> { }