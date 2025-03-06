// backend/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

import connectDB from './config/db.js';

// Load .env variables
dotenv.config();

// Connect to database
connectDB();

/**
 * Import sample data into MongoDB
 */
const importData = async () => {
  try {
    // Clear out existing collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert sample users and retrieve inserted users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; // First user in users.js is admin

    // Assign the adminUser ID to each sample product
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert sample products
    await Product.insertMany(sampleProducts);

    console.log('Sample users and products imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

/**
 * Destroy all data (users, products, orders)
 */
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('All data destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// CLI: node seeder.js -d  => destroy data
//      node seeder.js     => import data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}