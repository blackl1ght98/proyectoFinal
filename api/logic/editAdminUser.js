import { User } from '../data/index.js';
import bcrypt from 'bcryptjs';
import { DuplicityError, NotFoundError, SystemError, ValidationError } from '../errors.js';

export const editUserAdmin = (adminId, userId, nombreCompleto, direccion) => {
  // Validaciones de entrada
  if (typeof nombreCompleto !== 'string' || !nombreCompleto.trim()) {
    throw new ValidationError('nombre completo inválido o vacío');
  }

  if (typeof direccion !== 'string' || !direccion.trim()) {
    throw new ValidationError('dirección inválida o vacía');
  }

  return Promise.all([User.findOne({ _id: userId }), User.findOne({ _id: adminId })]).then(([user, admin]) => {
    if (!user) throw NotFoundError('user not found');
    if (!admin) throw NotFoundError('admin not found');

    if (admin.rol === 'administrador') {
      user.nombreCompleto = nombreCompleto;
      user.direccion = direccion;
      return user.save();
    } else {
      throw new Error('Este usuario no esta autorizado para esta operacion');
    }
  });
};
