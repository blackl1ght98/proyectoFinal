import { useNavigate } from 'react-router-dom';

export const Landing = () => {
  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate('/register');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-4">
      <div className="text-center">
        <i className="text-4xl text-gray-700 mb-4">🌟 Logo</i>
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-6">Bienvenido a la App</h1>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={handleRegisterClick}
          >
            Registrar
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
