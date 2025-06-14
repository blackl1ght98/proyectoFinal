import { logic } from '../logic';
import { useEffect, useState } from 'react';
import { User } from './User';
import { useNavigate } from 'react-router';

export const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      logic
        .getUsers()
        .then((users) => {
          console.log('users obtenidos');
          setUsers(users);
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
      console.log(users);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }, []);
  const handleUserDeleted = () => {
    try {
      logic
        .getUsers()
        .then((users) => {
          setUsers(users);
        })
        .catch((error) => {
          console.error(error);
          alert(error.message);
        });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center mt-8 px-4">
      <div className="mb-8">
        <button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => navigate('/register')}
        >
          <i className="fa fa-plus"></i>
          Registrar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {users.map((user) => (
          <User key={user.id} user={user} onUserDeleted={handleUserDeleted} />
        ))}
      </div>
    </div>
  );
};
