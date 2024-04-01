import React, { useEffect, useState } from "react";
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../store/categorySlice";
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from "../../store/productSlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";
import Pagination from "../../components/Pagination/Pagination";

const HomePage = () => {
  const dispatch = useDispatch();
  const [currentItems, setCurrentItems] = useState(null);
  const categories = useSelector(getAllCategories);

  useEffect(() => {
    dispatch(fetchAsyncProducts(50));
  }, []);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);
  // randomizing the products in the list
  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }
  const handleGetDataFromParent = (data) => {
    setCurrentItems(data);
  };
  // let catProductsOne = products.filter((product) => product.category === categories[0]);
  // let catProductsTwo = products.filter((product) => product.category === categories[1]);
  // let catProductsThree = products.filter((product) => product.category === categories[2]);
  // let catProductsFour = products.filter((product) => product.category === categories[3]);

  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider />
      </div>

      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
              <Pagination className="pagination" data={products} handleGetDataFromParent={handleGetDataFromParent} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
