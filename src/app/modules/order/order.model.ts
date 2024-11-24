import { Schema, model, connect } from 'mongoose';
import { Order } from './order.interface';

const orderSchema = new Schema<Order>(
    {
      email: { type: String, required: true },
      product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
    },
    {
      timestamps: true, 
      versionKey: false, 
    }
  );

const orderModel = model<Order>('orderModel', orderSchema);
export default orderModel;