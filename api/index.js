import express, { response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { connect, User } from './data/index.js';
import { AuthorizationError, CredentialsError, DuplicityError, NotFoundError, ValidationError } from './errors.js';
import { logic } from './logic/index.js';
const { JsonWebTokenError } = jwt;
const { MONGO_URL, PORT, JWT_SECRET } = process.env;
connect(MONGO_URL)
  .then(() => {
    const server = express();
    const jsonBodyParser = express.json();
    server.use(cors());
    server.get('/hello', (request, response) => {
      response.send('hello');
    });
    server.post('/users', jsonBodyParser, (request, response, next) => {
      try {
        const { nombreCompleto, email, password, direccion, rol } = request.body;
        logic
          .registerUser(nombreCompleto, email, password, direccion, rol)
          .then(() => response.status(201).send())
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    });
    server.post('/users/auth', jsonBodyParser, (request, response, next) => {
      try {
        const { email, password } = request.body;

        logic
          .authenticateUser(email, password)
          .then(({ id, rol }) => {
            // Desestructurar id y rol correctamente
            const token = jwt.sign({ sub: id, rol }, JWT_SECRET); // Usar id y rol en el token
            response.status(200).json({ token, rol });
          })
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    });

    server.delete('/users/:userId', (request, response, next) => {
      try {
        const { authorization } = request.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
          const error = new Error('Invalid authorization header');
          error.status = 401;
          throw error;
        }
        const token = authorization.slice(7);
        const { sub: adminId } = jwt.verify(token, JWT_SECRET);
        const { userId } = request.params;
        logic
          .removeUser(userId, adminId)
          .then(() => response.status(204).send())
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    });
    server.get('/users', (request, response, next) => {
      try {
        const { authorization } = request.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
          const error = new Error('Encabezado de autorización inválido');
          error.status = 401; // Unauthorized
          throw error;
        }

        const token = authorization.slice(7);
        const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET);

        logic
          .getUsers(userId)
          .then((user) => response.status(200).json(user))
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    });
    server.put('/users/:userId', jsonBodyParser, (request, response, next) => {
      try {
        const { authorization } = request.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
          const error = new Error('Encabezado de autorizacion invalido');
          error.status = 401;
          throw error;
        }

        const token = authorization.slice(7);
        const { userId } = request.params;
        const { sub: adminId } = jwt.verify(token, JWT_SECRET);
        const { nombreCompleto, direccion } = request.body;

        logic
          .editUserAdmin(adminId, userId, nombreCompleto, direccion)
          .then((updatedUser) => response.status(200).json(updatedUser))
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    });
    server.put('/users', jsonBodyParser, (request, response, next) => {
      try {
        const { authorization } = request.headers;
        if (!authorization || !authorization.startsWith('Bearer ')) {
          const error = new Error('Encabezado de autorizacion invalido');
          error.status = 401;
          throw error;
        }
        const token = authorization.slice(7);
        const { sub: userId } = jwt.verify(token, JWT_SECRET);

        const { nombreCompleto, direccion } = request.body;
        logic
          .editUser(userId, nombreCompleto, direccion)
          .then((updatedUser) => response.status(200).json(updatedUser))
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    });
    server.use((error, request, response) => {
      if (error instanceof ValidationError)
        response.status(400).json({ error: error.constructor.name, message: error.message });
      else if (error instanceof NotFoundError)
        response.status(404).json({ error: error.constructor.name, message: error.message });
      else if (error instanceof CredentialsError)
        response.status(401).json({ error: error.constructor.name, message: error.message });
      else if (error instanceof DuplicityError)
        response.status(409).json({ error: error.constructor.name, message: error.message });
      else if (error instanceof JsonWebTokenError)
        response.status(401).json({ error: AuthorizationError.name, message: 'invalid payload' });
      else response.status(500).json({ error: error.constructor.name, message: error.message });
    });
    server.listen(PORT, () => console.log('server escucha'));
  })
  .catch((error) => console.error(error));
