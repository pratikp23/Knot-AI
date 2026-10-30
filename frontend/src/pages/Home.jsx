import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase.js";
import api from "../../utils/axios.js";
import { FcGoogle } from "react-icons/fc";


const Home = () => {

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
        <div className="h-screen flex text-white overflow-hidden  bg-zinc-900">hello

            {/* login popup screen */}
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
                {/* Login Form Card */}
                <div className="bg-zinc-800 p-8 rounded-3xl shadow-lg w-[340px] border border-zinc-700">
                    <div className="flex flex-col items-center gap-1">
                        <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">Welcome to Knot AI</h2>
                        <p className="text-2xl text-center text-zinc-400 mb-6">
                            Please login to continue.
                        </p>
                        <button
                            onClick={GoogleLogin}
                            className="w-full bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-2xl transition-all duration-150 ease-in-out flex items-center justify-center"
                        >
                            <FcGoogle className="inline-block mr-2 text-2xl" /> Continue with Google 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home
