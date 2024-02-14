import {Link, useNavigate} from 'react-router-dom';
import { auth } from '../config/firebase';
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const navigate =useNavigate();
    const [user] = useAuthState(auth);
    const signuserOut = async () => {
      navigate('/login');
      await signOut(auth);
        
    }
  return (
    <header>
        <nav>
        <Link to='/'>Home</Link>
        {!user  ? <Link to='/login'>Login</Link>: <Link to='/createpost'>Create Post </Link> }        
        {user && (
            <>
            <p>{user?.displayName}</p>
            <img src={user?.photoURL || ""} width='10'height='10'/>
            <button onClick={signuserOut}>Log Out</button>
            </>
        )}
        
        </nav>
    </header>
  )
}

export default Navbar