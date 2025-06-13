import { authenticateUser } from './authenticateUser.js';
import { editUserAdmin } from './editAdminUser.js';
import { editUser } from './editUser.js';
import { getUsers } from './getUsers.js';
import { registerUser } from './registerUser.js';
import { removeUser } from './removeUser.js';

export const logic = {
  registerUser,
  authenticateUser,
  removeUser,
  getUsers,
  editUser,
  editUserAdmin,
};
