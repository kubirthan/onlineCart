import { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { orderDetail, orderDetail as orderDetailAction } from "../../actions/orderActions"
import Loader from "../layouts/Loader"

export default function OrderDetail(){
    const {OrderDetail, loading} = useSelector(state => state.orderState)
    const {shippingInfo={}, user={}, orderStatus='Processing', orderItems={}, totalPrice='0', paymentInfo={}} = orderDetail
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(()=> {
        dispatch(orderDetailAction(id))
    },[id])

    return (
       <Fragment>
         {
            loading ? <Loader/> :
            <Fragment>
                <div class="row d-flex justify-content-between">
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
                </div>
                </Fragment>
         }
       </Fragment>
    )
}