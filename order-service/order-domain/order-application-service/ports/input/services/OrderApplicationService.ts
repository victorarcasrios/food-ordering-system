import CreateOrderCommand from "../../../../../order-application/create/CreateOrderCommand";
import CreateOrderResponse from "../../../../../order-application/create/CreateOrderResponse";
import TrackOrderQuery from "../../../../../order-application/track/TrackOrderQuery";
import TrackOrderResponse from "../../../../../order-application/track/TrackOrderResponse";

export default interface OrderApplicationService {
    createOrder(createOrderCommand: CreateOrderCommand): CreateOrderResponse

    trackOrder(trackOrderQuery: TrackOrderQuery): TrackOrderResponse
}