import { Rol, User } from '../data/index.js';
import bcrypt from 'bcryptjs';
import { DuplicityError, SystemError, ValidationError } from '../errors.js';

export const registerUser = (nombreCompleto, email, password, direccion, rol) => {
  if (typeof nombreCompleto !== 'string') throw new ValidationError('invalid name type');
  if (typeof email !== 'string') throw new ValidationError('invalid email type');
  if (email.length < 6) throw new ValidationError('invalid lenght email');
  if (email.length > 30) throw new ValidationError('invalid lenght email');
  if (typeof password !== 'string') throw new ValidationError('invalid password type');
  if (password.length < 8) throw new ValidationError('invalid lenght password');
  if (typeof direccion !== 'string') throw new ValidationError('invalid direccion type');
  const saltRounds = 10;

  return Rol.findOne({ nombre: rol })
    .then((rolDoc) => {
      if (rolDoc) return rolDoc;
      return Rol.create({ nombre: rol }).then((rolDoc) => {
        return bcrypt.hash(password, saltRounds).then((hashedPassword) => {
          return User.create({ nombreCompleto, email, password: hashedPassword, direccion, rol: rolDoc._id });
        });
      });
    })
    .catch((error) => {
      if (error.code === 11000) throw new DuplicityError('user already exists');
      throw new SystemError(error.message || 'registration error');
    });
};
