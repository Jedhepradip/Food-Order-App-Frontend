// export interface RestaurantInterface {
//     city: string,
//     country: string,
//     cuisines: string
//     deliveryTime: string,
//     restaurantName: string,
//     RestaurantBanner: string,
//     _id: string
// }

export interface RestaurantInterface {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    deliveryTime: string;
    cuisines: string[];
    RestaurantBanner: string;
    user: string[];
    menus: string[];
}