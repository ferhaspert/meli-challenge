import React from "react";
import PriceFormat from "./PriceFormat";
import { useRouter } from "next/router";

const SearchItem = ({ id, title, picture, price, state_name }) => {
  const router = useRouter();

  const handleClick = (id) => {
    router.push({
      pathname: `/items/${id}`,
    });
  };

  return (
    <div className="result" onClick={() => handleClick(id)}>
      <div className="result-image">
        <img src={picture} />
      </div>
      <div className="result-description">
        <h4>
          <PriceFormat amount={price.amount} currency={price.currency_id} />
        </h4>
        <h2 className="title">{title}</h2>
      </div>
      <div className="result-address">
        <p>{state_name}</p>
      </div>
    </div>
  );
};

export default SearchItem;
