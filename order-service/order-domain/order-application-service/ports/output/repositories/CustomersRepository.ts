import Uid from "../../../../../../common/common-domain/value-objects/Uid";
import Customer from "../../../../order-domain-core/entities/Customer";

export default interface CustomersRepository {
    findCustomer(customerId: Uid): Customer
}