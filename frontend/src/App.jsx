
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../utils/firebase'

function App() {

  const GoogleLogin = async () =>{
    const data = await signInWithPopup(auth, googleProvider)
    console.log(data)
  }




  return (
    <div className="bg-zinc-900 h-screen flex items-center justify-center">
      <button onClick={GoogleLogin} className="mt-7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-3xs p-5 h-5rounded">
        Continue with Google
      </button>
    </div>
  )
}

export default App
