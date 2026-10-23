import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios.js";

function App() {
  const handleLogin = async (token) => {
    // Implementation for handling login
    try {
      const { data } = await api.post("/auth/login", { token });
      console.log("Login successful:", data);
    }
    catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.error ?? error.message,
      );
    }
  };

  const GoogleLogin = async () => {
    // Sign in with Google using Firebase Authentication
    const data = await signInWithPopup(auth, googleProvider);

    // Get the ID token from the signed-in user
    const token = await data.user.getIdToken();
    // Send the token to the backend for verification and login
    await handleLogin(token);
  };

  return (
    <div className="bg-zinc-900 h-screen flex items-center justify-center">
      <button
        onClick={GoogleLogin}
        className="mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-3xs p-5 h-5rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}

export default App;
