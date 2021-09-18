import React from "react";
import { useTranslation } from "react-i18next";
import { PAYMENT_SUCCESS } from "./OrderSuccessConstants";

const OrderSuccessPage: React.FC = () => {
  const { t } = useTranslation();
  const success = PAYMENT_SUCCESS;

  return <div>{t(success)}</div>;
};

export default OrderSuccessPage;
