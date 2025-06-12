import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const { Types } = Schema;
const { ObjectId } = Types;

const user = new Schema({
  nombreCompleto: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fechaRegistro: {
    type: Date,
    required: true,
    default: Date.now,
  },
  direccion: {
    type: String,
    required: true,
  },
  rol: {
    type: ObjectId,
    ref: 'Rol',
    required: true,
  },
});
const rol = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    enum: ['administrador', 'empleado', 'cliente'],
  },
});
const User = model('User', user);
const Rol = model('Rol', rol);
export { User, Rol };
