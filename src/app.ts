import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { orderRoutes } from './app/modules/order/order.route';
import { stationeryRoutes } from './app/modules/stationery/stationary.route';
const app : Application = express();

//parser
app.use(express.json())
app.use(cors())

//application routes
app.use('/api/orders',orderRoutes)
app.use('/api/products',stationeryRoutes)

app.get('/', (req: Request,res: Response)=>{
    res.send('Hello, World!');
})

// console.log(process.cwd())

export default app;