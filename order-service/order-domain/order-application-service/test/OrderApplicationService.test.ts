import createUid from "../../../../common/common-domain/createUid"
import CustomerId from "../../../../common/common-domain/value-objects/CustomerId"
import Money from "../../../../common/common-domain/value-objects/Money"
import OrderId from "../../../../common/common-domain/value-objects/OrderId"
import ProductId from "../../../../common/common-domain/value-objects/ProductId"
import RestaurantId from "../../../../common/common-domain/value-objects/RestaurantId"
import CreateOrderCommand from "../../../order-application/create/CreateOrderCommand"
import OrderAddress from "../../../order-application/create/OrderAddress"
import OrderItem from "../../../order-application/create/OrderItem"
import Customer from "../../order-domain-core/entities/Customer"
import Product from "../../order-domain-core/entities/Product"
import Restaurant from "../../order-domain-core/entities/Restaurant"
import OrderDataMapper from "../mappers/OrderDataMapper"
import { anyOfClass, instance, mock, when } from "ts-mockito"
import CustomersRepository from "../ports/output/repositories/CustomersRepository"
import RestaurantsRepository from "../ports/output/repositories/RestaurantsRepository"
import OrdersRepository from "../ports/output/repositories/OrdersRepository"
import Order from "../../order-domain-core/entities/Order"
import OrderApplicationServiceImplementation from "../OrderApplicationServiceImplementation"
import OrderCreateCommandHandler from "../OrderCreateCommandHandler"
import OrderCreateHelper from "../OrderCreateHelper"
import OrderCreatedPaymentRequestMessagePublisher from "../ports/output/message/publishers/payment/OrderCreatedPaymentRequestMessagePublisher"
import OrderTrackCommandHandler from "../OrderTrackCommandHandler"
import OrderDomainServiceImplementation from "../../order-domain-core/OrderDomainServiceImplementation"
import OrderStatus from "../../../../common/common-domain/value-objects/OrderStatus"

describe("OrderApplicationServiceImplementation", () => {
    const orderDataMapper = new OrderDataMapper()
    let customersRepository: CustomersRepository
    let restaurantsRepository: RestaurantsRepository
    let ordersRepository: OrdersRepository
    let orderApplicationService: OrderApplicationServiceImplementation

    let createOrderCommand: CreateOrderCommand
    let createOrderCommandWrongPrice: CreateOrderCommand
    let createOrderCommandWrongProductPrice: CreateOrderCommand

    const customerId = createUid()
    const restaurantId = createUid()
    const productId = createUid()
    const orderId = createUid()
    const price = 200.00

    const createCreateOrderCommand = (
        firstProductPrice: number = 50.00, 
        totalPrice: number = price
    ) => new CreateOrderCommand(
        customerId,
        restaurantId,
        totalPrice,
        [
            new OrderItem(
                productId,
                1,
                firstProductPrice,
                firstProductPrice
            ),
            new OrderItem(
                productId,
                3,
                50.00,
                150.00
            )
        ],
        new OrderAddress(
            "Carrer Russafa",
            "46002",
            "València"
        )
    )

    beforeEach(() => {
        customersRepository = mock<CustomersRepository>()
        restaurantsRepository = mock<RestaurantsRepository>()
        ordersRepository = mock<OrdersRepository>()
        orderApplicationService = new OrderApplicationServiceImplementation(
            new OrderCreateCommandHandler(
                new OrderCreateHelper(
                    new OrderDomainServiceImplementation(),
                    instance(ordersRepository),
                    instance(customersRepository),
                    instance(restaurantsRepository),
                    orderDataMapper
                ),
                orderDataMapper,
                mock<OrderCreatedPaymentRequestMessagePublisher>()
            ),
            mock(OrderTrackCommandHandler)
        )

        createOrderCommand = createCreateOrderCommand()
        createOrderCommandWrongPrice = createCreateOrderCommand(50.00, price + 50.00)
        createOrderCommandWrongProductPrice = createCreateOrderCommand(60.00, price)

        const customer = new Customer(new CustomerId(customerId))
        const restaurantResponse = new Restaurant(
            new RestaurantId(restaurantId),
            [
                new Product(
                    new ProductId(productId),
                    "product-1",
                    new Money(50.00)
                ),
                new Product(
                    new ProductId(productId),
                    "product-2",
                    new Money(50.00)
                )
            ],
            true
        )
        
        const order = orderDataMapper.createOrderCommandToOrder(createOrderCommand)
        order.id = new OrderId(orderId)

        when(customersRepository.findCustomer(customerId)).thenReturn(customer)
        when(restaurantsRepository.findRestaurantInformation(anyOfClass(Restaurant)))
            .thenReturn(restaurantResponse)
        when(ordersRepository.save(anyOfClass(Order))).thenReturn(order)
    })

    test("createOrder", () => {
        const createOrderResponse = orderApplicationService.createOrder(
            createOrderCommand
        )
        expect(createOrderResponse.orderStatus).toBe(OrderStatus.Pending)
        expect(createOrderResponse.message).toBe("Order created successfully")
        expect(createOrderResponse.orderTrackingId).toBeTruthy()
    })
})