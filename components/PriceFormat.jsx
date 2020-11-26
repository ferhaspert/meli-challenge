import React from "react";
import NumberFormat from "react-number-format";

const getCurrencySymbol = (currency) => {
  switch (currency) {
    case "ARS":
      return "$ ";
    case "USD":
      return "U$S ";
  }
};

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
