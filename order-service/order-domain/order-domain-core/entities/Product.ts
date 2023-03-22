import BaseEntity from "../../../../common/common-domain/entities/BaseEntity";
import Money from "../../../../common/common-domain/value-objects/Money";
import ProductId from "../../../../common/common-domain/value-objects/ProductId";

export default class Product extends BaseEntity<ProductId> {
    
    get name() {
        return this._name
    }

    get price() {
        return this._price
    }

    constructor(
        override readonly id: ProductId,
        private _name?: string,
        private _price?: Money
    ) {
        super(id)
    }

    updateWithConfirmedNameAndPrice(name: string, price: Money): void {
        this._name = name
        this._price = price
    }
}