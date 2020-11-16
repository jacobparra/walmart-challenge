import { RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import Book from '../../models/Book';

const add: RequestHandler = async (req, res) => {
  const { name, author } = req.body;

  const book = new Book({ name, author });
  await book.save();

  res.send({
    message: 'Saved',
    book: book.toJSON()
  });
};

export default requestMiddleware(add);
