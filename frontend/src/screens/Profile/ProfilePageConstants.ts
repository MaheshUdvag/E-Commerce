import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListAltIcon from "@material-ui/icons/ListAlt";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import VisibilityIcon from "@material-ui/icons/Visibility";

export const PROFILE_PAGE_CONSTANTS = {
  MY_PROFILE: "PROFILE_PAGE.MY_PROFILE",
  ACCOUNT: "PROFILE_PAGE.ACCOUNT",
  CHANGE_PASSWORD: "PROFILE_PAGE.CHANGE_PASSWORD",
  ORDERS: "PROFILE_PAGE.ORDERS",
  ADDRESS_BOOK: "PROFILE_PAGE.ADDRESS_BOOK",
  WISH_LIST: "PROFILE_PAGE.WISH_LIST",
  GIFT_CARDS: "PROFILE_PAGE.GIFT_CARDS",
  PROFILE_MENU: [
    {
      icon: AccountCircleIcon,
      path: "/profile",
      name: "PROFILE_PAGE.ACCOUNT",
    },
    {
      icon: VisibilityIcon,
      path: "/profile/change-password",
      name: "PROFILE_PAGE.CHANGE_PASSWORD",
    },
    {
      icon: ShoppingCartIcon,
      path: "/profile/orders",
      name: "PROFILE_PAGE.ORDERS",
    },
    {
      icon: MenuBookIcon,
      path: "/profile/address",
      name: "PROFILE_PAGE.ADDRESS_BOOK",
    },
    {
      icon: ListAltIcon,
      path: "/profile/wish-list",
      name: "PROFILE_PAGE.WISH_LIST",
    },
    {
      icon: CardGiftcardIcon,
      path: "/profile/gift-cards",
      name: "PROFILE_PAGE.GIFT_CARDS",
    },
  ],
};
