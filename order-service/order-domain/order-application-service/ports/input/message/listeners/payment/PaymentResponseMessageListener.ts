export default interface PaymentResponseMessageListener {
    paymentCompleted(paymentResponse: PaymentResponse): void

    paymentCancelled(paymentResponse: PaymentResponse): void
}