import Joi from "joi";
import Uid from "../../../common/common-domain/value-objects/Uid";

export const trackOrderQuerySchema = Joi.object({
    orderTrackingId: Joi.string().guid()
})

export default class TrackOrderQuery {
    constructor(
        readonly orderTrackingId: Uid
    ) { }
}