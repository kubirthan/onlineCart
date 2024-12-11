import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { clearError } from "../../slices/productsSlice";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import Loader from "../layouts/Loader";
import {MDBDataTable} from 'mdbreact'
import Sidebar from "./SideBar";
import { clearProductdeleted } from "../../slices/productSlice";

export default function ProductList(){

    const { products = [], loading= true, error} = useSelector(state=>state.productsState)
    const {isProductDeleted, error:productError} = useSelector(state=> state.productState)

    const dispatch = useDispatch()

    const setproducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field : 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field : 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field : 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field : 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field : 'actions',
                    sort: 'asc'
                }
            ],
            rows : []
        }

        products.forEach( product => {
            data.rows.push({
                id: product._id,
                name : product.name,
                price : `$${product.price}`,
                stock : product.stock,
                actions : (
                    <Fragment>
                        <Link to={`/admin/product/${product._id}`} className="btn btn-primary"><i className="fa fa-pencil"></i></Link>
                        <Button onClick={e => deleteHandler(e,product._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </Button>
                    </Fragment>
                )
            })
        })

        return data
    }
    
    useEffect(() => {
        if(error || productError){
            toast(error || productError, {
                position: 'bottom-center',
                type: 'error',
                onOpen: ()=> {dispatch(clearError())}
            })
            return
        }

        if(isProductDeleted){
            toast('Product deleted successfully', {
                type: 'success',
                position: 'bottom-center',
                onOpen: () => {dispatch(clearProductdeleted())}
            })
            return
        }
        dispatch(getAdminProducts)
    },[dispatch, error, isProductDeleted])

    const deleteHandler = (e, id) => {
        e.target.disabled = true
        dispatch(deleteProduct(id))
    }

    return (
        <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar/>
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">Product List</h1>
          <Fragment>
            {
                loading ? <Loader/> :
                    <MDBDataTable 
                     data = {setproducts()}
                     bordered
                     striped
                     hover
                     className="px-3"
                    />
            }
          </Fragment>
        </div>
      </div>
    )
}