import { useDispatch, useSelector } from "react-redux";
import MetaData from "./layouts/MetaData";
import { Fragment, useEffect } from "react";
import { getProducts } from "../actions/productsActions";
import Loader from "./layouts/Loader";
import Product from "./product/Product";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productsState);

  useEffect(() => {
    dispatch(getProducts);
  }, []);

  return (
    <Fragment>
      { loading ? <Loader/> :
      <Fragment>
        <MetaData title={"Buy best product"} />
        <h1 id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-5">
          <div className="row">
            {products &&
              products.map((product) => (
               <Product product={product}/>
              ))}
          </div>
        </section>
      </Fragment>
      }
    </Fragment>
  );
}
