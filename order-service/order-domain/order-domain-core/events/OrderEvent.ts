import DomainEvent from "../../../../common/common-domain/events/DomainEvent";
import Order from "../entities/Order";

export default abstract class OrderEvent implements DomainEvent<Order> {
    constructor(
        readonly order: Order,
        readonly createdAt: Date
    ) { }
}