import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_FAIL2,
  PRODUCT_LIST_FAIL3,
  PRODUCT_LIST_FAIL4,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_REQUEST2,
  PRODUCT_LIST_REQUEST3,
  PRODUCT_LIST_REQUEST4,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_SUCCESS2,
  PRODUCT_LIST_SUCCESS3,
  PRODUCT_LIST_SUCCESS4,
} from "../constants/productConstants";

export const getProductsByFilter = (arg) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.post("/api/filter/search", arg);

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsByFilter2 = (arg) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST2 });
    const { data } = await axios.post("/api/filter/search", arg);

    dispatch({
      type: PRODUCT_LIST_SUCCESS2,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL2,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsByFilter3 = (arg) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST3 });
    const { data } = await axios.post("/api/filter/search", arg);

    dispatch({
      type: PRODUCT_LIST_SUCCESS3,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL3,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getProductsByFilter4 = (arg) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST4 });
    const { data } = await axios.post("/api/filter/search", arg);

    dispatch({
      type: PRODUCT_LIST_SUCCESS4,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL4,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
