import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { connect } from './data/index.js';
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
          .then((userId) => {
            const token = jwt.sign({ sub: userId }, JWT_SECRET);

            response.status(200).json(token);
          })
          .catch((error) => next(error));
      } catch (error) {
        next(error);
      }
    });
    server.delete('/users/:userId', (request, response, next) => {
      try {
        const authorization = request.headers.authorization;
        const token = authorization.slice(7);
        const { sub: tokenUserId } = jwt.verify(token, JWT_SECRET);
        const { userId: userId } = request.params;
        logic
          .removeUser(userId)
          .then(() => response.status(204).send())
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
