import Uid from "../../../../common/common-domain/value-objects/Uid";

export default class StreetAddress {
    constructor(
        readonly id: Uid,
        readonly street: string,
        readonly postalCode: string,
        readonly city: string
    ) { }
}