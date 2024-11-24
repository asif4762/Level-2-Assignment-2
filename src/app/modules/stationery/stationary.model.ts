import { Schema, model, connect } from 'mongoose';
import { Stationery } from './stationery.interface';

const stationerySchema = new Schema<Stationery>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      enum: ["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const stationeryModel = model<Stationery>('Stationery', stationerySchema);
export default stationeryModel;