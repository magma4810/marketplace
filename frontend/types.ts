export type IconProps = {
  src: string;
  href: string;
  handleClick?: () => void;
  data_testid?: string;
};
  export type CardProps = {
    data: Products;
  };

  export type CardOrderProps = {
    data: Orders;
  };

  export type ProductsState = {
    products: Products[];
    loading: boolean;
  };

  export type OrdersState = {
    orders: Orders[];
    loading: boolean;
  };

  export type UserState = {
    username: string;
    password: string;
    productsID: Array<number>;
    ordersID: Array<number>;
    loading: boolean;
    isAuthenticated: boolean;
    address: string;
  };

  export type Orders = {
    id: number;
    productsID: Array<number>;
    active: boolean;
    deliveryAdress: string;
    deliveryDate: string;
    orderDate: string;
    cost: number;
  };

  export type OrderInfo = {
    username: string;
    productsID: Array<number>;
    deliveryAdress: string;
    cost: number;
  };

  export type Products = {
    id: number;
    title: string;
    description: string;
    count: number;
    photo: string;
    price: number;
    vendorInfo: string;
  };

