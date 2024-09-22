const catchAsyncError = require("../middlewares/catchAsyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

//Get all products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 2
  const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);

  const products = await apiFeatures.query;
  let count = products.length;

  res.status(200).json({
    success: true,
    count,
    products,
  });
});

//create new product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

//Get Single Product - /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found ", 400));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//Update product - /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product - /api/v1/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "product deleted",
  });
});
