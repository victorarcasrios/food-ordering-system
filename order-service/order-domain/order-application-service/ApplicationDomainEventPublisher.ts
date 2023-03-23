import DomainEventPublisher from "../../../common/common-domain/events/publishers/DomainEventPublisher";
import injectLogger from "../../../common/common-domain/logs/injectLogger";
import LoggerInjected from "../../../common/common-domain/logs/LoggerInjected";
import OrderCreatedEvent from "../order-domain-core/events/OrderCreatedEvent";

@injectLogger
class ApplicationDomainEventPublisher
    implements DomainEventPublisher<OrderCreatedEvent> {

    publish(domainEvent: OrderCreatedEvent): void {
        this.doPublishEvent(domainEvent)
        this.logger.info(
            `OrderCreatedEvent is published for order id ${domainEvent.order.id?.value}`
        )
    }

    private doPublishEvent(domainEvent: OrderCreatedEvent): void {
    }
}

declare interface ApplicationDomainEventPublisher extends LoggerInjected { }

export default ApplicationDomainEventPublisher