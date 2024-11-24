import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import { calculateRevenue, OrderService } from './order.service';

  // Place a new order
  const createOrder = async (req: Request, res: Response) => {
    try {
      const zodParseData = orderValidationSchema.parse(req.body);
      // Create the order
      const result = await OrderService.createOrderIntoDB(zodParseData);

      res.status(201).json({
        success: true,
        message: 'Order placed successfully',
        data: result,
      });
    } catch (err: any) {
      res.status(err.errors ? 400 : 500).json({
        success: false,
        message: err.errors
          ? 'Validation error: Invalid input data'
          : 'Internal server error',
        errors: err.errors || null,
      });
    }
  }


  const getAllOrders = async (req: Request, res: Response) => {
    try {
      const result = await OrderService.getAllOrderFromDB();

      res.status(200).json({
        success: true,
        message: 'Orders retrieved successfully',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: 'Internal server error while retrieving orders',
        errors: err.message || null,
      });
    }
  }


  const getOrderById = async (req: Request, res: Response) => {
    try {
      const { orderId } = req.params;

      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: 'Order ID is required',
        });
      }

      const result = await OrderService.getAllOrderFromDB(orderId);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Order with ID ${orderId} not found`,
        });
      }

      res.status(200).json({
        success: true,
        message: 'Order retrieved successfully',
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: 'Internal server error while retrieving the order',
        errors: err.message || null,
      });
    }
  }

  const calRevenue = async (req: Request, res: Response) => {
    try {
      const totalRevenue = await calculateRevenue();
  
      res.status(200).json({
        message: 'Revenue calculated successfully',
        status: true,
        data: {
          totalRevenue,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: 'Failed to calculate revenue',
        status: false,
        error: error.message || 'Internal server error',
      });
    }
  }

  export const OrderController = {
    createOrder,
    getAllOrders,
    getOrderById,
    calRevenue,
  }