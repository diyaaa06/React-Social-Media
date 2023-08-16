import { Post as IPost} from "./main"
import { addDoc,collection,query ,where,getDocs,deleteDoc, doc} from "firebase/firestore";
import { auth,db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";



interface Props{
  post:IPost;
}


interface Like{
  userId:string;
  likeId:string;
}


export const Post = (props:Props) =>{


  const[user]=useAuthState(auth);
  const{post}=props;
  const likesRef=collection(db,"likes");
  const [likes,setLikes]=useState<Like[] | null>(null);

  const addLike=async ()=>{
    {
      try{
      const newDoc=await addDoc(likesRef,{userId:user?.uid,postId:post.id});
      if(user){
        setLikes((prev)=>
        prev? [...prev,{userId:user?.uid,likeId:newDoc.id}]:[{userId:user?.uid,likeId:newDoc.id}]
        );
      }
    }
    catch(err){
      console.log(err);
    }
    }
  };

  const unLike=async ()=>{
      try{
      const liketodeletequery=query(
        likesRef,
        where("postId","==",post.id),
        where("userId","==",user?.uid)
      );
      const likeToDeleteData=await getDocs(liketodeletequery);
      const likeId = likeToDeleteData.docs[0].id;
      const liketodelete=doc(db,"likes",likeId);
      await deleteDoc(liketodelete);
      if(user){
        setLikes((prev)=>prev && prev.filter((like)=>like.likeId!==likeId));
      }
      }
    catch(err){
      console.log(err);
    }
    
  };


  const likesDoc=query(likesRef,where("postId","==",post.id));

  const getLikes=async()=>{
    const data=await getDocs(likesDoc);
   // console.log(data.docs.map((doc)=>({...doc.data,id:doc.id})));
    setLikes(data.docs.map((doc)=>({userId:doc.data().userId,likeId:doc.id})));
  }

  useEffect(()=>{
    getLikes();
  },[])

  const hasUserLiked = likes?.find((like)=>like.userId===user?.uid);


  return (
    <div className="eachpost">
    <div className="title">{post.title}</div>
    <div className="body"><p>{post.description}</p></div>
    <div className="footer">
      <p>@{post.username}</p>
      <button onClick={hasUserLiked?unLike:addLike}>{hasUserLiked ? <>&#128078;</>:<>&#128077;</>}</button>
      &#160;&#160;{likes?.length}
    </div>
    
    </div>
  )
}