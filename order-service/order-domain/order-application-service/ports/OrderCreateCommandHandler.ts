import injectLogger from "../../../../common/common-domain/logs/injectLogger";
import LoggerInjected from "../../../../common/common-domain/logs/LoggerInjected";
import CreateOrderCommand from "../../../order-application/create/CreateOrderCommand";
import CreateOrderResponse from "../../../order-application/create/CreateOrderResponse";
import Order from "../../order-domain-core/entities/Order";
import Restaurant from "../../order-domain-core/entities/Restaurant";
import OrderDomainException from "../../order-domain-core/exceptions/OrderDomainException";
import OrderDomainService from "../../order-domain-core/OrderDomainService";
import OrderDataMapper from "../mappers/OrderDataMapper";
import CustomersRepository from "./output/repositories/CustomersRepository";
import OrdersRepository from "./output/repositories/OrdersRepository";
import RestaurantsRepository from "./output/repositories/RestaurantsRepository";

@injectLogger
class OrderCreateCommandHandler {
    constructor(
        readonly orderDomainService: OrderDomainService,
        readonly ordersRepository: OrdersRepository,
        readonly customersRepository: CustomersRepository,
        readonly restaurantsRepository: RestaurantsRepository,
        readonly orderDataMapper: OrderDataMapper
    ) {}

    createOrder(createOrderCommand: CreateOrderCommand): CreateOrderResponse {
        this.checkCustomer(createOrderCommand.customerId)
        const restaurant = this.checkRestaurant(createOrderCommand)
        const order = this.orderDataMapper.createOrderCommandToOrder(createOrderCommand)
        const orderCreatedEvent = this.orderDomainService.validateAndInitiateOrder(
            order, restaurant
        )
        const orderResult = this.saveOrder(order)
        this.logger.info(`Order is created with id: ${orderResult.id!.value}`)
        return this.orderDataMapper.orderToCreateOrderResponse(orderResult)
    }

    private saveOrder(order: Order): Order {
        const orderResult = this.saveOrder(order)
        if (!orderResult) {
            const errorMessage = "Could not save order!"
            this.logger.error(errorMessage)
            throw new OrderDomainException(errorMessage)
        }

        this.logger.info(`Order is saved with id: ${order.id!.value}`)

        return orderResult
    }

    private checkCustomer(customerId: string) {
        const customer = this.customersRepository.findCustomer(customerId)
        if (!customer) {
            const errorMessage = `Could not find customer with id: ${customerId}`
            this.logger.warn(errorMessage)
            throw new OrderDomainException(errorMessage)
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
            throw new OrderDomainException(errorMessage)
        }

        return maybeRestaurant
    }
}

declare interface OrderCreateCommandHandler extends LoggerInjected {}

export default OrderCreateCommandHandler