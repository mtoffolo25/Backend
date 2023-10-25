import {Router} from 'express';
import { mockingProducts } from '../../controllers/mocking.controller';

const mockingProducts = Router();

mockingProducts.get('/', mockingProducts)

export default mockingProducts;