import BaseEntity from "../../../../common/common-domain/entities/BaseEntity";
import Money from "../../../../common/common-domain/value-objects/Money";
import OrderId from "../../../../common/common-domain/value-objects/OrderId";
import OrderItemId from "../value-objects/OrderItemId";
import Product from "./Product";

export default class OrderItem extends BaseEntity<OrderItemId | undefined> {
    orderId: OrderId | undefined

    constructor(
        readonly product: Product,
        readonly quantity: number,
        readonly price: Money,
        readonly subTotal: Money
    ) {
        super(undefined)
    }

    initializeOrderItem(
        orderId: OrderId, 
        orderItemId: OrderItemId
    ) {
        this.orderId = orderId
        this.id = orderItemId
    }

    isPriceValid(): boolean {
        return this.price.isGreaterThanZero()
            && this.price.equals(this.product.price!)
            && this.price.multiply(this.quantity).equals(this.subTotal)
    }
}