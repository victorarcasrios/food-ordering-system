export default class Money {
    constructor(
        readonly amount: number
    ) { }

    isGreaterThanZero(): boolean {
        return this.amount > 0
    }

    isGreaterThan(money: Money): boolean {
        return this.amount > money.amount 
    }

    add(money: Money): Money {
        return new Money(this.amount + money.amount)
    }

    substract(money: Money): Money {
        return new Money(this.amount - money.amount)
    }

    multiply(times: number): Money {
        return new Money(this.amount * times)
    }

    equals(otherEntity: Money) {
        return this.amount === otherEntity.amount
    }

    toString(): string {
        return this.amount.toFixed(2)
    }
}