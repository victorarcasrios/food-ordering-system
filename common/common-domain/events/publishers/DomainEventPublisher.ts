import DomainEvent from "../DomainEvent";

export default interface DomainEventPublisher<T extends DomainEvent<unknown>>{
    publish(domainEvent: T): void
}