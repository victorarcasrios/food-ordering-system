import Joi from "joi";
import { schema } from "ts-decorator-validation";
import Uid from "../../../common/common-domain/value-objects/Uid";
import OrderAddress, { orderAddressSchema } from "./OrderAddress";
import OrderItem, { orderItemSchema } from "./OrderItem";

export const createOrderCommandSchema = Joi.object<CreateOrderCommand>({
    customerId: Joi.string().guid(),
    restaurantId: Joi.string().guid(),
    price: Joi.number().positive().precision(2),
    items: Joi.array().items(orderItemSchema).min(1),
    address: orderAddressSchema
})

@schema(createOrderCommandSchema, true)
export default class CreateOrderCommand {
    constructor(
        readonly customerId: Uid,
        readonly restaurantId: Uid,
        readonly price: number,
        readonly items: OrderItem[],
        readonly address: OrderAddress
    ) { }
}
