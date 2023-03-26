import injectLogger from "../../../common/common-domain/logs/injectLogger";
import LoggerInjected from "../../../common/common-domain/logs/LoggerInjected";
import RestaurantApprovalResponse from "../../order-application/message/RestaurantApprovalResponse";
import RestaurantApprovalResponseMessageListener from "./ports/input/message/listeners/restaurant-approval/RestaurantApprovalResponseMessageListener";

@injectLogger
class RestaurantApprovalResponseMessageListenerImplementation
    implements RestaurantApprovalResponseMessageListener {
    orderApproved(restaurantApprovalResponse: RestaurantApprovalResponse): void {
        throw new Error("Method not implemented.");
    }

    orderRejected(restaurantApprovalResponse: RestaurantApprovalResponse): void {
        throw new Error("Method not implemented.");
    }
}

declare interface RestaurantApprovalResponseMessageListenerImplementation
    extends LoggerInjected { }

export default RestaurantApprovalResponseMessageListenerImplementation