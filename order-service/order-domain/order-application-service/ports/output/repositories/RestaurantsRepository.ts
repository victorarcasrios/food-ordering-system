import Restaurant from "../../../../order-domain-core/entities/Restaurant";

export default interface RestaurantsRepository {
    findRestaurantInformation(restaurant: Restaurant): Restaurant | undefined
}