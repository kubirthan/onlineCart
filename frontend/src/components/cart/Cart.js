import { Fragment } from "react";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom'

export default function Cart() {
  const { items } = useSelector((state) => state.cartState);
  return (
    <Fragment>
      {items.length == 0 ? (
        <h2 className="mt-5">Your cart is Empty</h2>
      ) : (
        <Fragment>
          <h2 className="mt-5">
            Your Cart: <b>{items.length}</b>
          </h2>

          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
              {
                items.map(item => (
                    <Fragment>
                    <hr/>
                    <div className="cart-item">
                      <div className="row">
                        <div className="col-4 col-lg-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            height="90"
                            width="115"
                          />
                        </div>
      
                        <div className="col-5 col-lg-3">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
      
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">${item.price}</p>
                        </div>
      
                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div className="stockCounter d-inline">
                            <span className="btn btn-danger minus">-</span>
                            <input
                              type="number"
                              className="form-control count d-inline"
                              value="1"
                              readOnly
                            />
      
                            <span className="btn btn-primary plus">+</span>
                          </div>
                        </div>
      
                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            className="fa fa-trash btn btn-danger"
                          ></i>
                        </div>
                      </div>
                    </div>
                    </Fragment>
                ))
              }
              
             
              
              <hr />
            </div>

            <div className="col-12 col-lg-3 my-4">
              <div id="order_summary">
                <h4>Order Summary</h4>
                <hr />
                <p>
                  Subtotal:{" "}
                  <span className="order-summary-values">1 (Units)</span>
                </p>
                <p>
                  Est. total:{" "}
                  <span className="order-summary-values">$245.67</span>
                </p>

                <hr />
                <button id="checkout_btn" className="btn btn-primary btn-block">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}
