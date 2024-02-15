import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'
import {addDoc,collection} from 'firebase/firestore'
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
interface CreateFormData{
    title: string;
    description: string;
}
const Form = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
const schema =yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("Enter Description"),
    });
const { register, handleSubmit, formState:{errors}} = useForm <CreateFormData>  ({
    resolver: yupResolver(schema)
})
const postsRef = collection(db,'posts');

const onCreatePost = async (data:CreateFormData) => {
    await addDoc(postsRef,{
        ...data,
        username: user?.displayName,
        userId: user?.uid,
    })
    navigate('/')
}
  return (
   
   <form className="post-form" onSubmit={handleSubmit(onCreatePost)}>
         <h1>Post Details</h1>
        <input className="title" placeholder="Title" {...register("title")} />{errors.title?.message}
        <textarea className="desc" rows={10} cols={30} placeholder="Description" {...register("description")} />{errors.description?.message}
        <input className="subm" type="submit" value="Post"/>
   </form>
  )
}

export default Form