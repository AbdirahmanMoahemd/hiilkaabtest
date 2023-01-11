import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByFilter } from "../../actions/filterActions";
import ProductBuild from "./ProductBuild";

const TopRanking2 = ({id}) => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch( getProductsByFilter({ type: "category", query: id }))
  }, [dispatch, keyword]);
  return (
    <div>
      {products.map(product => (
        <ProductBuild product={product}/>
      ))}
        
        
    </div>
  );
};

export default TopRanking2;



