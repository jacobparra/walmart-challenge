import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IProduct extends Document {
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
}

interface IProductModel extends Model<IProduct> { }

const schema = new Schema({
  id: { type: Number, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }
});

const Product: IProductModel = model<IProduct, IProductModel>('Product', schema);

export default Product;
