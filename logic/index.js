import { authenticateUser } from './authenticateUser.js';
import { getUsers } from './getUsers.js';
import { registerUser } from './registerUser.js';
import { removeUser } from './removeUser.js';

export const logic = {
  registerUser,
  authenticateUser,
  removeUser,
  getUsers,
};
