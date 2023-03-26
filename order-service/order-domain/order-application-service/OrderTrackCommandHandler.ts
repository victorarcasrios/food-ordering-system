import injectLogger from "../../../common/common-domain/logs/injectLogger";
import LoggerInjected from "../../../common/common-domain/logs/LoggerInjected";
import TrackOrderQuery from "../../order-application/track/TrackOrderQuery";
import TrackOrderResponse from "../../order-application/track/TrackOrderResponse";
import OrderNotFoundError from "../order-domain-core/errors/OrderNotFoundError";
import TrackingId from "../order-domain-core/value-objects/TrackingId";
import OrderDataMapper from "./mappers/OrderDataMapper";
import OrdersRepository from "./ports/output/repositories/OrdersRepository";

@injectLogger
class OrderTrackCommandHandler {
    constructor(
        private readonly orderDataMapper: OrderDataMapper,
        private readonly ordersRepository: OrdersRepository
    ) {
    }

    // TODO: transactional
    trackOrder(trackOrderQuery: TrackOrderQuery): TrackOrderResponse {
        const orderResult = this.ordersRepository.findByTrackingId(
            new TrackingId(trackOrderQuery.orderTrackingId)
        )
        if(!orderResult) {
            const errorMessage = `Could not find order with tracking id: ${trackOrderQuery.orderTrackingId}`
            this.logger.warn(errorMessage)
            throw new OrderNotFoundError(errorMessage)
        }

        return this.orderDataMapper.orderToTrackOrderResponse(orderResult)
    }
}

declare interface OrderTrackCommandHandler extends LoggerInjected { }

export default OrderTrackCommandHandler