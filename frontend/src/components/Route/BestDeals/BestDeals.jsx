import React, { useEffect, useState } from 'react';
import styles from '../../../styles/style';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const firstFive = allProducts.slice(0, 5);
      setData(firstFive);
    }
  }, [allProducts]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading} text-[#171203]`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-center grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0 ">
          {data && data.map((i, index) => <ProductCard key={index} data={i} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
