import React from "react";
import NumberFormat from "react-number-format";
import { getCurrencySymbol } from "../utils/priceFormat";

const PriceFormat = ({ amount, currency }) => (
  <NumberFormat
    value={amount}
    displayType={"text"}
    thousandSeparator="."
    decimalSeparator=","
    prefix={getCurrencySymbol(currency)}
  />
);

export default PriceFormat;
