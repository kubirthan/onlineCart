const catchAsyncError = require("../middlewares/catchAsyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

//Get all products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3

  let buildQuery = () => {
    return new ApiFeatures(Product.find(), req.query).search().filter()
  }

  const filteredProductsCount = await buildQuery().query.countDocuments({})
  const totalProductsCount = await Product.countDocuments({})
  let productsCount = totalProductsCount

  if(filteredProductsCount !== totalProductsCount){
    productsCount = filteredProductsCount
  }

  const products = await buildQuery().paginate(resPerPage).query;

   res.status(200).json({
    success: true,
    count: productsCount,
    resPerPage,
    products
  });
});

//create new product - /api/v1/product/new
exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = []

  if(req.files.length > 0){
    req.files.forEach( file => {
      let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`
      images.push({image: url})
    })
  }

  req.body.images = images

  req.body.user = req.user.id
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product
  });
});

//Get Single Product - /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('reviews.user', 'name email');

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

  let images = []

  if(req.body.imagesCleared === 'false'){
    images = product.images
  }

  if(req.files.length > 0){
    req.files.forEach( file => {
      let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`
      images.push({image: url})
    })
  }

  req.body.images = images

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

//Get admin products - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async(req, res, next)=>{
  const products = await Product.find()
  res.status(200).send({
    success: true,
    products
  })
})