import Order from "../../../../order-domain-core/entities/Order";
import TrackingId from "../../../../order-domain-core/value-objects/TrackingId";

export default interface OrdersRepository {
    save(order: Order): Order

    findByTrackingId(trackingId: TrackingId): Order
}