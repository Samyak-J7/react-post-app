import { signInWithPopup } from "firebase/auth"
import { auth , provider } from "../config/firebase"
import { useNavigate } from "react-router-dom"
const Login = () => {
const navigate = useNavigate();
    const signInWithGoogle = async () => {
      try{
       const result = await signInWithPopup(auth,provider);
       navigate('/');}
       catch{}
    }
  return (
    <div>
        <p>Sign in with Google to continue</p>
        <button onClick={signInWithGoogle}>Sign in</button>
    </div>
  )
}

export default Login