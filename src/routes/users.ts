import { Router } from 'express';

import UserController from '../controller/UserController';
import asyncWrapper from '../utils/asyncWrapper';

const router = Router();
const userController = new UserController();

router.get('/', asyncWrapper(userController.all));
router.get('/:id', asyncWrapper(userController.show));
router.post('/', asyncWrapper(userController.store));
router.put('/:id', asyncWrapper(userController.update));
router.delete('/:id', asyncWrapper(userController.destroy));

export default router;
