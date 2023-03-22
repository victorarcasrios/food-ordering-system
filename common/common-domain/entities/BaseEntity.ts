export default abstract class BaseEntity<Id> {
    constructor(
        protected id: Id
    ) { }
}