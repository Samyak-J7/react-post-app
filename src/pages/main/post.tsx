import { addDoc, collection, query, where,getDocs,deleteDoc, doc } from "firebase/firestore";
import Main, { Post } from "./Main"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props{
    post : Post
    refresh: boolean
    fun: any
}
interface Like{
    likeId: string;
    userId: string;

}
const Posts = (props: Props) => {
    const [Likes,setLikes] = useState<Like[] | null >(null);
    const { post } = props;    
    const likesRef = collection(db,'likes');
    const PostsRef = collection(db,'posts');
    const likesDoc = query(likesRef,where("postId",'==',post.id))
    const getLikes = async() => {
        try{
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map( (doc) => ({userId : doc.data().userId,likeId:doc.id}))) }
        catch{}
       
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
    const isMyPost =  post.userId===user?.uid ?true: false;
     const delPost = async () => {
        try{
        let delpostid:any =''
        const Posttodelquery = query(PostsRef,where("userId",'==',post.userId),where("userId",'==',user?.uid));
        const posttodeldata = await getDocs(Posttodelquery);
        posttodeldata.forEach((datapost) => {
           if(datapost.id === post.id){
             delpostid = doc(db,"posts",datapost.id);    
           }
       })
       await deleteDoc(delpostid);
       props.fun(!props.refresh);
         }
       catch{}

    }
    
    useEffect(() => {
        try{getLikes();}
        catch{}   
    },[])
  return (
    <div className="post">
        <h2>{post.title}</h2>
        <h4>@{post.username}</h4>
        <p>{post.description}</p>
        <div className="bottom">
            <div className="like-section">
            <button className="heart"  style={{ color: hasLiked && 'red' }} onClick={hasLiked ? remLike:addLike}>&#10084; </button>
            <span style={{ color: hasLiked && 'red'  }} >{Likes && Likes?.length > 0 ? Likes?.length:"" }</span>
            </div>       
        {isMyPost && <button className="delpost" onClick={delPost}><i className="fa fa-trash" aria-hidden="true"></i>  Delete</button>}
        </div>
    </div>
  )
}
export default Posts
