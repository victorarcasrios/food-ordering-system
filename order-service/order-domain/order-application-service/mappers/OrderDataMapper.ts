import createUid from "../../../../common/common-domain/createUid";
import CustomerId from "../../../../common/common-domain/value-objects/CustomerId";
import Money from "../../../../common/common-domain/value-objects/Money";
import ProductId from "../../../../common/common-domain/value-objects/ProductId";
import RestaurantId from "../../../../common/common-domain/value-objects/RestaurantId";
import CreateOrderCommand from "../../../order-application/create/CreateOrderCommand";
import CreateOrderResponse from "../../../order-application/create/CreateOrderResponse";
import OrderAddress from "../../../order-application/create/OrderAddress";
import OrderItemDto from "../../../order-application/create/OrderItem";
import Order from "../../order-domain-core/entities/Order";
import OrderItem from "../../order-domain-core/entities/OrderItem";
import Product from "../../order-domain-core/entities/Product";
import Restaurant from "../../order-domain-core/entities/Restaurant";
import StreetAddress from "../../order-domain-core/value-objects/StreetAddress";

export default class OrderDataMapper {
    createOrderCommandToRestaurant(createOrderCommand: CreateOrderCommand): Restaurant {
        return new Restaurant(
            new RestaurantId(createOrderCommand.restaurantId),
            createOrderCommand.items.map(
                i => new Product(new ProductId(i.productId))
            )
        )
    }

    createOrderCommandToOrder(createOrderCommand: CreateOrderCommand): Order {
        return new Order(
            new CustomerId(createOrderCommand.customerId),
            new RestaurantId(createOrderCommand.restaurantId),
            this.orderAddressToStreetAddress(createOrderCommand.address),
            new Money(createOrderCommand.price),
            this.orderItemsToOrderItemEntities(createOrderCommand.items)
        )
    }

    orderToCreateOrderResponse(order: Order): CreateOrderResponse {
        return new CreateOrderResponse(
            order.trackingId!.value,
            order.orderStatus!
        )
    }

    private orderAddressToStreetAddress(orderAddress: OrderAddress): StreetAddress {
        return new StreetAddress(
            createUid(),
            orderAddress.street,
            orderAddress.postalCode,
            orderAddress.city
        )
    }

    private orderItemsToOrderItemEntities(items: OrderItemDto[]): OrderItem[] {
        return items.map(dto => new OrderItem(
            new Product(new ProductId(dto.productId)),
            dto.quantity,
            new Money(dto.price),
            new Money(dto.subTotal)
        ))
    }

}