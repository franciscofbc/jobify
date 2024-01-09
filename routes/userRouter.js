import { Router } from 'express';
const router = Router();
import {
  getCurretUser,
  getApplicationStats,
  updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';

router.get('/current-user', getCurretUser);
router.get(
  '/admin/app-stats',
  authorizePermissions('admin'),
  getApplicationStats
);
router.patch('/update-user', validateUpdateUserInput, updateUser);

export default router;
