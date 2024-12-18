import { Router } from 'express';
import BenefitsController from '../controllers/benefits.js';
import { AsyncWrapper } from '../utils/AsyncWrapper.js';
import { authenticate } from '../middlewares/token.js';

const router = Router();
const benefitsController = new BenefitsController();

router.post('/', authenticate, AsyncWrapper(benefitsController.postBenefits));
router.put('/', authenticate, AsyncWrapper(benefitsController.putBenefits));
router.get('/', authenticate, AsyncWrapper(benefitsController.getBenefits));

export const benefitsRouter = { baseUrl: '/api/benefits', router };
