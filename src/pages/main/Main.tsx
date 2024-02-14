import {getDocs,collection} from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useEffect, useState } from 'react';
import Posts from './post';
export interface Post{
  id:string;
  title:string;
  userid:string;
  description:string;
  username:string

}
const Main = () => {
  const [postsList, setPostList] = useState <Post[] | null> (null);
  const postRef = collection(db , 'posts');
  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostList(data.docs.map( (doc) => ({...doc.data(), id: doc.id})) as Post[]);  
  }
  useEffect(() => {
    getPosts();

  }, []);
  return (
    <div>
        {postsList?.map((post) =>( <Posts post={post} /> ))}
    </div>
  )
}

export default Main
