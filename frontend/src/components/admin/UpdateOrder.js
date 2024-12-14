import { Fragment, useEffect, useState } from "react";
import Sidebar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { orderDetail as orderDetailAction, updateOrder } from "../../actions/orderActions";
import { toast } from "react-toastify";
import { clearOrderUpdated, clearError } from "../../slices/orderSlice";

export default function UpdateOrder() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesCleared, setImagesCleared] = useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const {id:orderId} = useParams()

  const { loading, error, isOrderUpdated, orderDetail } = useSelector(
    (state) => state.orderState
  );

  const {user = {}, orderItems = [], shippingInfo = {}, totalPrice = 0, paymentInfo = {}} = orderDetail
  const isPaid = paymentInfo.status === 'succeeded' ? true : false
  const [orderStatus, setOrderStatus] = useState("Processing")
  


  const navigate = useNavigate()
  const dispatch = useDispatch()

 

  const submitHandler = (e) => {
    e.preventDefault()
    const orderData = {}
    orderData.orderStatus = orderStatus
    dispatch(updateOrder(orderId, orderData))
  }





  useEffect(() => {
    if(isOrderUpdated){
        toast('Order updated  successfully',{
            type: 'success',
            position: "bottom-center",
            onOpen: () => dispatch(clearOrderUpdated())
        })
        return
    }

    if(error){
        toast(error, {
            position:'bottom-center',
            type:'error',
            onOpen: () => {dispatch(clearError())}
        })
        return
    }
    dispatch(orderDetailAction(orderId))
  },[isOrderUpdated, error, dispatch])

  useEffect(() => {
    if(orderDetail._id){
        setOrderStatus(orderDetail.orderStatus)
    }
  },[orderDetail])

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar/>
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Product List</h1>
        <Fragment>
        <div class="row d-flex justify-content-around">
                    <div class="col-12 col-lg-8 mt-5 order-details">

                        <h1 class="my-5">Order # {orderDetail._id}</h1>

                        <h4 class="mb-4">Shipping Info</h4>
                        <p><b>Name:</b> {user.name}</p>
                        <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                        <p class="mb-4"><b>Address:</b>{shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}, {shippingInfo.address}</p>
                        <p><b>Amount:</b> ${totalPrice}</p>

                        <hr />

                        <h4 class="my-4">Payment</h4>
                        <p class={isPaid ? 'greenColor' : 'redColor' } ><b>{isPaid ? 'PAID' : 'NOT PAID'}</b></p>


                        <h4 class="my-4">Order Status:</h4>
                        <p class={orderStatus&&orderStatus.includes('Processing') ? 'greencolor' : 'redColor'} ><b>{orderStatus}</b></p>


                        <h4 class="my-4">Order Items:</h4>

                        <hr />
                        <div class="cart-item my-1">
                            {
                                orderItems && orderItems.map(item => (
                                    <div class="row my-5">
                                        <div class="col-4 col-lg-2">
                                            <img src={item.image} alt={item.name} height="45" width="65" />
                                        </div>

                                        <div class="col-5 col-lg-5">
                                            <a to={`/product/${item.product}`}>{item.name}</a>
                                        </div>


                                        <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p>${item.price}</p>
                                        </div>

                                        <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <p>{item.quantity} Piece(s)</p>
                                        </div>
                                    </div>
                                ))
                            }
                                    
                        </div>
                        <hr/>
                    </div>
                    <div className="col-12clo-lg-8 mt-5">
                            <h4>Order Status</h4>
                            <div className="form-group">
                                <select
                                className="form-control"
                                onChange={e => setOrderStatus(e.target.value)}
                                value={orderStatus}
                                name="status">
                                    <option value="Processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                                
                            </div>
                            <button
                                disabled={loading}
                                onClick={submitHandler}
                                className="btn btn-primary btn-block">
                                    Update Status
                                </button>
                    </div>
                </div>
        </Fragment>
      </div>
    </div>
  );
}
