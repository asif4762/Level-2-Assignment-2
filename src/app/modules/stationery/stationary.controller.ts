import { Request, Response } from 'express';
import { StationeryServices } from './stationary.service';
import stationeryValidationSchema from './stationary.validation';

const createStationary = async (req: Request, res: Response) => {
  try {

    // Validate input data using Zod
    const zodParseData = stationeryValidationSchema.parse(req.body);

    // Call service function to save the validated data to the database
    const result = await StationeryServices.createStationaryIntoDB(zodParseData);

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err: any) {
    console.error(err);

    // Send error response
    res.status(err.errors ? 400 : 500).json({
      success: false,
      message: err.errors
        ? 'Validation error: Invalid input data'
        : 'Internal server error while creating product',
      errors: err.errors || null,
    });
  }
};

const getAllStationary = async (req: Request, res: Response) => {
  try {
    // Call service function to retrieve all products
    const result = await StationeryServices.getAllStationaryFromDB();

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    console.error(err);

    // Send error response
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving products',
      errors: err.message || null,
    });
  }
};

const getOneStationary = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    // Call service function to retrieve a single product by ID
    const result = await StationeryServices.getOneStationaryFromDB(productId);

    // Check if the product was found
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`,
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: result,
    });
  } catch (err: any) {
    console.error(err);

    // Send error response
    res.status(500).json({
      success: false,
      message: 'Internal server error while retrieving the product',
      errors: err.message || null,
    });
  }
};

const updateOneStationary = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { stationery: updateData } = req.body;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    // Validate input data using Zod
    const zodParseData = stationeryValidationSchema.parse(updateData);

    // Call service function to update the product
    const result = await StationeryServices.updateOneStationaryInDB(productId, zodParseData);

    // Check if the product was found and updated
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`,
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err: any) {
    console.error(err);

    // Send error response
    res.status(err.errors ? 400 : 500).json({
      success: false,
      message: err.errors
        ? 'Validation error: Invalid input data'
        : 'Internal server error while updating product',
      errors: err.errors || null,
    });
  }
};

const deleteOneStationary = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Check if productId is provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required',
      });
    }

    // Call service function to delete the product
    const result = await StationeryServices.deleteOneStationaryFromDB(productId);

    // Check if the product was found and deleted
    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`,
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (err: any) {
    console.error(err);

    // Send error response
    res.status(500).json({
      success: false,
      message: 'Internal server error while deleting the product',
      errors: err.message || null,
    });
  }
};

export const StationeryController = {
  createStationary,
  getAllStationary,
  getOneStationary,
  updateOneStationary,
  deleteOneStationary,
};