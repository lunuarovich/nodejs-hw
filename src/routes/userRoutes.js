import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import {
  getCurrentUser,
  updateCurrentUser,
  updateUserAvatar,
} from '../controllers/userController.js';
import { updateCurrentUserSchema } from '../validations/userValidation.js';

const router = Router();

router.get('/users/me', authenticate, getCurrentUser);
router.patch(
  '/users/me',
  authenticate,
  celebrate(updateCurrentUserSchema),
  updateCurrentUser
);
router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar
);

export default router;
