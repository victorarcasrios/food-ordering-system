import createUid from "../../../../common/common-domain/createUid";
import AggregateRoot from "../../../../common/common-domain/entities/AggregateRoot";
import CustomerId from "../../../../common/common-domain/value-objects/CustomerId";
import Money from "../../../../common/common-domain/value-objects/Money";
import OrderId from "../../../../common/common-domain/value-objects/OrderId";
import OrderStatus from "../../../../common/common-domain/value-objects/OrderStatus";
import RestaurantId from "../../../../common/common-domain/value-objects/RestaurantId";
import OrderDomainError from "../errors/OrderDomainError";
import OrderItemId from "../value-objects/OrderItemId";
import StreetAddress from "../value-objects/StreetAddress";
import TrackingId from "../value-objects/TrackingId";
import OrderItem from "./OrderItem";

export default class Order extends AggregateRoot<OrderId | undefined> {
    override id: OrderId | undefined = undefined

    private _trackingId: TrackingId | undefined
    private _orderStatus: OrderStatus | undefined
    private _failureMessages: string[] = []

    get trackingId(): TrackingId | undefined {
        return this._trackingId
    }

    get orderStatus(): OrderStatus | undefined {
        return this._orderStatus
    }

    get failureMessages(): string [] {
        return this._failureMessages
    }

    constructor(
        readonly customerId: CustomerId,
        readonly restaurantId: RestaurantId,
        readonly deliveryAddress: StreetAddress,
        readonly price: Money,
        readonly items: OrderItem[]
    ) {
        super(undefined)
    }

    initializeOrder() {
        this.id = new OrderId(createUid())
        this._trackingId = new TrackingId(createUid())
        this._orderStatus = OrderStatus.Pending
        this.initializeOrderItems()
    }

    initializeOrderItems() {
        let itemId = 1
        for (const item of this.items) {
            item.initializeOrderItem(
                super.id!, 
                new OrderItemId(itemId++)
            )
        }
    }

    validateOrder() {
        this.validateInitialOrder()
        this.validateTotalPrice()
        this.validateItemsPrice()
    }

    pay() {
        if (this.orderStatus !== OrderStatus.Pending) {
            throw new OrderDomainError(
                "Order is not in the correct state for pay operation!"
            )
        }

        this._orderStatus = OrderStatus.Paid
    }

    approve() {
        if (this.orderStatus !== OrderStatus.Paid) {
            throw new OrderDomainError(
                "Order is not in the correct state for approve operation!"
            )
        }

        this._orderStatus = OrderStatus.Approved
    }

    initCancelling(failureMessages: string[]) {
        if (this.orderStatus !== OrderStatus.Paid) {
            throw new OrderDomainError(
                "Order is not in the correct state for init cancelling operation!"
            )
        }

        this._orderStatus = OrderStatus.Cancelling
        this.updateFailureMessages(failureMessages)
    }

    cancel(failureMessages: string[]) {
        if (this.orderStatus !== OrderStatus.Pending
            && this.orderStatus !== OrderStatus.Cancelling) {
            throw new OrderDomainError(
                "Order is not in the correct state for cancel operation!"
            )
        }

        this._orderStatus = OrderStatus.Cancelled
        this.updateFailureMessages(failureMessages)
    }

    private validateInitialOrder() {
        if (this.orderStatus || this.id) {
            throw new OrderDomainError(
                "Order is not in correct state for initialization!"
            )
        }
    }

    private validateTotalPrice() {
        if (!this.price || !this.price.isGreaterThanZero()) {
            throw new OrderDomainError(
                "Order price must be greater than zero!"
            )
        }
    }

    private validateItemsPrice() {
        const orderItemsTotal = this.items.map(orderItem => {
            this.validateItemPrice(orderItem)

            return orderItem.subTotal
        }).reduce(
            (subTotal, money) => subTotal.add(money), 
            new Money(0)
        )

        if (!this.price.equals(orderItemsTotal)) {
            throw new OrderDomainError(
                `Total price ${this.price} is not equal to `
                + `order items total: ${orderItemsTotal}!`
            )
        }
    }

    private validateItemPrice(item: OrderItem) {
        if (!item.isPriceValid()) {
            throw new OrderDomainError(
                `Order item price: ${item.price.amount} is not `
                + `valid for product: ${item.product.id.value}!`
            )
        }
    }

    private updateFailureMessages(messages: string[]) {
        if (this.failureMessages && messages) {
            this._failureMessages = [
                ...this.failureMessages,
                ...messages
            ].filter(m => m.trim().length)
        }

        if (!this.failureMessages) {
            this._failureMessages = messages
        }
    }
}