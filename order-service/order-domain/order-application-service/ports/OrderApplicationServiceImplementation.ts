import { paramSchema } from "ts-decorator-validation";
import CreateOrderCommand, { createOrderCommandSchema } from "../../../order-application/create/CreateOrderCommand";
import CreateOrderResponse from "../../../order-application/create/CreateOrderResponse";
import TrackOrderQuery, { trackOrderQuerySchema } from "../../../order-application/track/TrackOrderQuery";
import TrackOrderResponse from "../../../order-application/track/TrackOrderResponse";
import OrderApplicationService from "./input/services/OrderApplicationService";
import OrderCreateCommandHandler from "./OrderCreateCommandHandler";
import OrderTrackCommandHandler from "./OrderTrackCommandHandler";

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
