import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails';
import { useParams } from 'react-router-dom';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/action/product';

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // This will fire when the component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    // If the products array is empty, dispatch the action to fetch products
    if (allProducts.length === 0) {
      dispatch(getAllProducts());
    }
  }, [dispatch, allProducts]);

  useEffect(() => {
    console.log('Attempting to find product:', name);
    const productName = name.replace(/-/g, ' '); // convert URL parameter back to normal name
    const productData = allProducts.find(
      (product) => product.name.toLowerCase() === productName.toLowerCase()
    );

    if (productData) {
      console.log('Found product data:', productData);
      setData(productData);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      console.log('No product data found for:', productName);
      setData(null); // Clear state if no product matches
    }
  }, [name, allProducts]); // Depend on name and products

  return (
    <div>
      <Header />
      {data ? <ProductDetails data={data} /> : 'Loading product details...'}
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
