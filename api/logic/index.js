import { authenticateUser } from './authenticateUser.js';

import { getUsers } from './getUsers.js';
import { registerUser } from './registerUser.js';
import { removeUser } from './removeUser.js';
import { editarUsuario } from './editarUsuario.js';
import { getUsersByRol } from './getUsersByRol.js';
export const logic = {
  registerUser,
  authenticateUser,
  removeUser,
  getUsers,
  editarUsuario,
  getUsersByRol,
};
