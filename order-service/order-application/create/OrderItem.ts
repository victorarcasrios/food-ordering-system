import Joi from "joi";
import { schema } from "ts-decorator-validation";
import Uid from "../../../common/common-domain/value-objects/Uid";

export const orderItemSchema = Joi.object({
    productId: Joi.string().guid(),
    quantity: Joi.number().min(1),
    price: Joi.number().positive().precision(2),
    subTotal: Joi.number().positive().precision(2)
})

@schema(orderItemSchema, true)
export default class OrderItem {
    constructor(
        readonly productId: Uid,
        readonly quantity: number,
        readonly price: number,
        readonly subTotal: number
    ) { }
}