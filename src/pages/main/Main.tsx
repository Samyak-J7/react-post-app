import {getDocs,collection} from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useEffect, useState } from 'react';
import Posts from './post';
import { useAuthState } from 'react-firebase-hooks/auth';
export interface Post{
  id:string;
  title:string;
  userId:string;
  description:string;
  username:string
  userEmail:string;

}
const Main = () => {
  const [refreshPosts, setRefreshPosts] = useState(false);
  const [user] = useAuthState(auth);
  const [postsList, setPostList] = useState <Post[] | null> (null);
  const postRef = collection(db , 'posts');
  const getPosts = async () => {
    try{
    const data = await getDocs(postRef);
    setPostList(data.docs.map( (doc) => ({...doc.data(), id: doc.id})) as Post[]); }
    catch{}
  }
  useEffect(() => {
    try{getPosts();}
    catch{}
    
  },[user,refreshPosts])

  return (
    <div className='main'>
         
        {user ? postsList?.map((post) =>( <Posts post={post} refresh ={refreshPosts} fun={setRefreshPosts} /> )):<></>}
    </div>
  )
}

export default Main
