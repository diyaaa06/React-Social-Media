import {useForm} from "react-hook-form"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { addDoc,collection } from "firebase/firestore";
import { auth,db } from "../../config/firebase";
import {useNavigate} from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
export const CreateForm=()=>{

  const navigate=useNavigate();

  interface CreateFormData{
    title:string;
    description:string;
  }

  const[user]=useAuthState(auth);

  const schema =yup.object().shape({
      title:yup.string().required("Add title"),
      description:yup.string().required("Add description").max(3000)

  });

  const {register,handleSubmit,formState:{errors}}=useForm<CreateFormData>(
    {
      resolver:yupResolver(schema)
    }
  );

  const postaRef=collection(db,"posts");

  const onCreatePost=async (data:CreateFormData)=>{
    await addDoc(postaRef,{
      // title:data.title,
      // decription:data.description,
      ...data,
      username:user?.displayName,
      userId:user?.uid
    });

    navigate("/");
  };

  return(
  <div>
    <h1 style={{color:"#000435"}}>Create Post</h1>
    <form onSubmit={handleSubmit(onCreatePost)} style={{backgroundColor:"#000435",opacity:"80%",padding:"4vh 8vw",margin:"auto auto",paddingBottom:"80px",height:"60vh",width:"45vw"}}>
      <input placeholder="Title..." {...register("title")}></input>
      <p style={{color:"red"}}>{errors.title?.message}</p>
      <br></br>
      <textarea placeholder="Description..." {...register("description")}></textarea>
      <p style={{color:"red"}}>{errors.description?.message}</p>
      <br></br>
      <input type="submit" className="submitquery" value="Post"></input>
    </form>
  </div>
  )
}