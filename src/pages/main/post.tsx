import { addDoc, collection, query, where,getDocs,deleteDoc, doc } from "firebase/firestore";
import { Post } from "./Main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
interface Props{
    post : Post
}
interface Like{
    likeId: string;
    userId: string;

}
const Posts = (props: Props) => {
    const [Likes,setLikes] = useState<Like[] | null >(null);
    const { post } = props;    
    const likesRef = collection(db,'likes');
    const likesDoc = query(likesRef,where("postId",'==',post.id))
    const getLikes = async() => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map( (doc) => ({userId : doc.data().userId,likeId:doc.id}))) 
       
    }
    const [user] = useAuthState(auth);
    const addLike = async () => {
        try{
    const newdoc = await addDoc(likesRef, {userId: user?.uid ,postId:post.id });
    if (user){
    setLikes((prev) => prev ?[...prev,{userId: user?.uid, likeId: newdoc.id}  ]:[{userId: user?.uid,likeId: newdoc.id}] );
    }
}
catch{}

}
const remLike = async () => {
    try{
        const liketodelquery = query(likesRef,where("postId",'==',post.id),where("userId",'==',user?.uid));
        const liketodeletedata = await getDocs(liketodelquery);
        const liketodel = doc(db,"likes",liketodeletedata.docs[0].id);
        const likeid = liketodeletedata.docs[0].id;
        await deleteDoc(liketodel);
        if (user){
            setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeid));
        }
    }
    catch{}

    }
const hasLiked = Likes?.find((like) =>like.userId === user?.uid);

useEffect(() => {
    getLikes();
    
},[])
  return (
    <div>
        <h1>{post.title}</h1>
        <h3>{post.description}</h3>
        <h4>{post.username}</h4>
        <button onClick={hasLiked ? remLike:addLike}> 
        {hasLiked ? <>&#x1F44E;</>:<>&#128077;</>} </button>
        <p>Likes:{Likes?.length }</p>
    </div>
  )
}

export default Posts
