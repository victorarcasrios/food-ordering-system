import AggregateRoot from "../../../../common/common-domain/entities/AggregateRoot";
import CustomerId from "../../../../common/common-domain/value-objects/CustomerId";

export default class Customer extends AggregateRoot<CustomerId> { }