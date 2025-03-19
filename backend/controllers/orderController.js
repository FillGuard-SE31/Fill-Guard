// // backend/controllers/orderController.js
// import asyncHandler from "../middleware/asyncHandler.js";
// import Order from "../models/orderModel.js";
// import Device from "../models/Device.js";

// /**
//  * @desc  Create new order
//  * @route POST /api/orders
//  * @access Private
//  */
// const addOrderItems = asyncHandler(async (req, res) => {
//   const {
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   } = req.body;

//   if (!orderItems || orderItems.length === 0) {
//     res.status(400);
//     throw new Error("No order items");
//   }

//   // Ensure totalPrice is a valid number and fix its precision
//   const fixedTotalPrice =
//     totalPrice && totalPrice > 0 ? Number(totalPrice).toFixed(2) : "1.00";

//   const order = new Order({
//     user: req.user._id,
//     orderItems: orderItems.map((item) => ({
//       ...item,
//       _id: undefined,
//     })),
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice: fixedTotalPrice,
//   });

//   const createdOrder = await order.save();

//   // Create a Device document for each orderItem
//   for (let index = 0; index < createdOrder.orderItems.length; index++) {
//     const item = createdOrder.orderItems[index];
//     // Generate a serial number (for example: "<orderId>-<index+1>")
//     const serialNumber = `${createdOrder._id}-${index + 1}`;
//     const device = new Device({
//       product: item.product,
//       user: req.user._id,
//       order: createdOrder._id,
//       serialNumber,
//     });
//     await device.save();
//   }

//   res.status(201).json(createdOrder);
// });

// /**
//  * @desc  Get logged in user's orders
//  * @route GET /api/orders/myorders
//  * @access Private
//  */
// const getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   res.json(orders);
// });

// /**
//  * @desc  Get order by ID
//  * @route GET /api/orders/:id
//  * @access Private
//  */
// const getOrderById = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id).populate(
//     "user",
//     "name email"
//   );
//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// /**
//  * @desc  Update order to paid
//  * @route PUT /api/orders/:id/pay
//  * @access Private
//  */
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     };

//     order.totalPrice =
//       order.totalPrice > 0 ? Number(order.totalPrice).toFixed(2) : "1.00";

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// /**
//  * @desc  Update order to delivered
//  * @route PUT /api/orders/:id/deliver
//  * @access Private/Admin
//  */
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isDelivered = true;
//     order.deliveredAt = Date.now();

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// /**
//  * @desc  Get all orders
//  * @route GET /api/orders
//  * @access Private/Admin
//  */
// const getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate("user", "id name");
//   res.json(orders);
// });

// export {
//   addOrderItems,
//   getMyOrders,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getOrders,
// };

// // backend/controllers/orderController.js
// import asyncHandler from "../middleware/asyncHandler.js";
// import Order from "../models/orderModel.js";
// import Device from "../models/Device.js";

// /**
//  * @desc  Create new order
//  * @route POST /api/orders
//  * @access Private
//  */
// const addOrderItems = asyncHandler(async (req, res) => {
//   const {
//     orderItems,
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice,
//   } = req.body;

//   if (!orderItems || orderItems.length === 0) {
//     res.status(400);
//     throw new Error("No order items");
//   }

//   // Ensure totalPrice is a valid number and fix its precision
//   const fixedTotalPrice =
//     totalPrice && totalPrice > 0 ? Number(totalPrice).toFixed(2) : "1.00";

//   const order = new Order({
//     user: req.user._id,
//     orderItems: orderItems.map((item) => ({
//       ...item,
//       _id: undefined,
//     })),
//     shippingAddress,
//     paymentMethod,
//     itemsPrice,
//     taxPrice,
//     shippingPrice,
//     totalPrice: fixedTotalPrice,
//   });

//   const createdOrder = await order.save();

//   // Create a Device document for each individual unit in the order
//   let deviceCounter = 1;
//   for (let index = 0; index < createdOrder.orderItems.length; index++) {
//     const item = createdOrder.orderItems[index];
//     // For each unit (qty) of the order item, create a separate Device record
//     for (let count = 0; count < item.qty; count++) {
//       const serialNumber = `${createdOrder._id}-${deviceCounter}`;
//       const device = new Device({
//         product: item.product,
//         user: req.user._id,
//         order: createdOrder._id,
//         serialNumber,
//       });
//       await device.save();
//       deviceCounter++;
//     }
//   }

//   res.status(201).json(createdOrder);
// });

// /**
//  * @desc  Get logged in user's orders
//  * @route GET /api/orders/myorders
//  * @access Private
//  */
// const getMyOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({ user: req.user._id });
//   res.json(orders);
// });

// /**
//  * @desc  Get order by ID
//  * @route GET /api/orders/:id
//  * @access Private
//  */
// const getOrderById = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id).populate("user", "name email");
//   if (order) {
//     res.json(order);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// /**
//  * @desc  Update order to paid
//  * @route PUT /api/orders/:id/pay
//  * @access Private
//  */
// const updateOrderToPaid = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isPaid = true;
//     order.paidAt = Date.now();
//     order.paymentResult = {
//       id: req.body.id,
//       status: req.body.status,
//       update_time: req.body.update_time,
//       email_address: req.body.payer.email_address,
//     };

//     order.totalPrice =
//       order.totalPrice > 0 ? Number(order.totalPrice).toFixed(2) : "1.00";

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// /**
//  * @desc  Update order to delivered
//  * @route PUT /api/orders/:id/deliver
//  * @access Private/Admin
//  */
// const updateOrderToDelivered = asyncHandler(async (req, res) => {
//   const order = await Order.findById(req.params.id);
//   if (order) {
//     order.isDelivered = true;
//     order.deliveredAt = Date.now();

//     const updatedOrder = await order.save();
//     res.json(updatedOrder);
//   } else {
//     res.status(404);
//     throw new Error("Order not found");
//   }
// });

// /**
//  * @desc  Get all orders
//  * @route GET /api/orders
//  * @access Private/Admin
//  */
// const getOrders = asyncHandler(async (req, res) => {
//   const orders = await Order.find({}).populate("user", "id name");
//   res.json(orders);
// });

// export {
//   addOrderItems,
//   getMyOrders,
//   getOrderById,
//   updateOrderToPaid,
//   updateOrderToDelivered,
//   getOrders,
// };

// backend/controllers/orderController.js
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Device from "../models/Device.js";

/**
 * @desc  Create new order
 * @route POST /api/orders
 * @access Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  // Ensure totalPrice is a valid number and fix its precision
  const fixedTotalPrice =
    totalPrice && totalPrice > 0 ? Number(totalPrice).toFixed(2) : "1.00";

  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({
      ...item,
      _id: undefined,
    })),
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice: fixedTotalPrice,
  });

  const createdOrder = await order.save();

  // Create a Device document for each individual unit in the order
  for (let index = 0; index < createdOrder.orderItems.length; index++) {
    const item = createdOrder.orderItems[index];
    // For each unit (qty) of the order item, create a separate Device record
    for (let count = 0; count < item.qty; count++) {
      // Create device with a temporary serial number (required field)
      const device = new Device({
        product: item.product,
        user: req.user._id,
        order: createdOrder._id,
        serialNumber: "temp", // temporary placeholder
      });
      const savedDevice = await device.save();
      // Update serialNumber using the order _id and a unique suffix from the device's _id
      savedDevice.serialNumber = `${createdOrder._id}-${savedDevice._id.toString().slice(-6)}`;
      await savedDevice.save();
    }
  }

  res.status(201).json(createdOrder);
});

/**
 * @desc  Get logged in user's orders
 * @route GET /api/orders/myorders
 * @access Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/**
 * @desc  Get order by ID
 * @route GET /api/orders/:id
 * @access Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc  Update order to paid
 * @route PUT /api/orders/:id/pay
 * @access Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    order.totalPrice =
      order.totalPrice > 0 ? Number(order.totalPrice).toFixed(2) : "1.00";

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc  Update order to delivered
 * @route PUT /api/orders/:id/deliver
 * @access Private/Admin
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

/**
 * @desc  Get all orders
 * @route GET /api/orders
 * @access Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
