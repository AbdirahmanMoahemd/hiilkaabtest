import express from "express";
import {
  getProducts,
  getProductsByCategory,
  getDiscProducts,
  getProductsBySubcategory,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getBrands
} from "../controllers/productController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/dis", getDiscProducts);
router.get("/brands", getBrands);
router.post("/search/sub", getProductsBySubcategory);
router.post("/search/cat", getProductsByCategory);
router.route("/:id/reviews").post(protect, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
