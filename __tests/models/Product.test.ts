import MongoConnection from '../../src/mongo-connection';
import ProductModel from '../../src/models/Product';

describe('Product model test', () => {
  const mongoConnection = new MongoConnection(process.env.MONGO_URL);

  const productData = {
    id: 1,
    brand: 'ooy eqrceli',
    description: 'rlñlw brhrka',
    image: 'www.lider.cl/catalogo/images/whiteLineIcon.svg',
    price: 498724
  };

  /**
   * Connect to a new in-memory database before running any tests.
   */
  beforeAll(done => mongoConnection.connect(done));

  /**
   * Remove and close the db and server.
   */
  afterAll(done => mongoConnection.close(done));

  /**
   * Remove all the data for this collection.
   */
  beforeEach(async () => ProductModel.deleteMany({}));

  it('creates a product successfully', async () => {
    const savedProduct = await ProductModel.create(productData);

    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.id).toBe(productData.id);
    expect(savedProduct.brand).toBe(productData.brand);
    expect(savedProduct.description).toBe(productData.description);
    expect(savedProduct.image).toBe(productData.image);
    expect(savedProduct.price).toBe(productData.price);
  });
});
