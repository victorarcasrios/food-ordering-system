import injectLogger from "../../../common/common-domain/logs/injectLogger";
import LoggerInjected from "../../../common/common-domain/logs/LoggerInjected";
import Order from "./entities/Order";
import Restaurant from "./entities/Restaurant";
import OrderCancelledEvent from "./events/OrderCancelledEvent";
import OrderCreatedEvent from "./events/OrderCreatedEvent";
import OrderPaidEvent from "./events/OrderPaidEvent";
import OrderDomainError from "./errors/OrderDomainError";
import OrderDomainService from "./OrderDomainService";

@injectLogger
class OrderDomainServiceImplementation implements OrderDomainService {

    validateAndInitiateOrder(order: Order, restaurant: Restaurant): OrderCreatedEvent {
        this.validateRestaurant(restaurant)
        this.setOrderProductInformation(order, restaurant)
        order.validateOrder()
        order.initializeOrder()
        this.logger.info(`Order with id: ${order.id!.value} is initiated`)
        return new OrderCreatedEvent(order, new Date())
    }

    payOrder(order: Order): OrderPaidEvent {
        order.pay()
        this.logger.info(`Order with id: ${order.id!.value} is paid`)
        return new OrderPaidEvent(order, new Date())
    }

    approveOrder(order: Order): void {
        order.approve()
        this.logger.info(`Order with id: ${order.id!.value} is approved`)
    }

    cancelOrderPayment(order: Order, failureMessages: string[]): OrderCancelledEvent {
        order.initCancelling(failureMessages)
        this.logger.info(`Order payment is cancelling for order id: ${order.id!.value}`)
        return new OrderCancelledEvent(order, new Date())
    }

    cancelOrder(order: Order, failureMessages: string[]): void {
        order.cancel(failureMessages)
        this.logger.info(`Order with id: ${order.id!.value} is cancelled`)
    }

    private setOrderProductInformation(order: Order, restaurant: Restaurant) {
        for (const item of order.items) {
            for (const restaurantProduct of restaurant.products) {
                const { product: currentProduct } = item
                if (currentProduct.id.value === restaurantProduct.id.value)
                    currentProduct.updateWithConfirmedNameAndPrice(
                        restaurantProduct.name!, 
                        restaurantProduct.price!
                    )
            }
        }
    }

    private validateRestaurant(restaurant: Restaurant) {
        if (!restaurant.active) {
            throw new OrderDomainError(
                `Restaurant with id: ${restaurant.id.value} is currently not active!`
            )
        }
    }
}

declare interface OrderDomainServiceImplementation extends LoggerInjected {}

export default OrderDomainServiceImplementation