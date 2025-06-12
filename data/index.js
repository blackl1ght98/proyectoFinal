import mongoose from 'mongoose';
import { User, Rol } from './models.js';
const { connect, disconnect } = mongoose;

export { connect, disconnect, User, Rol };
