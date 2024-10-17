import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Fragment, useEffect, useState } from "react";
import { getProducts } from "../../actions/productsActions";
import Loader from "../layouts/Loader";
import Product from "../product/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from 'rc-slider'
import  Tooltip  from "rc-tooltip";
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'

export default function ProductSeach() {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState([1,1000])
  const [priceChanged, setPriceChanged] = useState(price)

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
  };

  useEffect(() => {
    if (error) {
      return toast.error(error, {
        position: "bottom-center",
      });
    }

    dispatch(getProducts(keyword,price, currentPage));
  }, [error, dispatch, currentPage, keyword, priceChanged]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Buy best product"} />
          <h1 id="products_heading">Search Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              <div className="col-6 col-md mb-5 mt-5">
                <div className="px-5" onMouseUp={()=> setPriceChanged(price)}>
                    <Slider 
                    range={true}
                    marks={
                        {
                            1: "$1",
                            1000:"$1000"
                        }
                    }
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                        setPrice(price)
                    }}
                    handleRender={renderProps => {
                        return (
                            <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}><div {...renderProps.props}></div></Tooltip>
                        )
                    }}/>
                </div>
              </div>
              <div className="col-6 col-md-9">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product col={4} key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                firstPageText={"First"}
                lastPageText={"Last"}
                nextPageText={"Next"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
}
