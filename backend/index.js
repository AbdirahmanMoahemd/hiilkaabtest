import path from "path";
import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db2.js";
import { errorHandler, notFound } from "./middlewares/errorMidlleware.js";
import productRoutes from "./routes/productRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import subCategoriesRoutes from "./routes/subCategoriesRoutes.js";
import uploadRoutes from './routes/uploadRoutes.js'
import slidesRoutes from './routes/slidesRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'
import filterRoutes from './routes/filter.js'



dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}




app.use(express.json());
app.use('/api/products', productRoutes)
app.use('/api/category', categoriesRoutes)
app.use('/api/users', userRoutes)
app.use('/api/subcategory', subCategoriesRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/slides', slidesRoutes)
app.use('/api/settings', settingsRoutes); 
app.use('/api/filter', filterRoutes); 






const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/testhiilkaab/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "testhiilkaab", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is runnin...");
  });
}




app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
