export default class DomainException extends Error {
    constructor(
        message: string,
        name: string = new.target.name
    ) {
        super(message)

        this.name = name

        Object.setPrototypeOf(this, new.target.prototype)
    }
}