fetch('http://localhost:8080/users/684a7847561a57eca185ed7d', {
  method: 'DELETE',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODRhNzg0NzU2MWE1N2VjYTE4NWVkN2QiLCJpYXQiOjE3NDk3MTI0OTN9.Upw249Rv42OyZ8Q7OHKuC0zQd8Qi24RAVLjwsAi7J2A',
  },
})
  .catch((error) => {
    throw new Error('connection error');
  })
  .then((response) => {
    const { status } = response;
    if (status === 204) return;
    return response
      .json()
      .catch((error) => {
        throw new Error('json error');
      })
      .then((body) => {
        const { error, message } = body;
        throw new Error(message);
      });
  })
  .then(() => console.log('user deleted'))
  .catch((error) => console.error(error));
