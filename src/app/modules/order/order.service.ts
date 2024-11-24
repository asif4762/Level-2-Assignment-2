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
            from: 'stationeries', 
            localField: 'product', 
            foreignField: '_id', 
            as: 'productDetails', 
          },
        },
        {
          $unwind: '$productDetails', 
        },
        {
          $addFields: {
            totalPrice: { $multiply: ['$productDetails.price', '$quantity'] }, 
          },
        },
        {
          $group: {
            _id: null, 
            totalRevenue: { $sum: '$totalPrice' }, 
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
