import { Router } from 'express';
const router = Router();

import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getSingleJob,
} from '../controllers/jobController.js';
import { validateJobInput } from '../middleware/validationMiddleware.js';

// router.get('/', getAllJobs);
// router.post('/', createJob);

router.route('/').get(getAllJobs).post(validateJobInput, createJob);
router
  .route('/:id')
  .get(getSingleJob)
  .patch(validateJobInput, updateJob)
  .delete(deleteJob);

export default router;
