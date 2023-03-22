import { paramSchema } from "ts-decorator-validation";
import CreateOrderCommand, { createOrderCommandSchema } from "../../order-application/create/CreateOrderCommand";
import CreateOrderResponse from "../../order-application/create/CreateOrderResponse";
import TrackOrderQuery, { trackOrderQuerySchema } from "../../order-application/track/TrackOrderQuery";
import TrackOrderResponse from "../../order-application/track/TrackOrderResponse";
import OrderCreateCommandHandler from "./OrderCreateCommandHandler";
import OrderTrackCommandHandler from "./OrderTrackCommandHandler";
import OrderApplicationService from "./ports/input/services/OrderApplicationService";

export default class OrderApplicationServiceImplementation
    implements OrderApplicationService {

    constructor(
        readonly orderCreateCommandHandler: OrderCreateCommandHandler,
        readonly orderTrackCommandHandler: OrderTrackCommandHandler
    ) { }

    createOrder(
        @paramSchema(createOrderCommandSchema)
        createOrderCommand: CreateOrderCommand
        ): CreateOrderResponse {
            return this.orderCreateCommandHandler.createOrder(createOrderCommand)
    }

    trackOrder(
        @paramSchema(trackOrderQuerySchema)
        trackOrderQuery: TrackOrderQuery
        ): TrackOrderResponse {
            return this.orderTrackCommandHandler.trackOrder(trackOrderQuery)
    }

}
