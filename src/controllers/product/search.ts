import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import { isNumeric, isPalindrome, formatCurrency } from '../../helpers';
import Product, { IProduct } from '../../models/Product';

interface IProductSerialized {
  id: IProduct['id'];
  brand: IProduct['brand'];
  description: IProduct['description'];
  image: IProduct['image'];
  price: IProduct['price'];
  discount?: number;
}

/**
 * Builds a mongoose query object to search products
 * @param search String containing the search term for product's promotions
 */
const buildProductQuery = (search: string) => {
  if (isNumeric(search)) {
    return { id: Number(search) };
  }
  if (String(search).length > 3) {
    return {
      $or: [
        { brand: new RegExp(`.*${search}.*`, 'i') },
        { description: new RegExp(`.*${search}.*`, 'i') }
      ]
    };
  }
  return null;
};

const applyDiscount = (products: IProductSerialized[]): IProductSerialized[] => (
  products.map(product => ({
    ...product,
    discount: product.price / 2
  }))
);

const get: RequestHandler = async (req, res) => {
  const { search = undefined } = req.query;
  let products: IProductSerialized[] = [];

  if (search) {
    const query = buildProductQuery(search as string);
    if (query) {
      products = await Product.find(query).lean();
    }

    if (isPalindrome(search as string)) {
      products = applyDiscount(products);
    }
  }

  res.render('pages/search', { products, search, formatCurrency });
};

export default requestMiddleware(get);
