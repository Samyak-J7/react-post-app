import {Link, useNavigate} from 'react-router-dom';
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth';
import { signInWithPopup } from "firebase/auth"
import { auth , provider } from "../config/firebase"
const Navbar = () => {
    const navigate =useNavigate();
    const [user] = useAuthState(auth);
    const signuserOut = async () => {
      navigate('/');
      await signOut(auth);
        
    }
    const signInWithGoogle = async () => {
      try{
       const result = await signInWithPopup(auth,provider);
       navigate('/');}
       catch{
       }
    }
  return (
    <header>
        <nav>
        <Link className='link' to='/'>Home</Link>
        {!user  ?  <button className='signin' onClick={signInWithGoogle}>Sign in</button>: <Link className='link' to='/createpost'>Post</Link> }        
        {user && (
            <>
            <div className='profile'> <p >{user?.displayName}</p>
            <img className='pfp' src={user?.photoURL || ""} width='20'height='20'/></div>           
            <button className='logout' onClick={signuserOut}>Logout</button>
            </>
        )}
        
        </nav>
    </header>
  )
}

export default Navbar
