import { db } from '../../config/firebase'
import {getDocs,collection} from 'firebase/firestore';
import {useState,useEffect} from "react";
import { Post } from './post';
export interface Post{
  id:string,
  userId:string,
  username:string,
  title:string,
  description:string;
}
export const Main=()=>{
  const viewPosts=collection(db,"posts");
  const [postsList,setPostsList]=useState<Post[]|null>(null);
  const getPosts=async()=>{
    const data=await getDocs(viewPosts);
    setPostsList(
      data.docs.map((doc)=>({...doc.data(),id:doc.id})) as Post[]
    );

  }
  useEffect(()=>{
    getPosts();
  },[]);

  return (
      <div>
        {postsList?.map((post)=>(
          <Post post={post}/>
        ))}
      </div>
    );
};