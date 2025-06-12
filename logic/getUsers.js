import { User } from '../data/index.js';
import { NotFoundError, SystemError } from '../errors.js';

export const getUsers = () => {
  return User.find()
    .lean()
    .populate('rol', 'nombre')
    .catch((error) => {
      throw new SystemError('Error en MongoDB');
    })
    .then((users) => {
      if (!users || users.length === 0) {
        throw new NotFoundError('No se encontraron usuarios');
      }

      users.forEach((user) => {
        user.id = user._id.toString();
        delete user._id;
        delete user.__v;
        if (user.rol) {
          user.rol = user.rol.nombre;
        }
      });

      return users;
    });
};
