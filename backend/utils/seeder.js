const Product = require("../models/productModel");
const products = require("../data/products.json");
const connectDatabase = require('../config/database')
const dotenv = require('dotenv')

dotenv.config({path:"backend/config/config.env"})

connectDatabase()

const seedProducts = async() => {
  try {
    await Product.deleteMany();
    console.log("products deleted");
    await Product.insertMany(products);
    console.log("All products added");
  }catch (error) {
    console.log(error.message);
  }
  process.exit()
};

seedProducts()
