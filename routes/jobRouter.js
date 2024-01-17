import { Router } from "express";
const router = Router();
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getSingleJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParams,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get('/', getAllJobs);
// router.post('/', createJob);

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParams, getSingleJob)
  .patch(checkForTestUser, validateJobInput, validateIdParams, updateJob)
  .delete(checkForTestUser, validateIdParams, deleteJob);

export default router;
