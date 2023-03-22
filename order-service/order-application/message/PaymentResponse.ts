import PaymentStatus from "../../../common/common-domain/value-objects/PaymentStatus";

export default class PaymentResponse {
    constructor(
        readonly id: string,
        readonly sagaId: string,
        readonly orderId: string,
        readonly paymentId: string,
        readonly customerId: string,
        readonly price: number,
        readonly createdAt: Date,
        readonly paymentStatus: PaymentStatus,
        readonly failureMessages: string[]
    ) { }
}