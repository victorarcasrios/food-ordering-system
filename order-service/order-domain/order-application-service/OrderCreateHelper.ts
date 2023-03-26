import injectLogger from "../../../common/common-domain/logs/injectLogger";
import LoggerInjected from "../../../common/common-domain/logs/LoggerInjected";
import CreateOrderCommand from "../../order-application/create/CreateOrderCommand";
import Order from "../order-domain-core/entities/Order";
import Restaurant from "../order-domain-core/entities/Restaurant";
import OrderCreatedEvent from "../order-domain-core/events/OrderCreatedEvent";
import OrderDomainError from "../order-domain-core/errors/OrderDomainError";
import OrderDomainService from "../order-domain-core/OrderDomainService";
import OrderDataMapper from "./mappers/OrderDataMapper";
import CustomersRepository from "./ports/output/repositories/CustomersRepository";
import OrdersRepository from "./ports/output/repositories/OrdersRepository";
import RestaurantsRepository from "./ports/output/repositories/RestaurantsRepository";

@injectLogger
class OrderCreateHelper {
    constructor(
        private readonly orderDomainService: OrderDomainService,
        private readonly ordersRepository: OrdersRepository,
        private readonly customersRepository: CustomersRepository,
        private readonly restaurantsRepository: RestaurantsRepository,
        private readonly orderDataMapper: OrderDataMapper
    ) {}

    // TODO: Transactional
    persistOrder(createOrderCommand: CreateOrderCommand): OrderCreatedEvent {
        this.checkCustomer(createOrderCommand.customerId)
        const restaurant = this.checkRestaurant(createOrderCommand)
        const order = this.orderDataMapper.createOrderCommandToOrder(createOrderCommand)
        const orderCreatedEvent = this.orderDomainService.validateAndInitiateOrder(
            order, restaurant
        )
        const orderResult = this.saveOrder(order)
        this.logger.info(`Order is created with id: ${orderResult.id?.value}`)
        return orderCreatedEvent
    }

    private saveOrder(order: Order): Order {
        const orderResult = this.ordersRepository.save(order)
        if (!orderResult) {
            const errorMessage = "Could not save order!"
            this.logger.error(errorMessage)
            throw new OrderDomainError(errorMessage)
        }

        this.logger.info(`Order is saved with id: ${order.id!.value}`)

        return orderResult
    }

    private checkCustomer(customerId: string) {
        const customer = this.customersRepository.findCustomer(customerId)
        if (!customer) {
            const errorMessage = `Could not find customer with id: ${customerId}`
            this.logger.warn(errorMessage)
            throw new OrderDomainError(errorMessage)
        }
    }

    private checkRestaurant(createOrderCommand: CreateOrderCommand): Restaurant {
        const restaurant = this.orderDataMapper.createOrderCommandToRestaurant(
            createOrderCommand
        )

        const maybeRestaurant = this.restaurantsRepository.findRestaurantInformation(
            restaurant
        )

        if (!maybeRestaurant) {
            const errorMessage = `Could not find restaurant with id ${createOrderCommand.restaurantId}`
            this.logger.warn(errorMessage)
            throw new OrderDomainError(errorMessage)
        }

        return maybeRestaurant
    }
}

declare interface OrderCreateHelper extends LoggerInjected { }

export default OrderCreateHelper