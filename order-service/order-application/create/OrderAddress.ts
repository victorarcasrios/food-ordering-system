import { schema } from "ts-decorator-validation"
import Joi from "joi"

export const orderAddressSchema = Joi.object({
    street: Joi.string().max(50),
    postalCode: Joi.string().max(10),
    city: Joi.string().max(50)
})

@schema(orderAddressSchema, true)
export default class OrderAddress {
    constructor(
        readonly street: string,
        readonly postalCode: string,
        readonly city: string
    ) { }
}