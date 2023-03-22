import DomainEventPublisher from "../../../../../../../../common/common-domain/events/publishers/DomainEventPublisher";
import OrderPaidEvent from "../../../../../../order-domain-core/events/OrderPaidEvent";

export default interface OrderPaidRestaurantRequestMessagePublisher
    extends DomainEventPublisher<OrderPaidEvent> { }