import { deleteUser } from './deleteUser';
import { editUser } from './editarUsuario';
import { getUsers } from './getUsers';
import { isUserLoggedIn } from './isUserLoggedIn';
import { loginUser } from './loginUser';
import { logoutUser } from './logoutUser';
import { registerUser } from './registerUser';

export const logic = {
  loginUser,
  isUserLoggedIn,
  registerUser,
  getUsers,
  deleteUser,
  logoutUser,
  editUser,
};
