import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()

//will call controller func
router.post('/create-orders',OrderController.createOrder)
router.get('/all-orders', OrderController.getAllOrders)
router.get('/revenue', OrderController.calRevenue)
export const orderRoutes = router;

