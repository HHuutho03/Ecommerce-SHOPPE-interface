import React from "react";
import "./CartMessage.scss";
import { correct } from "../../utils/images";

const CheckOutMessage = () => {
  return (
    <div className="cart-message text-center">
      <div className="cart-message-icon">
        <img src={correct} alt="" />
      </div>
      <h6 className="text-white fs-14 fw-5">An item has been Order, please wait!</h6>
    </div>
  );
};

export default CheckOutMessage;
