import { Router } from 'express';
import PlanController from '../controllers/plan.js';
import { AsyncWrapper } from '../utils/AsyncWrapper.js';
import { authenticate } from '../middlewares/token.js';

const router = Router();
const planController = new PlanController();

router.post('/', authenticate, AsyncWrapper(planController.postPlan));
router.put('/', authenticate, AsyncWrapper(planController.putPlan));
router.get('/', authenticate, AsyncWrapper(planController.getPlan));

export const planRouter = { baseUrl: '/api/plan', router };
