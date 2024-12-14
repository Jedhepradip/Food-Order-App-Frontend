interface Menuinterfase {
    menuPictuer: string | undefined;
    name: string;
    description: string;
    price: number;
    menuPicture: string;
    _id: string | number;
    createdAt: string;
    restaurantId: string;
    __v: string;
    updatedAt: string;
}

export interface CartItem {
    Menu: Menuinterfase; // Single Menu object
    quantity: number; // Quantity for the specific menu item
}

export interface UserInterFaceData {
    profilePictuer: string;  //profilePicture
    name: string;
    email: string;
    contact: string;
    password: string;
    address: string;
    country: string;
    city: string;
    updatedAt: string;
    items: CartItem[]; // Array of individual CartItem objects
    __v: string;
    _id: string;
}
