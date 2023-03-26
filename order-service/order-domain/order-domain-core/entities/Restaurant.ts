import AggregateRoot from "../../../../common/common-domain/entities/AggregateRoot";
import RestaurantId from "../../../../common/common-domain/value-objects/RestaurantId";
import Product from "./Product";

export default class Restaurant extends AggregateRoot<RestaurantId> {
    constructor(
        readonly id: RestaurantId,
        readonly products: Product[],
        public active: boolean = false
    ) {
        super(id);
    }
}