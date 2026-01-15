function Login() {

  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google/login/";
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 font-sans flex items-center justify-center">
      
      <div className="w-full max-w-xl mx-4 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-10 text-center text-white">
        
        <h1 className="text-4xl font-bold mb-4">
          Workspace Tasks & Approvals
        </h1>

        <p className="text-white/80 mb-8">
          Login using your Google account to manage tasks and approvals seamlessly.
        </p>

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-white text-indigo-700 font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-md"
        >
          Login with Google
        </button>

      </div>
    </div>
  );
}

export default Login;
