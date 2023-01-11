import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/footer";
import hiilkaab from "../../data/images/hiilkaab.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createProductReview,
  listProductDetails,
} from "../../actions/prodcutActions";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConstants";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { addToWish } from "../../actions/wishlistActions";
import { getProductsByFilter } from "../../actions/filterActions";

const Product = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImg, setSelectedImg] = useState(0);

  const [isProDetails, setIsProDetails] = useState(true);
  const [isReviews, setIsReviews] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.productReview);
  const { success: successProductReview, error: errorProductReview } =
    productReview;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProductList,
    error: errrorProductList,
    products,
  } = productList;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {}, [isProDetails, isReviews]);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
    dispatch(
      getProductsByFilter({ type: "category", query: product.category })
    );
  }, [dispatch, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const addToWishHandler = () => {
    dispatch(addToWish(id));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Header />
      {/* <!-- product view --> */}
      {loading ? (
        <center>
          <ProgressSpinner
            style={{ width: "20px", height: "20px" }}
            strokeWidth="6"
            fill="var(--surface-ground)"
            animationDuration=".5s"
          />
        </center>
      ) : error ? (
        <Message severity="error" text={error} />
      ) : (
        <>
          <div class="container pt-4 pb-6 grid lg:grid-cols-2 gap-6">
            {/* <!-- product image --> */}
            <div>
              <div className="flex justify-center">
                <img
                  id="main-img"
                  src={product.images ? product.images[selectedImg] : ""}
                  class="h-72 lg:h-96"
                />
              </div>
              <div class="grid grid-cols-4 gap-4 mt-4">
                {product.images &&
                  product.images.map((img, index) => (
                    <div id={index} className="">
                      <img
                        onClick={() => {
                          setSelectedImg(index);
                          console.log(index);
                          console.log(selectedImg + 1);
                        }}
                        src={img}
                        class={
                          "single-img w-full h-24 lg:h-36 cursor-pointer border border-primary"
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/* <!-- product image end --> */}
            {/* <!-- product content --> */}
            <div>
              <h2 class="md:text-2xl text-xl font-medium uppercase mb-2">
                {product.name}
              </h2>
              <div class="flex items-center mb-4">
                <div class="flex gap-1 text-sm text-yellow-400">
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                </div>
                <div class="text-xs text-gray-500 ml-3">(150 Reviews)</div>
              </div>
              <div class="space-y-2">
                <p class="text-gray-800 font-semibold space-x-2">
                  <span>Availability: </span>
                  {product.countInStock < 0 ? (
                    <span class="text-green-600">Out Of Stock</span>
                  ) : (
                    <span class="text-green-600">In Stock</span>
                  )}
                </p>
                <p class="space-x-2">
                  <span class="text-gray-800 font-semibold">Brand: </span>
                  <span class="text-gray-600">{product.brand}</span>
                </p>
                <p class="space-x-2">
                  <span class="text-gray-800 font-semibold">Category: </span>
                  <span class="text-gray-600">{product.category.name}</span>
                </p>
              </div>
              <div class="mt-4 flex items-baseline gap-3">
                <span class="text-primary font-semibold text-xl">
                  ${product.price}
                </span>
                <span class="text-gray-500 text-base line-through">
                  ${product.newPrice}
                </span>
              </div>
              <p class="mt-4 text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                exercitationem quaerat excepturi labore blanditiis
              </p>
              {/* <!-- size --> */}
              {product.sizes && product.sizes.length === "" ? (
                ""
              ) : (
                <div class="mt-4">
                  <h3 class="text-base text-gray-800 mb-1">Size</h3>
                  <div class="flex items-center gap-2">
                    {/* <!-- single size --> */}
                    {product.sizes &&
                      product.sizes.map((size) => (
                        <div class="size-selector">
                          <input
                            type="radio"
                            name="size"
                            class="hidden"
                            id="size-xs"
                          />
                          <label
                            for="size-xs"
                            class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                          >
                            {size}
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {/* <!-- size end --> */}
              {/* <!-- color --> */}
              {product.colors && product.colors.length === "" ? (
                ""
              ) : (
                <div class="mt-4">
                  <h3 class="text-base text-gray-800 mb-1">Color</h3>
                  <div class="flex items-center gap-2">
                    {/* <!-- single color --> */}
                    {product.colors &&
                      product.colors.map((color) => (
                        <div class="color-selector">
                          <input
                            type="radio"
                            name="color"
                            class="hidden"
                            id="color-red"
                            checked
                          />
                          <label
                            for="color-red"
                            style={{ background: `${color}` }}
                            class="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
                          ></label>
                        </div>
                      ))}
                    {/* <!-- single color end --> */}
                  </div>
                </div>
              )}
              {/* <!-- color end --> */}
              {/* <!-- quantity --> */}
              <div class="mt-4">
                <h3 class="text-base text-gray-800 mb-1">Quantity</h3>
                <div class="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                  <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                    -
                  </div>
                  <div class="h-8 w-10 flex items-center justify-center">4</div>
                  <div class="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                    +
                  </div>
                </div>
              </div>
              {/* <!-- color end --> */}
              {/* <!-- add to cart button --> */}
              <div class="flex gap-3 border-b border-gray-200 pb-5 mt-6">
                <a
                  href="#"
                  class="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase 
                    hover:bg-transparent hover:text-primary transition text-sm flex items-center"
                >
                  <span class="mr-2">
                    <i class="fa fa-shopping-bag"></i>
                  </span>{" "}
                  <button onClick={addToCartHandler}>Add to cart</button>
                </a>
                <a
                  href="#"
                  class="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase 
                    hover:bg-transparent hover:text-primary transition text-sm"
                >
                  <span class="mr-2">
                    <i class="fa fa-heart"></i>
                  </span>{" "}
                  <button onClick={addToWishHandler}>Wishlist</button>
                </a>
              </div>
              {/* <!-- add to cart button end --> */}
              {/* <!-- product share icons --> */}
              <div class="flex space-x-3 mt-4">
                <a
                  href="#"
                  class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i class="fa fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i class="fa fa-twitter"></i>
                </a>
                <a
                  href="#"
                  class="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i class="fa fa-instagram"></i>
                </a>
              </div>
              {/* <!-- product share icons end --> */}
            </div>
            {/* <!-- product content end --> */}
          </div>
          {/* <!-- product view end --> */}

          {/* <!-- product details and review --> */}
          <div class="container pb-16">
            {/* <!-- detail buttons --> */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIsProDetails(true);
                  setIsReviews(false);
                }}
              >
                <div className={`border-t border-r border-l  pt-2 w-36 rounded rounded-b-none ${isProDetails ? "border-primary" : "border-gray-600"}`}>
                  <h3 class="font-roboto text-center text-gray-800 pb-3 font-medium">
                    Product Details
                  </h3>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsReviews(true);
                  setIsProDetails(false);
                }}
              >
                <div className={`border-t border-r border-l  pt-2 w-36 rounded rounded-b-none ${isReviews ? "border-primary" : "border-gray-600"}`}>
                  <h3 class="font-roboto text-center text-gray-800 pb-3 font-medium">
                    Reviews
                  </h3>
                </div>
              </button>
            </div>
            {isReviews ? (
              <div className="pt-10 grid grid-cols-1 lg:grid-cols-1 gap-4">
                <p>username</p>
                <div class="flex gap-1 text-sm text-yellow-400">
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                  <span>
                    <i class="fa fa-star"></i>
                  </span>
                </div>
                <p>comment</p>
              </div>
            ) : (
              ""
            )}

            {/* <!-- details button end --> */}
          </div>
          {/* <!-- product details and review end --> */}
        </>
      )}
      {/* <!-- related products --> */}
      <div class="container pb-16">
        <h2 class="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">
          related products
        </h2>
        {/* <!-- product wrapper --> */}
        <div class="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
          {/* <!-- single product --> */}
          {loadingProductList ? (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : errrorProductList ? (
            <Message severity="error">{errrorProductList}</Message>
          ) : (
            <>
              {products.map((pro) => (
                <div className="group rounded bg-white shadow overflow-hidden">
                  {/* <!-- product image --> */}
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-40 h-40 ">
                        <img
                          src={pro.images ? pro.images[0] : hiilkaab}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="absolute inset-0  h-40 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <Link
                          to="/"
                          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
                        >
                          <i className="fa fa-search"></i>
                        </Link>
                        <Link
                          to="/"
                          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
                        >
                          <i className="fa fa-heart"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <!-- pro image end -->
                   <!-- pro content --> */}
                  <div className="pt-4 pb-3 px-4">
                    <Link to="/">
                      <h4 className="uppercase font-medium text-base lg:text-lg mb-2 text-gray-800 hover:text-primary transition">
                        {pro.name}
                      </h4>
                    </Link>
                    <div className="flex items-baseline mb-1 space-x-2">
                      <p className="text-xl text-primary font-roboto font-semibold">
                        ${pro.price}
                      </p>
                      <p className="text-sm text-gray-400 font-roboto line-through">
                        ${pro.newPrice}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="flex gap-1 text-sm text-yellow-400">
                        <span>
                          <i className="fa fa-star"></i>
                        </span>
                        <span>
                          <i className="fa fa-star"></i>
                        </span>
                        <span>
                          <i className="fa fa-star"></i>
                        </span>
                        <span>
                          <i className="fa fa-star"></i>
                        </span>
                        <span>
                          <i className="fa fa-star"></i>
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 ml-3">(150)</div>
                    </div>
                  </div>
                  {/* <!-- pro content end -->
                   <!-- pro button --> */}
                  <Link
                    to={`/product/${pro.id}`}
                    className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                  >
                    Add to Cart
                  </Link>
                  {/* <!-- product button end --> */}
                </div>
              ))}
            </>
          )}
          {/* <!-- single product end --> */}
        </div>
        {/* // <!-- product wrapper end --> */}
      </div>
      {/* // <!-- related products end --> */}
      <Footer />
    </>
  );
};

export default Product;
