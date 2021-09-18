import CategoryPage from "../screens/Category/CategoryPage";
import HomePage from "../screens/Home/HomePage";
import LoginPage from "../screens/Login/LoginPage";
import RegisterPage from "../screens/Register/RegisterPage";
import ProfilePage from "../screens/Profile/ProfilePage";
import CartPage from "../screens/Cart/CartPage";
import Address from "../components/Address";
import ProductDetailPage from "../screens/PDP/ProductDetailPage";
import PasswordReset from "../components/PasswordReset";
import AddressBook from "../components/AddressBook";
import CheckoutPage from "../screens/Checkout/CheckoutPage";
import OrderSuccessPage from "../screens/OrderSuccess/OrderSuccessPage";

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
    component: HomePage,
    exact: true,
  },
  {
    path: "/category/:name",
    component: CategoryPage,
    exact: true,
  },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    exact: true,
    type: "unAuthenticated",
  },
  {
    path: "/product/:name",
    component: ProductDetailPage,
    exact: true,
  },
  {
    path: "/profile",
    component: ProfilePage,
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
    ],
    exact: false,
    type: "authenticated",
  },
  {
    path: "/add-address",
    component: Address,
    exact: true,
  },
  {
    path: "/update-address",
    component: Address,
    exact: true,
  },
  {
    path: "/cart",
    component: CartPage,
    exact: true,
  },
  {
    path: "/checkout",
    component: CheckoutPage,
    exact: false,
  },
  {
    path: "/orderSummary",
    component: OrderSuccessPage,
    exact: true,
  },
];

export default routes;
