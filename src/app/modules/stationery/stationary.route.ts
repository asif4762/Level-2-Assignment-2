import express from 'express'
import { StationeryController } from './stationary.controller'

const router  = express.Router()

//will call controller func
router.post('/create-stationary', StationeryController.createStationary)
router.get('/all-stationary', StationeryController.getAllStationary)
router.get('/:productId', StationeryController.getOneStationary)
router.put('/:productId', StationeryController.updateOneStationary)
router.delete('/:productId', StationeryController.deleteOneStationary)


export const stationeryRoutes = router;
