import injectLogger from "../../../common/common-domain/logs/injectLogger";
import LoggerInjected from "../../../common/common-domain/logs/LoggerInjected";
import PaymentResponseMessageListener from "./ports/input/message/listeners/payment/PaymentResponseMessageListener";

@injectLogger
class PaymentResponseMessageListenerImplementation
    implements PaymentResponseMessageListener {
    paymentCompleted(paymentResponse: PaymentResponse): void {
        throw new Error("Method not implemented.");
    }

    paymentCancelled(paymentResponse: PaymentResponse): void {
        throw new Error("Method not implemented.");
    }
}

declare interface PaymentResponseMessageListenerImplementation
    extends LoggerInjected { }

export default  PaymentResponseMessageListener