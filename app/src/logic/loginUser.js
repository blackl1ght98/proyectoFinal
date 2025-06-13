import { data } from '../data';

export const loginUser = (email, password) => {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('formato de email inválido');
  }
  if (typeof password !== 'string') throw new Error('Credenciales invalidas');
  if (password.length < 8) throw new Error('logitud de la contraseña insuficiente');
  return fetch(`${import.meta.env.VITE_API_URL}users/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .catch(() => {
      throw new Error('conection error');
    })
    .then((response) => {
      const { status } = response;
      if (status === 200)
        return response
          .json()
          .catch(() => {
            throw new Error('json error');
          })
          .then((token) => data.setToken(token));
      return response
        .json()
        .catch(() => {
          throw new Error('json error');
        })
        .then((body) => {
          const { message } = body;
          throw new Error(message);
        });
    });
};
