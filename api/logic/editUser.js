import { User } from '../data/index.js';
import bcrypt from 'bcryptjs';
import { DuplicityError, NotFoundError, SystemError, ValidationError } from '../errors.js';

export const editUser = (userId, nombreCompleto, direccion) => {
  // Validaciones de entrada
  if (typeof nombreCompleto !== 'string' || !nombreCompleto.trim()) {
    throw new ValidationError('nombre completo inválido o vacío');
  }

  if (typeof direccion !== 'string' || !direccion.trim()) {
    throw new ValidationError('dirección inválida o vacía');
  }

  return User.findOne({ _id: userId }).then((user) => {
    if (!user) throw new NotFoundError('user not found');
    //Buscar o crear el rol si se proporciona
    user.nombreCompleto = nombreCompleto;
    user.direccion = direccion;
    return user.save();
  });
};
