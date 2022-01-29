import { lazy } from "react";
import PasswordReset from "../components/PasswordReset";
import AddressBook from "../components/AddressBook";
import OrderList from "../components/OrderList";
import OrderDetail from "../components/OrderDetail";

export interface IRoute {
  path: string;
  component: any;
  exact: boolean;
  type?: string;
  routes?: IRoute[];
}

const routes: IRoute[] = [
  {
    path: "/",
    component: lazy(() => import("../screens/Home/HomePage")),
    exact: true,
  },
  {
    path: "/category/:name",
    component: lazy(() => import("../screens/Category/CategoryPage")),
    exact: true,
  },
  {
    path: "/categories",
    component: lazy(() => import("../screens/Category/CategoryListPage")),
    exact: true,
  },
  {
    path: "/login",
    component: lazy(() => import("../screens/Login/LoginPage")),
    exact: true,
  },
  {
    path: "/register",
    component: lazy(() => import("../screens/Register/RegisterPage")),
    exact: true,
    type: "unAuthenticated",
  },
  {
    path: "/product/:name",
    component: lazy(() => import("../screens/PDP/ProductDetailPage")),
    exact: true,
  },
  {
    path: "/profile",
    component: lazy(() => import("../screens/Profile/ProfilePage")),
    routes: [
      {
        path: "/profile/change-password",
        component: PasswordReset,
        exact: false,
        type: "authenticated",
      },
      {
        path: "/profile/address",
        component: AddressBook,
        exact: false,
        type: "authenticated",
      },
      {
        path: "/profile/orders",
        component: OrderList,
        exact: false,
        type: "authenticated",
      },
      {
        path: "/profile/order/:id",
        component: OrderDetail,
        exact: false,
        type: "authenticated",
      },
    ],
    exact: false,
    type: "authenticated",
  },
  {
    path: "/add-address",
    component: lazy(() => import("../components/Address")),
    exact: true,
  },
  {
    path: "/update-address",
    component: lazy(() => import("../components/Address")),
    exact: true,
  },
  {
    path: "/cart",
    component: lazy(() => import("../screens/Cart/CartPage")),
    exact: true,
  },
  {
    path: "/checkout",
    component: lazy(() => import("../screens/Checkout/CheckoutPage")),
    exact: false,
  },
  {
    path: "/orderSummary",
    component: lazy(() => import("../screens/OrderSuccess/OrderSuccessPage")),
    exact: true,
  },
];

export default routes;
