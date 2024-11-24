import { Order } from "./order.interface";
import orderModel from "./order.model";

const createOrderIntoDB = async (order: Order) =>{

    const result = await orderModel.create(order);
    return result;
}

const getAllOrderFromDB = async () => {
    const result = await orderModel.find();
    return result;
}

export const calculateRevenue = async () => {
    try {
      const revenueAggregation = await orderModel.aggregate([
        {
          $lookup: {
            from: 'stationeries', // Collection name for products
            localField: 'product', // Field in the orders collection
            foreignField: '_id', // Field in the stationeries collection
            as: 'productDetails', // Alias for joined data
          },
        },
        {
          $unwind: '$productDetails', // Flatten the productDetails array
        },
        {
          $addFields: {
            totalPrice: { $multiply: ['$productDetails.price', '$quantity'] }, // Compute total price
          },
        },
        {
          $group: {
            _id: null, // Group all orders
            totalRevenue: { $sum: '$totalPrice' }, // Sum all total prices
          },
        },
        {
          $project: {
            _id: 0,
            totalRevenue: 1,
          },
        },
      ]);
  
      return revenueAggregation.length > 0
        ? revenueAggregation[0].totalRevenue
        : 0;
    } catch (error) {
      console.error('Error calculating revenue:', error);
      throw new Error('Failed to calculate revenue');
    }
  };

export const OrderService = {
    createOrderIntoDB,
    getAllOrderFromDB,
    calculateRevenue
}