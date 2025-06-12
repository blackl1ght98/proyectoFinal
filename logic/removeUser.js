import { User } from '../data/index.js';
import { ValidationError, NotFoundError, SystemError } from '../errors.js';
export const removeUser = (userId) => {
  if (typeof userId !== 'string') throw new ValidationError('user id invalid');
  return User.findOne({ _id: userId })
    .lean()
    .then((user) => {
      if (!user) throw NotFoundError('user not found');
      return User.deleteOne({ _id: userId }).catch(() => {
        throw new SystemError('Mongo error');
      });
    });
};
